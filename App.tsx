import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { getServiceBySlug } from './services.catalog';
import { siteConfig } from './site.config';
import CompanyPage from './pages/CompanyPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import TermsPage from './pages/TermsPage';
import { trackEvent } from './utils/analytics';

type RouteMeta = {
  title: string;
  description: string;
  canonicalPath: string;
};

const DEFAULT_SITE_URL = 'https://www.regalocom.net';

const getRouterBasename = (): string | undefined => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  if (baseUrl === '/' || baseUrl === './') return undefined;
  return baseUrl.replace(/\/$/, '');
};

const getSiteUrl = (): string => {
  const configured = (import.meta.env.VITE_SITE_URL || '').trim();
  return (configured || DEFAULT_SITE_URL).replace(/\/$/, '');
};

const upsertMetaTag = (name: string, content: string) => {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertPropertyMetaTag = (property: string, content: string) => {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertCanonicalLink = (href: string) => {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const stripTrailingSlash = (pathname: string): string => {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '') || '/';
};

const legacyRouteAliases: Record<string, '/company' | '/contact'> = {
  '/company.html': '/company',
  '/contact.html': '/contact',
};

const normalizeRoutePathname = (pathname: string): string => {
  const withoutTrailingSlash = stripTrailingSlash(pathname || '/');
  return legacyRouteAliases[withoutTrailingSlash] || withoutTrailingSlash;
};

export const getRouteMeta = (pathname: string): RouteMeta => {
  const normalizedPathname = normalizeRoutePathname(pathname);
  const serviceMatch = normalizedPathname.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const decodedSlug = decodeURIComponent(serviceMatch[1]);
    const service = getServiceBySlug(decodedSlug);
    if (service) {
      return {
        title: `${service.title} | ${siteConfig.companyName}`,
        description: service.description,
        canonicalPath: `/services/${service.slug}`,
      };
    }
  }

  switch (normalizedPathname) {
    case '/':
      return {
        title: siteConfig.siteTitle,
        description: siteConfig.siteDescription,
        canonicalPath: '/',
      };
    case '/company':
      return {
        title: `会社情報 | ${siteConfig.companyName}`,
        description:
          '京都発の実務チームRegaloの会社概要、公開情報、支援体制をご案内します。',
        canonicalPath: '/company',
      };
    case '/contact':
      return {
        title: `お問い合わせ | ${siteConfig.companyName}`,
        description:
          'YouTube/SNS運用、音楽権利管理、制作進行や運用自動化のご相談を24時間受け付けています。通常1営業日以内にご連絡します。',
        canonicalPath: '/contact',
      };
    case '/privacy':
      return {
        title: `プライバシーポリシー | ${siteConfig.companyName}`,
        description: `${siteConfig.companyName}の個人情報保護方針です。`,
        canonicalPath: '/privacy',
      };
    case '/terms':
      return {
        title: `利用規約 | ${siteConfig.companyName}`,
        description: `${siteConfig.companyName}のサービス利用条件です。`,
        canonicalPath: '/terms',
      };
    default:
      return {
        title: `ページが見つかりません | ${siteConfig.companyName}`,
        description: siteConfig.siteDescription,
        canonicalPath: normalizedPathname || '/',
      };
  }
};

const RouteTracker: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    trackEvent('page_view', { path: `${location.pathname}${location.search}` });

    const routeMeta = getRouteMeta(location.pathname);
    const routerBase = getRouterBasename() || '';
    const baseAwarePath =
      routeMeta.canonicalPath === '/'
        ? routerBase || '/'
        : `${routerBase}${routeMeta.canonicalPath}`;
    const canonicalUrl =
      baseAwarePath === '/' ? `${getSiteUrl()}/` : `${getSiteUrl()}${baseAwarePath}`;

    document.title = routeMeta.title;
    upsertMetaTag('description', routeMeta.description);
    upsertMetaTag('twitter:title', routeMeta.title);
    upsertMetaTag('twitter:description', routeMeta.description);
    upsertPropertyMetaTag('og:title', routeMeta.title);
    upsertPropertyMetaTag('og:description', routeMeta.description);
    upsertPropertyMetaTag('og:url', canonicalUrl);
    upsertCanonicalLink(canonicalUrl);
  }, [location.pathname, location.search]);

  return null;
};

const ScrollToTopOnRouteChange: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <ScrollToTopOnRouteChange />
      <RouteTracker />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/70 text-slate-800 selection:bg-cyan-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-primary-700 focus:shadow-lg"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/company.html" element={<Navigate to="/company" replace />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
