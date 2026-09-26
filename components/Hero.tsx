import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../site.config';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const Hero: React.FC = () => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  return (
    <section id={SectionId.HOME} className="bg-[#f3f6fb] pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:gap-16 lg:px-8">
        <div>
          <h1 className="corporate-display max-w-[13em] text-[2.125rem] font-bold text-brand-ink min-[375px]:text-[2.5rem] sm:text-5xl lg:text-[3.65rem]">
            音楽とYouTubeの運用を、権利情報の整理から支援します。
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
            {siteConfig.positioning.homepageSummary}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
            <Link
              to="/contact"
              onClick={() => trackEvent('cta_click', { placement: 'hero_primary', target: 'contact' })}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary-700 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-primary-800"
            >
              お問い合わせ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`#${SectionId.SERVICES}`}
              onClick={() => trackEvent('cta_click', { placement: 'hero_secondary', target: 'services' })}
              className="text-sm font-semibold text-brand-ink underline decoration-slate-400 underline-offset-4 transition-colors hover:text-brand-primary-700"
            >
              事業内容を見る
            </a>
          </div>
        </div>

        <img
          src={asset('images/services/music-gallery-2.webp')}
          alt="音楽制作と資料を表すイメージ画像"
          width={900}
          height={600}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-[300px] w-full rounded-lg object-cover sm:h-[380px] lg:h-[460px]"
        />
      </div>
    </section>
  );
};

export default Hero;
