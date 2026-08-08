import { NavItem, CompanyProfile, CaseStudy, NewsItem } from './types';

const CONTACT_EMAIL = 'contact@regalocom.net';
export const JASRAC_RELATION_LABEL = 'JASRAC管理委託契約';
const BRAND_POSITIONING = {
  homepageSummary:
    'Regaloは、YouTubeで使う音楽の権利管理を起点に、SNS運用と制作進行までを一つの窓口で整えます。相談から台帳・運用ルールの定着まで、現場で使える形にします。',
  companySummary:
    'Regaloは京都発の実務チームとして、音楽権利管理、SNS運用、共有や進行の設計までを横断し、相談から改善まで一気通貫で支援します。',
  crossFunctionalLabel: '3つの支援領域を横断して支援',
  serviceDetailEyebrow: '支援内容',
  serviceDetailSummary:
    '課題の整理から設計、運用定着まで、現場で回る形を重視して伴走します。',
  footerTagline: '音楽権利管理を軸に、SNS運用・進行改善まで一貫して支援します。',
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
    '音楽出版事業部',
    'SNS管理事業部',
    'AIマーケティング戦略事業部',
  ],
  contactEmail: CONTACT_EMAIL,
};

export const cases: CaseStudy[] = [
  {
    serviceSlug: 'music-publishing',
    title: 'BGM運用と権利管理を整理',
    clientType: 'YouTube・BGM運用の支援設計サンプル（実績紹介ではありません）',
    challenge: 'BGM利用可否の判断が人依存で、公開前確認に時間がかかる。',
    scope: 'BGMカタログ構築・権利台帳整備・利用許諾フロー設計',
    outcome: '権利情報と利用条件を一つの台帳へ集約し、公開前に確認できる運用へ整理。',
    results: ['権利情報を台帳へ集約', '利用判断の基準を統一', '公開前の確認手順を明文化'],
    deliverables: ['台帳設計', '利用可否ルール', '許諾管理手順', '運用ルール'],
  },
  {
    serviceSlug: 'sns-management',
    title: 'YouTube運用の属人化を標準化',
    clientType: 'YouTube運用の支援設計サンプル（実績紹介ではありません）',
    challenge: '企画や改善が担当者依存で、数値を見ながら運用改善を回せない。',
    scope: 'YouTube運用設計・編集ガイドライン策定・KPIダッシュボード構築',
    outcome: '企画、制作、確認、公開後の振り返りを一つの流れにし、担当者が変わっても追える形へ整理。',
    results: ['制作フローを標準化', 'KPIダッシュボードを構築', '役割分担を明文化'],
    deliverables: ['運用フロー', '編集ガイドライン', 'KPI定義', 'ダッシュボード'],
  },
  {
    serviceSlug: 'ai-marketing-strategy',
    title: '制作進行をDrive/Sheets/Discordで自動化',
    clientType: '制作進行の支援設計サンプル（実績紹介ではありません）',
    challenge: '素材収集・進捗共有・リマインドが手作業で、共有漏れや遅延が起きる。',
    scope: 'Google Drive / Sheets / Discord を連携した制作進行自動化',
    outcome: '素材共有、進捗更新、確認依頼をつなぎ、手作業の転記と連絡漏れを減らす運用へ整理。',
    results: ['進捗共有を一元化', '共有漏れを抑制', 'リマインドを自動化'],
    deliverables: ['フォルダ設計', '進捗シート雛形', '通知フロー', '運用手順'],
  },
];

export const newsItems: NewsItem[] = [
  {
    date: '2026.03.30',
    title: 'クラウドワークス公式メディア「クラウドソーシングTimes」に掲載',
    href: 'https://crowdworks.jp/times/interview/28780/',
  },
  { date: '2026.02.18', title: 'AI戦略事業部発足' },
  { date: '2025.12.08', title: '音楽著作権管理者養成講座を修了' },
  { date: '2025.04.12', title: 'ホームページリニューアル' },
];

export const siteConfig = {
  companyName: 'Regalo',
  companyNameEn: 'Regalo Inc.',
  contactEmail: CONTACT_EMAIL,
  contactFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdbqMVhTDUHcfhnrv5Vj96aBF9WhyAwysTfmG9CdgElhrGm1A/viewform',
  verificationLinks: {
    corporateRegistry:
      'https://www.houjin-bangou.nta.go.jp/henkorireki-johoto.html?selHouzinNo=4130001077277',
    mediaCoverage: 'https://crowdworks.jp/times/interview/28780/',
  },
  siteTitle: 'Regalo | 音楽出版・SNS管理・AIマーケティング戦略',
  siteDescription:
    'Regaloは京都発の実務チームとして、音楽権利管理、SNS運用、共有や進行の設計まで、現場で回る仕組みづくりを一気通貫で支援します。',
  positioning: BRAND_POSITIONING,
  companyProfile,
  cases,
  newsItems,
  navItems: [
    { label: 'ホーム', href: '/' },
    { label: '音楽出版事業部', href: '/services/music-publishing/' },
    { label: 'SNS管理事業部', href: '/services/sns-management/' },
    { label: 'AIマーケティング戦略事業部', href: '/services/ai-marketing-strategy/' },
    { label: '会社情報', href: '/company' },
  ] as NavItem[],
};
