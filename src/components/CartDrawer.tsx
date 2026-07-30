import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, Plus, Minus, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OptimizedImage } from './OptimizedImage';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    setCurrentPage
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponMessage({ type: 'success', text: res.message });
      setCouponInput('');
    } else {
      setCouponMessage({ type: 'error', text: res.message });
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const freeShippingThreshold = 3000;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900 stroke-[1.5]" />
              <h2 className="text-sm font-mono tracking-widest uppercase text-neutral-900">
                Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-neutral-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {cart.length > 0 && (
            <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-200 text-xs">
              {amountForFreeShipping > 0 ? (
                <p className="text-neutral-600 font-mono">
                  Add <span className="font-bold text-neutral-900">₹{amountForFreeShipping.toLocaleString('en-IN')}</span> more for <span className="text-emerald-700 font-bold uppercase">Free Express Delivery</span>
                </p>
              ) : (
                <p className="text-emerald-700 font-mono font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> You've unlocked Complimentary Express Delivery!
                </p>
              )}
              <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-neutral-950 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-12 h-12 text-neutral-300 stroke-[1] mb-3" />
                <h3 className="text-sm font-mono tracking-widest text-neutral-900 uppercase">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Discover Zapin Seoul minimalist apparel collections and curate your wardrobe.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="mt-6 bg-neutral-950 text-white text-xs tracking-widest uppercase px-6 py-3 rounded-sm hover:bg-neutral-800 transition-colors"
                >
                  Explore Shop
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  <OptimizedImage
                    src={item.product.images[0] || 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=300'}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded bg-neutral-100 border border-neutral-200 shrink-0"
                    sizes="80px"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-semibold text-neutral-900 truncate">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                      Size: {item.size} | Color: {item.color.name}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-neutral-300 rounded">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-neutral-600 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-neutral-600 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <p className="text-xs font-mono font-bold text-neutral-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-4">
              {/* Coupon Form */}
              <div className="space-y-2">
                {activeCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded">
                    <span className="font-mono font-bold flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      COUPON '{activeCoupon.code}' APPLIED (-₹{cartDiscount.toLocaleString('en-IN')})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-neutral-500 hover:text-black text-[10px] underline font-mono"
                    >
                      REMOVE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. ZAPIN10)"
                      className="flex-1 bg-white border border-neutral-300 px-3 py-2 text-xs uppercase font-mono rounded focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="bg-neutral-950 text-white text-xs px-3 py-2 font-mono uppercase tracking-wider rounded hover:bg-neutral-800"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMessage && (
                  <p
                    className={`text-[11px] font-mono ${
                      couponMessage.type === 'success' ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Subtotal & Total */}
              <div className="space-y-1.5 text-xs text-neutral-600 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{cartSubtotal > 3000 ? 'FREE' : '₹150'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 border-t border-neutral-200 pt-2">
                  <span>Total Payable</span>
                  <span>₹{(cartTotal + (cartSubtotal > 3000 ? 0 : 150)).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-neutral-950 text-white py-3.5 text-xs font-mono tracking-widest uppercase rounded flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
