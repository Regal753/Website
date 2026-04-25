import React from 'react';
import Cases from '../components/Cases';
import Column from '../components/Column';
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
    <Column />
    <News />
    <Cases />
    <TeamPreview />
    <Process />
    <TechStack />
    <Pricing />
    <InlineCTA />
  </>
);

export default HomePage;
