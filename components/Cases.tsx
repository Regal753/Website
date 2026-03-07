import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Music, Youtube } from 'lucide-react';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const CASES = [
  {
    title: 'YouTube運用の属人化を標準化',
    icon: Youtube,
    colorClass: 'text-red-700 bg-red-50 border-red-100',
    clientType: '企業メディア運営チーム',
    challenge: '企画や改善が担当者依存で、数値を見ながら運用改善を回せない。',
    scope: 'YouTube運用設計・編集ガイドライン策定・KPIダッシュボード構築',
    outcome: '属人化していた運用を標準化し、制作リードタイムを約40%短縮。',
    results: ['制作リードタイム 約40%短縮', 'KPIダッシュボードを構築', '役割分担を明文化'],
    deliverables: ['運用フロー', '編集ガイドライン', 'KPI定義', 'ダッシュボード'],
  },
  {
    title: 'BGM運用と権利管理を整理',
    icon: Music,
    colorClass: 'text-brand-primary-700 bg-brand-primary-50 border-brand-primary-100',
    clientType: '音楽系YouTubeチャンネル',
    challenge: 'BGM利用可否の判断が人依存で、公開前確認に時間がかかる。',
    scope: 'BGMカタログ構築・権利台帳整備・利用許諾フロー設計',
    outcome: '権利トラブル0件を維持しつつ、月次のBGM納品本数を約2倍に改善。',
    results: ['権利トラブル 0件を維持', 'BGM納品本数 約2倍', '利用判断の基準を統一'],
    deliverables: ['台帳設計', '利用可否ルール', '許諾管理手順', '運用ルール'],
  },
  {
    title: '制作進行をDrive/Sheets/Discordで自動化',
    icon: Cpu,
    colorClass: 'text-cyan-700 bg-cyan-50 border-cyan-100',
    clientType: 'クリエイター事務所',
    challenge: '素材収集・進捗共有・リマインドが手作業で、共有漏れや遅延が起きる。',
    scope: 'Google Drive / Sheets / Discord を連携した制作進行自動化',
    outcome: '手動だった素材共有・進捗管理を自動化し、週あたり約10時間の工数を削減。',
    results: ['週あたり約10時間の工数削減', '共有漏れを抑制', 'リマインドを自動化'],
    deliverables: ['フォルダ設計', '進捗シート雛形', '通知フロー', '運用手順'],
  },
];

const Cases: React.FC = () => {
  return (
    <section id={SectionId.CASES} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            数字が見える形で事例を出す
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">解決事例</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            抽象的な「改善しました」ではなく、何を整えて、どの変化が出たかを分かる形で掲載します。
          </p>
        </div>

        <div className="space-y-5">
          {CASES.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="rounded-3xl border border-slate-200 bg-[#fffaf7] p-6 shadow-sm transition-all hover:border-brand-primary-200 hover:shadow-md md:p-8"
              >
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                  <div>
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 rounded-2xl border p-3 ${c.colorClass}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-500">{c.clientType}</p>
                        <h3 className="mt-1 text-2xl font-semibold text-brand-ink">{c.title}</h3>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-xs font-semibold tracking-wider text-slate-500">背景</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">{c.challenge}</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-xs font-semibold tracking-wider text-slate-500">対応内容</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-700">{c.scope}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                      <p className="text-xs font-semibold tracking-wider text-slate-500">成果</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{c.outcome}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.deliverables.map((item) => (
                        <span
                          key={item}
                          className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <aside className="rounded-3xl bg-slate-900 p-5 text-white shadow-lg shadow-slate-900/10">
                    <p className="text-sm font-semibold text-white/70">見えた変化</p>
                    <ul className="mt-4 space-y-3">
                      {c.results.map((item) => (
                        <li key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </aside>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/contact"
            onClick={() => trackEvent('cta_click', { placement: 'cases_section', target: 'contact' })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-800"
          >
            同じような課題を相談する
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cases;
