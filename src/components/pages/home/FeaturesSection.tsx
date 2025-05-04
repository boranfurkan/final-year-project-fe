'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Coins, Zap, Link, Shield } from 'lucide-react';
import { FEATURES } from '@/data/general';
import Image from 'next/image';

const iconComponents = {
  Cpu: Cpu,
  Sparkles: Sparkles,
  Coins: Coins,
  Zap: Zap,
  Link: Link,
  Shield: Shield,
};

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  color: string;
  index: number;
}> = ({ icon, title, description, color, index }) => {
  const IconComponent = iconComponents[icon as keyof typeof iconComponents];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/60 transition-all duration-300 h-full"
    >
      <div className={`bg-gradient-to-r ${color} p-3 rounded-lg w-fit mb-4`}>
        <IconComponent className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-[#F3CC3E]">{title}</h3>
      <p className="text-white/90">{description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="relative py-24 text-white">
      {/* Negative margin to overlap with HeroSection for seamless transition */}
      <div className="absolute inset-0 -mt-16 z-0">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/section-bg/features-section-bg.webp"
            alt="Van Gogh's Wheatfield with Crows"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Overlay to improve text readability */}
        </div>

        {/* Gradient transitions */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full mb-4 border border-white/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Van Gogh Style AI Creation
            </h2>
          </motion.div>
          <p className="text-xl text-white/90 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
            Transform your ideas into unique digital collectibles with AI
            fine-tuned on Vincent van Gogh's masterpieces.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
