import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionId } from '../types';
import { ArrowRight, Youtube, Music, Cpu } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  const scrollToSection = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.HOME} className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-50/80 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(148,163,184,0.08),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_30%)]" />
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

          <div className="flex flex-wrap gap-2">
            <span className="bg-white/80 border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-700">SNS管理事業部</span>
            <span className="bg-white/80 border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-700">音楽出版事業部</span>
            <span className="bg-white/80 border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-700">AIマーケティング戦略事業部</span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button
              onClick={() => {
                trackEvent('cta_click', { placement: 'hero_primary', target: 'contact' });
                navigate('/contact');
              }}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 hover:translate-y-[-1px]"
            >
              無料相談する
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => {
                trackEvent('cta_click', { placement: 'hero_secondary', target: 'services' });
                scrollToSection(SectionId.SERVICES);
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold rounded-lg transition-all hover:translate-y-[-1px]"
            >
              サービスを見る
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-3">フォーム送信 → ヒアリング → ご提案・お見積り → 着手</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-3">
              <p className="text-[11px] text-slate-500">事業部</p>
              <p className="text-xl font-bold text-slate-900">3</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-3">
              <p className="text-[11px] text-slate-500">対応時間</p>
              <p className="text-xl font-bold text-slate-900">9:00-20:00</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-3 col-span-2 md:col-span-1">
              <p className="text-[11px] text-slate-500">フォーム受付</p>
              <p className="text-xl font-bold text-slate-900">24H</p>
            </div>
          </div>

          <div className="mt-10 lg:hidden">
            <p className="text-sm text-slate-600 mb-3">トップ動画・ギャラリー</p>
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden p-3 space-y-3">
              <video
                className="w-full aspect-video rounded-xl object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={asset('images/services/sns-cover.webp')}
              >
                <source src={asset('videos/services/home-showreel.mp4')} type="video/mp4" />
              </video>
              <div className="grid grid-cols-2 gap-3">
                <img
                  src={asset('images/services/music-cover.webp')}
                  alt="ホーム画像1"
                  className="w-full h-24 rounded-lg object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={asset('images/services/ai-cover.webp')}
                  alt="ホーム画像2"
                  className="w-full h-24 rounded-lg object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="relative rounded-2xl bg-white/90 border border-slate-200 p-8 backdrop-blur-sm shadow-xl">
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

            <div className="space-y-4">
              <video
                className="w-full aspect-video rounded-lg object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={asset('images/services/sns-cover.webp')}
              >
                <source src={asset('videos/services/home-showreel.mp4')} type="video/mp4" />
              </video>

              <div className="grid grid-cols-2 gap-4">
                <img
                  src={asset('images/services/music-cover.webp')}
                  alt="ホーム画像1"
                  className="w-full h-28 rounded-lg object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={asset('images/services/ai-cover.webp')}
                  alt="ホーム画像2"
                  className="w-full h-28 rounded-lg object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

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
