import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, MapPin } from 'lucide-react';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const PROFILE_HIGHLIGHTS = [
  '音楽著作権管理者養成講座修了',
  'BGM権利台帳の整備に対応',
  '2024年6月法人設立',
  '京都府長岡京市を拠点に活動',
] as const;

const TEAM_VALUES = [
  '返信、確認、記録を後回しにしない',
  '見栄えよりも、現場で続く手順を優先する',
  '相談内容をそのまま受けず、必要な範囲へ切り分ける',
] as const;

const TeamPreview: React.FC = () => {
  return (
    <section className="bg-[#fbfaf7] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl md:mb-14">
          <p className="mb-4 inline-flex border border-amber-200 bg-white px-3 py-1 text-xs font-semibold text-amber-800">
            代表・支援体制
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-brand-ink md:text-4xl">
            若い会社だからこそ、
            <br />
            誠実さを手順で見せる。
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            見た目の勢いや大きな実績の言い切りではなく、相談内容を整理し、記録に残し、実務で続けられる形まで落とし込むことを重視しています。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="border border-slate-200 bg-white p-8 text-brand-ink shadow-sm shadow-slate-200/50">
            <div className="inline-flex h-16 w-16 items-center justify-center border border-slate-300 bg-white font-serif text-3xl font-semibold text-brand-ink">
              R
            </div>
            <p className="mt-6 text-sm font-medium text-slate-500">運営会社</p>
            <h3 className="mt-1 text-3xl font-semibold">{siteConfig.companyProfile.legalName}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              少人数の法人窓口として、相談整理から運用定着まで連続して対応します。
              運用、権利、共有フローのどこに課題があるかを切り分け、必要な支援だけを提案します。
            </p>
            <div className="mt-6 flex items-center gap-2 border border-slate-200 bg-[#fbfaf7] px-4 py-3 text-sm text-slate-700">
              <MapPin className="h-4 w-4 text-amber-700" />
              京都府長岡京市を拠点に対応
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <h3 className="text-2xl font-semibold text-brand-ink">相談から改善まで、同じ目線で伴走する</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                  初回の課題整理から、運用体制づくり、権利や台帳の整備、共有フローの改善まで、
                  実際に現場で回せるかを基準に設計します。若い会社である分、対応の速さと手順の丁寧さで信頼を積み上げます。
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {PROFILE_HIGHLIGHTS.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      <BadgeCheck className="h-3.5 w-3.5 text-brand-primary-700" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">大事にしていること</p>
                <ul className="mt-4 space-y-3">
                  {TEAM_VALUES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center bg-white text-amber-800">
                        <BadgeCheck className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/company/"
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
