import { FolderKanban, Music, Youtube } from 'lucide-react';
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

export const serviceCatalog: ServiceCatalogItem[] = [
  {
    slug: 'sns-management',
    title: 'YouTube/SNS運用支援',
    description:
      'YouTubeを中心に、企画設計から制作進行、公開後の分析改善まで一気通貫で支援します。再現可能な運用体制を構築し、継続的な成果を目指します。',
    items: ['YouTube運用代行', '企画・台本設計', 'KPI分析/改善', '投稿運用オペレーション'],
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    detailLead:
      'YouTube/SNS運用支援では、運用担当者依存から脱却し、組織で成果を積み上げるための運用設計を提供します。特にYouTube運用では、企画・制作・分析を同一フローで回し、改善サイクルの定着まで伴走します。',
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
          '更新停止や運用品質のばらつきを解消したい',
          '再生回数・登録者数の伸び悩みを改善したい',
          '担当者ごとの属人化を減らして体制化したい',
        ],
      },
    ],
    caseHighlights: [
      {
        title: '投稿継続率を改善し、運用停止リスクを低減',
        summary: '企画/制作/分析の役割を明確化し、運用サイクルを標準化。',
      },
      {
        title: 'サムネ・タイトル検証で視聴効率を向上',
        summary: '検証フロー導入により、改善施策の実行速度と再現性を向上。',
      },
    ],
    pricing: {
      summary: '投稿本数・運用範囲・改善頻度に応じた月額型で個別見積りします。',
      items: [
        '初期設計: 現状分析、KPI設計、運用方針策定',
        '運用代行: 企画進行、投稿管理、数値分析、改善提案',
        'オプション: 撮影/編集ディレクション、追加レポート、研修支援',
      ],
    },
    processSteps: [
      { title: '現状ヒアリング', description: '目標と運用課題を整理し、優先指標を定義します。' },
      { title: '運用設計', description: '企画方針・制作フロー・投稿計画を設計します。' },
      { title: '実行/検証', description: '実運用を進めながら数値を分析し、改善を回します。' },
      { title: '月次改善', description: '成果共有と次月アクション合意を行い継続運用します。' },
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
    title: '音楽出版・BGM権利管理',
    description:
      '音楽著作権の管理を行い、制作から権利管理、実運用まで一貫して支援します。',
    items: ['音楽著作権管理', 'BGM制作', '利用許諾/台帳運用', '運用フロー整備'],
    icon: Music,
    color: 'from-brand-primary-500 to-brand-primary-600',
    detailLead:
      '音楽出版・BGM権利管理では、BGM制作だけでなく、著作権管理・利用許諾・契約情報の整備まで含めて設計します。権利トラブルを抑えつつ、制作現場で使いやすい形で音楽資産を運用できる体制を提供します。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          'BGMカタログ設計と運用ルール整備',
          'BGM制作（尺違い・差分対応）',
          '権利情報・契約情報の台帳整備',
          '利用許諾フローの可視化と運用定着支援',
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
        title: '公開前の権利確認を標準化',
        summary: '台帳と利用ルールを整備し、判断のばらつきを抑制。',
      },
      {
        title: '用途別BGM納品で再利用性を向上',
        summary: '本編/Shorts向けなど複数尺で納品し、現場運用の負荷を削減。',
      },
    ],
    pricing: {
      summary: '制作曲数・運用範囲・管理対象曲数に応じて個別見積りします。',
      items: [
        '初期整備: 権利情報棚卸し、台帳設計、運用ルール作成',
        '制作支援: オリジナルBGM制作、差分制作、納品最適化',
        '運用支援: 許諾整理、登録更新、定期監査',
      ],
    },
    processSteps: [
      { title: '要件整理', description: '利用用途、制作条件、管理課題を整理します。' },
      { title: '設計/制作', description: '制作・権利管理・運用フローを同時に設計します。' },
      { title: '導入運用', description: '台帳運用と利用許諾フローを現場に導入します。' },
      { title: '定着改善', description: 'レビューを通じて運用品質を継続的に改善します。' },
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
    slug: 'production-workflow',
    title: '制作進行・業務整理支援',
    description:
      '制作進行、素材共有、確認依頼、レポート整備を見直し、担当者が変わっても追える運用手順を整えます。',
    items: ['進行フロー設計', 'レポート整備', '通知・共有設計', '運用手順の見直し'],
    icon: FolderKanban,
    color: 'from-slate-600 to-slate-700',
    detailLead:
      '制作進行・業務整理支援では、週次レポート、素材共有、確認依頼、通知の流れを整理し、実行漏れや確認遅れを減らします。必要な場合だけツール連携を使い、既存運用を壊さずに担当者が追いやすい体制へ整えます。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          '週次/月次レポートの作成手順整備',
          'Drive/Sheets/Discord連携による進行共有',
          '定例報告・リマインド・確認フローの整理',
          '運用監査と改善サイクルの定着支援',
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
        title: '定例レポートの作成手順を整備',
        summary: '集計と共有の手順を揃え、改善判断までの時間を短縮。',
      },
      {
        title: '進行通知と確認依頼を整理',
        summary: '共有場所と通知ルールを揃え、確認漏れと報告工数を削減。',
      },
    ],
    pricing: {
      summary: '整備範囲・対象業務・連携システム数に応じて個別見積りします。',
      items: [
        '設計: 現行フロー整理、KPI定義、共有設計',
        '運用整備: レポート整備、通知導線、ワークフロー実装',
        '運用改善: 定期レビュー、改善提案、保守対応',
      ],
    },
    processSteps: [
      { title: '業務診断', description: '現行フローとボトルネックを可視化します。' },
      { title: '設計', description: '運用ルールとツール連携要件を統合設計します。' },
      { title: '構築/試行', description: '段階導入で安全に構築し、実運用で検証します。' },
      { title: '本番定着', description: '監視と改善を継続し、品質を安定化します。' },
    ],
    techStack: ['Google Drive', 'Google Sheets', 'Discord', '必要に応じたツール連携'],
    media: {
      listImage: 'images/services/workflow-cover.webp',
      galleryImages: [
        'images/services/workflow-gallery-1.webp',
        'images/services/workflow-gallery-2.webp',
      ],
    },
  },
];

const legacySlugMap: Record<string, string> = {
  'sns-operations': 'sns-management',
  'music-publishing-bgm': 'music-publishing',
  'bgm-production': 'music-publishing',
  'ai-marketing-strategy': 'production-workflow',
  'rights-management': 'production-workflow',
  'workflow-automation': 'production-workflow',
};

export const getServiceBySlug = (slug: string): ServiceCatalogItem | undefined => {
  const slugWithoutHtml = slug.replace(/\.html$/i, '');
  const normalizedSlug = legacySlugMap[slugWithoutHtml] || slugWithoutHtml;
  return serviceCatalog.find((service) => service.slug === normalizedSlug);
};
