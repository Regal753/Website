import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Cases from '../components/Cases';
import Pricing from '../components/Pricing';
import Process from '../components/Process';
import TechStack from '../components/TechStack';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <Services />
    <Cases />
    <Pricing />
    <Process />
    <TechStack />
  </>
);

export default HomePage;
