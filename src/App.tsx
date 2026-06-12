import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import ShopSection from './components/ShopSection';
import ProductDetailsSection from './components/ProductDetailsSection';
import {
  AboutView,
  ContactView,
  FaqView,
  AccountView,
  CheckoutView
} from './components/AuxiliarySections';
import { PRODUCTS, Product } from './data/products';
import OwnerPortalSection from './components/OwnerPortalSection';
import { ShoppingBag, ChevronRight, Lock, CheckCircle, Truck, MapPin, Sparkles, X, RotateCcw } from 'lucide-react';

interface CartItem {
  id: string; // unique cart entry key (product.id + selectedSize + selectedColor)
  product: Product;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

interface OrderHistoryEntry {
  id: string;
  date: string;
  items: CartItem[];
  totalPrice: number;
  status: string;
  shippingDetails: any;
}

export default function App() {
  // Virtual routing state
  const [activeRoute, setActiveRoute] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Cart & Wishlist states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Authentication session
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  // Discount Codes manager state
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponSuccess, setCouponSuccess] = useState<boolean | string>(false);

  // Pre-seed 1 past flight order tracker so users have dynamic content to track immediately
  const [orderHistory, setOrderHistory] = useState<OrderHistoryEntry[]>([
    {
      id: 'GB-2026-N92F',
      date: '2026-06-11',
      items: [
        {
          id: 'gb-05-9-Raven Black Leather',
          product: PRODUCTS[4], // Chelsea Sovereign Boot
          selectedSize: 9,
          selectedColor: 'Raven Black Leather',
          quantity: 1
        }
      ],
      totalPrice: 420,
      status: 'COUR FLIGHT TRANSIT LAGOS &bull; IN FLIGHT',
      shippingDetails: {
        name: 'VIP Collector Nathan',
        address: '100 Rodeo Drive Apt 3C',
        city: 'Beverly Hills',
        zip: '90210',
        country: 'United States',
        phone: '+1 (555) 018-2030'
      }
    }
  ]);

  // Order just completed storage holds
  const [latestPlacedOrder, setLatestPlacedOrder] = useState<OrderHistoryEntry | null>(null);

  // Hydrate states from localStorage on startup (silent resilience)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gb_cart_item');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWish = localStorage.getItem('gb_wish_vault');
      if (savedWish) setWishlist(JSON.parse(savedWish));

      const savedUser = localStorage.getItem('gb_vip_email');
      if (savedUser) {
        setIsLoggedIn(true);
        setUserEmail(savedUser);
      }

