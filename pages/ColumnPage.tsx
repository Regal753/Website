import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarDays, Clock3 } from 'lucide-react';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const ColumnPage: React.FC = () => {
  return (
    <div className="pt-24">
      <section className="border-b border-slate-200 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-semibold text-brand-primary-700">Column</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-brand-ink md:text-5xl">
              YouTube運用とBGM権利管理の実務メモ
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              Regaloが相談時によく確認する論点を、法人担当者が事前に読みやすい形でまとめています。
              施策の派手さよりも、権利、進行、共有、数字の確認漏れを減らすことを重視しています。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:px-8">
          {siteConfig.columnItems.map((item) => (
            <article
              id={item.slug}
              key={item.slug}
              className="scroll-mt-28 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-7"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-1 rounded bg-brand-primary-50 px-2.5 py-1 text-brand-primary-700 ring-1 ring-brand-primary-100">
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
                  <h2 className="mt-4 text-2xl font-semibold leading-snug text-brand-ink md:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{item.summary}</p>
                </div>

                <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-brand-ink">確認するポイント</p>
                  <ul className="mt-3 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary-700" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-slate-900 p-6 text-white md:p-8">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div>
                <p className="text-sm font-semibold text-white/60">Contact</p>
                <h2 className="mt-2 text-2xl font-semibold">自社の状況に合わせて確認したい方へ</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
                  YouTube運用、BGM権利管理、制作進行のどこから整えるべきかを、初回相談で切り分けます。
                </p>
              </div>
              <Link
                to="/contact"
                onClick={() => trackEvent('cta_click', { placement: 'column_page', target: 'contact' })}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                お問い合わせ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColumnPage;
