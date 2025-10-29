/**
 * Subtle Activity Indicator
 * Displays minimal, elegant live activity updates
 */

import { motion } from 'framer-motion';

export function SubtleActivityIndicator() {
  return (
    <div className="bg-gradient-to-r from-neutral-900 via-black to-neutral-900 py-3 border-y border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-6 md:gap-8 text-sm text-white/40 font-light flex-wrap"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-slow" />
            <span>Manhattan delivery in progress</span>
          </div>
          
          <div className="hidden md:block w-px h-4 bg-white/10" />
          
          <div className="flex items-center gap-2">
            <motion.span 
              className="w-1.5 h-1.5 bg-emerald-400 rounded-full" 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
            />
            <span>Brooklyn delivery completed</span>
          </div>
          
          <div className="hidden md:block w-px h-4 bg-white/10" />
          
          <div className="flex items-center gap-2">
            <motion.span 
              className="w-1.5 h-1.5 bg-emerald-400 rounded-full" 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, delay: 1, repeat: Infinity }}
            />
            <span>Queens order confirmed</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

