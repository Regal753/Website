import React from 'react';
import { Link } from 'react-router-dom';
import { companyProfile } from '../site.config';
import { SectionId } from '../types';
import { serviceCatalog } from '../services.catalog';

interface Row {
  label: string;
  value: string;
  isLink?: { href: string };
}

const phoneHref = (companyProfile.phone || '').replace(/[^\d+]/g, '');

const rows: Row[] = [
  { label: '屋号 / ブランド名', value: companyProfile.brandName },
  { label: '法人名', value: companyProfile.legalName },
  { label: '代表者', value: companyProfile.representative },
  ...(companyProfile.phone
    ? [{ label: '電話番号', value: companyProfile.phone, isLink: { href: `tel:${phoneHref}` } }]
    : []),
  { label: '所在地', value: companyProfile.address },
  { label: '設立日', value: companyProfile.established },
  { label: '事業内容', value: companyProfile.business.join('／') },
  {
    label: 'お問い合わせ',
    value: companyProfile.contactEmail,
    isLink: { href: `mailto:${companyProfile.contactEmail}` },
  },
];

const CompanyInfo: React.FC = () => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  return (
    <section
      id={SectionId.COMPANY}
      className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-slate-50 to-slate-100/70"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-20 -right-16 w-80 h-80 rounded-full bg-cyan-100/50 blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
            COMPANY PROFILE
          </p>
          <h2 className="text-3xl font-bold text-slate-900">
          会社情報
          </h2>
        </div>
        <p className="text-slate-700 leading-relaxed mb-8">
          Regaloは「贈り物」の精神を軸に、関わる皆さまの毎日がより明るく前向きになるよう支援しています。
          常に成果を意識しながら、継続的な改善と丁寧な伴走で価値を届けます。
        </p>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white/90 shadow-lg shadow-slate-200/50 p-4">
          <h3 className="text-lg font-bold text-slate-900 mb-3">会社紹介メディア</h3>
          <video
            className="w-full aspect-video rounded-xl object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={asset('images/services/sns-cover.webp')}
          >
            <source src={asset('videos/backgrounds/bg-02.mp4')} type="video/mp4" />
          </video>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <img
              src={asset('images/services/music-cover.webp')}
              alt="会社紹介画像1"
              className="w-full h-40 rounded-lg object-cover border border-slate-200"
              loading="lazy"
              decoding="async"
            />
            <img
              src={asset('images/services/ai-cover.webp')}
              alt="会社紹介画像2"
              className="w-full h-40 rounded-lg object-cover border border-slate-200"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="bg-white/95 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 overflow-hidden">
          <table className="w-full text-left text-sm">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-slate-100/90 last:border-b-0">
                  <th className="px-5 md:px-6 py-4 font-medium text-slate-500 whitespace-nowrap w-1/3 bg-slate-50/80">
                    {row.label}
                  </th>
                  <td className="px-5 md:px-6 py-4 text-slate-900">
                    {row.isLink ? (
                      <a
                        href={row.isLink.href}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
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
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">事業一覧</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {serviceCatalog.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm hover:shadow-md hover:border-blue-300 hover:bg-blue-50/40 transition-all"
              >
                <p className="font-bold text-slate-900">{service.title}</p>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
