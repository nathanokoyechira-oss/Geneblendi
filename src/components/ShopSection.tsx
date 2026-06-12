import React, { useState, useMemo } from 'react';
import { Product } from '../data/products';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Search, RefreshCw, X, ArrowUpDown, ChevronDown } from 'lucide-react';

interface ShopSectionProps {
  products: Product[];
  onViewDetails: (id: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  wishlist: string[];
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
}

export default function ShopSection({
  products,
  onViewDetails,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}: ShopSectionProps) {
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState<string>('');

  // Static list of possible values
  const categories = ['All', 'Furniture', 'Decors', 'Interiors'];
  const sizes = ['Standard', 'Grande', 'Atelier', 'Custom', 'Suite', 'Studio'];
  
  const colors = [
    { name: 'Oatmeal', class: 'bg-[#F5F2EB] border border-stone-250', value: '#F5F2EB' },
    { name: 'Sable', class: 'bg-[#2B2B2A]', value: '#2B2B2A' },
    { name: 'Sage', class: 'bg-[#5C6656]', value: '#5C6656' },
    { name: 'Travertine', class: 'bg-[#ECE5D8] border border-stone-200', value: '#ECE5D8' },
    { name: 'Chalk', class: 'bg-[#FAFAFA] border border-stone-250', value: '#FAFAFA' },
    { name: 'Umber', class: 'bg-[#C06C4C]', value: '#C06C4C' }
  ];

  // Computation of filtered and sorted products
  const processedProducts = useMemo(() => {
    let list = [...products];

    // 1. Search Query filter (local)
    if (localSearch) {
      const s = localSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.tagline.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s)
      );
    }

    // 2. Category filter
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 3. Size filter
    if (selectedSize !== null) {
      list = list.filter((p) =>
        p.sizes.some((sz) => sz.toLowerCase().includes(selectedSize.toLowerCase()))
      );
    }

    // 4. Color filter
    if (selectedColor !== null) {
      list = list.filter((p) =>
        p.colors.some((colorObj) => colorObj.name.toLowerCase().includes(selectedColor.toLowerCase()))
      );
    }

    // 5. Price filter
    list = list.filter((p) => p.price <= maxPrice);

    // 6. Sorting operations
    if (sortOption === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'bestsellers') {
      list.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    }

    return list;
  }, [products, localSearch, selectedCategory, selectedSize, selectedColor, maxPrice, sortOption]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(2000);
    setSortOption('featured');
    setLocalSearch('');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSize !== null ||
    selectedColor !== null ||
    maxPrice < 2000 ||
    localSearch !== '';

