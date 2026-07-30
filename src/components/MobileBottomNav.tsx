import React from 'react';
import { Home, ShoppingBag, Search, Heart, User, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageRoute } from '../types';

export const MobileBottomNav: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cart,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    user,
    isAdmin
  } = useStore();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleNavClick = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      action: () => handleNavClick('home'),
      isActive: currentPage === 'home',
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: ShoppingBag,
      action: () => handleNavClick('shop'),
      isActive: currentPage === 'shop' || currentPage === 'men' || currentPage === 'women' || currentPage === 'new-arrivals',
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      action: () => setIsSearchOpen(true),
      isActive: false,
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      action: () => handleNavClick('wishlist'),
      isActive: currentPage === 'wishlist',
      badge: wishlistCount > 0 ? wishlistCount : null,
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingBag,
      action: () => setIsCartOpen(true),
      isActive: currentPage === 'cart',
      badge: totalCartItems > 0 ? totalCartItems : null,
    },
    {
      id: 'account',
      label: user ? 'Account' : 'Login',
      icon: isAdmin ? ShieldCheck : User,
      action: () => handleNavClick(user ? 'my-account' : 'login'),
      isActive: currentPage === 'my-account' || currentPage === 'login',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 lg:hidden px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-6 gap-1 max-w-md mx-auto items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-lg text-center transition-colors relative ${
                item.isActive
                  ? 'text-black font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isActive ? 'stroke-[2.2]' : 'stroke-[1.75]'}`} />
                {item.badge !== null && item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 bg-neutral-900 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] leading-tight mt-0.5 truncate w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
