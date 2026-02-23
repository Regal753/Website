import React from 'react';
import { SectionId } from '../types';
import { Youtube, Music, Cpu } from 'lucide-react';

const CASES = [
  {
    title: 'YouTube運用の属人化を標準化',
    icon: Youtube,
    colorClass: 'text-red-600 bg-red-50 border-red-100',
    background: '企画が個人依存で、再現性がない／改善が回らない',
    solution: '役割分担・KPI観測・改善サイクルの仕組み化',
    deliverables: ['運用フロー', 'チェックリスト', 'Discord通知Bot', 'KPI定義'],
  },
  {
    title: 'BGM運用・権利管理を整備',
    icon: Music,
    colorClass: 'text-brand-primary-700 bg-brand-primary-50 border-brand-primary-100',
    background: 'SNS配信における原盤・著作権・許諾の取り扱いが属人化し、判断がブレる',
    solution: '許諾管理・利用ルール・台帳化で判断基準を固定し、運用を安定化',
    deliverables: ['台帳設計', '利用可否ルール', '契約・許諾の管理手順', '運用ルール'],
  },
  {
    title: '制作進行をDrive/Sheets/Discordで自動化',
    icon: Cpu,
    colorClass: 'text-cyan-700 bg-cyan-50 border-cyan-100',
    background: '素材収集・進捗共有・リマインドが手作業で漏れが起きる',
    solution: 'Drive構成＋Sheets管理＋Discord通知（必要ならn8n）で進行を仕組み化',
    deliverables: ['フォルダ設計', '進捗シート雛形', '通知フロー', '運用手順'],
  },
];

const Cases: React.FC = () => {
  return (
    <section id={SectionId.CASES} className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">解決事例</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            課題の構造化から仕組みの納品まで、運用改善のパターンをご紹介します。
          </p>
        </div>

        <div className="space-y-5">
          {CASES.map((c, index) => {
            const Icon = c.icon;
            const num = String(index + 1).padStart(2, '0');
            return (
              <div
                key={index}
                className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm transition-all hover:border-brand-primary-200 hover:shadow-md md:grid-cols-[140px_1fr] md:gap-10 md:p-8"
              >
                <div className="flex items-start gap-4 md:flex-col md:gap-2">
                  <span className="text-3xl font-semibold text-slate-300 whitespace-nowrap leading-none md:text-4xl">
                    CASE.{num}
                  </span>
                  <div className={`shrink-0 rounded-lg border p-2 ${c.colorClass}`}>
                    <Icon size={20} />
                  </div>
                </div>

                <div className="space-y-5">
                  <h3 className="text-xl font-semibold text-brand-ink">{c.title}</h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">導入背景</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{c.background}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">解決</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{c.solution}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">提供物</p>
                      <div className="mt-2 flex flex-wrap gap-2">
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Cases;
