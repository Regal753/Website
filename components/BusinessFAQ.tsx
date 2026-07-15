import React from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '初回相談はどこまで無料ですか？',
    answer:
      '最初のヒアリングと、現在の状況・ご希望の整理までは無料です。対象曲数や資料の状態を確認したうえで、必要な作業・期間・費用を事前にお見積りします。',
  },
  {
    question: '資料が揃っていなくても相談できますか？',
    answer:
      'はい。対象のYouTubeチャンネルや楽曲名など、分かる範囲から始められます。手元の情報を確認し、不足資料と次に確認する項目を整理します。',
  },
  {
    question: 'JASRACやNexToneとの契約があっても相談できますか？',
    answer:
      'はい。既存の登録・契約状況と楽曲の利用方法を確認し、追加で確認すべき点を整理します。個別の申請や手続きが必要な場合は、内容に応じて別途お見積りします。',
  },
  {
    question: 'YouTube以外の利用や、他社BGMも対象ですか？',
    answer:
      'ご相談いただけます。権利関係、契約内容、利用先を確認したうえで、対応できる範囲と追加確認が必要な点を個別にご案内します。',
  },
] as const;

const BusinessFAQ: React.FC = () => {
  return (
    <section id="faq" className="bg-[#f6f8fc] py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl md:mb-10">
          <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">よくある質問</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-ink md:text-4xl">
            相談前の疑問にお答えします
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            資料が揃っていなくても構いません。分かる範囲から、確認すべきことと進め方を整理します。
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white open:border-brand-primary-200"
            >
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold leading-6 text-slate-900 marker:content-none md:px-6">
                <span>{faq.question}</span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all group-open:rotate-180 group-open:bg-brand-primary-50 group-open:text-brand-primary-700">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <div className="border-t border-slate-100 px-5 py-5 text-sm leading-7 text-slate-600 md:px-6">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BusinessFAQ;
