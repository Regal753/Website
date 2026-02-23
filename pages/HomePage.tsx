import React from 'react';
import Hero from '../components/Hero';
import TrustStats from '../components/TrustStats';
import Services from '../components/Services';
import Cases from '../components/Cases';
import Process from '../components/Process';
import TechStack from '../components/TechStack';
import Pricing from '../components/Pricing';
import News from '../components/News';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <TrustStats />
    <Services />
    <Cases />
    <Process />
    <TechStack />
    <Pricing />
    <News />
  </>
);

export default HomePage;
