import React from 'react';
import { Link } from 'react-router-dom';
import { serviceCatalog } from '../services.catalog';
import { siteConfig } from '../site.config';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const caseStyles: Record<
  string,
  {
    colorClass: string;
    serviceChip: string;
  }
> = {
  'sns-management': {
    colorClass: 'text-red-700 bg-red-50 border-red-100',
    serviceChip: 'bg-red-100 text-red-800',
  },
  'music-publishing': {
    colorClass: 'text-brand-primary-700 bg-brand-primary-50 border-brand-primary-100',
    serviceChip: 'bg-brand-primary-100 text-brand-primary-800',
  },
  'ai-marketing-strategy': {
    colorClass: 'text-cyan-700 bg-cyan-50 border-cyan-100',
    serviceChip: 'bg-cyan-100 text-cyan-900',
  },
};

const defaultStyle = {
  colorClass: 'text-slate-700 bg-slate-50 border-slate-200',
  serviceChip: 'bg-slate-100 text-slate-800',
};

const Cases: React.FC = () => {
  return (
    <section id={SectionId.CASES} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            数字が見える形で事例を出す
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">解決事例</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            抽象的な「改善しました」ではなく、何を整えて、どの変化が出たかを分かる形で掲載します。
          </p>
        </div>

        <div className="space-y-5">
          {siteConfig.cases.map((c) => {
            const service = serviceCatalog.find((item) => item.slug === c.serviceSlug);
            if (!service) return null;
            const Icon = service.icon;
            const style = caseStyles[c.serviceSlug] ?? defaultStyle;
            return (
              <article
                key={c.title}
                className="rounded-3xl border border-slate-200 bg-[#fffaf7] p-6 shadow-sm transition-all hover:border-brand-primary-200 hover:shadow-md md:p-8"
              >
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                  <div>
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 rounded-2xl border p-3 ${style.colorClass}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style.serviceChip}`}>
                          {service.title}
                        </p>
                        <p className="text-sm font-semibold text-slate-500">{c.clientType}</p>
                        <h3 className="mt-1 text-2xl font-semibold text-brand-ink">{c.title}</h3>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-xs font-semibold tracking-wider text-slate-500">背景</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">{c.challenge}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-xs font-semibold tracking-wider text-slate-500">対応内容</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">{c.scope}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-xs font-semibold tracking-wider text-slate-500">成果</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{c.outcome}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.deliverables.map((item) => (
                        <span
                          key={item}
                          className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <aside className="rounded-3xl border border-brand-primary-100 bg-[linear-gradient(135deg,_#eef2ff_0%,_#ffffff_55%,_#fff7ed_100%)] p-5 text-brand-ink shadow-sm shadow-brand-primary-100/60">
                    <p className="text-sm font-semibold text-slate-500">見えた変化</p>
                    <ul className="mt-4 space-y-3">
                      {c.results.map((item) => (
                        <li key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </aside>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/contact"
            onClick={() => trackEvent('cta_click', { placement: 'cases_section', target: 'contact' })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-800"
          >
            同じような課題を相談する
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cases;
