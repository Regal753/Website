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
        color: "from-indigo-500 to-indigo-600"
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
    const getGradientStyle = (colorClass: string) => {
          const gradients: { [key: string]: string } = {
                  "from-red-500 to-red-600": "linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))",
                  "from-blue-500 to-blue-600": "linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))",
                  "from-indigo-500 to-indigo-600": "linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))",
                  "from-emerald-500 to-emerald-600": "linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))",
                  "from-cyan-500 to-cyan-600": "linear-gradient(135deg, rgb(6, 182, 212), rgb(8, 145, 178))"
          };
          return gradients[colorClass] || gradients["from-red-500 to-red-600"];
    };

    return (
          <section id={SectionId.SERVICES} className="py-24 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">提供サービス</h2>h2>
                                  <p className="text-slate-600 max-w-2xl mx-auto">
                                              メディア運営から技術基盤の構築まで、包括的なソリューションを提供します。
                                  </p>p>
                        </div>div>
                        
                        <div className="space-y-12">
                          {SERVICES.map((service, index) => (
                        <div 
                                        key={index}
                                        className="flex flex-col md:flex-row md:items-start md:gap-8 pb-12 border-b border-slate-200 last:border-b-0 last:pb-0"
                                      >
                          {/* Service Number - Left */}
                                      <div className="md:w-32 flex-shrink-0 mb-4 md:mb-0">
                                                      <div className="text-2xl md:text-3xl font-bold text-slate-400">
                                                                        SERVICE.0{index + 1}
                                                      </div>div>
                                      </div>div>
                                      
                          {/* Service Content - Right */}
                                      <div className="flex-grow">
                                                      <div className="flex items-start gap-4 mb-4">
                                                                        <div 
                                                                                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                                                                                              style={{ background: getGradientStyle(service.color) }}
                                                                                            >
                                                                                            <service.icon className="text-white w-6 h-6" />
                                                                        </div>div>
                                                                        <div>
                                                                                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                                                                                              {service.title}
                                                                                              </h3>h3>
                                                                                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                                                                              {service.description}
                                                                                              </p>p>
                                                                        </div>div>
                                                      </div>div>
                                                      
                                        {/* Items - styled as small headings */}
                                                      <div className="ml-16 mt-4">
                                                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                                                          {service.items.map((item, i) => (
                                                              <li 
                                                                                        key={i} 
                                                                                        className="flex items-center gap-2 text-sm md:text-base font-semibold text-slate-700"
                                                                                      >
                                                                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                                                {item}
                                                              </li>li>
                                                            ))}
                                                                        </ul>ul>
                                                      </div>div>
                                      </div>div>
                        </div>div>
                      ))}
                        </div>div>
                </div>div>
          </section>section>
        );
};

export default Services;</section>
