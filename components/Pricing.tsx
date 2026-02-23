import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Send } from 'lucide-react';
import { SectionId } from '../types';

const Pricing: React.FC = () => {
  return (
    <section id={SectionId.PRICING} className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">料金について</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            プロジェクトの内容・規模に応じて個別にお見積りをご提示しています。
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary-500 to-brand-primary-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <FileText className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold text-brand-ink">お見積り提示フロー</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                定額メニューは設けていません。ヒアリング内容をもとに、作業範囲・期間・体制を整理したうえで、明細つきのお見積りをお送りします。
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-3">
              <span className="mt-1 w-6 h-6 rounded-full bg-brand-primary-50 text-brand-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <p className="text-slate-600 text-sm leading-relaxed">
                お問い合わせフォームから、ご相談内容をお送りください。現状の課題感やご希望をざっくりお書きいただければ大丈夫です。
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 w-6 h-6 rounded-full bg-brand-primary-50 text-brand-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <p className="text-slate-600 text-sm leading-relaxed">
                内容を確認後、必要に応じてオンラインでヒアリングを行います（30 分程度）。ここまで費用はかかりません。
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 w-6 h-6 rounded-full bg-brand-primary-50 text-brand-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <p className="text-slate-600 text-sm leading-relaxed">
                作業スコープ・スケジュール・費用を明記したお見積りをお送りします。ご納得いただけた場合のみ正式発注となります。
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary-700 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-brand-primary-800"
            >
              <Send size={18} />
              まずは相談する
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
