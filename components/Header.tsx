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
      className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-200 transition-colors duration-300 ${
        isScrolled
          ? 'bg-white py-3'
          : 'bg-[#f3f6fb] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleNavClick}
          aria-label="Regalo トップページへ移動"
        >
          <img
            src={import.meta.env.BASE_URL + 'images/logo-80.webp'}
            srcSet={`${import.meta.env.BASE_URL}images/logo-80.webp 2x, ${import.meta.env.BASE_URL}images/logo.webp 3x`}
            alt={siteConfig.companyName}
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-xl font-semibold text-brand-ink">
            {siteConfig.companyName}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <nav className="flex items-center gap-5 xl:gap-7">
            {siteConfig.navItems.filter((item) => item.href !== '/').map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={handleNavClick}
                className={`border-b-2 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive(item.href, item.matchPrefix)
                    ? 'border-brand-primary-700 text-brand-primary-700'
                    : 'border-transparent text-slate-600 hover:text-brand-primary-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            onClick={handleNavClick}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-800"
          >
            お問い合わせ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-transparent p-2 text-slate-700 hover:text-slate-900"
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
        <div className="flex flex-col gap-1 border-t border-slate-200 bg-white p-4 shadow-lg">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={handleNavClick}
              className={`border-b border-slate-100 p-2.5 text-left text-sm font-semibold transition-colors ${
                isActive(item.href, item.matchPrefix)
                  ? 'text-brand-primary-700'
                  : 'text-slate-700 hover:text-brand-primary-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={handleNavClick}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary-700 px-4 py-3 text-sm font-semibold text-white"
          >
            お問い合わせ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
