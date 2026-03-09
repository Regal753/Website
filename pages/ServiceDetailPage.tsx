import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock3, MapPin, Phone, ShieldCheck } from 'lucide-react';
import NotFoundPage from './NotFoundPage';
import { getServiceBySlug, serviceCatalog } from '../services.catalog';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';
import { getGradientStyle } from '../utils/gradient';

const SERVICE_PROOF_POINTS = [
  {
    icon: Clock3,
    label: '返信目安',
    value: '1営業日以内',
  },
  {
    icon: MapPin,
    label: '拠点',
    value: '京都発の実務チーム',
  },
  {
    icon: ShieldCheck,
    label: '支援範囲',
    value: '運用と管理を一気通貫で',
  },
] as const;

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

  const relatedCases = useMemo(() => {
    if (!service) return [];
    return siteConfig.cases.filter((item) => item.serviceSlug === service.slug);
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
    <section className="bg-[linear-gradient(180deg,_#ffffff_0%,_#fffaf7_100%)] pt-28 pb-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-brand-primary-700 transition-colors hover:text-brand-primary-800"
        >
          <ArrowLeft className="h-4 w-4" />
          トップへ戻る
        </Link>

        <article className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div>
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg"
                  style={{ background: getGradientStyle(service.color) }}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-brand-primary-700">
                    {siteConfig.positioning.serviceDetailEyebrow}
                  </p>
                  <h1 className="mt-1 text-3xl font-semibold text-brand-ink md:text-4xl">{service.title}</h1>
                  <p className="mt-4 leading-relaxed text-slate-600">{service.detailLead}</p>
                </div>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                {siteConfig.positioning.serviceDetailSummary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {service.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-amber-800">ご相談の目安</p>
              <ul className="mt-4 space-y-3">
                {SERVICE_PROOF_POINTS.map((item) => (
                  <li key={item.label} className="rounded-2xl border border-white bg-white/80 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold tracking-wide text-slate-500">{item.label}</p>
                        <p className="text-sm font-semibold text-brand-ink">{item.value}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 md:col-span-2">
              <div className="relative aspect-video w-full bg-slate-100">
                {slideImagePaths.map((imagePath, index) => (
                  <img
                    key={imagePath}
                    src={asset(imagePath)}
                    alt={`${service.title}のスライド画像${index + 1}`}
                    width={1280}
                    height={720}
                    className={`absolute inset-0 h-full w-full bg-slate-50 p-4 object-contain transition-opacity duration-700 ${
                      activeSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                ))}
              </div>
              {slideImagePaths.length > 1 && (
                <div className="flex items-center justify-center gap-2 border-t border-slate-200 bg-white py-3">
                  {slideImagePaths.map((_, index) => (
                    <button
                      key={`slide-dot-${index}`}
                      type="button"
                      aria-label={`スライド${index + 1}を表示`}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeSlide === index ? 'w-7 bg-brand-primary-700' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <h2 className="mb-3 text-lg font-bold text-slate-900">ギャラリー</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {slideImagePaths.map((imagePath, index) => (
                  <img
                    key={imagePath}
                    src={asset(imagePath)}
                    alt={`${service.title}の参考画像${index + 1}`}
                    width={960}
                    height={640}
                    className="h-52 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>

            {service.detailSections.map((section) => (
              <div key={section.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-lg font-semibold text-brand-ink">{section.title}</h2>
                <ul className="mt-3 space-y-2">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {relatedCases.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-brand-ink">公開している改善事例</h2>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {relatedCases.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-[#fffaf7] p-5">
                    <p className="text-sm font-semibold text-slate-500">{item.clientType}</p>
                    <h3 className="mt-1 text-lg font-semibold text-brand-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.challenge}</p>
                    <p className="mt-3 text-sm font-semibold text-brand-primary-700">{item.outcome}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.results.map((result) => (
                        <span
                          key={result}
                          className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-brand-ink">支援のポイント</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {service.caseHighlights.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="text-base font-semibold text-brand-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.summary}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-semibold text-brand-ink">料金</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{service.pricing.summary}</p>
              <ul className="mt-3 space-y-2">
                {service.pricing.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-semibold text-brand-ink">技術</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
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

          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-xl font-semibold text-brand-ink">進め方</h2>
            <div className="space-y-3">
              {service.processSteps.map((step, index) => (
                <div key={step.title} className="flex gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary-50 text-xs font-bold text-brand-primary-700">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                    <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 rounded-xl border border-brand-primary-200 bg-brand-primary-50 p-5">
            <h2 className="text-xl font-semibold text-brand-ink">ご相談・お見積り</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              事業フェーズや運用体制に合わせて、最適な支援内容をご提案します。まずは現状課題をお聞かせください。
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/contact"
                onClick={() =>
                  trackEvent('cta_click', { placement: 'service_detail', service: service.slug, target: 'contact' })
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-800"
              >
                無料相談フォームへ
                <ArrowRight className="h-4 w-4" />
              </Link>
              {phoneHref && (
                <a
                  href={`tel:${phoneHref}`}
                  onClick={() => trackEvent('phone_click', { placement: 'service_detail', service: service.slug })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <Phone className="h-4 w-4" />
                  電話で相談: {phoneDisplay}
                </a>
              )}
            </div>
          </div>
        </article>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-brand-ink">他の事業を見る</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand-primary-300 hover:bg-brand-primary-50/40"
              >
                <p className="font-semibold text-brand-ink">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default ServiceDetailPage;
