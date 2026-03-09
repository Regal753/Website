import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Check,
  Clock3,
  ExternalLink,
  FileText,
  Instagram,
  Loader2,
  Mail,
  Paperclip,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { ContactFormState, SectionId } from '../types';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const INITIAL_FORM: ContactFormState = {
  name: '',
  email: '',
  type: 'お問い合わせ',
  message: '',
};

const CONTACT_HOURS = '電話受付 9:00-20:00（フォームは24時間受付）';
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const AUTORESPONSE_MESSAGE =
  'お問い合わせありがとうございます。内容を確認のうえ、通常1営業日以内にご連絡いたします。';
const GENERIC_SUBMIT_ERROR = '送信に失敗しました。時間をおいて再度お試しください。';

const CONTACT_PROMISES = ['通常1営業日以内に返信', '初回相談無料', 'フォームは24時間受付'] as const;
const COMMON_ISSUES = [
  '何から相談すべきか整理できていない',
  'SNS運用と権利管理が別々に散っている',
  '共有フローが属人化していて止まりやすい',
] as const;

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const parseLegacyFormResponse = async (
  response: Response
): Promise<{ ok: boolean; reason?: string; status?: number }> => {
  const responseBody = await response.text();
  const requiresActivation = /needs Activation|Activate Form/i.test(responseBody);
  const genericFormSubmitPage =
    /<title>FormSubmit/i.test(responseBody) && !/thank|success|submitted/i.test(responseBody);

  if (requiresActivation || genericFormSubmitPage) {
    return { ok: false, reason: 'formsubmit_not_activated' };
  }
  if (!response.ok) {
    return { ok: false, reason: 'http_error', status: response.status };
  }
  return { ok: true };
};

