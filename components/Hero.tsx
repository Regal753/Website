import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, MapPin, ShieldCheck } from 'lucide-react';
import { serviceCatalog } from '../services.catalog';
import { siteConfig } from '../site.config';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const Hero: React.FC = () => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  const scrollToServices = () => {
    const el = document.getElementById(SectionId.SERVICES);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const quickPoints = [
    {
      icon: MapPin,
      title: '所在地・法人番号を公開',
      description: '京都府長岡京市の法人として、会社情報を公開しています。',
    },
    {
      icon: ShieldCheck,
      title: '権利管理まで実務対応',
      description: '音楽著作権や台帳設計など、裏側の管理もまとめて整理します。',
    },
    {
      icon: Clock3,
      title: '1営業日以内に返信',
      description: '初回相談は無料。まだ課題が曖昧でも構いません。',
    },
  ];

  return (
    <section
      id={SectionId.HOME}
      className="bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] pt-28 pb-14 md:pt-32 md:pb-24"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
            株式会社Regalo / 京都府長岡京市
          </div>

          <h1 className="text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl md:text-6xl md:font-bold">
            音楽出版・BGM権利管理と
            <span className="block">YouTube運用を支援</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {siteConfig.positioning.homepageSummary}
          </p>

          <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-700">
            <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1.5">初回相談無料</span>
            <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1.5">1営業日以内に返信</span>
            <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1.5">
              会社窓口で対応
            </span>
          </div>

          <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            <Link
              to="/contact"
              onClick={() => trackEvent('cta_click', { placement: 'hero_primary', target: 'contact' })}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-primary-700/20 transition-all hover:-translate-y-px hover:bg-brand-primary-800 sm:w-auto sm:px-8 sm:py-4"
            >
              お問い合わせ
              <ArrowRight size={20} />
            </Link>
            <button
              onClick={() => {
                trackEvent('cta_click', { placement: 'hero_secondary', target: 'services' });
                scrollToServices();
              }}
              className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-800 transition-all hover:-translate-y-px hover:bg-slate-50 sm:w-auto sm:px-8 sm:py-4"
            >
              事業一覧を見る
            </button>
          </div>

          <div className="hidden gap-3 sm:grid sm:grid-cols-3">
            {quickPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-800">
                  <point.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-brand-ink">{point.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-500">ご相談が多いテーマ</p>
                <h2 className="mt-1 text-xl font-semibold text-brand-ink">3つの支援領域</h2>
              </div>
              <span className="rounded-full border border-brand-primary-100 bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700">
                会社窓口で対応
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {serviceCatalog.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    onClick={() =>
                      trackEvent('service_detail_click', { placement: 'hero_service_card', service: service.slug })
                    }
                    className="grid grid-cols-[80px_minmax(0,1fr)] gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all hover:border-brand-primary-200 hover:bg-white hover:shadow-sm"
                  >
                    <img
                      src={asset(service.media.listImage)}
                      alt={`${service.title}のイメージ`}
                      width={640}
                      height={360}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      decoding="async"
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white text-brand-primary-700 shadow-sm">
                          <Icon className="h-4 w-4" />
                        </span>
                        <p className="truncate text-sm font-semibold text-brand-ink">{service.title}</p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {service.items.slice(0, 2).join(' / ')}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden mt-4 gap-4 sm:grid sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-primary-100 bg-white p-5 text-brand-ink shadow-sm shadow-brand-primary-100/60">
              <p className="text-sm font-semibold text-slate-500">相談窓口</p>
              <h3 className="mt-2 text-2xl font-semibold">{siteConfig.companyName}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                運用だけでなく、権利や管理ルールまで含めて整理し、現場で回る形に整えます。
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-white/90 p-5 shadow-sm">
              <p className="text-sm font-semibold text-amber-800">初回相談について</p>
              <p className="mt-2 text-2xl font-semibold text-brand-ink">無料 / 1営業日以内に返信</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                フォームは24時間受付。電話受付は 9:00-20:00 で対応しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
