import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Cpu, Music, Youtube } from 'lucide-react';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const scrollToServices = () => {
    const el = document.getElementById(SectionId.SERVICES);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!heroVideoRef.current) return;
    heroVideoRef.current.playbackRate = 0.82;
  }, []);

  return (
    <section
      id={SectionId.HOME}
      className="relative overflow-hidden pt-28 pb-16 md:pb-24 bg-white"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 motion-reduce:hidden">
          <video
            ref={heroVideoRef}
            className="h-full w-full object-cover opacity-78"
            autoPlay
            muted
            playsInline
            preload="none"
            poster={asset('images/services/ai-cover.webp')}
            aria-hidden="true"
          >
            <source src={asset('videos/backgrounds/bg-02.mp4')} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-white/15" />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:gap-12 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary-200 bg-brand-primary-50 px-3 py-1 text-sm font-medium text-brand-primary-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary-500" />
            </span>
            ご相談受付中
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-brand-ink sm:text-5xl md:text-7xl md:font-bold">
            <span className="block">運用を、仕組みで</span>
            <span className="block bg-gradient-to-r from-brand-primary-700 via-brand-primary-500 to-cyan-500 bg-clip-text text-transparent">
              加速する。
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            YouTube運用、音楽著作権管理、編集体制の標準化から自動化まで。
            制作と運用のボトルネックを潰し、継続的に成果が出る体制づくりを支援します。
          </p>

          <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            <button
              onClick={() => {
                trackEvent('cta_click', { placement: 'hero_primary', target: 'contact' });
                navigate('/contact');
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-primary-700/20 transition-all hover:-translate-y-px hover:bg-brand-primary-800 sm:w-auto sm:px-8 sm:py-4"
            >
              無料相談する
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => {
                trackEvent('cta_click', { placement: 'hero_secondary', target: 'services' });
                scrollToServices();
              }}
              className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-800 transition-all hover:-translate-y-px hover:bg-slate-50 sm:w-auto sm:px-8 sm:py-4"
            >
              サービスを見る
            </button>
          </div>

          <p className="text-xs text-slate-500">フォーム送信 → ヒアリング → ご提案・お見積り → 着手</p>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 lg:hidden">
            <img
              src={asset('images/services/sns-cover.webp')}
              alt="SNS運用のイメージ"
              width={640}
              height={360}
              className="h-24 w-full rounded-lg border border-slate-200 object-cover"
              loading="lazy"
              decoding="async"
            />
            <img
              src={asset('images/services/music-cover.webp')}
              alt="音楽出版のイメージ"
              width={640}
              height={360}
              className="h-24 w-full rounded-lg border border-slate-200 object-cover"
              loading="lazy"
              decoding="async"
            />
            <img
              src={asset('images/services/ai-cover.webp')}
              alt="AI戦略のイメージ"
              width={640}
              height={360}
              className="h-24 w-full rounded-lg border border-slate-200 object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="rounded-2xl border border-slate-200 bg-white/78 p-8 shadow-xl backdrop-blur-sm">
            <div className="space-y-4">
              <img
                src={asset('images/services/sns-cover.webp')}
                alt="SNS運用のメインイメージ"
                width={1280}
                height={720}
                className="aspect-video w-full rounded-lg object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={asset('images/services/music-cover.webp')}
                  alt="音楽出版のイメージ"
                  width={640}
                  height={360}
                  className="h-28 w-full rounded-lg object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={asset('images/services/ai-cover.webp')}
                  alt="AI戦略のイメージ"
                  width={640}
                  height={360}
                  className="h-28 w-full rounded-lg object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <p className="mb-3 text-xs font-semibold tracking-widest text-slate-500">対応領域</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                  <Youtube size={14} />
                  SNS管理
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                  <Music size={14} />
                  音楽出版
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                  <Cpu size={14} />
                  AI戦略
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
