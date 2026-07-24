import React, { useState } from 'react';
import { User, Package, MapPin, LogOut, ExternalLink, Heart, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MyAccountPage: React.FC = () => {
  const { user, logoutUser, setCurrentPage, orders } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  if (!user) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-mono uppercase text-neutral-900">Please Sign In</h2>
        <p className="text-xs text-neutral-500 font-mono">You need to be logged in to view your account dashboard.</p>
        <button
          onClick={() => setCurrentPage('login')}
          className="bg-neutral-950 text-white text-xs font-mono tracking-widest uppercase px-6 py-3 rounded"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const userOrders = orders.length > 0 ? orders : user.orders;

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Account Header */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
            MEMBER DASHBOARD
          </span>
          <h1 className="text-3xl font-light font-serif text-neutral-950 uppercase mt-1">
            Hello, {user.name}
          </h1>
          <p className="text-xs font-mono text-neutral-500">{user.email}</p>
        </div>

        <button
          onClick={() => {
            logoutUser();
            setCurrentPage('home');
          }}
          className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 px-4 py-2 text-xs font-mono uppercase rounded hover:bg-neutral-100"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 mb-8 font-mono text-xs">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-6 uppercase tracking-wider font-bold ${
            activeTab === 'orders' ? 'border-b-2 border-black text-black' : 'text-neutral-400'
          }`}
        >
          Order History ({userOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 px-6 uppercase tracking-wider font-bold ${
            activeTab === 'profile' ? 'border-b-2 border-black text-black' : 'text-neutral-400'
          }`}
        >
          Profile Details
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {userOrders.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded border border-neutral-200">
              <Package className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <h3 className="text-sm font-mono uppercase text-neutral-900">No orders placed yet</h3>
              <p className="text-xs text-neutral-500 font-mono mt-1">Your purchase history will appear here.</p>
              <button
                onClick={() => setCurrentPage('shop')}
                className="mt-4 bg-neutral-950 text-white text-xs font-mono uppercase tracking-widest px-6 py-2.5 rounded"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            userOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-lg border border-neutral-200 bg-white space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3 text-xs font-mono">
                  <div>
                    <span className="font-bold text-neutral-950">ORDER #{order.id}</span>
                    <span className="text-neutral-500 ml-3">Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                      STATUS: {order.orderStatus}
                    </span>
                    <button
                      onClick={() => setCurrentPage('order-tracking')}
                      className="text-neutral-950 font-bold underline flex items-center gap-1"
                    >
                      Track Order <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-neutral-100 text-xs font-mono">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-2.5 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0] || 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=200'}
                          alt={item.product.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-14 object-cover rounded bg-neutral-100"
                        />
                        <div>
                          <p className="font-bold text-neutral-900">{item.product.title}</p>
                          <p className="text-neutral-500 text-[11px]">
                            Qty: {item.quantity} | Size: {item.size}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-950">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-neutral-100 text-xs font-mono font-bold text-neutral-950">
                  <span>Total Paid</span>
                  <span>₹{order.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-md bg-neutral-50 p-6 rounded-lg border border-neutral-200 space-y-4 font-mono text-xs">
          <div>
            <label className="text-neutral-500 block mb-1">Full Name</label>
            <p className="font-bold text-neutral-900 text-sm">{user.name}</p>
          </div>
          <div>
            <label className="text-neutral-500 block mb-1">Email Address</label>
            <p className="font-bold text-neutral-900 text-sm">{user.email}</p>
          </div>
          <div>
            <label className="text-neutral-500 block mb-1">Member Status</label>
            <p className="font-bold text-emerald-700 uppercase">Zapin VIP Member</p>
          </div>
        </div>
      )}
    </div>
  );
};
