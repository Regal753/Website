type KVBinding = {
  put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
};

type Env = {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
  CONTACT_ALLOWED_ORIGIN?: string;
  CONTACT_LOG_WEBHOOK_URL?: string;
  CONTACT_LOG_RETENTION_DAYS?: string;
  CONTACT_LOGS?: KVBinding;
};

type ExecutionContextLike = {
  waitUntil: (promise: Promise<unknown>) => void;
};

const MAX_TOTAL_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const DEFAULT_LOG_RETENTION_DAYS = 180;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const bytesToBase64 = (bytes: Uint8Array): string => {
  const chunkSize = 0x8000;
  let binary = '';
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
};

const getAllowedOrigin = (request: Request, env: Env): string => {
  const configured = (env.CONTACT_ALLOWED_ORIGIN || '').trim();
  if (configured) return configured;
  const requestOrigin = (request.headers.get('Origin') || '').trim();
  return requestOrigin || '*';
};

const withCorsHeaders = (
  request: Request,
  env: Env,
  headers: Record<string, string> = {}
): Record<string, string> => ({
  'Access-Control-Allow-Origin': getAllowedOrigin(request, env),
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  ...headers,
});

const json = (
  request: Request,
  env: Env,
  body: Record<string, unknown>,
  status = 200
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: withCorsHeaders(request, env, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    }),
  });

const sendViaResend = async (
  env: Env,
  payload: {
    to: string[];
    subject: string;
    text: string;
    html: string;
    replyTo?: string;
    attachments?: Array<{ filename: string; content: string; type?: string }>;
  }
): Promise<{ ok: boolean; status: number; body: string }> => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      reply_to: payload.replyTo,
      attachments: payload.attachments,
    }),
  });

  const body = await response.text();
  return { ok: response.ok, status: response.status, body };
};

const createLogWriterTask = (
  env: Env,
  record: Record<string, unknown>
): Promise<unknown> | null => {
  const retentionDays = Number(env.CONTACT_LOG_RETENTION_DAYS || DEFAULT_LOG_RETENTION_DAYS);
  const expirationTtl = Number.isFinite(retentionDays)
    ? Math.max(1, Math.floor(retentionDays)) * 24 * 60 * 60
    : DEFAULT_LOG_RETENTION_DAYS * 24 * 60 * 60;

  if (env.CONTACT_LOGS?.put) {
    const receivedAt = String(record.receivedAt || new Date().toISOString());
    const day = receivedAt.slice(0, 10);
    const id = String(record.id || crypto.randomUUID());
    return env.CONTACT_LOGS.put(`contact/${day}/${id}.json`, JSON.stringify(record), {
      expirationTtl,
    });
  }

  return null;
};

