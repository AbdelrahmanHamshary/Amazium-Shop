const rawWeek = Number(import.meta.env.VITE_PUBLISHED_WEEK || 14);
export const CURRENT_WEEK = Number.isFinite(rawWeek) ? Math.min(14, Math.max(1, rawWeek)) : 14;

export const features = {
  auth: CURRENT_WEEK >= 2,
  searchFiltering: CURRENT_WEEK >= 3,
  cart: CURRENT_WEEK >= 4,
  productDetails: CURRENT_WEEK >= 5,
  checkout: CURRENT_WEEK >= 6,
  orders: CURRENT_WEEK >= 7,
  profile: CURRENT_WEEK >= 8,
  reviews: CURRENT_WEEK >= 9,
  admin: CURRENT_WEEK >= 10,
  payment: CURRENT_WEEK >= 11,
  wishlist: CURRENT_WEEK >= 12,
  notifications: CURRENT_WEEK >= 13,
  finalPolish: CURRENT_WEEK >= 14
};

export const weekLabelMap: Record<number, string> = {
  1: 'Product Listing & Display',
  2: 'User Registration & Login',
  3: 'Product Search & Filtering',
  4: 'Shopping Cart',
  5: 'Product Details Page',
  6: 'Checkout Process',
  7: 'Order Management',
  8: 'User Profile & Settings',
  9: 'Product Reviews & Ratings',
  10: 'Admin Dashboard',
  11: 'Payment Integration',
  12: 'Wishlist & Recommendations',
  13: 'Notifications & Order Tracking',
  14: 'Final Polish'
};
