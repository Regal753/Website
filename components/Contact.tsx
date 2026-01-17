import React, { useState } from 'react';
import { SectionId, ContactFormState } from '../types';
import { Send, Mail, CheckCircle } from 'lucide-react';
import { siteConfig } from '../site.config';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    type: 'BGM制作について',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${siteConfig.companyName} お問い合わせ（${formData.type}）`;
    const body = [
      `お名前: ${formData.name}`,
      `メールアドレス: ${formData.email}`,
      '',
      'お問い合わせ内容:',
      formData.message,
    ].join('\n');
    const params = new URLSearchParams({
      subject,
      body,
    });
    window.location.href = `mailto:${siteConfig.contactEmail}?${params.toString()}`;
    setIsSubmitted(true);
    setFormData({ name: '', email: '', type: 'BGM制作について', message: '' });
  };

  if (isSubmitted) {
    return (
      <section id={SectionId.CONTACT} className="py-24 bg-slate-900 flex items-center justify-center min-h-[600px]">
        <div className="text-center p-8 bg-slate-800 rounded-2xl border border-slate-700 max-w-lg w-full mx-4 animate-fade-in">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">送信完了</h3>
          <p className="text-slate-400 mb-6">
            メールソフトが起動します。送信内容をご確認のうえ、送信してください。
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            戻る
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-4">
            <Mail className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">お問い合わせ</h2>
          <p className="text-slate-400">
            お仕事のご依頼、ご相談はお気軽にどうぞ。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 order-2 md:order-1">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/30">
              <div className="flex items-center gap-2 mb-4 text-blue-400 font-semibold">
                <Mail size={20} />
                <span>メールでのお問い合わせ</span>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                フォーム送信後にメールソフトが起動します。送信内容をご確認のうえお送りください。
              </p>
              <div className="text-sm text-slate-400">
                送信先:
                <span className="ml-2 text-slate-200">{siteConfig.contactEmail}</span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">お名前</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">メールアドレス</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">お問い合わせ種別</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none"
                >
                  <option>YouTube運営について</option>
                  <option>BGM制作・利用について</option>
                  <option>権利管理のご相談</option>
                  <option>業務自動化・ツール開発</option>
                  <option>その他</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">お問い合わせ内容</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-lg transition-all transform hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  メールで送信する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
