import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock3, FileCheck2, Handshake, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

const trustItems = [
  {
    icon: ShieldCheck,
    title: '身元が確認できる状態にする',
    description:
      '法人名、所在地、代表者、電話番号、法人番号を公開しています。SNS経由や紹介経由でも、まず確認できる情報を置いています。',
  },
  {
    icon: Handshake,
    title: '相談を急かさない',
    description:
      '初回相談と見積り前の整理は無料です。契約を前提にせず、作業範囲と費用感を揃えてから進めます。',
  },
  {
    icon: FileCheck2,
    title: '記憶ではなく記録で進める',
    description:
      'BGM権利台帳、進行表、確認フロー、レポートなど、後から見返せる形に整えることを重視しています。',
  },
  {
    icon: Clock3,
    title: '若さは対応の速さに使う',
    description:
      '見た目だけの勢いではなく、返信、調査、整理、実行の初動を早くし、相手に不安を残さない進め方をします。',
  },
] as const;

const supportHighlights = ['初回相談無料', '通常1営業日以内に返信', '電話受付 9:00-20:00', '法人窓口で対応'] as const;

const TrustStats: React.FC = () => {
  const phone = siteConfig.companyProfile.phone || '現在準備中';

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="border border-slate-200 bg-[#fbfaf7] p-6 md:p-8">
            <p className="text-sm font-semibold text-emerald-800">Credibility</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-ink md:text-4xl">
              ちゃんとしていることが、
              <br />
              伝わる順番で見せます。
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-700">
              はじめて会った方、SNSで知った方、年上の方、知人のご家族が見ても不安になりにくいように、
              「誰が」「どこで」「何を」「どう進めるか」を隠さず整理しています。
            </p>

            <div className="mt-7 space-y-3">
              <div className="border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-500">お問い合わせ窓口</p>
                <p className="mt-2 text-lg font-semibold text-brand-ink">{phone}</p>
              </div>
              <div className="border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-500">法人番号</p>
                <p className="mt-2 text-lg font-semibold text-brand-ink">{siteConfig.companyProfile.corporateNumber}</p>
              </div>
            </div>

            <Link
              to="/company/"
              onClick={() => trackEvent('cta_click', { placement: 'trust_stats_company', target: 'company' })}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 transition-colors hover:text-brand-primary-800"
            >
              会社情報を確認する
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <div className="grid gap-4 md:grid-cols-2">
              {trustItems.map((item) => (
                <article key={item.title} className="border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-slate-900">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-brand-ink">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 border border-slate-200 bg-slate-50 px-5 py-4">
              <div className="flex flex-wrap gap-2">
                {supportHighlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                相談段階では「何から着手すべきか」の整理から入ります。すでに決まっている施策がなくても問題ありません。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
