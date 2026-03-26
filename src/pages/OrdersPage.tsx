import { Link } from 'react-router-dom';
import { Package, Truck, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store';

export default function OrdersPage() {
  const { orders, cancelOrder } = useStore();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (orders.length === 0) return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <p className="text-7xl mb-4">📦</p>
      <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
      <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
      <Link to="/" className="btn-amazon text-base px-8 py-3 inline-block">Start Shopping</Link>
    </div>
  );

  const statusColors = {
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-yellow-100 text-yellow-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const statusIcons = {
    processing: Package,
    shipped: Truck,
    delivered: Check,
    cancelled: X,
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status];
          const expanded = expandedOrder === order.id;

          return (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in-up">
              {/* Order Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <StatusIcon size={20} className="text-gray-600" />
                    <div>
                      <p className="font-bold text-sm">{order.id}</p>
                      <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="font-bold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Items Preview */}
              <div className="p-4">
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                  {order.items.map(({ product }) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="shrink-0">
                      <img src={product.image} alt={product.title} className="w-14 h-14 object-contain rounded border border-gray-100 p-1 hover:border-amazon-blue transition-colors" />
                    </Link>
                  ))}
                  <span className="text-sm text-gray-500 shrink-0">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                </div>

                {/* Tracking / Expand */}
                <button
                  onClick={() => setExpandedOrder(expanded ? null : order.id)}
                  className="flex items-center gap-1 text-sm text-amazon-blue hover:underline mt-3"
                >
                  {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  {expanded ? 'Hide details' : 'View details & tracking'}
                </button>

                {expanded && (
                  <div className="mt-4 animate-slide-down">
                    {/* Order Items */}
                    <div className="space-y-2 mb-4">
                      {order.items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                          <img src={product.image} alt="" className="w-12 h-12 object-contain" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.title}</p>
                            <p className="text-xs text-gray-500">Qty: {quantity} × ${product.price.toFixed(2)}</p>
                          </div>
                          <p className="font-bold text-sm">${(product.price * quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tracking Steps */}
                    {order.status !== 'cancelled' && (
                      <div className="mb-4">
                        <h4 className="text-sm font-bold mb-3">Order Tracking</h4>
                        <div className="relative">
                          {order.trackingSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-3 pb-4 last:pb-0">
                              <div className="relative flex flex-col items-center">
                                <div className={`w-4 h-4 rounded-full border-2 ${step.done ? 'bg-amazon-green border-amazon-green' : 'bg-white border-gray-300'}`}>
                                  {step.done && <Check size={10} className="text-white absolute top-0.5 left-0.5" />}
                                </div>
                                {i < order.trackingSteps.length - 1 && (
                                  <div className={`w-0.5 h-6 mt-0.5 ${step.done ? 'bg-amazon-green' : 'bg-gray-200'}`} />
                                )}
                              </div>
                              <div className="-mt-0.5">
                                <p className={`text-sm ${step.done ? 'font-medium' : 'text-gray-400'}`}>{step.label}</p>
                                {step.date && <p className="text-xs text-gray-500">{new Date(step.date).toLocaleDateString()}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Ship to */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm"><span className="font-medium">Shipped to:</span> {order.address || 'Address on file'}</p>
                    </div>

                    {/* Cancel */}
                    {order.status === 'processing' && (
                      <button type="button" onClick={() => void cancelOrder(order.id)} className="text-sm text-red-600 hover:underline flex items-center gap-1">
                        <X size={14} /> Cancel Order
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
