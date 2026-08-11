import React from 'react';
import { Link } from 'react-router';
import { siteConfig } from '../site.config';

const Footer: React.FC = () => {
  const phone = siteConfig.companyProfile.phone || '';
  const phoneHref = phone.replace(/[^\d+]/g, '');

  return (
    <footer className="mt-10 bg-slate-950 py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.9fr_0.9fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-semibold">{siteConfig.companyName}</h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-white/65">{siteConfig.positioning.footerTagline}</p>
            <p className="mt-5 text-xs text-white/50">京都府長岡京市 / 会社窓口で対応</p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold text-white/45">対応内容</p>
            <div className="flex flex-col gap-3 text-sm">
              <Link to="/services/music-publishing/" className="text-white/70 transition-colors hover:text-white">
                音楽権利管理・BGM制作
              </Link>
              <Link to="/services/sns-management/" className="text-white/70 transition-colors hover:text-white">
                YouTube運用・制作進行
              </Link>
              <Link to="/services/ai-marketing-strategy/" className="text-white/70 transition-colors hover:text-white">
                業務改善・自動化支援
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold text-white/45">お問い合わせ</p>
            <div className="flex flex-col gap-3 text-sm">
              {phone && (
                <a href={`tel:${phoneHref}`} className="font-semibold text-white transition-colors hover:text-amber-200">
                  TEL: {phone}
                </a>
              )}
              <a href={`mailto:${siteConfig.companyProfile.contactEmail}`} className="text-white/70 hover:text-white">
                {siteConfig.companyProfile.contactEmail}
              </a>
              <p className="text-white/55">受付時間 9:00-20:00</p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold text-white/45">会社情報</p>
            <div className="flex flex-col gap-3 text-sm">
              <Link to="/company" className="text-white/70 hover:text-white">会社情報</Link>
              <Link to="/contact" className="text-white/70 hover:text-white">お問い合わせ</Link>
              <Link to="/privacy" className="text-white/70 hover:text-white">プライバシーポリシー</Link>
              <Link to="/terms" className="text-white/70 hover:text-white">利用規約</Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 pt-6 text-xs text-white/50 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>{siteConfig.companyProfile.legalName}</span>
            <span>代表者 {siteConfig.companyProfile.representative}</span>
            <span>法人番号 {siteConfig.companyProfile.corporateNumber}</span>
          </div>
          <Link to="/company" className="font-semibold text-white/70 hover:text-white">
            法人情報・外部確認先を見る
          </Link>
        </div>
        <p className="mt-5 text-xs text-white/35">&copy; {new Date().getFullYear()} {siteConfig.companyProfile.legalName}</p>
      </div>
    </footer>
  );
};

export default Footer;
