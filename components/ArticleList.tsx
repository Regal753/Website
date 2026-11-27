import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Article, formatArticleDate } from '../utils/articles';
import { getServiceBySlug } from '../services.catalog';

// 記事の一覧（一覧ページ・トップ・事業ページで共通）
const ArticleList: React.FC<{ items: Article[] }> = ({ items }) => (
  <ul className="divide-y divide-slate-200 border-y border-slate-300">
    {items.map((article) => {
      const service = article.service ? getServiceBySlug(article.service) : undefined;
      return (
        <li key={article.slug}>
          <Link
            to={`/articles/${article.slug}/`}
            className="group grid gap-2 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8"
          >
            <div>
              <p className="text-xs font-semibold text-slate-600">
                <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                {service ? <span className="ml-3">{service.title}</span> : null}
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-brand-ink group-hover:text-brand-primary-700 md:text-xl">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{article.description}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary-700">
              読む <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </li>
      );
    })}
  </ul>
);

export default ArticleList;
