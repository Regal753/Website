import React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  Building2,
  ExternalLink,
  FileCheck2,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const trustItems = [
  {
    icon: Building2,
    title: '法人情報',
    description: `法人名、法人番号 ${siteConfig.companyProfile.corporateNumber}、所在地、設立日を公開しています。`,
    linkLabel: '国税庁で法人情報を確認',
    href: siteConfig.verificationLinks.corporateRegistry,
    external: true,
  },
  {
    icon: UserRoundCheck,
    title: '責任者と連絡先',
    description: `代表者 ${siteConfig.companyProfile.representative}、会社ドメインのメール、電話番号を公開しています。`,
    linkLabel: '会社情報を見る',
    href: '/company',
    external: false,
  },
  {
    icon: FileCheck2,
    title: '発注条件',
    description: '作業範囲、納品物、スケジュール、費用をお見積りで提示し、ご発注確定後に着手します。',
    linkLabel: 'お問い合わせから着手まで',
    href: '#process',
    external: false,
  },
  {
    icon: ShieldCheck,
    title: '契約・法務情報',
    description: 'プライバシーポリシーと利用規約を公開しています。法的判断が必要な事項は、専門家への確認が必要です。',
    linkLabel: 'プライバシーポリシーを見る',
    href: '/privacy',
    external: false,
  },
] as const;

const proofLinks = [
  {
    label: '国税庁 法人番号公表サイト',
    description: '法人番号と公開情報を確認',
    href: siteConfig.verificationLinks.corporateRegistry,
    platform: 'nta_corporate_registry',
  },
  {
    label: 'クラウドワークス公式メディア',
    description: '株式会社Regaloの企業インタビュー',
    href: siteConfig.verificationLinks.mediaCoverage,
    platform: 'crowdworks_times',
  },
  {
    label: '日本音楽出版社協会',
    description: '2025年度講座の主催・内容を確認',
    href: siteConfig.verificationLinks.trainingProgram,
    platform: 'mpa_training_program',
  },
] as const;

const BusinessTrust: React.FC = () => (
  <section className="bg-[#f6f8fc] py-16 md:py-24" aria-labelledby="business-trust-title">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div>
          <p className="inline-flex rounded-full border border-brand-primary-200 bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700">
            法人情報・取引条件
          </p>
          <h2 id="business-trust-title" className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            法人情報と発注前の確認事項
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            会社概要、責任者・連絡先、発注条件、契約・法務情報を掲載しています。
            支援内容の例は、顧客実績や成果値と区別して掲載しています。
          </p>
        </div>
        <div className="border-y border-slate-300 py-4">
          <p className="text-xs font-semibold tracking-wide text-slate-500">法人情報</p>
          <p className="mt-2 text-lg font-semibold text-brand-ink">{siteConfig.companyProfile.legalName}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            代表者 {siteConfig.companyProfile.representative} / 法人番号 {siteConfig.companyProfile.corporateNumber}
          </p>
        </div>
      </div>

      <div className="mt-8 grid border-y border-slate-300 md:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-slate-200">
        {trustItems.map((item) => (
          <article key={item.title} className="flex h-full flex-col border-b border-slate-200 px-1 py-6 md:px-5 xl:border-b-0 first:xl:pl-0 last:xl:pr-0">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-primary-50 text-brand-primary-700">
              <item.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-brand-ink">{item.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{item.description}</p>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent('external_link_click', { platform: 'nta_corporate_registry', placement: 'business_trust' })
                }
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 hover:text-brand-primary-800"
              >
                {item.linkLabel}
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : item.href.startsWith('#') ? (
              <a
                href={item.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 hover:text-brand-primary-800"
              >
                {item.linkLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                to={item.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 hover:text-brand-primary-800"
              >
                {item.linkLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </article>
        ))}
      </div>

      <div className="mt-7 border-t border-slate-300 pt-5">
        <div className="grid gap-4 md:grid-cols-3">
          {proofLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent('external_link_click', { platform: item.platform, placement: 'business_trust_proof' })
              }
              className="group border-l-2 border-slate-300 px-4 py-2 transition-colors hover:border-brand-primary-400"
            >
              <span className="flex items-center justify-between gap-3 text-sm font-semibold text-brand-ink">
                {item.label}
                <ExternalLink className="h-4 w-4 text-slate-400 transition-colors group-hover:text-brand-primary-700" />
              </span>
              <span className="mt-2 block text-xs leading-5 text-slate-600">{item.description}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BusinessTrust;
