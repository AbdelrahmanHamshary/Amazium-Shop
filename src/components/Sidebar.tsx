import { Link } from 'react-router-dom';
import { X, User, ShoppingBag, Heart, Settings, LayoutDashboard, Bell, LogOut, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { categories } from '../data';
import { features } from '../weekConfig';

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, setUser, setSelectedCategory } = useStore();

  const menuItems = [
    ...(features.auth ? [{ icon: User, label: 'Your Account', to: user ? '/profile' : '/auth' }] : []),
    ...(features.orders ? [{ icon: ShoppingBag, label: 'Your Orders', to: '/orders' }] : []),
    ...(features.wishlist ? [{ icon: Heart, label: 'Your Wishlist', to: '/wishlist' }] : []),
    ...(features.notifications ? [{ icon: Bell, label: 'Notifications', to: '/notifications' }] : []),
    ...(features.admin ? [{ icon: LayoutDashboard, label: 'Admin Panel', to: '/admin' }] : []),
    ...(features.profile ? [{ icon: Settings, label: 'Settings', to: '/profile' }] : [])
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[300px] sm:w-[360px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
        {/* Header */}
        <div className="bg-amazon-light text-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
            <User size={24} />
          </div>
          <div className="flex-1">
            <span className="font-bold text-lg">Hello, {user ? user.name : 'Sign In'}</span>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 rounded p-1">
            <X size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <div className="px-5 py-2 font-bold text-lg">Digital Content & Devices</div>
          {menuItems.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition-colors"
            >
              <Icon size={20} className="text-gray-600" />
              <span className="flex-1">{label}</span>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-200 my-1" />

        {/* Categories */}
        <div className="py-2">
          <div className="px-5 py-2 font-bold text-lg">Shop by Category</div>
          {categories.filter(c => c !== 'All').map((cat) => (
            <Link
              key={cat}
              to="/"
              onClick={() => { setSelectedCategory(cat); onClose(); }}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition-colors"
            >
              <span className="flex-1">{cat}</span>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-200 my-1" />

        {/* Sign out */}
        {user && (
          <button
            onClick={() => { setUser(null); onClose(); }}
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 w-full text-left text-red-600"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </>
  );
}
