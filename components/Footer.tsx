import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../site.config';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">{siteConfig.companyName}</h2>
          <p className="text-slate-500 text-sm">
            SNSと知的財産事業の継続運用を、設計と自動化で支えます。
          </p>
        </div>

        <div className="flex gap-6 text-sm text-slate-500">
          <a href="privacy.html" className="hover:text-blue-600 transition-colors">プライバシーポリシー</a>
          <a href="terms.html" className="hover:text-blue-400 transition-colors">利用規約</a>
          <Link to="/company" className="hover:text-blue-400 transition-colors">会社概要</Link>
        </div>

        <div className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} {siteConfig.companyNameEn}. 無断転載を禁じます。
        </div>
      </div>
    </footer>
  );
};

export default Footer;
