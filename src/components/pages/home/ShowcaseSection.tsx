'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FEATURED_CREATIONS } from '@/data/general';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import { getChainIcon } from '@/lib/getChainIcon';

const ShowcaseSection: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -10,
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative py-24 text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -mt-16 z-0">
        <Image
          src="/images/showcase-section-bg.png"
          alt="Van Gogh's Red Vineyard"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Gradient transitions */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-red-500/30"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-red-500">
              Featured Van Gogh Creations
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl bg-black/40 backdrop-blur-sm p-4 rounded-lg"
          >
            Explore stunning AI-generated artworks created in Vincent van Gogh's
            iconic style
          </motion.p>
        </motion.div>

        {/* Embla Carousel */}
        <div className="overflow-hidden">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {FEATURED_CREATIONS.map((nft) => (
                <motion.div
                  key={nft.id}
                  className="embla__slide flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] p-2"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl h-full transform transition-transform duration-300">
                    <div className="aspect-square relative overflow-hidden">
                      {/* Decorative frame */}
                      <div className="absolute inset-2 border border-yellow-500/20 rounded-lg z-10 pointer-events-none" />

                      {/* Gradient overlay to match painting colors */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-yellow-500/10 z-10" />

                      {/* This would be replaced with actual NFT images */}
                      <div className="w-full h-full bg-gradient-to-br from-red-600 via-yellow-600 to-red-700 flex items-center justify-center relative">
                        <span className="font-bold text-white text-xl z-20 bg-black/40 px-4 py-2 rounded">
                          {nft.title}
                        </span>

                        {/* Add Van Gogh-style brushstrokes as decoration */}
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute bg-white/10"
                            style={{
                              height: `${Math.random() * 3 + 1}px`,
                              width: `${Math.random() * 30 + 20}px`,
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              transform: `rotate(${Math.random() * 180}deg)`,
                            }}
                          />
                        ))}
                      </div>

                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs flex items-center gap-1 z-20 border border-white/10">
                        <div className="w-3 h-3 relative">
                          {getChainIcon(nft.chainTicker, {
                            size: 12,
                          })}
                        </div>
                        <span>{nft.chain}</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-1 text-yellow-400">
                        {nft.title}
                      </h3>
                      <p className="text-white/90 text-sm mb-3 line-clamp-2 italic">
                        "{nft.prompt}"
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/70">By: {nft.creator}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1 bg-red-600/20 hover:bg-red-600/40 px-2 py-1 rounded text-white/90 border border-red-500/30"
                        >
                          <span>View</span>
                          <ExternalLink className="h-3 w-3" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dots pagination */}
          <div className="flex justify-center mt-8 gap-2">
            {scrollSnaps.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full border ${
                  index === selectedIndex
                    ? 'bg-red-500 border-red-500'
                    : 'bg-white/30 border-white/50 hover:bg-white/50'
                }`}
                onClick={() => scrollTo(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                transition={{ duration: 0.2 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button className="bg-gradient-to-r from-red-600 to-yellow-600 hover:opacity-90 text-white px-8 py-6">
              Browse Gallery
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Decorative elements inspired by the painting */}
      <div className="absolute bottom-0 left-0 w-full h-20 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-red-500/10"
            style={{
              height: `${Math.random() * 5 + 2}px`,
              width: `${Math.random() * 40 + 30}px`,
              bottom: `${Math.random() * 20}px`,
              left: `${i * 5}%`,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
            }}
            animate={{
              x: [0, Math.random() * 20 - 10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowcaseSection;
