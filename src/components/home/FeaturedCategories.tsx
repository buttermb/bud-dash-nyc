/**
 * Featured Categories Section
 * Quick access to different product categories
 */

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Cookie, Droplets, Wind, Cigarette, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'flower',
    name: 'Flower',
    icon: Leaf,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
    desc: 'Premium flower strains',
    count: 12
  },
  {
    id: 'edibles',
    name: 'Edibles',
    icon: Cookie,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950',
    desc: 'Gummies & treats',
    count: 8
  },
  {
    id: 'concentrates',
    name: 'Concentrates',
    icon: Droplets,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
    desc: 'High-potency extracts',
    count: 15
  },
  {
    id: 'vapes',
    name: 'Vapes',
    icon: Wind,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
    desc: 'Cartridges & disposables',
    count: 10
  },
  {
    id: 'pre-rolls',
    name: 'Pre-Rolls',
    icon: Cigarette,
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
    desc: 'Ready to enjoy',
    count: 6
  }
];

export function FeaturedCategories() {
  const scrollToCategory = (category: string) => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    // Could trigger category filter here
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-12 md:py-16 bg-muted/30"
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground">
            Explore our carefully curated selection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-lg transition-all overflow-hidden group"
                  onClick={() => scrollToCategory(category.id)}
                >
                  <div className={cn('p-6 text-center space-y-3', category.bgColor)}>
                    <div className={cn('w-16 h-16 mx-auto rounded-full bg-gradient-to-r flex items-center justify-center', category.color)}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {category.count} items
                      </p>
                    </div>
                    <Button size="sm" variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Shop <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