const createWebhookLogTask = (
  env: Env,
  record: Record<string, unknown>
): Promise<Response> | null => {
  const webhookUrl = (env.CONTACT_LOG_WEBHOOK_URL || '').trim();
  if (!webhookUrl) return null;
  return fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContextLike): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: withCorsHeaders(request, env),
      });
    }

    if (request.method !== 'POST') {
      return json(request, env, { ok: false, error: 'method_not_allowed' }, 405);
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
      return json(request, env, { ok: false, error: 'server_not_configured' }, 500);
    }

    const contentType = (request.headers.get('Content-Type') || '').toLowerCase();
    if (!contentType.includes('multipart/form-data')) {
      return json(request, env, { ok: false, error: 'invalid_content_type' }, 400);
    }

    try {
      const formData = await request.formData();

      const honey = String(formData.get('_honey') || '').trim();
      if (honey) {
        return json(request, env, { ok: true, ignored: true });
      }

      const name = String(formData.get('name') || '').trim();
      const company = String(formData.get('company') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const phone = String(formData.get('phone') || '').trim();
      const inquiryType = String(formData.get('inquiry_type') || '').trim();
      const message = String(formData.get('message') || '').trim();
      const autoResponse = String(formData.get('_autoresponse') || '').trim();
      const userAgent = request.headers.get('User-Agent') || '';
      const ip =
        request.headers.get('CF-Connecting-IP') ||
        request.headers.get('X-Forwarded-For') ||
        '';

      if (!name || !email || !inquiryType || !message) {
        return json(request, env, { ok: false, error: 'missing_required_fields' }, 422);
      }
      if (!emailPattern.test(email)) {
        return json(request, env, { ok: false, error: 'invalid_email' }, 422);
      }

      const files = formData
        .getAll('attachment')
        .filter((entry): entry is File => entry instanceof File && entry.size > 0);
      const totalAttachmentBytes = files.reduce((sum, file) => sum + file.size, 0);
      if (totalAttachmentBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
        return json(request, env, { ok: false, error: 'attachment_too_large' }, 413);
      }

      const inquiryId = crypto.randomUUID();
      const receivedAt = new Date().toISOString();

      const attachments = await Promise.all(
        files.map(async (file) => {
          const bytes = new Uint8Array(await file.arrayBuffer());
          return {
            filename: file.name || 'attachment.bin',
            content: bytesToBase64(bytes),
            type: file.type || 'application/octet-stream',
          };
        })
      );

      const messageText = [
        `Inquiry ID: ${inquiryId}`,
        `Received At (UTC): ${receivedAt}`,
        '',
        `Name: ${name}`,
        `Company: ${company || '-'}`,
        `Email: ${email}`,
        `Phone: ${phone || '-'}`,
        `Inquiry Type: ${inquiryType}`,
        '',
        'Message:',
        message,
      ].join('\n');

      const messageHtml = `
        <h2>Webお問い合わせ</h2>
        <p><strong>Inquiry ID:</strong> ${escapeHtml(inquiryId)}</p>
        <p><strong>Received At (UTC):</strong> ${escapeHtml(receivedAt)}</p>
        <hr />
        <p><strong>お名前:</strong> ${escapeHtml(name)}</p>
        <p><strong>会社名:</strong> ${escapeHtml(company || '-')}</p>
        <p><strong>メール:</strong> ${escapeHtml(email)}</p>
        <p><strong>電話番号:</strong> ${escapeHtml(phone || '-')}</p>
        <p><strong>種別:</strong> ${escapeHtml(inquiryType)}</p>
        <p><strong>内容:</strong><br />${escapeHtml(message).replaceAll('\n', '<br />')}</p>
      `;

      const mainMail = await sendViaResend(env, {
        to: [env.CONTACT_TO_EMAIL],
        subject: `[Webお問い合わせ] ${inquiryType} / ${name}`,
        text: messageText,
        html: messageHtml,
        replyTo: email,
        attachments,
      });

      if (!mainMail.ok) {
        return json(
          request,
          env,
          { ok: false, error: 'email_send_failed', status: mainMail.status },
          502
        );
      }

      let autoReplySent = false;
      if (autoResponse) {
        const autoReply = await sendViaResend(env, {
          to: [email],
          subject: 'お問い合わせありがとうございます',
          text: autoResponse,
          html: `<p>${escapeHtml(autoResponse).replaceAll('\n', '<br />')}</p>`,
        });
        autoReplySent = autoReply.ok;
      }

      const logRecord: Record<string, unknown> = {
        id: inquiryId,
        receivedAt,
        name,
        company,
        email,
        phone,
        inquiryType,
        message,
        attachmentCount: files.length,
        totalAttachmentBytes,
        userAgent,
        ip,
        endpoint: '/api/contact',
      };

      const tasks: Promise<unknown>[] = [];
      const kvTask = createLogWriterTask(env, logRecord);
      if (kvTask) tasks.push(kvTask);

      const webhookTask = createWebhookLogTask(env, logRecord);
      if (webhookTask) tasks.push(webhookTask);

      if (tasks.length > 0) {
        ctx.waitUntil(Promise.allSettled(tasks).then(() => undefined));
      }

      return json(request, env, { ok: true, id: inquiryId, autoReplySent });
    } catch (_error) {
      return json(request, env, { ok: false, error: 'unexpected_error' }, 500);
    }
  },
};
