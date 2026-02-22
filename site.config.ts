import { NavItem, CompanyProfile, CaseStudy } from './types';

const CONTACT_EMAIL = 'retoa@regalocom.net';

export const companyProfile: CompanyProfile = {
  brandName: 'Regalo',
  legalName: '株式会社Regalo',
  representative: '塩田玲央',
  phone: '070-9131-7882',
  address: '〒617-0813 京都府長岡京市井ノ内南内畑11-14',
  established: '2024年6月10日',
  business: [
    'SNS運用支援',
    '知的財産管理',
    '業務効率化・DXサポート',
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

export const siteConfig = {
  companyName: 'Regalo',
  companyNameEn: 'Regalo Inc.',
  contactEmail: CONTACT_EMAIL,
  contactFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdbqMVhTDUHcfhnrv5Vj96aBF9WhyAwysTfmG9CdgElhrGm1A/viewform',
  siteTitle: 'Regalo | YouTube運用・BGM・自動化',
  siteDescription:
    'RegaloはYouTube運用、BGM制作・権利管理、ワークフロー自動化を支援する企業です。',
  companyProfile,
  cases,
  navItems: [
    { label: 'ホーム', href: '/' },
    { label: 'SNS運用', href: '/services/sns-operations' },
    { label: '音楽出版・BGM', href: '/services/music-publishing-bgm' },
    { label: 'BGM制作', href: '/services/bgm-production' },
    { label: '権利管理', href: '/services/rights-management' },
    { label: '自動化', href: '/services/workflow-automation' },
    { label: '会社情報', href: '/company' },
    { label: 'お問い合わせ', href: '/contact' },
  ] as NavItem[],
};
