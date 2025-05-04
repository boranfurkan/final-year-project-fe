'use client';

import FeaturesSection from '@/components/pages/home/FeaturesSection';
import HeroSection from '@/components/pages/home/HeroSection';
import HowItWorksSection from '@/components/pages/home/HowItWorksSection';
import dynamic from 'next/dynamic';
import React from 'react';

const ShowcaseSection = dynamic(
  () => import('@/components/pages/home/ShowcaseSection'),
  {
    ssr: false,
  }
);

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
