import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, cartDiscount, cartTotal, placeOrder, setCurrentPage } = useStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');

  // Modal for Razorpay Simulation
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Success State
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const shippingCost = cartSubtotal > 3000 ? 0 : 150;
  const finalTotal = cartTotal + shippingCost;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'razorpay') {
      setIsRazorpayModalOpen(true);
    } else {
      // Cash on Delivery
      executeOrderPlacement('cod');
    }
  };

  const executeOrderPlacement = async (method: 'razorpay' | 'cod') => {
    setIsProcessingPayment(true);

    const shippingInfo = {
      fullName,
      phone,
      street,
      city,
      state,
      postalCode,
      country: 'India'
    };

    setTimeout(async () => {
      const res = await placeOrder(shippingInfo, method);
      setIsProcessingPayment(false);
      setIsRazorpayModalOpen(false);

      if (res.success) {
        setPlacedOrder(res.order);
        // Trigger celebratory confetti
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 1500);
  };

  if (placedOrder) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-emerald-700 uppercase font-bold bg-emerald-50 px-3 py-1 rounded">
            ORDER CONFIRMED & IN PRODUCTION
          </span>
          <h1 className="text-3xl font-light font-serif uppercase tracking-tight text-neutral-950">
            Thank You, {placedOrder.shippingAddress.fullName}!
          </h1>
          <p className="text-xs font-mono text-neutral-500">
            Order Reference: <strong className="text-neutral-950">{placedOrder.id}</strong> | Tracking: <strong className="text-neutral-950">{placedOrder.trackingNumber}</strong>
          </p>
        </div>

        <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200 text-left text-xs font-mono space-y-3">
          <h3 className="font-bold text-neutral-900 uppercase border-b border-neutral-200 pb-2 flex items-center gap-2">
            <Package className="w-4 h-4" /> Shipping Summary
          </h3>
          <p><span className="text-neutral-500">Recipient:</span> {placedOrder.shippingAddress.fullName}</p>
          <p><span className="text-neutral-500">Address:</span> {placedOrder.shippingAddress.street}, {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state} - {placedOrder.shippingAddress.postalCode}</p>
          <p><span className="text-neutral-500">Payment Method:</span> {placedOrder.paymentMethod === 'razorpay' ? 'Razorpay Secure (Paid)' : 'Cash on Delivery'}</p>
          <p><span className="text-neutral-500">Estimated Delivery:</span> {placedOrder.estimatedDelivery}</p>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => setCurrentPage('order-tracking')}
            className="bg-neutral-950 text-white text-xs font-mono tracking-widest uppercase px-6 py-3 rounded hover:bg-neutral-800 transition-colors"
          >
            Track Your Package
          </button>
          <button
            onClick={() => setCurrentPage('shop')}
            className="border border-neutral-300 text-neutral-900 text-xs font-mono tracking-widest uppercase px-6 py-3 rounded hover:bg-neutral-100 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 text-center">
        <h2 className="text-xl font-mono uppercase text-neutral-900">Your bag is empty</h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="mt-4 bg-neutral-950 text-white text-xs font-mono tracking-widest uppercase px-6 py-3 rounded"
        >
          Return To Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border-b border-neutral-200 pb-6 mb-8">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
          SECURE CHECKOUT
        </span>
        <h1 className="text-3xl font-light font-serif text-neutral-950 uppercase mt-1">
          Zapin Express Checkout
        </h1>
      </div>

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Shipping Form & Payment Selection */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-900 font-bold border-b border-neutral-200 pb-2">
              1. Delivery Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-neutral-600 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Min-jun Kim"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-600 mb-1">Email Address (Order Confirmation) *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@zapin.com"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-600 mb-1">Street / Apartment / House No. *</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Flat 402, Seoul Heights, Bandra West"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mumbai"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">State & Postal Code *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Maharashtra"
                    className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="400050"
                    className="w-28 bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-900 font-bold border-b border-neutral-200 pb-2">
              2. Payment Options
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Razorpay Option */}
              <label
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'razorpay'
                    ? 'border-neutral-950 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                  className="mt-1 accent-neutral-950"
                />
                <div className="space-y-1 text-xs">
                  <span className="font-mono font-bold text-neutral-950 block flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    Razorpay Gateway (Card / UPI / NetBanking)
                  </span>
                  <p className="text-neutral-500">
                    Instant automated verification with UPI, Cards, Netbanking & Wallets.
                  </p>
                </div>
              </label>

              {/* Cash On Delivery Option */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'cod'
                    ? 'border-neutral-950 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-neutral-950"
                />
                <div className="space-y-1 text-xs">
                  <span className="font-mono font-bold text-neutral-950 block flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    Cash on Delivery (COD)
                  </span>
                  <p className="text-neutral-500">
                    Pay in cash upon doorstep package arrival.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-950 text-white py-4 text-xs font-mono font-bold tracking-widest uppercase rounded shadow-2xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            {paymentMethod === 'razorpay' ? 'Proceed to Razorpay Payment' : 'Confirm Cash on Delivery Order'}
          </button>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-neutral-950 text-white p-6 rounded-lg border border-neutral-800 space-y-6 h-fit">
          <h2 className="text-xs font-mono tracking-widest uppercase text-white font-bold border-b border-neutral-800 pb-3">
            Summary ({cart.length} Items)
          </h2>

          <div className="divide-y divide-neutral-900 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-2.5 flex justify-between items-center text-xs">
                <div>
                  <span className="font-semibold text-white block">{item.product.title}</span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Qty: {item.quantity} | Size: {item.size}
                  </span>
                </div>
                <span className="font-mono font-bold text-white">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs font-mono text-neutral-300 border-t border-neutral-800 pt-4">
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
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white border-t border-neutral-800 pt-3">
              <span>Total Payable</span>
              <span>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </form>

      {/* Razorpay Gateway Simulator Modal */}
      {isRazorpayModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-neutral-200 animate-in zoom-in-95 duration-200">
            <div className="bg-blue-600 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-blue-200" />
                <div>
                  <h3 className="font-bold text-sm tracking-wide">RAZORPAY SECURE GATEWAY</h3>
                  <p className="text-[10px] text-blue-100 font-mono">Zapin Official Merchant ID: rzp_live_zapin_seoul</p>
                </div>
              </div>
              <button
                onClick={() => setIsRazorpayModalOpen(false)}
                className="text-blue-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 text-neutral-800 text-xs font-mono">
              <div className="bg-neutral-50 p-3 rounded border border-neutral-200 flex justify-between items-center">
                <span>Amount Payable:</span>
                <span className="font-bold text-sm text-neutral-950">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="space-y-3">
                <p className="font-bold text-neutral-900 uppercase">Select Simulated Test Method:</p>
                <button
                  type="button"
                  onClick={() => executeOrderPlacement('razorpay')}
                  disabled={isProcessingPayment}
                  className="w-full p-3 rounded border border-neutral-300 hover:border-black text-left flex justify-between items-center bg-neutral-50 hover:bg-neutral-100 font-bold"
                >
                  <span>Pay via UPI / GooglePay / PhonePe</span>
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </button>

                <button
                  type="button"
                  onClick={() => executeOrderPlacement('razorpay')}
                  disabled={isProcessingPayment}
                  className="w-full p-3 rounded border border-neutral-300 hover:border-black text-left flex justify-between items-center bg-neutral-50 hover:bg-neutral-100 font-bold"
                >
                  <span>Pay via Credit / Debit Card</span>
                  <CreditCard className="w-4 h-4 text-blue-600" />
                </button>
              </div>

              {isProcessingPayment ? (
                <div className="text-center py-4 space-y-2">
                  <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="font-bold text-blue-700">Authorizing Razorpay Payment Token...</p>
                </div>
              ) : (
                <p className="text-[10px] text-neutral-400 text-center">
                  Encrypted 256-Bit SSL Payment Protection
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
