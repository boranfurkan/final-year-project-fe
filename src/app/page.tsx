'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import FeaturesSection from '@/components/pages/home/FeaturesSection';
import HeroSection from '@/components/pages/home/HeroSection';
import HowItWorksSection from '@/components/pages/home/HowItWorksSection';

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
