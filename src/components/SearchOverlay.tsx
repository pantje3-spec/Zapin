import React from 'react';
import { Search, X, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SearchOverlay: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    products,
    setSelectedProductId,
    setCurrentPage
  } = useStore();

  if (!isSearchOpen) return null;

  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-neutral-200">
        {/* Header Search Input */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 stroke-[1.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Zapin collection (e.g. Oversized Blazer, Coat, Trench)..."
            autoFocus
            className="w-full text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none font-sans"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-black rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {!searchQuery.trim() ? (
            <div className="text-center py-8 text-neutral-400 text-xs tracking-widest uppercase font-mono">
              Type keywords above to search Zapin archival collection
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-4">
              <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
                Found {filteredProducts.length} product(s)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex gap-3 p-3 rounded border border-neutral-200 hover:border-black cursor-pointer transition-all group"
                  >
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=300'}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover rounded bg-neutral-100"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-900 group-hover:underline">
                        {product.title}
                      </h4>
                      <p className="text-[11px] font-mono text-neutral-500 mt-0.5 uppercase">
                        {product.category}
                      </p>
                      <p className="text-xs font-mono font-bold text-neutral-900 mt-2">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500 space-y-3">
              <ShoppingBag className="w-10 h-10 mx-auto text-neutral-300 stroke-[1]" />
              <p className="text-sm">No products found matching "{searchQuery}"</p>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                No items matching this term have been added yet. Add products via the Admin Panel to expand your catalog.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
