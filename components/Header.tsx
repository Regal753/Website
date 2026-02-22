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
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_26px_rgba(15,23,42,0.08)] border-b border-slate-200/80 py-3.5'
          : 'bg-white/55 backdrop-blur-md border-b border-white/30 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group rounded-xl bg-white/80 border border-slate-200/80 px-2.5 py-1.5 shadow-sm"
          onClick={() => handleNavClick('/')}
        >
          <img
            src={import.meta.env.BASE_URL + "images/logo.webp"}
            alt={siteConfig.companyName}
            className="w-10 h-10 rounded-lg transform group-hover:rotate-12 transition-transform"
          />
          <span className="text-xl font-bold text-slate-900">
            {siteConfig.companyName}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {siteConfig.navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold whitespace-nowrap border transition-all ${
                isActive(item.href, item.matchPrefix)
                  ? 'text-blue-700 bg-blue-50 border-blue-100'
                  : 'text-slate-600 bg-white/70 border-slate-200 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-slate-600 hover:text-slate-900 rounded-lg bg-white/85 border border-slate-200 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 rounded-b-2xl bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-xl p-4 flex flex-col gap-3">
          {siteConfig.navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`text-left text-sm font-semibold p-2.5 rounded-lg border transition-colors ${
                isActive(item.href, item.matchPrefix)
                  ? 'text-blue-700 bg-blue-50 border-blue-100'
                  : 'text-slate-700 bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
