import React, { useState } from 'react';
import { Product } from '../data/products';
import ProductCard from './ProductCard';
import { Award, Shield, Check, Compass, Sparkles, MessageSquare, ArrowRight, Instagram } from 'lucide-react';
// @ts-expect-error - Vite handles dynamic image assets bundling
import heroBannerShoe from '../assets/images/hero_banner_shoe_1781257573317.jpg';

interface HomeSectionProps {
  products: Product[];
  onNavigate: (route: string, productId?: string) => void;
  onAddToCart: (product: Product, size: number, color: string) => void;
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

  // High fashion Instagram-style outfits data for shoe brand lifestyle representation
  const IG_ITEMS = [
    { id: 1, img: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=600&q=80', handle: '@johan_blendi', shoe: 'Blendi Sovereign Court Low' },
    { id: 2, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', handle: '@emily_milan', shoe: 'Astral White Velvet Court' },
    { id: 3, img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', handle: '@marcus_ceo', shoe: 'Chelsea Sovereign Boot' },
    { id: 4, img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', handle: '@luxury_clara', shoe: 'Belndi Pastel Prism' },
    { id: 5, img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80', handle: '@alessio.blendi', shoe: 'Blendi Onyx Runner' },
    { id: 6, img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', handle: '@isabella_v', shoe: 'Aurelia Minimalist Court' },
  ];

  return (
    <div id="homepage-section" className="space-y-24 bg-white text-black">
      
      {/* 1. Full-Screen Hero Section with Generated Imagery */}
      <section
        id="hero-banner"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 pb-12 pt-20"
      >
        {/* Subtle Dark Gold Radial Blend */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-95 z-0" />
        
        {/* Generated Shoe Studio Master Asset */}
        <div className="absolute inset-0 w-full h-full opacity-40 lg:opacity-55 z-0 pointer-events-none">
          <img
            src={heroBannerShoe}
            alt="Gene Bendi Luxury Concept Sneaker"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
        </div>

        {/* Hero Interactive Typography Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 pt-12 lg:pt-0">
            
            <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full backdrop-blur-md w-fit shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] font-bold uppercase">
                THE 2026 ARCHIVAL CURATION
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-serif font-light text-black tracking-tight leading-[1.05]">
              Step Into <br />
              <span className="text-luxury font-serif italic text-[#D4AF37] gold-dim-glow">Excellence</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 font-light max-w-md leading-relaxed">
              Premium footwear hand-crafted in Tuscan workshops. Tailored precisely to fuse high-performance lightweight technology with uncompromising luxury aesthetics.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                id="hero-shop-button"
                onClick={() => onNavigate('shop')}
                className="bg-black text-white font-mono text-[11px] font-bold py-4 px-8 rounded tracking-[0.2em] hover:bg-[#D4AF37] transition-all text-center uppercase cursor-pointer"
              >
                SHOP COLLECTION
              </button>
              <button
                id="hero-legacy-button"
                onClick={() => onNavigate('about')}
                className="bg-white border border-gray-300 hover:border-black text-black font-mono text-[11px] font-bold py-4 px-8 rounded tracking-[0.2em] transition-all text-center uppercase cursor-pointer"
              >
                THE MAISON STORY &rarr;
              </button>
            </div>

            {/* Micro details counter */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 max-w-sm">
              <div>
                <span className="text-xs font-mono text-gray-400 block uppercase tracking-widest">RUNS</span>
                <span className="text-lg font-semibold text-black">LIMITED</span>
              </div>
              <div>
                <span className="text-xs font-mono text-gray-400 block uppercase tracking-widest">METRICATION</span>
                <span className="text-lg font-semibold text-black">AUTOFIT</span>
              </div>
              <div>
                <span className="text-xs font-mono text-gray-400 block uppercase tracking-widest">STITCHING</span>
                <span className="text-lg font-semibold text-black">HANDCRAFTED</span>
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

      {/* 3. Why Choose Gene Bendi (Bento Layout) */}
      <section id="why-choose-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
            SACRED VALUES OF THE SEWING ARCHIVE
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-black tracking-wide">
            Footwear Elevated to High Art
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
            Gene Bendi bypasses mass factory guidelines. Every pair goes through forty hours of manual sculpting inside Lagos, Nigeria, incorporating space-grade composites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Grid Item 1 */}
          <div className="md:col-span-8 bg-gray-50 border border-gray-200 p-8 rounded-xl flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#D4AF37]">01 / SOLE RESPONSIVENESS</span>
              <h3 className="text-xl font-serif text-black">
                Proprietary Flight Carbon Chassis
              </h3>
              <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
                By fusing layers of ultra-thin flexible carbon sheets with dense responsive polymers, we craft soles that actively return kinetic energy with each stride, while providing maximum orthocare arch alignment.
              </p>
            </div>
            <div className="flex items-center space-x-6 mt-8 text-[11px] font-mono text-gray-500 uppercase">
              <span>&bull; 24% lighter weight</span>
              <span>&bull; 30% higher shock dispersion</span>
            </div>
          </div>

          {/* Bento Grid Item 2 */}
          <div className="md:col-span-4 bg-gray-50 border border-gray-200 p-8 rounded-xl flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#D4AF37]">02 / TRADITION</span>
              <h3 className="text-xl font-serif text-black">
                Double-Welt Tuscan Sticking
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Bespoke locks with thick waxed threads secure the outer calf leather safely onto the foot plate. Easy to resoling at any heritage shoemaker.
              </p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest mt-6">Hand-curated &bull;</span>
          </div>

          {/* Bento Grid Item 3 */}
          <div className="md:col-span-4 bg-gray-50 border border-gray-200 p-8 rounded-xl flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#D4AF37]">03 / COMFORT TECH</span>
              <h3 className="text-xl font-serif text-black">
                Cork-Bed Automorphic Arch
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                The interior features organic Portuguese oak crumbs which mold individually matching your foot pressure within 10 hours of active wear.
              </p>
            </div>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-6">Orthopedic standard</span>
          </div>

          {/* Bento Grid Item 4 */}
          <div className="md:col-span-8 bg-gray-50 border border-gray-200 p-8 rounded-xl flex flex-col justify-between hover:border-gray-300 transition-colors">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#D4AF37]">04 / ETHICS</span>
              <h3 className="text-xl font-serif text-black">
                Direct Allocation, Zero Mass-Overrun
              </h3>
              <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
                To prevent material waste, Gene Bendi releases precise batches. Each box arrives labelled, numbered, and registered in state client logs, guaranteeing genuine rare collectibles status.
              </p>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-mono text-[#D4AF37] hover:text-black mt-8 tracking-widest flex items-center space-x-1 hover:underline cursor-pointer"
            >
              <span>DISCOVER ARCHIVES</span>
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
            Searching for rare size parameters or custom material textures?
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] hover:text-black flex items-center space-x-1 cursor-pointer transition-all border-b border-gray-200 pb-0.5 hover:border-black shrink-0"
          >
            <span>EXPLORE FULL SHOE ARCHIVE</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>

      {/* 5. Premium Materials Aesthetic Showcase */}
      <section id="materials-showcase" className="relative py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase">
              TUSCAN SOURCING
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-black">
              Unequaled Component Integrity
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every curve of raw leather, knit stitch, and composite strut is individually selected. We believe a luxury shoe is only as great as the molecular integrity of its materials.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex space-x-3">
                <div className="bg-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[#D4AF37] border border-gray-200 shadow-sm">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono tracking-widest text-black">Glove-Grade Natural Calfskin</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Sourced from small premium pasture cooperatives in Kano, Nigeria with zero surface scarring.</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="bg-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[#D4AF37] border border-gray-200 shadow-sm">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono tracking-widest text-black">Aerodynamic Carbon Plates</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Hand-laid carbon strands that maintain spring rigidity up to 2 million flex-cycles.</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="bg-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[#D4AF37] border border-gray-200 shadow-sm">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono tracking-widest text-black">PrimeKnit Resilence Fibers</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Recycled ocean plastic synthetic knit with adaptive mechanical stretches.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 p-6 rounded-lg space-y-4 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=400&q=80"
                alt="Leather craft close up"
                referrerPolicy="no-referrer"
                className="w-full h-40 object-cover rounded grayscale"
              />
              <div className="font-serif text-sm text-black font-semibold">Kano Full-Grain Suede</div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 rounded-lg space-y-4 mt-6 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=400&q=80"
                alt="Durable shoe sole"
                referrerPolicy="no-referrer"
                className="w-full h-40 object-cover rounded grayscale"
              />
              <div className="font-serif text-sm text-black font-semibold">Vulcanized Brass Matrices</div>
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
              comment: "The Blendi Onyx Runner transcends typical sportswear. It fits beautifully with tailored designer suits, attracting nods in private boardrooms and terminals alike.",
              author: "Vivianne de L.",
              title: "Artistic Director, Lagos Design Hub",
              product: "Blendi Onyx Runner",
              rating: 5,
            },
            {
              comment: "Bespoke level materials. Hands down the highest quality leather I have run across outside of ultra-high luxury custom boot makers that charge four-digit figures.",
              author: "Bartholomew C.",
              title: "Footwear Historian & Collector",
              product: "Chelsea Sovereign Boot",
              rating: 5,
            },
            {
              comment: "I walked over 35,000 steps during the Tokyo Fashion Week in the Aurelia Court minimalists. Absolutely no friction, no sore arches. A masterpiece of engineering.",
              author: "Kenji S.",
              title: "Stylist, Tokyo Threads",
              product: "Aurelia Minimalist Court",
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
              STUDIO ARCHIVES
            </p>
            <h2 className="text-3xl font-serif text-black">
              Gene Bendi in the Wild
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-650 hover:text-black transition-colors cursor-pointer">
            <Instagram className="w-4 h-4 text-pink-500" />
            <span className="tracking-widest font-mono">FOLLOW @GENEBENDI.OFFICIAL</span>
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
              VIP MEMBERSHIP REGISTRY
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif text-black">
              Access Private Drops & 15% Privilege
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              Join the Gene Bendi inner ledger. Be notified of limited archival product run unlocks instantly. Upon registration, receive checkout privilege catalog codes.
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
