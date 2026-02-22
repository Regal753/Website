import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, ExternalLink, Mail, Paperclip, Phone, Send } from 'lucide-react';
import { SectionId, ContactFormState } from '../types';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const INITIAL_FORM: ContactFormState = {
  name: '',
  email: '',
  type: 'ご相談',
  message: '',
};

const CONTACT_HOURS = '電話受付 9:00-20:00（フォームは24時間受付）';
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const AUTORESPONSE_MESSAGE =
  'お問い合わせありがとうございます。内容を確認のうえ、通常1〜3営業日以内にご連絡いたします。';

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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
    (siteConfig.companyProfile.phone || '').trim() || '現在準備中（メール窓口をご利用ください）';
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

  const formAction = useMemo(() => {
    const configured = (import.meta.env.VITE_CONTACT_ENDPOINT || '').trim();
    if (configured) return configured;
    return `https://formsubmit.co/${siteConfig.contactEmail}`;
  }, []);

  const nextUrl = useMemo(() => {
    const configuredSiteUrl = (import.meta.env.VITE_SITE_URL || '').trim();
    const origin =
      configuredSiteUrl ||
      (typeof window !== 'undefined' ? window.location.origin : 'https://www.regalocom.net');
    const base = origin.replace(/\/$/, '');
    return `${base}/#/contact?submitted=1`;
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
    trackEvent('contact_submit_attempt', { inquiry_type: form.type, has_attachment: attachments.length > 0 });

    if (!consent) {
      setError('プライバシーポリシー・利用規約への同意が必要です。');
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
      const response = await fetch(formAction, {
        method: 'POST',
        body: payload,
      });
      const responseBody = await response.text();
      const requiresActivation = /needs Activation|Activate Form/i.test(responseBody);
      const genericFormSubmitPage =
        /<title>FormSubmit/i.test(responseBody) && !/thank|success|submitted/i.test(responseBody);

      if (requiresActivation || genericFormSubmitPage) {
        setError('メールフォームが未有効化です。Googleフォームかお電話でご連絡ください。');
        trackEvent('contact_submit_failed', { reason: 'formsubmit_not_activated' });
        return;
      }

      if (!response.ok) {
        setError('送信に失敗しました。Googleフォームかお電話でご連絡ください。');
        trackEvent('contact_submit_failed', { reason: 'http_error', status: response.status });
        return;
      }

      setHasSubmitted(true);
      hasTrackedSubmitSuccess.current = false;
      trackEvent('contact_submit_success', { inquiry_type: form.type, has_attachment: attachments.length > 0 });
      setForm(INITIAL_FORM);
      setCompany('');
      setPhone('');
      setAttachments([]);
      setConsent(false);
      formElement.reset();
    } catch (_error) {
      setError('送信に失敗しました。Googleフォームかお電話でご連絡ください。');
      trackEvent('contact_submit_failed', { reason: 'network_error' });
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
    <section id={SectionId.CONTACT} className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/70">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-cyan-100/70 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14 relative z-10">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
            CONTACT
          </p>
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
            <Mail className="w-6 h-6 text-blue-700" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">お問い合わせ</h2>
          <p className="text-slate-600 mt-3 max-w-3xl mx-auto leading-relaxed">
            内容を確認のうえ、通常1〜3営業日以内にメールまたはお電話でご連絡します。
            返信が届かない場合は、恐れ入りますが再度ご連絡ください。
          </p>
          <p className="text-xs text-slate-500 mt-3">「*」は必須項目です。</p>
          {isSubmitted && (
            <div className="mt-5 max-w-3xl mx-auto text-left rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
              <p className="text-sm font-semibold text-emerald-800">送信が完了しました。無料相談ありがとうございます。</p>
              <p className="mt-1 text-sm text-emerald-900/90">
                通常1〜3営業日以内にご連絡します。お急ぎの場合はお電話でも受け付けています。
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {companyPhoneHref && (
                  <a
                    href={`tel:${companyPhoneHref}`}
                    onClick={() => trackEvent('phone_click', { placement: 'contact_success_banner' })}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    電話する（{companyPhoneDisplay}）
                  </a>
                )}
                <a
                  href={import.meta.env.BASE_URL}
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-300 bg-white px-5 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  トップへ戻る
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 bg-white/95 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-1">無料相談フォーム</h3>
            <p className="text-sm text-slate-600 mb-6">
              フォーム送信後、受付通知を自動返信します。添付ファイルもそのまま送信できます。
            </p>

            <form
              action={formAction}
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="_subject" value={mailSubject} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={nextUrl} />
              <input type="hidden" name="_autoresponse" value={AUTORESPONSE_MESSAGE} />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block text-sm">
                  <span className="font-medium text-slate-700">お名前 *</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="organization"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block text-sm">
                  <span className="font-medium text-slate-700">メールアドレス *</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="tel"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="font-medium text-slate-700">お問い合わせ種別</span>
                <select
                  name="inquiry_type"
                  value={form.type}
                  onChange={(event) => updateField('type', event.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>ご相談</option>
                  <option>SNS管理事業部について</option>
                  <option>音楽出版事業部について</option>
                  <option>AIマーケティング戦略事業部について</option>
                  <option>その他</option>
                </select>
              </label>

              <label className="block text-sm">
                <span className="font-medium text-slate-700">添付ファイル（任意）</span>
                <input
                  type="file"
                  name="attachment"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.png,.jpg,.jpeg,.webp,.mp4,.mov"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-slate-700"
                />
                <div className="mt-2 text-xs text-slate-500 flex items-start gap-2">
                  <Paperclip className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>添付ファイル合計は10MB以内で送信してください。</span>
                </div>
                {attachments.length > 0 && (
                  <p className="mt-2 text-xs text-slate-600">選択中: {attachmentSummary}</p>
                )}
              </label>

              <label className="block text-sm">
                <span className="font-medium text-slate-700">お問い合わせ内容 *</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  rows={7}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>

              <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 bg-slate-50">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-slate-700 leading-relaxed">
                  <a
                    href={asset('privacy.html')}
                    className="text-blue-700 hover:text-blue-800 underline underline-offset-2"
                  >
                    プライバシーポリシー
                  </a>
                  と
                  {' '}
                  <a
                    href={asset('terms.html')}
                    className="text-blue-700 hover:text-blue-800 underline underline-offset-2"
                  >
                    利用規約
                  </a>
                  に同意します。*
                </span>
              </label>

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold transition-colors"
              >
                <Send size={18} />
                {isSubmitting ? '送信中...' : '無料相談を送信'}
              </button>
            </form>
          </div>

          <aside className="space-y-4">
            <div className="bg-gradient-to-br from-white to-blue-50/60 rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-base font-bold text-slate-900">お電話でのお問い合わせ</h3>
              <p className="text-xs text-slate-500 mt-2">TEL</p>
              {companyPhoneHref ? (
                <a
                  href={`tel:${companyPhoneHref}`}
                  onClick={() => trackEvent('phone_click', { placement: 'contact_sidebar' })}
                  className="text-2xl font-bold text-slate-900 hover:text-blue-700 tracking-wide"
                >
                  {companyPhoneDisplay}
                </a>
              ) : (
                <p className="text-lg font-bold text-slate-900">{companyPhoneDisplay}</p>
              )}
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>{CONTACT_HOURS}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <Phone className="w-3.5 h-3.5" />
                <span>フォームは24時間受付です。お急ぎの場合はお電話をご利用ください。</span>
              </div>
            </div>

            <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center gap-2">
                <img
                  src={asset('images/icons/instagram.png')}
                  alt="Instagram"
                  className="w-6 h-6 rounded"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="text-base font-bold text-slate-900">Instagram</h3>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                最新情報や活動内容はInstagramでも発信しています。DMからのご連絡も可能です。
              </p>
              <a
                href="https://www.instagram.com/regalo0610/"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('external_link_click', { platform: 'instagram', placement: 'contact_sidebar' })}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-pink-600 text-pink-700 font-bold px-4 py-3 hover:bg-pink-50 transition-colors"
              >
                <ExternalLink size={16} />
                Instagramを見る
              </a>
              <p className="mt-2 text-xs text-slate-500">@regalo0610</p>
            </div>

            <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center gap-2">
                <img
                  src={asset('images/icons/google-forms.png')}
                  alt="Googleフォーム"
                  className="w-6 h-6 rounded"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="text-base font-bold text-slate-900">Googleフォーム</h3>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                Googleフォームは24時間いつでも送信できます。
              </p>
              <a
                href={siteConfig.contactFormUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('external_link_click', { platform: 'google_form', placement: 'contact_sidebar' })}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-700 text-blue-700 font-bold px-4 py-3 hover:bg-blue-50 transition-colors"
              >
                <ExternalLink size={16} />
                Googleフォームを開く
              </a>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-base font-bold text-slate-900">直接メール</h3>
              <p className="text-sm text-slate-600 mt-2">
                フォームが使いづらい場合は、下記メールアドレスへご連絡ください。
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-3 inline-block text-blue-700 hover:text-blue-800 font-semibold break-all"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
