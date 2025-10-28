/**
 * Flash Sale Banner
 * Highlights special deals and limited-time offers
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FlashSale() {
  const navigate = useNavigate();
  const saleEnds = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-12 md:py-16"
    >
      <div className="container px-4 mx-auto">
        <div className="bg-background/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-background/20 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Badge variant="destructive" className="bg-red-500">
                  <Sparkles className="h-3 w-3 mr-1" />
                  FLASH SALE
                </Badge>
                <Badge variant="outline" className="bg-background/20">
                  <Clock className="h-3 w-3 mr-1" />
                  Ends in 24hrs
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                🎉 Up to 25% Off This Week!
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Premium quality. Lightning-fast delivery. Exclusive deals for new and returning customers.
              </p>
              <Button 
                size="lg" 
                onClick={() => {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="hidden md:block text-6xl">🔥</div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

