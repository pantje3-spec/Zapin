import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, Eye, Instagram, ChevronRight, Layers, Megaphone, Zap, Tag, X, ExternalLink, Check, Copy } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { EmptyProductState } from '../components/EmptyProductState';
import { AdNetworkBanner } from '../components/AdNetworkBanner';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setSelectedCategoryFilter, bannerConfig, products, setSelectedProductId, adCampaigns, adNetworkConfig } = useStore();

  const [isPopupClosed, setIsPopupClosed] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!adNetworkConfig.nativeBannerEnabled || !adNetworkConfig.nativeBannerCode) return;

    const slotContainer = document.getElementById('zapin-native-banner-slot');
    if (!slotContainer) return;

    slotContainer.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'w-full flex flex-col items-center justify-center min-h-[120px] my-2';
    wrapper.innerHTML = adNetworkConfig.nativeBannerCode;

    const scriptElements = wrapper.querySelectorAll('script');
    scriptElements.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => newScript.setAttribute(attr.name, attr.value));
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      document.body.appendChild(newScript);
      oldScript.remove();
    });

    slotContainer.appendChild(wrapper);
  }, [adNetworkConfig.nativeBannerEnabled, adNetworkConfig.nativeBannerCode]);

  const activeAds = adCampaigns.filter((ad) => ad.status === 'active');
  const activePopupAd = activeAds.find((ad) => ad.platform === 'Popup Promo Ad' || ad.platform.includes('Popup'));

  const handleCategoryClick = (cat: 'men' | 'women' | 'new-arrivals') => {
    setSelectedCategoryFilter(cat);
    setCurrentPage(cat);
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
  };

  const handleCopyPromo = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Curated editorial images for category cards
  const categoryCards = [
    {
      title: 'MEN',
      sub: 'Relaxed Tailoring & Outerwear',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop',
      cat: 'men' as const
    },
    {
      title: 'WOMEN',
      sub: 'Minimalist Silhouettes & Knitwear',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
      cat: 'women' as const
    },
    {
      title: 'NEW ARRIVALS',
      sub: 'Seoul Archival Capsule Drop',
      image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000&auto=format&fit=crop',
      cat: 'new-arrivals' as const
    }
  ];

  const instagramPosts = [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[85vh] min-h-[550px] max-h-[850px] bg-neutral-950 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0 opacity-60">
          <img
            src={bannerConfig.heroImageUrl}
            alt="Zapin Korean Fashion Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-6">
          <div className="inline-flex items-center gap-2 border border-neutral-700/80 bg-neutral-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEOUL ATELIER — AUTUMN / WINTER 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-[0.12em] font-serif uppercase max-w-3xl leading-tight">
            {bannerConfig.heroHeadline}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed">
            {bannerConfig.heroSubheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => {
                setSelectedCategoryFilter('all');
                setCurrentPage('shop');
              }}
              className="bg-white text-neutral-950 px-8 py-4 text-xs tracking-[0.2em] font-mono uppercase font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 shadow-2xl rounded-sm"
            >
              {bannerConfig.heroButtonText}
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentPage('about')}
              className="border border-white/60 text-white px-8 py-4 text-xs tracking-[0.2em] font-mono uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-2 rounded-sm"
            >
              BRAND STORY
            </button>
          </div>
        </div>
      </section>

      {/* Live Publisher Ad Network Banner Unit (Google AdSense / Revenue Engine) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <AdNetworkBanner position="header" />
      </div>

      {/* Brand Introduction */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
              ABOUT ZAPIN STUDIO
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-950 font-serif leading-snug">
              Architectural Minimalism Meets Contemporary Korean Tailoring.
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              Founded in Seongsu-dong, Seoul, Zapin represents the pinnacle of understated luxury. We focus on clean lines, dropped shoulders, relaxed silhouettes, and heavyweight organic fabrics tailored for discerning tastemakers.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-neutral-100 font-mono text-xs">
              <div>
                <span className="block text-2xl font-light text-neutral-950 font-serif">100%</span>
                <span className="text-neutral-500 uppercase text-[11px]">Seoul Designed</span>
              </div>
              <div>
                <span className="block text-2xl font-light text-neutral-950 font-serif">A+</span>
                <span className="text-neutral-500 uppercase text-[11px]">Sustainable Craft</span>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop"
              alt="Zapin Studio Seoul"
              referrerPolicy="no-referrer"
              className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-neutral-950/20" />
          </div>
        </div>
      </section>

      {/* In-Feed Publisher Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdNetworkBanner position="in-feed" />
      </div>

      {/* Category Cards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-200 pb-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
              COLLECTION DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-950 font-serif uppercase mt-1">
              Explore By Category
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryFilter('all');
              setCurrentPage('shop');
            }}
            className="text-xs font-mono tracking-widest uppercase text-neutral-900 hover:underline flex items-center gap-1 mt-4 md:mt-0"
          >
            VIEW ALL CATEGORIES <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryCards.map((card) => (
            <div
              key={card.title}
              onClick={() => handleCategoryClick(card.cat)}
              className="group cursor-pointer bg-neutral-950 rounded-lg overflow-hidden relative shadow-lg h-[460px] flex flex-col justify-end p-6 border border-neutral-800"
            >
              <img
                src={card.image}
                alt={card.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-700 inline-block">
                  {card.cat}
                </span>
                <h3 className="text-2xl font-light tracking-widest text-white font-serif uppercase">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-300 font-sans">{card.sub}</p>
                <div className="pt-2 flex items-center text-xs font-mono text-white group-hover:underline gap-1">
                  EXPLORE {card.title} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* In-Feed Live Ad Network Banner Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdNetworkBanner position="in-feed" />
      </div>

      {/* Promotional Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800 shadow-2xl">
          <div className="absolute inset-0 opacity-40">
            <img
              src={bannerConfig.promoBannerImage}
              alt="Promo Banner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-neutral-950/70" />
          </div>

          <div className="relative z-10 space-y-3 max-w-xl">
            <span className="text-xs font-mono tracking-widest text-amber-300 uppercase bg-amber-950/60 px-3 py-1 rounded border border-amber-800">
              SPECIAL MEMBER ACCESS
            </span>
            <h3 className="text-2xl sm:text-3xl font-light font-serif tracking-wide uppercase">
              {bannerConfig.promoText}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Use code <span className="font-mono font-bold text-white bg-neutral-800 px-2 py-0.5 rounded">ZAPIN10</span> at checkout for 10% off your entire order.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => {
                setSelectedCategoryFilter('all');
                setCurrentPage('shop');
              }}
              className="bg-white text-neutral-950 px-8 py-4 text-xs font-mono tracking-widest uppercase font-bold hover:bg-neutral-200 transition-colors rounded shadow-lg"
            >
              SHOP EXCLUSIVE DROP
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section (Empty State or List of Products added via Admin) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
              CATALOG HIGHLIGHTS
            </span>
            <h2 className="text-2xl font-light tracking-tight text-neutral-950 font-serif uppercase">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="text-xs font-mono tracking-widest uppercase text-neutral-900 hover:underline"
          >
            VIEW STORE CATALOG
          </button>
        </div>

        {products.length === 0 ? (
          <EmptyProductState
            title="Catalog Empty"
            description="The products section is currently empty and ready for you to upload your inventory. Use the Zapin Admin Portal to add products, specify prices, and manage images."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => handleProductClick(p.id)}
                className="group cursor-pointer border border-neutral-200 rounded p-3 hover:shadow-lg transition-all"
              >
                <div className="aspect-3/4 overflow-hidden rounded bg-neutral-100 mb-3 relative">
                  <img
                    src={p.images[0] || 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=400'}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                </div>
                <h4 className="text-xs font-medium text-neutral-900 group-hover:underline">
                  {p.title}
                </h4>
                <p className="text-xs font-mono font-bold text-neutral-900 mt-1">
                  ₹{p.price.toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer & Native Banner Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        <AdNetworkBanner position="footer" />

        {/* Native Banner Container Slot */}
        {adNetworkConfig.nativeBannerEnabled && (
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 text-white font-mono space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-2">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <strong className="text-amber-300 uppercase">SPONSORED NATIVE BANNER AD</strong>
              </span>
              <span className="text-[10px] bg-neutral-900 border border-neutral-800 px-2.5 py-0.5 rounded text-sky-300">
                Adsterra / AdSense Native Unit
              </span>
            </div>

            <div id="zapin-native-banner-slot" className="min-h-[100px] flex items-center justify-center bg-neutral-900/50 rounded-xl p-4 text-center">
              <div className="space-y-2">
                <p className="text-xs text-neutral-300 font-sans">
                  Native Banner Ad Space — Automatically rendered via Admin Publisher Tag Snippet
                </p>
                <a
                  href={adNetworkConfig.smartlinkUrl || adNetworkConfig.directAdUrl || "https://www.effectivecpmnetwork.com/p6301rkg6?key=5ae6deb02a6effe7cd9e0b09f722e6a2"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded-xl text-xs hover:bg-amber-300 transition-colors"
                >
                  Explore Sponsored Offer
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instagram Editorial Gallery */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-500 uppercase">
            <Instagram className="w-4 h-4 text-neutral-900" />
            <span>@ZAPIN_SEOUL ON INSTAGRAM</span>
          </div>
          <h2 className="text-2xl font-light font-serif uppercase tracking-tight text-neutral-950">
            Seoul Streetwear Culture
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg aspect-square bg-neutral-100">
              <img
                src={src}
                alt="Zapin Instagram"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono tracking-widest">
                VIEW POST
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
