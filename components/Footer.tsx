import React from 'react';
import { siteConfig } from '../site.config';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">{siteConfig.companyName}</h2>
          <p className="text-slate-500 text-sm">
            クリエイターの制作と運用を、音とテクノロジーで支えます。
          </p>
        </div>
        
        <div className="flex gap-6 text-sm text-slate-400">
          <a href="privacy.html" className="hover:text-blue-400 transition-colors">プライバシーポリシー</a>
          <a href="terms.html" className="hover:text-blue-400 transition-colors">利用規約</a>
          <a href="company.html" className="hover:text-blue-400 transition-colors">会社概要</a>
        </div>

        <div className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} {siteConfig.companyNameEn}. 無断転載を禁じます。
        </div>
      </div>
    </footer>
  );
};

export default Footer;
