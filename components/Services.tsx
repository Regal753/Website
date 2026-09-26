import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { serviceCatalog } from '../services.catalog';
import { SectionId } from '../types';
import { trackEvent } from '../utils/analytics';

const coverSourceDimensions: Record<string, { width: number; height: number }> = {
  'music-publishing': { width: 900, height: 600 },
  'sns-management': { width: 900, height: 600 },
  'workflow-automation': { width: 1280, height: 720 },
};

const Services: React.FC = () => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
  const coverVariant = (path: string, width: 480 | 640) =>
    path.replace(/\.webp$/i, `-${width}.webp`);

  return (
    <section id={SectionId.SERVICES} className="scroll-mt-20 bg-[#e1e2d2] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2 className="text-3xl font-semibold text-brand-ink md:text-4xl">主な対応業務</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">
            BGMの契約情報、動画の制作・投稿、定例報告や進捗連絡。ご依頼範囲に合わせて担当業務を定めます。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {serviceCatalog.map((service, index) => {
            const isPrimary = index === 0;
            const dimensions = coverSourceDimensions[service.slug] ?? { width: 1280, height: 720 };

            return (
              <article
                key={service.slug}
                className={`grid overflow-hidden rounded-md border border-slate-200 bg-[#fffde9] ${
                  isPrimary ? 'lg:col-span-2 lg:grid-cols-[1fr_1fr]' : ''
                }`}
              >
                <div className={`order-2 flex flex-col p-6 md:p-8 ${isPrimary ? 'lg:order-1 lg:p-10' : ''}`}>
                  <h3 className={`font-semibold text-brand-ink ${isPrimary ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-700 md:text-base">{service.description}</p>
                  <ul className="mt-5 grid gap-x-6 gap-y-2 text-sm text-slate-700 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item} className="border-l-2 border-slate-300 pl-3">{item}</li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-700">
                    <span className="font-semibold text-brand-ink">対象：</span>{service.audience[0]}
                  </p>
                  <Link
                    to={`/services/${service.slug}/`}
                    onClick={() => trackEvent('service_detail_click', { placement: 'services_cta', service: service.slug })}
                    className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-800"
                  >
                    対応内容を見る
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <img
                  src={asset(coverVariant(service.media.listImage, 480))}
                  srcSet={`${asset(coverVariant(service.media.listImage, 480))} 480w, ${asset(coverVariant(service.media.listImage, 640))} 640w`}
                  sizes={isPrimary ? '(min-width: 1024px) 46vw, 100vw' : '(min-width: 1024px) 44vw, 100vw'}
                  alt=""
                  width={dimensions.width}
                  height={dimensions.height}
                  loading="lazy"
                  decoding="async"
                  className={`order-1 w-full object-cover ${isPrimary ? 'h-64 lg:order-2 lg:h-full' : 'h-56 md:h-64'}`}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
