export type ProductCategory = 'men' | 'women' | 'new-arrivals' | 'unisex';
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  fitFeedback?: 'True to Size' | 'Runs Small' | 'Runs Large';
  helpfulCount?: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  category: ProductCategory;
  sizes: ProductSize[];
  colors: { name: string; hex: string }[];
  images: string[];
  stockQuantity: number;
  tags?: ('featured' | 'bestseller' | 'new' | 'limited')[];
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique cart line item id (productId + size + color)
  product: Product;
  size: ProductSize;
  color: { name: string; hex: string };
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  value: number; // e.g., 10 for 10% or 500 for flat 500
  minOrderAmount: number;
  active: boolean;
  expiryDate?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'razorpay' | 'cod';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  couponCode?: string;
  trackingNumber: string;
  createdAt: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: ShippingAddress[];
  orders: Order[];
  wishlistProductIds: string[];
}

export interface BannerConfig {
  heroHeadline: string;
  heroSubheadline: string;
  heroButtonText: string;
  heroImageUrl: string;
  promoText: string;
  promoBannerImage: string;
}

export type PageRoute =
  | 'home'
  | 'shop'
  | 'men'
  | 'women'
  | 'new-arrivals'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'login'
  | 'my-account'
  | 'wishlist'
  | 'order-tracking'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'return-policy'
  | 'shipping-policy'
  | 'admin';

export type AdminTab =
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'customers'
  | 'inventory'
  | 'coupons'
  | 'banners'
  | 'ads';

export interface AdCampaign {
  id: string;
  title: string;
  platform: 'Google Search Ads' | 'Meta (Instagram/FB)' | 'Top Marquee Banner' | 'Popup Promo Ad' | 'In-Feed Store Ad';
  budget: number;
  spent: number;
  clicks: number;
  impressions: number;
  conversions: number;
  status: 'active' | 'paused' | 'ended';
  imageUrl?: string;
  targetUrl?: string;
  promoCode?: string;
  startDate: string;
  endDate?: string;
}

export interface AdNetworkConfig {
  enabled: boolean;
  publisherId: string; // e.g., 'ca-pub-9842019827319203' or CPM Key
  networkProvider: string;
  directAdUrl: string;
  headerBannerEnabled: boolean;
  inFeedAdsEnabled: boolean;
  sidebarAdsEnabled: boolean;
  footerBannerEnabled: boolean;
  anchorAdEnabled: boolean;
  autoAdsEnabled: boolean;
  bodyScriptEnabled: boolean;
  bodyAdCode: string;
  popupAdEnabled: boolean;
  customScriptSnippet: string;
  // New Ad Format Configurations: Native Banner, Popunder, Smartlink, Social Bar
  nativeBannerEnabled: boolean;
  nativeBannerCode: string;
  popunderEnabled: boolean;
  popunderCode: string;
  smartlinkEnabled: boolean;
  smartlinkUrl: string;
  socialBarEnabled: boolean;
  socialBarCode: string;
  autoRefreshEnabled?: boolean;
  autoRefreshInterval?: number; // In seconds (e.g., 30)
  estimatedEarnings: number;
  monthlyImpressions: number;
  monthlyClicks: number;
  pageRpm: number;
}

