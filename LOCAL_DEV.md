import { useState, useEffect, useMemo } from 'react';
import { useStore } from '../store';
import { products, categories, heroSlides } from '../data';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { features } from '../weekConfig';

export default function HomePage() {
  const { searchQuery, selectedCategory, sortBy, priceRange, setSelectedCategory, setSortBy, setPriceRange, setSearchQuery } = useStore();
  const [heroIndex, setHeroIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Auto-rotate hero
  useEffect(() => {
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (!features.searchFiltering) return result;
    if (searchQuery) result = result.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategory !== 'All') result = result.filter((p) => p.category === selectedCategory);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: break;
    }
    return result;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSortBy('featured');
    setPriceRange([0, 2000]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || sortBy !== 'featured' || priceRange[0] > 0 || priceRange[1] < 2000 || searchQuery;

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: slide.bg }}
          >
            <div className="text-center text-white px-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg">{slide.title}</h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 opacity-90">{slide.subtitle}</p>
              <button className="btn-orange text-base sm:text-lg px-6 sm:px-10 py-2.5 sm:py-3 shadow-lg">{slide.cta}</button>
            </div>
          </div>
        ))}
        <button onClick={() => setHeroIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-1.5 sm:p-2 transition-colors">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button onClick={() => setHeroIndex((i) => (i + 1) % heroSlides.length)} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-1.5 sm:p-2 transition-colors">
          <ChevronRight size={24} className="text-white" />
        </button>
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === heroIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>

      {features.searchFiltering && (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 -mt-6 sm:-mt-10 relative z-10">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-medium shadow transition-all ${
                  selectedCategory === cat
                    ? 'bg-amazon text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {features.searchFiltering && (
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {searchQuery ? `Results for "${searchQuery}"` : selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <span className="text-sm text-gray-500">({filteredProducts.length} items)</span>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs text-amazon-blue hover:underline flex items-center gap-1">
                  <X size={12} /> Clear filters
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 text-sm bg-white px-3 py-2 rounded-lg shadow-sm hover:shadow transition-shadow border border-gray-200"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Avg. Rating</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>
        )}

        {/* Filters Panel */}
        {features.searchFiltering && showFilters && (
          <div className="bg-white rounded-lg shadow p-4 mb-4 animate-slide-down">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2">
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Min Price: ${priceRange[0]}</label>
                <input type="range" min={0} max={2000} value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])} className="w-full accent-amazon-orange" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Max Price: ${priceRange[1]}</label>
                <input type="range" min={0} max={2000} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} className="w-full accent-amazon-orange" />
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="btn-amazon">Clear All Filters</button>
          </div>
        )}

        {/* Recommendations Section */}
        {features.wishlist && (
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Recommended for You</h2>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2">
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="shrink-0 w-44 sm:w-52">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Deals Section */}
        {features.finalPolish && (
        <div className="mt-8 sm:mt-12 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">⚡ Today's Lightning Deals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {products.filter((p) => p.badge === 'Deal').map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
