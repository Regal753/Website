import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../site.config';

const PrivacyPage: React.FC = () => {
  return (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">プライバシーポリシー</h1>
          <p className="text-slate-600 leading-relaxed">
            Regalo（以下「当社」）は、当社Webサイトおよびお問い合わせに関連して取得する情報の取扱いについて、以下のとおり定めます。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">1. 取得する情報</h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1">
            <li>お問い合わせ時に入力された情報（氏名、メールアドレス、お問い合わせ内容 等）</li>
            <li>アクセスログ等（IPアドレス、閲覧日時、端末・ブラウザ情報 等）</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">2. 利用目的</h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1">
            <li>お問い合わせへの回答・連絡のため</li>
            <li>サービス提供・品質改善・不正利用防止のため</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">3. 第三者提供</h2>
          <p className="text-slate-600 leading-relaxed">
            当社は、法令に基づく場合を除き、本人の同意なく個人情報を第三者に提供しません。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">4. 外部サービスの利用</h2>
          <p className="text-slate-600 leading-relaxed">
            当社は、お問い合わせ受付に Googleフォーム等の外部サービスを利用する場合があります。外部サービス上で取り扱われる情報は、当該サービス提供者のポリシーに従います。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">5. 開示・訂正・削除等</h2>
          <p className="text-slate-600 leading-relaxed">
            取得情報の開示・訂正・削除等をご希望の場合は、下記窓口までご連絡ください。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">6. お問い合わせ窓口</h2>
          <p className="text-slate-600 leading-relaxed">
            メール：<a href={`mailto:${siteConfig.contactEmail}`} className="text-blue-600 hover:text-blue-700 transition-colors">{siteConfig.contactEmail}</a>
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">7. 改定</h2>
          <p className="text-slate-600 leading-relaxed">
            本ポリシーは必要に応じて改定します。改定後は当ページにて公表します。
          </p>

          <p className="text-xs text-slate-400 mt-8">最終改定日：2026年1月30日</p>

          <Link to="/" className="inline-block mt-6 text-blue-600 hover:text-blue-700 text-sm transition-colors">
            &larr; トップへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;
