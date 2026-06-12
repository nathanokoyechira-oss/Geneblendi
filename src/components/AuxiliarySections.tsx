import React, { useState } from 'react';
import { Product } from '../data/products';
import { HelpCircle, ChevronDown, Heart, MapPin, Mail, Phone, Lock, Eye, ShoppingBag, EyeOff, ClipboardCheck, ArrowUpRight, Award, Trash, Shield, Plane } from 'lucide-react';

/* ==========================================================================
   ABOUT/MAISON VIEW
   ========================================================================== */
export function AboutView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 bg-white text-black text-center md:text-left space-y-16">
      
      {/* Brand Header */}
      <div className="border-b border-gray-200 pb-8 text-center max-w-3xl mx-auto space-y-3">
        <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">THE DESIGN HERITAGE</p>
        <h1 className="text-4xl sm:text-5xl font-serif text-black uppercase tracking-wider text-luxury">The Studio of Helyn Hills</h1>
        <p className="text-xs text-gray-500 font-light leading-relaxed">
          Blending raw organic architectural parameters with elegant, timeless domestic styling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-black font-semibold italic">"The perfect living space bridges the gap between structure and soul."</h2>
          <p className="text-xs text-gray-700 leading-relaxed font-light">
            Founded with a vision to build custom furniture that breathes with natural organic poise. We noticed a jarring discrepancy: mass-produced contemporary couches and dining tables offered look-alike minimalism but lost joint strength and fabric beauty within months; conversely, heavy antique pieces looked premium but were too bulky and stiff for modern open-floor plans.
          </p>
          <p className="text-xs text-gray-700 leading-relaxed font-light">
            Helyn Hills resolved to bridge this gap. We created a collaborative collective of local woodwork painters and upholstery artisans, selecting sustainable solid heartwood ash, rub-polishing them with safe organic beeswax, and tailoring with custom loomed linen and Italian marble profiles.
          </p>
          <div className="pt-2">
            <span className="text-[10px] font-mono text-gray-550 uppercase tracking-widest block font-bold">CO-FOUNDERS & CHIEF DESIGNERS</span>
            <span className="text-sm font-serif text-[#D4AF37] italic">Helyn & Daniel Hills</span>
          </div>
        </div>

        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-205 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
            alt="Helyn Hills Workshop inside Milan"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="text-xs font-mono text-white tracking-widest block uppercase font-bold">LAGOS STUDIO</span>
            <span className="text-[10px] text-zinc-350 font-mono mt-1 block">Est. 2018, Lagos, Nigeria</span>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ==========================================================================
   CONCIERGE / CONTACT VIEW
   ========================================================================== */
interface ContactViewProps {
  userEmail?: string;
}
 
