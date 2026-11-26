import React from 'react';
import { Link } from 'react-router';
import { siteConfig } from '../site.config';

const Footer: React.FC = () => {
  const phone = siteConfig.companyProfile.phone || '';
  const phoneHref = phone.replace(/[^\d+]/g, '');

  return (
    <footer className="bg-[#383d32] py-14 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold text-white">{siteConfig.companyName}</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.positioning.footerTagline}</p>
          <p className="mt-4 text-xs text-white/60">本社：京都府長岡京市</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-widest text-white/50">事業一覧</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/services/music-publishing/" className="text-white/70 transition-colors hover:text-white">
              音楽出版・BGM制作
            </Link>
            <Link to="/services/sns-management/" className="text-white/70 transition-colors hover:text-white">
              YouTube・SNS運用
            </Link>
            <Link to="/services/workflow-automation/" className="text-white/70 transition-colors hover:text-white">
              制作進行・業務自動化
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-widest text-white/50">お問い合わせ</p>
          <div className="flex flex-col gap-2 text-sm">
            {phone && (
              <a href={`tel:${phoneHref}`} className="font-semibold text-white transition-colors hover:text-amber-200">
                TEL: {phone}
              </a>
            )}
            <a
              href={`mailto:${siteConfig.companyProfile.contactEmail}`}
              className="text-white/70 transition-colors hover:text-white"
            >
              {siteConfig.companyProfile.contactEmail}
            </a>
            <p className="text-white/60">電話受付 9:00-20:00</p>
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
          <p className="mb-3 text-xs font-semibold tracking-widest text-white/50">ガイド</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/company" className="text-white/70 transition-colors hover:text-white">
              会社情報
            </Link>
            <Link to="/privacy" className="text-white/70 transition-colors hover:text-white">
              プライバシーポリシー
            </Link>
            <Link to="/terms" className="text-white/70 transition-colors hover:text-white">
              利用規約
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 border-t border-white/10 pt-5 text-xs text-white/50 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>{siteConfig.companyProfile.legalName}</span>
            <span>代表者 {siteConfig.companyProfile.representative}</span>
            <span>法人番号 {siteConfig.companyProfile.corporateNumber}</span>
          </div>
          <Link to="/company" className="font-semibold text-white/70 transition-colors hover:text-white">
            法人情報・外部確認先を見る
          </Link>
        </div>
        <div className="mt-4 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} {siteConfig.companyProfile.legalName}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
