import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../site.config';

const Footer: React.FC = () => {
  const phone = siteConfig.companyProfile.phone || '';
  const phoneHref = phone.replace(/[^\d+]/g, '');

  return (
    <footer className="mt-10 bg-slate-900 py-14 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">{siteConfig.companyName}</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.positioning.footerTagline}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
              京都発の実務チーム
            </span>
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
              会社窓口で対応
            </span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold text-white/50">事業一覧</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/services/music-publishing" className="text-white/70 transition-colors hover:text-white">
              音楽出版・BGM権利管理
            </Link>
            <Link to="/services/sns-management" className="text-white/70 transition-colors hover:text-white">
              YouTube/SNS運用
            </Link>
            <Link to="/services/production-workflow/" className="text-white/70 transition-colors hover:text-white">
              制作進行・業務整理
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold text-white/50">お問い合わせ</p>
          <div className="flex flex-col gap-2 text-sm">
            {phone && (
              <a href={`tel:${phoneHref}`} className="font-semibold text-white transition-colors hover:text-amber-200">
                TEL: {phone}
              </a>
            )}
            <p className="text-white/60">受付時間 9:00-20:00</p>
            <a
              href="https://www.instagram.com/regalo0610/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition-colors hover:text-white"
            >
              Instagram @regalo0610
            </a>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold text-white/50">ガイド</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/column/" className="text-white/70 transition-colors hover:text-white">
              コラム
            </Link>
            <Link to="/company/" className="text-white/70 transition-colors hover:text-white">
              会社情報
            </Link>
            <Link to="/contact/" className="text-white/70 transition-colors hover:text-white">
              お問い合わせ
            </Link>
            <a
              href={`${import.meta.env.BASE_URL}privacy.html`}
              className="text-white/70 transition-colors hover:text-white"
            >
              プライバシーポリシー
            </a>
            <a
              href={`${import.meta.env.BASE_URL}terms.html`}
              className="text-white/70 transition-colors hover:text-white"
            >
              利用規約
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-white/10 pt-4 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} {siteConfig.companyProfile.legalName}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
