/**
 * Subtle Notification Component
 * Appears after 30 seconds, easily dismissible
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function SubtleNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already dismissed
    const dismissed = localStorage.getItem('notificationDismissed');
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('notificationDismissed', 'true');
  };

  const handleShopNow = () => {
    navigate('/menu');
    handleDismiss();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-50 max-w-sm"
        >
          <div className="bg-white shadow-2xl rounded-lg p-6 border border-neutral-200 relative">
            
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Dismiss notification"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            
            <div className="pr-6">
              <h4 className="text-lg text-neutral-900 font-light mb-2">
                Welcome Offer
              </h4>
              <p className="text-neutral-600 text-sm font-light leading-relaxed mb-4">
                First-time customers receive complimentary delivery 
                on orders over $75.
              </p>
              <button
                onClick={handleShopNow}
                className="px-6 py-2 bg-neutral-900 text-white text-sm font-light hover:bg-emerald-600 transition-colors"
              >
                Shop Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

