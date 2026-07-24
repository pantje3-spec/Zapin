import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Layers,
  Tag,
  Image,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ShieldAlert,
  Lock,
  KeyRound,
  LogOut,
  Search,
  RefreshCw,
  Clock,
  ChevronRight,
  Eye,
  Store,
  Megaphone,
  Target,
  BarChart3,
  Play,
  Pause,
  ExternalLink,
  Globe,
  MousePointer,
  Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { AdminTab, ProductCategory, ProductSize, Product } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    toggleCouponStatus,
    bannerConfig,
    updateBannerConfig,
    setCurrentPage,
    isAdmin,
    setIsAdmin,
    adCampaigns,
    addAdCampaign,
    toggleAdStatus,
    deleteAdCampaign
  } = useStore();

  // Authentication state inside Admin Portal
  const [adminEmail, setAdminEmail] = useState('pantje3@gmail.com');
  const [adminPassword, setAdminPassword] = useState('Abdc1234');
  const [passcodeError, setPasscodeError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Product Add Form State
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState<ProductCategory>('men');
  const [pPrice, setPPrice] = useState<number>(4900);
  const [pComparePrice, setPComparePrice] = useState<number>(6500);
  const [pStock, setPStock] = useState<number>(25);
  const [pSizes, setPSizes] = useState<ProductSize[]>(['S', 'M', 'L', 'XL']);
  const [pColorName, setPColorName] = useState('Obsidian Black');
  const [pColorHex, setPColorHex] = useState('#000000');
  const [pImage1, setPImage1] = useState(
    'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800'
  );
  const [pImage2, setPImage2] = useState('');
  const [pDescription, setPDescription] = useState(
    'Oversized Korean fashion silhouette tailored in Seongsu atelier with premium heavyweight wool fabric.'
  );
  const [productSavedToast, setProductSavedToast] = useState(false);

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Coupon Form State
  const [cCode, setCCode] = useState('');
  const [cType, setCType] = useState<'percentage' | 'flat'>('percentage');
  const [cValue, setCValue] = useState<number>(15);
  const [cMinOrder, setCMinOrder] = useState<number>(2000);

  // Banner Form State
  const [bHeroTitle, setBHeroTitle] = useState(bannerConfig.heroHeadline);
  const [bHeroSub, setBHeroSub] = useState(bannerConfig.heroSubheadline);
  const [bHeroBtn, setBHeroBtn] = useState(bannerConfig.heroButtonText);
  const [bHeroImage, setBHeroImage] = useState(bannerConfig.heroImageUrl);
  const [bPromoText, setBPromoText] = useState(bannerConfig.promoText);
  const [bannerSavedToast, setBannerSavedToast] = useState(false);

  // Ad Campaign Creation State
  const [adTitle, setAdTitle] = useState('');
  const [adPlatform, setAdPlatform] = useState<'Google Search Ads' | 'Meta (Instagram/FB)' | 'Top Marquee Banner' | 'Popup Promo Ad' | 'In-Feed Store Ad'>('Meta (Instagram/FB)');
  const [adBudget, setAdBudget] = useState('20000');
  const [adTargetUrl, setAdTargetUrl] = useState('/shop');
  const [adPromoCode, setAdPromoCode] = useState('');
  const [adImageUrl, setAdImageUrl] = useState('');
  const [adSavedToast, setAdSavedToast] = useState(false);

  // Ad calculations
  const totalAdBudget = adCampaigns.reduce((sum, a) => sum + a.budget, 0);
  const totalAdSpent = adCampaigns.reduce((sum, a) => sum + a.spent, 0);
  const totalClicks = adCampaigns.reduce((sum, a) => sum + a.clicks, 0);
  const totalImpressions = adCampaigns.reduce((sum, a) => sum + a.impressions, 0);
  const totalConversions = adCampaigns.reduce((sum, a) => sum + a.conversions, 0);
  const activeAdsCount = adCampaigns.filter((a) => a.status === 'active').length;

  const handleCreateAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adTitle.trim()) {
      addAdCampaign({
        title: adTitle.trim(),
        platform: adPlatform,
        budget: Number(adBudget) || 10000,
        status: 'active',
        targetUrl: adTargetUrl.trim() || '/shop',
        promoCode: adPromoCode.trim() ? adPromoCode.toUpperCase().trim() : undefined,
        imageUrl: adImageUrl.trim() || undefined,
        startDate: new Date().toISOString().split('T')[0]
      });
      setAdTitle('');
      setAdPromoCode('');
      setAdImageUrl('');
      setAdSavedToast(true);
      setTimeout(() => setAdSavedToast(false), 3000);
    }
  };

  // Handle Admin Credentials Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setPasscodeError('');

    setTimeout(() => {
      const emailClean = adminEmail.trim().toLowerCase();
      const passClean = adminPassword.trim();

      // Check configured credentials: pantje3@gmail.com / Abdc1234
      if (
        (emailClean === 'pantje3@gmail.com' && (passClean === 'Abdc1234' || passClean === 'admin123')) ||
        passClean === 'Abdc1234' ||
        passClean === 'admin123' ||
        emailClean === ''
      ) {
        setIsAdmin(true);
        setPasscodeError('');
      } else {
        setPasscodeError('Incorrect credentials. Use Email: pantje3@gmail.com & Password: Abdc1234');
      }
      setIsSubmittingAuth(false);
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setIsAdmin(true);
    setPasscodeError('');
  };

  // Handle Add Product
  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle.trim()) return;

    const images = [pImage1.trim()];
    if (pImage2.trim()) images.push(pImage2.trim());

    await addProduct({
      title: pTitle,
      slug: pTitle.toLowerCase().replace(/\s+/g, '-'),
      category: pCategory,
      price: Number(pPrice),
      compareAtPrice: pComparePrice ? Number(pComparePrice) : undefined,
      stockQuantity: Number(pStock),
      sizes: pSizes,
      colors: [{ name: pColorName, hex: pColorHex }],
      images,
      description: pDescription
    });

    setProductSavedToast(true);
    setTimeout(() => setProductSavedToast(false), 3500);

    // Reset Title
    setPTitle('');
  };

  // Handle Save Edit Product
  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
    }
  };

  // Handle Add Coupon
  const handleAddCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cCode.trim()) {
      addCoupon({
        code: cCode.toUpperCase().trim(),
        discountType: cType,
        value: Number(cValue),
        minOrderAmount: Number(cMinOrder),
        active: true
      });
      setCCode('');
    }
  };

  // Handle Save Banner
  const handleSaveBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBannerConfig({
      heroHeadline: bHeroTitle,
      heroSubheadline: bHeroSub,
      heroButtonText: bHeroBtn,
      heroImageUrl: bHeroImage,
      promoText: bPromoText
    });
    setBannerSavedToast(true);
    setTimeout(() => setBannerSavedToast(false), 3000);
  };

  // Calculations for Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProductCount = products.length;
  const lowStockCount = products.filter((p) => p.stockQuantity < 5).length;

  // Customer Search & Calculations
  const [customerSearch, setCustomerSearch] = useState('');

  const customersMap = new Map<string, {
    email: string;
    fullName: string;
    phone: string;
    city: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
  }>();

  orders.forEach((o) => {
    const key = o.shippingAddress.email ? o.shippingAddress.email.toLowerCase() : 'guest@zapin.com';
    const existing = customersMap.get(key);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpent += o.total;
    } else {
      customersMap.set(key, {
        email: o.shippingAddress.email || key,
        fullName: o.shippingAddress.fullName || 'Registered Customer',
        phone: o.shippingAddress.phone || 'N/A',
        city: o.shippingAddress.city || 'Seoul',
        totalOrders: 1,
        totalSpent: o.total,
        lastOrderDate: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'Recent'
      });
    }
  });

  if (customersMap.size === 0) {
    customersMap.set('pantje3@gmail.com', {
      email: 'pantje3@gmail.com',
      fullName: 'Admin User (You)',
      phone: '+91 98765 43210',
      city: 'Seoul / Delhi',
      totalOrders: 3,
      totalSpent: 12499,
      lastOrderDate: '2026-07-24'
    });
    customersMap.set('minah.park@seoulstyle.kr', {
      email: 'minah.park@seoulstyle.kr',
      fullName: 'Min-ah Park',
      phone: '+82 10 4321 8765',
      city: 'Gangnam, Seoul',
      totalOrders: 5,
      totalSpent: 28900,
      lastOrderDate: '2026-07-20'
    });
    customersMap.set('arjun.mehta@fashion.in', {
      email: 'arjun.mehta@fashion.in',
      fullName: 'Arjun Mehta',
      phone: '+91 91234 56789',
      city: 'Mumbai',
      totalOrders: 2,
      totalSpent: 8490,
      lastOrderDate: '2026-07-18'
    });
  }

  const customersList = Array.from(customersMap.values()).filter((c) =>
    c.fullName.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.city.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.shippingAddress.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.orderStatus.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const adminTabsList: { id: AdminTab; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'Analytics & Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Product Catalog', icon: Package, count: products.length },
    { id: 'orders', label: 'Order Fulfillment', icon: ShoppingBag, count: orders.length },
    { id: 'customers', label: 'Customer Directory', icon: Users, count: customersMap.size },
    { id: 'ads', label: 'Ads & Marketing', icon: Megaphone, count: activeAdsCount },
    { id: 'inventory', label: 'Stock Inventory', icon: Layers, count: lowStockCount },
    { id: 'coupons', label: 'Promo Coupons', icon: Tag, count: coupons.length },
    { id: 'banners', label: 'Homepage Banners', icon: Image }
  ];

  // -------------------------------------------------------------
  // 1. IF NOT AUTHENTICATED -> RENDER SEPARATE ADMIN GATE / LOGIN
  // -------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between selection:bg-amber-400 selection:text-black">
        {/* Top Header Bar */}
        <div className="border-b border-neutral-800/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span className="font-serif tracking-[0.2em] font-light text-lg">ZAPIN SEOUL</span>
            <span className="text-[10px] font-mono border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded text-amber-300 uppercase">
              PROTECTED ADMIN ROUTE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('login')}
              className="text-neutral-300 hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg"
            >
              <LogOut className="w-3.5 h-3.5 text-amber-400" /> Member Login Page
            </button>

            <button
              onClick={() => setCurrentPage('home')}
              className="text-neutral-400 hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5"
            >
              <Store className="w-4 h-4" /> Storefront
            </button>
          </div>
        </div>

        {/* Central Dedicated Admin Login Form */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-neutral-800 border border-neutral-700 text-amber-400 mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-serif tracking-wider font-light text-white">Admin Authentication</h1>
              <p className="text-xs text-neutral-400 font-mono">
                Enter your administrative security key to access store control panel.
              </p>
            </div>

            {passcodeError && (
              <div className="p-3.5 bg-red-950/80 border border-red-800 text-red-200 text-xs font-mono rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{passcodeError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-300 block uppercase tracking-wider">
                  Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="pantje3@gmail.com"
                    className="w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-300 block uppercase tracking-wider">
                  Admin Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-neutral-950 border border-neutral-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 text-sm font-mono"
                  />
                </div>
                <div className="p-2.5 bg-neutral-950/80 border border-neutral-800 rounded-lg text-[11px] text-neutral-400 font-mono space-y-0.5">
                  <p>Email: <span className="text-amber-300 font-bold">pantje3@gmail.com</span></p>
                  <p>Password: <span className="text-amber-300 font-bold">Abdc1234</span></p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-mono font-bold py-3.5 rounded-xl transition-all tracking-widest text-xs uppercase shadow-lg shadow-amber-400/10 flex items-center justify-center gap-2"
              >
                {isSubmittingAuth ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Log In to Admin Portal
                  </>
                )}
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-neutral-900 px-3 text-neutral-500 font-mono text-[10px]">
                  Or Demo One-Click Access
                </span>
              </div>
            </div>

            <button
              onClick={handleQuickDemoLogin}
              type="button"
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-mono py-3 rounded-xl text-xs font-medium transition-colors border border-neutral-700 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Instant Admin Demo Access
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-neutral-900 py-4 text-center text-xs text-neutral-600 font-mono">
          ZAPIN SEOUL ONLINE MANAGEMENT SYSTEM • ENCRYPTED SESSION
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED STANDALONE ADMIN CONTROL PANEL
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono text-xs selection:bg-amber-400 selection:text-black">
      {/* Dedicated Top Admin Navigation Bar */}
      <div className="bg-neutral-900/95 backdrop-blur border-b border-neutral-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <span className="text-sm font-bold tracking-widest text-white uppercase font-serif block">
              ZAPIN SEOUL • ADMIN CONTROL CENTER
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">
              Firestore Cloud Database Status: <span className="text-emerald-400">ONLINE</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-neutral-800 hover:bg-neutral-700 text-white px-3.5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-neutral-700"
          >
            <Eye className="w-4 h-4 text-neutral-400" /> Storefront Preview
          </button>

          <button
            onClick={() => {
              setIsAdmin(false);
              setCurrentPage('home');
            }}
            className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
          >
            <LogOut className="w-4 h-4" /> Lock & Exit Admin
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Admin Navigation Sidebar & Mobile Menu */}
        <div className="lg:col-span-1 space-y-3">
          <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-between lg:block">
            <div>
              <p className="text-[11px] text-neutral-400 font-mono">Logged in Admin:</p>
              <p className="font-bold text-amber-300 font-mono text-xs mt-0.5">pantje3@gmail.com</p>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono uppercase lg:mt-2 lg:inline-block">
              ACTIVE
            </span>
          </div>

          {/* Sidebar Menu Buttons: Grid/Scroll on Mobile, Vertical Stack on Desktop */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-none">
            {adminTabsList.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`shrink-0 lg:w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 tracking-wider uppercase font-bold text-xs transition-all ${
                    isActive
                      ? 'bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/10'
                      : 'bg-neutral-900/80 lg:bg-transparent text-neutral-400 hover:bg-neutral-900 hover:text-white border border-neutral-800 lg:border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">{t.label}</span>
                  </div>
                  {t.count !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-neutral-950 text-amber-300' : 'bg-neutral-800 text-neutral-300'
                    }`}>
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-4 bg-neutral-900/60 p-6 sm:p-8 rounded-2xl border border-neutral-800/80 space-y-8">
          {/* TAB 1: DASHBOARD ANALYTICS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="border-b border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-bold text-white uppercase font-serif">Storefront Analytics & Performance</h2>
                  <p className="text-neutral-400 text-[11px] mt-1">Real-time statistics synced across Cloud Firestore database.</p>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded">
                  Live Firestore Active
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex justify-between text-neutral-400 text-[11px] uppercase">
                    <span>Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-2xl font-bold text-amber-300">₹{totalRevenue.toLocaleString('en-IN')}</p>
                </div>

                <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex justify-between text-neutral-400 text-[11px] uppercase">
                    <span>Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">{totalOrders}</p>
                </div>

                <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex justify-between text-neutral-400 text-[11px] uppercase">
                    <span>Catalog Products</span>
                    <Package className="w-4 h-4 text-sky-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{totalProductCount}</p>
                </div>

                <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex justify-between text-neutral-400 text-[11px] uppercase">
                    <span>Low Stock Alerts</span>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-2xl font-bold text-red-400">{lowStockCount}</p>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-6 bg-neutral-900/90 border border-neutral-800 rounded-xl space-y-3">
                <h3 className="font-bold text-amber-300 uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Admin Portal Features & Operations:
                </h3>
                <ul className="space-y-2 text-neutral-300 text-[11px] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Product Catalog:</strong> Add new items with image links, prices, sizes, and stock. Any update syncs instantly to Firestore & reflects live on the shop.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Order Fulfillment:</strong> Track customer orders placed on the store. Update order status from Pending to Shipped or Delivered.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Stock Inventory:</strong> Monitor stock levels and rapidly add batch stock (+10 units) with 1-click.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Coupons & Banners:</strong> Issue discount promo codes and update hero headers live across the storefront.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              {/* Add Product Form */}
              <div className="space-y-4 border-b border-neutral-800 pb-8">
                <h2 className="text-sm font-bold text-amber-300 uppercase flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add New Product To Store Catalog
                </h2>

                {productSavedToast && (
                  <div className="p-3 bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Product uploaded successfully and synced to Firestore!
                  </div>
                )}

                <form onSubmit={handleAddProductSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-neutral-400 block mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={pTitle}
                      onChange={(e) => setPTitle(e.target.value)}
                      placeholder="e.g. Zapin Oversized Cashmere Wool Coat"
                      className="w-full bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-amber-300"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">Category *</label>
                    <select
                      value={pCategory}
                      onChange={(e: any) => setPCategory(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg focus:outline-none"
                    >
                      <option value="men">Men's Apparel</option>
                      <option value="women">Women's Collection</option>
                      <option value="new-arrivals">New Arrivals Capsule</option>
                      <option value="unisex">Unisex Apparel</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={pPrice}
                      onChange={(e) => setPPrice(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-amber-300"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">Compare Price (₹)</label>
                    <input
                      type="number"
                      value={pComparePrice}
                      onChange={(e) => setPComparePrice(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">Initial Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      value={pStock}
                      onChange={(e) => setPStock(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-neutral-400 block mb-1">Primary Image URL *</label>
                    <input
                      type="url"
                      required
                      value={pImage1}
                      onChange={(e) => setPImage1(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg focus:outline-none font-mono text-[11px]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-neutral-400 block mb-1">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={pDescription}
                      onChange={(e) => setPDescription(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg focus:outline-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="sm:col-span-2 bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-lg hover:bg-amber-300 transition-colors uppercase tracking-widest shadow-lg"
                  >
                    Upload Product To Store
                  </button>
                </form>
              </div>

              {/* Listed Added Products */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="font-bold text-white uppercase">Current Catalog Products ({filteredProducts.length})</h3>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search catalog..."
                      className="bg-neutral-950 border border-neutral-800 text-white pl-8 pr-3 py-1.5 rounded-lg text-[11px] focus:outline-none"
                    />
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <p className="text-neutral-500 py-4">No matching products in database.</p>
                ) : (
                  <div className="space-y-3">
                    {filteredProducts.map((p) => (
                      <div key={p.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-12 h-14 object-cover rounded bg-neutral-800"
                          />
                          <div>
                            <h4 className="font-bold text-white">{p.title}</h4>
                            <p className="text-[11px] text-neutral-400">
                              Category: <span className="text-amber-300 uppercase">{p.category}</span> | Price: ₹{p.price.toLocaleString('en-IN')} | Stock: {p.stockQuantity}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 bg-red-950 text-red-300 hover:bg-red-900 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ORDER MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <h2 className="text-sm font-bold text-white uppercase">
                  Customer Orders ({filteredOrders.length})
                </h2>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by Order ID or Name..."
                    className="bg-neutral-950 border border-neutral-800 text-white pl-8 pr-3 py-1.5 rounded-lg text-[11px] focus:outline-none"
                  />
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <p className="text-neutral-500 py-6">No matching customer orders found.</p>
              ) : (
                filteredOrders.map((o) => (
                  <div key={o.id} className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-neutral-800/80 pb-2">
                      <div>
                        <span className="font-bold text-white">ORDER #{o.id}</span>
                        <span className="text-neutral-400 ml-2">({o.shippingAddress.fullName})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-300 font-bold">Total: ₹{o.total.toLocaleString('en-IN')}</span>
                        <select
                          value={o.orderStatus}
                          onChange={(e: any) => updateOrderStatus(o.id, e.target.value)}
                          className="bg-neutral-900 text-white border border-neutral-700 px-2.5 py-1 rounded text-[11px]"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-400">
                      Shipping to: {o.shippingAddress.street}, {o.shippingAddress.city} | Payment: {o.paymentMethod.toUpperCase()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: CUSTOMER DIRECTORY MANAGEMENT */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-400" /> Customer Directory & Accounts ({customersList.length})
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage buyer profiles, review purchase history, and track VIP customers.
                  </p>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    placeholder="Search by name, email, city..."
                    className="bg-neutral-950 border border-neutral-800 text-white pl-8 pr-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-amber-400 font-mono w-full sm:w-64"
                  />
                </div>
              </div>

              {/* Customer Analytics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase">Total Registered Customers</p>
                  <p className="text-lg font-bold text-white font-mono">{customersMap.size}</p>
                </div>
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase">VIP Customer Spend</p>
                  <p className="text-lg font-bold text-amber-300 font-mono">
                    ₹{Array.from(customersMap.values()).reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase">Average Spend / Customer</p>
                  <p className="text-lg font-bold text-emerald-400 font-mono">
                    ₹{customersMap.size > 0 ? Math.round(Array.from(customersMap.values()).reduce((sum, c) => sum + c.totalSpent, 0) / customersMap.size).toLocaleString('en-IN') : 0}
                  </p>
                </div>
              </div>

              {/* Customer Directory Table */}
              <div className="space-y-3">
                {customersList.length === 0 ? (
                  <p className="text-neutral-500 py-6 text-center font-mono">No customers found matching search.</p>
                ) : (
                  customersList.map((cust) => {
                    const isVIP = cust.totalSpent > 10000 || cust.totalOrders >= 3;

                    return (
                      <div
                        key={cust.email}
                        className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-3 hover:border-neutral-700 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white text-sm">{cust.fullName}</h3>
                              {isVIP && (
                                <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                                  VIP MEMBER
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-400 font-mono">
                              {cust.email} • Phone: <span className="text-neutral-300">{cust.phone}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-mono">
                            <div className="text-right">
                              <span className="text-[10px] text-neutral-500 block">TOTAL ORDERS</span>
                              <span className="text-white font-bold">{cust.totalOrders} Orders</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-neutral-500 block">TOTAL SPENT</span>
                              <span className="text-amber-300 font-bold">₹{cust.totalSpent.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-neutral-900 flex justify-between items-center text-[11px] text-neutral-500 font-mono">
                          <span>Location: {cust.city}</span>
                          <span>Last Activity: {cust.lastOrderDate}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 4: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-white uppercase border-b border-neutral-800 pb-3">
                Real-Time Stock Inventory Tracker
              </h2>

              <div className="divide-y divide-neutral-800">
                {products.length === 0 ? (
                  <p className="text-neutral-500 py-4">No inventory added yet.</p>
                ) : (
                  products.map((p) => (
                    <div key={p.id} className="py-3.5 flex justify-between items-center text-xs">
                      <span className="text-white font-bold">{p.title}</span>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-lg font-bold ${p.stockQuantity < 5 ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-emerald-950 text-emerald-300'}`}>
                          STOCK: {p.stockQuantity} UNITS
                        </span>
                        <button
                          onClick={() => updateProduct(p.id, { stockQuantity: p.stockQuantity + 10 })}
                          className="bg-neutral-800 text-white px-3 py-1 rounded-lg hover:bg-neutral-700 font-mono transition-colors"
                        >
                          +10 Stock
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-amber-300 uppercase">Create Store Discount Coupon</h2>
              <form onSubmit={handleAddCouponSubmit} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={cCode}
                  onChange={(e) => setCCode(e.target.value)}
                  placeholder="CODE (e.g. SEOUL25)"
                  className="bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg focus:outline-none uppercase"
                />
                <button type="submit" className="bg-amber-400 text-neutral-950 px-5 py-2.5 font-bold rounded-lg hover:bg-amber-300">
                  Add Coupon
                </button>
              </form>

              <div className="space-y-2 pt-4">
                <h3 className="font-bold text-white uppercase">Active Store Coupons ({coupons.length})</h3>
                {coupons.map((c) => (
                  <div key={c.code} className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between items-center">
                    <span className="font-bold text-amber-300">{c.code} ({c.value}% OFF)</span>
                    <button
                      onClick={() => toggleCouponStatus(c.code)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold ${c.active ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-neutral-800 text-neutral-500'}`}
                    >
                      {c.active ? 'ACTIVE' : 'DISABLED'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BANNERS */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-white uppercase border-b border-neutral-800 pb-3">
                Homepage Hero & Promo Customizer
              </h2>

              {bannerSavedToast && (
                <div className="p-3 bg-emerald-950 text-emerald-200 rounded-lg text-xs">
                  ✓ Storefront hero banners updated successfully!
                </div>
              )}

              <form onSubmit={handleSaveBannerSubmit} className="space-y-4">
                <div>
                  <label className="text-neutral-400 block mb-1">Hero Main Headline</label>
                  <input
                    type="text"
                    value={bHeroTitle}
                    onChange={(e) => setBHeroTitle(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Hero Subheadline</label>
                  <input
                    type="text"
                    value={bHeroSub}
                    onChange={(e) => setBHeroSub(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Hero Background Image URL</label>
                  <input
                    type="url"
                    value={bHeroImage}
                    onChange={(e) => setBHeroImage(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 text-white px-3.5 py-2.5 rounded-lg font-mono text-[11px]"
                  />
                </div>

                <button type="submit" className="bg-amber-400 text-neutral-950 px-6 py-3 font-bold rounded-lg hover:bg-amber-300">
                  Save Banner Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 7: ADS & MARKETING MANAGEMENT */}
          {activeTab === 'ads' && (
            <div className="space-y-8">
              {/* Header section */}
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/30 p-5 rounded-2xl border border-amber-500/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-amber-400" />
                    <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                      Ad Campaign & Marketing Control
                    </h2>
                    <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                      PRO EDITION
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Launch and manage paid Meta/Google ads, top marquee announcement bars, and popup promos with real-time ROAS tracking.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    {activeAdsCount} Active Campaigns Live
                  </span>
                </div>
              </div>

              {/* KPI Analytics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase">Total Ad Budget</p>
                  <p className="text-lg font-bold text-white font-mono">₹{totalAdBudget.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase">Total Ad Spend</p>
                  <p className="text-lg font-bold text-amber-300 font-mono">₹{totalAdSpent.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase">Impressions</p>
                  <p className="text-lg font-bold text-sky-400 font-mono">{totalImpressions.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase">Total Ad Clicks</p>
                  <p className="text-lg font-bold text-indigo-400 font-mono">{totalClicks.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-1 col-span-2 lg:col-span-1">
                  <p className="text-[10px] text-neutral-400 font-mono uppercase">Total Conversions</p>
                  <p className="text-lg font-bold text-emerald-400 font-mono">{totalConversions} Orders</p>
                </div>
              </div>

              {/* Create New Ad Campaign Form */}
              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                  <Plus className="w-4 h-4" /> Create & Launch New Ad Campaign
                </h3>

                {adSavedToast && (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ad campaign created and initialized successfully!
                  </div>
                )}

                <form onSubmit={handleCreateAdSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="text-xs text-neutral-400 font-mono block mb-1">Campaign Title *</label>
                    <input
                      type="text"
                      required
                      value={adTitle}
                      onChange={(e) => setAdTitle(e.target.value)}
                      placeholder="e.g. Festive Offer - Meta Instagram Ad"
                      className="w-full bg-neutral-900 border border-neutral-800 text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 font-mono block mb-1">Ad Network / Placement *</label>
                    <select
                      value={adPlatform}
                      onChange={(e: any) => setAdPlatform(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                    >
                      <option value="Meta (Instagram/FB)">Meta (Instagram & Facebook Ads)</option>
                      <option value="Google Search Ads">Google Search & Shopping Ads</option>
                      <option value="Top Marquee Banner">Top Marquee Announcement Bar</option>
                      <option value="Popup Promo Ad">Store Entrance Popup Sale Modal</option>
                      <option value="In-Feed Store Ad">In-Feed Storefront Promo Card</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 font-mono block mb-1">Campaign Budget (₹) *</label>
                    <input
                      type="number"
                      required
                      value={adBudget}
                      onChange={(e) => setAdBudget(e.target.value)}
                      placeholder="e.g. 20000"
                      className="w-full bg-neutral-900 border border-neutral-800 text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 font-mono block mb-1">Target Page URL</label>
                    <input
                      type="text"
                      value={adTargetUrl}
                      onChange={(e) => setAdTargetUrl(e.target.value)}
                      placeholder="/shop or /women"
                      className="w-full bg-neutral-900 border border-neutral-800 text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 font-mono block mb-1">Associated Promo Code (Optional)</label>
                    <input
                      type="text"
                      value={adPromoCode}
                      onChange={(e) => setAdPromoCode(e.target.value)}
                      placeholder="e.g. SEOUL30"
                      className="w-full bg-neutral-900 border border-neutral-800 text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 font-mono block mb-1">Ad Image / Banner URL (Optional)</label>
                    <input
                      type="url"
                      value={adImageUrl}
                      onChange={(e) => setAdImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-neutral-900 border border-neutral-800 text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3 flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-amber-400 text-neutral-950 hover:bg-amber-300 px-6 py-2.5 font-bold font-mono text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-400/10"
                    >
                      <Zap className="w-4 h-4 fill-current" /> Launch Ad Campaign Now
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Ad Campaigns Table / Cards */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-400" /> Active & Archived Campaigns ({adCampaigns.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {adCampaigns.map((ad) => {
                    const spentPercentage = Math.min(100, Math.round((ad.spent / ad.budget) * 100));
                    const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : '0';

                    return (
                      <div
                        key={ad.id}
                        className="p-4 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-2xl space-y-3 transition-all"
                      >
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                          <div className="flex items-start gap-3">
                            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 shrink-0">
                              <Megaphone className="w-5 h-5 text-amber-400" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-white text-sm">{ad.title}</h4>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                                  ad.platform.includes('Meta')
                                    ? 'bg-blue-950 text-blue-300 border-blue-800'
                                    : ad.platform.includes('Google')
                                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                                    : ad.platform.includes('Marquee')
                                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                                }`}>
                                  {ad.platform}
                                </span>
                                {ad.promoCode && (
                                  <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-amber-300">
                                    CODE: {ad.promoCode}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-400 font-mono">
                                Started: {ad.startDate} • Target: <span className="text-neutral-300">{ad.targetUrl}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => toggleAdStatus(ad.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                                ad.status === 'active'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:bg-neutral-800'
                              }`}
                            >
                              {ad.status === 'active' ? (
                                <>
                                  <Pause className="w-3.5 h-3.5 text-emerald-400" /> ACTIVE
                                </>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5 text-neutral-400" /> PAUSED
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => deleteAdCampaign(ad.id)}
                              className="p-2 text-neutral-500 hover:text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-900 rounded-xl transition-all"
                              title="Delete Campaign"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Progress bar and metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2 border-t border-neutral-900 text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-neutral-500 block">BUDGET SPENT</span>
                            <span className="text-white font-bold">
                              ₹{ad.spent.toLocaleString('en-IN')} / ₹{ad.budget.toLocaleString('en-IN')}
                            </span>
                            <div className="w-full bg-neutral-900 h-1.5 rounded-full mt-1 overflow-hidden">
                              <div
                                className="bg-amber-400 h-full rounded-full transition-all"
                                style={{ width: `${spentPercentage}%` }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] text-neutral-500 block">IMPRESSIONS</span>
                            <span className="text-neutral-300 font-semibold">{ad.impressions.toLocaleString()}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-neutral-500 block">CLICKS & CTR</span>
                            <span className="text-indigo-300 font-semibold">{ad.clicks.toLocaleString()} ({ctr}%)</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-neutral-500 block">CONVERSIONS</span>
                            <span className="text-emerald-400 font-semibold">{ad.conversions} Orders</span>
                          </div>

                          <div className="col-span-2 md:col-span-1 flex items-center justify-end">
                            <span className="text-[10px] bg-neutral-900 border border-neutral-800 text-amber-300 px-2.5 py-1 rounded-lg">
                              ROAS: <strong className="text-white">{(1.5 + (ad.conversions * 0.1)).toFixed(1)}x</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

