import React, { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import NotFoundPage from './NotFoundPage';
import { getServiceBySlug, serviceCatalog } from '../services.catalog';
import { siteConfig } from '../site.config';
import { trackEvent } from '../utils/analytics';

type WorkPanelProps = {
  slug: string;
};

const MusicWorkPanel: React.FC = () => {
  const checks = [
    ['01', '楽曲', '曲名・音源・用途を確認'],
    ['02', '権利情報', '作詞者・作曲者・出版社・管理事業者を照合'],
    ['03', '利用条件', '利用先・期間・地域・収益化条件を記録'],
    ['04', '公開前確認', '未確認事項と確認先を一覧化'],
  ] as const;

  return (
    <section aria-labelledby="music-work-title" className="border-y border-slate-300 bg-amber-50/45 px-5 py-8 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
        <div>
          <p className="text-sm font-semibold text-amber-900">権利確認の順番</p>
          <h2 id="music-work-title" className="mt-2 text-2xl font-semibold text-brand-ink">楽曲名だけで利用可否を決めません</h2>
          <ol className="mt-6 border-t-2 border-amber-900">
            {checks.map(([number, title, description]) => (
              <li key={number} className="grid gap-2 border-b border-amber-200 py-4 sm:grid-cols-[44px_150px_minmax(0,1fr)]">
                <span className="text-xs font-semibold text-amber-900">{number}</span>
                <span className="font-semibold text-slate-900">{title}</span>
                <span className="text-sm leading-6 text-slate-600">{description}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="border-l-4 border-amber-800 bg-white px-5 py-6">
          <p className="text-xs font-semibold text-slate-500">納品物の例</p>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-800">
            <li>楽曲・権利者一覧</li>
            <li>利用条件・未確認事項一覧</li>
            <li>公開前チェックリスト</li>
            <li>追加確認先と質問事項</li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

const YoutubeWorkPanel: React.FC = () => {
  const stages = [
    { name: '企画', record: '企画表・公開予定日', check: '狙う視聴者と動画の要点' },
    { name: '制作', record: '台本・素材・編集進捗', check: '担当者と確認期限' },
    { name: '公開', record: 'タイトル・概要欄・設定', check: '公開前チェック' },
    { name: '振り返り', record: '再生数・CTR・維持率', check: '次月に続ける内容' },
  ] as const;

  return (
    <section aria-labelledby="youtube-work-title" className="border-y border-slate-300 bg-rose-50/35 px-5 py-8 sm:px-8">
      <p className="text-sm font-semibold text-rose-800">一本の動画が公開されるまで</p>
      <h2 id="youtube-work-title" className="mt-2 text-2xl font-semibold text-brand-ink">担当者と確認日を工程ごとに残します</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-y-2 border-slate-900 text-xs text-slate-500">
              <th className="py-3 pr-5 font-semibold">工程</th>
              <th className="py-3 pr-5 font-semibold">記録するもの</th>
              <th className="py-3 font-semibold">確認すること</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((stage) => (
              <tr key={stage.name} className="border-b border-rose-200">
                <th className="py-4 pr-5 font-semibold text-slate-900">{stage.name}</th>
                <td className="py-4 pr-5 text-sm text-slate-700">{stage.record}</td>
                <td className="py-4 text-sm text-slate-600">{stage.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const AutomationWorkPanel: React.FC = () => (
  <section aria-labelledby="automation-work-title" className="border-y border-slate-300 bg-cyan-50/35 px-5 py-8 sm:px-8">
    <p className="text-sm font-semibold text-cyan-900">自動化する範囲</p>
    <h2 id="automation-work-title" className="mt-2 text-2xl font-semibold text-brand-ink">入力・処理・通知を分けて確認します</h2>
    <div className="mt-7 grid gap-0 border-y-2 border-slate-900 md:grid-cols-3">
      {[
        ['入力', 'Drive / Sheets', '素材、担当者、期限、ステータス'],
        ['処理', '決めた条件だけ実行', '転記、集計、期限判定、レポート作成'],
        ['通知・出力', 'Discord / メール / 表', '確認依頼、未対応一覧、定例報告'],
      ].map(([label, title, description], index) => (
        <div key={label} className={`py-5 md:px-6 ${index < 2 ? 'border-b border-slate-300 md:border-b-0 md:border-r' : ''}`}>
          <p className="text-xs font-semibold text-cyan-900">{label}</p>
          <h3 className="mt-2 font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      ))}
    </div>
    <p className="mt-5 border-l-4 border-cyan-800 pl-4 text-sm leading-7 text-slate-700">
      公開、契約、権利判断など、人の確認が必要な操作は自動実行の対象から外します。
    </p>
  </section>
);

const WorkPanel: React.FC<WorkPanelProps> = ({ slug }) => {
  if (slug === 'music-publishing') return <MusicWorkPanel />;
  if (slug === 'sns-management') return <YoutubeWorkPanel />;
  return <AutomationWorkPanel />;
};

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    if (slug && service) {
      const canonicalPath = `/services/${service.slug}/`;
      if (location.pathname !== canonicalPath) navigate(canonicalPath, { replace: true });
    }
  }, [slug, service, location.pathname, navigate]);

  useEffect(() => {
    if (service?.slug) trackEvent('service_detail_view', { service: service.slug });
  }, [service?.slug]);

  const otherServices = useMemo(
    () => (service ? serviceCatalog.filter((item) => item.slug !== service.slug) : []),
    [service],
  );
  const relatedCase = useMemo(
    () => (service ? siteConfig.cases.find((item) => item.serviceSlug === service.slug) : undefined),
    [service],
  );

  if (!service) return <NotFoundPage />;

  const Icon = service.icon;
  const phoneDisplay = siteConfig.companyProfile.phone || '';
  const phoneHref = phoneDisplay.replace(/[^\d+]/g, '');

  return (
    <section className="bg-white pb-20 pt-28 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700 hover:text-brand-primary-800">
          <ArrowLeft className="h-4 w-4" />
          トップへ戻る
        </Link>

        <header className="mt-8 grid gap-8 border-b-2 border-slate-900 pb-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3 text-sm font-semibold text-brand-primary-700">
              <Icon className="h-5 w-5" />
              {siteConfig.positioning.serviceDetailEyebrow}
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-brand-ink md:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">{service.detailLead}</p>
          </div>
          <dl className="border-t border-slate-300 text-sm">
            <div className="flex justify-between gap-5 border-b border-slate-300 py-3">
              <dt className="text-slate-500">返信目安</dt>
              <dd className="font-semibold text-slate-900">通常1営業日以内</dd>
            </div>
            <div className="flex justify-between gap-5 border-b border-slate-300 py-3">
              <dt className="text-slate-500">拠点</dt>
              <dd className="font-semibold text-slate-900">京都府長岡京市</dd>
            </div>
            <div className="flex justify-between gap-5 border-b border-slate-300 py-3">
              <dt className="text-slate-500">費用</dt>
              <dd className="font-semibold text-slate-900">作業前に個別見積り</dd>
            </div>
          </dl>
        </header>

        <div className="mt-10">
          <WorkPanel slug={service.slug} />
        </div>

        <section className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {service.detailSections.map((section) => (
            <div key={section.title}>
              <h2 className="border-b-2 border-slate-900 pb-3 text-xl font-semibold text-brand-ink">{section.title}</h2>
              <ul className="divide-y divide-slate-200">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 py-4 text-sm leading-7 text-slate-700">
                    <Check className="mt-1.5 h-4 w-4 shrink-0 text-brand-primary-700" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {relatedCase && (
          <section className="mt-14 border-y border-slate-300 py-9">
            <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
              <div>
                <p className="text-sm font-semibold text-brand-primary-700">よくあるご相談</p>
                <h2 className="mt-2 text-2xl font-semibold text-brand-ink">{relatedCase.title}</h2>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  特定顧客の実績紹介ではありません。ご相談内容を説明するための一般例です。
                </p>
              </div>
              <div>
                <dl className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold text-slate-500">相談時の状態</dt>
                    <dd className="mt-2 text-sm leading-7 text-slate-700">{relatedCase.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-slate-500">Regaloが確認する範囲</dt>
                    <dd className="mt-2 text-sm leading-7 text-slate-700">{relatedCase.scope}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <p className="text-xs font-semibold text-slate-500">お渡しするもの</p>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-800">
                    {relatedCase.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-brand-primary-700" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold text-brand-ink">作業の進め方</h2>
            <ol className="mt-5 border-t-2 border-slate-900">
              {service.processSteps.map((step, index) => (
                <li key={step.title} className="grid gap-2 border-b border-slate-300 py-4 sm:grid-cols-[44px_160px_minmax(0,1fr)]">
                  <span className="text-xs font-semibold text-brand-primary-700">0{index + 1}</span>
                  <span className="font-semibold text-slate-900">{step.title}</span>
                  <span className="text-sm leading-6 text-slate-600">{step.description}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="border-l-4 border-brand-primary-700 bg-slate-50 px-6 py-7">
            <h2 className="text-xl font-semibold text-brand-ink">お見積り</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{service.pricing.summary}</p>
            <ul className="mt-5 space-y-3">
              {service.pricing.items.map((item) => (
                <li key={item} className="text-sm leading-6 text-slate-700">{item}</li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-semibold text-slate-500">主に使用する環境</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{service.techStack.join(' / ')}</p>
          </aside>
        </section>

        <section className="mt-14 border-t-2 border-slate-900 pt-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-brand-ink">まずは資料の状態を確認します</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">相談内容が未整理でも構いません。作業範囲を確認してから見積書をお送りします。</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                onClick={() => trackEvent('cta_click', { placement: 'service_detail', service: service.slug, target: 'contact' })}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-primary-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-primary-800"
              >
                見積りを相談する
                <ArrowRight className="h-4 w-4" />
              </Link>
              {phoneHref && (
                <a
                  href={`tel:${phoneHref}`}
                  onClick={() => trackEvent('phone_click', { placement: 'service_detail', service: service.slug })}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  <Phone className="h-4 w-4" />
                  {phoneDisplay}
                </a>
              )}
            </div>
          </div>
        </section>

        <nav className="mt-14 border-t border-slate-300 pt-7" aria-label="他の対応内容">
          <p className="text-xs font-semibold text-slate-500">他の対応内容</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {otherServices.map((item) => (
              <Link key={item.slug} to={`/services/${item.slug}/`} className="flex items-center justify-between gap-4 border-b border-slate-300 py-4 font-semibold text-brand-ink hover:text-brand-primary-700">
                {item.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default ServiceDetailPage;
