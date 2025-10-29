/**
 * Premium Sophisticated Hero Section
 * Elegant, minimal, premium design for cannabis delivery
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

export function PremiumHero() {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] bg-black overflow-hidden">
      
      {/* Sophisticated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-emerald-950 opacity-90" />
      
      {/* Elegant Floating Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Subtle Badge - Not flashy */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="text-white/80 text-sm font-light tracking-wide">
              Licensed & Trusted in NYC
            </span>
          </motion.div>
          
          {/* Refined Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-9xl font-light text-white mb-6 leading-[0.95] tracking-tight"
          >
            Premium
            <br />
            <span className="font-light italic text-emerald-400">Flower</span>
            <br />
            <span className="text-4xl sm:text-6xl md:text-8xl text-white/60">Delivered</span>
          </motion.h1>
          
          {/* Elegant Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 mb-12 max-w-2xl font-light leading-relaxed"
          >
            Curated strains. Same-day delivery.
            <br />
            <span className="text-white/40">Discreet service throughout Manhattan, Brooklyn, and Queens.</span>
          </motion.p>
          
          {/* Sophisticated Trust Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-8 md:gap-12 mb-12 text-white/40 text-sm font-light"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Licensed</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Lab Verified</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              </div>
              <span>Discreet</span>
            </div>
          </motion.div>
          
          {/* Elegant CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button
              onClick={scrollToProducts}
              className="group px-8 py-4 bg-white text-black font-light tracking-wide hover:bg-emerald-400 transition-all duration-300 h-auto"
            >
              <span>Explore Collection</span>
              <svg className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            
            <Button
              variant="outline"
              onClick={scrollToProducts}
              className="px-8 py-4 border border-white/20 text-white font-light tracking-wide hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300 bg-transparent h-auto"
            >
              View Menu
            </Button>
          </motion.div>
          
          {/* Subtle Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            className="mt-12 md:mt-16 inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10"
          >
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-black"
                />
              ))}
            </div>
            <div className="text-white/60 text-sm font-light">
              Trusted by thousands across NYC
            </div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToProducts}
      >
        <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-emerald-400 rounded-full"
          />
        </div>
      </motion.div>
      
    </section>
  );
}


