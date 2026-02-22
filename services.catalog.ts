import { Bot, FileCheck, Mic2, Music, Youtube } from 'lucide-react';
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
    caseHighlights: [
      {
        title: '運用体制を標準化し、投稿継続率を改善',
        summary: '属人化していた進行を役割分担とチェックフローで再設計し、更新停止リスクを低減。',
      },
      {
        title: 'タイトル/サムネ改善で視聴効率を向上',
        summary: '検証サイクルを導入し、訴求軸の改善を継続。CTR改善に寄与する運用体制を構築。',
      },
    ],
    pricing: {
      summary: '投稿本数・運用範囲・改善頻度に応じて、月額型で個別見積りします。',
      items: [
        '初期設計: 現状分析、KPI設計、運用方針策定',
        '運用代行: 企画進行、投稿管理、数値分析、改善提案',
        'オプション: 撮影/編集ディレクション、追加レポート、研修支援',
      ],
    },
    processSteps: [
      { title: '課題ヒアリング', description: '目標KPI、現状体制、運用課題を整理します。' },
      { title: '運用設計', description: '企画方針、投稿計画、改善指標を設計します。' },
      { title: '実行・検証', description: '実運用を代行しながら数値を観測し、改善します。' },
      { title: '月次レビュー', description: '成果報告と次月アクションを合意し、継続改善します。' },
    ],
    techStack: ['YouTube Analytics', 'Google Sheets', 'Looker Studio', 'Discord'],
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
    caseHighlights: [
      {
        title: '権利確認の属人化を解消',
        summary: '台帳と利用ルールを整備し、公開前チェックを標準化して判断のばらつきを抑制。',
      },
      {
        title: 'BGM利用判断のスピード向上',
        summary: '許諾条件の整理により、制作現場での利用可否確認時間を短縮。',
      },
    ],
    pricing: {
      summary: '管理対象曲数、契約状況、運用体制に応じてお見積りします。',
      items: [
        '初期整備: 権利情報棚卸し、台帳設計、運用ルール作成',
        '運用支援: 登録更新、利用許諾整理、定期監査',
        'オプション: チーム向け運用研修、監査レポート作成',
      ],
    },
    processSteps: [
      { title: '現状棚卸し', description: '既存曲・契約・許諾状況を確認します。' },
      { title: '台帳/ルール設計', description: '運用しやすい管理フォーマットと判断基準を定義します。' },
      { title: '運用導入', description: '現場フローに合わせて承認・確認手順を実装します。' },
      { title: '定着支援', description: '運用レビューと改善で継続的に精度を高めます。' },
    ],
    techStack: ['Google Sheets', 'Google Drive', '契約管理台帳', '監査チェックリスト'],
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
    caseHighlights: [
      {
        title: '動画用途に合わせた複数尺で納品',
        summary: '本編・Shorts向けに尺違いを用意し、編集現場での再利用性を向上。',
      },
      {
        title: '買い切り前提で運用負荷を低減',
        summary: '利用範囲を事前定義し、公開後の確認作業を最小化。',
      },
    ],
    pricing: {
      summary: '制作曲数、尺バリエーション、利用範囲に応じて個別見積りします。',
      items: [
        '基本制作: 1曲単位のオリジナルBGM制作',
        '差分対応: 尺違い、ループ、テンポ違いの追加制作',
        '契約整備: 利用範囲・納品条件の文書化',
      ],
    },
    processSteps: [
      { title: '要件定義', description: '用途、雰囲気、利用範囲、納期を確定します。' },
      { title: 'デモ制作', description: '方向性確認用デモを作成し、認識を合わせます。' },
      { title: '本制作/調整', description: '本制作と修正対応を行い、最終音源を仕上げます。' },
      { title: '納品', description: '実運用しやすい形式で音源と関連情報を納品します。' },
    ],
    techStack: ['DAW制作環境', 'WAV/MP3納品', 'Drive共有', 'メタデータ管理'],
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
    caseHighlights: [
      {
        title: '公開前チェック工程を標準化',
        summary: 'チェック項目の明文化により、確認漏れと差し戻しを削減。',
      },
      {
        title: '新人でも運用可能な体制へ',
        summary: '判断基準と承認フローを整備し、引き継ぎコストを抑制。',
      },
    ],
    pricing: {
      summary: '対象チーム規模、整備範囲、監査頻度に応じてお見積りします。',
      items: [
        '体制構築: フロー設計、ルール策定、台帳整備',
        '運用監査: 定期レビュー、改善提案、運用品質チェック',
        'オプション: 社内ガイドライン文書化、運用研修',
      ],
    },
    processSteps: [
      { title: '現場把握', description: '実際の制作フローと課題をヒアリングします。' },
      { title: 'ルール設計', description: '判断基準、承認経路、管理台帳を設計します。' },
      { title: '試行運用', description: '一部運用で検証し、現場に合わせて調整します。' },
      { title: '全体展開', description: '運用定着と定期監査で品質を維持します。' },
    ],
    techStack: ['管理台帳', '承認フロー設計', '運用ガイドライン', '監査チェック'],
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
    caseHighlights: [
      {
        title: '進行通知の自動化で確認漏れを削減',
        summary: 'Drive更新とDiscord通知を連携し、手動共有の漏れを抑制。',
      },
      {
        title: 'レポート作成工数を削減',
        summary: '定型レポート自動生成により、集計・報告作業を効率化。',
      },
    ],
    pricing: {
      summary: '自動化対象業務の範囲、連携システム数、保守要件に応じて個別見積りします。',
      items: [
        '設計/実装: 業務整理、連携設計、ワークフロー構築',
        '運用保守: 障害対応、改善提案、ログ監視',
        'オプション: 追加連携、管理画面整備、運用ドキュメント作成',
      ],
    },
    processSteps: [
      { title: '業務診断', description: '手作業工程を洗い出し、自動化優先度を決定します。' },
      { title: '連携設計', description: 'Drive/Sheets/Discord等の連携仕様を定義します。' },
      { title: '構築/テスト', description: '段階導入で安全に自動化し、テスト運用します。' },
      { title: '本番運用', description: '監視と改善を行い、運用品質を安定化します。' },
    ],
    techStack: ['Google Drive API', 'Google Sheets API', 'Discord Bot', 'n8n / GCP'],
  },
];

export const getServiceBySlug = (slug: string): ServiceCatalogItem | undefined =>
  serviceCatalog.find((service) => service.slug === slug);
