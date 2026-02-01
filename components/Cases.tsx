import React from 'react';
import { Briefcase } from 'lucide-react';
import { SectionId } from '../types';
import { siteConfig } from '../site.config';

const Cases: React.FC = () => {
  return (
    <section id={SectionId.CASES} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">支援実績</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            守秘義務の範囲で、これまでの支援事例をご紹介します。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {siteConfig.cases.map((c, index) => (
            <div
              key={index}
              className="group bg-white hover:bg-white rounded-2xl p-6 transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-1 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg">
                <Briefcase className="text-white w-6 h-6" />
              </div>

              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">クライアント</p>
              <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                {c.clientType}
              </h3>

              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">支援内容</p>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{c.scope}</p>

              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">成果</p>
              <p className="text-emerald-600 text-sm font-medium leading-relaxed">{c.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
