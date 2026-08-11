import React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  ExternalLink,
  FileText,
  ListChecks,
  Music2,
  Newspaper,
  ShieldCheck,
} from 'lucide-react';
import { JASRAC_RELATION_LABEL, siteConfig } from '../site.config';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const DELIVERABLES = [
  {
    icon: FileText,
    title: '権利情報・利用条件一覧',
    description: '確認できた根拠と未確認事項を分けて記録します。',
  },
  {
    icon: CalendarClock,
    title: '制作スケジュール・進捗表',
    description: '担当者、確認日、公開日を一つの表で追えるようにします。',
  },
  {
    icon: ListChecks,
    title: '公開前チェック・操作手順',
    description: '次に何を確認するか、担当者が迷わない形で残します。',
  },
] as const;

const PROOF_POINTS = [
  {
    icon: ShieldCheck,
    title: JASRAC_RELATION_LABEL,
    description: '自社管理楽曲の著作権管理をJASRACへ委託',
  },
  {
    icon: BadgeCheck,
    title: 'MPA講座修了',
    description: '音楽著作権管理者養成講座・2025年度修了',
  },
  {
    icon: Building2,
    title: '京都の法人',
    description: '株式会社Regalo・2024年6月設立',
  },
  {
    icon: Newspaper,
    title: '外部メディア掲載',
    description: 'クラウドワークス公式メディアの企業インタビュー',
    href: siteConfig.verificationLinks.mediaCoverage,
  },
] as const;

const Hero: React.FC = () => {
  const scrollToServices = () => {
    document.getElementById(SectionId.SERVICES)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HOME} className="border-b border-slate-200 bg-white pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] lg:items-center lg:gap-20">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
              <Music2 className="h-4 w-4" />
              京都・株式会社Regalo
            </p>

            <h1 className="corporate-display mt-5 max-w-4xl text-[2.35rem] font-bold text-brand-ink sm:text-5xl md:text-6xl lg:text-[4.2rem]">
              音楽とYouTubeを、
              <br />
              止まらない運用へ。
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {siteConfig.positioning.homepageSummary}
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-700">
              {['音楽権利管理', 'YouTube運用', '制作進行・定例業務'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-brand-primary-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                onClick={() => trackEvent('cta_click', { placement: 'hero_primary', target: 'contact' })}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary-700 px-7 py-4 font-semibold text-white transition-colors hover:bg-brand-primary-800 sm:w-auto"
              >
                見積りを相談する
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  trackEvent('cta_click', { placement: 'hero_secondary', target: 'services' });
                  scrollToServices();
                }}
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-800 transition-colors hover:border-brand-primary-400 hover:text-brand-primary-700 sm:w-auto"
              >
                対応内容を見る
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-500">初回相談無料 / 通常1営業日以内に返信 / 価格表は設けず個別見積り</p>
          </div>

          <aside className="border-l-4 border-brand-primary-700 bg-slate-50 px-6 py-7 sm:px-8 sm:py-9" aria-label="主な納品物">
            <p className="text-sm font-semibold text-brand-primary-700">ご相談後に残すもの</p>
            <h2 className="mt-2 text-2xl font-semibold leading-snug text-brand-ink">口頭の説明だけで終わらせません</h2>
            <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
              {DELIVERABLES.map((item) => (
                <div key={item.title} className="flex gap-4 py-5">
                  <item.icon className="mt-1 h-5 w-5 shrink-0 text-brand-primary-700" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-12 grid border-y border-slate-200 md:grid-cols-2 lg:grid-cols-4">
          {PROOF_POINTS.map((point) => {
            const content = (
              <>
                <div className="flex items-center gap-2">
                  <point.icon className="h-4 w-4 shrink-0 text-brand-primary-700" />
                  <p className="text-sm font-semibold text-brand-ink">{point.title}</p>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-600">{point.description}</p>
                {'href' in point && (
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary-700">
                    掲載記事
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
                className="border-b border-slate-200 px-4 py-5 transition-colors hover:bg-slate-50 md:border-r lg:border-b-0"
              >
                {content}
              </a>
            ) : (
              <div key={point.title} className="border-b border-slate-200 px-4 py-5 md:border-r lg:border-b-0">
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
