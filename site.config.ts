import { NavItem, CompanyProfile, CaseStudy, NewsItem } from './types';

const CONTACT_EMAIL = 'contact@regalocom.net';
const BRAND_POSITIONING = {
  homepageSummary:
    'Regaloは、音楽出版・BGM権利管理とYouTube/SNS運用を軸に、制作進行や共有フローの自動化まで支援します。見た目だけでなく、日々の運用が止まりにくい形まで整えます。',
  companySummary:
    'Regaloは京都発の実務チームとして、音楽出版・BGM権利管理、YouTube/SNS運用、制作進行や共有フローの整備までを横断し、相談から改善まで一気通貫で支援します。',
  crossFunctionalLabel: '主軸事業と運用改善を横断して支援',
  serviceDetailEyebrow: '支援内容',
  serviceDetailSummary:
    '課題の整理から設計、運用定着まで、現場で回る形を重視して伴走します。',
  footerTagline: '音楽出版・YouTube/SNS運用を軸に、権利管理と進行改善まで一貫して支援します。',
} as const;

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
    'YouTube/SNS運用支援',
    '音楽出版・BGM権利管理',
    '制作進行・運用自動化支援',
  ],
  contactEmail: CONTACT_EMAIL,
};

export const cases: CaseStudy[] = [
  {
    serviceSlug: 'music-publishing',
    title: 'BGM運用と権利管理を整理',
    clientType: '音楽系YouTubeチャンネル',
    challenge: 'BGM利用可否の判断が人依存で、公開前確認に時間がかかる。',
    scope: 'BGMカタログ構築・権利台帳整備・利用許諾フロー設計',
    outcome: '権利トラブル0件を維持しつつ、月次のBGM納品本数を約2倍に改善。',
    results: ['権利トラブル 0件を維持', 'BGM納品本数 約2倍', '利用判断の基準を統一'],
    deliverables: ['台帳設計', '利用可否ルール', '許諾管理手順', '運用ルール'],
  },
  {
    serviceSlug: 'sns-management',
    title: 'YouTube運用の属人化を標準化',
    clientType: '企業メディア運営チーム',
    challenge: '企画や改善が担当者依存で、数値を見ながら運用改善を回せない。',
    scope: 'YouTube運用設計・編集ガイドライン策定・KPIダッシュボード構築',
    outcome: '属人化していた運用を標準化し、制作リードタイムを約40%短縮。',
    results: ['制作リードタイム 約40%短縮', 'KPIダッシュボードを構築', '役割分担を明文化'],
    deliverables: ['運用フロー', '編集ガイドライン', 'KPI定義', 'ダッシュボード'],
  },
  {
    serviceSlug: 'ai-marketing-strategy',
    title: '制作進行をDrive/Sheets/Discordで自動化',
    clientType: 'クリエイター事務所',
    challenge: '素材収集・進捗共有・リマインドが手作業で、共有漏れや遅延が起きる。',
    scope: 'Google Drive / Sheets / Discord を連携した制作進行自動化',
    outcome: '手動だった素材共有・進捗管理を自動化し、週あたり約10時間の工数を削減。',
    results: ['週あたり約10時間の工数削減', '共有漏れを抑制', 'リマインドを自動化'],
    deliverables: ['フォルダ設計', '進捗シート雛形', '通知フロー', '運用手順'],
  },
];

export const newsItems: NewsItem[] = [
  {
    date: '2026.03.30',
    title: 'クラウドワークス公式メディア「クラウドソーシングTimes」に掲載',
    href: 'https://crowdworks.jp/times/interview/28780/',
  },
  { date: '2026.02.18', title: '制作進行・運用自動化支援を開始' },
  { date: '2025.12.08', title: '音楽著作権管理者資格取得' },
  { date: '2025.04.12', title: 'ホームページリニューアル' },
];

export const siteConfig = {
  companyName: 'Regalo',
  companyNameEn: 'Regalo Inc.',
  contactEmail: CONTACT_EMAIL,
  contactFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdbqMVhTDUHcfhnrv5Vj96aBF9WhyAwysTfmG9CdgElhrGm1A/viewform',
  siteTitle: 'Regalo | YouTube/SNS運用・音楽出版・運用自動化',
  siteDescription:
    'Regaloは京都発の実務チームとして、音楽出版・BGM権利管理、YouTube/SNS運用、制作進行や共有フローの整備まで、現場で回る仕組みづくりを一気通貫で支援します。',
  positioning: BRAND_POSITIONING,
  companyProfile,
  cases,
  newsItems,
  navItems: [
    { label: 'ホーム', href: '/' },
    { label: 'YouTube/SNS運用', href: '/services/sns-management' },
    { label: '音楽出版・BGM権利管理', href: '/services/music-publishing' },
    { label: '制作進行・運用自動化', href: '/services/ai-marketing-strategy' },
    { label: '会社情報', href: '/company' },
  ] as NavItem[],
};
