import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdNetworkBanner } from '../components/AdNetworkBanner';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      <SEO
        title="About Us | Zapin Seoul Atelier"
        description="Learn about Zapin's Seongsu-dong atelier, signature Korean drop-shoulder tailoring, and archival luxury craftsmanship."
        keywords="About Zapin, Zapin story, Seongsu fashion atelier, Korean fashion brand"
      />
      {/* Top Banner Ad */}
      <AdNetworkBanner position="header" />

      {/* Hero Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase">
          THE PHILOSOPHY OF ZAPIN SEOUL
        </span>
        <h1 className="text-4xl sm:text-5xl font-light font-serif uppercase tracking-tight text-neutral-950">
          Understated Luxury & Architectural Tailoring
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 font-mono max-w-2xl mx-auto leading-relaxed">
          Founded in Seongsu-dong, Seoul's premier creative district, Zapin was established to create monolithic, timeless apparel that rejects fast fashion trends in favor of enduring silhouettes.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
          alt="Zapin Seoul Studio"
          referrerPolicy="no-referrer"
          className="rounded-lg shadow-xl w-full h-[400px] object-cover"
        />
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
            SEONGSU ATELIER CRAFT
          </span>
          <h2 className="text-2xl font-light font-serif uppercase text-neutral-950">
            Korean Drop-Shoulder Tailoring
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed font-sans">
            Every garment in our archival collections is constructed with heavy-gauge organic wools, Japanese cotton canvases, and custom horn button trimmings. Our master tailors specialize in the signature Korean drop-shoulder silhouette—offering effortless drape and relaxed elegance.
          </p>
        </div>
      </div>

      {/* Brand Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-neutral-200 text-center">
        <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
          <Sparkles className="w-6 h-6 mx-auto text-neutral-900" />
          <h3 className="text-xs font-mono font-bold uppercase text-neutral-900">1. Archival Quality</h3>
          <p className="text-xs text-neutral-500 font-sans leading-relaxed">
            Designed for long-term wearability with reinforced double-needle stitching and colorfast dyes.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
          <ShieldCheck className="w-6 h-6 mx-auto text-neutral-900" />
          <h3 className="text-xs font-mono font-bold uppercase text-neutral-900">2. Ethical Sourcing</h3>
          <p className="text-xs text-neutral-500 font-sans leading-relaxed">
            100% fair-wage artisan employment across our Seongsu and Tokyo tailoring workshops.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
          <HeartHandshake className="w-6 h-6 mx-auto text-neutral-900" />
          <h3 className="text-xs font-mono font-bold uppercase text-neutral-900">3. Direct Concierge</h3>
          <p className="text-xs text-neutral-500 font-sans leading-relaxed">
            Personal styling advice and size consultations available via our live WhatsApp hotline.
          </p>
        </div>
      </div>

      {/* Footer Publisher Ad Unit */}
      <AdNetworkBanner position="footer" className="mt-8" />
    </div>
  );
};
