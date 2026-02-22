import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../types';
import { siteConfig } from '../site.config';

const PAGE_ROUTES: Partial<Record<SectionId, string>> = {
  [SectionId.COMPANY]: '/company',
  [SectionId.CONTACT]: '/contact',
};

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

  const handleNavClick = (id: SectionId) => {
    setIsMobileMenuOpen(false);

    const route = PAGE_ROUTES[id];
    if (route) {
      navigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === SectionId.HOME) {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Scroll-based section on the home page
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (id: SectionId) => {
    const route = PAGE_ROUTES[id];
    if (route) return location.pathname === route;
    if (id === SectionId.HOME) return location.pathname === '/';
    if (id === SectionId.SERVICES) return location.pathname.startsWith('/services');
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavClick(SectionId.HOME)}
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
        <nav className="hidden md:flex gap-8">
          {siteConfig.navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-blue-600 ${
                isActive(item.id) ? 'text-blue-600' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-600 hover:text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-xl p-4 flex flex-col gap-4">
          {siteConfig.navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left text-sm font-medium p-2 rounded hover:bg-slate-50 transition-colors ${
                isActive(item.id) ? 'text-blue-600 bg-blue-50' : 'text-slate-600'
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
