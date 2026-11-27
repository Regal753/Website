import React from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getServiceBySlug } from '../services.catalog';
import { formatArticleDate, getArticleBySlug } from '../utils/articles';
import { Markdown } from '../utils/markdown';
import NotFoundPage from './NotFoundPage';

const ArticlePage: React.FC = () => {
  const { slug = '' } = useParams();
  const article = getArticleBySlug(slug);
  if (!article) return <NotFoundPage />;

  const service = article.service ? getServiceBySlug(article.service) : undefined;

  return (
    <article className="bg-paper pb-20 pt-28 md:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/articles/"
          className="inline-flex items-center gap-2 text-sm text-brand-primary-700 transition-colors hover:text-brand-primary-800"
        >
          <ArrowLeft className="h-4 w-4" />
          記事一覧へ
        </Link>

        <header className="mt-8 border-b border-slate-300 pb-8">
          <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">ARTICLE</p>
          <h1 className="mt-3 text-3xl font-semibold leading-snug text-brand-ink md:text-4xl">{article.title}</h1>
          <p className="mt-5 text-base leading-8 text-slate-700">{article.description}</p>
          <p className="mt-5 text-sm text-slate-600">
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time> 公開
            {article.updated ? (
              <>
                ・<time dateTime={article.updated}>{formatArticleDate(article.updated)}</time> 更新
              </>
            ) : null}
            <span className="ml-3">株式会社Regalo</span>
          </p>
        </header>

        <div className="pb-4">
          <Markdown source={article.body} />
        </div>

        <aside className="mt-14 rounded-lg border border-slate-200 bg-paper-card p-6 md:p-8">
          <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">CONTACT</p>
          <p className="mt-3 text-lg font-semibold text-brand-ink">
            {service ? `${service.title}について相談する` : 'この内容について相談する'}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            対象の楽曲やチャンネルが決まっていなくても、分かる範囲からご相談いただけます。初回のヒアリングは無料です。
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-800"
            >
              お問い合わせ <ArrowRight className="h-4 w-4" />
            </Link>
            {service ? (
              <Link
                to={`/services/${service.slug}/`}
                className="text-sm font-semibold text-brand-primary-700 underline decoration-slate-400 underline-offset-4 hover:text-brand-primary-800"
              >
                {service.title}の詳細を見る
              </Link>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  );
};

export default ArticlePage;
