import React from 'react';
import Cases from '../components/Cases';
import Hero from '../components/Hero';
import InlineCTA from '../components/InlineCTA';
import News from '../components/News';
import Process from '../components/Process';
import Services from '../components/Services';
import TeamPreview from '../components/TeamPreview';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <Services />
    <Cases />
    <InlineCTA />
    <TeamPreview />
    <Process />
    <News />
  </>
);

export default HomePage;
