import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageRoute } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setSelectedCategoryFilter,
    cart,
    wishlist,
    setIsSearchOpen,
    setIsCartOpen,
    user,
    isAdmin,
    setIsAdmin,
    adCampaigns
  } = useStore();

  const activeMarqueeAd = adCampaigns.find(ad => ad.status === 'active' && ad.platform === 'Top Marquee Banner');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navLinks: { label: string; page: PageRoute; category?: string }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'SHOP', page: 'shop' },
    { label: 'MEN', page: 'men' },
    { label: 'WOMEN', page: 'women' },
    { label: 'NEW ARRIVALS', page: 'new-arrivals' },
    { label: 'ABOUT US', page: 'about' },
    { label: 'CONTACT', page: 'contact' },
    { label: 'TRACK ORDER', page: 'order-tracking' }
  ];

  const handleNavClick = (page: PageRoute) => {
    if (page === 'men') setSelectedCategoryFilter('men');
    else if (page === 'women') setSelectedCategoryFilter('women');
    else if (page === 'new-arrivals') setSelectedCategoryFilter('new-arrivals');
    else if (page === 'shop') setSelectedCategoryFilter('all');

    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-neutral-950 text-neutral-300 text-[11px] py-2 px-4 text-center font-mono tracking-widest flex items-center justify-between">
        <div className="hidden sm:block text-neutral-400">SEOUL — TOKYO — NEW YORK</div>
        <div className="mx-auto flex items-center gap-2 flex-wrap justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {activeMarqueeAd ? (
            <span className="flex items-center gap-2">
              <span className="text-amber-300 font-bold uppercase">{activeMarqueeAd.title}</span>
              {activeMarqueeAd.promoCode && (
                <span className="bg-amber-400 text-neutral-950 px-1.5 py-0.5 rounded text-[9px] font-bold">
                  CODE: {activeMarqueeAd.promoCode}
                </span>
              )}
            </span>
          ) : (
            <span>COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER ₹3,000</span>
          )}
        </div>
        <div className="hidden sm:block text-neutral-400 text-right">EXPRESS DELIVERY</div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-neutral-800 hover:text-black focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavClick('home')}
            className="text-2xl sm:text-3xl font-light tracking-[0.25em] text-neutral-950 hover:opacity-80 transition-opacity font-serif flex items-center gap-1.5"
          >
            ZAPIN
            <span className="text-[10px] tracking-widest font-mono text-neutral-500 uppercase align-top border border-neutral-300 px-1 py-0.2 rounded">
              SEOUL
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-[0.18em] font-medium text-neutral-700">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              className={`hover:text-neutral-950 transition-colors relative py-2 uppercase ${
                currentPage === link.page
                  ? 'text-neutral-950 font-semibold border-b-2 border-neutral-950'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Icon Actions */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100"
            title="Search products"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* User Account / Login */}
          <button
            onClick={() => setCurrentPage(user ? 'my-account' : 'login')}
            className="p-2 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100 relative"
            title={user ? `Account (${user.name})` : 'Login / Register'}
          >
            <User className="w-5 h-5 stroke-[1.5]" />
            {user && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-black border border-white" />
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setCurrentPage('wishlist')}
            className="p-2 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100 relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neutral-950 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100 relative"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-mono font-bold">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Slide-out Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`text-left py-2.5 text-sm tracking-widest font-medium border-b border-neutral-100 flex items-center justify-between ${
                  currentPage === link.page ? 'text-black font-semibold' : 'text-neutral-600'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentPage('admin');
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 w-full text-center bg-neutral-900 text-amber-300 py-3 text-xs tracking-widest uppercase font-mono rounded flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Open Zapin Admin Control Center
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
