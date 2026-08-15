import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, BadgeCheck, Building2, Music2, ShieldCheck } from 'lucide-react';
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
    description: '2024年6月設立。京都府長岡京市に本社',
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
      className="relative overflow-hidden bg-[linear-gradient(135deg,_#f3f6fb_0%,_#f8fafc_52%,_#fff8f1_100%)] pb-14 pt-28 md:pb-20 md:pt-32"
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
              音楽出版を軸とした運用支援
            </p>

            <h1 className="corporate-display mt-6 text-[2.3rem] font-bold text-brand-ink sm:text-5xl md:text-6xl lg:text-[4.15rem]">
              <span className="block">音楽とYouTubeの運用を、</span>
              <span className="mt-2 block bg-gradient-to-r from-amber-700 via-brand-primary-700 to-cyan-600 bg-clip-text text-transparent">
                権利情報の整理から支援します
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
                お問い合わせ・ご相談
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
                事業内容を見る
              </button>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              初回相談無料 ・ 原則1営業日以内に返信 ・ 資料未整理でも受付
            </p>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-[0_28px_80px_rgba(15,23,42,0.24)] sm:min-h-[420px] lg:min-h-[480px]">
            <img
              src={asset('images/services/music-cover-640.webp')}
              srcSet={`${asset('images/services/music-cover-480.webp')} 480w, ${asset('images/services/music-cover-640.webp')} 640w`}
              sizes="(min-width: 1280px) 592px, (min-width: 1024px) 46vw, 100vw"
              alt="音楽の権利情報確認と管理台帳整備"
              width={900}
              height={600}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/10" />
            <div className="relative flex min-h-[360px] flex-col justify-end p-6 text-white sm:min-h-[420px] sm:p-8 lg:min-h-[480px]">
              <p className="text-xs font-semibold tracking-[0.18em] text-amber-200">音楽出版・権利情報管理</p>
              <p className="mt-3 max-w-lg text-xl font-semibold leading-tight sm:text-2xl">
                公開前の確認手順と管理台帳を整備
              </p>
            </div>
          </div>
        </div>

        <div className="mt-7 grid overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-sm sm:grid-cols-3">
          {PROOF_POINTS.map((point) => (
            <div key={point.title} className="bg-white/95 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800 sm:h-10 sm:w-10 sm:rounded-2xl">
                  <point.icon className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold leading-tight text-brand-ink sm:text-base">{point.title}</p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
