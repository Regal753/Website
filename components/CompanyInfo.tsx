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
    value: '京都府長岡京市',
  },
  {
    icon: ShieldCheck,
    label: '公開情報',
    value: '法人番号・所在地を公開',
  },
  {
    icon: Building2,
    label: '支援体制',
    value: 'SNS経由でも法人窓口で受付',
  },
] as const;

const representativeHighlights = [
  '音楽著作権管理者養成講座修了',
  'BGM権利台帳の整備に対応',
  '法人番号・所在地を公開',
  '取引金融機関を掲載',
] as const;

const serviceThemes: Record<string, string> = {
  'sns-management': 'border-rose-100 bg-rose-50/40',
  'music-publishing': 'border-amber-100 bg-amber-50/40',
  'production-workflow': 'border-slate-200 bg-slate-50/70',
};

const CompanyInfo: React.FC = () => {
  return (
    <section
      id={SectionId.COMPANY}
      className="bg-[#fbfaf7] pt-28 pb-20 md:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="border border-slate-200 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
            <p className="inline-flex border border-brand-primary-200 bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700">
              会社概要
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-ink md:text-5xl">会社情報</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              {siteConfig.positioning.companySummary}{' '}
              「贈り物」の精神を軸に、相談段階から改善の定着まで、継続しやすい形で価値を届けます。
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {companyHighlights.map((item) => (
                <div key={item.label} className="border border-slate-200 bg-slate-50 p-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center bg-white text-brand-primary-700 shadow-sm">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-xs font-semibold tracking-wide text-slate-500">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-brand-ink">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact/"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                ご相談・お問い合わせ
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${companyProfile.contactEmail}`}
                className="inline-flex items-center justify-center border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                メールで問い合わせる
              </a>
            </div>
          </div>

          <aside className="border border-slate-200 bg-white p-6 text-brand-ink shadow-sm shadow-slate-200/50 md:p-8">
            <p className="text-xs font-semibold tracking-widest text-slate-500">ひと目で分かる会社情報</p>
            <h2 className="mt-4 text-2xl font-semibold text-brand-ink">{companyProfile.legalName}</h2>
            <div className="mt-6 space-y-3">
              <div className="border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-slate-500">代表者</p>
                <p className="mt-2 text-lg font-semibold text-brand-ink">{companyProfile.representative}</p>
              </div>
              <div className="border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-slate-500">設立日</p>
                <p className="mt-2 text-sm font-semibold text-brand-ink">{companyProfile.established}</p>
              </div>
              <div className="border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <p className="text-xs font-semibold tracking-wide text-slate-500">所在地</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{companyProfile.address}</p>
              </div>
              {companyProfile.phone && (
                <a
                  href={`tel:${phoneHref}`}
                  className="block border border-slate-200 bg-slate-50 p-4 shadow-sm transition-colors hover:bg-white"
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
            className="border border-amber-100 bg-white p-6 shadow-sm shadow-amber-100/50 md:p-8"
            aria-label="支援体制について"
          >
            <p className="text-xs font-semibold tracking-wider text-amber-800">支援体制について</p>
            <h2 className="mt-2 text-2xl font-semibold text-brand-ink">少人数チームで、相談から改善まで伴走</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              Regaloは、相談内容を最初に整理し、運用、権利、共有フローのどこを整えるべきかを切り分けます。
              資格や権利管理の知見も含め、現場で続けやすい形に落とし込むことを重視しています。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {representativeHighlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 border border-amber-200 bg-[#fbfaf7] px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  <BadgeCheck className="h-3.5 w-3.5 text-amber-800" />
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="overflow-hidden border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
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
                to={`/services/${service.slug}/`}
                className={`border p-5 shadow-sm transition-all hover:-translate-y-px hover:shadow-md ${serviceThemes[service.slug] ?? 'border-slate-200 bg-white'}`}
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
