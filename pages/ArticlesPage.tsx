import React from 'react';
import ArticleList from '../components/ArticleList';
import { articles } from '../utils/articles';
import NotFoundPage from './NotFoundPage';

const ArticlesPage: React.FC = () => {
  if (articles.length === 0) return <NotFoundPage />;

  return (
    <section className="bg-paper pb-20 pt-28 md:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.12em] text-brand-primary-700">ARTICLES</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-brand-ink md:text-5xl">記事</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">
          BGMの権利やYouTube運用で、実際に確認していることをまとめています。
        </p>
        <div className="mt-12">
          <ArticleList items={articles} />
        </div>
      </div>
    </section>
  );
};

export default ArticlesPage;
