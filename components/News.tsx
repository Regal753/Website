import React, { useMemo } from 'react';
import { siteConfig } from '../site.config';
import { shouldDisplayNews, sortValidNewsItems } from '../utils/news';

const News: React.FC = () => {
  const items = useMemo(
    () => sortValidNewsItems(siteConfig.newsItems),
    []
  );

  if (!shouldDisplayNews(items)) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm sm:p-6 md:p-8">
          <div className="mb-5">
            <p className="text-xs font-semibold tracking-widest text-brand-primary-700">NEWS</p>
            <h2 className="mt-1 text-xl font-semibold text-brand-ink sm:text-2xl">お知らせ</h2>
          </div>
          <ul className="divide-y divide-slate-200/90">
            {items.map((item) => (
              <li key={`${item.date}-${item.title}`} className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5">
                <time className="text-sm font-semibold text-slate-900 tabular-nums shrink-0">{item.date}</time>
                <p className="text-sm sm:text-base text-slate-700">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default News;
