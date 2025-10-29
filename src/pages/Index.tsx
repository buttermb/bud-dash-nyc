import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import GiveawayBanner from "@/components/GiveawayBanner";
import { SEOHead } from "@/components/SEOHead";
import { EnhancedLoadingState } from "@/components/EnhancedLoadingState";
import { PremiumHero } from "@/components/home/PremiumHero";
import { BackToTop } from "@/components/mobile/BackToTop";

// Lazy load non-critical components for better initial page load
const ProductCatalog = lazy(() => import("@/components/ProductCatalog"));
const Footer = lazy(() => import("@/components/Footer"));
const RecentPurchaseNotification = lazy(() => import("@/components/RecentPurchaseNotification"));
const ProductTrustElements = lazy(() => import("@/components/ProductTrustElements"));
const TrendingProducts = lazy(() => import("@/components/TrendingProducts"));
const InstallPWA = lazy(() => import("@/components/InstallPWA"));

// New Premium Homepage Components
const SubtleActivityIndicator = lazy(() => import("@/components/home/SubtleActivityIndicator").then(m => ({ default: m.SubtleActivityIndicator })));
const PremiumProductShowcase = lazy(() => import("@/components/home/PremiumProductShowcase").then(m => ({ default: m.PremiumProductShowcase })));
const WhyUs = lazy(() => import("@/components/home/WhyUs").then(m => ({ default: m.WhyUs })));
const ElegantTestimonials = lazy(() => import("@/components/home/ElegantTestimonials").then(m => ({ default: m.ElegantTestimonials })));
const SophisticatedHowItWorks = lazy(() => import("@/components/home/SophisticatedHowItWorks").then(m => ({ default: m.SophisticatedHowItWorks })));
const RefinedFAQ = lazy(() => import("@/components/home/RefinedFAQ").then(m => ({ default: m.RefinedFAQ })));
const SubtleNotification = lazy(() => import("@/components/home/SubtleNotification").then(m => ({ default: m.SubtleNotification })));
const ElegantFinalCTA = lazy(() => import("@/components/home/ElegantFinalCTA").then(m => ({ default: m.ElegantFinalCTA })));


const Index = () => {
  return (
    <>
      <SEOHead 
        title="Bud Dash NYC - Premium Cannabis Delivery | Manhattan, Brooklyn, Queens"
        description="Premium flower delivered with care. Curated strains. Same-day delivery. Discreet service throughout Manhattan, Brooklyn, and Queens."
      />
      <div className="min-h-screen pb-20 md:pb-0">
      <AgeVerificationModal />
      <Suspense fallback={null}>
        <RecentPurchaseNotification />
      </Suspense>
      <GiveawayBanner />
      <Navigation />
      
      {/* Premium Sophisticated Hero */}
      <PremiumHero />
      
      {/* Subtle Activity Indicator */}
      <Suspense fallback={null}>
        <SubtleActivityIndicator />
      </Suspense>
      
      {/* Premium Product Showcase */}
      <Suspense fallback={null}>
        <PremiumProductShowcase />
      </Suspense>

      {/* Why Us Section */}
      <Suspense fallback={null}>
        <WhyUs />
      </Suspense>

      {/* Elegant Testimonials */}
      <Suspense fallback={null}>
        <ElegantTestimonials />
      </Suspense>

      {/* Sophisticated How It Works */}
      <Suspense fallback={null}>
        <SophisticatedHowItWorks />
      </Suspense>

      {/* Full Product Catalog */}
      <section 
        id="products" 
        className="bg-background" 
        aria-label="Product catalog"
      >
        <Suspense fallback={<EnhancedLoadingState variant="grid" count={8} />}>
          <ProductCatalog />
        </Suspense>
      </section>

      {/* Refined FAQ */}
      <Suspense fallback={null}>
        <RefinedFAQ />
      </Suspense>

      {/* Elegant Final CTA */}
      <Suspense fallback={null}>
        <ElegantFinalCTA />
      </Suspense>

      {/* Trending Products */}
      <Suspense fallback={<EnhancedLoadingState variant="grid" count={4} />}>
        <TrendingProducts />
      </Suspense>

      {/* Trust Elements */}
      <Suspense fallback={null}>
        <ProductTrustElements />
      </Suspense>

      {/* PWA Install */}
      <Suspense fallback={null}>
        <InstallPWA />
      </Suspense>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      {/* Subtle Notification */}
      <Suspense fallback={null}>
        <SubtleNotification />
      </Suspense>
      
      {/* Mobile Back to Top */}
      <BackToTop />
      </div>
    </>
  );
};

export default Index;
