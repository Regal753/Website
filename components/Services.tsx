import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';
import { SectionId } from '../types';
import { serviceCatalog } from '../services.catalog';
import { trackEvent } from '../utils/analytics';
import { getGradientStyle } from '../utils/gradient';

const themes: Record<
  string,
  {
    card: string;
    chip: string;
    eyebrow: string;
  }
> = {
  'music-publishing': {
    card: 'border-amber-200 bg-gradient-to-br from-amber-50 via-white to-white',
    chip: 'bg-amber-100 text-amber-900',
    eyebrow: 'BGM制作・権利情報管理',
  },
  'sns-management': {
    card: 'border-rose-200 bg-gradient-to-br from-rose-50 via-white to-white',
    chip: 'bg-rose-100 text-rose-800',
    eyebrow: 'YouTube運用',
  },
  'workflow-automation': {
    card: 'border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-white',
    chip: 'bg-cyan-100 text-cyan-900',
    eyebrow: '制作進行・業務自動化',
  },
};

const defaultTheme = {
  card: 'border-slate-200 bg-gradient-to-br from-slate-50 via-white to-white',
  chip: 'bg-slate-100 text-slate-800',
  eyebrow: '業務運用・改善',
};

const Services: React.FC = () => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  return (
    <section id={SectionId.SERVICES} className="bg-[#f6f8fc] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-end lg:gap-16 md:mb-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-primary-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-brand-primary-700 shadow-sm">
              事業内容
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-ink md:text-5xl">
              3つの事業領域
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-8 text-slate-600">
              BGM制作・権利情報管理、YouTube運用、制作進行・業務自動化に対応しています。
              ご相談内容に応じて、必要な事業領域を組み合わせてご提案します。
            </p>
            <p className="mt-3 text-sm font-semibold text-brand-primary-700">
              担当領域が不明な場合も、当社で確認します。
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {serviceCatalog.map((service, index) => {
            const Icon = service.icon;
            const theme = themes[service.slug] ?? defaultTheme;
            const isPrimary = index === 0;

            return (
              <article
                key={service.slug}
                className={`grid overflow-hidden rounded-2xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
                  isPrimary ? 'lg:col-span-2 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)]' : ''
                } ${theme.card}`}
              >
                <div className={`order-2 p-6 md:p-8 ${isPrimary ? 'lg:order-1 lg:p-10' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg md:h-14 md:w-14"
                      style={{ background: getGradientStyle(service.color) }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.chip}`}>
                        {theme.eyebrow}
                      </p>
                      <h3 className={`mt-3 font-semibold text-brand-ink ${isPrimary ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">
                    {service.description}
                  </p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-brand-primary-700 shadow-sm">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-slate-200/80 pt-5">
                    <p className="text-xs font-semibold tracking-wide text-slate-500">対象となる企業の例</p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{service.audience[0]}</p>
                  </div>

                  <Link
                    to={`/services/${service.slug}/`}
                    onClick={() =>
                      trackEvent('service_detail_click', { placement: 'services_cta', service: service.slug })
                    }
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-primary-800"
                  >
                    事業内容の詳細を見る
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div
                  className={`order-1 relative overflow-hidden bg-slate-200 ${
                    isPrimary ? 'min-h-[270px] lg:order-2 lg:min-h-full' : 'h-56 md:h-64'
                  }`}
                >
                  <img
                    src={asset(service.media.listImage)}
                    alt={`${service.title}のメインイメージ`}
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-white/5" />
                  <span className="absolute bottom-3 right-3 rounded-md bg-slate-950/70 px-2.5 py-1 text-xs font-semibold text-white/85 backdrop-blur">
                    業務イメージ
                  </span>
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
