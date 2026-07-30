import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  CheckCircle2,
  Share2,
  Plus,
  Minus,
  ThumbsUp,
  Filter,
  Search,
  MessageSquare,
  Award,
  Sparkles,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductSize, Product, Review } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdNetworkBanner } from '../components/AdNetworkBanner';
import { SEO } from '../components/SEO';
import { ProductDetailAdBanner, ProductCardAdBadges } from '../components/ProductAdHighlights';
import { OptimizedImage } from '../components/OptimizedImage';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    addProductReview,
    voteHelpfulReview,
    setCurrentPage,
    setSelectedCategoryFilter
  } = useStore();

  // Find selected product or use a structural template preview item if empty
  const realProduct = products.find((p) => p.id === selectedProductId);

  // Template fallback product structure if store has 0 products
  const templateProduct: Product = {
    id: 'template-zapin-01',
    title: 'Zapin Archival Oversized Wool Trench Blazer',
    slug: 'zapin-archival-oversized-wool-trench-blazer',
    price: 8900,
    compareAtPrice: 11500,
    description:
      'Crafted in Seoul from heavyweight 100% virgin wool, this signature Zapin blazer features a relaxed drop-shoulder cut, double-breasted horn buttons, horn buckle belt details, and architectural notch lapels inspired by Seoul high-street tailoring.',
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', hex: '#000000' },
      { name: 'Charcoal Slate', hex: '#2d3748' },
      { name: 'Bone Cream', hex: '#f7fafc' }
    ],
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1000&auto=format&fit=crop'
    ],
    stockQuantity: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: [
      {
        id: 'rev-1',
        userName: 'Min-jun Kim',
        rating: 5,
        comment: 'Outstanding Korean fit. The shoulder drape is immaculate and wool quality is top-tier.',
        date: 'Jul 12, 2026',
        verifiedBuyer: true,
        fitFeedback: 'True to Size',
        helpfulCount: 14
      },
      {
        id: 'rev-2',
        userName: 'Aarav Mehta',
        rating: 5,
        comment: 'Super fast delivery and packaging was luxury Zara level. Highly recommend!',
        date: 'Jun 28, 2026',
        verifiedBuyer: true,
        fitFeedback: 'True to Size',
        helpfulCount: 9
      },
      {
        id: 'rev-3',
        userName: 'Priya Sharma',
        rating: 4,
        comment: 'Fabric feels premium and heavy. Fits slightly relaxed so go for your true size unless you want extra oversized.',
        date: 'Jun 15, 2026',
        verifiedBuyer: true,
        fitFeedback: 'True to Size',
        helpfulCount: 6
      }
    ]
  };

  const product = realProduct || templateProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Black', hex: '#000' });
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Review Form State
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewFit, setReviewFit] = useState<'True to Size' | 'Runs Small' | 'Runs Large'>('True to Size');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Review Filter & Sort State
  const [starFilter, setStarFilter] = useState<'all' | number>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest' | 'helpful'>('recent');
  const [votedReviewIds, setVotedReviewIds] = useState<string[]>([]);

  // Calculate Ratings & Reviews Summary Stats
  const totalReviews = product.reviews ? product.reviews.length : 0;
  const avgRatingNumber =
    totalReviews > 0
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
      : 5.0;
  const avgRatingFormatted = avgRatingNumber.toFixed(1);

  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews.filter((r) => r.rating === star).length,
    percentage:
      totalReviews > 0
        ? Math.round((product.reviews.filter((r) => r.rating === star).length / totalReviews) * 100)
        : star === 5
        ? 100
        : 0
  }));

  const recommendPercentage =
    totalReviews > 0
      ? Math.round(
          (product.reviews.filter((r) => r.rating >= 4).length / totalReviews) * 100
        )
      : 98;

  const fitTrueToSizeCount = product.reviews.filter(
    (r) => !r.fitFeedback || r.fitFeedback === 'True to Size'
  ).length;
  const fitRunsSmallCount = product.reviews.filter((r) => r.fitFeedback === 'Runs Small').length;
  const fitRunsLargeCount = product.reviews.filter((r) => r.fitFeedback === 'Runs Large').length;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewComment.trim()) {
      addProductReview(product.id, {
        userName: reviewName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim(),
        fitFeedback: reviewFit
      });
      setReviewSubmitted(true);
      setReviewName('');
      setReviewComment('');
      setReviewRating(5);
      setReviewFit('True to Size');
      setTimeout(() => setReviewSubmitted(false), 4000);
    }
  };

  const handleHelpfulClick = (reviewId: string) => {
    if (votedReviewIds.includes(reviewId)) return;
    if (voteHelpfulReview) {
      voteHelpfulReview(product.id, reviewId);
    }
    setVotedReviewIds((prev) => [...prev, reviewId]);
  };

  // Filtered & Sorted Reviews List
  const filteredReviews = product.reviews.filter((rev) => {
    const matchesStar = starFilter === 'all' || rev.rating === starFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rev.fitFeedback && rev.fitFeedback.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStar && matchesSearch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    if (sortBy === 'helpful') return (b.helpfulCount || 0) - (a.helpfulCount || 0);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'men':
        return "Men's Apparel";
      case 'women':
        return "Women's Apparel";
      case 'new-arrivals':
        return 'New Arrivals';
      case 'unisex':
        return 'Unisex Collection';
      default:
        return 'Shop All';
    }
  };

  const breadcrumbItems = [
    { label: 'Home', onClick: () => setCurrentPage('home') },
    { label: 'Shop', onClick: () => { setSelectedCategoryFilter('all'); setCurrentPage('shop'); } },
    {
      label: getCategoryLabel(product.category),
      onClick: () => {
        setSelectedCategoryFilter(product.category);
        setCurrentPage('shop');
      }
    },
    { label: product.title, active: true }
  ];

  const ratingLabelText = (r: number) => {
    switch (r) {
      case 5:
        return '5 Stars — Excellent Fit & Quality';
      case 4:
        return '4 Stars — Great Material';
      case 3:
        return '3 Stars — Average Fit';
      case 2:
        return '2 Stars — Below Expectations';
      case 1:
        return '1 Star — Disappointed';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO
        title={`${product.title} | Zapin Seoul`}
        description={`${product.description.slice(0, 155)}... Buy ${product.title} at ₹${product.price.toLocaleString('en-IN')}. Free shipping & 14-day exchange.`}
        keywords={`Zapin ${product.title}, Korean fashion, ${product.category} clothing, buy ${product.title}`}
        ogImage={product.images[0]}
        ogType="product"
        productData={{
          name: product.title,
          description: product.description,
          image: product.images[0],
          price: product.price,
          currency: 'INR',
          category: product.category,
          ratingValue: Number(avgRatingFormatted),
          reviewCount: totalReviews
        }}
        breadcrumbItems={[
          { name: 'Home', url: window.location.origin },
          { name: 'Shop', url: `${window.location.origin}/?page=shop` },
          { name: product.category.toUpperCase(), url: `${window.location.origin}/?category=${product.category}` },
          { name: product.title, url: window.location.href }
        ]}
      />
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} className="mb-6 border-b border-neutral-100 pb-3" />

      {/* Product Detail Top Ad Banner */}
      <div className="mb-8">
        <AdNetworkBanner position="header" />
      </div>

      {/* Template Mode Banner Alert if no products added yet */}
      {!realProduct && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-300 rounded-lg text-xs font-mono text-amber-900 flex items-center justify-between">
          <span>
            💡 <strong>TEMPLATE MODE:</strong> Showing standard Zapin Product Detail layout template. Products uploaded via the Admin Panel will render here dynamically.
          </span>
          <button
            onClick={() => setCurrentPage('admin')}
            className="bg-amber-900 text-amber-100 px-3 py-1 rounded hover:bg-amber-800 uppercase tracking-wider"
          >
            Upload Products
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-3/4 bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 relative">
            <OptimizedImage
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              priority
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4 z-10">
              <ProductCardAdBadges showCod={true} showQualityBadge={true} isSponsored={true} />
            </div>
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-md text-neutral-800 hover:text-red-600 transition-colors z-10"
              title="Save to wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  isInWishlist(product.id) ? 'fill-red-600 text-red-600' : ''
                }`}
              />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 rounded overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-neutral-950 scale-105' : 'border-neutral-200 opacity-60'
                  }`}
                >
                  <OptimizedImage
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Purchase Options */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
                ZAPIN SEOUL • {product.category.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                IN STOCK ({product.stockQuantity})
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-light font-serif text-neutral-950 uppercase leading-snug">
              {product.title}
            </h1>

            {/* Quick Star Rating Trust Badge */}
            <a
              href="#customer-reviews"
              className="inline-flex items-center gap-2 pt-1 text-xs font-mono group hover:opacity-80 transition-opacity"
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(Number(avgRatingFormatted))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-300 fill-neutral-200'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-neutral-900">{avgRatingFormatted}</span>
              <span className="text-neutral-500 underline">({totalReviews} verified reviews)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                {recommendPercentage}% Recommend
              </span>
            </a>

            <div className="flex items-center gap-4 pt-2 font-mono">
              <span className="text-2xl font-bold text-neutral-950">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-700 block">
                Color: <span className="font-bold text-neutral-950">{selectedColor.name}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${
                      selectedColor.name === col.name ? 'border-black ring-2 ring-neutral-400' : 'border-neutral-300'
                    }`}
                    title={col.name}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-black/10"
                      style={{ backgroundColor: col.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector & Size Guide */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest">
              <span className="text-neutral-700">Select Korean Size:</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-neutral-900 underline flex items-center gap-1 hover:text-black font-semibold"
              >
                <Ruler className="w-3.5 h-3.5" /> Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2.5 text-xs font-mono rounded border transition-all ${
                    selectedSize === sz
                      ? 'bg-neutral-950 text-white border-neutral-950 font-bold'
                      : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-neutral-700 block">
              Quantity:
            </label>
            <div className="inline-flex items-center border border-neutral-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-neutral-600 hover:text-black"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-mono font-bold text-neutral-950">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-neutral-600 hover:text-black"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-neutral-950 text-white py-4 text-xs font-mono tracking-widest uppercase rounded shadow-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 font-bold"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
            </button>

            {addedToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono rounded flex items-center justify-between animate-in fade-in">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Added {quantity}x {product.title} to your cart!
                </span>
                <button onClick={() => setCurrentPage('cart')} className="underline font-bold">
                  View Bag
                </button>
              </div>
            )}
          </div>

          {/* SPONSORED PRODUCT AD & COD HIGHLIGHT BANNER */}
          <div className="pt-2">
            <ProductDetailAdBanner productTitle={product.title} price={product.price} />
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200 text-[11px] font-mono text-neutral-600 text-center">
            <div className="p-3 bg-neutral-50 rounded border border-neutral-100 space-y-1">
              <Truck className="w-4 h-4 mx-auto text-neutral-900" />
              <span>Complimentary Express Delivery</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded border border-neutral-100 space-y-1">
              <RotateCcw className="w-4 h-4 mx-auto text-neutral-900" />
              <span>14-Day Exchanges</span>
            </div>
            <div className="p-3 bg-neutral-50 rounded border border-neutral-100 space-y-1">
              <ShieldCheck className="w-4 h-4 mx-auto text-neutral-900" />
              <span>100% Authentic Tailoring</span>
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold">
              Product Specification & Care
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              {product.description}
            </p>
            <ul className="text-xs text-neutral-500 font-mono space-y-1 list-disc pl-4">
              <li>Fabric Composition: Premium Heavyweight Cotton & Linen Blend</li>
              <li>Care: Specialist Dry Clean / Delicate Hand Wash</li>
              <li>Origin: Crafted in Seongsu Atelier, Seoul, South Korea</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Detail In-Feed Ad Banner */}
      <div className="mt-12">
        <AdNetworkBanner position="in-feed" />
      </div>

      {/* CUSTOMER REVIEWS & RATING SYSTEM */}
      <section id="customer-reviews" className="mt-16 pt-12 border-t border-neutral-200 space-y-10">
        
        {/* Section Header & Rating Overview Card */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Rating Hero Score Column */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-3 lg:border-r lg:border-neutral-200 lg:pr-8">
              <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase font-bold">
                VERIFIED CUSTOMER RATING
              </span>
              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span className="text-5xl md:text-6xl font-light font-serif text-neutral-950">
                  {avgRatingFormatted}
                </span>
                <span className="text-sm font-mono text-neutral-400">/ 5.0</span>
              </div>
              <div className="flex justify-center lg:justify-start text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(Number(avgRatingFormatted))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-300 fill-neutral-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs font-mono text-neutral-600">
                Based on <strong className="text-neutral-900">{totalReviews} verified reviews</strong>
              </p>
              <div className="inline-flex items-center gap-1.5 bg-emerald-100/70 border border-emerald-300 text-emerald-900 px-3 py-1.5 rounded-full text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{recommendPercentage}% of buyers recommend this product</span>
              </div>
            </div>

            {/* Star Distribution Histogram Bars */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-2 font-semibold">
                Rating Breakdown
              </span>
              {starCounts.map(({ star, count, percentage }) => (
                <button
                  key={star}
                  onClick={() => setStarFilter(starFilter === star ? 'all' : star)}
                  className={`w-full flex items-center gap-3 text-xs font-mono group p-1 rounded transition-colors ${
                    starFilter === star ? 'bg-neutral-200/80 font-bold' : 'hover:bg-neutral-100'
                  }`}
                  title={`Filter by ${star} Stars`}
                >
                  <span className="w-12 text-left flex items-center gap-1 text-neutral-700">
                    {star} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </span>
                  <div className="flex-1 h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-neutral-500 text-[11px]">
                    {count} ({percentage}%)
                  </span>
                </button>
              ))}
            </div>

            {/* Sizing Fit Perception Gauge */}
            <div className="lg:col-span-3 space-y-3 bg-white p-4 rounded-xl border border-neutral-200">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-neutral-900">
                <Ruler className="w-4 h-4 text-neutral-700" />
                <span>Fit Satisfaction</span>
              </div>
              <p className="text-[11px] font-mono text-neutral-500 leading-snug">
                Customer consensus on sizing:
              </p>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-neutral-700 font-semibold">True to Size</span>
                  <span className="text-neutral-900 font-bold">
                    {totalReviews > 0 ? Math.round((fitTrueToSizeCount / totalReviews) * 100) : 90}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 rounded-full"
                    style={{
                      width: `${totalReviews > 0 ? (fitTrueToSizeCount / totalReviews) * 100 : 90}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 pt-1">
                  <span>Runs Small ({fitRunsSmallCount})</span>
                  <span>Runs Large ({fitRunsLargeCount})</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Filter, Search & Sort Control Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          
          {/* Star Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-mono text-neutral-500 uppercase mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              onClick={() => setStarFilter('all')}
              className={`px-3 py-1.5 text-xs font-mono rounded-full transition-all whitespace-nowrap ${
                starFilter === 'all'
                  ? 'bg-neutral-950 text-white font-bold shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All ({totalReviews})
            </button>
            {[5, 4, 3, 2, 1].map((s) => {
              const countForStar = product.reviews.filter((r) => r.rating === s).length;
              return (
                <button
                  key={s}
                  onClick={() => setStarFilter(starFilter === s ? 'all' : s)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-full flex items-center gap-1 transition-all whitespace-nowrap ${
                    starFilter === s
                      ? 'bg-neutral-950 text-white font-bold shadow-sm'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <span>{s}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>({countForStar})</span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Box */}
            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
              />
            </div>

            {/* Sort Selector */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto appearance-none bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 pr-8 text-xs font-mono font-medium focus:outline-none focus:border-neutral-900"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Main Content Grid: Reviews List (Left) vs Submit Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <span className="text-xs font-mono uppercase text-neutral-500 font-bold">
                Showing {sortedReviews.length} of {totalReviews} Reviews
              </span>
              {(starFilter !== 'all' || searchQuery.trim()) && (
                <button
                  onClick={() => {
                    setStarFilter('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-mono text-neutral-900 underline hover:text-black font-semibold"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {sortedReviews.length === 0 ? (
              <div className="p-8 text-center bg-neutral-50 rounded-xl border border-dashed border-neutral-300 space-y-3">
                <MessageSquare className="w-8 h-8 text-neutral-400 mx-auto" />
                <p className="text-xs font-mono text-neutral-600">
                  No reviews found matching your search criteria or star filter.
                </p>
                <button
                  onClick={() => {
                    setStarFilter('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-mono bg-neutral-900 text-white px-4 py-2 rounded uppercase font-bold"
                >
                  View All Reviews
                </button>
              </div>
            ) : (
              sortedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 shadow-xs hover:border-neutral-300 transition-all"
                >
                  {/* Header: User Name, Date, Verified Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-950 font-mono">
                        {rev.userName}
                      </span>
                      {rev.verifiedBuyer !== false && (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-200 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">{rev.date}</span>
                  </div>

                  {/* Stars Rating & Fit Tag */}
                  <div className="flex items-center gap-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-300 fill-neutral-200'
                          }`}
                        />
                      ))}
                    </div>
                    {rev.fitFeedback && (
                      <span className="text-[10px] font-mono text-neutral-600 bg-neutral-200/80 px-2 py-0.5 rounded">
                        Fit: <strong>{rev.fitFeedback}</strong>
                      </span>
                    )}
                  </div>

                  {/* Review Text Body */}
                  <p className="text-xs text-neutral-800 leading-relaxed font-sans">{rev.comment}</p>

                  {/* Bottom Bar: Helpful Thumbs Up Action */}
                  <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>Was this review helpful?</span>
                    <button
                      onClick={() => handleHelpfulClick(rev.id)}
                      disabled={votedReviewIds.includes(rev.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border transition-all ${
                        votedReviewIds.includes(rev.id)
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-400'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{votedReviewIds.includes(rev.id) ? 'Helpful!' : 'Helpful'}</span>
                      {((rev.helpfulCount || 0) + (votedReviewIds.includes(rev.id) ? 1 : 0)) > 0 && (
                        <span className="ml-0.5 text-neutral-900 font-bold">
                          ({(rev.helpfulCount || 0) + (votedReviewIds.includes(rev.id) ? 1 : 0)})
                        </span>
                      )}
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Right Column: Interactive Review Submission Form */}
          <div className="lg:col-span-5 bg-neutral-950 text-white p-6 sm:p-8 rounded-2xl border border-neutral-800 space-y-6 shadow-2xl sticky top-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest font-bold">
                <Sparkles className="w-4 h-4" /> Share Your Experience
              </div>
              <h3 className="text-xl font-light font-serif text-white">Write a Verified Review</h3>
              <p className="text-xs text-neutral-400 font-sans">
                Help fellow buyers choose the perfect Korean tailored fit.
              </p>
            </div>

            {reviewSubmitted ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs font-mono rounded-xl space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-emerald-100 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Review Published!
                </div>
                <p>Thank you for contributing! Your feedback is now live on our store.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                
                {/* Name Field */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-300 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                    placeholder="e.g. Soo-jin Park"
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-neutral-500 font-mono placeholder:text-neutral-600"
                  />
                </div>

                {/* Interactive Star Rating Selector */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-300 block mb-1.5">
                    Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400 gap-1 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setReviewRating(starVal)}
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              starVal <= (hoverRating || reviewRating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-700 fill-neutral-800'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 mt-1 block">
                    {ratingLabelText(hoverRating || reviewRating)}
                  </span>
                </div>

                {/* Fit Feedback Option */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-300 block mb-1.5">
                    How does it fit?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Runs Small', 'True to Size', 'Runs Large'] as const).map((fitOpt) => (
                      <button
                        key={fitOpt}
                        type="button"
                        onClick={() => setReviewFit(fitOpt)}
                        className={`py-2 px-1 text-[10px] font-mono rounded-lg border transition-all text-center ${
                          reviewFit === fitOpt
                            ? 'bg-white text-neutral-950 border-white font-bold shadow-md'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        {fitOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment Field */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-300 block mb-1">
                    Your Detailed Review *
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe the fabric quality, shoulder drape, stitching, and fit experience..."
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs p-3 rounded-lg focus:outline-none focus:border-neutral-500 font-sans placeholder:text-neutral-600"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-white text-neutral-950 py-3 text-xs font-mono tracking-widest uppercase font-bold rounded-lg hover:bg-neutral-200 transition-colors shadow-lg"
                >
                  Submit Verified Review
                </button>

                <p className="text-[10px] font-mono text-neutral-500 text-center">
                  🔒 Verified buyer reviews undergo instant store validation.
                </p>
              </form>
            )}
          </div>

        </div>

      </section>

      {/* Footer Publisher Ad Network Unit */}
      <AdNetworkBanner position="footer" className="mt-12" />
    </div>
  );
};
