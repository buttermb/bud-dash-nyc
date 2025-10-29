import { lazy, Suspense } from "react";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import GiveawayBanner from "@/components/GiveawayBanner";
import { SEOHead } from "@/components/SEOHead";
import { EnhancedLoadingState } from "@/components/EnhancedLoadingState";
import { BackToTop } from "@/components/mobile/BackToTop";
import LuxuryNav from "@/components/luxury/LuxuryNav";
import LuxuryHero from "@/components/luxury/LuxuryHero";
import LuxuryFooter from "@/components/luxury/LuxuryFooter";

// Lazy load non-critical components for better initial page load
const ProductCatalog = lazy(() => import("@/components/ProductCatalog"));
const Footer = lazy(() => import("@/components/Footer"));
const RecentPurchaseNotification = lazy(() => import("@/components/RecentPurchaseNotification"));
const ProductTrustElements = lazy(() => import("@/components/ProductTrustElements"));
const TrendingProducts = lazy(() => import("@/components/TrendingProducts"));
const InstallPWA = lazy(() => import("@/components/InstallPWA"));

// Premium sections (keep some)
const RefinedFAQ = lazy(() => import("@/components/home/RefinedFAQ").then(m => ({ default: m.RefinedFAQ })));
const SubtleNotification = lazy(() => import("@/components/home/SubtleNotification").then(m => ({ default: m.SubtleNotification })));


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
      <LuxuryNav />
      
      {/* Luxury Hero */}
      <LuxuryHero />
      

      {/* Full Product Catalog */}
      <section 
        id="products" 
        className="bg-black" 
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

      {/* Trending Products */}
      <section className="bg-black">
        <Suspense fallback={<EnhancedLoadingState variant="grid" count={4} />}>
          <TrendingProducts />
        </Suspense>
      </section>

      {/* Trust Elements */}
      <section className="bg-black">
        <Suspense fallback={null}>
          <ProductTrustElements />
        </Suspense>
      </section>

      {/* PWA Install */}
      <Suspense fallback={null}>
        <InstallPWA />
      </Suspense>
      
      <LuxuryFooter />
      
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
