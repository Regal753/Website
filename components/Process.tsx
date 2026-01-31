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
    color: 'from-violet-500 to-purple-500',
  },
];

const Process: React.FC = () => {
  return (
    <section id={SectionId.PROCESS} className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">進め方</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            お問い合わせから着手まで、4 つのステップで進めます。
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <div key={index} className="relative text-center">
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-slate-700" />
              )}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <step.icon className="text-white w-8 h-8" />
              </div>
              <div className="text-xs text-slate-500 font-bold mb-2">STEP {index + 1}</div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

