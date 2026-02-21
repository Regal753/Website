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
            Regalo（以下「当社」）は、当社Webサイトおよびお問い合わせに関連して取得する情報について、
            個人情報の保護に関する法律その他の関係法令を遵守し、適切に取り扱います。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">1. 事業者情報</h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1">
            <li>事業者名：Regalo（株式会社Regalo）</li>
            <li>
              所在地・代表者：
              <Link to="/company" className="text-blue-600 hover:text-blue-700 transition-colors underline underline-offset-2">
                会社概要ページ
              </Link>
              に記載
            </li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">2. 取得する情報</h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1">
            <li>お問い合わせ時にご入力いただく情報（氏名、会社名、メールアドレス、電話番号、本文等）</li>
            <li>お問い合わせ種別、添付ファイルに関する情報（ファイル名・容量など）</li>
            <li>アクセスログ、利用端末情報、ブラウザ情報等の技術情報</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">3. 利用目的</h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1">
            <li>お問い合わせへの回答、連絡、本人確認のため</li>
            <li>ご依頼内容の確認、見積り作成、サービス提供のため</li>
            <li>不正行為の防止、セキュリティ確保、障害対応のため</li>
            <li>サービス品質の改善および運用管理のため</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">4. 第三者提供</h2>
          <p className="text-slate-600 leading-relaxed">
            当社は、法令に基づく場合を除き、本人の同意なく個人情報を第三者へ提供しません。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">5. 外部サービスの利用</h2>
          <p className="text-slate-600 leading-relaxed">
            当社は、お問い合わせ受付等の目的で Googleフォームその他の外部サービスを利用する場合があります。
            外部サービス上で取り扱われる情報は、各サービス提供事業者のプライバシーポリシーに基づき管理されます。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">6. 安全管理措置</h2>
          <p className="text-slate-600 leading-relaxed">
            当社は、個人情報への不正アクセス、漏えい、滅失またはき損を防止するため、アクセス制御、
            通信の保護、必要最小限の権限管理など、合理的な安全管理措置を講じます。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">7. 開示・訂正・利用停止等の請求</h2>
          <p className="text-slate-600 leading-relaxed">
            ご本人から、保有個人データの利用目的の通知、開示、内容の訂正・追加・削除、利用停止・消去、
            第三者提供の停止の請求があった場合には、法令に基づき適切に対応します。
            請求時には本人確認をお願いする場合があります。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">8. Cookie等について</h2>
          <p className="text-slate-600 leading-relaxed">
            当社サイトでは、利便性向上や障害分析のためにCookie等を利用する場合があります。
            ブラウザ設定によりCookieを無効化できますが、一部機能が利用しづらくなることがあります。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">9. 未成年の方の情報</h2>
          <p className="text-slate-600 leading-relaxed">
            未成年の方がお問い合わせ等を行う場合は、必要に応じて保護者の同意を得たうえでご連絡ください。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">10. 改定</h2>
          <p className="text-slate-600 leading-relaxed">
            本ポリシーは、法令改正や運用上の必要に応じて改定することがあります。
            重要な変更がある場合は、本ページで公表します。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">11. お問い合わせ窓口</h2>
          <p className="text-slate-600 leading-relaxed">
            メール：
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              {siteConfig.contactEmail}
            </a>
          </p>

          <p className="text-xs text-slate-400 mt-8">最終改定日：2026年2月21日</p>

          <Link to="/" className="inline-block mt-6 text-blue-600 hover:text-blue-700 text-sm transition-colors">
            &larr; トップへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;