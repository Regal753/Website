import React from 'react';
import { Clock3, MapPin, ShieldCheck, Workflow } from 'lucide-react';
import { siteConfig } from '../site.config';

const trustItems = [
  {
    icon: Workflow,
    label: '横断支援',
    value: '3つの支援領域を一つの窓口で整理',
    description: 'YouTube/SNS運用、音楽権利管理、制作進行の整備まで、課題を分断せずに整理します。',
    surface: 'border-rose-100 bg-rose-50/80',
    iconSurface: 'bg-white text-rose-700',
  },
  {
    icon: Clock3,
    label: '返信目安',
    value: '1営業日以内',
    description: '初回相談は無料。課題がまだ曖昧でも、そのままお送りください。',
    surface: 'border-amber-100 bg-amber-50/80',
    iconSurface: 'bg-white text-amber-800',
  },
  {
    icon: MapPin,
    label: '拠点',
    value: '京都発の少人数チーム',
    description: '相談から改善まで、距離の近い体制で伴走します。',
    surface: 'border-brand-primary-100 bg-brand-primary-50/80',
    iconSurface: 'bg-white text-brand-primary-700',
  },
  {
    icon: ShieldCheck,
    label: '専門性',
    value: '権利管理まで実務対応',
    description: '音楽権利や台帳整備まで含めて、実務に落ちる形で整理します。',
    surface: 'border-cyan-100 bg-cyan-50/80',
    iconSurface: 'bg-white text-cyan-800',
  },
] as const;

const supportHighlights = ['初回相談無料', '会社窓口で整理', '電話受付 9:00-20:00'] as const;

const TrustStats: React.FC = () => {
  const phone = siteConfig.companyProfile.phone || '現在準備中';

  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[340px_minmax(0,1fr)]">
            <div className="border-b border-slate-200 bg-slate-100 p-6 text-brand-ink lg:border-b-0 lg:border-r md:p-8">
              <p className="font-semibold text-brand-primary-700">
                About us
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-ink">
                公開情報を出したうえで、
                <br />
                実務で支援する
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                所在地、電話番号、法人番号、代表者名を公開しています。
                相談の入口は一つにしつつ、運用、権利、共有のどこが詰まりやすいかを最初に切り分けます。
              </p>

              <div className="mt-8 space-y-3">
                <div className="rounded-lg border border-brand-primary-100 bg-white/85 p-4 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500">お問い合わせ窓口</p>
                  <p className="mt-2 text-lg font-semibold text-brand-ink">{phone}</p>
                </div>
                <div className="rounded-lg border border-brand-primary-100 bg-white/85 p-4 shadow-sm">
                  <p className="text-xs font-semibold text-slate-500">支援スタンス</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    見栄えだけでなく、日々の運用負荷を下げるところまで設計します。
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                {trustItems.map((item) => (
                  <article
                    key={item.value}
                    className={`rounded-lg border p-5 shadow-sm shadow-slate-200/40 ${item.surface}`}
                  >
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg shadow-sm ${item.iconSurface}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-xs font-semibold text-slate-500">{item.label}</p>
                    <p className="mt-2 text-xl font-semibold leading-tight text-brand-ink">{item.value}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </article>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  {supportHighlights.map((item) => (
                    <span
                      key={item}
                      className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  相談段階では「何から着手すべきか」の整理から入ります。すでに決まっている施策がなくても問題ありません。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
