import React from 'react';
import { Clock3, MapPin, ShieldCheck, Workflow } from 'lucide-react';
import { siteConfig } from '../site.config';

const TrustStats: React.FC = () => {
  const phone = siteConfig.companyProfile.phone || '現在準備中';

  const trustItems = [
    {
      icon: Workflow,
      label: '横断支援',
      value: '3つの事業を一つの窓口で',
      description: 'SNS運用、音楽出版、AI活用まで、課題を分断せずに整理します。',
    },
    {
      icon: Clock3,
      label: '返信目安',
      value: '1営業日以内',
      description: '初回相談は無料。課題がまだ曖昧でも、そのままお送りください。',
    },
    {
      icon: MapPin,
      label: '拠点',
      value: '京都発の少人数チーム',
      description: '相談から改善まで、代表を含む近い距離感で伴走します。',
    },
    {
      icon: ShieldCheck,
      label: '専門性',
      value: '権利管理まで実務対応',
      description: 'JASRAC信託会員として、音楽権利や台帳整備も見られます。',
    },
  ];

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.value}
              className="rounded-3xl border border-slate-200 bg-[#fffaf7] p-5 shadow-sm shadow-slate-200/40"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-primary-700 shadow-sm">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-semibold tracking-wide text-slate-500">{item.label}</p>
              <p className="mt-2 text-xl font-semibold text-brand-ink">{item.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
          お問い合わせ窓口: <span className="font-semibold text-slate-900">{phone}</span>
          <span className="mx-2 text-slate-300">|</span>
          電話受付 9:00-20:00 / フォームは24時間受付
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
