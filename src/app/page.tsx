'use client';

import FeaturesSection from '@/components/pages/home/FeaturesSection';
import HeroSection from '@/components/pages/home/HeroSection';
import HowItWorksSection from '@/components/pages/home/HowItWorksSection';
import ShowcaseSection from '@/components/pages/home/ShowcaseSection';
import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen text-white">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ShowcaseSection />
    </div>
  );
};

export default LandingPage;
