import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../site.config';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-10 bg-gradient-to-b from-white to-slate-100/80 border-t border-slate-200 py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-slate-900 mb-1">{siteConfig.companyName}</h2>
          <p className="text-slate-500 text-sm">
            3つの事業部で、運用・制作・改善を一気通貫で支援します。
          </p>
          <p className="text-xs text-slate-400 mt-2">京都発、伴走型の運用支援チーム</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <a
            href={`${import.meta.env.BASE_URL}privacy.html`}
            className="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-700 hover:border-blue-200 transition-colors"
          >
            プライバシーポリシー
          </a>
          <a
            href={`${import.meta.env.BASE_URL}terms.html`}
            className="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-700 hover:border-blue-200 transition-colors"
          >
            利用規約
          </a>
          <Link
            to="/company"
            className="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-blue-700 hover:border-blue-200 transition-colors"
          >
            会社概要
          </Link>
        </div>

        <div className="text-slate-400 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} {siteConfig.companyNameEn}. 無断転載を禁じます。
        </div>
      </div>
    </footer>
  );
};

export default Footer;
