import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { SectionId } from '../types';
import { serviceCatalog } from '../services.catalog';
import { trackEvent } from '../utils/analytics';

const SERVICE_NOTES: Record<string, { label: string; note: string }> = {
  'music-publishing': {
    label: '権利情報を確認する仕事',
    note: '楽曲・契約・利用先を照合し、確認済みと未確認を分けます。',
  },
  'sns-management': {
    label: '制作を予定どおり進める仕事',
    note: '企画から公開後の記録まで、担当者と期限を明確にします。',
  },
  'ai-marketing-strategy': {
    label: '繰り返し作業を減らす仕事',
    note: '転記、定例報告、確認依頼など、対象を絞って自動化します。',
  },
};

const Services: React.FC = () => (
  <section id={SectionId.SERVICES} className="bg-[#f6f7f9] py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-brand-primary-700">対応している仕事</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-ink md:text-5xl">
            依頼できる内容と、
            <br />
            受け取れるもの
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-8 text-slate-600">
          相談内容を大きな言葉でまとめず、確認する資料、担当する作業、納品物を分けてお伝えします。
          複数の領域にまたがる場合も窓口はRegaloに一本化できます。
        </p>
      </div>

      <div className="mt-12 border-t-2 border-slate-900">
        {serviceCatalog.map((service, index) => {
          const Icon = service.icon;
          const note = SERVICE_NOTES[service.slug];

          return (
            <article
              key={service.slug}
              className="grid gap-6 border-b border-slate-300 py-8 md:grid-cols-[90px_minmax(0,1.15fr)_minmax(260px,0.85fr)_auto] md:items-start md:gap-8"
            >
              <div className="flex items-center gap-3 md:block">
                <span className="text-sm font-semibold tabular-nums text-slate-500">0{index + 1}</span>
                <Icon className="h-6 w-6 text-brand-primary-700 md:mt-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500">{note?.label}</p>
                <h3 className="mt-2 text-2xl font-semibold text-brand-ink md:text-3xl">{service.title}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">{service.description}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500">主な納品物・確認資料</p>
                <ul className="mt-3 space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <span className="h-px w-4 bg-brand-primary-700" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-5 text-slate-500">{note?.note}</p>
              </div>

              <Link
                to={`/services/${service.slug}/`}
                onClick={() =>
                  trackEvent('service_detail_click', { placement: 'services_cta', service: service.slug })
                }
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-900 md:mt-7"
              >
                詳細を見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
