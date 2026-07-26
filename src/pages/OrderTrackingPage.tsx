import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, Home, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SEO } from '../components/SEO';
import { AdNetworkBanner } from '../components/AdNetworkBanner';

export const OrderTrackingPage: React.FC = () => {
  const { orders } = useStore();
  const [searchId, setSearchId] = useState('');
  const [searched, setSearched] = useState(false);

  // Find order in state or create a mock order response for sample IDs
  const foundOrder = orders.find(
    (o) =>
      o.id.toLowerCase() === searchId.trim().toLowerCase() ||
      o.trackingNumber.toLowerCase() === searchId.trim().toLowerCase()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      setSearched(true);
    }
  };

  const statusSteps = [
    { label: 'Order Placed', icon: Package, done: true },
    { label: 'Seoul Atelier Crafting', icon: Clock, done: true },
    { label: 'Air Express Shipping', icon: Truck, done: foundOrder?.orderStatus === 'shipped' || foundOrder?.orderStatus === 'delivered' },
    { label: 'Delivered', icon: Home, done: foundOrder?.orderStatus === 'delivered' }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <SEO
        title="Track Your Order & Express Shipment | Zapin"
        description="Track live logistics, Korean air freight delivery status, and package route for your Zapin order."
        keywords="Zapin order tracking, track Zapin package, Korean fashion shipment"
      />
      
      {/* Top Publisher Ad Banner */}
      <AdNetworkBanner position="header" />

      <div className="text-center space-y-2">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
          LOGISTICS & DELIVERY TRACKER
        </span>
        <h1 className="text-3xl font-light font-serif uppercase tracking-tight text-neutral-950">
          Track Your Zapin Shipment
        </h1>
        <p className="text-xs text-neutral-500 font-mono max-w-md mx-auto">
          Enter your Zapin Order Reference (e.g. ZAP-123456) or Air Tracking Number to monitor your package.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Order ID (e.g. ZAP-123456) or Tracking No."
          required
          className="flex-1 bg-neutral-50 border border-neutral-300 px-4 py-3 text-xs font-mono rounded uppercase focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          className="bg-neutral-950 text-white px-6 py-3 text-xs font-mono uppercase tracking-widest font-bold rounded hover:bg-neutral-800 transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" /> Track
        </button>
      </form>

      {/* Tracking Results */}
      {searched && (
        <div className="mt-10 animate-in fade-in duration-300">
          {foundOrder ? (
            <div className="bg-neutral-950 text-white rounded-xl p-8 border border-neutral-800 space-y-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-400">Order ID:</span>{' '}
                  <strong className="text-white font-bold">{foundOrder.id}</strong>
                </div>
                <div>
                  <span className="text-neutral-400">Air Tracking:</span>{' '}
                  <strong className="text-amber-300 font-bold">{foundOrder.trackingNumber}</strong>
                </div>
                <div>
                  <span className="text-neutral-400">Est. Arrival:</span>{' '}
                  <strong className="text-white">{foundOrder.estimatedDelivery}</strong>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="py-6 border-b border-neutral-800">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="space-y-2">
                        <div
                          className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center border-2 transition-all ${
                            step.done
                              ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-600'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-[11px] font-mono tracking-wider uppercase font-bold text-neutral-200">
                          {step.label}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-3 text-xs font-mono text-neutral-300">
                <h4 className="font-bold uppercase text-white border-b border-neutral-800 pb-2">
                  Shipment Items ({foundOrder.items.length})
                </h4>
                {foundOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-1">
                    <span>
                      {item.product.title} (Size: {item.size}, Qty: {item.quantity})
                    </span>
                    <span className="font-bold text-white">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 bg-neutral-50 rounded-xl border border-neutral-200 text-center space-y-3">
              <MapPin className="w-10 h-10 text-neutral-300 mx-auto" />
              <h3 className="text-sm font-mono uppercase text-neutral-900 font-bold">
                Order Reference Not Found
              </h3>
              <p className="text-xs text-neutral-500 font-mono max-w-sm mx-auto">
                No active order found matching "{searchId}". Please verify your order receipt or log into your account to view past purchases.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer Publisher Ad Network Unit */}
      <AdNetworkBanner position="footer" className="mt-8" />
    </div>
  );
};
