import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../site.config';

const TermsPage: React.FC = () => {
  return (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">利用規約</h1>
          <p className="text-slate-600 leading-relaxed">
            本利用規約（以下「本規約」）は、Regalo（以下「当社」）が提供するWebサイトおよび関連サービス
            （以下「本サービス」）の利用条件を定めるものです。本サービスを利用するすべての方
            （以下「利用者」）は、本規約に同意したものとみなします。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">1. 適用範囲</h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1">
            <li>本規約は、利用者と当社との間の本サービス利用に関わる一切の関係に適用されます。</li>
            <li>当社が本サービス上で掲載する個別の注意事項やガイドラインは、本規約の一部を構成します。</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">2. サービス内容</h2>
          <p className="text-slate-600 leading-relaxed">
            当社は、事前の予告なく、本サービスの内容変更、追加、停止または終了を行うことがあります。
            当社は、これらにより利用者に生じた損害について、法令上認められる範囲で責任を負いません。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">3. 禁止事項</h2>
          <p className="text-slate-600 leading-relaxed">利用者は、以下の行為を行ってはなりません。</p>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>当社または第三者の権利・利益を侵害する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>虚偽情報の送信、なりすまし行為</li>
            <li>不正アクセス、過度な負荷を与える行為、リバースエンジニアリング等</li>
            <li>その他、当社が不適切と判断する行為</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">4. 知的財産権</h2>
          <p className="text-slate-600 leading-relaxed">
            本サービスに含まれる文章、画像、ロゴ、デザイン、プログラムその他一切のコンテンツに関する知的財産権は、
            当社または正当な権利者に帰属します。利用者は、権利者の許諾なく、複製、転載、配布、改変等を行ってはなりません。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">5. 免責事項</h2>
          <p className="text-slate-600 leading-relaxed">
            当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定目的適合性、
            セキュリティ等）がないことを明示または黙示に保証するものではありません。当社は、本サービス利用に起因して
            利用者に生じた損害について、当社の故意または重過失による場合を除き責任を負いません。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">6. 外部サービス・外部リンク</h2>
          <p className="text-slate-600 leading-relaxed">
            本サービスには、Googleフォーム等の外部サービスや外部サイトへのリンクが含まれる場合があります。
            外部サービスおよび外部サイトの内容・運用について、当社は管理責任を負いません。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">7. 個人情報の取扱い</h2>
          <p className="text-slate-600 leading-relaxed">
            当社による個人情報の取扱いは、
            <Link to="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors underline underline-offset-2">
              プライバシーポリシー
            </Link>
            に従います。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">8. 規約違反時の対応</h2>
          <p className="text-slate-600 leading-relaxed">
            当社は、利用者が本規約に違反した場合、事前通知なく利用制限、アクセス拒否、その他必要な措置を講じることがあります。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">9. 準拠法・管轄</h2>
          <p className="text-slate-600 leading-relaxed">
            本規約の準拠法は日本法とします。本サービスに関して紛争が生じた場合は、当社所在地を管轄する裁判所を
            第一審の専属的合意管轄裁判所とします。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">10. 規約の改定</h2>
          <p className="text-slate-600 leading-relaxed">
            当社は、必要に応じて本規約を改定することがあります。改定後の規約は、本ページに掲載した時点で効力を生じます。
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3">11. お問い合わせ</h2>
          <p className="text-slate-600 leading-relaxed">
            メール：
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              {siteConfig.contactEmail}
            </a>
            <br />
            電話：
            <a
              href={`tel:${siteConfig.companyProfile.phone.replace(/[^\d+]/g, '')}`}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              {siteConfig.companyProfile.phone}
            </a>
            （受付 9:00-20:00）
          </p>

          <p className="text-xs text-slate-400 mt-8">最終改定日：2026年2月22日</p>

          <Link to="/" className="inline-block mt-6 text-blue-600 hover:text-blue-700 text-sm transition-colors">
            &larr; トップへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
