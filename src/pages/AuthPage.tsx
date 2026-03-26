import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useStore } from '../store';
import { features } from '../weekConfig';
import { isValidEmail, isValidPassword, sanitizeName } from '../utils/validation';

export default function AuthPage() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_BASE_URL || '';

  if (!features.auth) {
    navigate('/');
    return null;
  }

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    navigate('/profile');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const normalizedEmail = email.trim().toLowerCase();
      if (!isValidEmail(normalizedEmail)) {
        setError('Please enter a valid email address.');
        return;
      }
      if (!password) {
        setError('Please enter your password.');
        return;
      }
      try {
        const response = await fetch(`${apiBase}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: normalizedEmail, password })
        });
        if (response.ok) {
          const data = await response.json();
          const u = data.user;
          setUser({
            id: u.id,
            name: u.name,
            email: u.email,
            password: '',
            address: u.address || '',
            phone: u.phone || '',
            avatar: u.avatar || '',
            createdAt: u.createdAt || u.created_at
          });
          navigate('/');
          return;
        }
      } catch {
        setError('Login failed. Please try again.');
        return;
      }
      setError('Invalid email or password. Please register first.');
    } else {
      const cleanName = sanitizeName(name);
      const normalizedEmail = email.trim().toLowerCase();
      if (!cleanName || !normalizedEmail || !password) {
        setError('Please fill in all fields');
        return;
      }
      if (!isValidEmail(normalizedEmail)) {
        setError('Please enter a valid email address.');
        return;
      }
      if (!isValidPassword(password)) {
        setError('Password must be 8+ chars and include letters and numbers.');
        return;
      }
      try {
        const response = await fetch(`${apiBase}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: cleanName, email: normalizedEmail, password })
        });
        if (response.ok) {
          const data = await response.json();
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            password: '',
            address: data.user.address || '',
            phone: data.user.phone || '',
            avatar: data.user.avatar || '',
            createdAt: data.user.createdAt || data.user.created_at
          });
          navigate('/');
          return;
        }
        const err = await response.json().catch(() => ({}));
        setError(err.message || 'Registration failed');
        return;
      } catch {
        setError('Registration failed. Please try again.');
        return;
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <Link to="/" className="block text-center mb-6">
          <span className="text-3xl font-bold text-amazon">
            <span className="text-amazon-orange">a</span>mazium
          </span>
        </Link>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <h1 className="text-2xl font-bold mb-1">{isLogin ? 'Sign In' : 'Create Account'}</h1>
          <p className="text-sm text-gray-500 mb-6">
            {isLogin ? 'Welcome back to Amazium' : 'Join Amazium today'}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4 animate-slide-down">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-semibold block mb-1">Your Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm" />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-semibold block mb-1">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {!isLogin && <p className="text-xs text-gray-500 mt-1">8+ chars with letters and numbers</p>}
            </div>

            <button type="submit" className="btn-amazon w-full py-3 text-base font-semibold">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or</span></div>
            </div>
            <p className="text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-amazon-blue hover:underline ml-1 font-medium">
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you agree to Amazium's Terms of Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
