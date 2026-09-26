import { NavItem, CompanyProfile, CaseStudy, NewsItem } from './types';

const CONTACT_EMAIL = 'contact@regalocom.net';
export const JASRAC_RELATION_LABEL = 'JASRACへの管理委託';
const BRAND_POSITIONING = {
  homepageSummary:
    '利用先と契約内容を記録し、動画公開前の確認項目と担当を決めます。YouTubeの企画、制作進行、投稿管理にも対応します。',
  companySummary:
    '株式会社Regaloは京都府長岡京市を拠点に、BGMの制作・権利情報管理、YouTubeの制作・投稿管理、進捗共有の自動化を行っています。',
  crossFunctionalLabel: '音楽・動画・制作進行に対応',
  serviceDetailEyebrow: '対応業務',
  footerTagline: 'BGMの権利情報管理、YouTubeの制作・投稿管理、制作進行の自動化に対応します。',
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
    title: 'BGMの利用条件を一覧化',
    clientType: 'YouTube・BGM運用',
    challenge: '契約書や楽曲情報が分散し、動画ごとの利用条件を確認するのに時間がかかる。',
    scope: '対象楽曲、権利者、契約、利用先を確認し、台帳と公開前チェック表を作成。',
    outcome: '楽曲と利用条件を台帳にまとめ、公開前の確認項目と担当を文書化。',
    results: ['対象楽曲と契約資料を一覧化', '利用条件の確認項目を設定', '公開前の確認担当を明記'],
    deliverables: ['楽曲・契約情報の台帳', '利用条件チェック表', '公開前の確認手順'],
  },
  {
    serviceSlug: 'sns-management',
    title: 'YouTubeの制作・投稿管理',
    clientType: 'YouTube運用',
    challenge: '企画、制作、承認、投稿の担当が曖昧で、公開後の数値も記録できていない。',
    scope: '投稿計画と担当・承認手順を決め、公開後の指標を定例レポートにまとめる。',
    outcome: '企画から投稿までの担当と、公開後に確認する数値を文書化。',
    results: ['投稿計画と担当を明記', '承認手順を設定', '公開後の指標を記録'],
    deliverables: ['投稿計画表', '制作・承認手順', '定例レポートの雛形'],
  },
  {
    serviceSlug: 'workflow-automation',
    title: '制作進行の共有・通知を自動化',
    clientType: '制作進行',
    challenge: '素材の保存先、進捗、確認依頼が複数のツールに分かれ、連絡が手作業になっている。',
    scope: 'Google Drive、Google Sheets、Discordの連携範囲を決め、進捗と確認依頼の通知を設定。',
    outcome: '素材の保存先、進捗の更新方法、通知条件を決めて共有。',
    results: ['素材の保存先を整理', '進捗の更新方法を設定', '確認依頼の通知条件を設定'],
    deliverables: ['共有フォルダの構成表', '進捗管理シート', '通知条件の一覧', '運用手順書'],
  },
];

export const newsItems: NewsItem[] = [
  {
    date: '2026.08.15',
    title: '法人向け事業案内、発注前のFAQ、法務ページを更新',
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
    '株式会社Regalo代表の塩田玲央です。京都府長岡京市を拠点に、BGMの権利情報管理、YouTube運用、制作進行を担当しています。2025年度に日本音楽出版社協会主催の音楽著作権管理者養成講座を修了しました。ご相談時には対象楽曲、契約資料、制作工程を確認し、対応範囲をお見積りに明記します。',
  verificationLinks: {
    corporateRegistry:
      'https://www.houjin-bangou.nta.go.jp/henkorireki-johoto.html?selHouzinNo=4130001077277',
    mediaCoverage: 'https://crowdworks.jp/times/interview/28780/',
    trainingProgram: 'https://mpaj.or.jp/news/17695',
  },
  siteTitle: 'Regalo | 音楽出版・権利情報管理・YouTube運用・業務自動化',
  siteDescription:
    '株式会社Regaloは京都府長岡京市を拠点に、BGMの制作・権利情報管理、YouTubeの制作・投稿管理、進捗共有の自動化を行っています。',
  positioning: BRAND_POSITIONING,
  companyProfile,
  cases,
  newsItems,
  navItems: [
    { label: 'ホーム', href: '/' },
    { label: '音楽・権利情報', href: '/services/music-publishing/' },
    { label: 'YouTube・SNS', href: '/services/sns-management/' },
    { label: '制作進行・自動化', href: '/services/workflow-automation/' },
    { label: '会社情報', href: '/company' },
  ] as NavItem[],
};
