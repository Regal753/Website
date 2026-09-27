import React from 'react';
import { serviceCatalog } from '../services.catalog';
import { siteConfig } from '../site.config';
import { SectionId } from '../types';

const Cases: React.FC = () => (
  <section id={SectionId.CASES} className="bg-[#fbf8ee] py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl md:mb-14">
        <h2 className="text-3xl font-semibold text-brand-ink md:text-4xl">
          ご相談の例
        </h2>
      </div>

      <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
        {siteConfig.cases.map((c) => {
          const service = serviceCatalog.find((item) => item.slug === c.serviceSlug);
          if (!service) return null;

          return (
            <article key={c.title} className="border-t-2 border-slate-300 pt-6">
              <p className="text-xs font-semibold text-slate-500">{service.title}</p>
              <h3 className="mt-3 text-xl font-semibold leading-snug text-brand-ink md:text-2xl">{c.title}</h3>
              <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200 text-sm leading-7">
                <div className="py-4">
                  <dt className="font-semibold text-brand-ink">相談内容</dt>
                  <dd className="mt-1 text-slate-700">{c.challenge}</dd>
                </div>
                <div className="py-4">
                  <dt className="font-semibold text-brand-ink">対応内容</dt>
                  <dd className="mt-1 text-slate-700">{c.scope}</dd>
                </div>
                <div className="py-4">
                  <dt className="font-semibold text-brand-ink">納品物</dt>
                  <dd className="mt-1 text-slate-700">{c.deliverables.join('・')}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Cases;
