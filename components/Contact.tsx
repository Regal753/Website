import React from 'react';
import { SectionId } from '../types';
import { Send, Mail } from 'lucide-react';
import { siteConfig } from '../site.config';

const Contact: React.FC = () => {
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

        <div className="max-w-xl mx-auto">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl text-center">
            <p className="text-slate-300 mb-6">
              YouTube運用／BGM制作・権利管理／編集体制整備／業務自動化に関するご相談はこちらから送信してください。
            </p>

            <a
              href={siteConfig.contactFormUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-lg transition-all transform hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Googleフォームで送信する
            </a>

            <div className="mt-6 text-sm text-slate-400">
              <p>フォームが開けない場合は、下記アドレスまでご連絡ください。</p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-blue-400 hover:text-blue-300 mt-1 inline-block"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
