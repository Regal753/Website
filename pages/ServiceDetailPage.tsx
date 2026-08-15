import React, { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
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
    label: '所在地',
    value: '京都府長岡京市',
  },
  {
    icon: ShieldCheck,
    label: '対応体制',
    value: '代表が内容を確認',
  },
] as const;

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  useEffect(() => {
    if (slug && service) {
      const canonicalPath = `/services/${service.slug}/`;
      if (location.pathname !== canonicalPath) {
        navigate(canonicalPath, { replace: true });
      }
    }
  }, [slug, service, location.pathname, navigate]);

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
    if (service?.slug) {
      trackEvent('service_detail_view', { service: service.slug });
    }
  }, [service?.slug]);

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

        <article className="mt-4 border-y border-slate-200 bg-white px-1 py-8 md:px-8 md:py-10">
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

            <aside className="border-y border-amber-200 bg-amber-50/50 px-1 py-4 sm:px-5">
              <p className="text-sm font-semibold text-amber-800">受付情報</p>
              <ul className="mt-3 divide-y divide-amber-200/70">
                {SERVICE_PROOF_POINTS.map((item) => (
                  <li key={item.label} className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
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

          <section className="mt-10" aria-label={`${service.title}の掲載画像`}>
            <div className="grid gap-4 md:grid-cols-2">
              {slideImagePaths.map((imagePath, index) => (
                <img
                  key={imagePath}
                  src={asset(imagePath)}
                  alt={`${service.title}の掲載画像${index + 1}`}
                  width={1280}
                  height={720}
                  className={`w-full border border-slate-200 object-cover ${index === 0 ? 'aspect-video md:col-span-2' : 'h-56'}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ))}
            </div>
          </section>

          <section className="mt-10 border-y border-slate-200" aria-label="発注前の確認事項">
            <div className="grid lg:grid-cols-3 lg:divide-x lg:divide-slate-200">
              {[
                { title: '対象となる企業', items: service.audience },
                { title: 'ご相談時に必要な情報', items: service.intakeItems },
                { title: '対応範囲', items: service.boundaries },
              ].map((section) => (
                <div key={section.title} className="py-6 lg:px-6 first:lg:pl-0 last:lg:pr-0">
                  <h2 className="text-base font-semibold text-brand-ink">{section.title}</h2>
                  <ul className="mt-4 space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-brand-ink">対応内容</h2>
            <div className="mt-4 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {service.detailSections.map((section) => (
                <div key={section.title} className="border-t border-slate-300 pt-5">
                  <h3 className="text-lg font-semibold text-brand-ink">{section.title}</h3>
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
          </section>

          {relatedCases.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-brand-ink">対応例</h2>
              <p className="mt-2 mb-4 text-sm leading-relaxed text-slate-600">
                ご相談内容に応じた対応の組み立て方を示しています。
              </p>
              <div className="divide-y divide-slate-200 border-y border-slate-200">
                {relatedCases.map((item) => (
                  <article key={item.title} className="grid gap-4 py-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                    <div>
                      <h3 className="text-lg font-semibold text-brand-ink">{item.title}</h3>
                    </div>
                    <div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.challenge}</p>
                      <p className="mt-3 text-sm font-semibold text-brand-primary-700">{item.outcome}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.results.map((result) => (
                          <span
                            key={result}
                            className="inline-flex border-l-2 border-brand-primary-300 pl-2 text-xs font-medium text-slate-700"
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-slate-600">
                ※ 実際の支援範囲とお見積りは、資料・権利関係・現在の運用体制を確認したうえで個別にご案内します。
              </p>
            </section>
          )}

          <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border-t border-slate-300 pt-5">
              <h2 className="text-xl font-semibold text-brand-ink">お見積り</h2>
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

            <div className="border-t border-slate-300 pt-5">
              <h2 className="text-xl font-semibold text-brand-ink">対応可能な環境</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                既存運用との整合を重視し、必要な技術要素のみを選定して導入します。
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center border-b border-slate-300 py-1 text-xs font-semibold text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-8 border-y border-slate-200 py-6">
            <h2 className="mb-4 text-xl font-semibold text-brand-ink">対応手順</h2>
            <div className="space-y-3">
              {service.processSteps.map((step, index) => (
                <div key={step.title} className="flex gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-brand-primary-200 bg-brand-primary-50 text-xs font-bold text-brand-primary-700">
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

          <section className="mt-8" aria-labelledby={`${service.slug}-faq-title`}>
            <h2 id={`${service.slug}-faq-title`} className="text-xl font-semibold text-brand-ink">
              よくあるご質問
            </h2>
            <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
              {service.faqs.map((item) => (
                <details key={item.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-brand-ink marker:content-none">
                    {item.question}
                    <span aria-hidden="true" className="text-lg text-brand-primary-700 transition-transform group-open:rotate-45">
                      ＋
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-8 rounded-xl border border-brand-primary-200 bg-brand-primary-50 p-5">
            <h2 className="text-xl font-semibold text-brand-ink">ご相談・お見積り</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              現在の運用状況とご希望を確認し、対応内容、納品物、スケジュール、費用をお見積りで提示します。
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/contact"
                onClick={() =>
                  trackEvent('cta_click', { placement: 'service_detail', service: service.slug, target: 'contact' })
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-800"
              >
                お問い合わせフォーム
                <ArrowRight className="h-4 w-4" />
              </Link>
              {phoneHref && (
                <a
                  href={`tel:${phoneHref}`}
                  onClick={() => trackEvent('phone_click', { placement: 'service_detail', service: service.slug })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <Phone className="h-4 w-4" />
                  電話：{phoneDisplay}
                </a>
              )}
            </div>
          </div>
        </article>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-brand-ink">その他の事業</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}/`}
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
