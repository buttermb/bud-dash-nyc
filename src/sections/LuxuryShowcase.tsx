import { motion } from 'framer-motion'
import LuxuryProductCard from '@/components/luxury/LuxuryProductCard'

export default function LuxuryShowcase() {
  const products = [
    {
      name: "OG Kush",
      type: "Indica",
      description: "Classic West Coast strain with earthy pine notes",
      price: 45,
      rating: 4.9,
      reviews: 312,
      featured: true,
      image: "/products/og-kush.jpg"
    },
    {
      name: "Blue Dream",
      type: "Sativa",
      description: "Award-winning sativa with sweet berry aroma",
      price: 48,
      rating: 4.8,
      reviews: 189,
      image: "/products/blue-dream.jpg"
    },
    {
      name: "Wedding Cake",
      type: "Hybrid",
      description: "Rich vanilla tones with powerful effects",
      price: 52,
      rating: 4.8,
      reviews: 247,
      image: "/products/wedding-cake.jpg"
    }
  ]
  
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section header - ultra minimal */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-full">
            <span className="text-[10px] text-white/50 font-light tracking-[0.2em] uppercase">
              Curated Selection
            </span>
          </div>
          
          <h2 className="text-white font-light text-6xl md:text-7xl tracking-tight mb-6">
            Premium Flower
          </h2>
          
          <p className="text-white/40 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Hand-selected strains from licensed NYC cultivators. Each batch lab-verified for quality and consistency.
          </p>
        </motion.div>
        
        {/* Product grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <LuxuryProductCard {...product} />
            </motion.div>
          ))}
        </div>
        
        {/* View all - minimal */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a 
            href="#products" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-light tracking-wide transition-colors group"
          >
            <span>View Complete Collection</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
        
      </div>
    </section>
  )
}

