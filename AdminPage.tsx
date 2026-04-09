import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { products } from '../data';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useStore();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));
  const recommended = products.filter((p) => !wishlist.includes(p.id)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Wishlist</h1>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {wishlistProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-7xl mb-4">💝</p>
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save items you love for later</p>
          <Link to="/" className="btn-amazon text-base px-8 py-3 inline-block">Explore Products</Link>
        </div>
      )}

      {/* Recommendations */}
      {recommended.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
