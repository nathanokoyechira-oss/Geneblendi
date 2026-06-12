import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight, Star } from 'lucide-react';
import { Product } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeRoute: string;
  onNavigate: (route: string, productId?: string) => void;
  cartCount: number;
  wishlistCount: number;
  products: Product[];
  onSearchSelect: (product: Product) => void;
  isLoggedIn: boolean;
  userEmail: string;
}

export default function Header({
  activeRoute,
  onNavigate,
  cartCount,
  wishlistCount,
  products,
  onSearchSelect,
  isLoggedIn,
  userEmail,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = searchVal
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.category.toLowerCase().includes(searchVal.toLowerCase())
      )
    : [];

  const handleSearchItemClick = (product: Product) => {
    onSearchSelect(product);
    setSearchVal('');
    setIsSearchOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-white/95 border-gray-100 py-3 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Mobile Menu Icon */}
        <div className="flex md:hidden">
          <button
            id="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-zinc-650 hover:text-black transition-all duration-300 p-1 flex items-center justify-center cursor-pointer"
            style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#D4AF37]" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Brand Logo */}
        <div
          id="brand-logo"
          onClick={() => onNavigate('home')}
          className="cursor-pointer tracking-[0.25em] text-center"
        >
          <span className="text-luxury font-serif text-2xl font-light text-black uppercase block leading-none">
            GENE BENDI
          </span>
          <span className="text-[7.5px] uppercase font-mono tracking-[0.55em] text-zinc-400 block mt-1 hover:text-[#D4AF37] transition-colors">
            LAGOS &bull; TOKYO
          </span>
        </div>

        {/* Navigation - Desktop */}
        <nav id="desktop-navbar" className="hidden md:flex items-center space-x-8">
          {[
            { id: 'home', label: 'HOME' },
            { id: 'shop', label: 'SHOP' },
            { id: 'about', label: 'THE MAISON' },
            { id: 'contact', label: 'CONTACT' },
            { id: 'faq', label: 'FAQ' },
            { id: 'owner-portal', label: 'OWNER PORTAL' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-xs tracking-[0.2em] uppercase font-medium relative py-1 transition-all duration-300 hover:text-[#D4AF37] ${
                activeRoute === item.id 
                  ? 'text-[#D4AF37] font-semibold' 
                  : item.id === 'owner-portal' 
                    ? 'text-[#D4AF37]/90 hover:text-black font-bold bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/25' 
                    : 'text-gray-800'
              }`}
            >
              {item.label}
              {activeRoute === item.id && item.id !== 'owner-portal' && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37]" />
              )}
            </button>
          ))}
        </nav>

        {/* Header Actions */}
        <div id="header-actions" className="flex items-center space-x-6">
          {/* Real-time search button */}
          <div className="relative">
            <button
              id="search-toggle-btn"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setTimeout(() => {
                  if (!isSearchOpen && searchInputRef.current) {
                    searchInputRef.current.focus();
                  }
                }, 100);
              }}
              className="text-gray-800 hover:text-[#D4AF37] transition-colors p-1"
              aria-label="Search items"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Dropdown Search Pane */}
            {isSearchOpen && (
              <div
                id="search-pane"
                className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-gray-150 rounded-lg shadow-xl p-4 z-50 animate-fade-in animate-fade-in"
              >
                <div className="flex items-center space-x-2 border-b border-gray-150 pb-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Search Gene Bendi archives..."
                    className="w-full bg-transparent border-none text-sm text-black placeholder-gray-400 focus:outline-none"
                  />
                  <button onClick={() => setIsSearchOpen(false)}>
                    <X className="w-4 h-4 text-gray-400 hover:text-black" />
                  </button>
                </div>

                {/* Live Output */}
                {searchVal && (
                  <div className="mt-3 max-h-60 overflow-y-auto space-y-2 pr-1">
                    <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                      Suggested Results ({filteredProducts.length})
                    </p>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSearchItemClick(p)}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover bg-gray-50 rounded border border-gray-200"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-black truncate">
                              {p.name}
                            </h4>
                            <p className="text-[10px] text-gray-500 tracking-wider">
                              {p.category}
                            </p>
                          </div>
                          <span className="text-xs font-mono text-[#D4AF37] font-medium">
                            ${p.price}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-650 py-2">
                        No custom models fit selection "{searchVal}"
                      </p>
                    )}
                  </div>
                )}
                
                {/* Visual recommendations when empty */}
                {!searchVal && (
                  <div className="mt-3">
                    <p className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-2">
                      Popular Direct Selections
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {products.slice(0, 4).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSearchItemClick(p)}
                          className="text-left text-[11px] p-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors text-gray-700 truncate"
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Account Button */}
          <button
            id="account-btn"
            onClick={() => onNavigate('account')}
            className={`transition-colors relative p-1 ${
              activeRoute === 'account' ? 'text-[#D4AF37]' : 'text-gray-800 hover:text-[#D4AF37]'
            }`}
            title="My Account"
          >
            <User className="w-5 h-5 stroke-[1.5]" />
            {isLoggedIn && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Wishlist Icon */}
          <button
            id="wishlist-btn"
            onClick={() => onNavigate('account')}
            className="text-gray-800 hover:text-[#D4AF37] transition-colors relative p-1"
            title="My Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white font-mono text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Icon */}
          <button
            id="cart-btn"
            onClick={() => onNavigate('cart')}
            className={`transition-colors relative p-1 ${
              activeRoute === 'cart' ? 'text-[#D4AF37]' : 'text-gray-800 hover:text-[#D4AF37]'
            }`}
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white font-mono text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* slide-down Mobile Menu Dropdown Bar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl overflow-hidden z-40"
          >
            <div className="px-6 py-8 flex flex-col space-y-6 text-black">
              <nav className="flex flex-col space-y-4">
                {[
                  { id: 'home', label: 'Home Page' },
                  { id: 'shop', label: 'E-Store Collection' },
                  { id: 'about', label: 'The Gene Bendi Maison' },
                  { id: 'contact', label: 'Concierge Support' },
                  { id: 'faq', label: 'FAQ & Shipping' },
                  { id: 'owner-portal', label: 'Atelier Owner Portal' },
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-sm tracking-widest hover:text-[#D4AF37] uppercase font-mono py-2 border-b border-gray-100 last:border-0 transition-colors flex justify-between items-center cursor-pointer ${
                      activeRoute === link.id ? 'text-[#D4AF37] font-bold' : 'text-gray-850'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] text-zinc-400">&rarr;</span>
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-gray-150 text-center space-y-3">
                {isLoggedIn ? (
                  <p className="text-xs text-gray-550">
                    Logged in as <span className="text-[#D4AF37] font-mono">{userEmail}</span>
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      onNavigate('account');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-black hover:bg-[#D4AF37] text-white text-xs py-3 rounded tracking-widest transition-all font-mono uppercase cursor-pointer"
                  >
                    ACCESS VIP PORTAL
                  </button>
                )}
                <p className="text-[9px] text-zinc-400 font-mono tracking-widest">
                  COMPLIMENTARY DELIVERY WORLDWIDE
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
