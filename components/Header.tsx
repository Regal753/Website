import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
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

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string, matchPrefix?: boolean) => {
    if (href === '/') return location.pathname === '/';
    if (matchPrefix) return location.pathname.startsWith(href);
    return location.pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-slate-200 bg-white/95 py-3 backdrop-blur-xl'
          : 'border-b border-slate-200/80 bg-white/90 py-4 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="group flex cursor-pointer items-center gap-2"
          onClick={handleNavClick}
          aria-label="Regalo トップページへ移動"
        >
          <img
            src={import.meta.env.BASE_URL + 'images/logo.webp'}
            alt={siteConfig.companyName}
            width={40}
            height={40}
            className="h-10 w-10 rounded-md"
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
                className={`border-b-2 px-1 py-2 text-xs font-semibold whitespace-nowrap transition-colors lg:text-sm ${
                  isActive(item.href, item.matchPrefix)
                    ? 'border-brand-primary-700 text-brand-primary-700'
                    : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-brand-primary-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            onClick={handleNavClick}
            className="inline-flex items-center gap-2 rounded-md bg-brand-primary-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-800"
          >
            見積り相談
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/contact"
            onClick={handleNavClick}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-primary-700 px-3.5 py-2 text-sm font-semibold text-white"
          >
            見積り
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white/85 p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        id="mobile-navigation"
        className={`absolute top-full left-0 right-0 origin-top overflow-hidden transition-[max-height,opacity,transform] duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'visible max-h-[520px] translate-y-0 opacity-100'
            : 'invisible max-h-0 -translate-y-2 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col gap-1 border-t border-slate-200 bg-white p-4 shadow-xl">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={handleNavClick}
              className={`border-l-2 p-3 text-left text-sm font-semibold transition-colors ${
                isActive(item.href, item.matchPrefix)
                  ? 'border-brand-primary-700 bg-brand-primary-50 text-brand-primary-700'
                  : 'border-transparent text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={handleNavClick}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-brand-primary-700 px-4 py-3 text-sm font-semibold text-white"
          >
            見積りを相談する
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
