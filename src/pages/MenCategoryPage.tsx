import React from 'react';
import { useStore } from '../context/StoreContext';
import { EmptyProductState } from '../components/EmptyProductState';

export const MenCategoryPage: React.FC = () => {
  const { products, setSelectedProductId, setCurrentPage } = useStore();

  const menProducts = products.filter((p) => p.category === 'men' || p.category === 'unisex');

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Category Banner */}
      <div className="relative rounded-xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-14 mb-12 border border-neutral-800">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop"
            alt="Men Collection"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedProductId(p.id);
                setCurrentPage('product-detail');
              }}
              className="group cursor-pointer border border-neutral-200 rounded p-3 hover:border-black transition-all bg-white"
            >
              <div className="aspect-3/4 overflow-hidden rounded bg-neutral-100 mb-3 relative">
                <img
                  src={p.images[0] || 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=400'}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="text-xs font-semibold text-neutral-900 group-hover:underline">
                {p.title}
              </h4>
              <p className="text-xs font-mono font-bold text-neutral-900 mt-1">
                ₹{p.price.toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
