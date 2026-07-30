import React from 'react';
import { useStore } from '../context/StoreContext';
import { EmptyProductState } from '../components/EmptyProductState';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdNetworkBanner } from '../components/AdNetworkBanner';
import { SEO } from '../components/SEO';
import { ProductCardAdBadges } from '../components/ProductAdHighlights';
import { OptimizedImage } from '../components/OptimizedImage';

export const MenCategoryPage: React.FC = () => {
  const { products, setSelectedProductId, setCurrentPage } = useStore();

  const menProducts = products.filter((p) => p.category === 'men' || p.category === 'unisex');

  const breadcrumbItems = [
    { label: 'Home', onClick: () => setCurrentPage('home') },
    { label: 'Shop', onClick: () => setCurrentPage('shop') },
    { label: "Men's Collection", active: true }
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO
        title="Men's Korean Outerwear & Streetwear Apparel | Zapin"
        description="Shop Zapin's Men collection: drop-shoulder wool blazers, oversized trench coats, structured trousers, and Korean streetwear."
        keywords="Men Korean fashion, Zapin men jacket, men wool blazer, drop shoulder coat"
      />
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} className="mb-6 border-b border-neutral-100 pb-3" />

      {/* Header Ad Slot */}
      <AdNetworkBanner position="header" className="mb-8" />

      {/* Category Banner */}
      <div className="relative rounded-xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-14 mb-12 border border-neutral-800">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop"
            alt="Men Collection"
            priority
            className="w-full h-full object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 space-y-3 max-w-xl">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase bg-neutral-900/80 px-3 py-1 rounded border border-neutral-700">
            MEN'S COLLECTION
          </span>
          <h1 className="text-3xl sm:text-5xl font-light font-serif tracking-tight text-white uppercase">
            Korean Men's Tailoring & Outerwear
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            Relaxed drop-shoulder blazers, oversized trench coats, structured wool trousers, and heavyweight jersey knits.
          </p>
        </div>
      </div>

      {/* Products Grid or Empty State */}
      {menProducts.length === 0 ? (
        <EmptyProductState
          categoryName="Men's Collection"
          title="No Products Added Yet"
          description="There are currently no items in the Men's Apparel section. Add men's suits, coats, and streetwear items through the Zapin Admin Portal."
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {menProducts.map((p, idx) => (
            <React.Fragment key={p.id}>
              <div
                onClick={() => {
                  setSelectedProductId(p.id);
                  setCurrentPage('product-detail');
                }}
                className="group cursor-pointer border border-neutral-200 rounded p-3 hover:border-black transition-all bg-white"
              >
                <div className="aspect-3/4 overflow-hidden rounded bg-neutral-100 mb-3 relative">
                  <OptimizedImage
                    src={p.images[0] || 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=400'}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute bottom-2 left-2 right-2">
                    <ProductCardAdBadges showCod={true} showQualityBadge={true} isSponsored={true} />
                  </div>
                </div>
                <h4 className="text-xs font-semibold text-neutral-900 group-hover:underline">
                  {p.title}
                </h4>
                <p className="text-xs font-mono font-bold text-neutral-900 mt-1">
                  ₹{p.price.toLocaleString('en-IN')}
                </p>
              </div>

              {(idx + 1) % 4 === 0 && (
                <div className="col-span-1 sm:col-span-2 lg:col-span-4 my-2">
                  <AdNetworkBanner position="in-feed" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Body In-Feed / Footer Ad Slot */}
      <AdNetworkBanner position="footer" className="mt-12" />
    </div>
  );
};
