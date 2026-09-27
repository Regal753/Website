import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { companyProfile, siteConfig } from '../site.config';
import { serviceCatalog } from '../services.catalog';
import { SectionId } from '../types';

const rows = [
  { label: '法人名', value: companyProfile.legalName },
  { label: '代表者', value: companyProfile.representative },
  { label: '所在地', value: companyProfile.address },
  { label: '設立', value: companyProfile.established },
  { label: '資本金', value: companyProfile.capital },
  { label: '法人番号', value: companyProfile.corporateNumber },
  { label: '事業内容', value: companyProfile.business.join('／') },
  { label: '電話番号', value: companyProfile.phone, href: `tel:${companyProfile.phone.replace(/[^\d+]/g, '')}` },
  { label: 'メール', value: companyProfile.contactEmail, href: `mailto:${companyProfile.contactEmail}` },
] as const;

const CompanyInfo: React.FC = () => (
  <section id={SectionId.COMPANY} className="bg-[#fbf8ee] pb-20 pt-28 md:pb-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-b border-slate-300 pb-10 md:pb-12">
        <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">COMPANY</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-ink md:text-5xl">会社情報</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
          {siteConfig.positioning.companySummary}
        </p>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 border-b border-brand-primary-700 pb-1 text-sm font-semibold text-brand-primary-700 hover:text-brand-primary-800">
          お問い合わせ <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)] lg:gap-20 md:py-16">
        <section aria-labelledby="company-facts-title">
          <h2 id="company-facts-title" className="text-2xl font-semibold text-brand-ink">会社概要</h2>
          <dl className="mt-6 border-t border-slate-300">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1 border-b border-slate-200 py-4 text-sm sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                <dt className="font-medium text-slate-500">{row.label}</dt>
                <dd className="break-words leading-7 text-brand-ink">
                  {'href' in row && row.href ? <a href={row.href} className="text-brand-primary-700 underline underline-offset-4 hover:text-brand-primary-800">{row.value}</a> : row.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <aside className="border-t border-slate-300 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1">
          <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">REPRESENTATIVE</p>
          <h2 className="mt-4 text-2xl font-semibold text-brand-ink">代表・相談窓口</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            代表の{companyProfile.representative}がご相談内容を確認し、対応範囲と確認結果を取りまとめます。
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            ご提案時に担当する工程、納品物、スケジュール、費用を明示します。専門家による確認が必要な事項は、その範囲もご案内します。
          </p>
          <div className="mt-7 border-t border-slate-300 pt-5">
            <p className="text-sm font-medium leading-7 text-brand-ink">2025年度 音楽著作権管理者養成講座 修了</p>
            <a href={siteConfig.verificationLinks.trainingProgram} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-brand-primary-700 hover:text-brand-primary-800">
              主催講座の概要を見る <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </aside>
      </div>

      <section className="border-t border-slate-300 py-12 md:py-16" aria-labelledby="company-services-title">
        <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">SERVICES</p>
        <h2 id="company-services-title" className="mt-3 text-2xl font-semibold text-brand-ink">事業内容</h2>
        <div className="mt-7 grid gap-7 md:grid-cols-3">
          {serviceCatalog.map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}/`} className="group border-t-2 border-brand-ink pt-5">
              <h3 className="text-lg font-semibold text-brand-ink">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 group-hover:text-brand-primary-800">詳しく見る <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-300 pt-10" aria-labelledby="company-evidence-title">
        <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">PUBLIC INFORMATION</p>
        <h2 id="company-evidence-title" className="mt-3 text-2xl font-semibold text-brand-ink">外部サイトで確認できる情報</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <a href={siteConfig.verificationLinks.corporateRegistry} target="_blank" rel="noreferrer" className="group border-l-2 border-slate-300 py-1 pl-5 hover:border-brand-primary-700">
            <span className="flex items-center gap-2 font-semibold text-brand-ink">国税庁 法人番号公表サイト <ExternalLink className="h-4 w-4" /></span>
            <span className="mt-2 block text-sm leading-7 text-slate-600">法人番号・商号・所在地を確認できます。</span>
          </a>
          <a href={siteConfig.verificationLinks.mediaCoverage} target="_blank" rel="noreferrer" className="group border-l-2 border-slate-300 py-1 pl-5 hover:border-brand-primary-700">
            <span className="flex items-center gap-2 font-semibold text-brand-ink">クラウドワークス公式メディア掲載 <ExternalLink className="h-4 w-4" /></span>
            <span className="mt-2 block text-sm leading-7 text-slate-600">外部制作者との仕事の進め方についての取材記事です。</span>
          </a>
        </div>
      </section>
    </div>
  </section>
);

export default CompanyInfo;
