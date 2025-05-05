'use client';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

import { HOW_IT_WORKS_STEPS } from '@/data/general';
import useWindowSize from '@/hooks/useWindowSize';

const HowItWorksSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { isMobile } = useWindowSize();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const timelineProgress = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9],
    ['0%', '33%', '66%', '100%']
  );

  // Create refs at the top level
  const stepRef0 = useRef(null);
  const stepRef1 = useRef(null);
  const stepRef2 = useRef(null);
  const stepRef3 = useRef(null);
  const stepRefs = [stepRef0, stepRef1, stepRef2, stepRef3];

  // Create transform values at the top level
  const scale0 = useTransform(
    scrollYProgress,
    [0 * 0.25 - 0.1, 0 * 0.25, (0 + 1) * 0.25, (0 + 1) * 0.25 + 0.1],
    [0.8, 1, 1, 0.8]
  );
  const scale1 = useTransform(
    scrollYProgress,
    [1 * 0.25 - 0.1, 1 * 0.25, (1 + 1) * 0.25, (1 + 1) * 0.25 + 0.1],
    [0.8, 1, 1, 0.8]
  );
  const scale2 = useTransform(
    scrollYProgress,
    [2 * 0.25 - 0.1, 2 * 0.25, (2 + 1) * 0.25, (2 + 1) * 0.25 + 0.1],
    [0.8, 1, 1, 0.8]
  );
  const scale3 = useTransform(
    scrollYProgress,
    [3 * 0.25 - 0.1, 3 * 0.25, (3 + 1) * 0.25, (3 + 1) * 0.25 + 0.1],
    [0.8, 1, 1, 0.8]
  );

  const opacity0 = useTransform(
    scrollYProgress,
    [0 * 0.25 - 0.1, 0 * 0.25, (0 + 1) * 0.25, (0 + 1) * 0.25 + 0.1],
    [0.3, 1, 1, 0.3]
  );
  const opacity1 = useTransform(
    scrollYProgress,
    [1 * 0.25 - 0.1, 1 * 0.25, (1 + 1) * 0.25, (1 + 1) * 0.25 + 0.1],
    [0.3, 1, 1, 0.3]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [2 * 0.25 - 0.1, 2 * 0.25, (2 + 1) * 0.25, (2 + 1) * 0.25 + 0.1],
    [0.3, 1, 1, 0.3]
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [3 * 0.25 - 0.1, 3 * 0.25, (3 + 1) * 0.25, (3 + 1) * 0.25 + 0.1],
    [0.3, 1, 1, 0.3]
  );

  const backgroundColor0 = useTransform(
    scrollYProgress,
    [0 * 0.25, 0 * 0.25 + 0.01],
    ['#000', HOW_IT_WORKS_STEPS[0].color]
  );
  const backgroundColor1 = useTransform(
    scrollYProgress,
    [1 * 0.25, 1 * 0.25 + 0.01],
    ['#000', HOW_IT_WORKS_STEPS[1].color]
  );
  const backgroundColor2 = useTransform(
    scrollYProgress,
    [2 * 0.25, 2 * 0.25 + 0.01],
    ['#000', HOW_IT_WORKS_STEPS[2].color]
  );
  const backgroundColor3 = useTransform(
    scrollYProgress,
    [3 * 0.25, 3 * 0.25 + 0.01],
    ['#000', HOW_IT_WORKS_STEPS[3].color]
  );

  const borderColor0 = useTransform(
    scrollYProgress,
    [0 * 0.25, 0 * 0.25 + 0.01],
    ['rgba(255,255,255,0.3)', HOW_IT_WORKS_STEPS[0].accentColor]
  );
  const borderColor1 = useTransform(
    scrollYProgress,
    [1 * 0.25, 1 * 0.25 + 0.01],
    ['rgba(255,255,255,0.3)', HOW_IT_WORKS_STEPS[1].accentColor]
  );
  const borderColor2 = useTransform(
    scrollYProgress,
    [2 * 0.25, 2 * 0.25 + 0.01],
    ['rgba(255,255,255,0.3)', HOW_IT_WORKS_STEPS[2].accentColor]
  );
  const borderColor3 = useTransform(
    scrollYProgress,
    [3 * 0.25, 3 * 0.25 + 0.01],
    ['rgba(255,255,255,0.3)', HOW_IT_WORKS_STEPS[3].accentColor]
  );

  // Group the transforms for easier access
  const scales = [scale0, scale1, scale2, scale3];
  const opacities = [opacity0, opacity1, opacity2, opacity3];
  const backgroundColors = [
    backgroundColor0,
    backgroundColor1,
    backgroundColor2,
    backgroundColor3,
  ];
  const borderColors = [borderColor0, borderColor1, borderColor2, borderColor3];

  const handleStepSelect = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div ref={containerRef} className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-bg/how-it-works-section-bg.jpeg"
          alt="Van Gogh Inspired Landscape"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      {/* Gradient transitions */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black" />
      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block relative">
              How It Works
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#F3CC3E] to-amber-300" /* Updated gradient color */
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 bg-black/30 backdrop-blur-sm p-4 rounded-lg max-w-2xl mx-auto" /* Added bg styling like FeaturesSection */
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Four simple steps to transform your ideas into Van Gogh-style
            blockchain assets
          </motion.p>
        </motion.div>

        {/* Desktop Experience - Interactive Timeline */}
        {!isMobile && (
          <div className="hidden md:block">
            {/* Timeline track */}
            <div className="relative h-1 bg-white/10 rounded-full mb-16 mx-auto max-w-4xl">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F3CC3E] to-amber-300 rounded-full" /* Updated to match painting yellow */
                style={{ width: timelineProgress }}
              />

              {/* Timeline nodes */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between">
                {HOW_IT_WORKS_STEPS.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="relative cursor-pointer group"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleStepSelect(index)}
                  >
                    <motion.div
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center relative z-10"
                      style={{
                        backgroundColor: backgroundColors[index],
                        borderColor: borderColors[index],
                      }}
                    >
                      <span className="text-white text-sm font-bold">
                        {step.id}
                      </span>

                      {/* Label */}
                      <motion.span
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: step.accentColor }}
                      >
                        {step.title}
                      </motion.span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Steps content */}
            <div className="grid grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <motion.div
                  ref={stepRefs[index]}
                  key={step.id}
                  style={{
                    scale: scales[index],
                    opacity: opacities[index],
                    order: index % 2 === 0 ? index * 2 : index * 2 + 1,
                  }}
                  className="min-h-[300px] flex flex-col justify-center"
                >
                  {index % 2 === 0 ? (
                    // Content side (left columns)
                    <motion.div
                      className="p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-all duration-300" /* Updated to match FeaturesSection */
                      whileHover={{
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.h3
                        className="text-2xl font-bold mb-4 flex items-center gap-3"
                        style={{ color: step.accentColor }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="opacity-70">{step.id}.</span>{' '}
                        {step.title}
                      </motion.h3>
                      <motion.p
                        className="text-white/90" /* Updated to match FeaturesSection */
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {step.description}
                      </motion.p>
                    </motion.div>
                  ) : (
                    // Visual side (right columns)
                    <motion.div
                      className="aspect-square max-w-[300px] mx-auto relative overflow-hidden"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-3xl overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${step.color}88, ${step.color}44)`,
                          borderRadius: '60% 40% 50% 50% / 40% 50% 50% 60%',
                        }}
                        animate={{
                          borderRadius: [
                            '60% 40% 50% 50% / 40% 50% 50% 60%',
                            '40% 60% 70% 30% / 50% 60% 40% 50%',
                            '60% 40% 50% 50% / 40% 50% 50% 60%',
                          ],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      >
                        {/* Swirls effect */}
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={`swirl-${step.id}-${i}`}
                            className="absolute border-2 rounded-full"
                            style={{
                              borderColor: step.accentColor,
                              width: `${30 + i * 20}%`,
                              height: `${30 + i * 20}%`,
                              left: '50%',
                              top: '50%',
                              x: '-50%',
                              y: '-50%',
                              opacity: 0.2,
                            }}
                            animate={{
                              rotate: [0, 360],
                              opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                              duration: 10 + i * 5,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                        ))}

                        {/* Icon */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center text-white"
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <div className="w-20 h-20">{step.icon}</div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Reversed order for odd indexes */}
              {HOW_IT_WORKS_STEPS.map((step, index) => {
                if (index % 2 !== 0) return null;

                return (
                  <motion.div
                    key={`visual-${step.id}`}
                    style={{
                      scale: scales[index],
                      opacity: opacities[index],
                      order: index * 2,
                    }}
                    className="min-h-[300px] flex flex-col justify-center"
                  >
                    <motion.div
                      className="aspect-square max-w-[300px] mx-auto relative overflow-hidden"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-3xl overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${step.color}88, ${step.color}44)`,
                          borderRadius: '60% 40% 50% 50% / 40% 50% 50% 60%',
                        }}
                        animate={{
                          borderRadius: [
                            '60% 40% 50% 50% / 40% 50% 50% 60%',
                            '40% 60% 70% 30% / 50% 60% 40% 50%',
                            '60% 40% 50% 50% / 40% 50% 50% 60%',
                          ],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      >
                        {/* Swirls effect */}
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={`swirl-${step.id}-${i}`}
                            className="absolute border-2 rounded-full"
                            style={{
                              borderColor: step.accentColor,
                              width: `${30 + i * 20}%`,
                              height: `${30 + i * 20}%`,
                              left: '50%',
                              top: '50%',
                              x: '-50%',
                              y: '-50%',
                              opacity: 0.2,
                            }}
                            animate={{
                              rotate: [0, 360],
                              opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                              duration: 10 + i * 5,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                        ))}

                        {/* Icon */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center text-white"
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <div className="w-20 h-20">{step.icon}</div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {HOW_IT_WORKS_STEPS.map((step, index) => {
                if (index % 2 === 0) return null;

                return (
                  <motion.div
                    key={`content-${step.id}`}
                    style={{
                      scale: scales[index],
                      opacity: opacities[index],
                      order: index * 2 + 1,
                    }}
                    className="min-h-[300px] flex flex-col justify-center"
                  >
                    <motion.div
                      className="p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-all duration-300" /* Updated to match FeaturesSection */
                      whileHover={{
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.h3
                        className="text-2xl font-bold mb-4 flex items-center gap-3"
                        style={{ color: step.accentColor }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="opacity-70">{step.id}.</span>{' '}
                        {step.title}
                      </motion.h3>
                      <motion.p
                        className="text-white/90"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {step.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile Experience - Interactive Cards */}
        {isMobile && (
          <div className="md:hidden">
            {/* Step selector */}
            <div className="flex justify-center mb-8 gap-3">
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <button
                  key={`mobile-selector-${step.id}`}
                  onClick={() => handleStepSelect(index)}
                  className="relative w-8 h-8 flex items-center justify-center"
                  aria-label={`Go to step ${step.id}`}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor:
                        currentStep === index ? step.color : 'transparent',
                      borderColor:
                        currentStep === index
                          ? step.accentColor
                          : 'rgba(255,255,255,0.3)',
                      borderWidth: 2,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white text-sm font-bold">
                      {step.id}
                    </span>
                  </motion.div>

                  {currentStep === index && (
                    <motion.div
                      layoutId="mobileActiveStep"
                      className="absolute -bottom-2 w-4 h-1 rounded-full bg-white"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile card carousel */}
            <div className="relative h-[500px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`mobile-step-${currentStep}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 p-4"
                >
                  <div className="h-full flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                    <div
                      className="p-6 border-b border-white/10 flex items-center gap-4"
                      style={{
                        background: `linear-gradient(to right, ${HOW_IT_WORKS_STEPS[currentStep].color}33, transparent)`,
                      }}
                    >
                      <div
                        className="w-12 h-12 min-w-12 min-h-12 aspect-square rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor:
                            HOW_IT_WORKS_STEPS[currentStep].color,
                        }}
                      >
                        <div className="w-6 h-6 text-white min-h-6 min-w-6">
                          {HOW_IT_WORKS_STEPS[currentStep].icon}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium opacity-70">
                          Step {HOW_IT_WORKS_STEPS[currentStep].id}
                        </div>
                        <h3
                          className="text-xl font-bold"
                          style={{
                            color: HOW_IT_WORKS_STEPS[currentStep].accentColor,
                          }}
                        >
                          {HOW_IT_WORKS_STEPS[currentStep].title}
                        </h3>
                      </div>
                    </div>
                    {/* Step content */}
                    <div className="flex-1 p-6 flex flex-col">
                      <p className="text-white/90">
                        {HOW_IT_WORKS_STEPS[currentStep].description}
                      </p>

                      {/* Visual element */}
                      <div className="flex-1 flex items-center justify-center">
                        <motion.div
                          className="relative w-3/4 aspect-square"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${HOW_IT_WORKS_STEPS[currentStep].color}88, ${HOW_IT_WORKS_STEPS[currentStep].color}44)`,
                            }}
                            animate={{
                              borderRadius: [
                                '60% 40% 50% 50% / 40% 50% 50% 60%',
                                '40% 60% 70% 30% / 50% 60% 40% 50%',
                                '60% 40% 50% 50% / 40% 50% 50% 60%',
                              ],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              repeatType: 'reverse',
                            }}
                          >
                            {/* Swirls effect */}
                            {Array.from({ length: 3 }).map((_, i) => (
                              <motion.div
                                key={`mobile-swirl-${i}`}
                                className="absolute border-2 rounded-full"
                                style={{
                                  borderColor:
                                    HOW_IT_WORKS_STEPS[currentStep].accentColor,
                                  width: `${40 + i * 20}%`,
                                  height: `${40 + i * 20}%`,
                                  left: '50%',
                                  top: '50%',
                                  x: '-50%',
                                  y: '-50%',
                                  opacity: 0.2,
                                }}
                                animate={{
                                  rotate: [0, 360],
                                  opacity: [0.1, 0.3, 0.1],
                                }}
                                transition={{
                                  duration: 10 + i * 5,
                                  repeat: Infinity,
                                  ease: 'linear',
                                }}
                              />
                            ))}

                            {/* Centered icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 text-white">
                                {HOW_IT_WORKS_STEPS[currentStep].icon}
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                    {/* Navigation buttons */}
                    <div className="p-4 border-t border-white/10 flex justify-between">
                      <button
                        onClick={() =>
                          setCurrentStep(
                            (prev) =>
                              (prev - 1 + HOW_IT_WORKS_STEPS.length) %
                              HOW_IT_WORKS_STEPS.length
                          )
                        }
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        Previous
                      </button>

                      <button
                        onClick={() =>
                          setCurrentStep(
                            (prev) => (prev + 1) % HOW_IT_WORKS_STEPS.length
                          )
                        }
                        className="px-4 py-2 rounded-lg"
                        style={{
                          backgroundColor:
                            HOW_IT_WORKS_STEPS[currentStep].color,
                        }}
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HowItWorksSection;
