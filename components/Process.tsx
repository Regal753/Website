import React from 'react';
import { FileSearch, MessageSquare, Rocket, Send } from 'lucide-react';
import { SectionId } from '../types';

const STEPS = [
  {
    icon: Send,
    title: 'お問い合わせ',
    description: 'お問い合わせフォームから、ご相談内容をお送りください。資料が未整理の場合も受け付けています。',
    note: 'フォーム受付',
    surface: 'border-amber-100 bg-amber-50/80',
    iconSurface: 'bg-[#eee8d2] text-brand-ink',
  },
  {
    icon: MessageSquare,
    title: '内容確認・ヒアリング',
    description: '原則1営業日以内にご連絡します。必要に応じてオンラインミーティングを設定します。',
    note: '初回ヒアリング無料',
    surface: 'border-rose-100 bg-rose-50/80',
    iconSurface: 'bg-[#eee8d2] text-brand-ink',
  },
  {
    icon: FileSearch,
    title: 'ご提案・お見積り',
    description: 'ご相談内容と資料を確認し、作業範囲・スケジュール・費用を明記したご提案をお送りします。',
    note: '作業範囲・費用を提示',
    surface: 'border-brand-primary-100 bg-brand-primary-50/80',
    iconSurface: 'bg-[#eee8d2] text-brand-ink',
  },
  {
    icon: Rocket,
    title: 'ご発注・着手',
    description: 'ご発注確定後、キックオフミーティングを経てプロジェクトを開始します。',
    note: 'ご発注確定後に開始',
    surface: 'border-cyan-100 bg-cyan-50/80',
    iconSurface: 'bg-[#eee8d2] text-brand-ink',
  },
] as const;

const Process: React.FC = () => {
  return (
    <section id={SectionId.PROCESS} className="bg-[#fbf8ee] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            お問い合わせから着手まで
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">ご発注までの流れ</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            お問い合わせ後に内容を確認し、作業範囲、スケジュール、費用をお見積りで提示します。
            ご発注確定後に着手します。
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 xl:block" />
          <div className="grid border-y border-slate-300 md:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-slate-200">
            {STEPS.map((step, index) => (
              <article
                key={step.title}
                className="relative border-b border-slate-200 px-1 py-6 md:px-5 xl:border-b-0 first:xl:pl-0 last:xl:pr-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${step.iconSurface}`}>
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="inline-flex rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500">
                    STEP {index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-brand-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
                <p className="mt-5 text-xs font-semibold tracking-wide text-slate-600">{step.note}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
