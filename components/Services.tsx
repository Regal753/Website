import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionId } from '../types';
import { serviceCatalog } from '../services.catalog';
import { trackEvent } from '../utils/analytics';

const Services: React.FC = () => {
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  const getGradientStyle = (colorClass: string) => {
    const gradients: Record<string, string> = {
      'from-red-500 to-red-600': 'linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))',
      'from-blue-500 to-blue-600': 'linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))',
      'from-indigo-500 to-indigo-600': 'linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))',
      'from-emerald-500 to-emerald-600': 'linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))',
      'from-cyan-500 to-cyan-600': 'linear-gradient(135deg, rgb(6, 182, 212), rgb(8, 145, 178))',
    };
    return gradients[colorClass] || gradients['from-red-500 to-red-600'];
  };

  return (
    <section id={SectionId.SERVICES} className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-primary-200 bg-brand-primary-50 px-3 py-1 text-xs font-semibold tracking-wide text-brand-primary-700">
            BUSINESS DIVISIONS
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">事業一覧</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            各事業ページで、実績・料金・進め方・技術までまとめてご確認いただけます。
          </p>
        </div>
        <div className="space-y-6">
          {serviceCatalog.map((service, index) => {
            const Icon = service.icon;
            const isMusicFocus = service.slug === 'music-publishing';
            return (
              <div
                key={service.slug}
                className={`grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-8 items-start p-5 sm:p-6 md:p-8 rounded-2xl border backdrop-blur-sm transition-all ${
                  isMusicFocus
                    ? 'border-blue-300 bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/50 shadow-lg shadow-blue-100/60'
                    : 'border-slate-200 bg-white/90 shadow-sm hover:shadow-lg hover:border-blue-200'
                }`}
              >
                <div
                  className={`text-2xl md:text-3xl font-bold whitespace-nowrap ${
                    isMusicFocus ? 'text-blue-300' : 'text-slate-300'
                  }`}
                >
                  SERVICE.{String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                      style={{ background: getGradientStyle(service.color) }}
                    >
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      {isMusicFocus && (
                        <p className="mb-2 inline-flex items-center rounded-full border border-brand-primary-200 bg-white px-2.5 py-1 text-[11px] font-semibold tracking-wider text-brand-primary-700">
                          重点強化事業
                        </p>
                      )}
                      <h3 className="mb-2 text-xl font-semibold text-brand-ink md:text-2xl">
                        <Link
                          to={`/services/${service.slug}`}
                          onClick={() =>
                            trackEvent('service_detail_click', { placement: 'services_title', service: service.slug })
                          }
                          className="transition-colors hover:text-brand-primary-700"
                        >
                          {service.title}
                        </Link>
                      </h3>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-0 md:ml-16 mt-4">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      {service.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm md:text-base font-semibold text-slate-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ml-0 md:ml-16 mt-5 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                    <div className="grid grid-cols-3 gap-2 p-2 bg-slate-50">
                      {[service.media.listImage, ...service.media.galleryImages].slice(0, 3).map((imagePath, imageIndex) => (
                        <img
                          key={`${service.slug}-preview-${imageIndex}`}
                          src={asset(imagePath)}
                          alt={`${service.title}のイメージ${imageIndex + 1}`}
                          width={640}
                          height={360}
                          className="w-full h-24 sm:h-36 rounded-lg object-cover border border-slate-200 bg-white"
                          loading="lazy"
                          decoding="async"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="ml-0 md:ml-16 mt-5">
                    <Link
                      to={`/services/${service.slug}`}
                      onClick={() =>
                        trackEvent('service_detail_click', { placement: 'services_cta', service: service.slug })
                      }
                      className="inline-flex items-center gap-2 font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-800"
                    >
                      詳細ページへ
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
