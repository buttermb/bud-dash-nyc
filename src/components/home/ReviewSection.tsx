/**
 * Review Section with Database Integration
 * Real customer reviews with ability to add your own
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  };
}

export function ReviewSection() {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['home-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (full_name, avatar_url)
        `)
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) throw error;
      return data as Review[];
    },
  });

  // Submit review mutation
  const submitReview = useMutation({
    mutationFn: async () => {
      if (!profile) throw new Error('Please sign in to leave a review');
      if (!comment.trim()) throw new Error('Please write a review');

      const { data, error } = await supabase
        .from('reviews')
        .insert({
          product_id: null, // General platform review
          user_id: profile.user_id,
          rating,
          comment: comment.trim(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Review submitted successfully!');
      setComment('');
      setRating(5);
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ['home-reviews'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit review');
    },
  });

  return (
    <section className="py-24 md:py-32 bg-neutral-900">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="text-sm text-emerald-400 font-light tracking-widest uppercase mb-4">
            Customer Reviews
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-white mb-6 tracking-tight">
            What Clients Are Saying
          </h2>
          
          {/* Add Review Button */}
          {profile && (
            <Button
              onClick={() => setShowForm(!showForm)}
              className="mt-6 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-light tracking-wide transition-all"
            >
              {showForm ? 'Cancel' : '+ Add Your Review'}
            </Button>
          )}
        </motion.div>

        {/* Review Form */}
        {showForm && profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-8 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-2xl"
          >
            <h3 className="text-2xl text-white font-light mb-6">Write a Review</h3>
            
            {/* Star Rating */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-white/60 font-light">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'fill-emerald-500 text-emerald-500'
                        : 'fill-neutral-700 text-neutral-700'
                    }`}
                  />
                </button>
              ))}
              <span className="text-white/40 text-sm ml-2">{rating} out of 5</span>
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full h-32 px-4 py-3 bg-black/50 border border-white/[0.1] text-white placeholder-white/30 rounded-lg focus:outline-none focus:border-emerald-500/50 transition-colors resize-none font-light"
            />

            <div className="flex gap-4 mt-6">
              <Button
                onClick={() => submitReview.mutate()}
                disabled={submitReview.isPending || !comment.trim()}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-light"
              >
                {submitReview.isPending ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button
                onClick={() => {
                  setShowForm(false);
                  setComment('');
                  setRating(5);
                }}
                variant="outline"
                className="px-8 py-3 border-white/20 text-white hover:bg-white/5 font-light"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.length === 0 ? (
            <div className="col-span-full text-center py-16 text-white/40">
              <p className="font-light">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 border border-white/[0.05] rounded-xl backdrop-blur-sm"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i <= review.rating
                          ? 'fill-emerald-500 text-emerald-500'
                          : 'fill-neutral-700 text-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-white/70 text-sm font-light leading-relaxed mb-4">
                  {review.comment}
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                    {review.profiles?.full_name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <div className="text-white text-xs font-light">
                      {review.profiles?.full_name || 'Anonymous'}
                    </div>
                    <div className="text-xs text-white/40 font-light">
                      {new Date(review.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-neutral-400"
        >
          <div className="text-center">
            <div className="text-3xl text-emerald-600 font-light mb-2">★★★★★</div>
            <div className="text-sm font-light">Verified Reviews</div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-neutral-600" />
          <div className="md:hidden w-24 h-px bg-neutral-600" />
          
          <div className="text-center">
            <div className="text-3xl text-white font-light mb-2">{reviews.length}+</div>
            <div className="text-sm font-light">Total Reviews</div>
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

