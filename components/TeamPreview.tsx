import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, MapPin, Sparkles } from 'lucide-react';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const PROFILE_HIGHLIGHTS = [
  'JASRAC信託会員',
  '音楽著作権管理者養成講座修了',
  '2024年6月法人設立',
  '京都発の実務チーム',
];

const TEAM_VALUES = [
  '相談内容を、実務で回る設計に落とし込む',
  '運用だけでなく、権利やルール整備まで見る',
  '納品して終わりではなく、継続しやすい形で残す',
];

const TeamPreview: React.FC = () => {
  return (
    <section className="bg-[#fffaf7] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            体制と支援方針
          </p>
          <h2 className="text-3xl font-semibold text-brand-ink md:text-4xl">体制と支援方針</h2>
          <p className="mx-auto mt-4 max-w-3xl text-slate-600">
            {siteConfig.positioning.companySummary}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-brand-primary-100 bg-[linear-gradient(135deg,_#eef2ff_0%,_#ffffff_50%,_#fff7ed_100%)] p-8 text-brand-ink shadow-sm shadow-brand-primary-100/60">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary-100 bg-white text-2xl font-semibold text-brand-primary-700 shadow-sm">
              R
            </div>
            <p className="mt-6 text-sm font-medium text-slate-500">運営体制</p>
            <h3 className="mt-1 text-3xl font-semibold">{siteConfig.companyName}</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              少人数チームで、相談整理から運用定着までを連続して対応します。
              運用、権利、共有フローのどこに課題があるかを切り分け、実務に落ちる形まで設計します。
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-2xl border border-brand-primary-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
              <MapPin className="h-4 w-4 text-amber-700" />
              京都発の実務チーム
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <h3 className="text-2xl font-semibold text-brand-ink">相談から改善まで、同じ目線で伴走する</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                  初回の課題整理から、運用体制づくり、権利や台帳の整備、共有フローの改善まで、
                  実際に現場で回せるかを基準に設計します。見栄えだけを整える提案ではなく、
                  日々の運用負荷を下げるところまで踏み込みます。
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {PROFILE_HIGHLIGHTS.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      <BadgeCheck className="h-3.5 w-3.5 text-brand-primary-700" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">大事にしていること</p>
                <ul className="mt-4 space-y-3">
                  {TEAM_VALUES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                        <Sparkles className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/company"
                onClick={() => trackEvent('cta_click', { placement: 'team_preview', target: 'company' })}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-800"
              >
                会社情報と支援体制を見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;
