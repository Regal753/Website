import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const InlineCTA: React.FC = () => {
  const phone = siteConfig.companyProfile.phone || '';
  const phoneHref = phone.replace(/[^\d+]/g, '');

  return (
    <section className="bg-white py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-rose-50 p-6 shadow-sm shadow-amber-100/70 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold tracking-wide text-amber-800">相談しやすさを前に出す</p>
              <h2 className="mt-2 text-2xl font-semibold text-brand-ink md:text-3xl">
                まだ整理できていない段階でも、そのままご相談ください。
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                「SNS運用が止まりがち」「権利管理が不安」「共有や進行が属人化している」など、
                課題が言語化しきれていなくても大丈夫です。現状の整理から一緒に進めます。
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/contact"
                onClick={() => trackEvent('cta_click', { placement: 'inline_cta_primary', target: 'contact' })}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary-700/20 transition-all hover:-translate-y-px hover:bg-brand-primary-800"
              >
                無料相談する
                <ArrowRight className="h-4 w-4" />
              </Link>
              {phoneHref && (
                <a
                  href={`tel:${phoneHref}`}
                  onClick={() => trackEvent('phone_click', { placement: 'inline_cta_secondary' })}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
                >
                  <Phone className="h-4 w-4" />
                  電話で相談する
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InlineCTA;
