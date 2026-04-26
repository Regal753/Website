import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const faqItems = [
  {
    question: 'まだ相談内容が固まっていなくても送ってよいですか。',
    answer:
      '問題ありません。最初に現状と優先順位を整理し、YouTube/SNS運用、BGM権利管理、制作進行のどこから着手すべきかを切り分けます。',
  },
  {
    question: 'BGM権利管理だけ、またはYouTube運用だけでも依頼できますか。',
    answer:
      '可能です。必要な範囲だけを見積ります。権利、運用、共有フローがまたがる場合も、窓口を分けずに整理します。',
  },
  {
    question: '初回相談や見積りで費用は発生しますか。',
    answer:
      '初回相談と見積り作成の段階では費用はかかりません。作業範囲、期間、費用をご確認いただいた後、ご納得いただけた場合のみ着手します。',
  },
  {
    question: '法人として確認したい情報はどこで見られますか。',
    answer:
      '会社情報ページに、法人名、所在地、代表者、電話番号、法人番号、事業内容、取引金融機関を掲載しています。',
  },
] as const;

const Faq: React.FC = () => (
  <section className="bg-white py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div>
          <p className="font-semibold text-brand-primary-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-ink md:text-4xl">
            よくある確認事項
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            はじめて問い合わせる前に確認されやすい内容をまとめています。
          </p>
          <Link
            to="/contact/"
            onClick={() => trackEvent('cta_click', { placement: 'faq_section', target: 'contact' })}
            className="mt-6 inline-flex items-center gap-2 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            ご相談・お問い合わせ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-slate-50">
          {faqItems.map((item) => (
            <article key={item.question} className="p-5 md:p-6">
              <h3 className="text-base font-semibold leading-relaxed text-brand-ink">{item.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Faq;
