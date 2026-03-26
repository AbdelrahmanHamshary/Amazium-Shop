import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getApiBase } from './lib/apiBase';
import { setSessionEmail } from './lib/session';

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  stock: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
  trackingSteps: { label: string; done: boolean; date?: string }[];
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  avatar: string;
  /** ISO date from MySQL `users.created_at` */
  createdAt?: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'order' | 'promo' | 'system';
  read: boolean;
  date: string;
}

interface Store {
  user: User | null;
  cart: CartItem[];
  wishlist: number[];
  orders: Order[];
  reviews: Review[];
  notifications: Notification[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  priceRange: [number, number];

  setUser: (user: User | null) => void;
  clearStaleSession: () => void;
  /** Load orders, notifications, wishlist from API (MySQL). */
  syncFromServer: () => Promise<void>;
  /** Persist profile fields to MySQL; updates local user from response. */
  saveProfileToServer: (input: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => Promise<void>;
  register: (user: User) => void;
  login: (email: string, password: string) => boolean;
  /** @deprecated use saveProfileToServer */
  updateProfile: (updates: Partial<User>) => void;

  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  toggleWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;

  placeOrder: (address: string, meta?: { phone?: string }) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;

  addReview: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => Promise<void>;
  getProductReviews: (productId: number) => Review[];
  loadReviewsForProduct: (productId: number) => Promise<void>;

  addNotification: (msg: string, type: Notification['type']) => void;
  markNotificationRead: (id: number) => Promise<void>;
  markAllRead: () => Promise<void>;

  setSearchQuery: (q: string) => void;
  setSelectedCategory: (c: string) => void;
  setSortBy: (s: string) => void;
  setPriceRange: (r: [number, number]) => void;
}

function mapApiUser(u: Record<string, unknown>): User {
  return {
    id: Number(u.id),
    name: String(u.name || ''),
    email: String(u.email || ''),
    password: '',
    address: String(u.address || ''),
    phone: String(u.phone || ''),
    avatar: String(u.avatar || ''),
    createdAt: u.createdAt ? String(u.createdAt) : u.created_at ? String(u.created_at) : undefined
  };
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      wishlist: [],
      orders: [],
      reviews: [],
      notifications: [],
      searchQuery: '',
      selectedCategory: 'All',
      sortBy: 'featured',
      priceRange: [0, 2000],

      setUser: (user) => {
        if (user?.email) setSessionEmail(user.email);
        else setSessionEmail(null);
        set({ user });
        if (user?.id) {
          void get().syncFromServer();
        }
      },

      clearStaleSession: () => {
        setSessionEmail(null);
        set({
          user: null,
          orders: [],
          notifications: [],
          wishlist: [],
          reviews: []
        });
      },

      syncFromServer: async () => {
        const u = get().user;
        if (!u?.id) return;
        const api = getApiBase();
        try {
          const [ordersRes, notifRes, wishRes] = await Promise.all([
            fetch(`${api}/api/orders?userId=${u.id}`),
            fetch(`${api}/api/notifications?userId=${u.id}`),
            fetch(`${api}/api/wishlist?userId=${u.id}`)
          ]);
          if (ordersRes.ok) {
            const data = (await ordersRes.json()) as { orders?: Order[] };
            const raw = data.orders || [];
            set({
              orders: raw.map((o) => ({
                ...o,
                status: o.status as Order['status'],
                date:
                  typeof o.date === 'string'
                    ? o.date
                    : new Date(o.date as unknown as string).toISOString()
              }))
            });
          }
          if (notifRes.ok) {
            const list = (await notifRes.json()) as Array<{
              id: number;
              message: string;
              type: Notification['type'];
              read: boolean;
              date: string;
            }>;
            set({
              notifications: list.map((n) => ({
                id: n.id,
                message: n.message,
                type: n.type,
                read: n.read,
                date: typeof n.date === 'string' ? n.date : new Date(n.date).toISOString()
              }))
            });
          }
          if (wishRes.ok) {
            const ids = (await wishRes.json()) as number[];
            set({ wishlist: ids });
          }
        } catch (e) {
          console.error('syncFromServer', e);
        }
      },

      saveProfileToServer: async (input) => {
        const u = get().user;
        if (!u?.id) throw new Error('Not signed in');
        const api = getApiBase();
        const res = await fetch(`${api}/api/users/profile`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: u.id,
            name: input.name.trim(),
            email: input.email.trim().toLowerCase(),
            phone: input.phone.trim(),
            address: input.address.trim()
          })
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error((body as { message?: string }).message || 'Could not save profile');
        }
        const row = (body as { user: Record<string, unknown> }).user;
        if (row) {
          const next = mapApiUser(row);
          set({ user: next });
          setSessionEmail(next.email);
        }
      },

