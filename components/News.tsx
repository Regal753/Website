import React, { useMemo } from 'react';
import { siteConfig } from '../site.config';
import { shouldDisplayNews, sortValidNewsItems } from '../utils/news';

const News: React.FC = () => {
  const items = useMemo(() => sortValidNewsItems(siteConfig.newsItems), []);

  if (!shouldDisplayNews(items)) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm sm:p-6 md:p-8">
          <div className="mb-5">
            <p className="text-xs font-semibold tracking-widest text-brand-primary-700">更新情報</p>
            <h2 className="mt-1 text-xl font-semibold text-brand-ink sm:text-2xl">お知らせ</h2>
          </div>
          <ul className="divide-y divide-slate-200/90">
            {items.map((item) => (
              <li key={`${item.date}-${item.title}`} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:gap-5 sm:py-4">
                <time className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">{item.date}</time>
                <p className="text-sm text-slate-700 sm:text-base">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default News;
