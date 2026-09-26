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
      'YouTubeを中心に、動画企画、制作スケジュール、投稿設定、公開後の数値確認を担当します。',
    items: ['チャンネル運用', '企画・台本作成', '投稿予約・公開管理', '公開後の数値確認'],
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    detailLead:
      'YouTubeの企画から投稿、公開後の数値確認まで対応します。制作工程ごとの担当と承認方法を決め、投稿計画と報告内容を文書に残します。',
    detailSummary:
      '既存のチャンネル、投稿本数、社内外の担当者を確認したうえで、受託する工程をお見積りに明記します。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          '動画の企画、台本作成、制作担当への依頼',
          'タイトル・サムネイルの確認と記録',
          '投稿予定と承認状況の管理',
          '公開後の数値集計と定例報告',
        ],
      },
      {
        title: '対応課題',
        points: [
          '企画から公開までの担当と承認者を決めたい',
          '投稿結果を継続して記録・確認したい',
          '制作会社との連絡を一つの進行表にまとめたい',
        ],
      },
    ],
    caseHighlights: [
      {
        title: '企画から投稿までの担当を明記',
        summary: '投稿計画表に担当者、確認者、締切を記載。',
      },
      {
        title: '公開後の数値を定例レポートに記録',
        summary: '確認する指標と報告日を決め、投稿ごとの結果を記録。',
      },
    ],
    pricing: {
      summary: '投稿本数、運用範囲、確認頻度を伺い、作業内容と費用をお見積りで提示します。',
      items: [
        '開始時: チャンネルの現状確認、投稿計画、担当・承認手順の作成',
        '月次運用: 企画進行、投稿管理、数値集計、定例報告',
        '追加業務: 撮影・編集の進行管理、追加レポート、担当者向け説明',
      ],
    },
    processSteps: [
      { title: '現状確認', description: '運用状況、目標、担当体制、確認指標を確認します。' },
      { title: '運用手順の作成', description: '企画方針、制作手順、投稿計画を作成します。' },
      { title: '運用・数値確認', description: '投稿管理と公開後の数値確認を行います。' },
      { title: '定例報告', description: '結果と次回の対応内容を報告します。' },
    ],
    audience: [
      'YouTubeの企画、制作、投稿を複数人で担当している企業',
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
      'BGMの制作と、楽曲・契約情報の台帳管理を行います。利用先ごとの確認項目も文書化します。',
    items: ['楽曲・契約情報の台帳', '用途別BGMの制作', '利用条件の確認', '公開前チェック手順'],
    icon: Music,
    color: 'from-brand-primary-500 to-brand-primary-600',
    detailLead:
      'YouTubeなどで使うBGMの権利者、契約、利用条件を台帳に記録します。動画公開前に誰が何を確認するかを決め、必要に応じて用途別のBGMも制作します。',
    detailSummary:
      '対象楽曲、利用先、契約資料を確認し、台帳に記載する項目と確認担当を決めます。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          '楽曲ごとの権利者、契約、利用先を台帳に記録',
          '本編・Shortsなど用途に応じたBGMの制作',
          '利用条件を確認する項目と担当を設定',
          '公開前チェック表と更新手順の作成',
        ],
      },
      {
        title: '対応課題',
        points: [
          '楽曲と契約の情報が別々の場所に保管されている',
          '動画ごとの利用条件を確認する手順が決まっていない',
          '制作したBGMの用途や版違いを一覧で確認できない',
        ],
      },
    ],
    caseHighlights: [
      {
        title: '公開前の権利確認手順を整備',
        summary: '楽曲・契約情報の台帳と公開前チェック表を作成。',
      },
      {
        title: '用途別のBGMを納品',
        summary: '本編、Shortsなど用途に応じた尺と形式で納品。',
      },
    ],
    pricing: {
      summary: '制作曲数、管理対象曲数、利用用途を伺い、作業内容と費用をお見積りで提示します。',
      items: [
        '初期整備: 対象楽曲と契約資料の確認、台帳・チェック表の作成',
        'BGM制作: 用途、長さ、納品形式を確認して制作',
        '継続管理: 台帳の更新、利用条件と登録情報の定期確認',
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
      '現在使っているツールを確認し、レポート集計、進捗共有、確認依頼を自動化します。',
    items: ['制作工程・担当の整理', 'レポートの自動集計', '確認依頼の通知設定', '運用手順書の作成'],
    icon: Bot,
    color: 'from-cyan-500 to-cyan-600',
    detailLead:
      'Google DriveやGoogle Sheetsなど、現在使っているツールを確認します。レポート集計、進捗更新、確認依頼のうち、自動化する作業と人が確認する作業を決めます。',
    detailSummary:
      '対象業務、通知先、例外時の対応を決め、小さな範囲で動作確認してから運用を始めます。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          '週次・月次レポートの集計と共有',
          'Drive・Sheets・Discord間の進捗通知',
          '締切の通知と確認依頼の送信',
          '運用開始後の点検項目と変更手順の作成',
        ],
      },
      {
        title: '対応課題',
        points: [
          '同じ数値を毎週手作業で転記している',
          '素材の保存先と進捗状況が別々の場所にある',
          '確認依頼の送信や催促を手作業で行っている',
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
        '開始時: 現在の作業と利用中のツールの確認',
        '構築: レポート集計、進捗通知、確認依頼の設定',
        '運用後: 動作確認、変更対応、手順書の更新',
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