      const savedOrders = localStorage.getItem('gb_order_history');
      if (savedOrders) setOrderHistory(JSON.parse(savedOrders));
    } catch (e) {
      console.warn('LocalStorage hydration skipped', e);
    }
  }, []);

  // Sync state modifications onto local persistence
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('gb_cart_item', JSON.stringify(newCart));
  };

  const updateWishState = (newWish: string[]) => {
    setWishlist(newWish);
    localStorage.setItem('gb_wish_vault', JSON.stringify(newWish));
  };

  const updateOrderHistoryState = (newHistory: OrderHistoryEntry[]) => {
    setOrderHistory(newHistory);
    localStorage.setItem('gb_order_history', JSON.stringify(newHistory));
  };

  // Safe router navigation mapping
  const navigateTo = (route: string, productId?: string) => {
    setActiveRoute(route);
    if (productId) {
      setSelectedProductId(productId);
    } else {
      setSelectedProductId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add items cart handler
  const handleAddToCart = (product: Product, size: number, color: string) => {
    const entryId = `${product.id}-${size}-${color}`;
    const newCart = [...cart];
    const existingIndex = newCart.findIndex((item) => item.id === entryId);

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += 1;
    } else {
      newCart.push({
        id: entryId,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: 1,
      });
    }
    updateCartState(newCart);
    navigateTo('cart');
  };

  // Wishlist handler toggle
  const handleToggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let newWish = [...wishlist];
    if (newWish.includes(id)) {
      newWish = newWish.filter((item) => item !== id);
    } else {
      newWish.push(id);
    }
    updateWishState(newWish);
  };

  // Remove from VIP wishlist
  const handleRemoveWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newWish = wishlist.filter((item) => item !== id);
    updateWishState(newWish);
  };

  // Cart quantity controls
  const handleIncrementQty = (entryId: string) => {
    const newCart = cart.map((item) => {
      if (item.id === entryId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCartState(newCart);
  };

  const handleDecrementQty = (entryId: string) => {
    const newCart = cart
      .map((item) => {
        if (item.id === entryId) {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    updateCartState(newCart);
  };

  const handleRemoveCartItem = (entryId: string) => {
    const newCart = cart.filter((item) => item.id !== entryId);
    updateCartState(newCart);
  };

  // Apply Coupon code
  const handleApplyCoupon = (code: string) => {
    const c = code.toUpperCase().trim();
    if (c === 'GOLD20' || c === 'BLENDI20' || c === 'EXCELLENCE15') {
      setCouponCode(c);
      setCouponSuccess(true);
    } else {
      setCouponSuccess('INVALID CODE ENTRY');
    }
  };

  // Simulated login parameters
  const handleLoginState = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('gb_vip_email', email);
  };

  const handleLogoutState = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('gb_vip_email');
  };

  // Checkout purchase order simulation
  const handleOrderPlace = (shippingDetails: any) => {
    const orderId = `GB-2026-X${Math.floor(100 + Math.random() * 899)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    
    // Math computations
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountRate = couponSuccess ? (couponCode === 'BLENDI20' ? 0.2 : 0.15) : 0;
    const discountTotal = subtotal * discountRate;
    const estimatedVat = (subtotal - discountTotal) * 0.1;

    const newOrder: OrderHistoryEntry = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      totalPrice: Math.round((subtotal - discountTotal + estimatedVat) * 100) / 100,
      status: 'CRAFTING SPECIALIST ASSIGNMENT &bull; VERMED',
      shippingDetails,
    };

    const updatedHistory = [newOrder, ...orderHistory];
    updateOrderHistoryState(updatedHistory);
    setLatestPlacedOrder(newOrder);
    
    // Reset Cart
    updateCartState([]);
    setCouponCode('');
    setCouponSuccess(false);

    // Route to confirmation screen
    navigateTo('order-confirmation');
  };

  // Search Suggestor link trigger
  const handleSearchSelect = (product: Product) => {
    navigateTo('product-details', product.id);
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: string) => {
    const updated = orderHistory.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: nextStatus };
      }
      return order;
    });
    updateOrderHistoryState(updated);
  };

  const handleSimulateOrder = () => {
    const names = ['Amina Alabi', 'Emeka Kalu', 'Yusuf Ibrahim', 'Chioma Nwachukwu', 'Tunde Cole'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const randomSize = randomProduct.sizes[Math.floor(Math.random() * randomProduct.sizes.length)];
    const randomColor = randomProduct.colors[Math.floor(Math.random() * randomProduct.colors.length)].name;
    const orderId = `GB-2026-X${Math.floor(100 + Math.random() * 899)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    
    const simulatedItem = {
      id: `${randomProduct.id}-${randomSize}-${randomColor}`,
      product: randomProduct,
      selectedSize: randomSize,
      selectedColor: randomColor,
      quantity: 1
    };

    const vat = randomProduct.price * 0.1;
    const total = randomProduct.price + vat;

    const newOrder: OrderHistoryEntry = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: [simulatedItem],
      totalPrice: Math.round(total * 100) / 100,
      status: 'CRAFTING SPECIALIST ASSIGNMENT &bull; VERMED',
      shippingDetails: {
        name: randomName,
        address: `${Math.floor(10 + Math.random() * 90)}, Cooper Road, Ground level`,
        city: 'Ikoyi, Lagos',
        zip: '101233',
        country: 'Nigeria',
        phone: `+234 (1) ${Math.floor(7000000 + Math.random() * 2999999)}`
      }
    };

    const updated = [newOrder, ...orderHistory];
    updateOrderHistoryState(updated);
  };

  // Calculate shopping cart summary values
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountRate = couponSuccess ? (couponCode === 'BLENDI20' ? 0.2 : 0.15) : 0;
  const cartDiscount = cartSubtotal * discountRate;
  const cartVat = (cartSubtotal - cartDiscount) * 0.1;
  const cartGrandTotal = cartSubtotal - cartDiscount + cartVat;

  const activeProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  return (
    <div id="gene-blendi-root" className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-gold-350 selection:text-white">
      
      {/* 1. Header Navigation Bar */}
      <Header
        activeRoute={activeRoute}
        onNavigate={navigateTo}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        products={PRODUCTS}
        onSearchSelect={handleSearchSelect}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
      />

      {/* 2. Primary Virtual Routing Engine Mount Panels */}
      <main className="flex-grow">
        {activeRoute === 'home' && (
          <HomeSection
            products={PRODUCTS}
            onNavigate={navigateTo}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeRoute === 'shop' && (
          <ShopSection
            products={PRODUCTS}
            onViewDetails={(id) => navigateTo('product-details', id)}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeRoute === 'product-details' && (
          <ProductDetailsSection
            product={activeProduct}
            onBackToShop={() => navigateTo('shop')}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            allProducts={PRODUCTS}
            onSelectProduct={(id) => navigateTo('product-details', id)}
          />
        )}

        {activeRoute === 'about' && <AboutView />}

        {activeRoute === 'contact' && <ContactView userEmail={userEmail} />}

        {activeRoute === 'faq' && <FaqView />}

        {activeRoute === 'account' && (
          <AccountView
            isLoggedIn={isLoggedIn}
            userEmail={userEmail}
            onLoginState={handleLoginState}
            onLogoutState={handleLogoutState}
            products={PRODUCTS}
            wishlist={wishlist}
            onRemoveWishlist={handleRemoveWishlist}
            onAddToCart={handleAddToCart}
            orderHistory={orderHistory}
          />
        )}

        {activeRoute === 'owner-portal' && (
          <OwnerPortalSection
            orderHistory={orderHistory}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSimulateOrder={handleSimulateOrder}
            onNavigate={navigateTo}
            products={PRODUCTS}
          />
        )}

        {/* 3. Dedicated Cart Panel View */}
        {activeRoute === 'cart' && (
          <div id="shopping-cart-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 bg-white text-black">
            <h1 className="text-3xl font-serif text-black tracking-wide border-b border-gray-100 pb-6 mb-10 text-luxury">
              Shopping Portfolio Bag
            </h1>

            {cart.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-in">
                
                {/* Cart list elements */}
                <div className="lg:col-span-8 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-lg gap-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover bg-gray-100 rounded border border-gray-200"
                        />
                        <div>
                          <span className="text-[9px] font-mono text-gold-600 uppercase tracking-widest">{item.product.category}</span>
                          <h4 className="text-sm font-semibold text-gray-900">{item.product.name}</h4>
                          <p className="text-xs text-gray-500 font-mono mt-0.5">SIZE: US {item.selectedSize} &bull; TONE: {item.selectedColor}</p>
                          <span className="text-xs font-mono text-gray-700 block sm:hidden mt-1">${item.product.price}</span>
                        </div>
                      </div>

                      {/* Quantity alter controls */}
                      <div className="flex items-center justify-between sm:justify-start gap-6 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                        <div className="flex items-center space-x-3 bg-white p-1.5 rounded border border-gray-200">
                          <button
                            onClick={() => handleDecrementQty(item.id)}
                            className="w-6 h-6 flex items-center justify-center text-gray-450 hover:text-black transition-colors"
                            title="Decrement quantity"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono text-black font-semibold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrementQty(item.id)}
                            className="w-6 h-6 flex items-center justify-center text-gray-450 hover:text-black transition-colors"
                            title="Increment quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="hidden sm:block text-right font-mono min-w-20">
                          <span className="text-xs font-semibold text-gray-900">${item.product.price * item.quantity}</span>
                        </div>

                        <button
                          onClick={() => handleRemoveCartItem(item.id)}
                          className="text-gray-400 hover:text-red-500 text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer font-bold"
                          title="Erase item"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals & Sorters */}
                <div className="lg:col-span-4 bg-[#F9F9F9] p-6 rounded-lg border border-gray-100 h-fit space-y-6">
                  <h3 className="text-xs font-bold font-mono tracking-widest text-gray-800 uppercase border-b border-gray-200 pb-2">
                    SUMMARY RECEIPT
                  </h3>

                  {/* Promo coupon inputs inner */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-wider text-gray-500 block uppercase">
                      ENTER MEMBERSHIP PRIVILEGE PROMO CODE
                    </span>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="VIP Privilege coupon (e.g. EXCELLENCE15)"
                        className="flex-grow bg-white border border-gray-200 rounded px-2.5 py-1.5 text-xs uppercase focus:outline-none focus:border-gold-400 font-mono tracking-widest text-black"
                        onChange={(e) => setCouponCode(e.target.value)}
                        value={couponCode}
                      />
                      <button
                        onClick={() => handleApplyCoupon(couponCode)}
                        className="bg-black text-white text-xs font-mono px-3 py-1.5 rounded hover:bg-[#D4AF37] transition-all cursor-pointer"
                      >
                        VALIDATE
                      </button>
                    </div>

                    {couponSuccess === true && (
                      <p className="text-[10.5px] font-mono text-[#D4AF37] text-center uppercase tracking-widest mt-1">
                        &bull; Privilege valid. Deducted beautifully.
                      </p>
                    )}
                    {typeof couponSuccess === 'string' && (
                      <p className="text-[10.5px] font-mono text-red-600 text-center uppercase tracking-widest mt-1">
                        &bull; {couponSuccess}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-xs font-mono text-gray-650 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span>PORTFOLIO VALUE</span>
                      <span className="text-gray-900">${cartSubtotal}</span>
                    </div>
                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-[#D4AF37]">
                        <span>VIP REWARD DEDUCTION</span>
                        <span>-${cartDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>VAT TAX VALUE (10%)</span>
                      <span className="text-gray-900">${cartVat.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>EXPRESS COURIER</span>
                      <span className="text-[#D4AF37] font-bold uppercase tracking-widest">COMPLIMENTARY</span>
                    </div>
                    
                    <div className="flex justify-between pt-4 border-t border-gray-200 text-sm font-serif font-bold text-black border-dashed">
                      <span className="text-xs font-mono tracking-widest uppercase">ESTIMATED LEDGER</span>
                      <span className="text-[#D4AF37] font-mono text-base font-bold">${cartGrandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('checkout')}
                    className="w-full bg-black text-white font-mono font-bold text-xs py-4 rounded tracking-widest hover:bg-[#D4AF37] transition-colors uppercase cursor-pointer"
                  >
                    PROCEED TO SECURE CHECKOUT
                  </button>

                  <p className="text-[9.5px] text-gray-500 font-mono text-center leading-normal">
                    Free global logistics, fully pre-cleared custom charges. Easy drops returns inside 30 cycles.
                  </p>
                </div>

              </div>
            ) : (
              <div className="text-center py-24 bg-[#F9F9F9] rounded-xl border border-gray-150 space-y-4 max-w-md mx-auto">
                <ShoppingBag className="w-10 h-10 text-gray-400 mx-auto" />
                <h3 className="text-lg font-serif text-black">Your boutique bag is currently empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                  We invite you to discover our curated 2026 calfskin sneakers and architectural hikers.
                </p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="bg-black text-white font-mono text-[10px] font-bold py-3 px-8 rounded hover:bg-[#D4AF37] transition-colors uppercase tracking-widest"
                >
                  DISCOVER THE ARCHIVES
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. Checkout Section view link */}
        {activeRoute === 'checkout' && (
          <CheckoutView
            cart={cart}
            onOrderPlace={handleOrderPlace}
            couponCode={couponCode}
            onApplyCoupon={handleApplyCoupon}
            couponSuccess={couponSuccess}
          />
        )}

        {/* 5. Custom Order Confirmation screen */}
        {activeRoute === 'order-confirmation' && latestPlacedOrder && (
          <div id="order-confirmation-page" className="max-w-3xl mx-auto px-4 py-28 bg-white text-black space-y-10 text-center">
            
            {/* success title */}
            <div className="space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-gray-50 border border-gray-205 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold">TRANSMISSION COMPLETED SECURELY</p>
              <h1 className="text-4xl font-serif text-black uppercase tracking-wider text-luxury">Aesthetic Order Secured</h1>
              <p className="text-xs text-gray-600 max-w-lg mx-auto leading-relaxed font-light">
                Thank you. Your request is fully lodged in our Lagos workshops under priority verification code{' '}
                <span className="text-[#D4AF37] font-mono font-bold">{latestPlacedOrder.id}</span>. Slices of raw leather are now being mapped for your size metrics.
              </p>
            </div>

            {/* order card tracker overview */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left space-y-4">
              <h3 className="text-xs font-bold font-mono tracking-widest text-gray-800 uppercase border-b border-gray-200 pb-2 flex items-center justify-between">
                <span>01 / ORDER SUMMARY METRICS</span>
                <span className="text-gray-550 font-normal">{latestPlacedOrder.date}</span>
              </h3>

              <div className="space-y-2 text-xs">
                {latestPlacedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between font-mono text-gray-700">
                    <span>{it.product.name} (US {it.selectedSize} &bull; {it.selectedColor}) x{it.quantity}</span>
                    <span className="text-[#D4AF37]">${it.product.price}</span>
                  </div>
                ))}
                
                <div className="flex justify-between pt-3 border-t border-gray-200 text-sm font-semibold font-mono text-black border-dashed">
                  <span>AUDITED DEBIT VALUE</span>
                  <span className="text-[#D4AF37] font-bold">${latestPlacedOrder.totalPrice}</span>
                </div>
              </div>

              {/* Courier tracking visual status timelines */}
              <div className="border border-gray-250 border-gray-200 p-4 rounded bg-white space-y-3">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  Live Flight Courier Status Tracking
                </p>
                <div className="flex items-center space-x-2.5 text-xs text-gray-850">
                  <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="font-mono text-[11px] font-bold text-[#D4AF37] uppercase">
                    Stage 1/4: Verified & Specialist Artisan Sourcing Assigned
                  </span>
                </div>
                
                {/* timeline step dots helper */}
                <div className="relative pt-1.5 pb-1">
                  <div className="absolute left-0 top-3.5 w-full h-[2px] bg-gray-100" />
                  <div className="absolute left-0 top-3.5 w-[5%] h-[2px] bg-[#D4AF37] animate-pulse" />
                  <div className="flex justify-between relative">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] ring-4 ring-gold-200" />
                    <span className="w-3.5 h-3.5 rounded-full bg-white border border-gray-300" />
                    <span className="w-3.5 h-3.5 rounded-full bg-white border border-gray-300" />
                    <span className="w-3.5 h-3.5 rounded-full bg-white border border-gray-300" />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-gray-500 uppercase mt-1 pl-1">
                    <span>Atelier (Lagos)</span>
                    <span>Air Cargo</span>
                    <span>Flight Hub</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo('shop')}
                className="bg-black text-white font-mono text-[10px] py-3.5 px-8 rounded tracking-widest hover:bg-[#D4AF37] transition-colors uppercase font-bold cursor-pointer"
              >
                CONTINUE WATCHING ARCHIVES
              </button>
              
              <button
                onClick={() => navigateTo('account')}
                className="bg-white border border-gray-300 hover:border-black text-[10px] text-black font-mono px-8 py-3.5 rounded tracking-widest uppercase transition-all cursor-pointer"
              >
                ACCESS PRIVATE VIP PORTAL
              </button>
            </div>

          </div>
        )}
      </main>

      {/* 6. Footer section */}
      <Footer onNavigate={navigateTo} />

    </div>
  );
}
