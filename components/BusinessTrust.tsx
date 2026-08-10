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
    title: '法人の実在性',
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
    title: '発注前の明確化',
    description: '作業範囲、納品物、スケジュール、費用を見積りで確認いただき、発注確定後に着手します。',
    linkLabel: '相談から着手までを見る',
    href: '#process',
    external: false,
  },
  {
    icon: ShieldCheck,
    title: '情報と契約の確認',
    description: 'プライバシーポリシーと利用規約を公開し、法的判断が必要な事項は専門家への確認項目を整理します。',
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
            法人取引の確認情報
          </p>
          <h2 id="business-trust-title" className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            稟議前に確認したい情報を、公開しています
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            会社の実在性、責任者、発注までの条件、法務窓口を事前に確認できます。
            実績に見せかけたサンプルや、確認できない数値は掲載しません。
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-slate-500">公開している法人情報</p>
          <p className="mt-2 text-lg font-semibold text-brand-ink">{siteConfig.companyProfile.legalName}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            代表者 {siteConfig.companyProfile.representative} / 法人番号 {siteConfig.companyProfile.corporateNumber}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {trustItems.map((item) => (
          <article key={item.title} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary-50 text-brand-primary-700">
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

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
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
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-brand-primary-200 hover:bg-brand-primary-50/50"
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
