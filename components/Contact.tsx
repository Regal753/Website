import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, ExternalLink, Mail, Paperclip, Phone, Send } from 'lucide-react';
import { SectionId, ContactFormState } from '../types';
import { siteConfig } from '../site.config';

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
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    return new URLSearchParams(location.search).get('submitted') === '1';
  }, [location.search]);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setError('');

    if (!consent) {
      event.preventDefault();
      setIsSubmitting(false);
      setError('プライバシーポリシーへの同意が必要です。');
      return;
    }

    if (totalAttachmentBytes > MAX_ATTACHMENT_BYTES) {
      event.preventDefault();
      setIsSubmitting(false);
      setError('添付ファイルの合計サイズは10MB以内にしてください。');
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <section id={SectionId.CONTACT} className="py-20 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
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
              <p className="text-sm font-semibold text-emerald-800">送信が完了しました。お問い合わせありがとうございます。</p>
              <p className="mt-1 text-sm text-emerald-900/90">
                通常1〜3営業日以内にご連絡します。お急ぎの場合はお電話でも受け付けています。
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {companyPhoneHref && (
                  <a
                    href={`tel:${companyPhoneHref}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    電話する（{companyPhoneDisplay}）
                  </a>
                )}
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-300 bg-white px-5 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  トップへ戻る
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-1">お問い合わせフォーム</h3>
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
                  <option>YouTube運用について</option>
                  <option>制作・編集について</option>
                  <option>業務自動化について</option>
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
                  <Link to="/privacy" className="text-blue-700 hover:text-blue-800 underline underline-offset-2">
                    プライバシーポリシー
                  </Link>
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
                {isSubmitting ? '送信中...' : 'フォームを送信'}
              </button>
            </form>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-base font-bold text-slate-900">お電話でのお問い合わせ</h3>
              <p className="text-xs text-slate-500 mt-2">TEL</p>
              {companyPhoneHref ? (
                <a
                  href={`tel:${companyPhoneHref}`}
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

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-base font-bold text-slate-900">Googleフォーム</h3>
              <p className="text-sm text-slate-600 mt-2">
                Googleフォームは24時間いつでも送信できます。
              </p>
              <a
                href={siteConfig.contactFormUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-700 text-blue-700 font-bold px-4 py-3 hover:bg-blue-50 transition-colors"
              >
                <ExternalLink size={16} />
                Googleフォームを開く
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
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
