import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Building2, MapPin, ShieldCheck } from 'lucide-react';
import { companyProfile, siteConfig } from '../site.config';
import { SectionId } from '../types';
import { serviceCatalog } from '../services.catalog';

interface Row {
  label: string;
  value: string;
  isLink?: { href: string };
}

const phoneHref = (companyProfile.phone || '').replace(/[^\d+]/g, '');
const partnerBankCount = companyProfile.partnerBanks?.length || 0;

const rows: Row[] = [
  { label: '屋号 / ブランド名', value: companyProfile.brandName },
  { label: '法人名', value: companyProfile.legalName },
  { label: '代表者', value: companyProfile.representative },
  ...(companyProfile.phone
    ? [{ label: '電話番号', value: companyProfile.phone, isLink: { href: `tel:${phoneHref}` } }]
    : []),
  { label: '所在地', value: companyProfile.address },
  { label: '設立日', value: companyProfile.established },
  ...(companyProfile.capital ? [{ label: '資本金', value: companyProfile.capital }] : []),
  ...(companyProfile.corporateNumber ? [{ label: '法人番号', value: companyProfile.corporateNumber }] : []),
  ...(companyProfile.partnerBanks?.length
    ? [{ label: '取引金融機関', value: companyProfile.partnerBanks.join('／') }]
    : []),
  { label: '事業内容', value: companyProfile.business.join('／') },
  {
    label: 'お問い合わせ',
    value: companyProfile.contactEmail,
    isLink: { href: `mailto:${companyProfile.contactEmail}` },
  },
];

const companyHighlights = [
  {
    icon: MapPin,
    label: '拠点',
    value: '京都発の実務チーム',
  },
  {
    icon: ShieldCheck,
    label: '公開情報',
    value: '法人番号・所在地を公開',
  },
  {
    icon: Building2,
    label: '支援体制',
    value: siteConfig.positioning.crossFunctionalLabel,
  },
] as const;

const representativeHighlights = [
  '同志社大学卒業',
  'JASRAC信託会員',
  '音楽著作権管理者養成講座修了',
  '在学中に法人設立',
] as const;

const serviceThemes: Record<string, string> = {
  'sns-management': 'border-rose-100 bg-gradient-to-br from-rose-50 via-white to-white',
  'music-publishing': 'border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white',
  'ai-marketing-strategy': 'border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-white',
};

const CompanyInfo: React.FC = () => {
  return (
    <section
      id={SectionId.COMPANY}
      className="bg-[linear-gradient(180deg,_#ffffff_0%,_#fff8f1_100%)] pt-28 pb-20 md:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
            <p className="inline-flex rounded-full border border-brand-primary-200 bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700">
              会社概要
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-ink md:text-5xl">会社情報</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              {siteConfig.positioning.companySummary}{' '}
              「贈り物」の精神を軸に、相談段階から改善の定着まで、継続しやすい形で価値を届けます。
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {companyHighlights.map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-primary-700 shadow-sm">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-xs font-semibold tracking-wide text-slate-500">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-brand-ink">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-800"
              >
                無料相談する
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${companyProfile.contactEmail}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                メールで問い合わせる
              </a>
            </div>
          </div>

          <aside className="rounded-[32px] border border-brand-primary-100 bg-[linear-gradient(135deg,_#eef2ff_0%,_#ffffff_52%,_#fff7ed_100%)] p-6 text-brand-ink shadow-sm shadow-brand-primary-100/60 md:p-8">
            <p className="text-xs font-semibold tracking-widest text-slate-500">COMPANY SNAPSHOT</p>
            <h2 className="mt-4 text-2xl font-semibold text-brand-ink">{companyProfile.legalName}</h2>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-brand-primary-100 bg-white/85 p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-slate-500">代表者</p>
                <p className="mt-2 text-lg font-semibold text-brand-ink">{companyProfile.representative}</p>
              </div>
              <div className="rounded-2xl border border-brand-primary-100 bg-white/85 p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-slate-500">設立日</p>
                <p className="mt-2 text-sm font-semibold text-brand-ink">{companyProfile.established}</p>
              </div>
              <div className="rounded-2xl border border-brand-primary-100 bg-white/85 p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-slate-500">所在地</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{companyProfile.address}</p>
              </div>
              {companyProfile.phone && (
                <a
                  href={`tel:${phoneHref}`}
                  className="block rounded-2xl border border-brand-primary-100 bg-white/85 p-4 shadow-sm transition-colors hover:bg-white"
                >
                  <p className="text-xs font-semibold tracking-wide text-slate-500">電話番号</p>
                  <p className="mt-2 text-lg font-semibold text-brand-ink">{companyProfile.phone}</p>
                </a>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <section
            className="rounded-[32px] border border-amber-100 bg-[#fffaf7] p-6 shadow-sm shadow-amber-100/50 md:p-8"
            aria-label="代表者について"
          >
            <p className="text-xs font-semibold tracking-wider text-amber-800">代表者について</p>
            <h2 className="mt-2 text-2xl font-semibold text-brand-ink">{companyProfile.representative}について</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              代表取締役 塩田玲央。同志社大学在学中にSNS事業で法人設立。JASRAC信託会員、
              音楽著作権管理者養成講座修了。現在はSNS運用支援と権利管理を横断して展開しています。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {representativeHighlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  <BadgeCheck className="h-3.5 w-3.5 text-amber-800" />
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-200 bg-slate-50/80 px-5 py-4 md:px-6">
              <p className="text-xs font-semibold tracking-wide text-slate-500">法人情報</p>
              <h2 className="mt-1 text-xl font-semibold text-brand-ink">公開している基本情報</h2>
            </div>
            <table className="w-full text-left text-sm">
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-slate-100/90 last:border-b-0">
                    <th className="w-1/3 whitespace-nowrap bg-white px-5 py-4 font-medium text-slate-500 md:px-6">
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-slate-900 md:px-6">
                      {row.isLink ? (
                        <a
                          href={row.isLink.href}
                          className="text-brand-primary-700 transition-colors hover:text-brand-primary-800"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-slate-500">対応領域</p>
              <h2 className="mt-1 text-2xl font-semibold text-brand-ink">事業一覧</h2>
            </div>
            {partnerBankCount > 0 && (
              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                取引金融機関 {partnerBankCount}行
              </span>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceCatalog.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`rounded-3xl border p-5 shadow-sm transition-all hover:-translate-y-px hover:shadow-md ${serviceThemes[service.slug] ?? 'border-slate-200 bg-white'}`}
              >
                <p className="text-lg font-semibold text-brand-ink">{service.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
