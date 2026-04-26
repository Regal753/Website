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
    card: 'border-slate-200 bg-white',
    chip: 'border border-rose-200 bg-rose-50 text-rose-800',
    imageBorder: 'border-rose-100',
    eyebrow: 'YouTube運用と改善',
  },
  'music-publishing': {
    card: 'border-slate-200 bg-white',
    chip: 'border border-amber-200 bg-amber-50 text-amber-900',
    imageBorder: 'border-amber-100',
    eyebrow: 'BGM制作と権利管理',
  },
  'production-workflow': {
    card: 'border-slate-200 bg-white',
    chip: 'border border-slate-200 bg-slate-50 text-slate-800',
    imageBorder: 'border-slate-200',
    eyebrow: '共有・進行・業務整理',
  },
};

const defaultTheme = {
  card: 'border-slate-200 bg-white',
  chip: 'border border-slate-200 bg-slate-50 text-slate-800',
  imageBorder: 'border-slate-200',
  eyebrow: '運用設計と改善',
};

const Services: React.FC = () => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  return (
    <section id={SectionId.SERVICES} className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 font-semibold text-brand-primary-700">Service</p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">
            事業内容
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            企画や運用の改善、音楽権利の整理、共有フローの整備まで。
            課題の場所に合わせて入口を用意しています。
          </p>
        </div>

        <div className="space-y-6">
          {serviceCatalog.map((service) => {
            const Icon = service.icon;
            const theme = themes[service.slug] ?? defaultTheme;
            const supportPoints = service.detailSections.flatMap((section) => section.points).slice(0, 2);

            return (
              <article
                key={service.slug}
                className={`grid gap-6 border p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[minmax(0,1fr)_320px] md:p-8 ${theme.card}`}
              >
                <div>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center shadow-lg"
                      style={{ background: getGradientStyle(service.color) }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className={`inline-flex px-3 py-1 text-xs font-semibold ${theme.chip}`}>
                        {theme.eyebrow}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-brand-ink md:text-2xl">
                        <Link
                          to={`/services/${service.slug}/`}
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
                        className="inline-flex border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5">
                    <Link
                      to={`/services/${service.slug}/`}
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

                <div className="grid grid-cols-2 gap-3">
                  <img
                    src={asset(service.media.listImage)}
                    alt={`${service.title}のメインイメージ`}
                    width={1280}
                    height={720}
                    className={`col-span-2 h-44 w-full border bg-white object-cover ${theme.imageBorder}`}
                    loading="eager"
                    decoding="async"
                  />
                  {supportPoints.map((point) => (
                    <div
                      key={point}
                      className={`min-h-28 border bg-white p-4 text-sm font-semibold leading-relaxed text-slate-700 ${theme.imageBorder}`}
                    >
                      {point}
                    </div>
                  ))}
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
