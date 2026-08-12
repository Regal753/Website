import { Bot, Music, Youtube } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceDetailSection {
  title: string;
  points: string[];
}

interface ServiceCaseItem {
  title: string;
  summary: string;
}

interface ServicePricingModel {
  summary: string;
  items: string[];
}

interface ServiceProcessStep {
  title: string;
  description: string;
}

interface ServiceMediaAssets {
  listImage: string;
  galleryImages: string[];
}

export interface ServiceCatalogItem {
  slug: string;
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  color: string;
  detailLead: string;
  detailSections: ServiceDetailSection[];
  caseHighlights: ServiceCaseItem[];
  pricing: ServicePricingModel;
  processSteps: ServiceProcessStep[];
  techStack: string[];
  media: ServiceMediaAssets;
}

const serviceCatalogBase: ServiceCatalogItem[] = [
  {
    slug: 'sns-management',
    title: 'SNS管理事業部',
    description:
      'YouTubeを中心に、企画、制作進行、投稿管理、公開後の数値確認に対応します。',
    items: ['YouTube運用代行', '企画・台本設計', 'KPI分析/改善', '投稿運用オペレーション'],
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    detailLead:
      'SNS管理事業部では、YouTubeの企画、制作進行、投稿管理、数値確認を担当します。運用手順と担当範囲を明文化し、継続して運用できる体制を整備します。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          '投稿企画・台本設計・制作ディレクション',
          'サムネイル/タイトル改善と検証運用',
          '投稿スケジュール管理と進行代行',
          '月次レポートと改善アクション策定',
        ],
      },
      {
        title: '対応課題',
        points: [
          '投稿手順と品質基準を統一したい',
          '再生回数・登録者数の伸び悩みを改善したい',
          '担当者ごとの作業を共通手順にしたい',
        ],
      },
    ],
    caseHighlights: [
      {
        title: '企画・制作・分析の担当を明確化',
        summary: '各工程の担当と確認手順を明文化し、運用手順を標準化。',
      },
      {
        title: 'サムネイル・タイトルの検証手順を整備',
        summary: '公開前後に確認する項目と記録方法を明文化。',
      },
    ],
    pricing: {
      summary: '投稿本数、運用範囲、確認頻度を伺い、作業内容と費用をお見積りで提示します。',
      items: [
        '初期設計: 現状分析、KPI設計、運用方針策定',
        '運用代行: 企画進行、投稿管理、数値分析、改善提案',
        'オプション: 撮影/編集ディレクション、追加レポート、研修支援',
      ],
    },
    processSteps: [
      { title: '現状確認', description: '運用状況、目標、担当体制、確認指標を確認します。' },
      { title: '運用手順の作成', description: '企画方針、制作手順、投稿計画を作成します。' },
      { title: '運用・数値確認', description: '投稿管理と公開後の数値確認を行います。' },
      { title: '定例報告', description: '結果と次回の対応内容を報告します。' },
    ],
    techStack: ['YouTube Analytics', 'Google Sheets', 'Looker Studio', 'Discord'],
    media: {
      listImage: 'images/services/sns-cover.webp',
      galleryImages: [
        'images/services/sns-gallery-1.webp',
        'images/services/sns-gallery-2.webp',
      ],
    },
  },
  {
    slug: 'music-publishing',
    title: '音楽出版事業部',
    description:
      'BGM制作、音楽著作権管理、利用許諾、管理台帳の整備に対応します。',
    items: ['音楽著作権管理', 'BGM制作', '利用許諾/台帳運用', '運用フロー整備'],
    icon: Music,
    color: 'from-brand-primary-500 to-brand-primary-600',
    detailLead:
      '音楽出版事業部では、BGM制作、著作権管理、利用許諾、契約情報の整備に対応します。利用条件と確認手順を明文化し、制作担当者が確認できる管理台帳を作成します。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          'BGMカタログ設計と運用ルール整備',
          'BGM制作（尺違い・差分対応）',
          '権利情報・契約情報の台帳整備',
          '利用許諾の確認手順と担当を明文化',
        ],
      },
      {
        title: '対応課題',
        points: [
          'BGM利用可否の判断基準が曖昧で確認工数が大きい',
          '制作した音源を再利用しづらく、運用効率が低い',
          '権利や契約情報の管理が属人化している',
        ],
      },
    ],
    caseHighlights: [
      {
        title: '公開前の権利確認手順を整備',
        summary: '管理台帳と利用条件を整備し、確認項目を明文化。',
      },
      {
        title: '用途別のBGMを納品',
        summary: '本編、Shortsなど用途に応じた尺と形式で納品。',
      },
    ],
    pricing: {
      summary: '制作曲数、管理対象曲数、利用用途を伺い、作業内容と費用をお見積りで提示します。',
      items: [
        '初期整備: 権利情報棚卸し、台帳設計、運用ルール作成',
        '制作支援: オリジナルBGM制作、差分制作、納品形式の調整',
        '運用支援: 許諾整理、登録更新、定期監査',
      ],
    },
    processSteps: [
      { title: '要件確認', description: '利用用途、制作条件、管理対象を確認します。' },
      { title: 'BGM制作・管理設計', description: 'BGM制作と権利管理の手順を作成します。' },
      { title: '運用開始', description: '管理台帳と利用許諾の確認手順を導入します。' },
      { title: '定期確認', description: '登録情報、利用状況、管理台帳を定期的に確認します。' },
    ],
    techStack: ['Google Sheets', 'Google Drive', '契約管理台帳', '監査チェックリスト'],
    media: {
      listImage: 'images/services/music-cover.webp',
      galleryImages: [
        'images/services/music-gallery-1.webp',
        'images/services/music-gallery-2.webp',
      ],
    },
  },
  {
    slug: 'ai-marketing-strategy',
    title: 'AIマーケティング戦略事業部',
    description:
      'レポート作成、進行共有、通知、確認依頼の自動化に対応します。',
    items: ['進行フロー設計', 'レポート自動化', '通知・共有設計', '運用監査/改善'],
    icon: Bot,
    color: 'from-cyan-500 to-cyan-600',
    detailLead:
      'AIマーケティング戦略事業部では、週次レポート、進行共有、通知、確認依頼の自動化に対応します。現在の運用手順と利用中のシステムを確認し、自動化する範囲を決定します。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          '週次/月次レポートの自動生成',
          'Drive/Sheets/Discord連携による進行共有',
          '定例報告・リマインド・確認フロー自動化',
          '定例確認と変更手順の整備',
        ],
      },
      {
        title: '対応課題',
        points: [
          'レポート作成に時間がかかり、改善判断が遅い',
          '進行共有や報告が手作業で、遅延や漏れが起きる',
          '通知や確認の抜け漏れで実行精度に差が出る',
        ],
      },
    ],
    caseHighlights: [
      {
        title: '定例レポートの集計・共有を自動化',
        summary: '集計方法、出力形式、共有先を設定。',
      },
      {
        title: '進行通知と確認依頼を自動化',
        summary: '通知条件、送信先、確認手順を設定。',
      },
    ],
    pricing: {
      summary: '自動化する業務、利用中のシステム、保守範囲を伺い、作業内容と費用をお見積りで提示します。',
      items: [
        '設計: 現行フロー整理、KPI定義、共有設計',
        '自動化構築: レポート整備、通知導線、ワークフロー実装',
        '運用後の確認: 定期レビュー、変更対応、保守対応',
      ],
    },
    processSteps: [
      { title: '現状確認', description: '現在の作業手順、担当者、利用中のシステムを確認します。' },
      { title: '要件定義', description: '自動化する範囲、通知条件、確認手順を決定します。' },
      { title: '構築・試行', description: '設定と動作確認を行い、対象業務で試行します。' },
      { title: '運用開始', description: '本番環境で運用し、動作状況と変更事項を確認します。' },
    ],
    techStack: ['Google Drive API', 'Google Sheets API', 'Discord Bot', 'n8n / GCP'],
    media: {
      listImage: 'images/services/ai-cover.webp',
      galleryImages: [
        'images/services/ai-gallery-1.webp',
        'images/services/ai-gallery-2.webp',
      ],
    },
  },
];

const servicePriority = new Map(
  ['music-publishing', 'sns-management', 'ai-marketing-strategy'].map((slug, index) => [slug, index]),
);

export const serviceCatalog: ServiceCatalogItem[] = [...serviceCatalogBase].sort(
  (a, b) =>
    (servicePriority.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
    (servicePriority.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
);

const legacySlugMap: Record<string, string> = {
  'sns-operations': 'sns-management',
  'music-publishing-bgm': 'music-publishing',
  'bgm-production': 'music-publishing',
  'rights-management': 'ai-marketing-strategy',
  'workflow-automation': 'ai-marketing-strategy',
};

export const getServiceBySlug = (slug: string): ServiceCatalogItem | undefined => {
  const slugWithoutHtml = slug.replace(/^\/+|\/+$/g, '').replace(/\.html$/i, '');
  const normalizedSlug = legacySlugMap[slugWithoutHtml] || slugWithoutHtml;
  return serviceCatalog.find((service) => service.slug === normalizedSlug);
};
