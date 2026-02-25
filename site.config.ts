import { NavItem, CompanyProfile, CaseStudy, NewsItem } from './types';

const CONTACT_EMAIL = 'contact@regalocom.net';

export const companyProfile: CompanyProfile = {
  brandName: 'Regalo',
  legalName: '株式会社Regalo',
  representative: '塩田玲央',
  phone: '070-9131-7882',
  address: '〒617-0813 京都府長岡京市井ノ内南内畑11-14',
  established: '2024年6月10日',
  capital: '100万円',
  corporateNumber: '4130001077277',
  partnerBanks: ['住信SBIネット銀行', 'GMOあおぞら銀行', 'みずほ銀行'],
  business: [
    'SNS管理事業部',
    '音楽出版事業部',
    'AIマーケティング戦略事業部',
  ],
  contactEmail: CONTACT_EMAIL,
};

export const cases: CaseStudy[] = [
  {
    clientType: '音楽系YouTubeチャンネル（登録者数万〜）',
    scope: 'BGMカタログ構築・権利台帳整備・利用許諾フロー設計',
    outcome: '権利トラブル 0 件を維持しつつ、月次のBGM納品本数を約2倍に改善',
  },
  {
    clientType: '企業メディア運営チーム',
    scope: 'YouTube運用設計・編集ガイドライン策定・KPIダッシュボード構築',
    outcome: '属人化していた運用を標準化し、制作リードタイムを約40%短縮',
  },
  {
    clientType: 'クリエイター事務所',
    scope: 'Google Drive / Sheets / Discord を連携した制作進行自動化',
    outcome: '手動だった素材共有・進捗管理を自動化し、週あたり約10時間の工数を削減',
  },
];

export const newsItems: NewsItem[] = [
  { date: '2026.02.18', title: 'AI戦略事業部発足' },
  { date: '2025.12.08', title: '音楽著作権管理者資格取得' },
  { date: '2025.04.12', title: 'ホームページリニューアル' },
];

export const siteConfig = {
  companyName: 'Regalo',
  companyNameEn: 'Regalo Inc.',
  contactEmail: CONTACT_EMAIL,
  contactFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdbqMVhTDUHcfhnrv5Vj96aBF9WhyAwysTfmG9CdgElhrGm1A/viewform',
  siteTitle: 'Regalo | SNS管理・音楽出版・AIマーケティング戦略',
  siteDescription:
    'RegaloはSNS管理事業部、音楽出版事業部、AIマーケティング戦略事業部を展開し、運用と改善を一気通貫で支援します。',
  companyProfile,
  cases,
  newsItems,
  navItems: [
    { label: 'ホーム', href: '/' },
    { label: 'SNS管理事業部', href: '/services/sns-management' },
    { label: '音楽出版事業部', href: '/services/music-publishing' },
    { label: 'AIマーケティング戦略事業部', href: '/services/ai-marketing-strategy' },
    { label: '会社情報', href: '/company' },
    { label: 'お問い合わせ', href: '/contact' },
  ] as NavItem[],
};
