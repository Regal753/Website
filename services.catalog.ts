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

interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceCatalogItem {
  slug: string;
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  color: string;
  detailLead: string;
  detailSummary: string;
  detailSections: ServiceDetailSection[];
  caseHighlights: ServiceCaseItem[];
  pricing: ServicePricingModel;
  processSteps: ServiceProcessStep[];
  audience: string[];
  intakeItems: string[];
  boundaries: string[];
  faqs: ServiceFaqItem[];
  techStack: string[];
  media: ServiceMediaAssets;
}

const serviceCatalogBase: ServiceCatalogItem[] = [
  {
    slug: 'sns-management',
    title: 'YouTube・SNS運用',
    description:
      'YouTubeを中心に、企画、制作進行、投稿管理、公開後の数値確認に対応します。',
    items: ['YouTube運用代行', '企画・台本設計', 'KPI分析/改善', '投稿運用オペレーション'],
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    detailLead:
      'YouTubeを中心に、企画、制作進行、投稿管理、公開後の数値確認を支援します。運用手順と担当範囲を明文化し、継続できる運用体制を整備します。',
    detailSummary:
      '対象チャンネルと制作体制を確認し、企画、制作、投稿、公開後の数値確認について担当範囲を整理します。',
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
    audience: [
      'YouTube運用が担当者個人に依存している企業',
      '企画から公開後の数値確認まで手順を統一したい企業',
      '社内担当者と外部制作者の役割を明確にしたい企業',
    ],
    intakeItems: [
      '対象チャンネルと現在の投稿状況',
      '目標、確認している指標、希望する投稿本数',
      '社内外の担当者と現在の制作手順',
    ],
    boundaries: [
      '対応範囲と確認頻度は、運用状況を確認したうえで個別に定めます。',
      '再生回数、登録者数その他の成果を保証するものではありません。',
    ],
    faqs: [
      {
        question: 'YouTube以外のSNSにも対応できますか？',
        answer: 'YouTubeを中心に対応しています。その他のSNSは、現在の運用状況、投稿本数、必要な制作工程を確認したうえで個別にご案内します。',
      },
      {
        question: '社内担当者や既存の制作会社と一緒に進められますか？',
        answer: '可能です。企画、制作、確認、投稿、数値確認の担当範囲と承認手順を整理し、既存体制に合わせて進行方法を決めます。',
      },
      {
        question: '報告内容と頻度はどのように決まりますか？',
        answer: '確認する指標、投稿本数、定例会の有無を伺い、レポート項目と報告頻度をお見積り時に提示します。',
      },
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
    title: '音楽出版・権利情報管理',
    description:
      'BGM制作、権利情報・契約情報の整理、利用条件の確認手順、管理台帳の整備に対応します。',
    items: ['権利情報の整理', 'BGM制作', '利用条件/台帳運用', '確認フロー整備'],
    icon: Music,
    color: 'from-brand-primary-500 to-brand-primary-600',
    detailLead:
      'YouTube等で使用する楽曲について、権利者、契約、利用条件の情報を整理し、公開前に確認する手順と管理台帳を整備します。',
    detailSummary:
      '対象楽曲と契約状況を確認し、管理する情報と公開前の確認手順を整理します。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          'BGMカタログ設計と運用ルール整備',
          'BGM制作（尺違い・差分対応）',
          '権利情報・契約情報の台帳整備',
          '利用条件を確認する手順と担当を明文化',
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
        '運用支援: 許諾情報の整理、登録情報の更新、定期確認',
      ],
    },
    processSteps: [
      { title: '要件確認', description: '利用用途、制作条件、管理対象を確認します。' },
      { title: 'BGM制作・管理設計', description: 'BGM制作と権利情報を確認する手順を作成します。' },
      { title: '運用開始', description: '管理台帳と利用条件の確認手順を導入します。' },
      { title: '定期確認', description: '登録情報、利用状況、管理台帳を定期的に確認します。' },
    ],
    audience: [
      'YouTube等でBGMを利用する法人・制作会社',
      '楽曲、権利者、契約、利用条件の情報が分散している企業',
      '公開前の確認手順と管理責任を明確にしたい企業',
    ],
    intakeItems: [
      '対象楽曲、利用先、利用期間が分かる資料',
      '権利者、管理団体、既存契約に関する資料',
      '現在の確認手順と管理台帳の有無',
    ],
    boundaries: [
      'Regaloは、権利情報、契約情報、確認手順の整理を支援します。',
      '利用許諾の可否や使用料は、権利者、管理団体等の判断に従います。',
      '個別案件の法的判断や権利侵害がないことの保証は行いません。',
    ],
    faqs: [
      {
        question: 'Regaloが楽曲の利用許諾を判断しますか？',
        answer: 'Regaloは権利者、契約、利用条件の情報と確認手順を整理します。利用許諾の可否や使用料は、権利者、管理団体等の判断に従います。',
      },
      {
        question: '資料が整理できていなくても相談できますか？',
        answer: '可能です。対象楽曲、利用先、既存契約、現在の確認方法について、分かる範囲から確認し、追加で必要な情報を整理します。',
      },
      {
        question: '契約書や管理台帳はどのように共有しますか？',
        answer: '初回のお問い合わせでは概要をお送りください。契約書や管理台帳等の資料は、返信後に共有方法をご案内します。',
      },
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
    slug: 'workflow-automation',
    title: '業務自動化・制作進行支援',
    description:
      'レポート作成、進行共有、通知、確認依頼の自動化に対応します。',
    items: ['進行フロー設計', 'レポート自動化', '通知・共有設計', '運用監査/改善'],
    icon: Bot,
    color: 'from-cyan-500 to-cyan-600',
    detailLead:
      '業務自動化・制作進行支援では、週次レポート、進行共有、通知、確認依頼の自動化に対応します。現在の運用手順と利用中のシステムを確認し、自動化する範囲を決定します。',
    detailSummary:
      '現在の作業手順と利用中のシステムを確認し、自動化する作業と人が確認する工程を分けます。',
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
    audience: [
      '進捗、素材、確認依頼が複数のツールに分散している企業',
      'レポート作成や定例連絡の手作業を減らしたい企業',
      '小規模な業務から段階的に自動化したい企業',
    ],
    intakeItems: [
      '現在の作業手順と利用中のシステム',
      '自動化したい作業、発生頻度、担当者',
      '通知先、確認者、例外時の対応方法',
    ],
    boundaries: [
      '既存システムの仕様と権限を確認し、自動化できる範囲を個別に定めます。',
      '本番導入前に試行と動作確認を行い、変更手順を文書化します。',
    ],
    faqs: [
      {
        question: '現在使っているツールを変更する必要がありますか？',
        answer: '必須ではありません。現在の作業手順と権限を確認し、既存ツールを活用できる範囲と変更が必要な範囲を分けてご案内します。',
      },
      {
        question: '一部の作業だけでも自動化できますか？',
        answer: '可能です。定例レポート、通知、確認依頼など対象を絞って試行し、動作確認後に本番運用へ移します。',
      },
      {
        question: '導入後の変更や保守にも対応できますか？',
        answer: '対応できます。対象システム、確認頻度、変更対応の範囲を確認し、運用後の対応内容をお見積り時に提示します。',
      },
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
  ['music-publishing', 'sns-management', 'workflow-automation'].map((slug, index) => [slug, index]),
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
  'rights-management': 'music-publishing',
  'ai-marketing-strategy': 'workflow-automation',
};

export const getServiceBySlug = (slug: string): ServiceCatalogItem | undefined => {
  const slugWithoutHtml = slug.replace(/^\/+|\/+$/g, '').replace(/\.html$/i, '');
  const normalizedSlug = legacySlugMap[slugWithoutHtml] || slugWithoutHtml;
  return serviceCatalog.find((service) => service.slug === normalizedSlug);
};
