import React, { useMemo } from 'react';
import { siteConfig } from '../site.config';
import { shouldDisplayNews, sortValidNewsItems } from '../utils/news';
import SectionHeading from './SectionHeading';

const News: React.FC = () => {
  const items = useMemo(() => sortValidNewsItems(siteConfig.newsItems), []);

  if (!shouldDisplayNews(items)) return null;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <SectionHeading
            eyebrow="NEWS"
            title="お知らせ"
            lead="事業内容の更新や外部メディア掲載をお知らせします。"
          />

          <ul className="divide-y divide-slate-200 border-y border-slate-300">
            {items.map((item) => {
              const isExternalLink = typeof item.href === 'string' && /^https?:\/\//.test(item.href);

              return (
                <li
                  key={`${item.date}-${item.title}-${item.href ?? 'no-link'}`}
                  className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <time className="w-28 shrink-0 text-sm font-semibold tabular-nums text-slate-600">
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
                        {isExternalLink ? '掲載記事を見る' : '詳しく見る'}
                        <span aria-hidden="true">{isExternalLink ? '↗' : '→'}</span>
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default News;
