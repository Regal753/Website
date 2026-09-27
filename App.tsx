import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
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
  imagePath: string;
  imageAlt: string;
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

const upsertRouteStructuredData = (data: Record<string, unknown>[] | null) => {
  const id = 'route-structured-data';
  const current = document.getElementById(id);
  if (!data) {
    current?.remove();
    return;
  }

  const element = current ?? document.createElement('script');
  element.id = id;
  element.setAttribute('type', 'application/ld+json');
  element.textContent = JSON.stringify(data);
  if (!current) document.head.appendChild(element);
};

export const getRouteMeta = (pathname: string): RouteMeta => {
  const pathWithoutTrailingSlash = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const serviceMatch = pathWithoutTrailingSlash.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const decodedSlug = decodeURIComponent(serviceMatch[1]);
    const service = getServiceBySlug(decodedSlug);
    if (service) {
      return {
        title: `${service.title} | ${siteConfig.companyName}`,
        description: service.description,
        canonicalPath: `/services/${service.slug}/`,
        imagePath: `/${service.media.listImage}`,
        imageAlt: `${service.title}のサービス案内`,
      };
    }
  }

  const legacyRouteAliases: Record<string, '/company' | '/contact'> = {
    '/company.html': '/company',
    '/contact.html': '/contact',
  };
  const normalizedPathname =
    legacyRouteAliases[pathWithoutTrailingSlash] || pathWithoutTrailingSlash;

  switch (normalizedPathname) {
    case '/':
      return {
        title: siteConfig.siteTitle,
        description: siteConfig.siteDescription,
        canonicalPath: '/',
        imagePath: '/images/hero.webp',
        imageAlt: 'Regaloのサービスイメージ',
      };
    case '/company':
      return {
        title: `会社情報 | ${siteConfig.companyName}`,
        description:
          '株式会社Regaloの会社概要、代表者、所在地、事業内容、外部確認先を掲載しています。',
        canonicalPath: '/company',
        imagePath: '/images/hero.webp',
        imageAlt: '株式会社Regaloの会社情報',
      };
    case '/contact':
      return {
        title: `お問い合わせ | ${siteConfig.companyName}`,
        description:
          'YouTube・SNS運用、音楽の権利情報管理、制作進行に関するお問い合わせを24時間受け付けています。原則1営業日以内にご連絡します。',
        canonicalPath: '/contact',
        imagePath: '/images/hero.webp',
        imageAlt: '株式会社Regaloのお問い合わせ窓口',
      };
    case '/privacy':
      return {
        title: `プライバシーポリシー | ${siteConfig.companyName}`,
        description: `${siteConfig.companyName}の個人情報保護方針です。`,
        canonicalPath: '/privacy',
        imagePath: '/images/hero.webp',
        imageAlt: '株式会社Regaloのプライバシーポリシー',
      };
    case '/terms':
      return {
        title: `利用規約 | ${siteConfig.companyName}`,
        description: `${siteConfig.companyName}のサービス利用条件です。`,
        canonicalPath: '/terms',
        imagePath: '/images/hero.webp',
        imageAlt: '株式会社Regaloの利用規約',
      };
    default:
      return {
        title: `ページが見つかりません | ${siteConfig.companyName}`,
        description: siteConfig.siteDescription,
        canonicalPath: pathname || '/',
        imagePath: '/images/hero.webp',
        imageAlt: 'Regaloのサービスイメージ',
      };
  }
};

export const getRouteStructuredData = (
  pathname: string,
  siteUrl = DEFAULT_SITE_URL,
): Record<string, unknown>[] | null => {
  const pathWithoutTrailingSlash = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const serviceMatch = pathWithoutTrailingSlash.match(/^\/services\/([^/]+)$/);
  if (!serviceMatch) return null;

  const service = getServiceBySlug(decodeURIComponent(serviceMatch[1]));
  if (!service) return null;

  const normalizedSiteUrl = siteUrl.replace(/\/$/, '');
  const serviceUrl = `${normalizedSiteUrl}/services/${service.slug}/`;
  const organizationId = `${normalizedSiteUrl}/#organization`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      serviceType: service.title,
      description: service.description,
      url: serviceUrl,
      provider: {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteConfig.companyProfile.legalName,
        url: `${normalizedSiteUrl}/`,
      },
      areaServed: {
        '@type': 'Country',
        name: '日本',
      },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: '法人・制作会社',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: siteConfig.companyName,
          item: `${normalizedSiteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: service.title,
          item: serviceUrl,
        },
      ],
    },
  ];
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
    const imagePath = `${routerBase}${routeMeta.imagePath}`;
    const imageUrl = `${getSiteUrl()}${imagePath}`;

    document.title = routeMeta.title;
    upsertMetaTag('description', routeMeta.description);
    upsertMetaTag('twitter:title', routeMeta.title);
    upsertMetaTag('twitter:description', routeMeta.description);
    upsertMetaTag('twitter:image', imageUrl);
    upsertPropertyMetaTag('og:title', routeMeta.title);
    upsertPropertyMetaTag('og:description', routeMeta.description);
    upsertPropertyMetaTag('og:url', canonicalUrl);
    upsertPropertyMetaTag('og:image', imageUrl);
    upsertPropertyMetaTag('og:image:alt', routeMeta.imageAlt);
    upsertCanonicalLink(canonicalUrl);
    upsertRouteStructuredData(getRouteStructuredData(location.pathname, getSiteUrl()));
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
      <div className="min-h-screen bg-[#fbf8ee] text-slate-800 selection:bg-[#e7e6d6]">
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
            <Route path="/services/ai-marketing-strategy" element={<Navigate to="/services/workflow-automation/" replace />} />
            <Route path="/services/ai-marketing-strategy/" element={<Navigate to="/services/workflow-automation/" replace />} />
            <Route path="/services/ai-marketing-strategy.html" element={<Navigate to="/services/workflow-automation/" replace />} />
            <Route path="/services/rights-management" element={<Navigate to="/services/music-publishing/" replace />} />
            <Route path="/services/rights-management/" element={<Navigate to="/services/music-publishing/" replace />} />
            <Route path="/services/rights-management.html" element={<Navigate to="/services/music-publishing/" replace />} />
            <Route path="/services/workflow-automation.html" element={<Navigate to="/services/workflow-automation/" replace />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/services/:slug/" element={<ServiceDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
