import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  Product,
  CartItem,
  Coupon,
  Order,
  UserProfile,
  BannerConfig,
  PageRoute,
  ProductSize,
  ProductCategory,
  AdCampaign,
  AdNetworkConfig
} from '../types';

interface StoreContextType {
  // Navigation
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  selectedCategoryFilter: ProductCategory | 'all';
  setSelectedCategoryFilter: (cat: ProductCategory | 'all') => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;

  // Products (EMPTY by default as mandated by user)
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'reviews'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: ProductSize, color: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartDiscount: number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupons
  coupons: Coupon[];
  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCouponStatus: (code: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (
    shippingDetails: any,
    paymentMethod: 'razorpay' | 'cod'
  ) => Promise<{ success: boolean; order: Order }>;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;

  // Banners & Config
  bannerConfig: BannerConfig;
  updateBannerConfig: (newConfig: Partial<BannerConfig>) => void;

  // Ads & Marketing Campaigns
  adCampaigns: AdCampaign[];
  addAdCampaign: (campaign: Omit<AdCampaign, 'id' | 'spent' | 'clicks' | 'impressions' | 'conversions'>) => void;
  toggleAdStatus: (id: string) => void;
  deleteAdCampaign: (id: string) => void;

  // Ad Network Monetization & Publisher Settings
  adNetworkConfig: AdNetworkConfig;
  updateAdNetworkConfig: (newConfig: Partial<AdNetworkConfig>) => void;

  // Search & Modals
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Auth User
  user: UserProfile | null;
  loginUser: (email: string, name: string) => void;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;

  // Reviews
  addProductReview: (productId: string, review: { userName: string; rating: number; comment: string }) => void;

  // Admin Mode
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const defaultBannerConfig: BannerConfig = {
  heroHeadline: "ZAPIN — SEOUL HIGH FASHION",
  heroSubheadline: "Minimalist Korean Tailoring, Modern Silhouettes & Luxury Craftsmanship.",
  heroButtonText: "EXPLORE COLLECTION",
  heroImageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
  promoText: "SEOUL STREETWEAR DROP — LIMITED ARCHIVAL EDITIONS",
  promoBannerImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1800&auto=format&fit=crop",
};

const defaultAdNetworkConfig: AdNetworkConfig = {
  enabled: true,
  publisherId: '5ca691feaa140cf099df2901ccbf6071',
  networkProvider: 'EffectiveCPM Network',
  directAdUrl: 'https://www.effectivecpmnetwork.com/yfdbxvqp6?key=5ca691feaa140cf099df2901ccbf6071',
  headerBannerEnabled: true,
  inFeedAdsEnabled: true,
  sidebarAdsEnabled: true,
  footerBannerEnabled: true,
  anchorAdEnabled: true,
  autoAdsEnabled: true,
  bodyScriptEnabled: true,
  bodyAdCode: '<script type="text/javascript" src="//www.effectivecpmnetwork.com/yfdbxvqp6?key=5ca691feaa140cf099df2901ccbf6071"></script>',
  popupAdEnabled: true,
  customScriptSnippet: '<script type="text/javascript" src="//www.effectivecpmnetwork.com/yfdbxvqp6?key=5ca691feaa140cf099df2901ccbf6071"></script>',
  estimatedEarnings: 18450,
  monthlyImpressions: 124500,
  monthlyClicks: 3820,
  pageRpm: 148.20
};

const defaultCoupons: Coupon[] = [
  { code: 'ZAPIN10', discountType: 'percentage', value: 10, minOrderAmount: 0, active: true },
  { code: 'KOREAN20', discountType: 'percentage', value: 20, minOrderAmount: 2000, active: true },
  { code: 'WELCOME500', discountType: 'flat', value: 500, minOrderAmount: 1500, active: true }
];

const defaultAdCampaigns: AdCampaign[] = [
  {
    id: 'ad-101',
    title: 'Seoul Autumn Oversized Drop - Meta Ads',
    platform: 'Meta (Instagram/FB)',
    budget: 25000,
    spent: 14200,
    clicks: 1840,
    impressions: 48500,
    conversions: 86,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    targetUrl: '/shop',
    promoCode: 'SEOUL30',
    startDate: '2026-07-01'
  },
  {
    id: 'ad-102',
    title: 'Google Shopping - Korean Trench Coats & Jackets',
    platform: 'Google Search Ads',
    budget: 40000,
    spent: 28900,
    clicks: 3120,
    impressions: 89000,
    conversions: 142,
    status: 'active',
    targetUrl: '/men',
    startDate: '2026-07-10'
  },
  {
    id: 'ad-103',
    title: 'Flash Sale - Marquee Header Banner Ad',
    platform: 'Top Marquee Banner',
    budget: 5000,
    spent: 1200,
    clicks: 650,
    impressions: 18200,
    conversions: 34,
    status: 'active',
    promoCode: 'FREE_SHIP',
    startDate: '2026-07-15'
  }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // STRICT REQUIREMENT: Products initialized as strictly EMPTY []
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('zapin_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return []; // Empty list
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zapin_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('zapin_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('zapin_coupons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return defaultCoupons; }
    }
    return defaultCoupons;
  });

  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('zapin_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [bannerConfig, setBannerConfig] = useState<BannerConfig>(() => {
    const saved = localStorage.getItem('zapin_banner_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return defaultBannerConfig; }
    }
    return defaultBannerConfig;
  });

  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>(() => {
    const saved = localStorage.getItem('zapin_ad_campaigns');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return defaultAdCampaigns; }
    }
    return defaultAdCampaigns;
  });

  const [adNetworkConfig, setAdNetworkConfig] = useState<AdNetworkConfig>(() => {
    const saved = localStorage.getItem('zapin_ad_network_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return defaultAdNetworkConfig; }
    }
    return defaultAdNetworkConfig;
  });

  useEffect(() => {
    localStorage.setItem('zapin_ad_campaigns', JSON.stringify(adCampaigns));
  }, [adCampaigns]);

  useEffect(() => {
    localStorage.setItem('zapin_ad_network_config', JSON.stringify(adNetworkConfig));
  }, [adNetworkConfig]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('zapin_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const saved = localStorage.getItem('zapin_is_admin');
    return saved !== 'false';
  });

  // Firestore Realtime Listeners
  useEffect(() => {
    try {
      const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
        const fetchedProducts: Product[] = [];
        snapshot.forEach((docSnap) => {
          fetchedProducts.push(docSnap.data() as Product);
        });
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        }
      }, (err) => {
        console.warn('Firestore products snapshot listener warning:', err);
      });

      const unsubscribeOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
        const fetchedOrders: Order[] = [];
        snapshot.forEach((docSnap) => {
          fetchedOrders.push(docSnap.data() as Order);
        });
        if (fetchedOrders.length > 0) {
          setOrders(fetchedOrders);
        }
      }, (err) => {
        console.warn('Firestore orders snapshot listener warning:', err);
      });

      return () => {
        unsubscribeProducts();
        unsubscribeOrders();
      };
    } catch (e) {
      console.warn('Failed to subscribe to Firestore:', e);
    }
  }, []);

  // Persist states
  useEffect(() => {
    localStorage.setItem('zapin_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('zapin_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zapin_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('zapin_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('zapin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zapin_banner_config', JSON.stringify(bannerConfig));
  }, [bannerConfig]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('zapin_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('zapin_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('zapin_is_admin', String(isAdmin));
  }, [isAdmin]);

  // Product Operations
  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'reviews'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'zap-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reviews: []
    };
    setProducts((prev) => [newProduct, ...prev]);
    try {
      await setDoc(doc(db, 'products', newProduct.id), newProduct);
    } catch (err) {
      console.error('Error saving product to Firestore:', err);
    }
  };

  const updateProduct = async (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updatedProd = { ...p, ...updated, updatedAt: new Date().toISOString() };
          setDoc(doc(db, 'products', id), updatedProd).catch((e) => console.error('Firestore update error:', e));
          return updatedProd;
        }
        return p;
      })
    );
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.product.id !== id));
    setWishlist((prev) => prev.filter((w) => w.id !== id));
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      console.error('Error deleting product from Firestore:', err);
    }
  };

  // Cart Operations
  const addToCart = (
    product: Product,
    size: ProductSize,
    color: { name: string; hex: string },
    quantity = 1
  ) => {
    const cartItemId = `${product.id}-${size}-${color.name}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prev, { id: cartItemId, product, size, color, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let cartDiscount = 0;
  if (activeCoupon) {
    if (activeCoupon.discountType === 'percentage') {
      cartDiscount = Math.round((cartSubtotal * activeCoupon.value) / 100);
    } else {
      cartDiscount = Math.min(cartSubtotal, activeCoupon.value);
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  // Wishlist Operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Coupon Operations
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }
    if (cartSubtotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Minimum order value of ₹${found.minOrderAmount} required for this coupon.`
      };
    }
    setActiveCoupon(found);
    return { success: true, message: `Coupon '${found.code}' applied successfully!` };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  };

  const toggleCouponStatus = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  // Orders
  const placeOrder = async (shippingDetails: any, paymentMethod: 'razorpay' | 'cod') => {
    const newOrder: Order = {
      id: 'ZAP-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartSubtotal > 3000 ? 0 : 150,
      total: cartTotal + (cartSubtotal > 3000 ? 0 : 150),
      shippingAddress: shippingDetails,
      paymentMethod,
      paymentStatus: paymentMethod === 'razorpay' ? 'paid' : 'pending',
      orderStatus: 'pending',
      couponCode: activeCoupon?.code,
      trackingNumber: 'TRK-ZP-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
        'en-US',
        { month: 'short', day: 'numeric', year: 'numeric' }
      )
    };

    setOrders((prev) => [newOrder, ...prev]);

    try {
      await setDoc(doc(db, 'orders', newOrder.id), newOrder);
    } catch (err) {
      console.error('Error saving order to Firestore:', err);
    }

    // Add order to user if logged in
    if (user) {
      setUser({
        ...user,
        orders: [newOrder, ...user.orders]
      });
    }

    clearCart();
    setActiveCoupon(null);

    return { success: true, order: newOrder };
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedOrder = { ...o, orderStatus: status };
          setDoc(doc(db, 'orders', orderId), updatedOrder).catch((e) => console.error('Firestore order update error:', e));
          return updatedOrder;
        }
        return o;
      })
    );
  };

  const updateBannerConfig = (newConfig: Partial<BannerConfig>) => {
    setBannerConfig((prev) => ({ ...prev, ...newConfig }));
  };

  // Ads & Marketing
  const addAdCampaign = (data: Omit<AdCampaign, 'id' | 'spent' | 'clicks' | 'impressions' | 'conversions'>) => {
    const newCampaign: AdCampaign = {
      ...data,
      id: 'ad-' + Date.now(),
      spent: 0,
      clicks: 0,
      impressions: 0,
      conversions: 0,
    };
    setAdCampaigns((prev) => [newCampaign, ...prev]);
  };

  const toggleAdStatus = (id: string) => {
    setAdCampaigns((prev) =>
      prev.map((ad) => {
        if (ad.id === id) {
          const nextStatus = ad.status === 'active' ? 'paused' : 'active';
          return { ...ad, status: nextStatus };
        }
        return ad;
      })
    );
  };

  const deleteAdCampaign = (id: string) => {
    setAdCampaigns((prev) => prev.filter((ad) => ad.id !== id));
  };

  const updateAdNetworkConfig = (newConfig: Partial<AdNetworkConfig>) => {
    setAdNetworkConfig((prev) => ({ ...prev, ...newConfig }));
  };

  // Auth User
  const loginUser = (email: string, name: string) => {
    const existing = user || {
      id: 'usr-' + Date.now(),
      name,
      email,
      addresses: [],
      orders: [],
      wishlistProductIds: []
    };
    setUser({ ...existing, email, name });
  };

  const logoutUser = () => {
    setUser(null);
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  // Review
  const addProductReview = (productId: string, reviewData: { userName: string; rating: number; comment: string }) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newReview = {
            id: 'rev-' + Date.now(),
            userName: reviewData.userName,
            rating: reviewData.rating,
            comment: reviewData.comment,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            verifiedBuyer: true
          };
          return {
            ...p,
            reviews: [newReview, ...p.reviews]
          };
        }
        return p;
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedProductId,
        setSelectedProductId,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartSubtotal,
        cartDiscount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        coupons,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        toggleCouponStatus,
        orders,
        placeOrder,
        updateOrderStatus,
        bannerConfig,
        updateBannerConfig,
        adCampaigns,
        addAdCampaign,
        toggleAdStatus,
        deleteAdCampaign,
        adNetworkConfig,
        updateAdNetworkConfig,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        user,
        loginUser,
        logoutUser,
        updateUserProfile,
        addProductReview,
        isAdmin,
        setIsAdmin
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
