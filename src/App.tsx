import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { SearchOverlay } from './components/SearchOverlay';
import { CartDrawer } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { NewsletterPopup } from './components/NewsletterPopup';
import { AdNetworkBanner } from './components/AdNetworkBanner';
import { GlobalBodyAdScript } from './components/GlobalBodyAdScript';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { MenCategoryPage } from './pages/MenCategoryPage';
import { WomenCategoryPage } from './pages/WomenCategoryPage';
import { NewArrivalsCategoryPage } from './pages/NewArrivalsCategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { MyAccountPage } from './pages/MyAccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ReturnPolicyPage } from './pages/ReturnPolicyPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { AdminPanel } from './pages/AdminPanel';

const AppContent: React.FC = () => {
  const { currentPage } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'men':
        return <MenCategoryPage />;
      case 'women':
        return <WomenCategoryPage />;
      case 'new-arrivals':
        return <NewArrivalsCategoryPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'login':
        return <LoginPage />;
      case 'my-account':
        return <MyAccountPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactUsPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'return-policy':
        return <ReturnPolicyPage />;
      case 'shipping-policy':
        return <ShippingPolicyPage />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <HomePage />;
    }
  };

  const isAdminView = currentPage === 'admin';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {!isAdminView && <Navbar />}

      <main className="flex-1">{renderPage()}</main>

      {!isAdminView && <Footer />}

      {/* Global Drawers & Overlays */}
      <SearchOverlay />
      <CartDrawer />
      <SizeGuideModal />
      <NewsletterPopup />
      <WhatsAppButton />
      <GlobalBodyAdScript />
      {!isAdminView && <AdNetworkBanner position="anchor" />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
