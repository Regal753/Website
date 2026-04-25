import React, { useMemo } from 'react';
import { siteConfig } from '../site.config';
import { shouldDisplayNews, sortValidNewsItems } from '../utils/news';

const News: React.FC = () => {
  const items = useMemo(() => sortValidNewsItems(siteConfig.newsItems), []);

  if (!shouldDisplayNews(items)) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div>
          <p className="font-semibold text-brand-primary-700">News</p>
          <h2 className="mt-4 text-3xl font-semibold text-brand-ink">お知らせ</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            外部掲載、資格取得、体制変更、サイト更新など、公開している動きをここにまとめています。
          </p>
        </div>

          <div className="rounded-lg border border-slate-200 bg-[#fffaf7] p-5 shadow-sm md:p-6">
            <ul className="divide-y divide-slate-200/90">
              {items.map((item) => {
                const isExternalLink = typeof item.href === 'string' && /^https?:\/\//.test(item.href);

                return (
                  <li
                    key={`${item.date}-${item.title}-${item.href ?? 'no-link'}`}
                    className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-5"
                  >
                    <time className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold tabular-nums text-slate-900">
                      {item.date}
                    </time>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={isExternalLink ? '_blank' : undefined}
                          rel={isExternalLink ? 'noreferrer' : undefined}
                          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-800"
                        >
                          掲載記事を見る
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
