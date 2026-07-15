import React from 'react';
import BusinessFAQ from '../components/BusinessFAQ';
import Cases from '../components/Cases';
import Hero from '../components/Hero';
import MusicRightsReview from '../components/MusicRightsReview';
import News from '../components/News';
import Process from '../components/Process';
import Services from '../components/Services';
import TeamPreview from '../components/TeamPreview';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <Services />
    <Cases />
    <MusicRightsReview />
    <TeamPreview />
    <Process />
    <BusinessFAQ />
    <News />
  </>
);

export default HomePage;
