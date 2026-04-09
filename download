import { useState } from 'react';
import { BarChart3, Package, Users, DollarSign, TrendingUp, ShoppingCart, Eye, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useStore } from '../store';
import { products, categories } from '../data';

export default function AdminPage() {
  const { orders, reviews } = useStore();
  const [activeTab, setActiveTab] = useState('overview');

  const totalRevenue = orders.reduce((sum, o) => o.status !== 'cancelled' ? sum + o.total : sum, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, change: '+12.5%', up: true, color: 'bg-green-50 text-green-600' },
    { icon: ShoppingCart, label: 'Total Orders', value: totalOrders.toString(), change: '+8.2%', up: true, color: 'bg-blue-50 text-blue-600' },
    { icon: Package, label: 'Products', value: products.length.toString(), change: '+3', up: true, color: 'bg-purple-50 text-purple-600' },
    { icon: Users, label: 'Avg Order Value', value: `$${avgOrderValue.toFixed(2)}`, change: '-2.1%', up: false, color: 'bg-orange-50 text-orange-600' },
  ];

  const tabs = ['overview', 'products', 'orders', 'analytics'];

  const categorySales = categories.filter(c => c !== 'All').map((cat) => ({
    name: cat,
    count: products.filter((p) => p.category === cat).length,
    revenue: orders.reduce((sum, o) => sum + o.items.filter((i) => i.product.category === cat).reduce((s, i) => s + i.product.price * i.quantity, 0), 0),
  }));

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, here's your store overview</p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-lg shadow-sm">
          <TrendingUp size={16} className="text-amazon-green" />
          <span>Store is performing well</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map(({ icon: Icon, label, value, change, up, color }) => (
          <div key={label} className="bg-white rounded-lg shadow-sm p-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${up ? 'text-green-600' : 'text-red-500'}`}>
                {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {change}
              </span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-lg shadow-sm p-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors whitespace-nowrap ${
              activeTab === tab ? 'bg-amazon text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 animate-fade-in-up">
          {/* Category Performance */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BarChart3 size={20} /> Category Performance
            </h2>
            <div className="space-y-3">
              {categorySales.map(({ name, count, revenue }) => (
                <div key={name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{name}</span>
                    <span className="text-gray-500">{count} products • ${revenue.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-amazon-orange rounded-full h-2 transition-all duration-500"
                      style={{ width: `${Math.max((count / products.length) * 100, 5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
            {orders.length > 0 ? (
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">${order.total.toFixed(2)}</p>
                      <p className={`text-xs capitalize ${order.status === 'delivered' ? 'text-green-600' : order.status === 'cancelled' ? 'text-red-500' : 'text-blue-600'}`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No orders yet</p>
            )}
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Star size={20} className="text-amazon-star" /> Recent Reviews
            </h2>
            {reviews.length > 0 ? (
              <div className="space-y-3">
                {reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{review.userName}</span>
                      <span className="text-xs text-amazon-star">{'★'.repeat(review.rating)}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No reviews yet</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Total Reviews', value: reviews.length, icon: Star },
                { label: 'Active Products', value: products.length, icon: Package },
                { label: 'Categories', value: categories.length - 1, icon: BarChart3 },
                { label: 'Avg Rating', value: '4.5', icon: Eye },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3 text-center">
                  <Icon size={20} className="text-amazon-blue mx-auto mb-1" />
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in-up">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Category</th>
                  <th className="text-right px-4 py-3 font-semibold">Price</th>
                  <th className="text-right px-4 py-3 font-semibold hidden md:table-cell">Stock</th>
                  <th className="text-right px-4 py-3 font-semibold hidden md:table-cell">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" className="w-10 h-10 object-contain rounded" />
                        <span className="font-medium truncate max-w-[200px]">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{product.category}</td>
                    <td className="px-4 py-3 text-right font-medium">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <span className={product.stock < 20 ? 'text-red-600 font-medium' : ''}>{product.stock}</span>
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <span className="text-amazon-star">★</span> {product.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in-up">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Order ID</th>
                    <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Date</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                    <th className="text-right px-4 py-3 font-semibold">Items</th>
                    <th className="text-right px-4 py-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          order.status === 'shipped' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>{order.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right">{order.items.length}</td>
                      <td className="px-4 py-3 text-right font-bold">${order.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm p-8 text-center">No orders to display</p>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 animate-fade-in-up">
          {/* Sales Chart (Visual) */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 col-span-full">
            <h2 className="text-lg font-bold mb-4">Sales Trend (Last 7 Days)</h2>
            <div className="flex items-end gap-2 h-40">
              {[65, 40, 80, 55, 90, 70, 95].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-amazon-orange/20 rounded-t relative" style={{ height: `${height}%` }}>
                    <div className="absolute inset-0 bg-amazon-orange rounded-t animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }} />
                  </div>
                  <span className="text-xs text-gray-500">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-4">Top Rated Products</h2>
            <div className="space-y-3">
              {[...products].sort((a, b) => b.rating - a.rating).slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-300 w-6">#{i + 1}</span>
                  <img src={p.image} alt="" className="w-10 h-10 object-contain rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.title}</p>
                    <p className="text-xs text-amazon-star">{'★'.repeat(Math.round(p.rating))} {p.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Sellers */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-4">Most Reviewed</h2>
            <div className="space-y-3">
              {[...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-300 w-6">#{i + 1}</span>
                  <img src={p.image} alt="" className="w-10 h-10 object-contain rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.title}</p>
                    <p className="text-xs text-gray-500">{p.reviewCount.toLocaleString()} reviews</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
