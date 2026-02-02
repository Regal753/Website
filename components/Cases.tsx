import React from 'react';
import { SectionId } from '../types';
import { Youtube, Music, Cpu } from 'lucide-react';

const CASES = [
  {
    title: 'YouTube運用の属人化を標準化',
    icon: Youtube,
    background: '企画が個人依存で、再現性がない／改善が回らない',
    solution: '役割分担・KPI観測・改善サイクルの仕組み化',
    deliverables: '運用フロー／チェックリスト／Discord通知Bot／KPI定義',
  },
  {
    title: 'BGM運用・権利管理を整備',
    icon: Music,
    background: 'SNS配信における原盤・著作権・許諾の取り扱いが属人化し、判断がブレる',
    solution: '許諾管理・利用ルール・台帳化で判断基準を固定し、運用を安定化',
    deliverables: '台帳設計／利用可否ルール／契約・許諾の管理手順／運用ルール',
  },
  {
    title: '制作進行をDrive/Sheets/Discordで自動化',
    icon: Cpu,
    background: '素材収集・進捗共有・リマインドが手作業で漏れが起きる',
    solution: 'Drive構成＋Sheets管理＋Discord通知（必要ならn8n）で進行を仕組み化',
    deliverables: 'フォルダ設計／進捗シート雛形／通知フロー／運用手順',
  },
];

const Cases: React.FC = () => {
  return (
    <section id={SectionId.CASES} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">解決事例</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            課題の構造化から仕組みの納品まで、運用改善のパターンをご紹介します。
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {CASES.map((c, index) => {
            const Icon = c.icon;
            const num = String(index + 1).padStart(2, '0');
            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-10 py-12 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-4 md:flex-col md:gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-slate-200 whitespace-nowrap leading-none">
                    CASE.{num}
                  </span>
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-500 shrink-0">
                    <Icon size={20} />
                  </div>
                </div>

                <div className="space-y-5">
                  <h3 className="text-xl font-bold text-slate-900">{c.title}</h3>

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
                      <p className="text-sm text-slate-600 leading-relaxed">{c.deliverables}</p>
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
