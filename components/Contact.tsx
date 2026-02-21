import React, { useMemo, useState } from 'react';
import { ExternalLink, Mail, Send } from 'lucide-react';
import { SectionId, ContactFormState } from '../types';
import { siteConfig } from '../site.config';

const INITIAL_FORM: ContactFormState = {
  name: '',
  email: '',
  type: 'ご相談',
  message: '',
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [mailPrepared, setMailPrepared] = useState(false);

  const mailSubject = useMemo(
    () => `[お問い合わせ] ${form.type} / ${form.name || 'お名前未入力'}`,
    [form.name, form.type]
  );

  const mailBody = useMemo(() => {
    return [
      'Webサイトからお問い合わせがありました。',
      '',
      `お名前: ${form.name}`,
      `会社名: ${company || '未入力'}`,
      `メールアドレス: ${form.email}`,
      `電話番号: ${phone || '未入力'}`,
      `お問い合わせ種別: ${form.type}`,
      '',
      'お問い合わせ内容:',
      form.message,
    ].join('\n');
  }, [company, form.email, form.message, form.name, form.type, phone]);

  const mailtoHref = useMemo(() => {
    return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  }, [mailBody, mailSubject]);

  const updateField = (key: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('必須項目を入力してください。');
      return;
    }

    setMailPrepared(true);
    window.location.href = mailtoHref;
  };

  return (
    <section id={SectionId.CONTACT} className="py-20 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
            <Mail className="w-6 h-6 text-blue-700" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">お問い合わせ</h2>
          <p className="text-slate-600 mt-3">
            メールフォームとGoogleフォームのどちらでも送信できます。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-1">メールフォーム</h3>
            <p className="text-sm text-slate-600 mb-6">
              送信するとメールアプリが開き、内容が入力された状態になります。
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block text-sm">
                  <span className="font-medium text-slate-700">お名前 *</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="name"
                  />
                </label>

                <label className="block text-sm">
                  <span className="font-medium text-slate-700">会社名</span>
                  <input
                    type="text"
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
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="email"
                  />
                </label>

                <label className="block text-sm">
                  <span className="font-medium text-slate-700">電話番号</span>
                  <input
                    type="tel"
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
                <span className="font-medium text-slate-700">お問い合わせ内容 *</span>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  rows={7}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              {error && (
                <p className="text-sm font-medium text-red-600">{error}</p>
              )}

              {mailPrepared && (
                <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                  メールアプリ起動用の内容を準備しました。起動しない場合は下のメールアドレス宛に送信してください。
                </p>
              )}

              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold transition-colors"
              >
                <Send size={18} />
                メールフォームで送信
              </button>
            </form>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-base font-bold text-slate-900">Googleフォーム</h3>
              <p className="text-sm text-slate-600 mt-2">
                ブラウザ上で入力して送信したい方はこちらをご利用ください。
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
                フォームが使いづらい場合は、下記メールアドレスへ直接ご連絡ください。
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
