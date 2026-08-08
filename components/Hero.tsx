import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, BadgeCheck, Building2, ExternalLink, Music2, Newspaper, ShieldCheck } from 'lucide-react';
import { serviceCatalog } from '../services.catalog';
import { JASRAC_RELATION_LABEL, siteConfig } from '../site.config';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const PROOF_POINTS = [
  {
    icon: ShieldCheck,
    title: JASRAC_RELATION_LABEL,
    description: '自社管理楽曲の著作権管理をJASRACへ委託',
  },
  {
    icon: BadgeCheck,
    title: 'MPA講座修了',
    description: '日本音楽出版社協会主催・2025年度修了',
  },
  {
    icon: Building2,
    title: '株式会社Regalo',
    description: '2024年6月設立。京都から会社窓口で対応',
  },
  {
    icon: Newspaper,
    title: '外部メディア掲載',
    description: 'クラウドワークス公式メディアに掲載',
    href: 'https://crowdworks.jp/times/interview/28780/',
  },
] as const;

const Hero: React.FC = () => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  const scrollToServices = () => {
    const el = document.getElementById(SectionId.SERVICES);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id={SectionId.HOME}
      className="relative overflow-hidden bg-[linear-gradient(135deg,_#fffdf8_0%,_#ffffff_45%,_#f4f7ff_100%)] pb-14 pt-28 md:pb-20 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute -right-20 top-16 h-96 w-96 rounded-full bg-indigo-200/35 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/85 px-3 py-1.5 text-sm font-semibold text-amber-900 shadow-sm backdrop-blur">
              <Music2 className="h-4 w-4" />
              音楽出版を軸にした運用支援
            </p>

            <h1 className="mt-6 text-[2.3rem] font-bold leading-[1.08] tracking-[-0.04em] text-brand-ink sm:text-5xl md:text-6xl lg:text-[4.15rem]">
              <span className="block">音楽とYouTubeを、</span>
              <span className="mt-2 block bg-gradient-to-r from-amber-700 via-brand-primary-700 to-cyan-600 bg-clip-text text-transparent">
                止まらない運用へ。
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {siteConfig.positioning.homepageSummary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-700">
              {['BGMの権利確認', 'YouTube運用設計', '共有・進行の整備'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/80 px-3 py-2.5 font-semibold shadow-sm backdrop-blur"
                >
                  <BadgeCheck className="h-4 w-4 shrink-0 text-brand-primary-700" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                onClick={() => trackEvent('cta_click', { placement: 'hero_primary', target: 'contact' })}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary-700 px-7 py-4 font-semibold text-white shadow-[0_14px_32px_rgba(67,56,202,0.25)] transition-all hover:-translate-y-0.5 hover:bg-brand-primary-800 sm:w-auto"
              >
                無料相談で整理する
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  trackEvent('cta_click', { placement: 'hero_secondary', target: 'services' });
                  scrollToServices();
                }}
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white/90 px-7 py-4 font-semibold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-brand-primary-200 hover:text-brand-primary-700 sm:w-auto"
              >
                支援内容を見る
              </button>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              初回相談無料 ・ 通常1営業日以内に返信 ・ 相談内容が未整理でもOK
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.24)] sm:p-5">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand-primary-500/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-amber-400/15 blur-3xl" />

            <div className="relative flex items-end justify-between gap-4 px-1 pb-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-white/75">SERVICE MAP</p>
                <h2 className="mt-2 text-xl font-semibold text-white">3つの領域を、1つの窓口で</h2>
              </div>
              <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 sm:inline-flex">
                音楽出版を優先
              </span>
            </div>

            <div className="relative grid gap-3 sm:grid-cols-2">
              {serviceCatalog.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}/`}
                    onClick={() =>
                      trackEvent('service_detail_click', { placement: 'hero_service_card', service: service.slug })
                    }
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all hover:-translate-y-0.5 hover:border-white/25 ${
                      index === 0 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className={`relative overflow-hidden ${index === 0 ? 'h-52 sm:h-60' : 'h-40'}`}>
                      <img
                        src={asset(service.media.listImage)}
                        alt={service.title}
                        width={1280}
                        height={720}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                      {index === 0 && (
                        <span className="absolute left-4 top-4 rounded-full border border-amber-300/30 bg-slate-950/65 px-3 py-1 text-xs font-semibold text-amber-200 backdrop-blur">
                          主力事業
                        </span>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 text-brand-primary-700">
                            <Icon className="h-4 w-4" />
                          </span>
                          <p className="font-semibold">{service.title}</p>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-white/70">
                          {service.items.slice(0, 2).join(' / ')}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="relative mt-3 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-white/70">
                どの領域に相談すべきか分からない段階でも、そのまま送ってください。
              </p>
              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-amber-200"
              >
                相談内容を整理する
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-sm lg:grid-cols-4">
          {PROOF_POINTS.map((point) => {
            const content = (
              <>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800 sm:h-10 sm:w-10 sm:rounded-2xl">
                  <point.icon className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold leading-tight text-brand-ink sm:text-base">{point.title}</p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{point.description}</p>
              {'href' in point && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary-700">
                  掲載記事を確認
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              )}
              </>
            );

            return 'href' in point ? (
              <a
                key={point.title}
                href={point.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('external_link_click', { platform: 'crowdworks_times', placement: 'hero_proof' })}
                className="bg-white/95 p-4 transition-colors hover:bg-amber-50/70 sm:p-5"
              >
                {content}
              </a>
            ) : (
              <div key={point.title} className="bg-white/95 p-4 sm:p-5">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
