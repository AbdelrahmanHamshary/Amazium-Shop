import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product, useStore } from '../store';
import StarRating from './StarRating';
import { useState } from 'react';
import { features } from '../weekConfig';

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [cartBump, setCartBump] = useState(false);
  const wishlisted = isInWishlist(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setCartBump(true);
    setTimeout(() => setCartBump(false), 300);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    void toggleWishlist(product.id);
  };

  const CardWrapper = ({ children }: { children: React.ReactNode }) =>
    features.productDetails ? (
      <Link
        to={`/product/${product.id}`}
        className="product-card bg-white rounded-lg overflow-hidden flex flex-col animate-fade-in-up group"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {children}
      </Link>
    ) : (
      <article
        className="product-card bg-white rounded-lg overflow-hidden flex flex-col animate-fade-in-up group"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {children}
      </article>
    );

  return (
    <CardWrapper>
      {/* Image */}
      <div className="relative bg-gray-50 p-4 flex items-center justify-center h-48 sm:h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded ${
            product.badge === 'Best Seller' ? 'bg-amazon-orange text-amazon' :
            product.badge === 'Amazon Choice' ? 'bg-amazon text-white' :
            'bg-red-600 text-white'
          }`}>
            {product.badge}
          </span>
        )}
        {features.wishlist && (
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow transition-all hover:scale-110"
        >
          <Heart size={18} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col gap-1.5">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-amazon-blue transition-colors">
          {product.title}
        </h3>

        {features.reviews && (
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size={14} />
          <span className="text-xs text-amazon-blue">{product.reviewCount.toLocaleString()}</span>
        </div>
        )}

        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          <span className="text-sm text-red-600 font-semibold">-{discount}%</span>
        </div>

        <p className="text-xs text-amazon-green font-medium">
          FREE delivery <span className="font-bold">Tomorrow</span>
        </p>

        {features.cart && (
        <button
          onClick={handleAddToCart}
          className={`btn-amazon mt-2 flex items-center justify-center gap-2 text-sm font-semibold ${cartBump ? 'animate-pulse-cart' : ''}`}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
        )}
      </div>
    </CardWrapper>
  );
}
