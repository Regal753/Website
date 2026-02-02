import React from 'react';
import { SectionId } from '../types';
import { ArrowRight, Youtube, Music, Cpu } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id={SectionId.HOME} className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/80 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            ご相談受付中
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            <span className="block text-slate-900">運用を、仕組みで</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 whitespace-nowrap">
              加速する。
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            YouTubeチャンネル運用、BGM制作・権利管理、編集体制の標準化、Drive/Sheets/Discordによる自動化まで。
            制作と運用のボトルネックを潰し、継続的に回るメディア運営を支援します。
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection(SectionId.CONTACT)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
            >
              お問い合わせ
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollToSection(SectionId.SERVICES)}
              className="px-8 py-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold rounded-lg transition-all"
            >
              サービスを見る
            </button>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="relative rounded-2xl bg-white border border-slate-200 p-8 backdrop-blur-sm shadow-xl">
            <div className="absolute -top-12 -right-12 p-4 bg-white rounded-xl border border-slate-200 shadow-lg flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="p-2 bg-red-50 rounded-lg text-red-500"><Youtube size={24} /></div>
              <div>
                <div className="text-xs text-slate-500">チャンネル運用</div>
                <div className="font-bold text-slate-900">運用設計</div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 p-4 bg-white rounded-xl border border-slate-200 shadow-lg flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <div className="p-2 bg-green-50 rounded-lg text-green-500"><Cpu size={24} /></div>
              <div>
                <div className="text-xs text-slate-500">自動化</div>
                <div className="font-bold text-slate-900">自動化運用中</div>
              </div>
            </div>

            <img
              src={import.meta.env.BASE_URL + "images/workflow.webp"}
              alt="自動化フロー例"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />

            <div className="mt-6 flex justify-between items-end border-t border-slate-200 pt-6">
              <div>
                <div className="text-sm text-slate-500 mb-2">対応領域</div>
                <div className="flex gap-2">
                  <span className="p-2 bg-slate-100 rounded text-slate-500"><Music size={20}/></span>
                  <span className="p-2 bg-slate-100 rounded text-slate-500"><Youtube size={20}/></span>
                  <span className="p-2 bg-slate-100 rounded text-slate-500"><Cpu size={20}/></span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-slate-900">運用支援</div>
                <div className="text-xs text-slate-500">運用支援</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
