/**
 * Premium Sophisticated Hero Section
 * Elegant, minimal, premium design for cannabis delivery
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

export function PremiumHero() {
  const scrollToProducts = (filterType?: string) => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
      
      // Set filter in localStorage and trigger filter event
      if (filterType) {
        localStorage.setItem('productFilter', filterType);
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('setProductFilter', { 
            detail: { filter: filterType } 
          }));
        }, 500);
      }
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] bg-black overflow-hidden">
      
      {/* Sophisticated Gradient Background with Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-emerald-950"
      />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-slow"
          style={{animationDelay: '1s'}}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse-slow"
          style={{animationDelay: '2s'}}
        />
        
        {/* Grid overlay - subtle */}
        <div 
          className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px]"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          
          {/* Subtle Badge - Not flashy */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="text-white/80 text-xs sm:text-sm font-light tracking-wide">
              Licensed & Trusted in NYC
            </span>
          </motion.div>
          
          {/* Refined Headline with Enhanced Stagger Animation & Premium Typography */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="overflow-hidden"
          >
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-extralight text-white mb-4 sm:mb-6 leading-[0.92] tracking-[-0.02em] font-display">
              {/* Premium - With gradient and glow effect */}
              <motion.span
                initial={{ opacity: 0, y: 80, clipPath: "inset(0 100% 0 0)" }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  clipPath: "inset(0 0% 0 0)"
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.4, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="block font-extralight tracking-wider relative font-display"
              >
                <span className="relative z-10 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  Premium
                </span>
                <motion.span
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
                />
              </motion.span>
              
              <br />
              
              {/* Flower - Animated italic with gradient */}
              <motion.span
                initial={{ opacity: 0, x: -50, rotateY: -90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ 
                  duration: 1.0, 
                  delay: 0.9, 
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="block font-light italic tracking-normal relative font-display"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300 bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Flower
                </motion.span>
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="absolute inset-0 bg-emerald-400/20 blur-xl"
                />
              </motion.span>
              
              <br />
              
              {/* Delivered - Subtle fade with elegant motion */}
              <motion.span
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  filter: "blur(0px)"
                }}
                transition={{ 
                  duration: 1.1, 
                  delay: 1.4, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="block text-4xl sm:text-6xl md:text-8xl font-extralight text-white/70 tracking-tight relative group font-display"
              >
                <span className="relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">Delivered</span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.0, delay: 1.8, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-white/30 via-white/50 to-transparent"
                />
              </motion.span>
            </h1>
          </motion.div>
          
          {/* Elegant Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-white/60 mb-8 sm:mb-12 max-w-2xl font-light leading-relaxed"
          >
            Curated strains. Same-day delivery.
            <br />
            <span className="text-white/40 text-sm sm:text-base">Discreet service throughout Manhattan, Brooklyn, and Queens.</span>
          </motion.p>
          
          {/* Sophisticated Trust Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 text-white/40 text-xs sm:text-sm font-light"
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
                <Button
                  onClick={() => scrollToProducts('premium')}
                  className="group px-8 py-4 bg-neutral-100 text-neutral-900 font-light tracking-wide hover:bg-emerald-500 hover:text-white transition-all duration-300 h-auto shadow-lg hover:shadow-emerald-500/30"
                >
                  <span>Browse Collection</span>
                  <svg className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
            
            <Button
              variant="outline"
              onClick={scrollToProducts}
              className="px-8 py-4 border-2 border-white/30 text-white font-light tracking-wide hover:border-emerald-400 hover:text-emerald-400 hover:bg-white/5 transition-all duration-300 bg-white/5 backdrop-blur-sm h-auto"
            >
              View Menu
            </Button>
          </motion.div>
          
          {/* Subtle Social Proof */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
            className="mt-8 sm:mt-12 md:mt-16 inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10"
          >
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-black"
                />
              ))}
            </div>
            <div className="text-white/60 text-xs sm:text-sm font-light">
              Trusted by thousands across NYC
            </div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3, ease: "easeOut" }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
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


