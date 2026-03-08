import React from 'react';
import { ArrowRight, BadgeCheck, FileText, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionId } from '../types';

const pricingSteps = [
  {
    icon: MessageSquare,
    title: '相談内容を整理',
    description: '現状課題と優先順位を確認し、必要な支援範囲を切り分けます。',
  },
  {
    icon: FileText,
    title: '明細つきで見積り',
    description: '作業範囲、期間、体制、費用を明記したお見積りをお送りします。',
  },
  {
    icon: BadgeCheck,
    title: '納得できたら着手',
    description: 'ご納得いただけた場合のみ発注。ここまで費用はかかりません。',
  },
] as const;

const pricingPoints = ['初回相談無料', '30分程度のオンライン相談可', '定額より必要範囲を優先'] as const;

const Pricing: React.FC = () => {
  return (
    <section id={SectionId.PRICING} className="bg-[#fffaf7] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            料金の考え方
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">料金について</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            定額メニューを先に置くのではなく、必要な支援範囲を整理したうえで個別にお見積りします。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="rounded-[32px] bg-gradient-to-br from-brand-primary-700 via-brand-primary-800 to-slate-900 p-8 text-white shadow-xl shadow-brand-primary-900/10">
            <p className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
              初回相談は無料
            </p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight text-white">
              定額より、
              <br />
              必要な範囲を正確に出す
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              相談内容によって、必要な支援は大きく変わります。最初に作業範囲と期待値を揃え、過不足のない見積りにします。
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {pricingPoints.map((item) => (
                <span
                  key={item}
                  className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-primary-700 transition-colors hover:bg-slate-100"
            >
              まずは相談する
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pricingSteps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary-50 text-brand-primary-700">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-brand-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
