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

const serviceCatalogBase: ServiceCatalogItem[] = [
  {
    slug: 'sns-management',
    title: 'YouTube運用・制作進行',
    description:
      '企画表、制作スケジュール、確認手順、公開後の数値記録を一つの流れにまとめます。必要に応じて企画・台本・投稿管理まで担当します。',
    items: ['企画表・台本', '制作スケジュール', '公開前チェック', '月次レポート'],
    icon: Youtube,
    color: 'from-red-500 to-red-600',
    detailLead:
      '企画、台本、編集、確認、公開、振り返りの担当と期限を決めます。チャンネル全体の代行だけでなく、制作進行や月次確認だけのご相談にも対応します。',
    detailSections: [
      {
        title: '日々の運用で担当すること',
        points: [
          '企画候補と公開予定日の管理',
          '台本・編集・サムネイルの確認依頼',
          'タイトル、概要欄、公開設定の最終確認',
          '公開後の再生数、クリック率、視聴維持率の記録',
        ],
      },
      {
        title: 'お渡しする資料',
        points: [
          '企画・公開カレンダー',
          '制作進捗表と担当一覧',
          '公開前チェックリスト',
          '月次数値レポートと次月の確認事項',
        ],
      },
    ],
    caseHighlights: [
      {
        title: '誰が確認するかを決める',
        summary: '工程ごとの担当者と期限を進捗表に記載します。',
      },
      {
        title: '公開後の数字を残す',
        summary: '確認する指標と記録日を決め、次の企画判断に使える形で共有します。',
      },
    ],
    pricing: {
      summary: '投稿本数、現在の制作体制、Regaloが担当する工程を確認し、作業項目ごとにお見積りします。',
      items: [
        '初回整備: チャンネル確認、企画表、進捗表、確認手順',
        '月次対応: 企画進行、投稿管理、数値記録、定例報告',
        '追加対応: 台本、編集ディレクション、サムネイル確認',
      ],
    },
    processSteps: [
      { title: 'チャンネル確認', description: '公開済み動画、制作体制、更新頻度を確認します。' },
      { title: '担当と期限を確定', description: '各工程の担当者、確認日、公開日を進捗表へ記載します。' },
      { title: '制作・公開', description: '決めた手順に沿って確認依頼と公開作業を進めます。' },
      { title: '月次確認', description: '数値を記録し、続ける企画と見直す点を共有します。' },
    ],
    techStack: ['YouTube Analytics', 'Google Sheets', 'Looker Studio', 'Discord'],
  },
  {
    slug: 'music-publishing',
    title: '音楽権利管理・BGM制作',
    description:
      'YouTubeで使う楽曲について、権利者、管理状況、利用先、利用条件を確認し、台帳へまとめます。必要なBGMの制作にも対応します。',
    items: ['権利情報一覧', '利用条件一覧', 'BGM制作', '公開前チェック'],
    icon: Music,
    color: 'from-brand-primary-500 to-brand-primary-600',
    detailLead:
      '楽曲名だけでは判断できない権利者、管理事業者、契約、利用先の情報を確認します。確認できた内容と未確認事項を分け、公開前に見る台帳と手順書としてお渡しします。',
    detailSections: [
      {
        title: '確認する情報',
        points: [
          '楽曲名、作詞者、作曲者、出版社、管理事業者',
          '契約書、許諾書、登録情報、音源の保有先',
          'YouTubeチャンネル、動画種別、利用期間、公開地域',
          'Content ID、収益化、二次利用に関する条件',
        ],
      },
      {
        title: 'お渡しする資料',
        points: [
          '楽曲・権利者・管理状況の一覧',
          '利用先ごとの条件と未確認事項',
          '公開前の確認チェックリスト',
          '追加確認が必要な相手と質問事項',
        ],
      },
    ],
    caseHighlights: [
      {
        title: '確認済みと未確認を分ける',
        summary: '推測で埋めず、根拠資料を確認できた項目だけを台帳へ記録します。',
      },
      {
        title: '利用先ごとに条件を残す',
        summary: '本編、Shorts、広告など、使い方が変わる場合の確認事項を分けます。',
      },
    ],
    pricing: {
      summary: '対象曲数、資料の状態、利用先、BGM制作の有無を確認し、調査・台帳作成・制作を分けてお見積りします。',
      items: [
        '権利確認: 資料確認、登録情報調査、未確認事項の整理',
        '台帳作成: 楽曲一覧、利用条件一覧、公開前チェック',
        'BGM制作: 用途、尺、差分、納品形式を確認して制作',
      ],
    },
    processSteps: [
      { title: '資料を受領', description: '対象楽曲、契約書、登録情報、利用予定を確認します。' },
      { title: '権利情報を照合', description: '資料と公開情報を照合し、不足している項目を切り分けます。' },
      { title: '確認事項を共有', description: '追加で確認する相手と質問内容を一覧でお送りします。' },
      { title: '台帳・手順を納品', description: '確認結果、利用条件、公開前チェックをまとめます。' },
    ],
    techStack: ['Google Sheets', 'Google Drive', '契約管理台帳', '監査チェックリスト'],
  },
  {
    slug: 'ai-marketing-strategy',
    title: '業務改善・自動化支援',
    description:
      '進捗表の転記、定例レポート、確認依頼、期限通知など、繰り返している作業を洗い出し、必要な箇所だけ自動化します。',
    items: ['進捗表の整備', '定例レポート', '確認・期限通知', '操作手順書'],
    icon: Bot,
    color: 'from-cyan-500 to-cyan-600',
    detailLead:
      'Google Drive、Sheets、Discordなど、現在使っている環境を確認します。転記や通知を何でも自動化するのではなく、担当者の確認を残す箇所と機械に任せる箇所を分けます。',
    detailSections: [
      {
        title: '自動化の対象にできる作業',
        points: [
          '進捗シートから定例報告を作る',
          '素材の到着やステータス変更を通知する',
          '締切前の確認依頼と未対応一覧を送る',
          'フォルダ名、ファイル名、保存先をそろえる',
        ],
      },
      {
        title: '納品時に残すもの',
        points: [
          '変更後の業務フロー図',
          '進捗表、通知文、定例レポートの雛形',
          '担当者向けの操作手順書',
          '停止時とエラー時の確認手順',
        ],
      },
    ],
    caseHighlights: [
      {
        title: '転記する回数を減らす',
        summary: '同じ情報を複数の表やチャットへ写している箇所を一つずつ確認します。',
      },
      {
        title: '人が確認する箇所を残す',
        summary: '公開、契約、権利判断など、自動実行しない工程を最初に決めます。',
      },
    ],
    pricing: {
      summary: '対象業務、使用中のサービス、通知先、保守の要否を確認し、調査・構築・手順書を分けてお見積りします。',
      items: [
        '現状確認: 作業手順、使用サービス、権限、例外処理',
        '構築: 進捗表、通知、定例レポート、接続設定',
        '引き継ぎ: 操作手順、停止方法、エラー時の確認手順',
      ],
    },
    processSteps: [
      { title: '実際の手順を確認', description: '担当者、入力元、転記先、締切、例外を確認します。' },
      { title: '試作', description: '対象を一つに絞り、テスト用の表や通知で動作を確認します。' },
      { title: '本番へ反映', description: '権限と停止方法を確認してから使用中の環境へ反映します。' },
      { title: '手順を引き継ぐ', description: '操作、停止、エラー確認を担当者へ共有します。' },
    ],
    techStack: ['Google Drive API', 'Google Sheets API', 'Discord Bot', 'n8n / GCP'],
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
