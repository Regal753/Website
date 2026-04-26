import React from 'react';
import { ArrowRight, FileSearch, MessageSquare, Rocket, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionId } from '../types';

const STEPS = [
  {
    icon: Send,
    title: 'フォーム送信',
    description: 'お問い合わせフォームから、ご相談内容をお送りください。簡単な概要で構いません。',
    note: 'ここまでは最短数分で完了',
    surface: 'border-amber-100 bg-amber-50/80',
    iconSurface: 'bg-amber-100 text-amber-800',
  },
  {
    icon: MessageSquare,
    title: 'ヒアリング・返信',
    description: '通常1営業日以内にご連絡します。必要に応じてオンラインミーティングを設定します。',
    note: '相談整理とヒアリングは無料',
    surface: 'border-rose-100 bg-rose-50/80',
    iconSurface: 'bg-rose-100 text-rose-700',
  },
  {
    icon: FileSearch,
    title: 'ご提案・お見積り',
    description: '課題を整理し、作業範囲・スケジュール・費用を明記したご提案をお送りします。',
    note: 'スコープと費用感を先に明示',
    surface: 'border-brand-primary-100 bg-brand-primary-50/80',
    iconSurface: 'bg-brand-primary-100 text-brand-primary-700',
  },
  {
    icon: Rocket,
    title: '着手',
    description: 'ご発注確定後、キックオフミーティングを経てプロジェクトを開始します。',
    note: '着手後も改善の定着まで伴走',
    surface: 'border-cyan-100 bg-cyan-50/80',
    iconSurface: 'bg-cyan-100 text-cyan-800',
  },
] as const;

const Process: React.FC = () => {
  return (
    <section id={SectionId.PROCESS} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            ご相談から着手までの流れ
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">進め方</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            相談の入口はシンプルにして、着手前にスコープと費用を明確にします。
            「何から話せばいいか分からない」状態でも進められる流れにしています。
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-amber-200 via-brand-primary-200 to-cyan-200 xl:block" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {STEPS.map((step, index) => (
              <article
                key={step.title}
                className={`relative rounded-lg border p-6 shadow-sm shadow-slate-200/40 ${step.surface}`}
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
                <p className="mt-5 text-xs font-semibold tracking-wide text-slate-500">{step.note}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-[#fffaf7] p-5 shadow-sm md:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-500">着手前に明確にすること</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                相談段階で「どこから手を付けるべきか」を一緒に整理し、作業範囲、優先順位、費用感を明確にしてから着手します。
              </p>
            </div>
            <Link
              to="/contact/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-800"
            >
              無料相談から始める
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
