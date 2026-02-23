import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../site.config';

const Footer: React.FC = () => {
  const phone = siteConfig.companyProfile.phone || '';

  return (
    <footer className="relative mt-10 border-t border-slate-200 bg-gradient-to-b from-white to-slate-100/80 py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary-300/70 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="md:col-span-2 lg:col-span-1">
          <h2 className="mb-1 text-xl font-semibold text-brand-ink">{siteConfig.companyName}</h2>
          <p className="text-sm text-slate-500">3つの事業部で、運用・制作・改善を一気通貫で支援します。</p>
          <p className="mt-2 text-xs text-slate-400">京都発、伴走型の運用支援チーム</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-widest text-slate-500">事業一覧</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/services/music-publishing" className="text-slate-600 transition-colors hover:text-brand-primary-700">
              音楽出版事業部
            </Link>
            <Link to="/services/sns-management" className="text-slate-600 transition-colors hover:text-brand-primary-700">
              SNS管理事業部
            </Link>
            <Link
              to="/services/ai-marketing-strategy"
              className="text-slate-600 transition-colors hover:text-brand-primary-700"
            >
              AIマーケティング戦略事業部
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-widest text-slate-500">お問い合わせ</p>
          <div className="flex flex-col gap-2 text-sm">
            {phone && (
              <a
                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                className="font-semibold text-slate-700 transition-colors hover:text-brand-primary-700"
              >
                TEL: {phone}
              </a>
            )}
            <p className="text-slate-500">電話受付 9:00-20:00</p>
            <a
              href="https://www.instagram.com/regalo0610/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 transition-colors hover:text-brand-primary-700"
            >
              Instagram @regalo0610
            </a>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-widest text-slate-500">ガイド</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/company" className="text-slate-600 transition-colors hover:text-brand-primary-700">
              会社概要
            </Link>
            <Link to="/contact" className="text-slate-600 transition-colors hover:text-brand-primary-700">
              お問い合わせ
            </Link>
            <a
              href={`${import.meta.env.BASE_URL}privacy.html`}
              className="text-slate-600 transition-colors hover:text-brand-primary-700"
            >
              プライバシーポリシー
            </a>
            <a
              href={`${import.meta.env.BASE_URL}terms.html`}
              className="text-slate-600 transition-colors hover:text-brand-primary-700"
            >
              利用規約
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200 pt-4 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {siteConfig.companyNameEn}. 無断転載を禁じます。
        </div>
      </div>
    </footer>
  );
};

export default Footer;
