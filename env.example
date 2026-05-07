import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useStore } from '../store';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQty, getCartTotal, getCartCount, user } = useStore();
  const total = getCartTotal();
  const count = getCartCount();

  if (cart.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <p className="text-7xl mb-4">🛒</p>
      <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Looks like you haven't added anything yet</p>
      <Link to="/" className="btn-amazon text-base px-8 py-3 inline-block">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-3 sm:p-4 flex gap-3 sm:gap-4 animate-fade-in-up">
              <Link to={`/product/${product.id}`} className="shrink-0">
                <img src={product.image} alt={product.title} className="w-20 h-20 sm:w-28 sm:h-28 object-contain rounded" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`} className="text-sm sm:text-base font-medium hover:text-amazon-blue line-clamp-2">
                  {product.title}
                </Link>
                <p className="text-xs text-amazon-green font-medium mt-1">In Stock</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button onClick={() => updateCartQty(product.id, quantity - 1)} className="px-2 py-1 hover:bg-gray-100 transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium border-x border-gray-300 min-w-[40px] text-center">{quantity}</span>
                    <button onClick={() => updateCartQty(product.id, quantity + 1)} className="px-2 py-1 hover:bg-gray-100 transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="text-sm text-red-600 hover:underline flex items-center gap-1">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold">${(product.price * quantity).toFixed(2)}</p>
                <p className="text-xs text-gray-500">${product.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-32">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({count}):</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-amazon-green font-medium">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (est.):</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                <span>Order Total:</span>
                <span className="text-red-700">${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <Link to={user ? "/checkout" : "/auth"} className="btn-amazon w-full text-center py-3 mt-4 block text-base font-semibold">
              {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
            </Link>
            <Link to="/" className="block text-center text-sm text-amazon-blue hover:underline mt-3">
              Continue Shopping
            </Link>

            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
              <ShieldCheck size={16} className="text-amazon-green shrink-0" />
              <span>Secure checkout — your data is protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
