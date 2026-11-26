import React from 'react';
import { FileSearch, MessageSquare, Rocket, Send } from 'lucide-react';
import { SectionId } from '../types';
import SectionHeading from './SectionHeading';

const STEPS = [
  {
    icon: Send,
    title: 'お問い合わせ',
    description: '対象の楽曲やチャンネル、現在困っている作業を分かる範囲でお知らせください。',
    note: 'フォーム受付',
  },
  {
    icon: MessageSquare,
    title: '内容確認・ヒアリング',
    description: '原則1営業日以内にご連絡します。対象資料、担当範囲、希望時期を確認します。',
    note: '初回ヒアリング無料',
  },
  {
    icon: FileSearch,
    title: 'ご提案・お見積り',
    description: '確認した内容を基に、作業範囲、納品物、スケジュール、費用を提示します。',
    note: '作業範囲・費用を提示',
  },
  {
    icon: Rocket,
    title: 'ご発注・着手',
    description: 'ご発注後、資料の共有方法と確認担当を決めて作業を始めます。',
    note: 'ご発注確定後に開始',
  },
] as const;

const Process: React.FC = () => {
  return (
    <section id={SectionId.PROCESS} className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FLOW"
          title="ご発注までの流れ"
          lead="まず対象資料とご希望を確認します。対応できる範囲と費用を提示し、ご発注後に着手します。"
        />

        <ol className="grid border-y border-slate-300 md:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-slate-200">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="border-b border-slate-200 px-1 py-6 last:border-b-0 md:px-5 md:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 first:xl:pl-0 last:xl:pr-0"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-paper-alt text-brand-ink">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">
                  STEP {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-brand-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
              <p className="mt-5 text-xs font-semibold text-slate-600">{step.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
