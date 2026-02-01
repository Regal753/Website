import React from 'react';
import { FileText, Send } from 'lucide-react';
import { SectionId } from '../types';
import { siteConfig } from '../site.config';

const Pricing: React.FC = () => {
  return (
    <section id={SectionId.PRICING} className="py-24 bg-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">料金について</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            プロジェクトの内容・規模に応じて個別にお見積りをご提示しています。
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-2xl p-8 md:p-12 border border-slate-700">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <FileText className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">お見積り提示フロー</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                定額メニューは設けていません。ヒアリング内容をもとに、作業範囲・期間・体制を整理したうえで、明細つきのお見積りをお送りします。
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-3">
              <span className="mt-1 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <p className="text-slate-300 text-sm leading-relaxed">
                お問い合わせフォームから、ご相談内容をお送りください。現状の課題感やご希望をざっくりお書きいただければ大丈夫です。
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <p className="text-slate-300 text-sm leading-relaxed">
                内容を確認後、必要に応じてオンラインでヒアリングを行います（30 分程度）。ここまで費用はかかりません。
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <p className="text-slate-300 text-sm leading-relaxed">
                作業スコープ・スケジュール・費用を明記したお見積りをお送りします。ご納得いただけた場合のみ正式発注となります。
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href={siteConfig.contactFormUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
            >
              <Send size={18} />
              まずは相談する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

