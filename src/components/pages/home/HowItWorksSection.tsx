'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Image, Wallet, Check } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Create Your Prompt',
    description:
      'Describe your vision in detail. The more specific your prompt, the better the result.',
    color: 'from-purple-500 to-blue-500',
    image: '/step1.png', // Replace with actual image paths
  },
  {
    icon: <Image className="h-6 w-6" />,
    title: 'AI Generates Artwork',
    description:
      'Our AI system transforms your prompt into unique NFT-style artwork in seconds.',
    color: 'from-blue-500 to-cyan-500',
    image: '/step2.png',
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'Choose Blockchain & Mint',
    description:
      'Select Ethereum, Solana, or Sui blockchain and mint your artwork as an NFT with one click.',
    color: 'from-cyan-500 to-green-500',
    image: '/step3.png',
  },
  {
    icon: <Check className="h-6 w-6" />,
    title: 'Own Your Creation',
    description:
      'Your NFT is now on the blockchain. View, share, or sell it on your favorite marketplace.',
    color: 'from-green-500 to-emerald-500',
    image: '/step4.png',
  },
];

const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="py-24 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-400">
            Four simple steps to transform your ideas into blockchain assets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-col gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300
                    ${
                      index === activeStep
                        ? 'bg-white/10 border border-white/20'
                        : 'hover:bg-white/5'
                    }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div
                    className={`bg-gradient-to-r ${step.color} p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 flex items-center">
                      <span className="opacity-50 mr-2">{index + 1}.</span>{' '}
                      {step.title}
                    </h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeStep === index ? 1 : 0,
                    scale: activeStep === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center p-6"
                >
                  {/* Replace the div below with an Image component showing your mockup */}
                  <div
                    className={`w-full h-full ${
                      index === activeStep ? 'block' : 'hidden'
                    } 
                      rounded-lg bg-gradient-to-br ${
                        step.color
                      } opacity-80 flex items-center justify-center text-2xl font-bold`}
                  >
                    {/* This is a placeholder for step {index + 1} image */}
                    {/* When you have actual images, replace this div with your Image component */}
                    <span className="bg-black/30 p-4 rounded-lg">
                      Step {index + 1} Preview
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* UI Elements over the image */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === activeStep ? 'bg-white' : 'bg-white/30'
                      }`}
                      onClick={() => setActiveStep(index)}
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute -bottom-6 left-0 right-0 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: '0%' }}
                animate={{
                  width: `${((activeStep + 1) / steps.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
