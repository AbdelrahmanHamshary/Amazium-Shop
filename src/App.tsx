import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import AdminPage from './pages/AdminPage';
import NotificationsPage from './pages/NotificationsPage';
import Sidebar from './components/Sidebar';
import { CURRENT_WEEK, features, weekLabelMap } from './weekConfig';
import SessionValidator from './components/SessionValidator';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      {features.auth && <SessionValidator />}
      <div className="min-h-screen flex flex-col bg-[#e3e6e6]">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-3">
            <div className="inline-flex items-center rounded-full bg-amazon text-white text-xs sm:text-sm px-3 py-1">
              Week {CURRENT_WEEK}: {weekLabelMap[CURRENT_WEEK]}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {features.productDetails && <Route path="/product/:id" element={<ProductPage />} />}
            {features.cart && <Route path="/cart" element={<CartPage />} />}
            {features.checkout && <Route path="/checkout" element={<CheckoutPage />} />}
            {features.auth && <Route path="/auth" element={<AuthPage />} />}
            {features.profile && <Route path="/profile" element={<ProfilePage />} />}
            {features.orders && <Route path="/orders" element={<OrdersPage />} />}
            {features.wishlist && <Route path="/wishlist" element={<WishlistPage />} />}
            {features.admin && <Route path="/admin" element={<AdminPage />} />}
            {features.notifications && <Route path="/notifications" element={<NotificationsPage />} />}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
