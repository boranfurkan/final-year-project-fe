'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, Coins, Zap, Link, Shield } from 'lucide-react';

const features = [
  {
    icon: <Cpu className="h-6 w-6" />,
    title: 'Advanced AI Generation',
    description:
      'Our AI models are trained on thousands of NFT collections to create unique artwork with your prompt.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Multiple Styles',
    description:
      'Choose from various NFT styles including pixel art, 3D renders, hand-drawn illustrations, and more.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: 'Multi-Chain Support',
    description:
      'Mint your creation on Ethereum, Solana, or Sui blockchain with just a few clicks.',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Instant Generation',
    description:
      'Get your NFT artwork in seconds, no waiting or complicated setup required.',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: <Link className="h-6 w-6" />,
    title: 'Decentralized Storage',
    description:
      'Your NFT metadata and artwork are securely stored on decentralized storage solutions.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Full Ownership',
    description:
      'You retain 100% ownership of all generated assets with verifiable on-chain provenance.',
    color: 'from-indigo-500 to-purple-500',
  },
];

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}> = ({ icon, title, description, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/60 transition-all duration-300"
    >
      <div className={`bg-gradient-to-r ${color} p-3 rounded-lg w-fit mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <div className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0 C30,40 70,40 100,0 L100,100 L0,100 Z"
            fill="url(#gradient1)"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7928CA" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF0080" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,100 C30,60 70,60 100,100 L100,0 L0,0 Z"
            fill="url(#gradient1)"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
              y: [0, 5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered NFT Creation
          </h2>
          <p className="text-xl text-gray-400">
            Transform your ideas into unique digital collectibles with
            cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
