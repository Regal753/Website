import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import NotFoundPage from './NotFoundPage';
import { getServiceBySlug, serviceCatalog } from '../services.catalog';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const getGradientStyle = (colorClass: string): string => {
  const gradients: Record<string, string> = {
    'from-red-500 to-red-600': 'linear-gradient(135deg, rgb(239, 68, 68), rgb(220, 38, 38))',
    'from-blue-500 to-blue-600': 'linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))',
    'from-indigo-500 to-indigo-600': 'linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229))',
    'from-emerald-500 to-emerald-600': 'linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105))',
    'from-cyan-500 to-cyan-600': 'linear-gradient(135deg, rgb(6, 182, 212), rgb(8, 145, 178))',
  };
  return gradients[colorClass] || gradients['from-blue-500 to-blue-600'];
};

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slug && service && slug !== service.slug) {
      navigate(`/services/${service.slug}`, { replace: true });
    }
  }, [slug, service, navigate]);
  const slideImagePaths = useMemo(() => {
    if (!service) return [];
    return [service.media.listImage, ...service.media.galleryImages].slice(0, 3);
  }, [service]);
  const otherServices = useMemo(() => {
    if (!service) return [];
    return serviceCatalog.filter((item) => item.slug !== service.slug);
  }, [service]);

  useEffect(() => {
    setActiveSlide(0);
  }, [service?.slug]);

  useEffect(() => {
    if (service?.slug) {
      trackEvent('service_detail_view', { service: service.slug });
    }
  }, [service?.slug]);

  useEffect(() => {
    if (slideImagePaths.length <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideImagePaths.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [slideImagePaths]);

  if (!service) {
    return <NotFoundPage />;
  }

  const Icon = service.icon;
  const phoneDisplay = siteConfig.companyProfile.phone || '';
  const phoneHref = phoneDisplay.replace(/[^\d+]/g, '');

  return (
    <section className="bg-white pt-28 pb-20 md:pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-brand-primary-700 transition-colors hover:text-brand-primary-800"
        >
          <ArrowLeft className="w-4 h-4" />
          トップへ戻る
        </Link>

        <article className="mt-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
              style={{ background: getGradientStyle(service.color) }}
            >
              <Icon className="text-white w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-brand-primary-700">SERVICE DETAIL</p>
              <h1 className="mt-1 text-3xl font-semibold text-brand-ink md:text-4xl">{service.title}</h1>
              <p className="text-slate-600 mt-4 leading-relaxed">{service.detailLead}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
              <div className="relative w-full aspect-video bg-slate-100">
                {slideImagePaths.map((imagePath, index) => (
                  <img
                    key={imagePath}
                    src={asset(imagePath)}
                    alt={`${service.title}のスライド画像${index + 1}`}
                    width={1280}
                    height={720}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      activeSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                ))}
              </div>
              {slideImagePaths.length > 1 && (
                <div className="flex items-center justify-center gap-2 py-3 bg-white border-t border-slate-200">
                  {slideImagePaths.map((_, index) => (
                    <button
                      key={`slide-dot-${index}`}
                      type="button"
                      aria-label={`スライド${index + 1}を表示`}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeSlide === index ? 'w-7 bg-blue-700' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <h2 className="text-lg font-bold text-slate-900 mb-3">ギャラリー</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {slideImagePaths.map((imagePath, index) => (
                  <img
                    key={imagePath}
                    src={asset(imagePath)}
                    alt={`${service.title}の参考画像${index + 1}`}
                    width={960}
                    height={640}
                    className="w-full h-52 rounded-xl object-cover border border-slate-200"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>

            {service.detailSections.map((section) => (
              <div key={section.title} className="rounded-xl border border-slate-200 p-5 bg-slate-50">
                <h2 className="text-lg font-semibold text-brand-ink">{section.title}</h2>
                <ul className="mt-3 space-y-2">
                  {section.points.map((point) => (
                    <li key={point} className="text-sm text-slate-700 leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-brand-ink">実績</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.caseHighlights.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 p-5 bg-white">
                  <h3 className="text-base font-semibold text-brand-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <h2 className="text-xl font-semibold text-brand-ink">料金</h2>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">{service.pricing.summary}</p>
              <ul className="mt-3 space-y-2">
                {service.pricing.items.map((item) => (
                  <li key={item} className="text-sm text-slate-700 leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <h2 className="text-xl font-semibold text-brand-ink">技術</h2>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                既存運用との整合を重視し、必要な技術要素のみを選定して導入します。
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-xl border border-slate-200 p-5 bg-white">
            <h2 className="mb-4 text-xl font-semibold text-brand-ink">進め方</h2>
            <div className="space-y-3">
              {service.processSteps.map((step, index) => (
                <div key={step.title} className="flex gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-full bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{step.title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-xl font-semibold text-brand-ink">ご相談・お見積り</h2>
            <p className="mt-2 text-slate-700 text-sm leading-relaxed">
              事業フェーズや運用体制に合わせて、最適な支援内容をご提案します。まずは現状課題をお聞かせください。
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/contact"
                onClick={() => trackEvent('cta_click', { placement: 'service_detail', service: service.slug, target: 'contact' })}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-800"
              >
                無料相談フォームへ
                <ArrowRight className="w-4 h-4" />
              </Link>
              {phoneHref && (
                <a
                  href={`tel:${phoneHref}`}
                  onClick={() => trackEvent('phone_click', { placement: 'service_detail', service: service.slug })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  電話で相談: {phoneDisplay}
                </a>
              )}
            </div>
          </div>
        </article>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-brand-ink">他の事業を見る</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                className="rounded-xl border border-slate-200 p-4 bg-white hover:border-blue-300 hover:bg-blue-50/40 transition-colors"
              >
                <p className="font-semibold text-brand-ink">{item.title}</p>
                <p className="text-sm text-slate-600 mt-1">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ServiceDetailPage;
