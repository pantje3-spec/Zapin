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
  Minus
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductSize, Product } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    addProductReview,
    setCurrentPage,
    setSelectedProductId,
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
        verifiedBuyer: true
      },
      {
        id: 'rev-2',
        userName: 'Aarav Mehta',
        rating: 5,
        comment: 'Super fast delivery and packaging was luxury Zara level. Highly recommend!',
        date: 'Jun 28, 2026',
        verifiedBuyer: true
      }
    ]
  };

  const product = realProduct || templateProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Black', hex: '#000' });
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewComment.trim()) {
      addProductReview(product.id, {
        userName: reviewName,
        rating: reviewRating,
        comment: reviewComment
      });
      setReviewSubmitted(true);
      setReviewName('');
      setReviewComment('');
      setTimeout(() => setReviewSubmitted(false), 4000);
    }
  };

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

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} className="mb-6 border-b border-neutral-100 pb-3" />

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
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-md text-neutral-800 hover:text-red-600 transition-colors"
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
                  className={`w-20 h-24 rounded overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-neutral-950 scale-105' : 'border-neutral-200 opacity-60'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
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

            <div className="flex items-center gap-4 pt-1 font-mono">
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
              <li>Fabric Composition: Premium Heavyweight Virgin Wool Blend</li>
              <li>Care: Specialist Dry Clean Only</li>
              <li>Origin: Crafted in Seongsu Atelier, Seoul, South Korea</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-20 pt-12 border-t border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-light font-serif uppercase tracking-tight text-neutral-950">
              Customer Reviews ({product.reviews.length})
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs font-mono text-neutral-600">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                ))}
              </div>
              <span>5.0 out of 5 based on verified buyers</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Review List */}
          <div className="lg:col-span-2 space-y-4">
            {product.reviews.length === 0 ? (
              <p className="text-xs text-neutral-500 font-mono py-6">
                No reviews submitted yet for this product. Be the first to share your feedback!
              </p>
            ) : (
              product.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-lg bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-900 font-mono">{rev.userName}</span>
                    <span className="text-[11px] font-mono text-neutral-400">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-sans">{rev.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Submit Review Form */}
          <div className="bg-neutral-950 text-white p-6 rounded-lg border border-neutral-800 space-y-4">
            <h3 className="text-xs font-mono tracking-widest uppercase text-white font-bold">
              Write a Verified Review
            </h3>

            {reviewSubmitted ? (
              <div className="p-3 bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs font-mono rounded">
                ✓ Thank you! Your review has been submitted.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                    placeholder="e.g. Soo-jin Park"
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-neutral-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                    Rating
                  </label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs px-3 py-2 rounded focus:outline-none font-mono"
                  >
                    <option value={5}>5 Stars - Excellent Fit</option>
                    <option value={4}>4 Stars - Great Quality</option>
                    <option value={3}>3 Stars - Average Fit</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                    Your Experience
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                    rows={3}
                    placeholder="Describe tailoring fit, fabric weight, and satisfaction..."
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-neutral-500 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-neutral-950 py-2.5 text-xs font-mono tracking-widest uppercase font-bold rounded hover:bg-neutral-200 transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
