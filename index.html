import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, Check, ThumbsUp } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { sanitizeName } from '../utils/validation';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart, toggleWishlist, isInWishlist, addReview, getProductReviews, user } = useStore();
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewError, setReviewError] = useState('');

  if (!product) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">😕</p>
      <h2 className="text-2xl font-bold mb-2">Product not found</h2>
      <Link to="/" className="text-amazon-blue hover:underline">Back to shopping</Link>
    </div>
  );

  const reviews = getProductReviews(product.id);
  const wishlisted = isInWishlist(product.id);

  useEffect(() => {
    void useStore.getState().loadReviewsForProduct(product.id);
  }, [product.id]);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setReviewError('Please sign in before submitting a review.');
      return;
    }
    if (reviewForm.title.trim().length < 3 || reviewForm.title.trim().length > 120) {
      setReviewError('Review title must be between 3 and 120 characters.');
      return;
    }
    if (reviewForm.comment.trim().length < 10 || reviewForm.comment.trim().length > 1000) {
      setReviewError('Review comment must be between 10 and 1000 characters.');
      return;
    }
    setReviewError('');
    try {
      await addReview({
        productId: product.id,
        userName: sanitizeName(user?.name || 'User'),
        rating: reviewForm.rating,
        title: reviewForm.title.trim(),
        comment: reviewForm.comment.trim()
      });
      setReviewForm({ rating: 5, title: '', comment: '' });
      setShowReviewForm(false);
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : 'Review failed.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
        <Link to="/" className="hover:text-amazon-blue">Home</Link>
        <span>/</span>
        <span className="hover:text-amazon-blue cursor-pointer">{product.category}</span>
        <span>/</span>
        <span className="text-gray-700 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Product Detail */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* Images */}
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center h-[300px] sm:h-[400px] overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {[product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden ${selectedImage === i ? 'border-amazon-blue' : 'border-gray-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {product.badge && (
              <span className={`inline-block text-xs font-bold px-2 py-1 rounded ${
                product.badge === 'Best Seller' ? 'bg-amazon-orange text-amazon' :
                product.badge === 'Amazon Choice' ? 'bg-amazon text-white' :
                'bg-red-600 text-white'
              }`}>
                {product.badge}
              </span>
            )}

            <h1 className="text-xl sm:text-2xl font-medium text-gray-900">{product.title}</h1>

            <div className="flex items-center gap-2 flex-wrap">
              <StarRating rating={product.rating} size={18} />
              <span className="text-amazon-blue text-sm hover:underline cursor-pointer">
                {product.reviewCount.toLocaleString()} ratings
              </span>
              {reviews.length > 0 && (
                <span className="text-sm text-gray-500">| {reviews.length} customer reviews</span>
              )}
            </div>

            <div className="border-t border-b border-gray-200 py-3">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Price:</span>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-base text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="text-base text-red-600 font-semibold">Save {discount}%</span>
              </div>
              <p className="text-sm text-amazon-green mt-1 font-medium">
                <Truck size={14} className="inline mr-1" />
                FREE delivery <span className="font-bold">Tomorrow</span> if ordered within 6 hrs
              </p>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-bold text-sm mb-2">Key Features:</h3>
              <ul className="space-y-1">
                {product.features.map((f, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <Check size={14} className="text-amazon-green mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock & Quantity */}
            <div className="flex items-center gap-4">
              <span className={`text-sm font-semibold ${product.stock > 10 ? 'text-amazon-green' : 'text-red-600'}`}>
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left!`}
              </span>
              <div className="flex items-center gap-2">
                <label className="text-sm">Qty:</label>
                <select value={qty} onChange={(e) => setQty(+e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm">
                  {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAddToCart} className={`btn-amazon flex-1 flex items-center justify-center gap-2 py-3 text-base font-semibold ${addedToCart ? 'bg-green-100 border-green-400' : ''}`}>
                {addedToCart ? <><Check size={18} /> Added!</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
              <button onClick={() => { handleAddToCart(); }} className="btn-orange flex-1 py-3 text-base">
                Buy Now
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-4 text-sm">
              <button type="button" onClick={() => void toggleWishlist(product.id)} className={`flex items-center gap-1.5 hover:text-amazon-blue ${wishlisted ? 'text-red-500' : 'text-gray-600'}`}>
                <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
                {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              <button className="flex items-center gap-1.5 text-gray-600 hover:text-amazon-blue">
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
              {[
                { icon: Shield, label: '2-Year Warranty' },
                { icon: Truck, label: 'Free Shipping' },
                { icon: RotateCcw, label: '30-Day Returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <Icon size={20} className="text-amazon-blue" />
                  <span className="text-xs text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-xl font-bold">Customer Reviews</h2>
          <button onClick={() => setShowReviewForm(!showReviewForm)} className="btn-amazon text-sm">
            Write a Review
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-lg p-4 mb-6 animate-slide-down">
            <h3 className="font-bold mb-3">Write Your Review</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">Rating</label>
                <StarRating rating={reviewForm.rating} size={24} interactive onChange={(r) => setReviewForm({ ...reviewForm, rating: r })} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Title</label>
                <input type="text" value={reviewForm.title} onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value.slice(0, 120) })} placeholder="Summarize your review" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Review</label>
                <textarea value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value.slice(0, 1000) })} placeholder="What did you like or dislike?" rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>
              {reviewError && <p className="text-sm text-red-600">{reviewError}</p>}
              <div className="flex gap-2">
                <button type="submit" className="btn-amazon">Submit Review</button>
                <button type="button" onClick={() => setShowReviewForm(false)} className="px-4 py-1.5 text-sm text-gray-600 hover:underline">Cancel</button>
              </div>
            </div>
          </form>
        )}

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-amazon-light text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {review.userName[0]}
                  </div>
                  <span className="text-sm font-medium">{review.userName}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <StarRating rating={review.rating} size={14} />
                  <span className="text-sm font-bold">{review.title}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">Reviewed on {new Date(review.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-700">{review.comment}</p>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-amazon-blue mt-2">
                  <ThumbsUp size={12} /> Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm py-4">No reviews yet. Be the first to review this product!</p>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-xl font-bold mb-4">Customers Also Bought</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
