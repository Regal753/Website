import React from 'react';
import { FileSearch, MessageSquare, Rocket, Send } from 'lucide-react';
import { SectionId } from '../types';

const STEPS = [
  {
    icon: Send,
    title: 'フォーム送信',
    description: 'お問い合わせフォームから、ご相談内容をお送りください。簡単な概要で構いません。',
  },
  {
    icon: MessageSquare,
    title: 'ヒアリング・返信',
    description: '1〜2営業日以内にメールでご連絡します。必要に応じてオンラインミーティングを設定します。',
  },
  {
    icon: FileSearch,
    title: 'ご提案・お見積り',
    description: '課題を整理し、作業範囲・スケジュール・費用を明記したご提案書をお送りします。',
  },
  {
    icon: Rocket,
    title: '着手',
    description: 'ご発注確定後、キックオフミーティングを経てプロジェクトを開始します。',
  },
];

const Process: React.FC = () => {
  return (
    <section id={SectionId.PROCESS} className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
            ご相談から着手までの流れ
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">進め方</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            お問い合わせから着手まで、4つのステップで進めます。初回の相談整理とヒアリングは無料です。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="relative text-center">
              {index < STEPS.length - 1 && (
                <div className="absolute left-[60%] top-10 hidden h-px w-[80%] bg-slate-200 md:block" />
              )}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary-500 to-brand-primary-700 shadow-lg">
                <step.icon className="h-8 w-8 text-white" />
              </div>
              <div className="mb-2 text-xs font-semibold tracking-wide text-slate-500">STEP {index + 1}</div>
              <h3 className="mb-2 text-lg font-semibold text-brand-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-600 shadow-sm md:p-6">
          相談段階で「どこから手を付けるべきか」を一緒に整理します。
          実装・運用に入る前に、作業範囲、優先順位、費用感を明確にしてから着手します。
        </div>
      </div>
    </section>
  );
};

export default Process;
