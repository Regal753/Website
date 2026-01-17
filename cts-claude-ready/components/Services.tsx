import React from 'react';
import { SectionId, ServiceDetail } from '../types';
import { Youtube, Music, Mic2, FileCheck, Bot } from 'lucide-react';

const SERVICES: ServiceDetail[] = [
  {
    title: "YouTube チャンネル運営",
    description: "データ分析に基づいた戦略的なチャンネルグロースを実現します。",
    items: [
      "MLB 関連チャンネルの運営・管理",
      "PC・ガジェット系レビューチャンネル",
      "海外の反応系コンテンツの制作",
      "サムネイル・タイトルのABテストと最適化"
    ],
    icon: Youtube,
    color: "from-red-500 to-red-600"
  },
  {
    title: "音楽出版・BGM事業",
    description: "自社保有楽曲の管理からプラットフォームへの提供まで、音の資産価値を最大化します。",
    items: [
      "自社保有BGMの制作・ライブラリ管理",
      "JASRAC / NexTone への楽曲登録・運用",
      "YouTube クリエイター向けBGM提供",
      "Content ID 等を用いた権利処理"
    ],
    icon: Music,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "受託 / 買い切り BGM 制作",
    description: "クライアントのニーズに合わせたオリジナル楽曲を制作します。",
    items: [
      "放送・配信番組向けオリジナルBGM",
      "企業VP・CM向け楽曲制作",
      "完全買い切りプランによる権利譲渡",
      "短納期・高品質な制作体制"
    ],
    icon: Mic2,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "権利管理・編集体制構築",
    description: "複雑な権利関係をクリアにし、クリエイターが安心して制作できる環境を作ります。",
    items: [
      "BGM利用契約スキームの設計",
      "編集チーム向け楽曲使用ルールの策定",
      "権利侵害リスクの回避フロー構築",
      "契約書・覚書の作成サポート"
    ],
    icon: FileCheck,
    color: "from-emerald-500 to-emerald-600"
  },
  {
    title: "ワークフロー自動化・ツール構築",
    description: "最新のクラウド技術とAPIを活用し、業務効率を劇的に改善します。",
    items: [
      "Google Drive / Sheets 連携自動化",
      "Discord Bot による通知・管理システム",
      "n8n を活用したノーコード/ローコード自動化",
      "GCP (Google Cloud Platform) VM運用・保守"
    ],
    icon: Bot,
    color: "from-cyan-500 to-cyan-600"
  }
];

const Services: React.FC = () => {
  return (
    <section id={SectionId.SERVICES} className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            メディア運営から技術基盤の構築まで、包括的なソリューションを提供します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={index}
              className="group bg-slate-800/50 hover:bg-slate-800 rounded-2xl p-6 transition-all duration-300 border border-slate-700 hover:border-slate-500 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}>
                <service.icon className="text-white w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-blue-400 transition-colors" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;