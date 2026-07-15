import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { serviceCatalog } from '../services.catalog';
import { siteConfig } from '../site.config';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const caseStyles: Record<
  string,
  {
    card: string;
    icon: string;
    chip: string;
  }
> = {
  'music-publishing': {
    card: 'border-amber-200 bg-gradient-to-b from-amber-50/80 via-white to-white',
    icon: 'border-amber-200 bg-amber-100 text-amber-900',
    chip: 'bg-amber-100 text-amber-900',
  },
  'sns-management': {
    card: 'border-rose-200 bg-gradient-to-b from-rose-50/80 via-white to-white',
    icon: 'border-rose-200 bg-rose-100 text-rose-800',
    chip: 'bg-rose-100 text-rose-800',
  },
  'ai-marketing-strategy': {
    card: 'border-cyan-200 bg-gradient-to-b from-cyan-50/80 via-white to-white',
    icon: 'border-cyan-200 bg-cyan-100 text-cyan-900',
    chip: 'bg-cyan-100 text-cyan-900',
  },
};

const defaultStyle = {
  card: 'border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white',
  icon: 'border-slate-200 bg-slate-100 text-slate-800',
  chip: 'bg-slate-100 text-slate-800',
};

const Cases: React.FC = () => {
  return (
    <section id={SectionId.CASES} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-end lg:gap-16 md:mb-14">
          <div>
            <p className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
              支援イメージ
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-ink md:text-5xl">
              課題を、運用に残る
              <br />
              形へ変える
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-600">
            自社運用やこれまで扱ってきた課題をもとに、相談前の状態から、何を整え、
            どの納品物として残すのかを3つの例で紹介します。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {siteConfig.cases.map((c) => {
            const service = serviceCatalog.find((item) => item.slug === c.serviceSlug);
            if (!service) return null;
            const Icon = service.icon;
            const style = caseStyles[c.serviceSlug] ?? defaultStyle;

            return (
              <article
                key={c.title}
                className={`flex h-full flex-col rounded-[32px] border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl md:p-7 ${style.card}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${style.icon}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.chip}`}>
                    {service.title}
                  </span>
                </div>

                <p className="mt-6 text-xs font-semibold tracking-wide text-slate-500">{c.clientType}</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-brand-ink">{c.title}</h3>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white/90 p-4">
                  <p className="text-xs font-semibold tracking-[0.12em] text-slate-400">BEFORE / 課題</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{c.challenge}</p>
                </div>

                <div className="my-3 flex justify-center text-slate-400" aria-hidden="true">
                  <ArrowDown className="h-5 w-5" />
                </div>

                <div className="rounded-2xl bg-slate-950 p-4 text-white">
                  <p className="text-xs font-semibold tracking-[0.12em] text-white/45">DESIGN / 整えるもの</p>
                  <p className="mt-2 text-sm leading-7 text-white/80">{c.scope}</p>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold tracking-[0.12em] text-slate-400">AFTER / 整った状態</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{c.outcome}</p>
                </div>

                <ul className="mt-5 space-y-2">
                  {c.results.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary-700" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {c.deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/contact"
            onClick={() => trackEvent('cta_click', { placement: 'cases_section', target: 'contact' })}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-primary-200 hover:text-brand-primary-700"
          >
            同じような課題を相談する
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cases;
