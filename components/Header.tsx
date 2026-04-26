import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { siteConfig } from '../site.config';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const normalizePath = (value: string) => (value === '/' ? value : value.replace(/\/+$/, ''));

  const isActive = (href: string, matchPrefix?: boolean) => {
    if (href.includes('#')) {
      return `${normalizePath(location.pathname)}${location.hash}` === href;
    }

    const normalizedHref = normalizePath(href);
    const normalizedPathname = normalizePath(location.pathname);
    if (normalizedHref === '/') return normalizedPathname === '/';
    if (matchPrefix) return normalizedPathname.startsWith(normalizedHref);
    return normalizedPathname === normalizedHref;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-[0_8px_26px_rgba(15,23,42,0.08)]' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="group flex cursor-pointer items-center gap-3"
          onClick={handleNavClick}
          aria-label="トップページへ移動"
        >
          <img
            src={import.meta.env.BASE_URL + 'images/logo.webp'}
            alt={siteConfig.companyName}
            width={40}
            height={40}
            className="h-10 w-10 border border-slate-200 bg-white p-1 transition-transform group-hover:-translate-y-px"
          />
          <span className="font-serif text-2xl font-semibold tracking-normal text-brand-ink">
            {siteConfig.companyName}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <nav className="flex items-center gap-4 xl:gap-6">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleNavClick}
                className={`whitespace-nowrap border-b-2 px-1 py-2 text-xs font-semibold transition-colors lg:text-sm ${
                  isActive(item.href, item.matchPrefix)
                    ? 'border-brand-primary-700 text-brand-primary-700'
                    : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/company/"
            onClick={handleNavClick}
            className="inline-flex items-center border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
          >
            会社情報
          </Link>

          <Link
            to="/contact/"
            onClick={handleNavClick}
            className="inline-flex items-center gap-2 bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-px hover:bg-slate-800"
          >
            ご相談・お問い合わせ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="border border-slate-300 bg-white p-2 text-slate-600 hover:text-slate-900 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute top-full left-0 right-0 origin-top overflow-hidden lg:hidden"
        >
          <div className="flex flex-col gap-3 border-t border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleNavClick}
                className={`border p-2.5 text-left text-sm font-semibold transition-colors ${
                  isActive(item.href, item.matchPrefix)
                    ? 'text-brand-primary-700 bg-brand-primary-50 border-brand-primary-100'
                    : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/company/"
              onClick={handleNavClick}
              className="border border-slate-200 bg-white p-2.5 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              会社情報
            </Link>
            <Link
              to="/contact/"
              onClick={handleNavClick}
              className="mt-1 inline-flex items-center justify-center gap-2 bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
            >
              ご相談・お問い合わせ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
