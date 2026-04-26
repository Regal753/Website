import { NavItem, CompanyProfile, CaseStudy, NewsItem, ColumnItem } from './types';

const CONTACT_EMAIL = 'contact@regalocom.net';
const BRAND_POSITIONING = {
  homepageSummary:
    '株式会社Regaloは、音楽出版・BGM権利管理とYouTube/SNS運用を中心に、制作進行や共有ルールの整備まで実務で支援します。見栄えだけでなく、権利・手順・数字を確認できる状態まで整えることを重視しています。',
  companySummary:
    'Regaloは京都発の実務チームとして、音楽出版・BGM権利管理、YouTube/SNS運用、制作進行や共有ルールの整備までを横断し、相談から改善まで一気通貫で支援します。',
  crossFunctionalLabel: '音楽権利・運用・進行管理を横断して支援',
  serviceDetailEyebrow: '支援内容',
  serviceDetailSummary:
    '課題の整理から設計、運用定着まで、担当者が変わっても続けやすい形を重視して伴走します。',
  footerTagline: '音楽出版・BGM権利管理、YouTube/SNS運用、制作進行の整備まで一貫して支援します。',
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
    '音楽出版・BGM権利管理',
    'YouTube/SNS運用支援',
    '制作進行・業務整理支援',
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
    outcome: '公開前の確認基準と台帳を整備し、BGM利用判断のばらつきを抑制。',
    results: ['公開前確認の手順を統一', 'BGM台帳を整備', '利用判断の基準を明文化'],
    deliverables: ['台帳設計', '利用可否ルール', '許諾管理手順', '運用ルール'],
  },
  {
    serviceSlug: 'sns-management',
    title: 'YouTube運用の属人化を標準化',
    clientType: '企業メディア運営チーム',
    challenge: '企画や改善が担当者依存で、数値を見ながら運用改善を回せない。',
    scope: 'YouTube運用設計・編集ガイドライン策定・KPIダッシュボード構築',
    outcome: '属人化していた運用を標準化し、企画・制作・改善の流れを追える状態に整理。',
    results: ['制作フローを標準化', 'KPIダッシュボードを構築', '役割分担を明文化'],
    deliverables: ['運用フロー', '編集ガイドライン', 'KPI定義', 'ダッシュボード'],
  },
  {
    serviceSlug: 'production-workflow',
    title: '制作進行をDrive/Sheets/Discordで整理',
    clientType: 'クリエイター事務所',
    challenge: '素材収集・進捗共有・リマインドが手作業で、共有漏れや遅延が起きる。',
    scope: 'Google Drive / Sheets / Discord を使った制作進行ルールの整備',
    outcome: '素材共有・進捗管理・確認依頼の流れを整理し、共有漏れや確認遅れを抑制。',
    results: ['素材共有の場所を統一', '共有漏れを抑制', '確認手順を明文化'],
    deliverables: ['フォルダ設計', '進捗シート雛形', '通知フロー', '運用手順'],
  },
];

export const newsItems: NewsItem[] = [
  {
    date: '2026.03.30',
    title: 'クラウドワークス公式メディア「クラウドソーシングTimes」に掲載',
    href: 'https://crowdworks.jp/times/interview/28780/',
  },
  { date: '2026.02.18', title: '制作進行・業務整理支援を開始' },
  { date: '2025.12.08', title: '音楽著作権管理者資格取得' },
  { date: '2025.04.12', title: 'ホームページリニューアル' },
];

export const columnItems: ColumnItem[] = [
  {
    date: '2026.04.25',
    category: 'YouTube運用',
    title: 'YouTube運用で最初に整えるべき権利・台帳・進行管理',
    summary:
      '投稿本数や企画の前に、BGM利用可否、素材の所在、公開前チェックの責任範囲を揃えると、運用停止や確認漏れを抑えやすくなります。',
    points: ['BGM利用可否の確認手順', '素材と契約情報の保管場所', '公開前チェックの担当範囲'],
    slug: 'youtube-rights-workflow',
    readTime: '約4分',
  },
  {
    date: '2026.04.18',
    category: 'BGM権利管理',
    title: 'BGMを安全に使うための管理表に入れておきたい項目',
    summary:
      '曲名や作曲者だけでなく、利用範囲、登録状況、許諾条件、差分ファイルの所在まで管理すると、後から確認できる状態を作れます。',
    points: ['権利者・管理者の記録', '利用範囲と禁止事項', '納品ファイルと差分の整理'],
    slug: 'bgm-rights-ledger',
    readTime: '約3分',
  },
  {
    date: '2026.04.12',
    category: '制作進行',
    title: '属人化した制作進行を減らすための共有ルール',
    summary:
      'Drive、Sheets、Discordなど既存ツールを使い、誰が見ても次の作業が分かる状態にするための最小ルールを整理します。',
    points: ['案件ごとのフォルダ構成', '進捗ステータスの定義', '確認依頼と締切の通知'],
    slug: 'production-shared-rules',
    readTime: '約5分',
  },
  {
    date: '2026.04.05',
    category: '法人向け相談',
    title: '外注運用を始める前に確認したい依頼範囲の切り分け',
    summary:
      '企画、制作、投稿、分析、権利確認を一括で外に出す前に、社内に残す判断と外部に任せる作業を分けると、費用対効果を見やすくなります。',
    points: ['社内判断として残す項目', '外部化しやすい定型作業', '月次で確認する数字'],
    slug: 'outsourcing-scope-check',
    readTime: '約4分',
  },
];

export const siteConfig = {
  companyName: 'Regalo',
  contactEmail: CONTACT_EMAIL,
  contactFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdbqMVhTDUHcfhnrv5Vj96aBF9WhyAwysTfmG9CdgElhrGm1A/viewform',
  siteTitle: 'Regalo | 音楽出版・BGM権利管理・YouTube運用',
  siteDescription:
    '株式会社Regaloは京都府長岡京市の実務チームとして、音楽出版・BGM権利管理、YouTube/SNS運用、制作進行や共有ルールの整備まで支援します。',
  positioning: BRAND_POSITIONING,
  companyProfile,
  cases,
  newsItems,
  columnItems,
  navItems: [
    { label: 'ホーム', href: '/' },
    { label: 'サービス', href: '/#services' },
    { label: 'コラム', href: '/column/' },
    { label: '会社情報', href: '/company/' },
  ] as NavItem[],
};