const Contact: React.FC = () => {
  const location = useLocation();
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const hasTrackedSubmitSuccess = useRef(false);

  const companyPhoneDisplay =
    (siteConfig.companyProfile.phone || '').trim() || '現在準備中（メールでお問い合わせください）';
  const companyPhoneHref = companyPhoneDisplay.replace(/[^\d+]/g, '');

  const attachmentSummary = useMemo(() => {
    if (attachments.length === 0) return 'なし';
    return attachments.map((file) => `${file.name} (${formatBytes(file.size)})`).join(', ');
  }, [attachments]);

  const totalAttachmentBytes = useMemo(
    () => attachments.reduce((sum, file) => sum + file.size, 0),
    [attachments]
  );

  const isSubmitted = useMemo(() => {
    const byQuery = new URLSearchParams(location.search).get('submitted') === '1';
    return hasSubmitted || byQuery;
  }, [hasSubmitted, location.search]);

  const legacyFallbackEndpoint = useMemo(() => {
    const configured = (import.meta.env.VITE_CONTACT_LEGACY_ENDPOINT || '').trim();
    return configured || `https://formsubmit.co/${siteConfig.contactEmail}`;
  }, []);

  const contactEndpoint = useMemo(() => {
    const configured = (import.meta.env.VITE_CONTACT_ENDPOINT || '').trim();
    return configured || legacyFallbackEndpoint;
  }, [legacyFallbackEndpoint]);

  const enableLegacyFallback = useMemo(() => {
    const configured = (import.meta.env.VITE_CONTACT_ENABLE_LEGACY_FALLBACK || 'true').trim();
    return configured.toLowerCase() === 'true';
  }, []);

  const nextUrl = useMemo(() => {
    const configuredSiteUrl = (import.meta.env.VITE_SITE_URL || '').trim();
    const origin =
      configuredSiteUrl ||
      (typeof window !== 'undefined' ? window.location.origin : 'https://www.regalocom.net');
    const baseOrigin = origin.replace(/\/$/, '');
    const baseUrl = import.meta.env.BASE_URL || '/';
    return new URL(`${baseUrl}contact?submitted=1`, `${baseOrigin}/`).toString();
  }, []);

  const mailSubject = useMemo(
    () => `[お問い合わせ] ${form.type} / ${form.name || 'お名前未入力'}`,
    [form.name, form.type]
  );

  const updateField = (key: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttachments(Array.from(event.target.files || []));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    trackEvent('contact_submit_attempt', {
      inquiry_type: form.type,
      has_attachment: attachments.length > 0,
    });

    if (!consent) {
      setError('プライバシーポリシーと利用規約への同意が必要です。');
      trackEvent('contact_submit_blocked', { reason: 'consent_missing' });
      return;
    }

    if (totalAttachmentBytes > MAX_ATTACHMENT_BYTES) {
      setError('添付ファイルの合計サイズは10MB以内にしてください。');
      trackEvent('contact_submit_blocked', { reason: 'attachment_too_large' });
      return;
    }

    setIsSubmitting(true);
    const formElement = event.currentTarget;

    try {
      const payload = new FormData(formElement);
      let isSuccess = false;
      let failureReason = 'unknown';
      let failureStatus: number | undefined;

      const primaryResponse = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      });
      const primaryContentType = (primaryResponse.headers.get('content-type') || '').toLowerCase();

      if (primaryContentType.includes('application/json')) {
        const primaryJson = await primaryResponse.json().catch(() => null);
        if (primaryResponse.ok && (primaryJson?.ok ?? true)) {
          isSuccess = true;
        } else {
          failureReason = primaryJson?.error || 'api_error';
          failureStatus = primaryResponse.status;
        }
      } else {
        const legacyResult = await parseLegacyFormResponse(primaryResponse);
        isSuccess = legacyResult.ok;
        if (!legacyResult.ok) {
          failureReason = legacyResult.reason || 'legacy_error';
          failureStatus = legacyResult.status;
        }
      }

      if (!isSuccess && enableLegacyFallback && contactEndpoint !== legacyFallbackEndpoint) {
        trackEvent('contact_submit_fallback', { to: 'legacy_formsubmit' });
        const fallbackPayload = new FormData(formElement);
        const fallbackResponse = await fetch(legacyFallbackEndpoint, {
          method: 'POST',
          body: fallbackPayload,
        });
        const fallbackResult = await parseLegacyFormResponse(fallbackResponse);
        isSuccess = fallbackResult.ok;
        if (!fallbackResult.ok) {
          failureReason = `fallback_${fallbackResult.reason || 'failed'}`;
          failureStatus = fallbackResult.status;
        }
      }

      if (!isSuccess) {
        setError(GENERIC_SUBMIT_ERROR);
        trackEvent('contact_submit_failed', {
          reason: failureReason,
          status: failureStatus,
          endpoint: contactEndpoint,
        });
        return;
      }

      setHasSubmitted(true);
      hasTrackedSubmitSuccess.current = false;
      trackEvent('contact_submit_success', {
        inquiry_type: form.type,
        has_attachment: attachments.length > 0,
      });
      setForm(INITIAL_FORM);
      setCompany('');
      setPhone('');
      setAttachments([]);
      setConsent(false);
      formElement.reset();
    } catch (_error) {
      setError(GENERIC_SUBMIT_ERROR);
      trackEvent('contact_submit_failed', {
        reason: 'network_error',
        endpoint: contactEndpoint,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitted && !hasTrackedSubmitSuccess.current) {
      trackEvent('contact_submit_success_view');
      hasTrackedSubmitSuccess.current = true;
    }
  }, [isSubmitted]);

  return (
    <section
      id={SectionId.CONTACT}
      className="bg-[linear-gradient(180deg,_#ffffff_0%,_#fff8f1_100%)] pt-28 pb-20 md:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="p-6 md:p-8">
              <p className="inline-flex rounded-full border border-brand-primary-200 bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700">
                お問い合わせ
              </p>
              <div className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-primary-50 p-3">
                <Mail className="h-6 w-6 text-brand-primary-700" />
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-ink md:text-5xl">お問い合わせ</h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                内容を確認のうえ、通常1営業日以内にメールまたはお電話でご連絡します。
                何から相談すべきか整理できていない段階でも、そのまま送って問題ありません。
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {CONTACT_PROMISES.map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">「*」は必須項目です。</p>
            </div>

            <aside className="bg-slate-900 p-6 text-white md:p-8">
              <p className="text-xs font-semibold tracking-widest text-white/60">RESPONSE</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">相談の入口は一つにまとめています</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                SNS運用、権利管理、共有設計をまたいでいても、窓口を分けずに整理します。
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 text-amber-300" />
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-white/60">返信目安</p>
                      <p className="mt-1 text-lg font-semibold text-white">1営業日以内</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-amber-300" />
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-white/60">電話窓口</p>
                      {companyPhoneHref ? (
                        <a href={`tel:${companyPhoneHref}`} className="mt-1 block text-lg font-semibold text-white hover:text-amber-200">
                          {companyPhoneDisplay}
                        </a>
                      ) : (
                        <p className="mt-1 text-lg font-semibold text-white">{companyPhoneDisplay}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-amber-300" />
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-white/60">対応時間</p>
                      <p className="mt-1 text-sm font-semibold leading-relaxed text-white">{CONTACT_HOURS}</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {isSubmitted && (
          <div className="mt-6 rounded-[28px] border border-emerald-200 bg-emerald-50 px-5 py-4 shadow-sm">
            <p className="text-sm font-semibold text-emerald-800">送信が完了しました。無料相談ありがとうございます。</p>
            <p className="mt-1 text-sm leading-relaxed text-emerald-900/90">
              通常1営業日以内にご連絡します。お急ぎの場合はお電話でも受け付けています。
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              {companyPhoneHref && (
                <a
                  href={`tel:${companyPhoneHref}`}
                  onClick={() => trackEvent('phone_click', { placement: 'contact_success_banner' })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
                >
                  <Phone className="h-4 w-4" />
                  電話する（{companyPhoneDisplay}）
                </a>
              )}
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-300 bg-white px-5 py-2.5 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-100"
              >
                トップへ戻る
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.12fr)_340px]">
          <div className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-brand-ink">お問い合わせフォーム</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                フォーム送信後、内容を確認して担当よりご連絡します。添付ファイルもそのまま送信できます。
              </p>
            </div>

            <form
              action={contactEndpoint}
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input type="hidden" name="_subject" value={mailSubject} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={nextUrl} />
              <input type="hidden" name="_autoresponse" value={AUTORESPONSE_MESSAGE} />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                <p className="text-sm font-semibold text-slate-500">基本情報</p>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block text-sm">
                    <span className="font-medium text-slate-700">お名前 *</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="font-medium text-slate-700">会社名</span>
                    <input
                      type="text"
                      name="company"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
                      autoComplete="organization"
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="font-medium text-slate-700">メールアドレス *</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label className="block text-sm">
                    <span className="font-medium text-slate-700">電話番号</span>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
                      autoComplete="tel"
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5">
                <p className="text-sm font-semibold text-slate-500">相談内容</p>
                <div className="mt-4 space-y-4">
                  <label className="block text-sm">
                    <span className="font-medium text-slate-700">お問い合わせ種別</span>
                    <select
                      name="inquiry_type"
                      value={form.type}
                      onChange={(event) => updateField('type', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
                    >
                      <option>お問い合わせ</option>
                      <option>SNS管理事業部について</option>
                      <option>音楽出版事業部について</option>
                      <option>AIマーケティング戦略事業部について</option>
                      <option>その他</option>
                    </select>
                  </label>

                  <label className="block text-sm">
                    <span className="font-medium text-slate-700">お問い合わせ内容 *</span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(event) => updateField('message', event.target.value)}
                      rows={7}
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary-500"
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                <p className="text-sm font-semibold text-slate-500">添付と同意</p>
                <div className="mt-4 space-y-4">
                  <label className="block text-sm">
                    <span className="font-medium text-slate-700">添付ファイル（任意）</span>
                    <input
                      type="file"
                      name="attachment"
                      multiple
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.png,.jpg,.jpeg,.webp,.mp4,.mov"
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-slate-700"
                    />
                    <div className="mt-2 flex items-start gap-2 text-xs text-slate-500">
                      <Paperclip className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>添付ファイルの合計は10MB以内で送信してください。</span>
                    </div>
                    {attachments.length > 0 && (
                      <p className="mt-2 text-xs text-slate-600">選択中: {attachmentSummary}</p>
                    )}
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-300 bg-white text-brand-primary-700 transition-colors peer-checked:border-brand-primary-600 peer-checked:bg-brand-primary-50">
                      {consent && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700">
                      <a
                        href={asset('privacy.html')}
                        className="text-brand-primary-700 underline underline-offset-2 transition-colors hover:text-brand-primary-800"
                      >
                        プライバシーポリシー
                      </a>
                      と{' '}
                      <a
                        href={asset('terms.html')}
                        className="text-brand-primary-700 underline underline-offset-2 transition-colors hover:text-brand-primary-800"
                      >
                        利用規約
                      </a>
                      に同意します。
                    </span>
                  </label>
                </div>
              </div>

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary-700 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-primary-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {isSubmitting ? '送信中...' : 'お問い合わせを送信'}
              </button>
            </form>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[32px] bg-slate-900 p-5 text-white shadow-xl shadow-slate-900/10">
              <p className="text-xs font-semibold tracking-widest text-white/60">PHONE</p>
              <h2 className="mt-3 text-xl font-semibold text-white">お電話でのお問い合わせ</h2>
              {companyPhoneHref ? (
                <a
                  href={`tel:${companyPhoneHref}`}
                  onClick={() => trackEvent('phone_click', { placement: 'contact_sidebar' })}
                  className="mt-4 block text-2xl font-semibold tracking-wide text-white hover:text-amber-200"
                >
                  {companyPhoneDisplay}
                </a>
              ) : (
                <p className="mt-4 text-lg font-semibold text-white">{companyPhoneDisplay}</p>
              )}
              <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
                <Clock3 className="h-4 w-4 text-amber-300" />
                <span>{CONTACT_HOURS}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-100 bg-[#fffaf7] p-5 shadow-sm">
              <h3 className="text-base font-semibold text-brand-ink">相談前によくある状態</h3>
              <ul className="mt-4 space-y-3">
                {COMMON_ISSUES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-brand-ink">他の連絡手段</h3>
              <div className="mt-4 space-y-3">
                <a
                  href="https://www.instagram.com/regalo0610/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent('external_link_click', {
                      platform: 'instagram',
                      placement: 'contact_sidebar',
                    })
                  }
                  className="flex items-start gap-3 rounded-2xl border border-pink-100 bg-pink-50/70 p-4 transition-colors hover:bg-pink-50"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-pink-700 shadow-sm">
                    <Instagram className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-ink">Instagram</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                      最新の活動内容や制作事例を発信しています。
                    </span>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-pink-700">
                      Instagramを見る
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </span>
                </a>

                <a
                  href={siteConfig.contactFormUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent('external_link_click', {
                      platform: 'google_form',
                      placement: 'contact_sidebar',
                    })
                  }
                  className="flex items-start gap-3 rounded-2xl border border-brand-primary-100 bg-brand-primary-50/70 p-4 transition-colors hover:bg-brand-primary-50"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-primary-700 shadow-sm">
                    <FileText className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-ink">Googleフォーム</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                      Googleフォームからも24時間受け付けています。
                    </span>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700">
                      Googleフォームを開く
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-colors hover:bg-slate-50"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-primary-700 shadow-sm">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-ink">メール</span>
                    <span className="mt-1 block break-all text-sm leading-relaxed text-slate-600">
                      {siteConfig.contactEmail}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
