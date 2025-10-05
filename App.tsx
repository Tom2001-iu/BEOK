
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import ScrollToTop from './components/ScrollToTop';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AccountPage from './pages/AccountPage';
import ProtectedRoute from './components/ProtectedRoute';
import NewsletterPopup from './components/NewsletterPopup';
import CareersPage from './pages/CareersPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ShippingReturnsPage from './pages/ShippingReturnsPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SearchResultsPage from './pages/SearchResultsPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${isHomePage ? '' : 'pt-20'}`}>
        <PageTransition />
      </main>
      <Footer />
      <NewsletterPopup />
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <CurrencyProvider>
          <HashRouter>
            <ScrollToTop />
            <AppContent />
          </HashRouter>
        </CurrencyProvider>
      </CartProvider>
    </AuthProvider>
  );
};

const PageTransition: React.FC = () => {
  const location = useLocation();
  return (
    <div key={location.key} className="animate-fade-in">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/category/:categoryName" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/account" element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};


export default App;