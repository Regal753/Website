import React from 'react';
import { Bell, ClipboardCheck, Database, FolderKanban } from 'lucide-react';
import { SectionId } from '../types';

const stackItems = [
  { icon: Database, label: 'Google Sheets', detail: '進行管理・権利台帳管理', surface: 'border-slate-200 bg-white' },
  { icon: FolderKanban, label: 'Google Drive', detail: '素材保管・納品管理', surface: 'border-slate-200 bg-white' },
  { icon: Bell, label: 'Discord / メール通知', detail: '進捗通知・確認依頼', surface: 'border-slate-200 bg-white' },
  { icon: ClipboardCheck, label: '確認チェックリスト', detail: '公開前確認・運用監査', surface: 'border-slate-200 bg-white' },
] as const;

const workflowNodes = [
  {
    label: '入力',
    title: 'お問い合わせ / 素材 / 楽曲情報',
    description: '現場から入る情報を最初に揃える',
  },
  {
    label: '管理',
    title: 'Drive + Sheetsで進行と権利台帳を統合',
    description: '誰が見ても追える状態にする',
  },
  {
    label: '共有',
    title: '確認依頼・定期レポートの共有',
    description: '抜け漏れを減らし、判断を速くする',
  },
] as const;

const designPrinciples = ['既存運用を壊さずに入れる', '属人化を減らす', '継続運用を前提に設計する'] as const;

const TechStack: React.FC = () => {
  return (
    <section id={SectionId.TECH} className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex border border-brand-primary-200 bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700">
            実務で使う運用基盤
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">運用を支える実務基盤</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            管理台帳、進行共有、通知フローをばらばらにせず、現場で使うツール同士をつないで設計します。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="border border-slate-200 bg-[#fbfaf7] p-6 text-brand-ink shadow-sm shadow-slate-200/60 md:p-8">
            <p className="inline-flex border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-brand-primary-700">
              運用フローの考え方
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-brand-ink">情報が止まる場所を先に減らす</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              素材、権利、進行、通知が別々の場所にあると、判断が遅れます。
              まずは管理場所と通知経路を絞り、運用が止まりにくい導線を作ります。
            </p>

            <div className="mt-8 space-y-4">
              {workflowNodes.map((item, index) => (
                <div key={item.label}>
                  <div className="border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold tracking-widest text-slate-500">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-brand-ink">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                  {index < workflowNodes.length - 1 && (
                    <div className="mx-auto h-6 w-px bg-brand-primary-100" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {stackItems.map((item) => (
                <article key={item.label} className={`border p-5 shadow-sm shadow-slate-200/40 ${item.surface}`}>
                  <span className="inline-flex h-12 w-12 items-center justify-center border border-slate-200 bg-slate-50 text-brand-primary-700">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-lg font-semibold text-brand-ink">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <p className="text-sm font-semibold text-slate-500">設計方針</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {designPrinciples.map((item) => (
                  <div key={item} className="border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold leading-relaxed text-brand-ink">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                派手な仕組みより、担当者が増えても回しやすい運用を優先します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
