import React, { useState } from 'react';
import { Mail, Instagram, Twitter, ShieldCheck, Truck, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageRoute } from '../types';
import { AdNetworkBanner } from './AdNetworkBanner';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const navTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ad Network Live Footer Banner */}
        <AdNetworkBanner position="footer" className="mb-10" />

        {/* Brand Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-neutral-800 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded bg-neutral-900/50 border border-neutral-800">
            <Truck className="w-8 h-8 text-neutral-100 stroke-[1.25]" />
            <div>
              <h4 className="text-xs font-mono tracking-widest text-white uppercase">Express Worldwide Shipping</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Complimentary express shipping over ₹3,000</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded bg-neutral-900/50 border border-neutral-800">
            <RefreshCw className="w-8 h-8 text-neutral-100 stroke-[1.25]" />
            <div>
              <h4 className="text-xs font-mono tracking-widest text-white uppercase">14-Day Seamless Returns</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Hassle-free size exchanges & store credits</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded bg-neutral-900/50 border border-neutral-800">
            <ShieldCheck className="w-8 h-8 text-neutral-100 stroke-[1.25]" />
            <div>
              <h4 className="text-xs font-mono tracking-widest text-white uppercase">Authentic Korean Tailoring</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Direct from Seoul atelier craftsmen</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-neutral-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-light tracking-[0.25em] text-white font-serif block">ZAPIN</span>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-sans">
              Minimalist Korean high-fashion luxury studio. Blending Seoul street culture with contemporary architectural tailoring and premium monolithic aesthetics.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:concierge@zapin.com" className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-[0.2em] text-white uppercase border-b border-neutral-800 pb-2">Collections</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => navTo('shop')} className="hover:text-white transition-colors">All Products</button></li>
              <li><button onClick={() => navTo('men')} className="hover:text-white transition-colors">Men's Apparel</button></li>
              <li><button onClick={() => navTo('women')} className="hover:text-white transition-colors">Women's Collection</button></li>
              <li><button onClick={() => navTo('new-arrivals')} className="hover:text-white transition-colors">New Arrivals</button></li>
              <li><button onClick={() => navTo('wishlist')} className="hover:text-white transition-colors">Saved Wishlist</button></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-[0.2em] text-white uppercase border-b border-neutral-800 pb-2">Customer Care</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => navTo('order-tracking')} className="hover:text-white transition-colors">Track Order</button></li>
              <li><button onClick={() => navTo('my-account')} className="hover:text-white transition-colors">My Account</button></li>
              <li><button onClick={() => navTo('about')} className="hover:text-white transition-colors">About Zapin</button></li>
              <li><button onClick={() => navTo('contact')} className="hover:text-white transition-colors">Contact Support</button></li>
              <li><button onClick={() => navTo('shipping-policy')} className="hover:text-white transition-colors">Shipping Policy</button></li>
              <li><button onClick={() => navTo('return-policy')} className="hover:text-white transition-colors">Returns & Refunds</button></li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-[0.2em] text-white uppercase border-b border-neutral-800 pb-2">Policies</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => navTo('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => navTo('terms')} className="hover:text-white transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => navTo('admin')} className="text-amber-400 hover:text-amber-300 font-mono text-[11px] transition-colors">Zapin Admin Portal</button></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-10 border-b border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h4 className="text-sm tracking-widest text-white uppercase font-mono">Join the Zapin Seoul Club</h4>
            <p className="text-xs text-neutral-400 mt-1">
              Subscribe to receive private drop announcements and get an instant <span className="text-white font-mono">10% OFF</span> code (<span className="text-amber-300 font-mono">WELCOME10</span>).
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex items-center w-full md:w-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="bg-neutral-900 border border-neutral-800 text-white text-xs px-4 py-3 rounded-l focus:outline-none focus:border-neutral-500 w-full sm:w-72"
            />
            <button
              type="submit"
              className="bg-white text-neutral-950 px-5 py-3 text-xs tracking-widest uppercase hover:bg-neutral-200 transition-colors rounded-r flex items-center gap-1 font-mono font-medium"
            >
              {newsletterSubscribed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Send className="w-3.5 h-3.5" />}
              {newsletterSubscribed ? 'Subscribed' : 'Join'}
            </button>
          </form>
        </div>

        {/* Bottom copyright & payment methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <div>© {new Date().getFullYear()} ZAPIN STUDIO INC. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center space-x-3 text-neutral-400 font-mono text-[10px]">
            <span className="border border-neutral-800 px-2 py-0.5 rounded">RAZORPAY</span>
            <span className="border border-neutral-800 px-2 py-0.5 rounded">UPI</span>
            <span className="border border-neutral-800 px-2 py-0.5 rounded">VISA</span>
            <span className="border border-neutral-800 px-2 py-0.5 rounded">MASTERCARD</span>
            <span className="border border-neutral-800 px-2 py-0.5 rounded">CASH ON DELIVERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
