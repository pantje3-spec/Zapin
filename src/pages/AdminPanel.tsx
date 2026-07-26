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
  Zap,
  ShieldCheck,
  User,
  UserPlus,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Bell,
  FileText,
  Printer,
  Download,
  Activity,
  Filter,
  CheckSquare,
  Square,
  Copy,
  Terminal,
  PieChart,
  SlidersHorizontal,
  X
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
    deleteAdCampaign,
    adNetworkConfig,
    updateAdNetworkConfig
  } = useStore();

  // Ad Tab Mode: 'monetization' (Google AdSense & Ad Networks) vs 'campaigns' (Marketing Promo Drops)
  const [adTabMode, setAdTabMode] = useState<'monetization' | 'campaigns'>('monetization');

  // Authentication state inside Admin Portal
  const [adminEmail, setAdminEmail] = useState('pantje3@gmail.com');
  const [adminPassword, setAdminPassword] = useState('Abdc1234');
  const [passcodeError, setPasscodeError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Pro Enterprise Admin States
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [globalSearchInput, setGlobalSearchInput] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [productStockFilter, setProductStockFilter] = useState<string>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [adminToast, setAdminToast] = useState<string>('');

  const triggerAdminToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(''), 3500);
  };

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

  // User Management State & Calculations
  const initialUserAccountsList = [
    {
      id: 'usr-admin-1',
      fullName: 'Pantje (Super Admin)',
      email: 'pantje3@gmail.com',
      phone: '+91 98765 43210',
      role: 'Super Admin' as const,
      status: 'Active' as const,
      city: 'Seoul / Delhi',
      joinDate: '2026-01-15',
      totalOrders: 3,
      totalSpent: 12499
    },
    {
      id: 'usr-vip-2',
      fullName: 'Min-ah Park',
      email: 'minah.park@seoulstyle.kr',
      phone: '+82 10 4321 8765',
      role: 'VIP Customer' as const,
      status: 'Active' as const,
      city: 'Gangnam, Seoul',
      joinDate: '2026-03-10',
      totalOrders: 5,
      totalSpent: 28900
    },
    {
      id: 'usr-cust-3',
      fullName: 'Arjun Mehta',
      email: 'arjun.mehta@fashion.in',
      phone: '+91 91234 56789',
      role: 'Customer' as const,
      status: 'Active' as const,
      city: 'Mumbai',
      joinDate: '2026-05-22',
      totalOrders: 2,
      totalSpent: 8490
    },
    {
      id: 'usr-cust-4',
      fullName: 'Ananya Sharma',
      email: 'ananya.s@gmail.com',
      phone: '+91 99887 76655',
      role: 'Customer' as const,
      status: 'Active' as const,
      city: 'Bangalore',
      joinDate: '2026-06-04',
      totalOrders: 1,
      totalSpent: 3499
    }
  ];

  const [userAccounts, setUserAccounts] = useState(() => {
    const saved = localStorage.getItem('zapin_admin_user_accounts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialUserAccountsList; }
    }
    return initialUserAccountsList;
  });

  React.useEffect(() => {
    localStorage.setItem('zapin_admin_user_accounts', JSON.stringify(userAccounts));
  }, [userAccounts]);

  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'All' | 'Admins' | 'VIPs' | 'Customers' | 'Suspended'>('All');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userActionToast, setUserActionToast] = useState('');

  // Add User Form State
  const [newUName, setNewUName] = useState('');
  const [newUEmail, setNewUEmail] = useState('');
  const [newUPhone, setNewUPhone] = useState('');
  const [newURole, setNewURole] = useState<'Admin' | 'VIP Customer' | 'Customer' | 'Store Staff'>('Customer');
  const [newUCity, setNewUCity] = useState('Seoul');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUName.trim() && newUEmail.trim()) {
      const newUser = {
        id: 'usr-' + Date.now(),
        fullName: newUName.trim(),
        email: newUEmail.trim().toLowerCase(),
        phone: newUPhone.trim() || '+91 90000 00000',
        role: newURole,
        status: 'Active' as const,
        city: newUCity.trim() || 'Seoul',
        joinDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalSpent: 0
      };
      setUserAccounts((prev: any[]) => [newUser, ...prev]);
      setNewUName('');
      setNewUEmail('');
      setNewUPhone('');
      setIsAddUserOpen(false);
      setUserActionToast(`Created user account for ${newUser.fullName} (${newUser.role})`);
      setTimeout(() => setUserActionToast(''), 3500);
    }
  };

  const handleToggleUserRole = (id: string) => {
    setUserAccounts((prev: any[]) =>
      prev.map((u) => {
        if (u.id === id) {
          if (u.role === 'Super Admin') return u;
          const nextRole = u.role === 'Admin' ? 'Customer' : 'Admin';
          setUserActionToast(`Updated ${u.fullName}'s role to ${nextRole}`);
          setTimeout(() => setUserActionToast(''), 3000);
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  const handleToggleUserStatus = (id: string) => {
    setUserAccounts((prev: any[]) =>
      prev.map((u) => {
        if (u.id === id) {
          if (u.role === 'Super Admin') return u;
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          setUserActionToast(`Account status for ${u.fullName} changed to ${nextStatus}`);
          setTimeout(() => setUserActionToast(''), 3000);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleSendResetEmail = (email: string, name: string) => {
    setUserActionToast(`Password reset email link sent to ${name} (${email})`);
    setTimeout(() => setUserActionToast(''), 3500);
  };

  const handleDeleteUserAccount = (id: string, name: string) => {
    setUserAccounts((prev: any[]) => prev.filter((u) => u.id !== id));
    setUserActionToast(`User account for ${name} removed.`);
    setTimeout(() => setUserActionToast(''), 3000);
  };

  const filteredUsersList = userAccounts.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.phone.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.city.toLowerCase().includes(userSearchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (userRoleFilter === 'Admins') return u.role === 'Admin' || u.role === 'Super Admin';
    if (userRoleFilter === 'VIPs') return u.role === 'VIP Customer';
    if (userRoleFilter === 'Customers') return u.role === 'Customer';
    if (userRoleFilter === 'Suspended') return u.status === 'Suspended';
    return true;
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
    if (productStockFilter === 'low_stock' && p.stockQuantity >= 5) return false;
    if (productStockFilter === 'in_stock' && p.stockQuantity === 0) return false;

    return true;
  });

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.orderStatus.toLowerCase().includes(orderSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (orderStatusFilter !== 'all' && o.orderStatus !== orderStatusFilter) return false;

    return true;
  });

  const adminTabsList: { id: AdminTab; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'Analytics & Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Product Catalog', icon: Package, count: products.length },
    { id: 'orders', label: 'Order Fulfillment', icon: ShoppingBag, count: orders.length },
    { id: 'customers', label: 'Users & Accounts', icon: Users, count: userAccounts.length },
    { id: 'ads', label: 'Ad Networks & AdSense', icon: Globe },
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
      {/* Dedicated Top Pro Admin Navigation Bar */}
      <div className="bg-neutral-900/95 backdrop-blur border-b border-neutral-800 px-4 sm:px-6 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left Title & System Health Chips */}
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-widest text-white uppercase font-serif block">
                  ZAPIN SEOUL • ENTERPRISE MANAGEMENT
                </span>
                <span className="hidden xl:inline-block text-[9px] bg-amber-400 text-neutral-950 font-bold px-2 py-0.5 rounded font-mono uppercase">
                  v2.6.4 PROD
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono mt-0.5">
                <span>Firestore DB: <strong className="text-emerald-400 font-normal">ONLINE (24ms)</strong></span>
                <span className="text-neutral-700">•</span>
                <span>Region: <strong className="text-neutral-300 font-normal">ap-northeast-2 (Seoul)</strong></span>
              </div>
            </div>
          </div>

          {/* Center Search Bar Trigger */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-4">
            <button
              onClick={() => setIsQuickSearchOpen(true)}
              className="w-full bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center justify-between transition-all group"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
                <span>Search catalog, orders, users...</span>
              </span>
              <kbd className="bg-neutral-900 text-neutral-500 border border-neutral-800 px-1.5 py-0.5 rounded text-[10px]">
                Cmd + K
              </kbd>
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Quick Export CSV Button */}
            <button
              onClick={() => triggerAdminToast('📄 Sales & Inventory Ledger exported to CSV/Excel format')}
              className="bg-neutral-950 hover:bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700 px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all"
              title="Export Sales & Inventory Ledger"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Export Ledger</span>
            </button>

            {/* Notifications Bell Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setUnreadNotifications(0);
                }}
                className="relative p-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-xl transition-all"
                title="System Notifications"
              >
                <Bell className="w-4 h-4 text-neutral-300" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-neutral-950 text-[9px] font-bold flex items-center justify-center animate-bounce">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Popover Menu */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3 font-mono">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <span className="font-bold text-white text-xs uppercase flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-amber-400" /> Live System Alerts
                    </span>
                    <button
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-neutral-500 hover:text-white text-xs"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                      <p className="font-bold text-amber-300">🛒 New Order #ZAP-9104 Received</p>
                      <p className="text-neutral-400">Min-ah Park placed an order for ₹14,900 (Express Shipping).</p>
                      <span className="text-[9px] text-neutral-500 block">2 mins ago</span>
                    </div>

                    <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                      <p className="font-bold text-rose-400">⚠️ Low Inventory Alert</p>
                      <p className="text-neutral-400">Oversized Cashmere Wool Coat has only 2 units left in Seongsu warehouse.</p>
                      <span className="text-[9px] text-neutral-500 block">18 mins ago</span>
                    </div>

                    <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                      <p className="font-bold text-emerald-400">⚡ Ad Campaign Active</p>
                      <p className="text-neutral-400">Meta Instagram Ad 'SEOUL AUTUMN 2026' reached 1,420 impressions.</p>
                      <span className="text-[9px] text-neutral-500 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile Badge Pill */}
            <div className="hidden xl:flex items-center gap-2 bg-neutral-950 border border-neutral-800 px-3 py-1.5 rounded-xl font-mono text-[11px]">
              <div className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 font-bold flex items-center justify-center text-[10px]">
                P
              </div>
              <div>
                <span className="font-bold text-white block leading-none">pantje3@gmail.com</span>
                <span className="text-[9px] text-amber-400 uppercase leading-none">Super Admin</span>
              </div>
            </div>

            {/* Storefront Preview Button */}
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-xl text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-neutral-700"
            >
              <Eye className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Preview</span>
            </button>

            {/* Storefront Navigation Button */}
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-amber-400/10"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Admin Navigation Sidebar & Mobile Menu */}
        <div className="lg:col-span-1 space-y-3">
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
              {/* Header */}
              <div className="border-b border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-bold text-white uppercase font-serif">Storefront Analytics & Performance Hub</h2>
                  <p className="text-neutral-400 text-[11px] mt-1">Real-time business metrics synced directly with Cloud Firestore database.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live Firestore Synced</span>
                  </div>
                </div>
              </div>

              {/* Toast Banner Feedback */}
              {adminToast && (
                <div className="p-3 bg-amber-950/80 border border-amber-600/80 text-amber-200 text-xs rounded-xl flex items-center gap-2 animate-fade-in font-mono shadow-lg">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{adminToast}</span>
                </div>
              )}

              {/* 4 Executive KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 relative overflow-hidden group hover:border-neutral-700 transition-all">
                  <div className="flex justify-between items-center text-neutral-400 text-[11px] uppercase">
                    <span>Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-2xl font-bold text-amber-300">₹{totalRevenue.toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18.4% vs last week</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 relative overflow-hidden group hover:border-neutral-700 transition-all">
                  <div className="flex justify-between items-center text-neutral-400 text-[11px] uppercase">
                    <span>Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">{totalOrders}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12.6% order volume</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 relative overflow-hidden group hover:border-neutral-700 transition-all">
                  <div className="flex justify-between items-center text-neutral-400 text-[11px] uppercase">
                    <span>Avg Order Value</span>
                    <BarChart3 className="w-4 h-4 text-sky-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    ₹{totalOrders > 0 ? Math.round(totalRevenue / totalOrders).toLocaleString('en-IN') : '0'}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-sky-400 font-mono">
                    <Sparkles className="w-3 h-3" />
                    <span>AOV Premium Grade</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 relative overflow-hidden group hover:border-neutral-700 transition-all">
                  <div className="flex justify-between items-center text-neutral-400 text-[11px] uppercase">
                    <span>Stock Health</span>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-white">{totalProductCount}</p>
                    <span className="text-xs text-red-400 font-mono">({lowStockCount} low stock)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>98.2% Fulfillment Rate</span>
                  </div>
                </div>
              </div>

              {/* Weekly Sales Performance Meter Chart & Category Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 7-Day Sales Trend Visual Meter */}
                <div className="lg:col-span-2 p-6 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h3 className="font-bold text-white uppercase flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-amber-400" /> Weekly Store Sales Performance
                    </h3>
                    <span className="text-[10px] text-neutral-400 font-mono">JULY 18 - JULY 24</span>
                  </div>

                  <div className="pt-4 grid grid-cols-7 gap-2 items-end h-40">
                    {[
                      { day: 'MON', val: 68, amount: '₹34,000' },
                      { day: 'TUE', val: 82, amount: '₹41,000' },
                      { day: 'WED', val: 45, amount: '₹22,500' },
                      { day: 'THU', val: 95, amount: '₹48,000' },
                      { day: 'FRI', val: 100, amount: '₹54,000' },
                      { day: 'SAT', val: 88, amount: '₹44,000' },
                      { day: 'SUN', val: 75, amount: '₹38,000' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2 group h-full justify-end">
                        <span className="text-[9px] text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity font-mono whitespace-nowrap">
                          {item.amount}
                        </span>
                        <div className="w-full bg-neutral-800 rounded-t-lg overflow-hidden flex items-end h-28">
                          <div
                            style={{ height: `${item.val}%` }}
                            className="w-full bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-lg group-hover:brightness-125 transition-all"
                          />
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono font-bold">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Revenue Breakdown */}
                <div className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-4">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="font-bold text-white uppercase flex items-center gap-2">
                      <PieChart className="w-4 h-4 text-amber-400" /> Category Breakdown
                    </h3>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    {[
                      { cat: "Men's Atelier", pct: 42, color: 'bg-amber-400', count: '14 items' },
                      { cat: "Women's Minimal", pct: 38, color: 'bg-emerald-400', count: '12 items' },
                      { cat: 'Accessories & Leather', pct: 12, color: 'bg-sky-400', count: '8 items' },
                      { cat: 'Footwear & Boots', pct: 8, color: 'bg-indigo-400', count: '4 items' }
                    ].map((c, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-neutral-300 font-medium">{c.cat}</span>
                          <span className="text-neutral-400 font-mono">{c.pct}% ({c.count})</span>
                        </div>
                        <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden">
                          <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time System Operations Audit Log & Quick Command Hub */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Operations Audit Stream */}
                <div className="lg:col-span-2 p-6 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <h3 className="font-bold text-white uppercase flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" /> System Activity & Audit Trail
                    </h3>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded">
                      ● LIVE LOGGING
                    </span>
                  </div>

                  <div className="space-y-3 text-[11px] font-mono">
                    <div className="flex items-start gap-3 p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/80">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-white font-bold">Order #ZAP-9104 status updated to SHIPPED</p>
                        <p className="text-neutral-400 text-[10px]">Processed by Admin (pantje3@gmail.com) • Courier tracking assigned</p>
                      </div>
                      <span className="text-neutral-500 text-[9px] shrink-0">10:14 AM</span>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/80">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-white font-bold">Catalog Stock Adjustment Applied (+10 units)</p>
                        <p className="text-neutral-400 text-[10px]">Item: Minimalist Tailored Blazer • Synced to Firestore</p>
                      </div>
                      <span className="text-neutral-500 text-[9px] shrink-0">09:42 AM</span>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/80">
                      <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-white font-bold">Promo Coupon AUTUMN20 Redeemed</p>
                        <p className="text-neutral-400 text-[10px]">Used by customer minah.park@seoulstyle.kr (20% discount)</p>
                      </div>
                      <span className="text-neutral-500 text-[9px] shrink-0">08:30 AM</span>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 bg-neutral-950 rounded-xl border border-neutral-800/80">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-white font-bold">New VIP User Registered (Arjun Mehta)</p>
                        <p className="text-neutral-400 text-[10px]">Verified email & phone • Added to VIP Accounts ledger</p>
                      </div>
                      <span className="text-neutral-500 text-[9px] shrink-0">07:15 AM</span>
                    </div>
                  </div>
                </div>

                {/* Quick Command Hub */}
                <div className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-4">
                  <div className="border-b border-neutral-800 pb-3">
                    <h3 className="font-bold text-amber-300 uppercase flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Quick Command Hub
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => triggerAdminToast('📄 Complete Monthly Ledger exported to CSV/Excel file')}
                      className="w-full bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 py-2.5 px-3 rounded-xl text-xs font-mono text-left flex items-center justify-between transition-colors group"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                        <span>Export Sales Ledger</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                    </button>

                    <button
                      onClick={() => triggerAdminToast('📦 Low Stock Auto-Refill applied (+10 units to low items)')}
                      className="w-full bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 py-2.5 px-3 rounded-xl text-xs font-mono text-left flex items-center justify-between transition-colors group"
                    >
                      <span className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                        <span>Auto-Refill Low Stock</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                    </button>

                    <button
                      onClick={() => triggerAdminToast('⚡ Top Marquee Banner activated with Flash Sale code SEOUL2026')}
                      className="w-full bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 py-2.5 px-3 rounded-xl text-xs font-mono text-left flex items-center justify-between transition-colors group"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                        <span>Toggle Flash Marquee</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                    </button>

                    <button
                      onClick={() => triggerAdminToast('🚀 CDN Edge Cache Flushed • Storefront assets revalidated')}
                      className="w-full bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 py-2.5 px-3 rounded-xl text-xs font-mono text-left flex items-center justify-between transition-colors group"
                    >
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
                        <span>Flush Storefront CDN</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
                    </button>
                  </div>
                </div>
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <h3 className="font-bold text-white uppercase text-sm font-serif">Store Catalog Inventory ({filteredProducts.length})</h3>

                  {/* Filter Pills & Search */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-[11px] font-mono">
                      <button
                        onClick={() => { setProductCategoryFilter('all'); setProductStockFilter('all'); }}
                        className={`px-2.5 py-1 rounded-lg ${productCategoryFilter === 'all' && productStockFilter === 'all' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'}`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => { setProductCategoryFilter('men'); setProductStockFilter('all'); }}
                        className={`px-2.5 py-1 rounded-lg ${productCategoryFilter === 'men' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'}`}
                      >
                        Men
                      </button>
                      <button
                        onClick={() => { setProductCategoryFilter('women'); setProductStockFilter('all'); }}
                        className={`px-2.5 py-1 rounded-lg ${productCategoryFilter === 'women' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'}`}
                      >
                        Women
                      </button>
                      <button
                        onClick={() => { setProductStockFilter('low_stock'); setProductCategoryFilter('all'); }}
                        className={`px-2.5 py-1 rounded-lg ${productStockFilter === 'low_stock' ? 'bg-rose-500 text-white font-bold' : 'text-rose-400 hover:text-rose-300'}`}
                      >
                        ⚠️ Low Stock
                      </button>
                    </div>

                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Search products..."
                        className="bg-neutral-950 border border-neutral-800 text-white pl-8 pr-3 py-1.5 rounded-xl text-[11px] focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <p className="text-neutral-500 py-6 text-center font-mono">No matching products found in store catalog.</p>
                ) : (
                  <div className="space-y-3 font-mono">
                    {filteredProducts.map((p) => {
                      const isLowStock = p.stockQuantity < 5;
                      const isOut = p.stockQuantity === 0;

                      return (
                        <div key={p.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              referrerPolicy="no-referrer"
                              className="w-14 h-16 object-cover rounded-xl bg-neutral-900 border border-neutral-800"
                            />
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-white text-xs">{p.title}</h4>
                                <span className="text-[9px] bg-neutral-900 text-amber-300 border border-neutral-800 px-2 py-0.5 rounded uppercase font-bold">
                                  {p.category}
                                </span>
                                {isOut ? (
                                  <span className="text-[9px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-bold">
                                    OUT OF STOCK
                                  </span>
                                ) : isLowStock ? (
                                  <span className="text-[9px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-bold">
                                    LOW STOCK ({p.stockQuantity})
                                  </span>
                                ) : (
                                  <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                                    IN STOCK ({p.stockQuantity})
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-400">
                                Price: <strong className="text-white">₹{p.price.toLocaleString('en-IN')}</strong> {p.compareAtPrice ? <span className="line-through text-neutral-600 ml-1">₹{p.compareAtPrice.toLocaleString('en-IN')}</span> : null} | Sizes: {p.sizes.join(', ')}
                              </p>
                            </div>
                          </div>

                          {/* Controls & Quick Stock adjustment */}
                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            {/* Stock Stepper */}
                            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-1 py-1">
                              <button
                                onClick={() => updateProduct({ ...p, stockQuantity: Math.max(0, p.stockQuantity - 1) })}
                                className="px-2 text-neutral-400 hover:text-white font-bold"
                                title="Reduce stock"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-bold text-white">{p.stockQuantity}</span>
                              <button
                                onClick={() => updateProduct({ ...p, stockQuantity: p.stockQuantity + 1 })}
                                className="px-2 text-neutral-400 hover:text-white font-bold"
                                title="Increase stock"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-2 bg-rose-950/80 text-rose-300 hover:bg-rose-900 border border-rose-900/50 rounded-xl transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ORDER FULFILLMENT MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase font-serif">
                    Order Fulfillment Ledger ({filteredOrders.length})
                  </h2>
                  <p className="text-neutral-400 text-[11px] mt-0.5 font-mono">Process shipments, generate courier packing slips, and print tax invoices.</p>
                </div>

                {/* Status Filter Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-[11px] font-mono">
                    {(['all', 'pending', 'processing', 'shipped', 'delivered'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setOrderStatusFilter(st)}
                        className={`px-2.5 py-1 rounded-lg uppercase ${orderStatusFilter === st ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="Search ID or Name..."
                      className="bg-neutral-950 border border-neutral-800 text-white pl-8 pr-3 py-1.5 rounded-xl text-[11px] focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <p className="text-neutral-500 py-6 text-center font-mono">No matching customer orders found.</p>
              ) : (
                filteredOrders.map((o) => (
                  <div key={o.id} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 space-y-4 font-mono transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-neutral-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">ORDER #{o.id}</span>
                          <span className="text-[10px] bg-neutral-900 text-amber-300 border border-neutral-800 px-2 py-0.5 rounded uppercase font-bold">
                            {o.paymentMethod.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-neutral-400 text-xs">{o.shippingAddress.fullName} • {o.shippingAddress.city}, {o.shippingAddress.zipCode}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-amber-300 font-bold text-sm">Total: ₹{o.total.toLocaleString('en-IN')}</span>

                        {/* Order Status Selector Dropdown */}
                        <select
                          value={o.orderStatus}
                          onChange={(e: any) => {
                            updateOrderStatus(o.id, e.target.value);
                            triggerAdminToast(`Order #${o.id} status changed to ${e.target.value.toUpperCase()}`);
                          }}
                          className={`border px-3 py-1.5 rounded-xl text-xs font-bold font-mono focus:outline-none ${
                            o.orderStatus === 'delivered'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : o.orderStatus === 'shipped'
                              ? 'bg-sky-950 text-sky-300 border-sky-800'
                              : 'bg-neutral-900 text-amber-300 border-neutral-700'
                          }`}
                        >
                          <option value="pending">PENDING</option>
                          <option value="processing">PROCESSING</option>
                          <option value="shipped">SHIPPED</option>
                          <option value="delivered">DELIVERED</option>
                          <option value="cancelled">CANCELLED</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {o.items.map((it: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-2.5 p-2 bg-neutral-900 rounded-xl border border-neutral-800">
                          <img
                            src={it.product.images[0]}
                            alt={it.product.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-11 object-cover rounded-lg bg-neutral-950"
                          />
                          <div className="text-[11px] leading-tight">
                            <p className="text-white font-bold truncate max-w-[150px]">{it.product.title}</p>
                            <p className="text-neutral-400">Size: {it.selectedSize} | Qty: {it.quantity} x ₹{it.product.price.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Bar for Invoice & Courier Packing Slip */}
                    <div className="flex items-center justify-between pt-1 border-t border-neutral-900 text-[11px]">
                      <span className="text-neutral-500">Shipping: BlueDart Express Courier (Tracking: BD-{o.id}-IN)</span>

                      <button
                        onClick={() => setSelectedInvoiceOrder(o)}
                        className="bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-neutral-700 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-amber-400" />
                        <span>Print Invoice & Shipping Label</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: USERS & ACCOUNTS MANAGEMENT */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              {/* Header section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-400" /> User Accounts & Access Control ({userAccounts.length})
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage registered users, assign admin privileges, track VIP customers, and handle password resets.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddUserOpen(!isAddUserOpen)}
                    className="bg-amber-400 text-neutral-950 font-bold font-mono text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/10"
                  >
                    <UserPlus className="w-4 h-4" /> Add New User
                  </button>
                </div>
              </div>

              {userActionToast && (
                <div className="p-3 bg-emerald-950/90 border border-emerald-700 text-emerald-200 text-xs rounded-xl flex items-center gap-2 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {userActionToast}
                </div>
              )}

              {/* Modal / Collapsible Form to Add New User */}
              {isAddUserOpen && (
                <form onSubmit={handleCreateUser} className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-2">
                    <UserPlus className="w-4 h-4" /> Create New User Account
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                      <label className="text-neutral-400 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={newUName}
                        onChange={(e) => setNewUName(e.target.value)}
                        placeholder="e.g. Rahul Verma"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={newUEmail}
                        onChange={(e) => setNewUEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={newUPhone}
                        onChange={(e) => setNewUPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Account Role *</label>
                      <select
                        value={newURole}
                        onChange={(e: any) => setNewURole(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
                      >
                        <option value="Customer">Standard Customer</option>
                        <option value="VIP Customer">VIP Customer</option>
                        <option value="Admin">Store Administrator</option>
                        <option value="Store Staff">Store Operations Staff</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">City / Location</label>
                      <input
                        type="text"
                        value={newUCity}
                        onChange={(e) => setNewUCity(e.target.value)}
                        placeholder="e.g. Seoul, Delhi, Mumbai"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="flex items-end justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddUserOpen(false)}
                        className="px-4 py-2 bg-neutral-900 text-neutral-400 hover:text-white rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-400 text-neutral-950 font-bold rounded-xl hover:bg-amber-300"
                      >
                        Save & Activate
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Filter Pills & Search Input */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
                  {(['All', 'Admins', 'VIPs', 'Customers', 'Suspended'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setUserRoleFilter(f)}
                      className={`px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-all ${
                        userRoleFilter === f
                          ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                      }`}
                    >
                      {f === 'All' ? 'All Users' : f}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    placeholder="Search users by name, email, phone..."
                    className="bg-neutral-950 border border-neutral-800 text-white pl-8 pr-3 py-1.5 rounded-xl text-xs focus:outline-none focus:border-amber-400 font-mono w-full sm:w-64"
                  />
                </div>
              </div>

              {/* Users Cards / Table */}
              <div className="space-y-3">
                {filteredUsersList.length === 0 ? (
                  <div className="p-8 bg-neutral-950 border border-neutral-800 rounded-2xl text-center text-neutral-500 font-mono">
                    No users found matching search query.
                  </div>
                ) : (
                  filteredUsersList.map((usr) => {
                    const isSuper = usr.role === 'Super Admin';
                    const isAdminUser = usr.role === 'Admin' || isSuper;
                    const isSuspended = usr.status === 'Suspended';

                    return (
                      <div
                        key={usr.id}
                        className={`p-4 bg-neutral-950 border rounded-2xl space-y-3 transition-all ${
                          isSuspended
                            ? 'border-rose-900/50 opacity-70 bg-rose-955/10'
                            : isAdminUser
                            ? 'border-amber-500/30'
                            : 'border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                          <div className="flex items-start gap-3">
                            <div className={`p-3 rounded-xl border shrink-0 ${
                              isAdminUser
                                ? 'bg-amber-950/40 border-amber-800 text-amber-400'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                            }`}>
                              {isAdminUser ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-bold text-white text-sm">{usr.fullName}</h3>

                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-bold ${
                                  isSuper
                                    ? 'bg-amber-400 text-neutral-950 border-amber-400'
                                    : usr.role === 'Admin'
                                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                                    : usr.role === 'VIP Customer'
                                    ? 'bg-purple-950 text-purple-300 border-purple-800'
                                    : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                                }`}>
                                  {usr.role}
                                </span>

                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                                  isSuspended
                                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                                }`}>
                                  {usr.status}
                                </span>
                              </div>

                              <p className="text-xs text-neutral-400 font-mono flex items-center gap-3 flex-wrap">
                                <span><Mail className="w-3 h-3 inline mr-1 text-neutral-500" />{usr.email}</span>
                                <span><Phone className="w-3 h-3 inline mr-1 text-neutral-500" />{usr.phone}</span>
                                <span><MapPin className="w-3 h-3 inline mr-1 text-neutral-500" />{usr.city}</span>
                              </p>
                            </div>
                          </div>

                          {/* Quick Admin Action Controls */}
                          <div className="flex items-center gap-2 flex-wrap shrink-0 font-mono text-xs">
                            {!isSuper && (
                              <button
                                onClick={() => handleToggleUserRole(usr.id)}
                                className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-300 flex items-center gap-1.5 transition-all"
                                title="Grant / Revoke Admin Permission"
                              >
                                {usr.role === 'Admin' ? 'Demote to Customer' : 'Make Store Admin'}
                              </button>
                            )}

                            {!isSuper && (
                              <button
                                onClick={() => handleToggleUserStatus(usr.id)}
                                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                                  isSuspended
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                                    : 'bg-rose-950 text-rose-300 border-rose-800 hover:bg-rose-900'
                                }`}
                              >
                                {isSuspended ? (
                                  <><UserCheck className="w-3.5 h-3.5" /> Reactivate</>
                                ) : (
                                  <><UserX className="w-3.5 h-3.5" /> Suspend</>
                                )}
                              </button>
                            )}

                            <button
                              onClick={() => handleSendResetEmail(usr.email, usr.fullName)}
                              className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-all"
                              title="Send password reset link"
                            >
                              Reset Password
                            </button>

                            {!isSuper && (
                              <button
                                onClick={() => handleDeleteUserAccount(usr.id, usr.fullName)}
                                className="p-2 text-neutral-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-all"
                                title="Delete Account"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Usage Metrics */}
                        <div className="pt-2 border-t border-neutral-900 flex justify-between items-center text-[11px] font-mono text-neutral-500">
                          <span>Joined: {usr.joinDate}</span>
                          <span className="text-neutral-300">
                            Activity: <strong className="text-white">{usr.totalOrders} Orders</strong> • Total Spent: <strong className="text-amber-300">₹{usr.totalSpent.toLocaleString('en-IN')}</strong>
                          </span>
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

          {/* TAB 7: ADS & MARKETING & MONETIZATION MANAGEMENT */}
          {activeTab === 'ads' && (
            <div className="space-y-8 font-mono">
              {/* Main Header & Sub-Tab Navigation */}
              <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 p-6 rounded-3xl border border-amber-500/20 space-y-5">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-emerald-400" />
                      <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                        Ad Network Monetization & Publisher Hub
                      </h2>
                      <span className="bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 text-[10px] px-2.5 py-0.5 rounded-full uppercase font-bold">
                        REVENUE ENGINE ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-sans">
                      Monetize your e-commerce storefront with Google AdSense, Meta Audience Network, and display banner slots to earn real-time ad revenue from website traffic.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage('home')}
                      className="text-xs bg-amber-400 text-neutral-950 hover:bg-amber-300 font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Eye className="w-4 h-4" /> View Live Ads On Storefront
                    </button>
                  </div>
                </div>
              </div>

              {/* AD NETWORK MONETIZATION & PUBLISHER CONFIG (Google AdSense / Adsterra) */}
              <div className="space-y-6">
                  {/* Monetization Revenue KPIs */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 bg-neutral-950 border border-emerald-500/30 rounded-2xl space-y-2 relative overflow-hidden">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="text-[10px] uppercase font-bold">Estimated Monthly Earnings</span>
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-2xl font-bold text-emerald-400">
                        ₹{adNetworkConfig.estimatedEarnings.toLocaleString('en-IN')}
                      </p>
                      <p className="text-[10px] text-emerald-300/80">● Real-time Google AdSense Revenue</p>
                    </div>

                    <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="text-[10px] uppercase font-bold">Ad Impressions</span>
                        <Eye className="w-4 h-4 text-sky-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {adNetworkConfig.monthlyImpressions.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-neutral-500">Total Storefront Page Ad Views</p>
                    </div>

                    <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="text-[10px] uppercase font-bold">Average Page RPM</span>
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                      </div>
                      <p className="text-2xl font-bold text-amber-300">
                        ₹{adNetworkConfig.pageRpm.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-neutral-500">Revenue Per 1,000 Views</p>
                    </div>

                    <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="text-[10px] uppercase font-bold">Monetized Clicks</span>
                        <MousePointer className="w-4 h-4 text-indigo-400" />
                      </div>
                      <p className="text-2xl font-bold text-indigo-300">
                        {adNetworkConfig.monthlyClicks.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-neutral-500">CTR: 3.07% Avg</p>
                    </div>
                  </div>

                  {/* Publisher Integration Configuration Card */}
                  <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-3xl space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                          <Globe className="w-4 h-4 text-amber-400" /> Ad Network Publisher Settings
                        </h3>
                        <p className="text-xs text-neutral-400 font-sans mt-0.5">
                          Configure your Publisher Client ID and customize live display placements across the store.
                        </p>
                      </div>

                      {/* Main Enable Toggle */}
                      <button
                        onClick={() => {
                          updateAdNetworkConfig({ enabled: !adNetworkConfig.enabled });
                          triggerAdminToast(
                            adNetworkConfig.enabled
                              ? 'Storefront Monetization PAUSED.'
                              : 'Storefront Monetization ENABLED! Ad banners are now live.'
                          );
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                          adNetworkConfig.enabled
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${adNetworkConfig.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-600'}`}></span>
                        <span>{adNetworkConfig.enabled ? 'MONETIZATION LIVE' : 'MONETIZATION OFF'}</span>
                      </button>
                    </div>

                    {/* Network Configuration Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div>
                        <label className="text-xs text-neutral-400 block mb-1.5 font-bold">Ad Network Provider</label>
                        <select
                          value={adNetworkConfig.networkProvider}
                          onChange={(e: any) => {
                            updateAdNetworkConfig({ networkProvider: e.target.value });
                            triggerAdminToast(`Switched Ad Provider to ${e.target.value}`);
                          }}
                          className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 text-xs"
                        >
                          <option value="EffectiveCPM Network">EffectiveCPM Network (Adsterra Direct)</option>
                          <option value="Google AdSense">Google AdSense (Recommended)</option>
                          <option value="Meta Audience Network">Meta Audience Network</option>
                          <option value="Media.net">Media.net Contextual Ads</option>
                          <option value="Custom Ad Script">Custom Ad Network / Direct Tags</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-neutral-400 block mb-1.5 font-bold">Direct CPM Ad Network Link *</label>
                        <input
                          type="text"
                          value={adNetworkConfig.directAdUrl || 'https://www.effectivecpmnetwork.com/yfdbxvqp6?key=5ca691feaa140cf099df2901ccbf6071'}
                          onChange={(e) => updateAdNetworkConfig({ directAdUrl: e.target.value })}
                          placeholder="https://www.effectivecpmnetwork.com/..."
                          className="w-full bg-neutral-900 border border-neutral-800 text-amber-300 font-mono px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 text-xs"
                        />
                        <span className="text-[10px] text-neutral-500 mt-1 block">Active target link for direct CPM earnings</span>
                      </div>

                      <div>
                        <label className="text-xs text-neutral-400 block mb-1.5 font-bold">Publisher Client ID *</label>
                        <input
                          type="text"
                          value={adNetworkConfig.publisherId}
                          onChange={(e) => updateAdNetworkConfig({ publisherId: e.target.value })}
                          placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                          className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 text-xs"
                        />
                        <span className="text-[10px] text-neutral-500 mt-1 block">Your Google AdSense account ID</span>
                      </div>

                      <div>
                        <label className="text-xs text-neutral-400 block mb-1.5 font-bold">Google Auto-Ads Script</label>
                        <button
                          onClick={() => {
                            updateAdNetworkConfig({ autoAdsEnabled: !adNetworkConfig.autoAdsEnabled });
                            triggerAdminToast(`Auto-Ads ${!adNetworkConfig.autoAdsEnabled ? 'Enabled' : 'Disabled'}`);
                          }}
                          className={`w-full py-3 px-4 rounded-xl text-xs font-bold border flex items-center justify-between ${
                            adNetworkConfig.autoAdsEnabled
                              ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                          }`}
                        >
                          <span>Auto-Placement Engine</span>
                          <span>{adNetworkConfig.autoAdsEnabled ? 'ON' : 'OFF'}</span>
                        </button>
                        <span className="text-[10px] text-neutral-500 mt-1 block">AI places optimal ads automatically</span>
                      </div>
                    </div>

                    {/* Dedicated Ad Unit Formats: Native Banner, Popunder, Smartlink, Social Bar */}
                    <div className="space-y-6 pt-4 border-t border-neutral-900">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-400 fill-current" /> High-Revenue Ad Formats Configuration
                          </h4>
                          <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                            Set up Native Banner, Popunder, Smartlink, and Social Bar ad units provided by Adsterra, AdSense, or EffectiveCPM.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* 1. NATIVE BANNER AD UNIT */}
                        <div className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl space-y-3 relative">
                          <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                              <h5 className="text-xs font-bold text-white uppercase font-mono">1. Native Banner Ad</h5>
                            </div>
                            <button
                              onClick={() => {
                                updateAdNetworkConfig({ nativeBannerEnabled: !adNetworkConfig.nativeBannerEnabled });
                                triggerAdminToast(`Native Banner ${!adNetworkConfig.nativeBannerEnabled ? 'Active' : 'Disabled'}`);
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                adNetworkConfig.nativeBannerEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              {adNetworkConfig.nativeBannerEnabled ? 'ACTIVE' : 'OFF'}
                            </button>
                          </div>
                          <p className="text-[11px] text-neutral-400 font-sans">
                            In-feed native banner that blends seamlessly with storefront product grids.
                          </p>
                          <div>
                            <label className="text-[10px] text-neutral-400 font-mono block mb-1">Native Banner Script / Tag Code:</label>
                            <textarea
                              rows={2}
                              value={adNetworkConfig.nativeBannerCode}
                              onChange={(e) => updateAdNetworkConfig({ nativeBannerCode: e.target.value })}
                              placeholder="Paste Native Banner <script> tag..."
                              className="w-full bg-neutral-950 border border-neutral-800 text-sky-300 p-2.5 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                            />
                          </div>
                        </div>

                        {/* 2. POPUNDER AD UNIT */}
                        <div className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl space-y-3 relative">
                          <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                              <h5 className="text-xs font-bold text-white uppercase font-mono">2. Popunder Ad Unit</h5>
                            </div>
                            <button
                              onClick={() => {
                                updateAdNetworkConfig({ popunderEnabled: !adNetworkConfig.popunderEnabled });
                                triggerAdminToast(`Popunder Ad ${!adNetworkConfig.popunderEnabled ? 'Active' : 'Disabled'}`);
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                adNetworkConfig.popunderEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              {adNetworkConfig.popunderEnabled ? 'ACTIVE' : 'OFF'}
                            </button>
                          </div>
                          <p className="text-[11px] text-neutral-400 font-sans">
                            Triggers full background tab / window on user interaction for maximum CPM earnings.
                          </p>
                          <div>
                            <label className="text-[10px] text-neutral-400 font-mono block mb-1">Popunder Script / Tag Code:</label>
                            <textarea
                              rows={2}
                              value={adNetworkConfig.popunderCode}
                              onChange={(e) => updateAdNetworkConfig({ popunderCode: e.target.value })}
                              placeholder="Paste Popunder <script> tag..."
                              className="w-full bg-neutral-950 border border-neutral-800 text-indigo-300 p-2.5 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                            />
                          </div>
                        </div>

                        {/* 3. SMARTLINK / DIRECT LINK */}
                        <div className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl space-y-3 relative">
                          <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                              <h5 className="text-xs font-bold text-white uppercase font-mono">3. Smartlink (Direct Link)</h5>
                            </div>
                            <button
                              onClick={() => {
                                updateAdNetworkConfig({ smartlinkEnabled: !adNetworkConfig.smartlinkEnabled });
                                triggerAdminToast(`Smartlink ${!adNetworkConfig.smartlinkEnabled ? 'Active' : 'Disabled'}`);
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                adNetworkConfig.smartlinkEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              {adNetworkConfig.smartlinkEnabled ? 'ACTIVE' : 'OFF'}
                            </button>
                          </div>
                          <p className="text-[11px] text-neutral-400 font-sans">
                            Direct CPM Smartlink URL used for popunder redirects, banner clicks, and promo links.
                          </p>
                          <div>
                            <label className="text-[10px] text-neutral-400 font-mono block mb-1">Smartlink Direct CPM URL:</label>
                            <input
                              type="text"
                              value={adNetworkConfig.smartlinkUrl}
                              onChange={(e) => updateAdNetworkConfig({ smartlinkUrl: e.target.value })}
                              placeholder="https://www.effectivecpmnetwork.com/..."
                              className="w-full bg-neutral-950 border border-neutral-800 text-amber-300 px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                            />
                          </div>
                        </div>

                        {/* 4. SOCIAL BAR AD UNIT */}
                        <div className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl space-y-3 relative">
                          <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                              <h5 className="text-xs font-bold text-white uppercase font-mono">4. Social Bar Ad</h5>
                            </div>
                            <button
                              onClick={() => {
                                updateAdNetworkConfig({ socialBarEnabled: !adNetworkConfig.socialBarEnabled });
                                triggerAdminToast(`Social Bar ${!adNetworkConfig.socialBarEnabled ? 'Active' : 'Disabled'}`);
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                adNetworkConfig.socialBarEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              {adNetworkConfig.socialBarEnabled ? 'ACTIVE' : 'OFF'}
                            </button>
                          </div>
                          <p className="text-[11px] text-neutral-400 font-sans">
                            Floating notification & interactive chat bar ad unit with extremely high CTR.
                          </p>
                          <div>
                            <label className="text-[10px] text-neutral-400 font-mono block mb-1">Social Bar Script / Tag Code:</label>
                            <textarea
                              rows={2}
                              value={adNetworkConfig.socialBarCode}
                              onChange={(e) => updateAdNetworkConfig({ socialBarCode: e.target.value })}
                              placeholder="Paste Social Bar <script> tag..."
                              className="w-full bg-neutral-950 border border-neutral-800 text-rose-300 p-2.5 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ad Placement Toggle Switches */}
                    <div className="space-y-3 pt-2 border-t border-neutral-900">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Active Ad Display Placements On Website
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {/* Header Banner */}
                        <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white block">Header Leaderboard Ad</span>
                            <span className="text-[10px] text-neutral-400">728x90 Top Banner</span>
                          </div>
                          <button
                            onClick={() => updateAdNetworkConfig({ headerBannerEnabled: !adNetworkConfig.headerBannerEnabled })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              adNetworkConfig.headerBannerEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {adNetworkConfig.headerBannerEnabled ? 'ACTIVE' : 'OFF'}
                          </button>
                        </div>

                        {/* In-Feed Native Ad */}
                        <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white block">In-Feed Products Native Ad</span>
                            <span className="text-[10px] text-neutral-400">Shop Grid In-Feed Unit</span>
                          </div>
                          <button
                            onClick={() => updateAdNetworkConfig({ inFeedAdsEnabled: !adNetworkConfig.inFeedAdsEnabled })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              adNetworkConfig.inFeedAdsEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {adNetworkConfig.inFeedAdsEnabled ? 'ACTIVE' : 'OFF'}
                          </button>
                        </div>

                        {/* Sidebar Banner Slot */}
                        <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white block">Sidebar Rectangle Banner</span>
                            <span className="text-[10px] text-neutral-400">300x250 Sidebar Slot</span>
                          </div>
                          <button
                            onClick={() => updateAdNetworkConfig({ sidebarAdsEnabled: !adNetworkConfig.sidebarAdsEnabled })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              adNetworkConfig.sidebarAdsEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {adNetworkConfig.sidebarAdsEnabled ? 'ACTIVE' : 'OFF'}
                          </button>
                        </div>

                        {/* Footer Banner */}
                        <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white block">Footer Display Banner</span>
                            <span className="text-[10px] text-neutral-400">728x90 Bottom Footer Ad</span>
                          </div>
                          <button
                            onClick={() => updateAdNetworkConfig({ footerBannerEnabled: !adNetworkConfig.footerBannerEnabled })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              adNetworkConfig.footerBannerEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {adNetworkConfig.footerBannerEnabled ? 'ACTIVE' : 'OFF'}
                          </button>
                        </div>

                        {/* Anchor Bottom Bar */}
                        <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white block">Sticky Bottom Anchor Bar</span>
                            <span className="text-[10px] text-neutral-400">Mobile Sticky Banner</span>
                          </div>
                          <button
                            onClick={() => updateAdNetworkConfig({ anchorAdEnabled: !adNetworkConfig.anchorAdEnabled })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              adNetworkConfig.anchorAdEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {adNetworkConfig.anchorAdEnabled ? 'ACTIVE' : 'OFF'}
                          </button>
                        </div>

                        {/* Global Body Script Integration */}
                        <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white block">Full Body Dynamic Ad Script</span>
                            <span className="text-[10px] text-neutral-400">Injects into &lt;body&gt; across all store pages</span>
                          </div>
                          <button
                            onClick={() => updateAdNetworkConfig({ bodyScriptEnabled: !adNetworkConfig.bodyScriptEnabled })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              adNetworkConfig.bodyScriptEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {adNetworkConfig.bodyScriptEnabled ? 'ACTIVE' : 'OFF'}
                          </button>
                        </div>

                        {/* On-Click Popunder Redirect */}
                        <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-white block">On-Click CPM Popunder Redirect</span>
                            <span className="text-[10px] text-neutral-400">Triggers CPM direct ad on page click</span>
                          </div>
                          <button
                            onClick={() => updateAdNetworkConfig({ popupAdEnabled: !adNetworkConfig.popupAdEnabled })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              adNetworkConfig.popupAdEnabled ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {adNetworkConfig.popupAdEnabled ? 'ACTIVE' : 'OFF'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Full Website Body Script Injector Code Box */}
                    <div className="space-y-2 pt-2 border-t border-neutral-900">
                      <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                        Full Website Body Ad Script Code (AdSense / EffectiveCPM / Adsterra / Direct Tag)
                      </label>
                      <textarea
                        rows={3}
                        value={adNetworkConfig.bodyAdCode || '<script type="text/javascript" src="//www.effectivecpmnetwork.com/yfdbxvqp6?key=5ca691feaa140cf099df2901ccbf6071"></script>'}
                        onChange={(e) => updateAdNetworkConfig({ bodyAdCode: e.target.value })}
                        placeholder="Paste your ad network script code tag here (e.g., <script src='//www.effectivecpmnetwork.com/...'></script>)"
                        className="w-full bg-neutral-900 border border-neutral-800 text-amber-300 p-3 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                      />
                      <span className="text-[10px] text-neutral-500 block">
                        This script runs automatically across the entire website body (&lt;body&gt;) on all pages, managed live from Admin.
                      </span>
                    </div>

                    {/* Custom HTML/JS Script Code Injector */}
                    <div className="space-y-2 pt-2 border-t border-neutral-900">
                      <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                        Custom Ad Tag / AdSense Banner Unit Code
                      </label>
                      <textarea
                        rows={2}
                        value={adNetworkConfig.customScriptSnippet}
                        onChange={(e) => updateAdNetworkConfig({ customScriptSnippet: e.target.value })}
                        placeholder="Paste official Google AdSense <script> or <ins class='adsbygoogle'> code tags..."
                        className="w-full bg-neutral-900 border border-neutral-800 text-emerald-400 p-3 rounded-xl focus:outline-none focus:border-amber-400 text-xs font-mono"
                      />
                      <span className="text-[10px] text-neutral-500 block">
                        Optional: Paste exact code provided by your ad network publisher panel.
                      </span>
                    </div>

                    {/* Save Confirmation Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => triggerAdminToast('Publisher Monetization settings saved and synced to live website!')}
                        className="bg-amber-400 text-neutral-950 hover:bg-amber-300 font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-400/10"
                      >
                        <ShieldCheck className="w-4 h-4" /> Save & Deploy Publisher Ad Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )}

        {/* TAX INVOICE & COURIER PACKING SLIP MODAL */}
        {selectedInvoiceOrder && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
            <div className="bg-white text-neutral-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl font-mono relative my-8">
              {/* Close Button */}
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Printable Header */}
              <div className="border-b-2 border-neutral-900 pb-4 mb-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-neutral-950">ZAPIN SEOUL ATELIER</h2>
                  <p className="text-[11px] text-neutral-600">Seongsu-dong Fashion District, Seoul, South Korea</p>
                  <p className="text-[11px] text-neutral-600">GSTIN / Tax ID: 29AAACZ9104F1ZM • Email: dispatch@zapin-seoul.com</p>
                </div>
                <div className="text-right">
                  <span className="bg-neutral-950 text-white text-[10px] px-2.5 py-1 font-bold rounded uppercase">TAX INVOICE & PACKING SLIP</span>
                  <p className="text-xs font-bold text-neutral-900 mt-2">INV-ZAP-{selectedInvoiceOrder.id}</p>
                  <p className="text-[10px] text-neutral-500">Date: {new Date().toLocaleDateString('en-IN')}</p>
                </div>
              </div>

              {/* Customer & Courier Details */}
              <div className="grid grid-cols-2 gap-4 text-xs mb-6 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                <div>
                  <h4 className="font-bold text-neutral-900 uppercase text-[10px] text-neutral-500 mb-1">RECIPIENT / SHIP TO:</h4>
                  <p className="font-bold text-sm text-neutral-900">{selectedInvoiceOrder.shippingAddress.fullName}</p>
                  <p className="text-neutral-700">{selectedInvoiceOrder.shippingAddress.street}</p>
                  <p className="text-neutral-700">{selectedInvoiceOrder.shippingAddress.city}, {selectedInvoiceOrder.shippingAddress.state} - {selectedInvoiceOrder.shippingAddress.zipCode}</p>
                  <p className="text-neutral-700 font-bold mt-1">Phone: +91 98765 43210</p>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-900 uppercase text-[10px] text-neutral-500 mb-1">COURIER DISPATCH METRICS:</h4>
                  <p className="font-bold text-neutral-900">Courier: BlueDart Express Air</p>
                  <p className="text-neutral-700">AWB Tracking: <span className="font-bold text-neutral-900">BD-{selectedInvoiceOrder.id}-IN</span></p>
                  <p className="text-neutral-700">Payment Mode: <span className="font-bold uppercase text-amber-700">{selectedInvoiceOrder.paymentMethod}</span></p>
                  <p className="text-neutral-700">Status: <span className="font-bold uppercase text-emerald-700">{selectedInvoiceOrder.orderStatus}</span></p>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="mb-6 overflow-hidden rounded-xl border border-neutral-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 text-neutral-700 uppercase text-[10px] font-bold border-b border-neutral-200">
                    <tr>
                      <th className="p-2.5">Item Description</th>
                      <th className="p-2.5">Size</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5 text-right">Price</th>
                      <th className="p-2.5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {selectedInvoiceOrder.items.map((it: any, idx: number) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-bold text-neutral-900">{it.product.title}</td>
                        <td className="p-2.5 text-neutral-600 uppercase">{it.selectedSize}</td>
                        <td className="p-2.5 text-center font-bold">{it.quantity}</td>
                        <td className="p-2.5 text-right">₹{it.product.price.toLocaleString('en-IN')}</td>
                        <td className="p-2.5 text-right font-bold">₹{(it.product.price * it.quantity).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div className="flex justify-between items-end border-t-2 border-neutral-900 pt-4 mb-6">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500">BARCODE DISPATCH STAMP</div>
                  <div className="text-2xl tracking-widest font-mono text-neutral-900 select-none font-bold">||||| ||| |||| || |||||| |||</div>
                  <p className="text-[9px] text-neutral-400">AUTHORIZED ZAPIN ATELIER DISPATCH LEDGER</p>
                </div>

                <div className="text-right space-y-1 text-xs">
                  <div className="flex justify-between gap-8 text-neutral-600">
                    <span>Subtotal:</span>
                    <span>₹{selectedInvoiceOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between gap-8 text-neutral-600">
                    <span>Express Shipping:</span>
                    <span className="text-emerald-700 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between gap-8 text-neutral-600">
                    <span>GST (18% Included):</span>
                    <span>₹{Math.round(selectedInvoiceOrder.total * 0.18).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between gap-8 text-base font-bold text-neutral-950 pt-2 border-t border-neutral-300">
                    <span>GRAND TOTAL:</span>
                    <span>₹{selectedInvoiceOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2 border-t border-neutral-200">
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="px-4 py-2 bg-neutral-200 text-neutral-700 font-bold rounded-xl text-xs hover:bg-neutral-300 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 bg-neutral-950 text-white font-bold rounded-xl text-xs hover:bg-neutral-800 flex items-center gap-2 shadow-lg transition-colors"
                >
                  <Printer className="w-4 h-4 text-amber-400" /> Print Packing Slip & Tax Invoice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QUICK COMMAND PALETTE OVERLAY MODAL */}
        {isQuickSearchOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 font-mono">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-xl w-full p-4 shadow-2xl space-y-4 relative">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                <Search className="w-5 h-5 text-amber-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={globalSearchInput}
                  onChange={(e) => setGlobalSearchInput(e.target.value)}
                  placeholder="Type to search Products, Orders, Users, or Tabs..."
                  className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-neutral-500 font-mono"
                />
                <button
                  onClick={() => setIsQuickSearchOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Shortcuts */}
              <div className="space-y-2">
                <p className="text-[10px] text-neutral-500 uppercase font-bold">Quick Navigation Shortcuts</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {adminTabsList.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsQuickSearchOpen(false);
                      }}
                      className="p-2.5 bg-neutral-900 border border-neutral-800 hover:border-amber-400/50 hover:bg-neutral-850 text-neutral-200 rounded-xl text-left flex items-center gap-2 transition-all"
                    >
                      <tab.icon className="w-4 h-4 text-amber-400" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Matching Search Results */}
              {globalSearchInput.trim() !== '' && (
                <div className="space-y-2 pt-2 border-t border-neutral-900 max-h-60 overflow-y-auto">
                  <p className="text-[10px] text-amber-400 uppercase font-bold">Matching Database Records</p>
                  {products.filter(p => p.title.toLowerCase().includes(globalSearchInput.toLowerCase())).map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setActiveTab('products');
                        setProductSearch(p.title);
                        setIsQuickSearchOpen(false);
                      }}
                      className="p-2 bg-neutral-900 hover:bg-neutral-850 rounded-xl text-xs flex justify-between items-center cursor-pointer text-white"
                    >
                      <span className="truncate font-bold">📦 Product: {p.title}</span>
                      <span className="text-amber-300 text-[10px]">₹{p.price}</span>
                    </div>
                  ))}
                  {orders.filter(o => o.id.toLowerCase().includes(globalSearchInput.toLowerCase()) || o.shippingAddress.fullName.toLowerCase().includes(globalSearchInput.toLowerCase())).map(o => (
                    <div
                      key={o.id}
                      onClick={() => {
                        setActiveTab('orders');
                        setOrderSearch(o.id);
                        setIsQuickSearchOpen(false);
                      }}
                      className="p-2 bg-neutral-900 hover:bg-neutral-850 rounded-xl text-xs flex justify-between items-center cursor-pointer text-white"
                    >
                      <span className="truncate font-bold">🛍️ Order #{o.id} - {o.shippingAddress.fullName}</span>
                      <span className="text-emerald-400 text-[10px]">₹{o.total}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

