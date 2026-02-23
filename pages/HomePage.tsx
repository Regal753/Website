import React from 'react';
import Hero from '../components/Hero';
import TrustStats from '../components/TrustStats';
import Services from '../components/Services';
import News from '../components/News';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <TrustStats />
    <Services />
    <News />
  </>
);

export default HomePage;
