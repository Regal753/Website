import React from 'react';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../site.config';

type LegalRedirectProps = {
  title: string;
  target: string;
};

const LegalRedirect: React.FC<LegalRedirectProps> = ({ title, target }) => {
  return (
    <section className="bg-[linear-gradient(180deg,_#f8fafc_0%,_#ffffff_38%,_#f0fdfa_100%)] pt-28 pb-20 md:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200/50 md:p-10">
          <p className="inline-flex rounded-full border border-brand-primary-200 bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700">
            規約・方針
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-brand-ink md:text-4xl">{title}へ移動しています</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            法務ページは専用レイアウトで表示します。自動で切り替わらない場合は、下のリンクから開いてください。
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={target}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-800"
            >
              {title}を開く
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-xs text-slate-500">{siteConfig.companyName} / 京都発の実務チーム</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalRedirect;
