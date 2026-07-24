import React from 'react';
import { useStore } from '../context/StoreContext';
import { EmptyProductState } from '../components/EmptyProductState';

export const NewArrivalsCategoryPage: React.FC = () => {
  const { products, setSelectedProductId, setCurrentPage } = useStore();

  const newProducts = products.filter((p) => p.category === 'new-arrivals' || p.tags?.includes('new'));

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Category Banner */}
      <div className="relative rounded-xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-14 mb-12 border border-neutral-800">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200&auto=format&fit=crop"
            alt="New Arrivals"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 space-y-3 max-w-xl">
          <span className="text-xs font-mono tracking-widest text-amber-300 uppercase bg-amber-950/60 px-3 py-1 rounded border border-amber-800">
            SEOUL ARCHIVAL DROP
          </span>
          <h1 className="text-3xl sm:text-5xl font-light font-serif tracking-tight text-white uppercase">
            New Arrivals Capsule
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            Fresh seasonal releases direct from our Seoul design atelier. Limited run quantities crafted with exceptional attention to detail.
          </p>
        </div>
      </div>

      {/* Products Grid or Empty State */}
      {newProducts.length === 0 ? (
        <EmptyProductState
          categoryName="New Arrivals Capsule"
          title="No Products Added Yet"
          description="There are currently no items in the New Arrivals capsule. Upload fresh drops and limited releases via the Zapin Admin Portal."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((p) => (
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
                  src={p.images[0] || 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=400'}
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
