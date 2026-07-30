import React, { useState } from 'react';
import { SlidersHorizontal, Search, ArrowUpDown, Grid, Check, X, Megaphone, Sparkles, Tag, Copy, Zap, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { EmptyProductState } from '../components/EmptyProductState';
import { ProductCategory, ProductSize } from '../types';
import { AdNetworkBanner } from '../components/AdNetworkBanner';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEO } from '../components/SEO';
import { ProductCardAdBadges } from '../components/ProductAdHighlights';
import { OptimizedImage } from '../components/OptimizedImage';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setSelectedProductId,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    adCampaigns
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<ProductSize | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeAds = adCampaigns.filter((ad) => ad.status === 'active');
  const shopPageAd = activeAds.find((ad) => ad.platform.toLowerCase().includes('google') || ad.platform.toLowerCase().includes('meta') || ad.platform.toLowerCase().includes('banner')) || activeAds[0];

  const handleCopyPromo = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    // Category match
    if (selectedCategoryFilter !== 'all' && p.category !== selectedCategoryFilter) {
      return false;
    }
    // Size match
    if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) {
      return false;
    }
    // Price match
    if (p.price > maxPrice) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
  };

  const sizesList: ProductSize[] = ['S', 'M', 'L', 'XL', 'Free Size'];

  const breadcrumbItems = [
    { label: 'Home', onClick: () => setCurrentPage('home') },
    {
      label: 'Shop',
      onClick: () => setSelectedCategoryFilter('all'),
      active: selectedCategoryFilter === 'all'
    },
    ...(selectedCategoryFilter !== 'all'
      ? [
          {
            label:
              selectedCategoryFilter === 'men'
                ? "Men's Apparel"
                : selectedCategoryFilter === 'women'
                ? "Women's Apparel"
                : selectedCategoryFilter === 'new-arrivals'
                ? 'New Arrivals'
                : selectedCategoryFilter,
            active: true
          }
        ]
      : [])
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO
        title="Shop Korean Apparel & Streetwear Catalog | Zapin"
        description="Discover Zapin's complete catalog of high-street Korean fashion, wool blazers, men's & women's apparel, and exclusive Seongsu designer arrivals."
        keywords="Shop Zapin, Korean clothes shop, oversized blazers, Korean streetwear, women clothing, men fashion"
        breadcrumbItems={[
          { name: 'Home', url: window.location.origin },
          { name: 'Shop All', url: window.location.href }
        ]}
      />
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} className="mb-6 border-b border-neutral-100 pb-3" />

      {/* Header Ad Banner */}
      <AdNetworkBanner position="header" className="mb-8" />

      {/* Shop Header */}
      <div className="border-b border-neutral-200 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
              ZAPIN ARCHIVAL STORE
            </span>
            <h1 className="text-3xl sm:text-4xl font-light font-serif tracking-tight text-neutral-950 uppercase mt-1">
              {selectedCategoryFilter === 'all'
                ? 'All Collections'
                : `${selectedCategoryFilter} Apparel`}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className="inline-flex items-center gap-2 border border-neutral-300 bg-neutral-50 text-neutral-900 px-4 py-2.5 text-xs font-mono tracking-widest uppercase rounded hover:bg-neutral-100"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters {selectedSize !== 'all' || maxPrice < 20000 ? '(Active)' : ''}
            </button>

            <div className="flex items-center gap-2 border border-neutral-300 px-3 py-2 text-xs font-mono rounded bg-white">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none text-neutral-900 uppercase cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 text-xs font-mono">
          {(['all', 'men', 'women', 'new-arrivals'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-4 py-2 rounded uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategoryFilter === cat
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat === 'all' ? 'All Items' : cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* FEATURED SPONSORED WEBSITE ADVERTISEMENT BANNER (Synced from Admin) */}
        {shopPageAd && (
          <div className="mt-8 bg-neutral-950 text-white rounded-2xl overflow-hidden border border-neutral-800 shadow-xl relative font-mono">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center">
              <div className="relative h-48 md:h-full min-h-[180px] bg-neutral-900">
                <OptimizedImage
                  src={shopPageAd.imageUrl || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop'}
                  alt={shopPageAd.title}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-neutral-950/20" />
                <span className="absolute top-3 left-3 bg-amber-400 text-neutral-950 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                  <Megaphone className="w-3 h-3" /> SPONSORED AD
                </span>
              </div>

              <div className="md:col-span-2 p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="uppercase font-bold tracking-wider">{shopPageAd.platform} — OFFICIAL CAMPAIGN</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-serif text-white tracking-wide">
                  {shopPageAd.title}
                </h3>

                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Special promotional campaign drop live on the store. Enjoy additional savings with active offer codes at checkout.
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-800">
                  {shopPageAd.promoCode ? (
                    <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl">
                      <span className="text-[10px] text-neutral-400 uppercase">Promo Code:</span>
                      <strong className="text-amber-300 text-xs font-bold">{shopPageAd.promoCode}</strong>
                      <button
                        onClick={() => handleCopyPromo(shopPageAd.promoCode!)}
                        className="ml-2 text-neutral-400 hover:text-white"
                        title="Copy Promo Code"
                      >
                        {copiedCode === shopPageAd.promoCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-emerald-400 font-bold">✓ Live On Storefront</span>
                  )}

                  <button
                    onClick={() => {
                      setSelectedCategoryFilter('all');
                      setMaxPrice(20000);
                    }}
                    className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Shop Active Ad Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden lg:block space-y-8 pr-6 border-r border-neutral-200">
          {/* Category Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono tracking-widest text-neutral-900 uppercase font-bold border-b border-neutral-200 pb-2">
              Category
            </h3>
            <div className="space-y-2 text-xs text-neutral-600">
              {(['all', 'men', 'women', 'new-arrivals'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategoryFilter(c)}
                  className={`block w-full text-left py-1 capitalize hover:text-black ${
                    selectedCategoryFilter === c ? 'font-bold text-black' : ''
                  }`}
                >
                  {c === 'all' ? 'All Collections' : c}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono tracking-widest text-neutral-900 uppercase font-bold border-b border-neutral-200 pb-2">
              Korean Size
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSize('all')}
                className={`px-3 py-1.5 text-xs font-mono border rounded ${
                  selectedSize === 'all'
                    ? 'bg-neutral-950 text-white border-neutral-950'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                }`}
              >
                All
              </button>
              {sizesList.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1.5 text-xs font-mono border rounded ${
                    selectedSize === sz
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono tracking-widest text-neutral-900 uppercase font-bold border-b border-neutral-200 pb-2">
              Max Price: ₹{maxPrice.toLocaleString('en-IN')}
            </h3>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-neutral-950 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-500">
              <span>₹1,000</span>
              <span>₹20,000</span>
            </div>
          </div>

          {(selectedSize !== 'all' || maxPrice < 20000) && (
            <button
              onClick={() => {
                setSelectedSize('all');
                setMaxPrice(20000);
              }}
              className="text-xs font-mono text-neutral-500 underline hover:text-black block"
            >
              Reset Filters
            </button>
          )}

          {/* Publisher Ad Network Sidebar Unit */}
          <div className="pt-6 border-t border-neutral-200">
            <AdNetworkBanner position="sidebar" />
          </div>
        </div>

        {/* Main Product Display Area */}
        <div className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <EmptyProductState
              categoryName={selectedCategoryFilter !== 'all' ? selectedCategoryFilter : undefined}
              title="No Products Available"
              description="This product section is currently empty. You can add new products, set pricing, and upload images using the Zapin Admin Portal."
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {sortedProducts.map((p, idx) => (
                <React.Fragment key={p.id}>
                  <div
                    onClick={() => handleProductClick(p.id)}
                    className="group cursor-pointer border border-neutral-200/80 rounded p-3 hover:border-neutral-950 transition-all bg-white hover:shadow-md"
                  >
                    <div className="aspect-3/4 overflow-hidden rounded bg-neutral-100 mb-3 relative">
                      <OptimizedImage
                        src={p.images[0] || 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=400'}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                      <div className="absolute bottom-2 left-2 right-2">
                        <ProductCardAdBadges showCod={true} showQualityBadge={true} isSponsored={idx % 2 === 0} />
                      </div>
                    </div>

                    <h4 className="text-xs font-semibold text-neutral-900 group-hover:underline">
                      {p.title}
                    </h4>

                    <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                      Sizes: {p.sizes.join(', ')}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs font-mono font-bold text-neutral-950">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        IN STOCK ({p.stockQuantity})
                      </span>
                    </div>
                  </div>

                  {/* Insert In-Feed Ad Banner every 3 products */}
                  {(idx + 1) % 3 === 0 && (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 my-2">
                      <AdNetworkBanner position="in-feed" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
