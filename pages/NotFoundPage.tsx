import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <section className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 text-center">
          <p className="text-sm text-slate-500 tracking-widest">404 NOT FOUND</p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
            ページが見つかりません
          </h1>
          <p className="text-slate-600 mt-4 leading-relaxed">
            指定されたページは移動または削除された可能性があります。以下のリンクからお戻りください。
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-lg bg-brand-primary-700 hover:bg-brand-primary-800 text-white font-semibold transition-colors"
            >
              トップへ戻る
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
            >
              お問い合わせ
            </Link>
            <Link
              to="/company"
              className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold transition-colors"
            >
              会社情報
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
