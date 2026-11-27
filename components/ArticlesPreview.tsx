import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { articles, hasArticles } from '../utils/articles';
import ArticleList from './ArticleList';
import SectionHeading from './SectionHeading';

// トップの記事欄。公開済みの記事が1本もなければ何も出さない
const ArticlesPreview: React.FC = () => {
  if (!hasArticles) return null;

  return (
    <section className="border-t border-slate-200 bg-paper py-16 md:py-24" aria-labelledby="articles-preview-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="articles-preview-title"
          eyebrow="ARTICLES"
          title="記事"
          lead="BGMの権利やYouTube運用で、実際に確認していることをまとめています。"
        />
        <ArticleList items={articles.slice(0, 3)} />
        {articles.length > 3 ? (
          <Link
            to="/articles/"
            className="mt-8 inline-flex items-center gap-2 border-b border-brand-primary-700 pb-1 text-sm font-semibold text-brand-primary-700 hover:text-brand-primary-800"
          >
            記事一覧を見る <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </section>
  );
};

export default ArticlesPreview;
