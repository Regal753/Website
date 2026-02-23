import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../site.config';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          ? 'bg-white/92 backdrop-blur-xl shadow-[0_8px_26px_rgba(15,23,42,0.08)] border-b border-slate-200/80 py-3.5'
          : 'bg-white/65 backdrop-blur-md border-b border-white/30 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer group rounded-xl bg-white/80 border border-slate-200/80 px-2.5 py-1.5 shadow-sm"
          onClick={() => handleNavClick('/')}
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
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {siteConfig.navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold whitespace-nowrap border transition-all ${
                isActive(item.href, item.matchPrefix)
                  ? 'text-brand-primary-700 bg-brand-primary-50 border-brand-primary-100'
                  : 'text-slate-600 bg-white/70 border-slate-200 hover:text-brand-primary-700 hover:border-brand-primary-200 hover:bg-brand-primary-50/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

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
      <div
        id="mobile-navigation"
        className={`absolute top-full left-0 right-0 origin-top overflow-hidden transition-[max-height,opacity,transform] duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'max-h-[520px] opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="rounded-b-2xl bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-xl p-4 flex flex-col gap-3">
          {siteConfig.navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className={`text-left text-sm font-semibold p-2.5 rounded-lg border transition-colors ${
                isActive(item.href, item.matchPrefix)
                  ? 'text-brand-primary-700 bg-brand-primary-50 border-brand-primary-100'
                  : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
