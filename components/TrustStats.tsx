import React from 'react';
import { siteConfig } from '../site.config';

const TrustStats: React.FC = () => {
  const phone = siteConfig.companyProfile.phone || '現在準備中';

  const phoneHref = phone.replace(/[^\d+]/g, '');

  return (
    <section className="bg-white py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
          <p className="text-[11px] font-medium text-slate-500">対応事業部</p>
          <p className="text-xl font-semibold text-brand-ink">3</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
          <p className="text-[11px] font-medium text-slate-500">電話受付</p>
          <p className="text-xl font-semibold text-brand-ink">9:00-20:00</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
          <p className="text-[11px] font-medium text-slate-500">ご連絡先</p>
          {phoneHref ? (
            <a
              href={`tel:${phoneHref}`}
              className="text-xl font-semibold text-brand-ink transition-colors hover:text-brand-primary-700"
            >
              {phone}
            </a>
          ) : (
            <p className="text-xl font-semibold text-brand-ink">{phone}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
