import React, { useMemo } from 'react';
import { siteConfig } from '../site.config';

const NEWS_VISIBLE_DAYS = 90;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const parseNewsDate = (value: string): Date | null => {
  const match = value.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  return Number.isNaN(date.getTime()) ? null : date;
};

const News: React.FC = () => {
  const items = useMemo(
    () =>
      siteConfig.newsItems
        .map((item) => ({
          ...item,
          timestamp: parseNewsDate(item.date)?.getTime() ?? Number.NaN,
        }))
        .filter((item) => Number.isFinite(item.timestamp))
        .sort((a, b) => b.timestamp - a.timestamp),
    []
  );

  if (items.length === 0) return null;

  const latestDate = items[0].timestamp;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const staleDays = Math.floor((today.getTime() - latestDate) / MS_PER_DAY);

  if (staleDays > NEWS_VISIBLE_DAYS) return null;

  return (
    <section className="py-10 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 shadow-sm">
          <div className="mb-4 sm:mb-5">
            <p className="text-xs font-semibold tracking-widest text-blue-700">NEWS</p>
            <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">お知らせ</h2>
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
