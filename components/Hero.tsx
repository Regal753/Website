import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock3, MapPin, ShieldCheck } from 'lucide-react';
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
      title: '会社情報を公開',
      description: '所在地、代表者、電話番号、法人番号を確認できる状態にしています。',
    },
    {
      icon: ShieldCheck,
      title: '権利管理まで対応',
      description: '音楽著作権、利用許諾、台帳設計まで実務に落ちる形で整理します。',
    },
    {
      icon: Clock3,
      title: '1営業日以内に返信',
      description: '初回相談は無料。まだ課題が曖昧でもそのまま送れます。',
    },
  ];

  return (
    <section
      id={SectionId.HOME}
      className="bg-white pt-28 pb-14 md:pt-32 md:pb-24"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
            株式会社Regalo | 京都発の法人向け実務支援
          </div>

          <h1 className="text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl md:text-6xl md:font-bold">
            音楽権利と
            <span className="block">YouTube運用を、</span>
            <span className="block">法人で続く形へ</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {siteConfig.positioning.homepageSummary}
          </p>

          <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-700">
            <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1.5">会社情報を公開</span>
            <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1.5">初回相談無料</span>
            <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1.5">
              見積り前に範囲を整理
            </span>
          </div>

          <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            <Link
              to="/contact"
              onClick={() => trackEvent('cta_click', { placement: 'hero_primary', target: 'contact' })}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-primary-700/20 transition-all hover:-translate-y-px hover:bg-brand-primary-800 sm:w-auto sm:px-8 sm:py-4"
            >
              無料相談する
              <ArrowRight size={20} />
            </Link>
            <button
              onClick={() => {
                trackEvent('cta_click', { placement: 'hero_secondary', target: 'services' });
                scrollToServices();
              }}
              className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-800 transition-all hover:-translate-y-px hover:bg-slate-50 sm:w-auto sm:px-8 sm:py-4"
            >
              事業内容を見る
            </button>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-primary-700">
              <BookOpen className="h-4 w-4" />
              <span>相談前に読める実務メモ</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm leading-relaxed text-slate-700">
              {siteConfig.columnItems.slice(0, 3).map((item) => (
                <Link
                  key={item.slug}
                  to={`/column/#${item.slug}`}
                  onClick={() => trackEvent('column_detail_click', { placement: 'hero_ticker', slug: item.slug })}
                  className="inline-flex min-w-0 items-center gap-2 font-medium transition-colors hover:text-brand-primary-700"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden gap-3 sm:grid sm:grid-cols-3">
            {quickPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/50"
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
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm shadow-slate-200/50 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-500">Service</p>
                <h2 className="mt-1 text-xl font-semibold text-brand-ink">一つの窓口で整理する支援領域</h2>
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
                    to={`/services/${service.slug}/`}
                    onClick={() =>
                      trackEvent('service_detail_click', { placement: 'hero_service_card', service: service.slug })
                    }
                    className="grid grid-cols-[80px_minmax(0,1fr)] gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-brand-primary-200 hover:shadow-sm"
                  >
                    <img
                      src={asset(service.media.listImage)}
                      alt={`${service.title}のイメージ`}
                      width={640}
                      height={360}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      decoding="async"
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-brand-primary-700 shadow-sm">
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
            <div className="rounded-lg border border-brand-primary-100 bg-white p-5 text-brand-ink shadow-sm shadow-brand-primary-100/60">
              <p className="text-sm font-semibold text-slate-500">相談窓口</p>
              <h3 className="mt-2 text-2xl font-semibold">{siteConfig.companyName}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                運用だけでなく、権利や管理ルールまで含めて整理し、現場で続けられる形に整えます。
              </p>
            </div>

            <div className="rounded-lg border border-amber-200 bg-white/90 p-5 shadow-sm">
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