  return (
    <div id="shop-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 bg-white text-black">
      
      {/* Header and banner of shop archivism */}
      <div className="border-b border-gray-200 pb-8 mb-10 text-center md:text-left font-serif">
        <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
          HELYN HILLS <span className="lowercase">interiors</span> ARCHIVES
        </p>
        <h1 className="text-4xl sm:text-5xl font-light text-black mt-1 leading-tight text-luxury">
          Heritage Collections
        </h1>
        <p className="text-xs text-gray-500 mt-2 font-light max-w-2xl leading-relaxed font-sans">
          Curated statement furniture, handcrafted organic decors, and artisanal interior lighting designed to bring warmth and timeless grace to residential galleries.
        </p>
      </div>

      {/* Main product catalog workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Lefthand side: Professional Filter Sidebar */}
        <aside className="lg:col-span-3 space-y-8 bg-white p-6 rounded-lg border border-gray-200 h-fit lg:sticky lg:top-24 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-150 pb-4">
            <div className="flex items-center space-x-2 text-black">
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-bold font-mono tracking-wider">FILTERS</span>
            </div>
            {hasActiveFilters && (
              <button
                maxLength={5}
                onClick={resetFilters}
                className="text-[9.5px] font-mono text-gray-500 hover:text-black flex items-center space-x-1 cursor-pointer hover:underline uppercase"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Filter block 1: Search inputs */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-gray-650 uppercase">
              SEARCH DIRECTORY
            </h4>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search archive keys..."
                className="w-full bg-white border border-gray-300 rounded-md text-xs pl-9 pr-4 py-2.5 text-black placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Filter block 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-gray-650 uppercase">
              CATEGORIES
            </h4>
            <div className="flex flex-col space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs text-left py-1.5 px-2.5 rounded transition-all flex justify-between items-center cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gray-100 text-[#D4AF37] font-semibold'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && (
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filter block 3: Sizes */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-gray-650 uppercase">
              ATELIER SCALE
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`border py-2 text-[10px] font-mono rounded tracking-widest transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'bg-black border-black text-white font-bold'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-black hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Filter block 4: Colors */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold font-mono tracking-widest text-gray-650 uppercase">
              MATERIAL FINISH
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((col) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(selectedColor === col.name ? null : col.name)}
                  className={`relative p-0.5 rounded-full ring-2 transition-all cursor-pointer ${
                    selectedColor === col.name ? 'ring-[#D4AF37] ring-offset-2 ring-offset-white' : 'ring-transparent'
                  }`}
                  title={col.name}
                >
                  <span className={`block w-6 h-6 rounded-full ${col.class}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Filter block 5: Price boundary sliders */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold font-mono tracking-widest text-gray-650 uppercase">
                MAX PRICE
              </h4>
              <span className="text-xs font-mono text-[#D4AF37] font-semibold">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37] focus:outline-none"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-500">
              <span>$100</span>
              <span>$2000</span>
            </div>
          </div>
        </aside>

        {/* Righthand side: Sorters and interactive items catalog */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top-Bar Sorting and reports count */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-gray-50 p-4 border border-gray-200 rounded-lg">
            <div className="text-xs font-mono text-gray-600">
              Showing <span className="text-black font-bold">{processedProducts.length}</span> of{' '}
              <span className="text-gray-500">{products.length}</span> bespoke interior releases
            </div>

            {/* Sorting trigger dropdown */}
            <div className="flex items-center space-x-3 shrink-0 relative">
              <span id="sort-label" className="text-xs text-gray-500 font-mono flex items-center space-x-1 uppercase font-semibold">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                <span>Sort Selection</span>
              </span>

              <div className="relative">
                {/* Dropdown Button */}
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="bg-white border border-gray-300 text-xs font-mono text-black rounded px-3 py-2 flex items-center space-x-2 focus:outline-none focus:border-[#D4AF37] cursor-pointer min-w-[170px] justify-between transition-colors hover:border-[#D4AF37]"
                >
                  <span>
                    {sortOption === 'featured' && 'Vault Curations'}
                    {sortOption === 'bestsellers' && 'Demand Levels'}
                    {sortOption === 'price-low' && 'Price: Low to High'}
                    {sortOption === 'price-high' && 'Price: High to Low'}
                    {sortOption === 'rating' && 'Accredited Ratings'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${isSortOpen ? 'rotate-180 text-[#D4AF37]' : ''}`}
                  />
                </button>

                {/* Dropdown Menu Items */}
                {isSortOpen && (
                  <div className="absolute right-0 mt-1 w-[200px] bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-30 animate-fade-in divide-y divide-gray-50">
                    {[
                      { value: 'featured', label: 'Vault Curations' },
                      { value: 'bestsellers', label: 'Demand Levels' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Accredited Ratings' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSortOption(opt.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-mono transition-all duration-200 cursor-pointer hover:bg-[#D4AF37]/5 flex justify-between items-center ${
                          sortOption === opt.value
                            ? 'text-[#D4AF37] font-semibold bg-[#D4AF37]/5'
                            : 'text-gray-800'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {sortOption === opt.value && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active filters pill display bar for clean UX dismissal */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-2.5 rounded border border-gray-150">
              <span className="text-[10px] font-mono tracking-widest text-gray-500 font-bold uppercase mr-1">
                Active Parameters:
              </span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white text-[10px] font-mono text-gray-700 rounded-full border border-gray-200 shadow-sm">
                  <span>Cat: {selectedCategory}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-black cursor-pointer" onClick={() => setSelectedCategory('All')} />
                </span>
              )}
              {selectedSize !== null && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white text-[10px] font-mono text-gray-700 rounded-full border border-gray-200 shadow-sm">
                  <span>Scale: {selectedSize}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-black cursor-pointer" onClick={() => setSelectedSize(null)} />
                </span>
              )}
              {selectedColor !== null && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white text-[10px] font-mono text-gray-700 rounded-full border border-gray-200 shadow-sm">
                  <span>Color: {selectedColor}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-black cursor-pointer" onClick={() => setSelectedColor(null)} />
                </span>
              )}
              {maxPrice < 500 && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white text-[10px] font-mono text-gray-700 rounded-full border border-gray-200 shadow-sm">
                  <span>Max: ${maxPrice}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-black cursor-pointer" onClick={() => setMaxPrice(500)} />
                </span>
              )}
              {localSearch && (
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white text-[10px] font-mono text-gray-700 rounded-full border border-gray-200 shadow-sm">
                  <span>Search: "{localSearch}"</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-black cursor-pointer" onClick={() => setLocalSearch('')} />
                </span>
              )}
            </div>
          )}

          {/* Product Cards Workspace */}
          {processedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedProducts.map((p) => (
                <ProductCard
                   key={p.id}
                  product={p}
                  onViewDetails={onViewDetails}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          ) : (
            /* Zero Matching State Screen */
            <div className="text-center py-24 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
              <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center mx-auto text-gray-400 shadow-sm">
                <SlidersHorizontal className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-serif text-black">No Matching Archives Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                We currently do not offer shoe editions matching that precise combination of sizing, category models, and price configurations.
              </p>
              <button
                onClick={resetFilters}
                className="bg-black text-white font-mono text-[10px] py-2.5 px-6 rounded hover:bg-[#D4AF37] transition-colors uppercase font-bold cursor-pointer animate-fade-in"
              >
                Clear Sourcing Filters
              </button>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
