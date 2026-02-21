import { NavItem, SectionId, CompanyProfile, CaseStudy } from './types';

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
    { id: SectionId.HOME, label: 'ホーム' },
    { id: SectionId.SERVICES, label: 'SNS運用事業部' },
    { id: SectionId.CASES, label: '実績' },
    { id: SectionId.PRICING, label: '料金' },
    { id: SectionId.PROCESS, label: '進め方' },
    { id: SectionId.TECH, label: '技術' },
    { id: SectionId.COMPANY, label: '会社情報' },
    { id: SectionId.CONTACT, label: 'お問い合わせ' },
  ] as NavItem[],
};
