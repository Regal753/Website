import { Bot, FileCheck, Mic2, Music, Youtube } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceDetailSection {
  title: string;
  points: string[];
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
}

export const serviceCatalog: ServiceCatalogItem[] = [
  {
    slug: 'sns-operations',
    title: 'SNS運用事業部',
    description:
      '企画と運用設計で、改善が回る体制へ。企画・制作・分析を分断せず、チームで再現できる運用に整えます。',
    items: ['企画設計', 'KPI設計', 'サムネ・タイトル検証', '編集ガイドライン'],
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    detailLead:
      'YouTube運用代行を中心に、企画設計から制作進行、分析改善まで一気通貫で支援します。担当者依存を減らし、継続的に成果が積み上がる運用体制を構築します。',
    detailSections: [
      {
        title: 'YouTube運用代行の主な対応内容',
        points: [
          '投稿企画・台本設計・撮影/編集ディレクション',
          'サムネイル・タイトルの検証と改善提案',
          '投稿スケジュール管理と運用オペレーション代行',
          '数値分析レポートと次月アクションの提案',
        ],
      },
      {
        title: 'このような課題に対応します',
        points: [
          '更新が止まりがちで、担当者ごとに品質がぶれる',
          '再生回数・登録者数が伸び悩み、打ち手の精度が上がらない',
          '社内で企画・制作・分析が分断され、改善が回らない',
        ],
      },
      {
        title: '導入後の進め方',
        points: [
          '現状ヒアリングとKPI設定',
          '30日単位での運用設計・制作・検証',
          '月次レビューで改善案を優先度順に実装',
        ],
      },
    ],
  },
  {
    slug: 'music-publishing-bgm',
    title: '音楽出版・BGM運用',
    description:
      '権利がクリアなBGM運用。BGMの制作から台帳・契約・登録まで、実運用で困らない形で整備します。',
    items: ['カタログ運用', '権利登録・台帳管理', '利用許諾の整理', '運用ルール整備'],
    icon: Music,
    color: 'from-blue-500 to-blue-600',
    detailLead:
      'BGMの制作だけでなく、著作権や利用許諾の管理まで含めて設計します。利用範囲の明確化と台帳運用により、トラブルのない音楽活用を実現します。',
    detailSections: [
      {
        title: '対応範囲',
        points: [
          '配信/動画用途に合わせたBGMカタログ設計',
          '権利情報・契約情報の整備と更新運用',
          '利用許諾フローの可視化と担当者教育',
        ],
      },
      {
        title: '成果イメージ',
        points: [
          '権利確認の手戻り削減',
          '公開前チェックの標準化',
          'BGM利用判断のスピード向上',
        ],
      },
    ],
  },
  {
    slug: 'bgm-production',
    title: '受託・買い切りBGM制作',
    description:
      '用途に合わせた「使える」楽曲制作。尺・雰囲気・利用範囲を前提に、実運用しやすい形式で納品します。',
    items: ['YouTube/配信向け', 'ループ・差分制作', '契約整備', '納品形式最適化'],
    icon: Mic2,
    color: 'from-indigo-500 to-indigo-600',
    detailLead:
      '動画や配信の現場でそのまま使えることを重視したBGM制作を行います。用途と運用フローに合わせて、差分やループ素材も含めて納品します。',
    detailSections: [
      {
        title: '制作メニュー',
        points: [
          'オリジナルBGM制作（用途別）',
          '尺違い・テンポ違いなどの差分制作',
          'ループ仕様・ジングル仕様への最適化',
        ],
      },
      {
        title: '納品仕様',
        points: [
          '編集しやすいファイル形式で納品',
          '用途別フォルダ構成で再利用しやすく管理',
          '契約条件・利用範囲を文書化して共有',
        ],
      },
    ],
  },
  {
    slug: 'rights-management',
    title: '権利管理・編集体制構築',
    description:
      'トラブルを起こさない仕組みづくり。編集チームが迷わないルールとチェックポイントを整備し、事故率を下げます。',
    items: ['使用可否ルール', '素材・契約台帳', '監査ポイント', 'ガイドライン整備'],
    icon: FileCheck,
    color: 'from-emerald-500 to-emerald-600',
    detailLead:
      '素材利用の判断基準と承認フローを整備し、編集現場の迷いを減らします。継続運用で抜け漏れが起きにくい体制へ改善します。',
    detailSections: [
      {
        title: '整備する内容',
        points: [
          '素材利用ルールと承認フローの定義',
          '契約・権利情報の台帳化',
          '公開前チェックリストの運用設計',
        ],
      },
      {
        title: '導入効果',
        points: [
          '確認工数の削減',
          '確認漏れ・誤利用リスクの低減',
          '新人でも対応できる運用標準化',
        ],
      },
    ],
  },
  {
    slug: 'workflow-automation',
    title: 'ワークフロー自動化・ツール構築',
    description:
      'Drive × Sheets × Discord で制作を自動化。素材共有・進行管理・通知・台帳更新など、手作業を減らし品質を安定させます。',
    items: ['Drive/Sheets自動化', 'Discord Bot', 'n8n連携', 'GCP運用'],
    icon: Bot,
    color: 'from-cyan-500 to-cyan-600',
    detailLead:
      '手作業で行っていた進行管理・通知・台帳更新を自動化し、制作フローの速度と再現性を引き上げます。既存運用を活かしながら段階導入できます。',
    detailSections: [
      {
        title: '自動化対象の例',
        points: [
          '素材アップロード時の通知と進行更新',
          'タスク状態変更の自動反映',
          '定期レポートの自動生成・配信',
        ],
      },
      {
        title: '導入ステップ',
        points: [
          '現状業務の棚卸し',
          '優先度の高い業務から段階自動化',
          '運用監視と改善サイクルの継続',
        ],
      },
    ],
  },
];

export const getServiceBySlug = (slug: string): ServiceCatalogItem | undefined =>
  serviceCatalog.find((service) => service.slug === slug);
