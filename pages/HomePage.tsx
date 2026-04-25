import React from 'react';
import Cases from '../components/Cases';
import Column from '../components/Column';
import Faq from '../components/Faq';
import Hero from '../components/Hero';
import InlineCTA from '../components/InlineCTA';
import News from '../components/News';
import Pricing from '../components/Pricing';
import ProofChecklist from '../components/ProofChecklist';
import Process from '../components/Process';
import Services from '../components/Services';
import TeamPreview from '../components/TeamPreview';
import TechStack from '../components/TechStack';
import TrustStats from '../components/TrustStats';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <ProofChecklist />
    <TrustStats />
    <Services />
    <Column />
    <News />
    <Cases />
    <TeamPreview />
    <Process />
    <TechStack />
    <Pricing />
    <Faq />
    <InlineCTA />
  </>
);

export default HomePage;
