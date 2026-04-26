import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarDays, Clock3 } from 'lucide-react';
import { siteConfig } from '../site.config';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const Column: React.FC = () => {
  const featuredItems = siteConfig.columnItems.slice(0, 4);

  return (
    <section id={SectionId.COLUMN} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-semibold text-brand-primary-700">Column</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-ink md:text-4xl">
              相談前に読める
              <br />
              実務メモ
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              YouTube運用、BGM権利管理、制作進行でよく詰まる論点を、相談前に確認できる形で整理しています。
              派手なノウハウではなく、現場で見落としやすい確認事項を中心に掲載します。
            </p>
            <Link
              to="/column"
              onClick={() => trackEvent('column_index_click', { placement: 'home_column_heading' })}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-brand-primary-200 bg-brand-primary-50 px-4 py-2.5 text-sm font-semibold text-brand-primary-700 transition-colors hover:bg-brand-primary-100"
            >
              コラム一覧を見る
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {featuredItems.map((item) => (
              <article
                key={item.slug}
                className="group rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-primary-200 hover:bg-white hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1 rounded bg-white px-2.5 py-1 text-brand-primary-700 ring-1 ring-slate-200">
                    <BookOpen className="h-3.5 w-3.5" />
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {item.readTime}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-brand-ink transition-colors group-hover:text-brand-primary-700">
                  <Link
                    to={`/column/#${item.slug}`}
                    onClick={() => trackEvent('column_detail_click', { placement: 'home_column_card', slug: item.slug })}
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.points.slice(0, 2).map((point) => (
                    <span
                      key={point}
                      className="inline-flex rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Column;
