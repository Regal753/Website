import { NavItem, CompanyProfile, CaseStudy, NewsItem } from './types';

const CONTACT_EMAIL = 'contact@regalocom.net';
export const JASRAC_RELATION_LABEL = 'JASRACへの管理委託';
const BRAND_POSITIONING = {
  homepageSummary:
    '株式会社Regaloは、YouTubeで使用する音楽の権利情報確認を起点に、SNS運用と制作進行を支援します。楽曲情報の整理、管理台帳の作成、運用手順の整備まで対応します。',
  companySummary:
    '株式会社Regaloは京都府長岡京市を拠点に、音楽の権利情報管理、YouTube・SNS運用、制作進行、業務フローの整備に対応しています。',
  crossFunctionalLabel: '3つの事業領域に対応',
  serviceDetailEyebrow: '支援内容',
  footerTagline: '音楽の権利情報管理を軸に、YouTube・SNS運用と制作進行を支援します。',
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
    '業務自動化・制作進行支援',
  ],
  contactEmail: CONTACT_EMAIL,
};

export const cases: CaseStudy[] = [
  {
    serviceSlug: 'music-publishing',
    title: 'BGMの権利情報と運用手順',
    clientType: 'YouTube・BGM運用',
    challenge: 'BGM利用可否の判断が人依存で、公開前確認に時間がかかる。',
    scope: 'BGMカタログ構築・権利台帳整備・利用条件の確認手順設計',
    outcome: '権利情報と利用条件を管理台帳に集約し、公開前の確認手順を明文化。',
    results: ['権利情報を台帳へ集約', '利用判断の基準を統一', '公開前の確認手順を明文化'],
    deliverables: ['台帳設計', '利用可否ルール', '許諾管理手順', '運用ルール'],
  },
  {
    serviceSlug: 'sns-management',
    title: 'YouTube運用手順の標準化',
    clientType: 'YouTube運用',
    challenge: '企画や確認手順が担当者ごとに異なり、公開後の数値確認が継続できない。',
    scope: 'YouTube運用設計・編集ガイドライン策定・KPIダッシュボード構築',
    outcome: '企画、制作、確認、公開後分析の手順と担当を明文化。',
    results: ['制作フローを標準化', 'KPIダッシュボードを構築', '役割分担を明文化'],
    deliverables: ['運用フロー', '編集ガイドライン', 'KPI定義', 'ダッシュボード'],
  },
  {
    serviceSlug: 'workflow-automation',
    title: '制作進行の共有・通知を自動化',
    clientType: '制作進行',
    challenge: '素材収集・進捗共有・リマインドが手作業で、共有漏れや遅延が起きる。',
    scope: 'Google Drive / Sheets / Discord を連携した制作進行自動化',
    outcome: '素材共有、進捗更新、確認依頼を連携し、転記作業と連絡漏れを削減。',
    results: ['進捗共有を一元化', '共有漏れを抑制', 'リマインドを自動化'],
    deliverables: ['フォルダ設計', '進捗シート雛形', '通知フロー', '運用手順'],
  },
];

export const newsItems: NewsItem[] = [
  {
    date: '2026.08.15',
    title: '法人向けの事業案内、発注前FAQ、法務ページ、共有用メタ情報を改善',
  },
  {
    date: '2026.03.30',
    title: 'クラウドワークス公式メディア「クラウドソーシングTimes」に掲載',
    href: 'https://crowdworks.jp/times/interview/28780/',
  },
  { date: '2026.02.18', title: '業務自動化・制作進行支援を開始' },
  { date: '2025.12.08', title: '音楽著作権管理者養成講座を修了' },
  { date: '2025.04.12', title: 'ホームページリニューアル' },
];

export const siteConfig = {
  companyName: 'Regalo',
  companyNameEn: 'Regalo Inc.',
  contactEmail: CONTACT_EMAIL,
  contactFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdbqMVhTDUHcfhnrv5Vj96aBF9WhyAwysTfmG9CdgElhrGm1A/viewform',
  representativeProfile:
    '株式会社Regalo代表の塩田玲央です。京都を拠点に、YouTubeで使用する動画の権利管理を起点として、SNS運用と制作進行の整備に取り組んでいます。日本音楽出版社協会主催の音楽著作権管理者養成講座を2025年度に修了しました。権利情報や進行状況をこと細かくチェックしていきます。',
  verificationLinks: {
    corporateRegistry:
      'https://www.houjin-bangou.nta.go.jp/henkorireki-johoto.html?selHouzinNo=4130001077277',
    mediaCoverage: 'https://crowdworks.jp/times/interview/28780/',
    trainingProgram: 'https://mpaj.or.jp/news/17695',
  },
  siteTitle: 'Regalo | 音楽出版・権利情報管理・YouTube運用・業務自動化',
  siteDescription:
    '株式会社Regaloは京都府長岡京市を拠点に、音楽の権利情報管理、YouTube・SNS運用、制作進行、業務フローの整備に対応しています。',
  positioning: BRAND_POSITIONING,
  companyProfile,
  cases,
  newsItems,
  navItems: [
    { label: 'ホーム', href: '/' },
    { label: '音楽出版・権利情報管理', href: '/services/music-publishing/' },
    { label: 'YouTube・SNS運用', href: '/services/sns-management/' },
    { label: '業務自動化・制作進行支援', href: '/services/workflow-automation/' },
    { label: '会社情報', href: '/company' },
  ] as NavItem[],
};
