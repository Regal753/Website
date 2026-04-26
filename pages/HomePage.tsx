import React from 'react';
import Cases from '../components/Cases';
import Hero from '../components/Hero';
import InlineCTA from '../components/InlineCTA';
import News from '../components/News';
import Pricing from '../components/Pricing';
import Process from '../components/Process';
import Services from '../components/Services';
import TeamPreview from '../components/TeamPreview';
import TechStack from '../components/TechStack';
import TrustStats from '../components/TrustStats';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <TrustStats />
    <Services />
    <Cases />
    <InlineCTA />
    <TeamPreview />
    <Process />
    <TechStack />
    <Pricing />
    <News />
  </>
);

export default HomePage;
