import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, MapPin, Heart, Bell } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { products, categories } from '../data';
import { features } from '../weekConfig';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, searchQuery, setSearchQuery, setSelectedCategory, getCartCount, notifications } = useStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCat, setSelectedCat] = useState('All');
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const cartCount = getCartCount();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const suggestions = localSearch.length > 1
    ? products.filter((p) => p.title.toLowerCase().includes(localSearch.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = () => {
    setSearchQuery(localSearch);
    if (selectedCat !== 'All') setSelectedCategory(selectedCat);
    setShowSuggestions(false);
    navigate('/');
  };

  return (
    <header className="bg-amazon text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex items-center px-2 sm:px-4 py-2 gap-2 sm:gap-4">
        {/* Menu + Logo */}
        <button onClick={onMenuClick} className="lg:hidden p-1.5 hover:ring-1 hover:ring-white rounded">
          <Menu size={24} />
        </button>
        <Link to="/" className="shrink-0 flex items-center gap-1 hover:ring-1 hover:ring-white rounded px-1 py-0.5">
          <span className="text-xl sm:text-2xl font-bold tracking-tight">
            <span className="text-amazon-orange">a</span>mazium
          </span>
          <span className="text-amazon-orange text-[10px] hidden sm:block">.shop</span>
        </Link>

        {/* Deliver to */}
        <div className="hidden lg:flex items-center gap-1 hover:ring-1 hover:ring-white rounded px-2 py-1 cursor-pointer shrink-0">
          <MapPin size={18} className="text-white mt-3" />
          <div className="text-xs">
            <span className="text-gray-300">Deliver to</span>
            <div className="font-bold text-sm">Your Location</div>
          </div>
        </div>

        {/* Search Bar */}
        {features.searchFiltering ? (
        <div ref={searchRef} className="flex-1 flex relative max-w-3xl">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="hidden md:block bg-gray-100 text-gray-800 text-xs px-2 rounded-l-md border-r border-gray-300 focus:ring-0 focus:shadow-none"
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => { setLocalSearch(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search Amazium"
            className="flex-1 px-3 py-2 text-black text-sm focus:shadow-none focus:ring-0 border-none md:rounded-none rounded-l-md"
          />
          <button
            onClick={handleSearch}
            className="bg-amazon-orange hover:bg-yellow-500 px-3 sm:px-4 rounded-r-md transition-colors"
          >
            <Search size={20} className="text-amazon" />
          </button>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white text-black rounded-b-md shadow-xl z-50 animate-slide-down">
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setShowSuggestions(false); setLocalSearch(''); navigate(`/product/${p.id}`); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-100 flex items-center gap-3 text-sm border-b border-gray-100 last:border-0"
                >
                  <Search size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate">{p.title}</span>
                  <span className="text-xs text-gray-500 ml-auto shrink-0">{p.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        ) : (
          <div className="flex-1" />
        )}

        {/* Right nav */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {features.auth && (
          <Link to={user ? '/profile' : '/auth'} className="hidden sm:flex flex-col hover:ring-1 hover:ring-white rounded px-2 py-1">
            <span className="text-xs text-gray-300">Hello, {user ? user.name.split(' ')[0] : 'Sign in'}</span>
            <span className="text-sm font-bold">Account</span>
          </Link>
          )}

          {features.orders && (
          <Link to="/orders" className="hidden md:flex flex-col hover:ring-1 hover:ring-white rounded px-2 py-1">
            <span className="text-xs text-gray-300">Returns</span>
            <span className="text-sm font-bold">& Orders</span>
          </Link>
          )}

          {features.wishlist && (
          <Link to="/wishlist" className="relative hover:ring-1 hover:ring-white rounded p-1.5 hidden sm:block">
            <Heart size={22} />
          </Link>
          )}

          {features.notifications && (
          <Link to="/notifications" className="relative hover:ring-1 hover:ring-white rounded p-1.5">
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
          )}

          {features.cart && (
          <Link to="/cart" className="flex items-center hover:ring-1 hover:ring-white rounded px-2 py-1 relative">
            <div className="relative">
              <ShoppingCart size={28} />
              <span className="absolute -top-1 right-0 text-amazon-orange font-bold text-sm">{cartCount}</span>
            </div>
            <span className="hidden sm:block text-sm font-bold ml-1">Cart</span>
          </Link>
          )}
        </div>
      </div>

      {/* Sub-nav */}
      <div className="bg-amazon-light flex items-center px-2 sm:px-4 py-1.5 gap-3 overflow-x-auto no-scrollbar text-sm">
        <button onClick={onMenuClick} className="hidden lg:flex items-center gap-1 hover:ring-1 hover:ring-white rounded px-1.5 py-0.5 font-bold shrink-0">
          <Menu size={18} /> All
        </button>
        {['Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell'].map((item) => (
          <button key={item} className="hover:ring-1 hover:ring-white rounded px-1.5 py-0.5 whitespace-nowrap shrink-0">
            {item}
          </button>
        ))}
        {features.admin && (
        <Link to="/admin" className="hover:ring-1 hover:ring-white rounded px-1.5 py-0.5 whitespace-nowrap shrink-0 ml-auto text-amazon-orange font-semibold">
          Admin Panel
        </Link>
        )}
      </div>
    </header>
  );
}
