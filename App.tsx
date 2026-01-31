import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Cases from './components/Cases';
import Pricing from './components/Pricing';
import Process from './components/Process';
import TechStack from './components/TechStack';
import CompanyInfo from './components/CompanyInfo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { SectionId } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-blue-500/30">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <main>
        <Hero scrollToSection={scrollToSection} />
        <Services />
        <Cases />
        <Pricing />
        <Process />
        <TechStack />
        <CompanyInfo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
