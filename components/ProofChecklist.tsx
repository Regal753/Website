import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Building2, FileCheck2, Newspaper, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const proofItems = [
  {
    icon: Building2,
    title: '会社情報を公開',
    description: '法人名、所在地、代表者、電話番号、法人番号を会社情報ページにまとめています。',
    meta: siteConfig.companyProfile.corporateNumber
      ? `法人番号 ${siteConfig.companyProfile.corporateNumber}`
      : '法人情報を掲載',
  },
  {
    icon: ShieldCheck,
    title: '権利管理の実務に対応',
    description: 'BGM制作だけでなく、利用許諾、権利台帳、確認フローまで現場で使う形に整理します。',
    meta: 'JASRAC信託会員 / 講座修了',
  },
  {
    icon: FileCheck2,
    title: '見積り前に範囲を整理',
    description: '作業範囲、期間、費用感を揃えてから着手します。初回相談の段階では費用はかかりません。',
    meta: '初回相談無料',
  },
  {
    icon: Newspaper,
    title: '外部掲載も確認可能',
    description: '公開できる範囲の掲載情報やお知らせをまとめ、確認しやすい状態にしています。',
    meta: siteConfig.newsItems[0]?.date ? `最新掲載 ${siteConfig.newsItems[0].date}` : '公開情報を掲載',
  },
] as const;

const ProofChecklist: React.FC = () => {
  const bankCount = siteConfig.companyProfile.partnerBanks?.length || 0;

  return (
    <section className="border-y border-slate-200 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="font-semibold text-brand-primary-700">Trust</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-ink md:text-4xl">
              相談前に確認できる情報を
              <br />
              先に出しています
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              はじめての相談で不安になりやすい会社情報、権利管理の範囲、見積り前の進め方を、確認しやすい順番で置いています。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                <BadgeCheck className="h-3.5 w-3.5 text-brand-primary-700" />
                電話受付あり
              </span>
              {bankCount > 0 && (
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                  <BadgeCheck className="h-3.5 w-3.5 text-brand-primary-700" />
                  取引金融機関 {bankCount}行
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {proofItems.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-brand-primary-700">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-ink">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    <p className="mt-3 text-xs font-semibold tracking-wide text-slate-500">{item.meta}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-slate-600">
            まず会社情報を確認したい場合は、所在地・法人番号・事業内容を掲載したページから確認できます。
          </p>
          <Link
            to="/company"
            onClick={() => trackEvent('cta_click', { placement: 'proof_checklist', target: 'company' })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-800"
          >
            会社情報を見る
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProofChecklist;
