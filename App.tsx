import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
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

const getRouteMeta = (pathname: string): RouteMeta => {
  const serviceMatch = pathname.match(/^\/services\/([^/]+)$/);
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

  switch (pathname) {
    case '/':
      return {
        title: siteConfig.siteTitle,
        description: siteConfig.siteDescription,
        canonicalPath: '/',
      };
    case '/company':
      return {
        title: `会社情報 | ${siteConfig.companyName}`,
        description: `${siteConfig.companyName}の会社概要と事業内容をご案内します。`,
        canonicalPath: '/company',
      };
    case '/contact':
      return {
        title: `お問い合わせ | ${siteConfig.companyName}`,
        description: `${siteConfig.companyName}へのお問い合わせフォームです。24時間受け付けています。`,
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
        canonicalPath: pathname || '/',
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

function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <RouteTracker />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100/70 text-slate-800 selection:bg-cyan-100">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/contact" element={<ContactPage />} />
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
