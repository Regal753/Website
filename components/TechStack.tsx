import React from 'react';
import { ArrowRight, Bot, Cloud, Database, FolderKanban, MessageSquareShare } from 'lucide-react';
import { SectionId } from '../types';

const stackItems = [
  { icon: Cloud, label: 'Google Cloud / n8n', detail: '処理実行・通知ワークフロー' },
  { icon: Database, label: 'Google Sheets', detail: '進行管理・権利台帳管理' },
  { icon: FolderKanban, label: 'Google Drive', detail: '素材保管・納品管理' },
  { icon: Bot, label: 'Discord Bot', detail: '進捗通知・リマインド' },
];

const TechStack: React.FC = () => {
  return (
    <section id={SectionId.TECH} className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 inline-flex rounded-full border border-brand-primary-200 bg-brand-primary-50 px-3 py-1 text-xs font-semibold text-brand-primary-700">
            TECH FOUNDATION
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-brand-ink md:text-4xl">運用を支える技術基盤</h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            実運用で使うツール構成を前提に、管理台帳・進行・通知をつなぐ基盤を設計します。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-brand-ink">採用技術</h3>
            <div className="space-y-3">
              {stackItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <item.icon className="mt-0.5 h-5 w-5 text-brand-primary-700" />
                  <div>
                    <p className="text-sm font-semibold text-brand-ink">{item.label}</p>
                    <p className="text-sm text-slate-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-brand-ink">運用フロー構成</h3>
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold tracking-wider text-slate-500">INPUT</p>
                <p className="mt-1 text-sm font-medium text-slate-700">お問い合わせ / 素材 / 楽曲情報</p>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </div>
              <div className="rounded-xl border border-brand-primary-200 bg-brand-primary-50/50 p-4">
                <p className="text-xs font-semibold tracking-wider text-brand-primary-700">MANAGE</p>
                <p className="mt-1 text-sm font-medium text-slate-700">Drive + Sheetsで進行管理と権利台帳を統合</p>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold tracking-wider text-slate-500">NOTIFY</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <MessageSquareShare className="h-4 w-4 text-brand-primary-700" />
                  Discord通知・定期レポート自動送信
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
