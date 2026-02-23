import React from 'react';
import { Send, MessageSquare, FileSearch, Rocket } from 'lucide-react';
import { SectionId } from '../types';

const STEPS = [
  {
    icon: Send,
    title: 'フォーム送信',
    description: 'お問い合わせフォームから、ご相談内容をお送りください。簡単な概要で構いません。',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MessageSquare,
    title: 'ヒアリング・返信',
    description: '1〜2 営業日以内にメールでご連絡します。必要に応じてオンラインミーティングを設定します。',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: FileSearch,
    title: 'ご提案・お見積り',
    description: '課題を整理し、作業範囲・スケジュール・費用を明記したご提案書をお送りします。',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Rocket,
    title: '着手',
    description: 'ご発注確定後、キックオフミーティングを経てプロジェクトを開始します。',
    color: 'from-blue-500 to-indigo-500',
  },
];

const Process: React.FC = () => {
  return (
    <section id={SectionId.PROCESS} className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">進め方</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            お問い合わせから着手まで、4 つのステップで進めます。
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <div key={index} className="relative text-center">
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-slate-200" />
              )}
              <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}>
                <step.icon className="text-white w-8 h-8" />
              </div>
              <div className="mb-2 text-xs font-semibold tracking-wide text-slate-500">STEP {index + 1}</div>
              <h3 className="mb-2 text-lg font-semibold text-brand-ink">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

