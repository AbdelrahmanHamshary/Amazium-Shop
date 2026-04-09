import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Save, Check, LogOut, ShoppingBag, Heart, Bell, Settings } from 'lucide-react';
import { useStore } from '../store';
import { isValidEmail, isValidPhone, sanitizeAddress, sanitizeName, sanitizePhone } from '../utils/validation';

export default function ProfilePage() {
  const { user, saveProfileToServer, setUser } = useStore();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: user?.address || '' });

  useEffect(() => {
    if (!user || editing) return;
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || ''
    });
  }, [user, editing]);

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleSave = async () => {
    if (sanitizeName(form.name).length < 3) {
      setError('Please enter a valid full name.');
      return;
    }
    if (!isValidEmail(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.phone && !isValidPhone(form.phone)) {
      setError('Phone number format is invalid.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      await saveProfileToServer({
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address
      });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save.');
    } finally {
      setSaving(false);
    }
  };

  const quickLinks = [
    { icon: ShoppingBag, label: 'Your Orders', desc: 'Track, return, or buy again', to: '/orders' },
    { icon: Heart, label: 'Your Wishlist', desc: 'Items you saved for later', to: '/wishlist' },
    { icon: Bell, label: 'Notifications', desc: 'Alerts and messages', to: '/notifications' },
    { icon: Settings, label: 'Account Settings', desc: 'Edit login, address, and more', to: '/profile' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Account</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 animate-fade-in-up">
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="relative shrink-0">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amazon-orange" />
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-amazon-orange rounded-full flex items-center justify-center shadow">
              <Camera size={14} className="text-amazon" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-gray-500 text-sm mt-1">
              Member since{' '}
              {user.createdAt
                ? new Date(user.createdAt).getFullYear()
                : new Date().getFullYear()}
            </p>
          </div>
          <button onClick={() => { setUser(null); navigate('/'); }} className="text-sm text-red-600 hover:underline flex items-center gap-1" type="button">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {quickLinks.map(({ icon: Icon, label, desc, to }) => (
          <Link key={label} to={to} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-amazon-orange/20 transition-colors">
              <Icon size={20} className="text-amazon" />
            </div>
            <div>
              <h3 className="font-bold text-sm">{label}</h3>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Edit Profile */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Personal Information</h2>
          {!editing ? (
            <button onClick={() => setEditing(true)} className="text-sm text-amazon-blue hover:underline">Edit</button>
          ) : (
            <button type="button" onClick={() => void handleSave()} disabled={saving} className="btn-amazon flex items-center gap-1.5 text-sm disabled:opacity-60">
              <Save size={14} /> {saving ? 'Saving…' : 'Save Changes'}
            </button>
          )}
        </div>

        {saved && (
          <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 rounded-lg px-4 py-2 mb-4 animate-slide-down">
            <Check size={16} /> Profile updated successfully!
          </div>
        )}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-2 mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Full Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: sanitizeName(e.target.value) })} disabled={!editing} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm disabled:bg-gray-50 disabled:text-gray-600" maxLength={80} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value.trim().toLowerCase() })} disabled={!editing} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm disabled:bg-gray-50 disabled:text-gray-600" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: sanitizePhone(e.target.value) })} disabled={!editing} placeholder="Not set" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm disabled:bg-gray-50 disabled:text-gray-600" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Address</label>
            <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: sanitizeAddress(e.target.value) })} disabled={!editing} placeholder="Not set" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm disabled:bg-gray-50 disabled:text-gray-600" maxLength={300} />
          </div>
        </div>
      </div>
    </div>
  );
}
