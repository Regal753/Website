import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { SectionId } from '../types';

const STEPS = [
  {
    title: '相談内容を送る',
    description: '分かる範囲で、対象のチャンネル、楽曲、現在使っている資料などをお知らせください。',
    note: '初回相談は無料です',
  },
  {
    title: '資料と担当範囲を確認する',
    description: '通常1営業日以内に返信し、不足資料、Regaloが担当する作業、依頼者側で確認する項目を分けます。',
    note: '必要な場合のみオンラインで確認します',
  },
  {
    title: '見積書を確認する',
    description: '作業項目、納品物、日程、費用を記載した見積書をお送りします。',
    note: '内容に合意いただくまで着手しません',
  },
  {
    title: '発注後に作業を始める',
    description: '窓口と連絡方法を決め、見積書に記載した範囲から作業を開始します。',
    note: '変更がある場合は事前に確認します',
  },
] as const;

const Process: React.FC = () => (
  <section id={SectionId.PROCESS} className="bg-[#f6f7f9] py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-brand-primary-700">ご相談から着手まで</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-ink md:text-4xl">先に見積りをお送りします</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            価格表は設けていません。資料の量と担当範囲を確認し、作業を始める前に費用と納品物を明記します。
          </p>
        </div>

        <ol className="border-t-2 border-slate-900">
          {STEPS.map((step, index) => (
            <li key={step.title} className="grid gap-3 border-b border-slate-300 py-6 sm:grid-cols-[56px_minmax(0,1fr)_220px] sm:gap-6">
              <span className="text-sm font-semibold tabular-nums text-brand-primary-700">0{index + 1}</span>
              <div>
                <h3 className="text-lg font-semibold text-brand-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
              <p className="text-xs leading-5 text-slate-500 sm:pt-1">{step.note}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-l-4 border-brand-primary-700 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-7 text-slate-700">
          相談内容が整理できていなくても構いません。分かる資料から確認します。
        </p>
        <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-primary-700">
          見積りを相談する
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default Process;
