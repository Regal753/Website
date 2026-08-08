import React from 'react';
import { ArrowRight, Check, ClipboardList, FileCheck2, Route } from 'lucide-react';
import { Link } from 'react-router';
import { trackEvent } from '../utils/analytics';

const commonSituations = [
  '楽曲と権利者の一覧が手元にない',
  'Content ID・信託登録の状況が分からない',
  '許諾・分配の記録が担当ごとに散らばっている',
] as const;

const deliverables = [
  {
    icon: ClipboardList,
    label: '現状一覧',
    description: '楽曲・権利者・利用先・管理状況を整理',
  },
  {
    icon: FileCheck2,
    label: '確認事項',
    description: '不足資料と追加確認が必要な箇所を切り分け',
  },
  {
    icon: Route,
    label: '対応順',
    description: '止まりやすい箇所から次の行動を優先順位化',
  },
] as const;

const MusicRightsReview: React.FC = () => {
  return (
    <section id="music-rights-review" className="bg-[#fffaf7] py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl md:mb-10">
          <h2 className="text-3xl font-semibold leading-tight text-brand-ink md:text-5xl">
            まずは、
            <br className="sm:hidden" />
            現在地の整理から。
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
            楽曲・権利者・利用先の情報が散らばったままでも、そのまま持ち込めます。
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-sm font-semibold text-brand-primary-700">YouTube BGM・権利運用の初期診断</p>
              <h3 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight text-brand-ink md:text-4xl">
                未確認のまま進めないために、
                <br className="hidden sm:block" />
                最初の一手を決める。
              </h3>

              <div className="mt-6 border-t border-slate-200 pt-5 md:mt-7 md:pt-6">
                <ul className="space-y-3">
                  {commonSituations.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary-50 text-brand-primary-700">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/contact?type=music-rights-review"
                  onClick={() =>
                    trackEvent('cta_click', { placement: 'music_rights_review', target: 'contact' })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary-700 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-primary-800"
                >
                  初期診断を相談する（初回無料）
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services/music-publishing/"
                  className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-slate-600 transition-colors hover:text-brand-primary-700 sm:justify-start"
                >
                  サービス内容を見る
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <aside className="border-t border-slate-200 bg-[#f3f6fb] p-5 sm:p-6 md:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">整理してお渡しするもの</p>
              <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm md:mt-5 md:px-5">
                {deliverables.map((item, index) => (
                  <div key={item.label} className="flex gap-3 py-4 md:gap-4 md:py-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary-50 text-brand-primary-700 md:h-11 md:w-11 md:rounded-2xl">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-600">0{index + 1}</p>
                      <h4 className="mt-1 font-semibold text-slate-900">{item.label}</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicRightsReview;
