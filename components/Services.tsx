import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionId } from '../types';
import { serviceCatalog } from '../services.catalog';
import { trackEvent } from '../utils/analytics';
import { getGradientStyle } from '../utils/gradient';

const themes: Record<
  string,
  {
    card: string;
    chip: string;
    imageBorder: string;
    eyebrow: string;
  }
> = {
  'sns-management': {
    card: 'border-rose-200 bg-gradient-to-br from-rose-50 via-white to-white',
    chip: 'bg-rose-100 text-rose-800',
    imageBorder: 'border-rose-100',
    eyebrow: 'YouTube運用と改善',
  },
  'music-publishing': {
    card: 'border-amber-200 bg-gradient-to-br from-amber-50 via-white to-white',
    chip: 'bg-amber-100 text-amber-900',
    imageBorder: 'border-amber-100',
    eyebrow: 'BGM制作と権利管理',
  },
  'ai-marketing-strategy': {
    card: 'border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-white',
    chip: 'bg-cyan-100 text-cyan-900',
    imageBorder: 'border-cyan-100',
    eyebrow: '共有・進行・自動化',
  },
};

const defaultTheme = {
  card: 'border-slate-200 bg-gradient-to-br from-slate-50 via-white to-white',
  chip: 'bg-slate-100 text-slate-800',
  imageBorder: 'border-slate-200',
  eyebrow: '運用設計と改善',
};

const Services: React.FC = () => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  return (
    <section id={SectionId.SERVICES} className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-primary-200 bg-brand-primary-50 px-3 py-1 text-xs font-semibold tracking-wide text-brand-primary-700">
            支援領域
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">3つの支援領域</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            企画や運用の改善、音楽権利の整理、共有フローの自動化まで。
            課題の場所に合わせて入口を用意しています。
          </p>
        </div>

        <div className="space-y-6">
          {serviceCatalog.map((service) => {
            const Icon = service.icon;
            const theme = themes[service.slug] ?? defaultTheme;

            return (
              <article
                key={service.slug}
                className={`grid gap-6 rounded-3xl border p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[minmax(0,1fr)_340px] md:p-8 ${theme.card}`}
              >
                <div>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg"
                      style={{ background: getGradientStyle(service.color) }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.chip}`}>
                        {theme.eyebrow}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-brand-ink md:text-2xl">
                        <Link
                          to={`/services/${service.slug}`}
                          onClick={() =>
                            trackEvent('service_detail_click', { placement: 'services_title', service: service.slug })
                          }
                          className="transition-colors hover:text-brand-primary-700"
                        >
                          {service.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm font-semibold text-slate-700 md:text-base"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.techStack.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5">
                    <Link
                      to={`/services/${service.slug}`}
                      onClick={() =>
                        trackEvent('service_detail_click', { placement: 'services_cta', service: service.slug })
                      }
                      className="inline-flex items-center gap-2 font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-800"
                    >
                      料金・進め方・事例を見る
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className={`h-60 overflow-hidden rounded-3xl border bg-white md:h-full md:min-h-[260px] ${theme.imageBorder}`}>
                  <img
                    src={asset(service.media.listImage)}
                    alt={`${service.title}のメインイメージ`}
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
