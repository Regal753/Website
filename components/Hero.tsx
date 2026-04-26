import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Building2, CheckCircle2, Clock3, FileText, MapPin, ShieldCheck } from 'lucide-react';
import { serviceCatalog } from '../services.catalog';
import { siteConfig } from '../site.config';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const trustRows = [
  {
    icon: Building2,
    title: '法人情報の開示',
    description: '法人名、所在地、代表者、電話番号、法人番号を確認できるようにしています。',
  },
  {
    icon: ShieldCheck,
    title: '権利と台帳まで確認',
    description: '音楽利用、許諾、台帳、共有ルールまで、後から確認できる形を重視します。',
  },
  {
    icon: Clock3,
    title: '初回相談は無料',
    description: '相談内容が固まっていない段階でも、通常1営業日以内に状況を確認します。',
  },
] as const;

const proofChips = ['所在地・電話番号公開', '法人番号あり', '見積り前に範囲整理', 'SNS経由の相談も法人窓口で受付'] as const;

const Hero: React.FC = () => {
  const scrollToServices = () => {
    const el = document.getElementById(SectionId.SERVICES);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HOME} className="bg-[#fbfaf7] pt-28 md:pt-32">
      <div className="border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 sm:px-6 md:gap-12 md:pb-14 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="flex min-h-[560px] flex-col justify-center py-8 md:py-12">
            <p className="inline-flex w-fit items-center gap-2 border-l-4 border-emerald-700 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              株式会社Regalo / 京都府長岡京市
            </p>

            <h1 className="mt-8 font-serif text-6xl font-semibold tracking-normal text-brand-ink sm:text-7xl md:text-8xl">
              Regalo
            </h1>
            <p className="mt-5 text-2xl font-semibold leading-relaxed text-brand-ink md:text-3xl">
              音楽の価値を、きちんと届ける形に。
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
              {siteConfig.positioning.homepageSummary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {proofChips.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact/"
                onClick={() => trackEvent('cta_click', { placement: 'hero_primary', target: 'contact' })}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-px hover:bg-slate-800"
              >
                ご相談・お問い合わせ
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  trackEvent('cta_click', { placement: 'hero_secondary', target: 'services' });
                  scrollToServices();
                }}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-px hover:bg-slate-50"
              >
                事業内容を見る
                <FileText className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 max-w-2xl border border-slate-200 bg-white p-4">
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
                    <span className="h-1.5 w-1.5 shrink-0 bg-slate-900" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="relative border-l border-slate-200 bg-white px-5 py-8 md:px-8 lg:py-12">
            <div className="absolute right-0 top-0 hidden h-full w-24 border-l border-slate-200 bg-[linear-gradient(90deg,_rgba(248,250,252,0)_0%,_rgba(241,245,249,0.88)_100%)] lg:block" />
            <div className="relative max-w-xl">
              <p className="text-sm font-semibold text-emerald-800">はじめての方にも、あんしんの体制で。</p>
              <h2 className="mt-4 text-2xl font-semibold leading-relaxed text-brand-ink md:text-3xl">
                初見で確認したいことを、
                <br />
                先に出しておきます。
              </h2>

              <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                {trustRows.map((item) => (
                  <div key={item.title} className="grid grid-cols-[48px_minmax(0,1fr)_20px] gap-4 py-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center border border-slate-300 bg-white text-slate-900">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-brand-ink">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="border border-slate-200 bg-[#fbfaf7] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <MapPin className="h-4 w-4 text-emerald-800" />
                    拠点
                  </div>
                  <p className="mt-2 text-sm font-semibold text-brand-ink">{siteConfig.companyProfile.address}</p>
                </div>
                <div className="border border-slate-200 bg-[#fbfaf7] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Building2 className="h-4 w-4 text-emerald-800" />
                    法人番号
                  </div>
                  <p className="mt-2 text-sm font-semibold text-brand-ink">{siteConfig.companyProfile.corporateNumber}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl border-b border-slate-200 bg-white px-4 sm:px-6 md:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
        <div className="border-b border-slate-200 py-6 md:border-b-0 md:border-r md:pr-8">
          <p className="font-semibold text-brand-ink">事業内容</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">必要な領域から、無理なく始められます。</p>
        </div>
        <div className="grid divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {serviceCatalog.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}/`}
                onClick={() => trackEvent('service_detail_click', { placement: 'hero_service_strip', service: service.slug })}
                className="group px-0 py-6 transition-colors hover:bg-slate-50 md:px-6"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-900 transition-colors group-hover:border-brand-primary-200 group-hover:text-brand-primary-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brand-ink">{service.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.items.slice(0, 2).join(' / ')}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary-700">
                      詳細を見る
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
