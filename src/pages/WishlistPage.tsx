import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { EmptyProductState } from '../components/EmptyProductState';
import { AdNetworkBanner } from '../components/AdNetworkBanner';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, setSelectedProductId, setCurrentPage } = useStore();

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Ad Unit */}
      <AdNetworkBanner position="header" />

      <div className="border-b border-neutral-200 pb-6">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
          SAVED SELECTIONS
        </span>
        <h1 className="text-3xl font-light font-serif text-neutral-950 uppercase mt-1">
          Your Wishlist ({wishlist.length})
        </h1>
      </div>

      {wishlist.length === 0 ? (
        <EmptyProductState
          title="Wishlist Is Empty"
          description="Save items to your wishlist while exploring the Zapin Archival catalog for easy access later."
          showAdminAction={false}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((p) => (
            <div
              key={p.id}
              className="group border border-neutral-200 rounded p-3 bg-white relative hover:shadow-md transition-all"
            >
              <div
                onClick={() => {
                  setSelectedProductId(p.id);
                  setCurrentPage('product-detail');
                }}
                className="aspect-3/4 overflow-hidden rounded bg-neutral-100 mb-3 cursor-pointer"
              >
                <img
                  src={p.images[0] || 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=400'}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h4 className="text-xs font-semibold text-neutral-900">{p.title}</h4>
              <p className="text-xs font-mono font-bold text-neutral-900 mt-1">
                ₹{p.price.toLocaleString('en-IN')}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    setSelectedProductId(p.id);
                    setCurrentPage('product-detail');
                  }}
                  className="flex-1 bg-neutral-950 text-white text-[11px] font-mono py-2 rounded uppercase tracking-wider hover:bg-neutral-800"
                >
                  View Product
                </button>
                <button
                  onClick={() => toggleWishlist(p)}
                  className="p-2 border border-neutral-300 text-neutral-500 hover:text-red-600 rounded"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Ad Unit */}
      <AdNetworkBanner position="footer" className="mt-8" />
    </div>
  );
};
