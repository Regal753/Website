import React from 'react';
import { FileSearch, MessageSquare, Rocket, Send } from 'lucide-react';
import { SectionId } from '../types';

const STEPS = [
  {
    icon: Send,
    title: 'お問い合わせ',
    description: '対象の楽曲やチャンネル、現在困っている作業を分かる範囲でお知らせください。',
    note: 'フォーム受付',
    surface: 'border-amber-100 bg-amber-50/80',
    iconSurface: 'bg-[#eee8d2] text-brand-ink',
  },
  {
    icon: MessageSquare,
    title: '内容確認・ヒアリング',
    description: '原則1営業日以内にご連絡します。対象資料、担当範囲、希望時期を確認します。',
    note: '初回ヒアリング無料',
    surface: 'border-rose-100 bg-rose-50/80',
    iconSurface: 'bg-[#eee8d2] text-brand-ink',
  },
  {
    icon: FileSearch,
    title: 'ご提案・お見積り',
    description: '確認した内容を基に、作業範囲、納品物、スケジュール、費用を提示します。',
    note: '作業範囲・費用を提示',
    surface: 'border-brand-primary-100 bg-brand-primary-50/80',
    iconSurface: 'bg-[#eee8d2] text-brand-ink',
  },
  {
    icon: Rocket,
    title: 'ご発注・着手',
    description: 'ご発注後、資料の共有方法と確認担当を決めて作業を始めます。',
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
            まず対象資料とご希望を確認します。対応できる範囲と費用を提示し、ご発注後に着手します。
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
