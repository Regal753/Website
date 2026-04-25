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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/92 backdrop-blur-xl shadow-[0_8px_26px_rgba(15,23,42,0.08)] border-b border-slate-200/80 py-3.5'
          : 'bg-white/65 backdrop-blur-md border-b border-white/30 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer group rounded-lg bg-white/80 border border-slate-200/80 px-2.5 py-1.5 shadow-sm"
          onClick={handleNavClick}
          aria-label="トップページへ移動"
        >
          <img
            src={import.meta.env.BASE_URL + 'images/logo.webp'}
            alt={siteConfig.companyName}
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg transform group-hover:rotate-12 transition-transform"
          />
          <span className="text-xl font-semibold text-brand-ink">
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
                className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold whitespace-nowrap border transition-all ${
                  isActive(item.href, item.matchPrefix)
                    ? 'text-brand-primary-700 bg-brand-primary-50 border-brand-primary-100'
                    : 'text-slate-600 bg-white/70 border-slate-200 hover:text-brand-primary-700 hover:border-brand-primary-200 hover:bg-brand-primary-50/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            onClick={handleNavClick}
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-primary-700/20 transition-all hover:-translate-y-px hover:bg-brand-primary-800"
          >
            無料相談
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden text-slate-600 hover:text-slate-900 rounded-lg bg-white/85 border border-slate-200 p-2"
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
          <div className="rounded-b-lg bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-xl p-4 flex flex-col gap-3">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleNavClick}
                className={`text-left text-sm font-semibold p-2.5 rounded-lg border transition-colors ${
                  isActive(item.href, item.matchPrefix)
                    ? 'text-brand-primary-700 bg-brand-primary-50 border-brand-primary-100'
                    : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary-700 px-4 py-3 text-sm font-semibold text-white"
            >
              無料相談する
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
