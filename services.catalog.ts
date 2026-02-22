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
}

export const serviceCatalog: ServiceCatalogItem[] = [
  {
    slug: 'sns-management',
    title: 'SNS管理事業部',
    description:
      'YouTubeを中心に、企画設計から制作進行、公開後の分析改善まで一気通貫で支援します。再現可能な運用体制を構築し、継続的な成果を目指します。',
    items: ['YouTube運用代行', '企画・台本設計', 'KPI分析/改善', '投稿運用オペレーション'],
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    detailLead:
      'SNS管理事業部では、運用担当者依存から脱却し、組織で成果を積み上げるための運用設計を提供します。特にYouTube運用代行では、企画・制作・分析を同一フローで回し、改善サイクルの定着まで伴走します。',
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
  },
  {
    slug: 'music-publishing',
    title: '音楽出版事業部',
    description:
      '音楽出版・BGM運用と受託/買い切りBGM制作を統合し、制作から権利管理、実運用まで一貫して支援します。',
    items: ['音楽出版・権利管理', '受託BGM制作', '買い切り制作', '利用許諾/台帳運用'],
    icon: Music,
    color: 'from-blue-500 to-blue-600',
    detailLead:
      '音楽出版事業部では、BGM制作だけでなく、著作権管理・利用許諾・契約情報の整備まで含めて設計します。権利トラブルを抑えつつ、制作現場で使いやすい形で音楽資産を運用できる体制を提供します。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          'BGMカタログ設計と運用ルール整備',
          '受託/買い切りBGM制作（尺違い・差分対応）',
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
  },
  {
    slug: 'ai-marketing-strategy',
    title: 'AIマーケティング戦略事業部',
    description:
      '権利管理・編集体制構築と業務自動化を統合し、マーケティング運用の品質とスピードを高める体制を構築します。',
    items: ['権利管理体制構築', '編集ガイドライン設計', '業務自動化導入', '運用監査/改善'],
    icon: Bot,
    color: 'from-cyan-500 to-cyan-600',
    detailLead:
      'AIマーケティング戦略事業部では、運用ルール整備と自動化導入を同時に進め、事故リスクを抑えながら実行速度を高めます。手作業依存を減らし、判断と実行が速いマーケティング体制を実現します。',
    detailSections: [
      {
        title: '主な提供内容',
        points: [
          '権利管理ルール・承認フロー・編集ガイドライン整備',
          'Drive/Sheets/Discord連携による進行自動化',
          '定型レポート自動生成と通知フロー設計',
          '運用監査と改善サイクルの定着支援',
        ],
      },
      {
        title: '対応課題',
        points: [
          '公開前確認が属人化し、抜け漏れが発生している',
          '進行共有や報告が手作業で、遅延や漏れが起きる',
          '運用ルールが曖昧でチーム間品質に差がある',
        ],
      },
    ],
    caseHighlights: [
      {
        title: '公開前チェック工程を標準化',
        summary: 'ガイドラインとチェック項目整備で確認漏れを削減。',
      },
      {
        title: '進行通知を自動化し対応速度を向上',
        summary: '連携フロー構築により、共有漏れと報告工数を削減。',
      },
    ],
    pricing: {
      summary: '整備範囲・自動化対象業務・連携システム数に応じて個別見積りします。',
      items: [
        '体制設計: フロー設計、ルール策定、運用ガイドライン整備',
        '自動化構築: 連携設計、ワークフロー実装、監視設計',
        '運用保守: 定期レビュー、改善提案、障害対応',
      ],
    },
    processSteps: [
      { title: '業務診断', description: '現行フローとボトルネックを可視化します。' },
      { title: '設計', description: '運用ルールと自動化要件を統合設計します。' },
      { title: '構築/試行', description: '段階導入で安全に構築し、実運用で検証します。' },
      { title: '本番定着', description: '監視と改善を継続し、品質を安定化します。' },
    ],
    techStack: ['Google Drive API', 'Google Sheets API', 'Discord Bot', 'n8n / GCP'],
  },
];

const legacySlugMap: Record<string, string> = {
  'sns-operations': 'sns-management',
  'music-publishing-bgm': 'music-publishing',
  'bgm-production': 'music-publishing',
  'rights-management': 'ai-marketing-strategy',
  'workflow-automation': 'ai-marketing-strategy',
};

export const getServiceBySlug = (slug: string): ServiceCatalogItem | undefined => {
  const normalizedSlug = legacySlugMap[slug] || slug;
  return serviceCatalog.find((service) => service.slug === normalizedSlug);
};