      register: (user) => {
        set({ user });
      },
      login: (email, password) => {
        const state = get();
        if (state.user && state.user.email === email && state.user.password === password) {
          return true;
        }
        return false;
      },
      updateProfile: (updates) => set((s) => ({ user: s.user ? { ...s.user, ...updates } : null })),

      addToCart: (product, qty = 1) =>
        set((s) => {
          const existing = s.cart.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              cart: s.cart.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
              )
            };
          }
          return { cart: [...s.cart, { product, quantity: qty }] };
        }),
      removeFromCart: (productId) =>
        set((s) => ({ cart: s.cart.filter((i) => i.product.id !== productId) })),
      updateCartQty: (productId, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((i) => i.product.id !== productId)
              : s.cart.map((i) =>
                  i.product.id === productId ? { ...i, quantity: qty } : i
                )
        })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      getCartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),

      toggleWishlist: async (productId) => {
        const s = get();
        const api = getApiBase();
        const on = s.wishlist.includes(productId);
        if (!s.user?.id) {
          set({
            wishlist: on ? s.wishlist.filter((id) => id !== productId) : [...s.wishlist, productId]
          });
          return;
        }
        try {
          if (on) {
            await fetch(
              `${api}/api/wishlist?userId=${s.user.id}&productId=${productId}`,
              { method: 'DELETE' }
            );
          } else {
            await fetch(`${api}/api/wishlist`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: s.user.id, productId })
            });
          }
          await get().syncFromServer();
        } catch (e) {
          console.error('toggleWishlist', e);
        }
      },
      isInWishlist: (productId) => get().wishlist.includes(productId),

      placeOrder: async (address, meta) => {
        const s = get();
        if (!s.user) {
          throw new Error('You must be signed in to place an order.');
        }
        const orderId = `AMZ-${Date.now().toString(36).toUpperCase()}`;
        const items = s.cart.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
          price: i.product.price
        }));
        const total = s.getCartTotal();
        const api = getApiBase();
        const phone = meta?.phone ?? s.user.phone ?? '';

        const response = await fetch(`${api}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: s.user.id ?? null,
            email: s.user.email,
            orderId,
            total,
            shippingAddress: address,
            phone,
            items
          })
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error((err as { message?: string }).message || 'Could not save order. Try again.');
        }

        set({ cart: [] });
        await get().syncFromServer();
      },

      cancelOrder: async (orderId) => {
        const u = get().user;
        if (!u?.id) return;
        const api = getApiBase();
        const res = await fetch(`${api}/api/orders/${encodeURIComponent(orderId)}/cancel`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: u.id })
        });
        if (res.ok) await get().syncFromServer();
      },

      addReview: async (review) => {
        const u = get().user;
        if (!u?.id) throw new Error('Sign in required');
        const api = getApiBase();
        const res = await fetch(`${api}/api/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: u.id,
            productId: review.productId,
            rating: review.rating,
            title: review.title,
            comment: review.comment
          })
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { message?: string }).message || 'Review failed');
        }
        await get().loadReviewsForProduct(review.productId);
      },

      getProductReviews: (productId) => get().reviews.filter((r) => r.productId === productId),

      loadReviewsForProduct: async (productId) => {
        const api = getApiBase();
        const res = await fetch(`${api}/api/reviews?productId=${productId}`);
        if (!res.ok) return;
        const rows = (await res.json()) as Array<{
          id: number;
          productId: number;
          userName: string;
          rating: number;
          title: string;
          comment: string;
          helpful: number;
          date: string;
        }>;
        set((s) => ({
          reviews: [
            ...s.reviews.filter((r) => r.productId !== productId),
            ...rows.map((r) => ({
              id: r.id,
              productId: r.productId,
              userName: r.userName || 'Customer',
              rating: r.rating,
              title: r.title,
              comment: r.comment,
              helpful: r.helpful ?? 0,
              date: typeof r.date === 'string' ? r.date : new Date(r.date).toISOString()
            }))
          ]
        }));
      },

      addNotification: (_msg, _type) => {
        /* Promos only — order notifications come from API / MySQL */
      },

      markNotificationRead: async (id) => {
        const u = get().user;
        if (!u?.id) return;
        const api = getApiBase();
        await fetch(`${api}/api/notifications/read`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: u.id, ids: [id] })
        });
        await get().syncFromServer();
      },

      markAllRead: async () => {
        const u = get().user;
        if (!u?.id) return;
        const api = getApiBase();
        await fetch(`${api}/api/notifications/read`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: u.id, all: true })
        });
        await get().syncFromServer();
      },

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setSortBy: (sortBy) => set({ sortBy }),
      setPriceRange: (priceRange) => set({ priceRange })
    }),
    {
      name: 'amazium-store-v2',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        searchQuery: state.searchQuery,
        selectedCategory: state.selectedCategory,
        sortBy: state.sortBy,
        priceRange: state.priceRange
      })
    }
  )
);
