import React, { useState } from 'react';
import { ShoppingBag, Trash2, ArrowRight, Tag, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AdNetworkBanner } from '../components/AdNetworkBanner';

export const CartPage: React.FC = () => {
  const {
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
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponMsg({ type: 'success', text: res.message });
      setCouponInput('');
    } else {
      setCouponMsg({ type: 'error', text: res.message });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 max-w-4xl mx-auto text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-neutral-400 stroke-[1.25]" />
        </div>
        <h1 className="text-2xl font-light font-serif uppercase tracking-tight text-neutral-950">
          Your Shopping Bag Is Empty
        </h1>
        <p className="text-xs text-neutral-500 font-mono mt-2 max-w-sm mx-auto">
          Explore the Zapin Korean high fashion catalog to discover minimalist coats, knitwear, and trousers.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="mt-6 inline-flex items-center gap-2 bg-neutral-950 text-white text-xs font-mono tracking-widest uppercase px-8 py-3.5 rounded hover:bg-neutral-800 transition-colors shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Return To Store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Publisher Ad Banner */}
      <AdNetworkBanner position="header" />

      <div className="border-b border-neutral-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
            SHOPPING BAG SUMMARY
          </span>
          <h1 className="text-3xl font-light font-serif text-neutral-950 uppercase mt-1">
            Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
          </h1>
        </div>
        <button
          onClick={() => setCurrentPage('shop')}
          className="text-xs font-mono tracking-widest uppercase text-neutral-600 hover:text-black flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg border border-neutral-200 bg-white items-center justify-between"
            >
              <div className="flex gap-4 items-center w-full sm:w-auto">
                <img
                  src={
                    item.product.images[0] ||
                    'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=300'
                  }
                  alt={item.product.title}
                  referrerPolicy="no-referrer"
                  className="w-24 h-28 object-cover rounded bg-neutral-100 border border-neutral-200"
                />
                <div>
                  <h3 className="text-sm font-semibold text-neutral-950">{item.product.title}</h3>
                  <p className="text-xs font-mono text-neutral-500 mt-1">
                    Size: <span className="font-bold text-neutral-900">{item.size}</span> | Color:{' '}
                    <span className="font-bold text-neutral-900">{item.color.name}</span>
                  </p>
                  <p className="text-xs font-mono font-bold text-neutral-900 mt-2">
                    ₹{item.product.price.toLocaleString('en-IN')} each
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-100">
                <div className="flex items-center border border-neutral-300 rounded">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-neutral-600 hover:text-black"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-neutral-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-neutral-600 hover:text-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-neutral-950 block">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[11px] font-mono text-neutral-400 hover:text-red-600 flex items-center gap-1 mt-1"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-neutral-950 text-white p-6 rounded-lg border border-neutral-800 space-y-6 h-fit">
          <h2 className="text-xs font-mono tracking-widest uppercase text-white font-bold border-b border-neutral-800 pb-3">
            Order Breakdown
          </h2>

          {/* Coupon */}
          <div className="space-y-2">
            {activeCoupon ? (
              <div className="flex items-center justify-between bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs p-3 rounded font-mono">
                <span>
                  COUPON '{activeCoupon.code}' APPLIED (-₹{cartDiscount.toLocaleString('en-IN')})
                </span>
                <button onClick={removeCoupon} className="underline text-[10px]">
                  REMOVE
                </button>
              </div>
            ) : (
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon Code (e.g. ZAPIN10)"
                  className="flex-1 bg-neutral-900 border border-neutral-800 text-white px-3 py-2 text-xs font-mono uppercase rounded focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white text-neutral-950 px-4 py-2 text-xs font-mono font-bold uppercase rounded hover:bg-neutral-200"
                >
                  Apply
                </button>
              </form>
            )}
            {couponMsg && (
              <p
                className={`text-[11px] font-mono ${
                  couponMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {couponMsg.text}
              </p>
            )}
          </div>

          <div className="space-y-2 text-xs font-mono text-neutral-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount</span>
                <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Delivery</span>
              <span>{cartSubtotal > 3000 ? 'FREE' : '₹150'}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white border-t border-neutral-800 pt-3">
              <span>Grand Total</span>
              <span>₹{(cartTotal + (cartSubtotal > 3000 ? 0 : 150)).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('checkout')}
            className="w-full bg-white text-neutral-950 py-4 text-xs font-mono font-bold tracking-widest uppercase rounded hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-xl"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer Publisher Ad Network Unit */}
      <AdNetworkBanner position="footer" className="mt-8" />
    </div>
  );
};
