import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const BusinessTrust: React.FC = () => (
  <section className="bg-[#eeeee0] py-14 md:py-20" aria-labelledby="business-trust-title">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">ABOUT REGALO</p>
          <h2 id="business-trust-title" className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            会社情報
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">
            株式会社Regaloは京都府長岡京市を拠点に、音楽出版・BGM制作、YouTube運用、制作進行の自動化を行っています。
          </p>
          <dl className="mt-7 grid gap-4 border-t border-slate-300 pt-5 text-sm sm:grid-cols-3">
            <div><dt className="text-xs font-semibold text-slate-500">設立</dt><dd className="mt-1 font-medium text-brand-ink">{siteConfig.companyProfile.established}</dd></div>
            <div><dt className="text-xs font-semibold text-slate-500">代表</dt><dd className="mt-1 font-medium text-brand-ink">{siteConfig.companyProfile.representative}</dd></div>
            <div><dt className="text-xs font-semibold text-slate-500">所在地</dt><dd className="mt-1 font-medium text-brand-ink">京都府長岡京市</dd></div>
          </dl>
          <Link to="/company" className="mt-7 inline-flex items-center gap-2 border-b border-brand-primary-700 pb-1 text-sm font-semibold text-brand-primary-700 hover:text-brand-primary-800">
            会社概要を見る <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="border-t border-slate-300 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-1">
          <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">INTERVIEW</p>
          <h3 className="mt-4 text-xl font-semibold leading-snug text-brand-ink md:text-2xl">外部制作者の選定・発注について、<br className="hidden sm:block" />取材を受けました。</h3>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            クラウドワークスの企業インタビューで、動画編集や台本制作を依頼する際の考え方を紹介しています。
          </p>
          <a
            href={siteConfig.verificationLinks.mediaCoverage}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('external_link_click', { platform: 'crowdworks_media', placement: 'business_trust' })}
            className="mt-6 inline-flex items-center gap-2 border-b border-brand-primary-700 pb-1 text-sm font-semibold text-brand-primary-700 hover:text-brand-primary-800"
          >
            掲載記事を読む <ExternalLink className="h-4 w-4" />
          </a>
          <p className="mt-4 text-xs leading-6 text-slate-500">掲載内容はクラウドワークスの利用についての取材です。</p>
        </div>
      </div>
    </div>
  </section>
);

export default BusinessTrust;
