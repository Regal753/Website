import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, Phone, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const CTA_POINTS = [
  '相談内容がまとまっていなくても受付可能です',
  'YouTube/SNS運用 / 権利管理 / 共有設計をまとめて相談できます',
  '初回相談は無料です',
] as const;

const InlineCTA: React.FC = () => {
  const phone = siteConfig.companyProfile.phone || '';
  const phoneHref = phone.replace(/[^\d+]/g, '');

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-amber-200 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-amber-800">
                無料相談
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-ink md:text-4xl">
                相談内容が固まっていない段階でも、
                <br className="hidden sm:block" />
                まず状況を確認します。
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                「YouTube/SNS運用が止まりがち」「権利管理が不安」「共有や進行が属人化している」など、
                課題が言語化しきれていなくても受付可能です。現状の整理から進めます。
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {CTA_POINTS.map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  onClick={() => trackEvent('cta_click', { placement: 'inline_cta_primary', target: 'contact' })}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary-700/20 transition-all hover:-translate-y-px hover:bg-brand-primary-800"
                >
                  お問い合わせ
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

            <div className="grid gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                    <Clock3 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-slate-500">返信目安</p>
                    <p className="text-lg font-semibold text-brand-ink">1営業日以内</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  フォームは24時間受付。急ぎの場合は電話相談にも対応しています。
                </p>
              </div>

              <div className="rounded-2xl border border-brand-primary-100 bg-white p-5 text-brand-ink shadow-sm shadow-brand-primary-100/60">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-primary-700 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-slate-500">相談の入口</p>
                    <p className="text-lg font-semibold text-brand-ink">3領域をまとめて相談可能</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  相談窓口を分けずに、運用、権利、共有設計を横断して切り分けます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InlineCTA;
