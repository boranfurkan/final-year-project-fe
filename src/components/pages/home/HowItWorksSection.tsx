'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Image as ImageIcon, Wallet, Check } from 'lucide-react';
import { HOW_IT_WORKS_STEPS, COLORS } from '@/data/general';
import Image from 'next/image';

const iconComponents = {
  MessageSquare: MessageSquare,
  Image: ImageIcon,
  Wallet: Wallet,
  Check: Check,
};

const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative py-24 text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -mt-16 z-0">
        <Image
          src="/images/how-it-works-section-bg.jpeg"
          alt="Van Gogh landscape with sun"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Gradient transitions */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full border border-[#F3CC3E]/30"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-xl bg-black/30 backdrop-blur-sm p-4 rounded-lg"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Four simple steps to transform your ideas into Van Gogh-style
            blockchain assets
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="order-2 lg:order-1" // Reverse order on mobile
          >
            <div className="flex flex-col gap-8">
              {HOW_IT_WORKS_STEPS.map((step, index) => {
                const IconComponent =
                  iconComponents[step.icon as keyof typeof iconComponents];

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className={`flex gap-4 p-5 rounded-lg cursor-pointer transition-all duration-300
                      ${
                        index === activeStep
                          ? 'bg-black/50 border border-[#F3CC3E]/30 shadow-lg shadow-black/20'
                          : 'bg-black/30 border-transparent border hover:bg-black/40 backdrop-blur-sm'
                      }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div
                      className={`bg-gradient-to-r ${step.color} p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0 shadow-md`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 flex items-center text-[#F3CC3E]">
                        <span className="opacity-70 mr-2">{index + 1}.</span>{' '}
                        {step.title}
                      </h3>
                      <p className="text-white/90">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="aspect-square md:aspect-video w-full rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 shadow-2xl">
              {/* Decorative frame */}
              <div className="absolute -inset-1 border-2 border-[#F3CC3E]/20 rounded-xl z-0 pointer-events-none" />

              {HOW_IT_WORKS_STEPS.map((step, index) => (
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
                  <div
                    className={`w-full h-full ${
                      index === activeStep ? 'block' : 'hidden'
                    } rounded-lg bg-gradient-to-br ${
                      step.color
                    } opacity-80 flex items-center justify-center text-2xl font-bold relative overflow-hidden`}
                  >
                    {/* Create Van Gogh-style swirls as decorative elements */}
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full border-4 border-white/20 opacity-20"
                        style={{
                          width: `${Math.random() * 100 + 50}px`,
                          height: `${Math.random() * 100 + 50}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: Math.random() * 20 + 10,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    ))}

                    <div className="relative z-10 bg-black/50 p-4 rounded-lg backdrop-blur-sm text-white border border-white/10">
                      <span className="block text-center">
                        Step {index + 1}:
                      </span>
                      <span>{step.title}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="absolute bottom-4 left-4 right-4 flex justify-between z-10">
                <div className="flex gap-2">
                  {HOW_IT_WORKS_STEPS.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-3 h-3 rounded-full border ${
                        index === activeStep
                          ? 'bg-[#F3CC3E] border-[#F3CC3E]'
                          : 'bg-white/30 border-white/50'
                      }`}
                      onClick={() => setActiveStep(index)}
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-0 right-0 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${COLORS.gradient.blueYellow}`}
                initial={{ width: '0%' }}
                animate={{
                  width: `${
                    ((activeStep + 1) / HOW_IT_WORKS_STEPS.length) * 100
                  }%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative sun rays mimicking the painting */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute origin-top-right bg-[#F3CC3E]/10"
            style={{
              top: '15%',
              right: '15%',
              height: '200px',
              width: '3px',
              transform: `rotate(${i * 45}deg)`,
              transformOrigin: 'top',
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              height: ['180px', '220px', '180px'],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
