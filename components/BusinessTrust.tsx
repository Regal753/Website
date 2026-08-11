import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const companyFacts = [
  { label: '法人名', value: siteConfig.companyProfile.legalName },
  { label: '代表者', value: siteConfig.companyProfile.representative },
  { label: '法人番号', value: siteConfig.companyProfile.corporateNumber },
  { label: '設立', value: siteConfig.companyProfile.established },
] as const;

const proofLinks = [
  {
    label: '国税庁 法人番号公表サイト',
    description: '法人番号と所在地を確認できます',
    href: siteConfig.verificationLinks.corporateRegistry,
    platform: 'nta_corporate_registry',
  },
  {
    label: 'クラウドワークス公式メディア',
    description: '株式会社Regaloの企業インタビューです',
    href: siteConfig.verificationLinks.mediaCoverage,
    platform: 'crowdworks_times',
  },
  {
    label: '日本音楽出版社協会',
    description: '修了した2025年度講座の案内です',
    href: siteConfig.verificationLinks.trainingProgram,
    platform: 'mpa_training_program',
  },
] as const;

const BusinessTrust: React.FC = () => (
  <section className="border-y border-slate-200 bg-white py-16 md:py-24" aria-labelledby="business-trust-title">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <p className="text-sm font-semibold text-brand-primary-700">法人取引で確認できる情報</p>
          <h2 id="business-trust-title" className="mt-3 text-3xl font-semibold leading-tight text-brand-ink md:text-5xl">
            発注前に必要な情報を
            <br />
            公開しています
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
            会社の実在性、責任者、連絡先、契約前の確認手順を公開しています。
            顧客名や、根拠を公開できない成果数値は掲載していません。
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            <Link to="/company" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700">
              会社情報を見る
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#process" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700">
              見積りまでの流れ
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <dl className="grid border-t-2 border-slate-900 sm:grid-cols-2">
            {companyFacts.map((item) => (
              <div key={item.label} className="border-b border-slate-300 py-5 sm:pr-8">
                <dt className="text-xs font-semibold text-slate-500">{item.label}</dt>
                <dd className="mt-2 text-base font-semibold text-brand-ink">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <p className="text-xs font-semibold text-slate-500">外部サイトで確認する</p>
            <div className="mt-3 divide-y divide-slate-200 border-y border-slate-200">
              {proofLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('external_link_click', { platform: item.platform, placement: 'business_trust_proof' })}
                  className="group flex items-center justify-between gap-5 py-4"
                >
                  <span>
                    <span className="block text-sm font-semibold text-brand-ink">{item.label}</span>
                    <span className="mt-1 block text-xs text-slate-600">{item.description}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-brand-primary-700" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BusinessTrust;