export function ContactView({ userEmail = '' }: ContactViewProps) {
  const [topic, setTopic] = useState('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(userEmail);
  const [orderQuery, setOrderQuery] = useState('');
  const [message, setMessage] = useState('');
  const [successTicket, setSuccessTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `EH-CARE-${Math.floor(100000 + Math.random() * 900000)}`;
    setSuccessTicket(ticketId);
    setName('');
    setMessage('');
    setOrderQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 bg-white text-black">
      <div className="border-b border-gray-200 pb-8 text-center max-w-3xl mx-auto space-y-3 mb-16">
        <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">VIP CONCIERGE SERVICE</p>
        <h1 className="text-4xl sm:text-5xl font-serif text-black uppercase tracking-wider text-luxury">Aesthetic Concierge Desk</h1>
        <p className="text-xs text-gray-500 font-light leading-relaxed">
          Ask custom sizing advice, seek design invitations, or coordinate bespoke order specifications directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold font-mono tracking-widest text-black uppercase">DIRECT ATELIER LINKAGES</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Available 24 hours a day, 7 days a week, excluding high fashion seasonal holidays.
            </p>
            <div className="space-y-3 text-xs text-gray-705 font-mono">
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span className="select-all">concierge@helynhills.design</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>+234 (1) 8000 4242</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>12, Cooper Road, Ikoyi, Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold font-mono tracking-widest text-black uppercase">BOUTIQUE RETRIEVABILITY</h3>
            <p className="text-xs text-gray-550 leading-relaxed">
              Experience the genuine touch. View our collection in Lagos, Tokyo, and London boutiques by making a reservation.
            </p>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] font-mono text-[#D4AF37] hover:text-black uppercase tracking-widest hover:underline flex items-center space-x-1 font-bold">
              <span>RESERVE EXCLUSIVELY BOUTIQUE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#FDFDFD] p-8 rounded-lg border border-gray-150 shadow-sm">
          {successTicket ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="w-12 h-12 bg-white border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto text-[#D4AF37]">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-black">Ticket Filed Successfully</h3>
              <p className="text-xs text-gray-650 max-w-sm mx-auto leading-relaxed">
                Your concierge request was placed into high priority queues under ticket referencing code <span className="text-[#D4AF37] font-bold block mt-1 font-mono">{successTicket}</span>. A luxury sizing tutor will email you back within 3 hours.
              </p>
              <button
                onClick={() => setSuccessTicket(null)}
                className="bg-black text-white font-mono text-[10px] py-2 px-6 rounded uppercase tracking-widest font-bold cursor-pointer hover:bg-[#D4AF37]"
              >
                File Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label id="concierge-name-label" className="text-[10px] font-mono tracking-widest text-gray-550 block uppercase">COLLECTOR NAME</label>
                  <input
                    type="text"
                    required
                    aria-labelledby="concierge-name-label"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="space-y-1">
                  <label id="concierge-email-label" className="text-[10px] font-mono tracking-widest text-gray-550 block uppercase">VIP EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    aria-labelledby="concierge-email-label"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@executive.com"
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span id="concierge-topic-label" className="text-[10px] font-mono tracking-widest text-gray-550 block uppercase">INQUIRY PATH</span>
                  <select
                    value={topic}
                    aria-labelledby="concierge-topic-label"
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono cursor-pointer"
                  >
                    <option value="general">General Sizing & Aesthetics</option>
                    <option value="order">Active Order Adjustments</option>
                    <option value="custom">Bespoke Handcraft runs</option>
                    <option value="press">Press and Showroom</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label id="concierge-order-label" className="text-[10px] font-mono tracking-widest text-gray-550 block uppercase">ORDER ID (OPTIONAL)</label>
                  <input
                    type="text"
                    aria-labelledby="concierge-order-label"
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value)}
                    placeholder="e.g. GB-2026-X83C"
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono uppercase"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label id="concierge-msg-label" className="text-[10px] font-mono tracking-widest text-gray-550 block uppercase">CONCIERGE COMMUNICATIONS DETAILS</label>
                <textarea
                  required
                  aria-labelledby="concierge-msg-label"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your design specifications, archway needs, packaging specifications..."
                  rows={5}
                  className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white font-mono font-bold text-[10px] py-3.5 rounded tracking-widest hover:bg-[#D4AF37] transition-colors uppercase cursor-pointer"
              >
                DISPATCH SECURE CONCIERGE TICKET
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   FAQ VIEW WITH ACCORDIONS
   ========================================================================== */
export function FaqView() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I choose the correct furniture dimensions for my space?',
      a: 'Helyn Hills designs are crafted to generous standard scales. Our sizes (Standard, Grande, Atelier) fit standard layout plans beautifully. If you require specific custom adjustments, simply select the "Custom" scale on the product details page, and our design concierge will contact you within 24 hours to match your exact home layout.'
    },
    {
      q: 'Where is Helyn Hills furniture crafted?',
      a: 'Each furniture piece is entirely hand-built, joined, and manually rubbed individually in our dedicated design studio in Lagos, Nigeria. We select sustainable domestic hardwoods, Italian Calacatta Viola marbles, and premium textured loomed fabrics.'
    },
    {
      q: 'What is the standard delivery and room installation protocol?',
      a: 'We offer complimentary white-glove transport on all commissions. Our logistics team coordinates a delivery schedule, brings your items straight to your room of choice, unboxes, and performs complimentary room installation with zero extra fees.'
    },
    {
      q: 'Can I request adjustments or cancellations for custom commissions?',
      a: 'Yes. For pre-designed boutique catalogs, we offer complimentary returns within 30 days. For custom commissions, you can modify dimensions or cancel your order within 3 days of booking before our craftspeople begin cutting.'
    },
    {
      q: 'How do I care for solid heartwood ash and waxed finishes?',
      a: 'Dust wooden surfaces using a soft dry microfiber cloth. Re-apply a thin coat of organic beeswax or Danish wood-oil annually to preserve timber hydration and deep color grains. Avoid applying high-chemical spray solvents.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-28 bg-white text-black">
      <div className="border-b border-gray-200 pb-8 text-center max-w-2xl mx-auto space-y-3 mb-12">
        <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">SUPPORT MATRIX</p>
        <h1 className="text-4xl font-serif text-black uppercase tracking-wider text-luxury">Aesthetic Guidelines & FAQ</h1>
        <p className="text-xs text-gray-500 font-light leading-relaxed">
          Detailed metrics regarding deliveries, exchanges, materials, and artisan care techniques.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden transition-colors shadow-sm"
            >
              <button
                onClick={() => setActiveIndex(isOpen ? null : idx)}
                type="button"
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-5 text-left text-black hover:text-[#D4AF37] font-serif text-sm sm:text-base tracking-wide transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
              </button>
              
              {isOpen && (
                <div role="region" className="p-5 pt-0 text-xs text-gray-750 border-t border-gray-150 leading-relaxed font-sans font-light animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

/* ==========================================================================
   ACCOUNT / LOGIN & VIP VIEW
   ========================================================================== */
interface AccountViewProps {
  isLoggedIn: boolean;
  userEmail: string;
  onLoginState: (email: string) => void;
  onLogoutState: () => void;
  products: Product[];
  wishlist: string[];
  onRemoveWishlist: (id: string, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  orderHistory: any[];
}

export function AccountView({
  isLoggedIn,
  userEmail,
  onLoginState,
  onLogoutState,
  products,
  wishlist,
  onRemoveWishlist,
  onAddToCart,
  orderHistory,
}: AccountViewProps) {
  const [emailIn, setEmailIn] = useState('');
  const [passIn, setPassIn] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showTrackingDetailId, setShowTrackingDetailId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailIn) {
      onLoginState(emailIn);
      setEmailIn('');
      setPassIn('');
    }
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 bg-white text-black font-sans">
      
      {!isLoggedIn ? (
        /* Login / Register panels */
        <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">HELYN HILLS DESIGN CLUB</span>
            <h2 className="text-2xl font-serif text-black uppercase tracking-wider">
              {isRegister ? 'Create Simple Account' : 'Member Log-In'}
            </h2>
            <p className="text-xs text-gray-500 font-light">
              {isRegister ? 'Join our free members club to save design layouts and track current orders.' : 'Sign in easily using your email address and any simple password key.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label id="account-email" className="text-[10px] font-mono text-gray-550 tracking-wider block uppercase">Your Email</label>
              <input
                type="email"
                required
                aria-labelledby="account-email"
                value={emailIn}
                onChange={(e) => setEmailIn(e.target.value)}
                placeholder="me@myaddress.com"
                className="w-full bg-white border border-gray-300 rounded px-3.5 py-3 text-xs text-black focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-1">
              <label id="account-pass" className="text-[10px] font-mono text-gray-550 tracking-wider block uppercase">Password Key</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  aria-labelledby="account-pass"
                  value={passIn}
                  onChange={(e) => setPassIn(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-300 rounded pl-3.5 pr-10 py-3 text-xs text-black focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-black"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-mono font-bold text-[10px] py-4 rounded tracking-widest hover:bg-[#D4AF37] transition-colors uppercase mt-2 cursor-pointer"
            >
              {isRegister ? 'Register Account' : 'Log In'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-gray-500 hover:text-[#D4AF37] tracking-wider font-mono uppercase cursor-pointer"
            >
              {isRegister ? 'Already registered? Log In Instead' : 'Brand new user? Sign Up Here'}
            </button>
          </div>
        </div>
      ) : (
        /* Authenticated area VIP Client lounge */
        <div className="space-y-12">
          
          {/* Header of user portal */}
          <div className="bg-[#FDFDFD] p-8 rounded-xl border border-gray-150 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-sm">
            {/* VIP Card Badge Glow */}
            <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#D4AF37]/5 via-transparent pointer-events-none" />
            
            <div className="space-y-2 relative z-10">
              <span className="bg-black text-white text-[9.5px] font-mono tracking-widest font-bold px-3 py-1 rounded-full uppercase">
                Design Club Member
              </span>
              <h2 className="text-2xl font-serif text-black mt-1">Welcome, Interior Lover</h2>
              <p className="text-xs text-gray-500 font-mono">My Account of Record: <span className="text-[#D4AF37]">{userEmail}</span></p>
            </div>

            <div className="flex items-center space-x-4 shrink-0 relative z-10">
              <div className="text-right font-sans">
                <span className="text-[10px] text-gray-500 uppercase block font-mono">Design Reward Points</span>
                <span className="text-lg text-[#D4AF37] font-bold">1,245 Points</span>
                <span className="text-[9px] text-gray-400 block font-light">Valid for bespoke custom finishes</span>
              </div>
              <button
                type="button"
                onClick={onLogoutState}
                className="bg-white hover:bg-gray-50 border border-gray-300 hover:border-black text-black text-xs font-mono px-4 py-2 rounded tracking-widest uppercase transition-all cursor-pointer shadow-sm"
              >
                Log Out
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Wishlist Vault block */}
            <div className="lg:col-span-6 space-y-6">
              <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold font-mono tracking-widest text-gray-700 uppercase">
                  SAVED DESIGNS & INSPIRATION ({wishlistProducts.length})
                </h3>
              </div>

              {wishlistProducts.length > 0 ? (
                <div id="wishlist-lounge" className="space-y-4">
                  {wishlistProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center space-x-4 bg-[#FDFDFD] p-4 rounded-lg border border-gray-150 hover:border-gray-300 transition-colors shadow-sm"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover bg-white border border-gray-250 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9.5px] font-mono text-[#D4AF37] uppercase tracking-widest block">{p.category}</span>
                        <h4 className="text-sm font-semibold text-black truncate">{p.name}</h4>
                        <span className="text-xs font-mono text-gray-650">${p.price}</span>
                      </div>
                      
                      {/* Action blocks row */}
                      <div className="flex items-center space-x-2.5">
                        <button
                          type="button"
                          onClick={() => onAddToCart(p, p.sizes[0], p.colors[0].name)}
                          className="bg-black text-white p-2 rounded hover:bg-[#D4AF37] text-xs transition-colors cursor-pointer"
                          title="Add to shopping bag"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => onRemoveWishlist(p.id, e)}
                          className="bg-white border border-gray-300 hover:border-red-500 hover:text-red-500 p-2 rounded cursor-pointer text-gray-500 shadow-sm"
                          title="Remove saved item"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 text-xs font-normal leading-relaxed">
                  Your design wishlist is empty. Save your favorite custom creations while browsing the collections.
                </div>
              )}
            </div>

            {/* Past orders list */}
            <div className="lg:col-span-6 space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-sm font-semibold font-mono tracking-widest text-gray-700 uppercase">
                  SAVED ORDERS & TRACKING ({orderHistory.length})
                </h3>
              </div>

              {orderHistory.length > 0 ? (
                <div className="space-y-4">
                  {orderHistory.map((ord) => {
                    const isTrackingVisible = showTrackingDetailId === ord.id;
                    return (
                      <div
                        key={ord.id}
                        className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-4 shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-220 pb-3">
                          <div>
                            <span className="text-[10px] font-mono text-gray-500 block uppercase">ORDER REFERENCE</span>
                            <span className="text-xs font-mono font-bold text-[#D4AF37]">{ord.id}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-gray-500 block uppercase">DATE INVOICED</span>
                            <span className="text-xs text-gray-705 font-mono">{ord.date}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-gray-500 block uppercase">AUDIT TOTAL</span>
                            <span className="text-xs font-mono text-black font-bold">${ord.totalPrice}</span>
                          </div>
                        </div>

                        {/* Summary details items */}
                        <div className="text-xs space-y-1">
                          <p className="text-gray-450 uppercase tracking-widest font-mono text-[9px] mb-1">ITEMS PURCHASED</p>
                          {ord.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-gray-700">
                              <span>{item.product.name} ({item.selectedSize}) x{item.quantity}</span>
                              <span className="font-mono text-gray-550">${item.product.price}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-50 text-[#D4AF37] border border-amber-200 font-bold uppercase tracking-widest">
                            <span>{ord.status}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => setShowTrackingDetailId(isTrackingVisible ? null : ord.id)}
                            className="text-[10px] font-mono text-[#D4AF37] hover:text-black uppercase tracking-widest font-bold hover:underline flex items-center space-x-1"
                          >
                            <span>{isTrackingVisible ? 'Close Tracker' : 'Track Delivery Details'}</span>
                          </button>
                        </div>

                        {/* Interactive shipping timeline tracker */}
                        {isTrackingVisible && (
                          <div className="border border-gray-200 bg-white p-4 rounded-lg space-y-4 shadow-sm animate-fade-in">
                            <div className="flex justify-between text-[10px] font-mono text-gray-550 uppercase tracking-widest border-b border-gray-150 pb-1.5">
                              <span>Delivery Milestones</span>
                              <span className="text-amber-600 font-bold">&bull; Handcrafted Custom Order Transit</span>
                            </div>
                            
                            {/* Line timeline graph progress */}
                            <div className="relative pt-2">
                              <div className="absolute left-0 top-6 w-full h-[2px] bg-gray-200" />
                              <div className="absolute left-0 top-6 w-2/3 h-[2px] bg-[#D4AF37]" />
                              
                              <div className="relative flex justify-between">
                                <div className="text-center space-y-1">
                                  <div className="w-5 h-5 rounded-full bg-white border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-[8.5px] font-mono font-bold text-[#D4AF37]">1</div>
                                  <span className="text-[8px] font-mono text-gray-750 block uppercase tracking-wider">Sourcing Wood</span>
                                </div>
                                <div className="text-center space-y-1">
                                  <div className="w-5 h-5 rounded-full bg-white border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-[8.5px] font-mono font-bold text-[#D4AF37]">2</div>
                                  <span className="text-[8px] font-mono text-gray-750 block uppercase tracking-wider">Expert Craft</span>
                                </div>
                                <div className="text-center space-y-1">
                                  <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-white mx-auto flex items-center justify-center text-[8.5px] font-mono font-bold">3</div>
                                  <span className="text-[8px] font-mono text-[#D4AF37] font-bold block uppercase tracking-wider">Quality Polishing</span>
                                </div>
                                <div className="text-center space-y-1">
                                  <div className="w-5 h-5 rounded-full bg-white border border-gray-200 mx-auto flex items-center justify-center text-[8.5px] font-mono font-bold text-gray-400">4</div>
                                  <span className="text-[8px] font-mono text-gray-400 block uppercase tracking-wider">Your Home</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-[10px] text-gray-500 leading-relaxed font-light italic">
                              Your furniture item has been handcrafted, safety polished, and is currently in delivery transit straight to your door. Expected delivery duration: 48 Hours with complimentary room installation.
                            </p>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 text-xs">
                  No purchase logs registered in current active database session. Secure a footwear runner to trace traces.
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* ==========================================================================
   CHECKOUT PROCESS VIEW
   ========================================================================== */
interface CheckoutViewProps {
  cart: any[];
  onOrderPlace: (shippingDetails: any) => void;
  couponCode: string;
  onApplyCoupon: (code: string) => void;
  couponSuccess: boolean | string;
}

export function CheckoutView({
  cart,
  onOrderPlace,
  couponCode,
  onApplyCoupon,
  couponSuccess,
}: CheckoutViewProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [phone, setPhone] = useState('');
  const [localCoupon, setLocalCoupon] = useState(couponCode);

  // Credit Card Formatter state
  const [cardNo, setCardNo] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Math totals calculation
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountRate = couponSuccess ? (couponCode.toUpperCase() === 'HELYN20' ? 0.2 : 0.15) : 0;
  const discountTotal = subtotal * discountRate;
  const estimatedVat = (subtotal - discountTotal) * 0.1; // 10%
  const grandTotal = subtotal - discountTotal + estimatedVat;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyCoupon(localCoupon);
  };

  // Automatically insert space for credit cards spacing every 4 digits
  const handleCardInput = (val: string) => {
    const formatted = val
      .replace(/\s?/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
    if (formatted.length <= 19) {
      setCardNo(formatted);
    }
  };

  // Automatically insert slash for card expiration date MM/YY
  const handleCardExp = (val: string) => {
    const clean = val.replace(/\D/g, '');
    let formatted = clean;
    if (clean.length > 2) {
      formatted = `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
    }
    if (formatted.length <= 5) {
      setCardExp(formatted);
    }
  };

  const handleSecurePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && address && cardNo.length >= 15) {
      setPaymentProcessing(true);
      
      // Simulate real bank authorization delays
      setTimeout(() => {
        setPaymentProcessing(false);
        onOrderPlace({
          name: `${firstName} ${lastName}`,
          address,
          city,
          zip,
          country,
          phone,
        });
      }, 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 bg-white text-black">
      
      <div className="border-b border-gray-200 pb-8 text-center max-w-2xl mx-auto space-y-3 mb-10">
        <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">SSL-ENCRYPTED SECURE PROTOCOL</p>
        <h1 className="text-4xl font-serif text-black uppercase tracking-wider text-luxury">Secure Gateway Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Shipping and Card details */}
        <div className="lg:col-span-7 bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm">
          <form onSubmit={handleSecurePlaceOrder} className="space-y-6">
            
            {/* shipping subtitle */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold font-mono tracking-widest text-gray-700 uppercase border-b border-gray-200 pb-2">
                01 / DELIVERY PARAMETERS
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span id="label-firstname" className="text-[9.5px] font-mono text-gray-550 uppercase">First Name</span>
                  <input
                    type="text"
                    required
                    aria-labelledby="label-firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Richard"
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="space-y-1">
                  <span id="label-lastname" className="text-[9.5px] font-mono text-gray-550 uppercase">Last Name</span>
                  <input
                    type="text"
                    required
                    aria-labelledby="label-lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Mille"
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <span id="label-address" className="text-[9.5px] font-mono text-gray-550 uppercase">STREET ADDRESS</span>
                <input
                  type="text"
                  required
                  aria-labelledby="label-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street name, Suit/APT unit numbers"
                  className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <span id="label-city" className="text-[9.5px] font-mono text-gray-550 uppercase">CITY</span>
                  <input
                    type="text"
                    required
                    aria-labelledby="label-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Los Angeles"
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="space-y-1">
                  <span id="label-zip" className="text-[9.5px] font-mono text-gray-550 uppercase">ZIP CODE</span>
                  <input
                    type="text"
                    required
                    aria-labelledby="label-zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="90001"
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <span id="label-country" className="text-[9.5px] font-mono text-gray-550 uppercase">COUNTRY</span>
                  <select
                    value={country}
                    aria-labelledby="label-country"
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="United States">United States</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <span id="label-phone" className="text-[9.5px] font-mono text-gray-550 uppercase">CONTACT PHONE NUMBER</span>
                <input
                  type="tel"
                  required
                  aria-labelledby="label-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono"
                />
              </div>
            </div>

            {/* Payment subtitle */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold font-mono tracking-widest text-gray-700 uppercase border-b border-gray-200 pb-2 flex items-center justify-between">
                <span>02 / SECURE LEDGER CREDITS</span>
                <span className="flex items-center text-emerald-600 text-[10px] space-x-1 uppercase font-bold">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Stripe Secure Connection</span>
                </span>
              </h3>

              <div className="space-y-1">
                <span id="label-cardno" className="text-[9.5px] font-mono text-gray-550 uppercase">CARD STRIPE LOG NUMBER</span>
                <input
                  type="text"
                  required
                  aria-labelledby="label-cardno"
                  value={cardNo}
                  onChange={(e) => handleCardInput(e.target.value)}
                  placeholder="4111 2222 3333 4444"
                  className="w-full bg-white border border-gray-300 rounded px-3.5 py-3 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span id="label-cardexp" className="text-[9.5px] font-mono text-gray-550 uppercase">EXP DATA (MM/YY)</span>
                  <input
                    type="text"
                    required
                    aria-labelledby="label-cardexp"
                    value={cardExp}
                    onChange={(e) => handleCardExp(e.target.value)}
                    placeholder="12/28"
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-3 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <span id="label-cardcvv" className="text-[9.5px] font-mono text-gray-550 uppercase">CVV SECRET</span>
                  <input
                    type="password"
                    required
                    aria-labelledby="label-cardcvv"
                    value={cardCvv}
                    onChange={(e) => { if (e.target.value.length <= 4) setCardCvv(e.target.value) }}
                    placeholder="345"
                    className="w-full bg-white border border-gray-300 rounded px-3.5 py-3 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Simulated on-chain progress */}
            {paymentProcessing ? (
              <div className="bg-white border border-[#D4AF37]/20 p-4 rounded text-center space-y-2 animate-pulse">
                <p className="text-xs font-mono text-[#D4AF37] font-bold uppercase tracking-widest">
                  AUTHORIZING SECURE TRANSMISSION LEDGER...
                </p>
                <p className="text-[10px] text-gray-550 leading-none">
                  Please hold on. Validating cryptographic credit parameters. Do not close browser page.
                </p>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white font-mono font-bold text-xs py-4 rounded tracking-widest hover:bg-[#D4AF37] transition-colors uppercase cursor-pointer"
              >
                DISPATCH SECURE LUXURY PAYMENTS
              </button>
            )}

            <p className="text-[9.5px] text-gray-550 text-center font-mono">
              Certified by AES-256 PCI standards. Real billing parameters are not stored.
            </p>

          </form>
        </div>

        {/* Right order subtotal checkout card summary */}
        <div className="lg:col-span-5 bg-gray-50 p-6 rounded-lg border border-gray-205 h-fit space-y-6 shadow-sm">
          <h3 className="text-xs font-bold font-mono tracking-widest text-gray-700 uppercase border-b border-gray-150 pb-2">
            CONSTITUENT PORTFOLIO
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item, idx) => (
              <div key={idx} className="flex space-x-3 text-xs border-b border-gray-200 pb-2">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 object-cover bg-white border border-gray-200 rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-black font-bold truncate">{item.product.name}</h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">SCALE: {item.selectedSize} &bull; TYPE: {item.selectedColor}</p>
                  <p className="text-[11px] text-gray-650 font-mono mt-0.5">Quantity: {item.quantity}</p>
                </div>
                <span className="font-mono text-[#D4AF37] font-semibold text-right">${item.product.price}</span>
              </div>
            ))}
          </div>

          {/* Coupon inputs bar */}
          <form onSubmit={handleApplyPromo} className="flex space-x-2 border-b border-gray-200 pb-4">
            <input
              type="text"
              value={localCoupon}
              onChange={(e) => setLocalCoupon(e.target.value)}
              placeholder="Promo VIP code..."
              className="flex-grow bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-black uppercase focus:outline-none focus:border-[#D4AF37] font-mono"
            />
            <button
              type="submit"
              className="bg-black text-white border border-black px-4 text-xs font-mono rounded tracking-wider hover:bg-[#D4AF37] cursor-pointer"
            >
              Apply
            </button>
          </form>

          {couponSuccess && (
            <div className="bg-amber-50 border border-amber-200 p-2 text-center rounded text-[10.5px] font-mono text-[#D4AF37] uppercase tracking-widest">
              DEDUCTION ACTIVE: {couponCode.toUpperCase() === 'HELYN20' ? '20%' : '15%'} REDUCTION APPLIED
            </div>
          )}

          {/* Totals table */}
          <div className="space-y-2 text-xs font-mono text-gray-600">
            <div className="flex justify-between">
              <span>ITEMS MERCHANDISE</span>
              <span className="text-black">${subtotal}</span>
            </div>
            {discountTotal > 0 && (
              <div className="flex justify-between text-[#D4AF37]">
                <span>VIP REWARD DEDUCTION</span>
                <span>-${discountTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>ESTIMATED TAX (10% VAT)</span>
              <span className="text-black">${estimatedVat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-550">
              <span>EXPRESS AIR COURIER</span>
              <span className="text-emerald-700 font-bold uppercase tracking-wider">COMPLIMENTARY</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200 text-sm font-serif">
              <span className="text-black uppercase font-bold text-xs font-mono tracking-widest">ESTIMATED TOTAL LEDGER</span>
              <span className="text-[#D4AF37] font-bold font-mono text-base">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
