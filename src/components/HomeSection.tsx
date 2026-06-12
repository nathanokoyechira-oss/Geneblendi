import React, { useState } from 'react';
import { Product } from '../data/products';
import ProductCard from './ProductCard';
import { Award, Shield, Check, Compass, Sparkles, MessageSquare, ArrowRight, Instagram } from 'lucide-react';
interface HomeSectionProps {
  products: Product[];
  onNavigate: (route: string, productId?: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  wishlist: string[];
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
}

export default function HomeSection({
  products,
  onNavigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}: HomeSectionProps) {
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'new'>('featured');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Filter products based on collection tabs
  const tabProducts = products.filter((p) => {
    if (activeTab === 'featured') return p.featured;
    if (activeTab === 'bestsellers') return p.bestSeller;
    if (activeTab === 'new') return p.newArrival;
    return true;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    }
  };

  // High fashion Instagram-style lookbooks for interior design representation
  const IG_ITEMS = [
    { id: 1, img: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=600&q=80', handle: '@johan_homes', shoe: 'Sovereign Atelier Lounge' },
    { id: 2, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', handle: '@emily_interiors', shoe: 'Bouclé Cloud Daybed' },
    { id: 3, img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', handle: '@marcus_spaces', shoe: 'Walnut Executive Desk' },
    { id: 4, img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', handle: '@luxury_salons', shoe: 'Calacatta Viola Console' },
    { id: 5, img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80', handle: '@alessio.ateliers', shoe: 'Ash Minimalist Chair' },
    { id: 6, img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', handle: '@isabella_styling', shoe: 'Travertine Dining Table' },
  ];

  return (
    <div id="homepage-section" className="space-y-24 bg-white text-black font-sans">
      
      {/* 1. Full-Screen Hero Section with Generated Imagery */}
      <section
        id="hero-banner"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 pb-12 pt-20"
      >
        {/* Subtle Light/Gold overlay wrapper */}
        <div className="absolute inset-0 bg-white/40 opacity-95 z-0" />
        
        {/* Generated Living Room Studio Master Asset */}
        <div className="absolute inset-0 w-full h-full opacity-100 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80"
            alt="Helyn Hills Luxury Lounge Interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
        </div>

        {/* Hero Interactive Typography Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 pt-12 lg:pt-0">
            
            <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full backdrop-blur-md w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] font-bold uppercase">
                THE 2026 WINTER CURATION
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-serif font-light text-black tracking-tight leading-[1.05]">
              Helyn hills <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-luxury font-serif italic text-[#D4AF37] block mt-1.5 tracking-normal gold-dim-glow">interiors</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-700 font-light max-w-md leading-relaxed">
              Curated luxury furniture, bespoke decors, and homestyle interior assets. Artfully finished in hand-polished timber, organic stones, and soft premium fabrics to elevate your spaces.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                id="hero-shop-button"
                onClick={() => onNavigate('shop')}
                className="bg-black text-white font-mono text-[11px] font-bold py-4 px-8 rounded tracking-[0.2em] hover:bg-[#D4AF37] transition-all text-center uppercase cursor-pointer"
              >
                DISCOVER COLLECTIONS
              </button>
              <button
                id="hero-legacy-button"
                onClick={() => onNavigate('about')}
                className="bg-white border border-gray-300 hover:border-black text-black font-mono text-[11px] font-bold py-4 px-8 rounded tracking-[0.2em] transition-all text-center uppercase cursor-pointer relative z-10"
              >
                THE STUDIO STORY &rarr;
              </button>
            </div>

            {/* Micro details counter */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 max-w-sm">
              <div>
                <span className="text-xs font-mono text-gray-400 block uppercase tracking-widest">TIMBER</span>
                <span className="text-lg font-semibold text-black">SOLID ASH</span>
              </div>
              <div>
                <span className="text-xs font-mono text-gray-400 block uppercase tracking-widest">FINISHING</span>
                <span className="text-lg font-semibold text-black">NATURAL WAX</span>
              </div>
              <div>
                <span className="text-xs font-mono text-gray-400 block uppercase tracking-widest">DESIGN</span>
                <span className="text-lg font-semibold text-black">CUSTOM BOLD</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Global Boutique Locations Indicator */}
      <section id="boutique-scroller" className="border-y border-gray-200 bg-gray-50 py-4 overflow-hidden z-10 relative">
        <div className="flex justify-around items-center whitespace-nowrap text-[9px] font-mono tracking-[0.4em] text-gray-500">
          <span className="hover:text-[#D4AF37] cursor-pointer">LAGOS COOPER ROAD</span>
          <span>&bull;</span>
          <span className="hover:text-[#D4AF37] cursor-pointer">NEW YORK FIFTH AVENUE</span>
          <span>&bull;</span>
          <span className="hover:text-[#D4AF37] cursor-pointer">TOKYO GINZA CROSSING</span>
          <span>&bull;</span>
          <span className="hover:text-[#D4AF37] cursor-pointer">LONDON BOND STREET</span>
          <span>&bull;</span>
          <span className="hover:text-[#D4AF37] cursor-pointer">PARIS RUE ST HONORÉ</span>
        </div>
      </section>
      {/* 3. Why Choose Helyn Hills (Bento Layout) */}
      <section id="why-choose-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
            SACRED VALUES OF OUR INTERIOR ATELIER
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-black tracking-wide">
            Living Spaces Elevated to High Art
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
            Helyn Hills bypasses industrial assembly lines. Every custom-commissioned piece undergoes forty hours of hand-sculpting, timber seasoning, and bespoke upholstery by seasoned local designers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Grid Item 1 */}
          <div className="md:col-span-8 bg-gray-50 border border-gray-200 p-8 rounded-xl flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#D4AF37]">01 / SUSTAINABLE HARDWOODS</span>
              <h3 className="text-xl font-serif text-black">
                Bespoke Select Timber & Joined Tenons
              </h3>
              <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
                By selecting solid solid ash, white oak, and heart-of-walnut joined using traditional wood tenon crafts, we build furniture designed to sustain family generations with pristine structural poise.
              </p>
            </div>
            <div className="flex items-center space-x-6 mt-8 text-[11px] font-mono text-gray-550 uppercase">
              <span>&bull; 100% Responsibly Harvested</span>
              <span>&bull; Lifetime Joint Warranty</span>
            </div>
          </div>

          {/* Bento Grid Item 2 */}
          <div className="md:col-span-4 bg-gray-50 border border-gray-200 p-8 rounded-xl flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#D4AF37]">02 / INTEGRITY FINISHING</span>
              <h3 className="text-xl font-serif text-black">
                Natural Beeswax Hand-Rubs
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every surface is slowly polished with botanical wax oils. This preserves the tactile texture and premium breathing scent of active timber without artificial petroleum varnish.
              </p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mt-6">Zero VOC Certified &bull;</span>
          </div>

          {/* Bento Grid Item 3 */}
          <div className="md:col-span-4 bg-gray-50 border border-gray-200 p-8 rounded-xl flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#D4AF37]">03 / TEXTILE COMFORT</span>
              <h3 className="text-xl font-serif text-black">
                Organic Weaved Bouclés
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Sofa elements and cushions are upholstered in Oeko-Tex standard organic wool bouclés and breathable Belgian linen, making seating soft yet highly durable.
              </p>
            </div>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-6">Premium Touch Grade</span>
          </div>

          {/* Bento Grid Item 4 */}
          <div className="md:col-span-8 bg-gray-50 border border-gray-200 p-8 rounded-xl flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#D4AF37]">04 / ZERO WASTE</span>
              <h3 className="text-xl font-serif text-black">
                Commission-First Environmental Release
              </h3>
              <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
                To prevent material overruns and landfills, we operate entirely on a deliberate, private commission model. Each design piece is numbered, authenticated, and logged with its sourcing lineage.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="text-xs font-mono text-[#D4AF37] hover:text-black mt-8 tracking-widest flex items-center space-x-1 hover:underline cursor-pointer"
            >
              <span>DISCOVER HOME CATALOG</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Curated Tabbed Shoe Showcase */}
      <section id="curated-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
              REFINED EDITIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-black tracking-wide">
              The Curated Masterpieces
            </h2>
          </div>

          {/* Curation Tabs switcher */}
          <div className="flex border border-gray-200 p-1 bg-gray-50 rounded-lg max-w-fit">
            {[
              { id: 'featured', label: 'FEATURED' },
              { id: 'bestsellers', label: 'BEST SELLERS' },
              { id: 'new', label: 'NEW ARRIVALS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-[9.5px] font-mono font-bold px-4 py-2 rounded uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-[#D4AF37] shadow-sm border border-gray-200/50'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid Render */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tabProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onViewDetails={(id) => onNavigate('product-details', id)}
              onAddToCart={onAddToCart}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>

        {/* Expand Archive CTA */}
        <div className="text-center mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <p className="text-xs text-gray-650 font-mono">
            Searching for custom wood dimensions or bespoke fabric textures?
          </p>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] hover:text-black flex items-center space-x-1 cursor-pointer transition-all border-b border-gray-200 pb-0.5 hover:border-black shrink-0"
          >
            <span>EXPLORE FULL DESIGN CATALOG</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>

      {/* 5. Premium Materials Aesthetic Showcase */}
      <section id="materials-showcase" className="relative py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
              SUSTAINABLE LOGISTICS
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-black">
              Unequaled Material Integrity
            </h2>
            <p className="text-xs text-gray-650 leading-relaxed font-light">
              Every slab of raw marble, seasoned wood joint, and linen weave is individually selected. We believe an heirloom furniture piece is only as great as the organic integrity of its raw components.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex space-x-3">
                <div className="bg-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[#D4AF37] border border-gray-200 shadow-sm">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono tracking-widest text-black">Solid Custom-Seasoned Oaks</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Sourced from FSC certified domestic forests, seasoned naturally to eliminate moisture warp.</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="bg-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[#D4AF37] border border-gray-200 shadow-sm">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono tracking-widest text-black">Calacatta Viola Marble Tops</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Hand-cut Italian marble sections featuring magnificent bold violet veins and gloss polish.</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="bg-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[#D4AF37] border border-gray-200 shadow-sm">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono tracking-widest text-black">Belgian Textured Linens</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Woven on traditional loomed shuttle mills for unparalleled resilience to friction and fade.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 p-6 rounded-lg space-y-4 shadow-sm items-center">
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=400&q=80"
                alt="Heartwood Oak grains detail"
                referrerPolicy="no-referrer"
                className="w-full h-40 object-cover rounded grayscale"
              />
              <div className="font-serif text-sm text-black font-semibold text-center h-5">Seasoned Oak Hearts</div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg space-y-4 mt-6 shadow-sm items-center">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
                alt="High-end polished marble slabs"
                referrerPolicy="no-referrer"
                className="w-full h-40 object-cover rounded grayscale"
              />
              <div className="font-serif text-sm text-black font-semibold text-center h-5">Calacatta Viola Marble</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Curated Client Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
            REVIEWS OF EXCELLENCE
          </p>
          <h2 className="text-3xl font-serif text-black tracking-wide">
            Voices of the Connoisseurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              comment: "The Helyn Hills Atelier Credenza transcends simple storage. It acts as a magnificent focal piece inside our salon, attracting compliments from every guest.",
              author: "Vivianne de L.",
              title: "Artistic Director, Lagos Design Hub",
              product: "Atelier Ash Credenza",
              rating: 5,
            },
            {
              comment: "Bespoke level materials and woodwork joints. Hands down the highest quality organic beeswax finishing I have run across outside of historic museum antiques.",
              author: "Bartholomew C.",
              title: "Architectural Historian & Collector",
              product: "Sovereign Lounge Chair",
              rating: 5,
            },
            {
              comment: "We hosted a full week of design meetings, with hours of sitting on the Tufted Bouclé Sofa. Absolutely cozy, perfect lumbar support. A timeless masterpiece of design.",
              author: "Kenji S.",
              title: "Interior Stylist, Tokyo Living",
              product: "Tufted Bouclé Sofa",
              rating: 5,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FDFDFD] border border-gray-150 p-8 rounded-lg flex flex-col justify-between hover:border-gray-300 transition-colors shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex space-x-1 text-[#D4AF37]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <MessageSquare key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] shrink-0" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>
              
              <div className="mt-8 border-t border-gray-150 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-black">{item.author}</h4>
                  <p className="text-[10px] text-gray-500 tracking-wider mt-0.5">{item.title}</p>
                </div>
                <span className="text-[9px] font-mono text-[#D4AF37] uppercase bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                  {item.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Instagram-Style Lifestyle Feed */}
      <section id="instagram-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
              STUDIO LOOKBOOKS
            </p>
            <h2 className="text-3xl font-serif text-black font-light">
              Helyn Hills in the Wild
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-650 hover:text-black transition-colors cursor-pointer">
            <Instagram className="w-4 h-4 text-pink-550" />
            <span className="tracking-widest font-mono uppercase">FOLLOW @HELYNHILLS.DESIGN</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {IG_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-350 transition-all cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.handle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-center">
                <span className="text-xs text-white font-mono tracking-wider font-semibold">
                  {item.handle}
                </span>
                <span className="text-[9px] text-white truncate tracking-wide mt-1 font-sans">
                  {item.shoe}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Luxury Newsletter Signup */}
      <section id="newsletter-subscription" className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Faded Gold Accent Glow in Background */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase block font-bold">
              DESIGN CLUB REGISTER
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif text-black font-light">
              Join the Design Club & Receive 15% Privilege
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              Join the Helyn Hills design ledger. Be notified of new custom furniture editions and lookbooks. Upon registration, receive 15% off coupon checks.
            </p>

            {newsletterSuccess ? (
              <div className="bg-white border border-gray-200 p-4 rounded-lg space-y-2 animate-fade-in">
                <p className="text-xs font-mono text-[#D4AF37] font-bold uppercase tracking-widest">
                  ACCESS CODE: EXCELLENCE15
                </p>
                <p className="text-[11px] text-gray-650">
                  Congratulations. Enter code <span className="text-black font-bold">EXCELLENCE15</span> inside your cart for an instant 15% VIP discount deduction.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your VIP email address..."
                  className="flex-grow bg-white border border-gray-300 text-xs text-black rounded-lg px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-black text-white font-mono font-bold text-[10px] py-3 px-6 rounded-lg tracking-widest hover:bg-[#D4AF37] hover:bg-[#D4AF37] transition-colors uppercase shrink-0 cursor-pointer"
                >
                  REQUEST PRIVILEGE
                </button>
              </form>
            )}
            
            <p className="text-[10px] text-gray-500 font-mono tracking-wide uppercase">
              No spam. Just limited archival releases. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
