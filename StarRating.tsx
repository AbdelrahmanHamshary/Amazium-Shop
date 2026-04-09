import { Product } from './store';

export const categories = [
  'All', 'Electronics', 'Wearables', 'Fashion', 'Computers', 'Audio', 'Home'
];

export const products: Product[] = [
  {
    id: 1, title: 'Wireless Noise-Canceling Headphones',
    price: 149.99, originalPrice: 199.99,
    description: 'Wireless over-ear headphones with active noise cancellation and high-fidelity sound for daily listening and calls.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    rating: 4.7, reviewCount: 2847, badge: 'Best Seller', stock: 45,
    features: ['Active Noise Cancellation', '30-hour battery', 'Bluetooth', 'Foldable design', 'Built-in microphone'],
  },
  {
    id: 2, title: 'Smart Watch Pro',
    price: 99.5, originalPrice: 149.99,
    description: 'Smartwatch with activity tracking, sleep insights, and all-day health metrics in a lightweight design.',
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    rating: 4.4, reviewCount: 1523, badge: 'Deal', stock: 12,
    features: ['Step tracking', 'Sleep analysis', 'Heart-rate monitor', 'Water resistant', '7-day battery'],
  },
  {
    id: 3, title: 'Minimalist Backpack',
    price: 42, originalPrice: 59.99,
    description: 'Minimal backpack with clean design, padded shoulder straps, and daily-carry storage compartments.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80',
    rating: 4.2, reviewCount: 5621, badge: 'Amazon Choice', stock: 89,
    features: ['Lightweight build', 'Multiple compartments', 'Padded straps', 'Water-resistant fabric', 'Laptop sleeve'],
  },
  {
    id: 4, title: 'Home Office Keyboard',
    price: 59.95, originalPrice: 89.99,
    description: 'Comfort-focused full-size keyboard made for long work sessions with quiet and responsive key switches.',
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
    rating: 4.6, reviewCount: 8932, badge: 'Best Seller', stock: 500,
    features: ['Full-size layout', 'Quiet switches', 'USB connectivity', 'Ergonomic tilt', 'Long key life'],
  },
  {
    id: 5, title: 'Portable Bluetooth Speaker',
    price: 35.99, originalPrice: 69.99,
    description: 'Compact Bluetooth speaker with punchy sound and portable body, ideal for home and outdoor use.',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80',
    rating: 4.5, reviewCount: 3456, stock: 67,
    features: ['Portable design', 'Bluetooth connection', 'Strong bass', 'USB charging', 'Hands-free calling'],
  },
  {
    id: 6, title: 'Ceramic Coffee Mug Set',
    price: 24.99, originalPrice: 39.99,
    description: 'Simple ceramic mug set built for everyday coffee and tea use with durable glazed finish.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
    rating: 4.1, reviewCount: 1267, badge: 'Best Seller', stock: 200,
    features: ['Ceramic construction', 'Dishwasher safe', 'Microwave safe', 'Minimal design', 'Set of mugs'],
  },
];

export const heroSlides = [
  {
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    title: 'Summer Sale',
    subtitle: 'Up to 60% off on Electronics',
    cta: 'Shop Now',
  },
  {
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    title: 'New Arrivals',
    subtitle: 'Fresh styles for every occasion',
    cta: 'Explore',
  },
  {
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    title: 'Free Shipping',
    subtitle: 'On orders over $35',
    cta: 'Learn More',
  },
  {
    bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    title: 'Prime Deals',
    subtitle: 'Exclusive offers for members',
    cta: 'Join Now',
  },
];
