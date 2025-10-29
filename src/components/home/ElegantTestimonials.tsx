/**
 * Elegant Testimonials Section
 * Refined, not "Reviews" - sophisticated client experiences
 */

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Exceptional quality and service. The delivery was prompt, discreet, and professional. The flower exceeded expectations.',
    author: 'Michael R.',
    location: 'Manhattan',
  },
  {
    quote: 'Outstanding experience from start to finish. Lab-verified quality gives me complete confidence in every purchase.',
    author: 'Sarah L.',
    location: 'Brooklyn',
  },
  {
    quote: 'The attention to detail is remarkable. Unmatched professionalism and the finest product selection in NYC.',
    author: 'David K.',
    location: 'Queens',
  },
];

export function ElegantTestimonials() {
  return (
    <section className="py-24 md:py-32 bg-neutral-900">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="text-sm text-emerald-600 font-light tracking-widest uppercase mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-white mb-6 tracking-tight">
            Client Experiences
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 md:p-10 bg-neutral-800 hover:bg-neutral-750 transition-colors duration-300 border border-neutral-700"
            >
              
              {/* Quote Mark */}
              <div className="text-6xl text-emerald-400/20 font-serif mb-4">"</div>
              
              <p className="text-neutral-300 text-lg font-light leading-relaxed mb-8">
                {testimonial.quote}
              </p>
              
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-700">
                  <div className="w-12 h-12 rounded-full bg-neutral-700" />
                  <div>
                    <div className="text-white font-light">{testimonial.author}</div>
                    <div className="text-sm text-neutral-400 font-light">{testimonial.location}</div>
                  </div>
                </div>
            </motion.div>
          ))}
        </div>
        
        {/* Subtle Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-neutral-400"
        >
          <div className="text-center">
            <div className="text-3xl text-emerald-600 font-light mb-2">★★★★★</div>
            <div className="text-sm font-light">Rated 4.9/5</div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-neutral-600" />
          <div className="md:hidden w-24 h-px bg-neutral-600" />
          
          <div className="text-center">
            <div className="text-3xl text-white font-light mb-2">5,000+</div>
            <div className="text-sm font-light">Satisfied Clients</div>
          </div>
                  
          <div className="hidden md:block w-px h-12 bg-neutral-600" />
          <div className="md:hidden w-24 h-px bg-neutral-600" />
                  
                  <div className="text-center">
                    <div className="text-3xl text-white font-light mb-2">Licensed</div>
            <div className="text-sm font-light">NYS Approved</div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

