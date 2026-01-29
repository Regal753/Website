import React from 'react';
import { SectionId, ServiceDetail } from '../types';
import { Youtube, Music, Mic2, FileCheck, Bot } from 'lucide-react';

const SERVICES: ServiceDetail[] = [
  {
    title: "YouTubeチャンネル運用",
    description: "企画と運用設計で、改善が回る体制へ。企画・制作・分析を分断せず、チームで再現できる運用に整えます。属人化を減らし、検証→改善が回る仕組みを作ります。",
    items: [
      "企画設計",
      "KPI設計",
      "サムネ・タイトル検証",
      "編集ガイドライン"
    ],
    icon: Youtube,
    color: "from-red-500 to-red-600"
  },
  {
    title: "音楽出版・BGM運用",
    description: "権利がクリアなBGM運用。BGMの制作から台帳・契約・登録まで、実運用で困らない形で整備します。",
    items: [
      "カタログ運用",
      "権利登録・台帳管理",
      "利用許諾の整理",
      "運用ルール整備"
    ],
    icon: Music,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "受託・買い切りBGM制作",
    description: "用途に合わせた「使える」楽曲制作。尺・雰囲気・利用範囲を前提に、実運用しやすい形式で納品します。",
    items: [
      "YouTube/配信向け",
      "ループ・差分制作",
      "契約整備",
      "納品形式最適化"
    ],
    icon: Mic2,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "権利管理・編集体制構築",
    description: "トラブルを起こさない仕組みづくり。編集チームが迷わないルールとチェックポイントを整備し、事故率を下げます。",
    items: [
      "使用可否ルール",
      "素材・契約台帳",
      "監査ポイント",
      "ガイドライン整備"
    ],
    icon: FileCheck,
    color: "from-emerald-500 to-emerald-600"
  },
  {
    title: "ワークフロー自動化・ツール構築",
    description: "Drive × Sheets × Discord で制作を自動化。素材共有・進行管理・通知・台帳更新など、手作業を減らし品質を安定させます。",
    items: [
      "Drive/Sheets自動化",
      "Discord Bot",
      "n8n連携",
      "GCP運用"
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">提供サービス</h2>
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
