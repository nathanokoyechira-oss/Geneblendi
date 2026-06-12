import React, { useState, MouseEvent, useRef } from 'react';
import { Product, Review } from '../data/products';
import { Star, Shield, Info, HelpCircle, Heart, ArrowLeft, StarOff, Sparkles, Check } from 'lucide-react';

interface ProductDetailsSectionProps {
  product: Product;
  onBackToShop: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  wishlist: string[];
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  allProducts: Product[];
  onSelectProduct: (productID: string) => void;
}

export default function ProductDetailsSection({
  product,
  onBackToShop,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  allProducts,
  onSelectProduct,
}: ProductDetailsSectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [sizeWarning, setSizeWarning] = useState(false);
  
  // Custom reviews sub-states
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState<number>(5);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Zoom magnifier states
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const zoomContainerRef = useRef<HTMLDivElement>(null);

  // Filter 3 related products
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  // Magnifier event calculation
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!zoomContainerRef.current) return;
    const { left, top, width, height } = zoomContainerRef.current.getBoundingClientRect();
    
    // Relative coordinates [0, 1]
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${product.images[activeImageIndex]})`,
      backgroundPosition: `${x * 100}% ${y * 100}%`,
      left: `${e.clientX - left - 60}px`, // Centered lens
      top: `${e.clientY - top - 60}px`,
      backgroundSize: `${width * 2.5}px ${height * 2.5}px` // 2.5x zoom magnification
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddToCartClick = () => {
    if (selectedSize === null) {
      setSizeWarning(true);
      return;
    }
    setSizeWarning(false);
    onAddToCart(product, selectedSize, selectedColor.name);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAuthor && newComment) {
      const addedReview: Review = {
        id: `r-user-${Date.now()}`,
        author: newAuthor,
        rating: newRating,
        date: new Date().toISOString().split('T')[0],
        comment: newComment,
        verified: true,
      };
      setReviewsList([addedReview, ...reviewsList]);
      setNewAuthor('');
      setNewComment('');
      setNewRating(5);
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 3000);
    }
  };

  const calculatedAvgRating = (
    reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length
  ).toFixed(1);

  return (
    <div id="product-details-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 bg-white text-black">
      
      {/* Return to gallery linkage trigger */}
      <button
        onClick={onBackToShop}
        className="inline-flex items-center space-x-2 text-xs font-mono text-gray-500 hover:text-[#D4AF37] uppercase tracking-widest mb-10 transition-colors py-2 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO GALLERY CATALOG</span>
      </button>

      {/* Primary columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Multi-Image Interactive Gallery and Magnifier Zoom */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-12 gap-4">
            
            {/* Index Thumbnails Left side (vertical list on desktop) */}
            <div className="col-span-2 flex flex-col space-y-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-lg overflow-hidden bg-gray-50 border transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-black ring-1 ring-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Primary Main Photo Frame with Magnifier Zoom */}
            <div className="col-span-10 relative">
              <div
                ref={zoomContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative aspect-square w-full rounded-xl bg-gray-50 border border-gray-100 overflow-hidden cursor-crosshair"
              >
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* MAGNIFIER LENS OVERLAY PANEL */}
                <div
                  className="image-zoom-lens"
                  style={zoomStyle}
                />
              </div>
              <p className="text-[10px] text-gray-400 font-mono text-center mt-2 tracking-widest uppercase">
                &bull; Hover cursor over image to Zoom Fine Craft Textures &bull;
              </p>
            </div>

          </div>
        </div>

        {/* Right Column: Sizing and Options Purchase drawer */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase">
              {product.category} &bull; ATELIER ARCHIVE
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-black tracking-wide">
              {product.name}
            </h1>
            
            {/* Price levels */}
            <div className="flex items-center space-x-3 pt-2">
              <span className="text-2xl font-mono text-[#D4AF37] font-light">${product.price}</span>
              {product.originalPrice && (
                <span className="text-base font-mono text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Rating Stars Summary */}
            <div className="flex items-center space-x-2 pt-1">
              <div className="flex text-[#D4AF37]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] stroke-none" />
                ))}
              </div>
              <span className="text-xs font-mono text-gray-600">({calculatedAvgRating} / 5.0 based on {reviewsList.length} audits)</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-700 font-light leading-relaxed font-sans">
            {product.description}
          </p>

          <div className="border-t border-gray-150 pt-6 space-y-6">
            
            {/* Sizing Interactive selections */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-600 font-mono">
                <span className="tracking-widest uppercase">SELECT ATELIER SCALE</span>
                <button
                  type="button"
                  onClick={() => setSizeChartOpen(!sizeChartOpen)}
                  className="text-[#D4AF37] hover:text-black flex items-center space-x-1 uppercase tracking-wider text-[11px] cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Dimension Details</span>
                </button>
              </div>

              {/* Grid sizing blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeWarning(false);
                    }}
                    className={`border py-3 px-2 rounded text-[11px] font-mono tracking-widest transition-colors cursor-pointer text-center ${
                      selectedSize === size
                        ? 'bg-black border-black text-white font-bold'
                        : 'bg-white border-gray-250 text-gray-700 hover:border-black hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {sizeWarning && (
                <p className="text-[11px] text-red-500 font-mono uppercase tracking-widest">
                  &bull; Please select an atelier scale to proceed.
                </p>
              )}

              {/* SIZE CHART TOGGLING SPEC */}
              {sizeChartOpen && (
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mt-2 animate-fade-in text-xs font-mono text-gray-600 space-y-3">
                  <div className="flex justify-between border-b border-gray-205 pb-2">
                    <span className="font-bold text-black uppercase tracking-wider">SCALE OPTION</span>
                    <span className="font-bold text-gray-500">PROPORTION DESCRIPTION</span>
                    <span className="font-bold text-[#D4AF37]">SUITABILITY</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>Standard / Studio</span>
                      <span>Regular, streamlined proportions</span>
                      <span>Elegant cozy living areas</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>Grande / Salon</span>
                      <span>Expanded volumetric profile</span>
                      <span>High ceiling gallery lounges</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span>Atelier / Custom</span>
                      <span>Individually mapped dimensions</span>
                      <span>Full bespoke room commissions</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Membrane Colors picker */}
            <div className="space-y-3">
              <span className="text-xs text-gray-600 font-mono tracking-widest block uppercase">
                MEMBRANE SKIN TONE: {selectedColor.name}
              </span>
              <div className="flex gap-2.5">
                {product.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`relative p-0.5 rounded-full ring-2 transition-all cursor-pointer ${
                      selectedColor.name === col.name ? 'ring-[#D4AF37] ring-offset-2 ring-offset-white' : 'ring-transparent'
                    }`}
                  >
                    <span className={`block w-6 h-6 rounded-full ${col.class}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Direct buttons block */}
            <div className="flex space-x-3 pt-4">
              <button
                id="add-to-cart-details"
                onClick={handleAddToCartClick}
                className="flex-grow bg-black text-white font-mono text-[11px] font-bold py-4 px-6 rounded tracking-widest hover:bg-[#D4AF37] transition-all uppercase cursor-pointer"
              >
                ADD TO SHOPPING BAG
              </button>

              <button
                onClick={(e) => onToggleWishlist(product.id, e)}
                className="p-4 rounded border border-gray-300 hover:border-black text-gray-500 hover:text-red-500 transition-all cursor-pointer shadow-sm"
                title="Add to wishlist vault"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* Availability details & certification metrics */}
            <div className="border border-gray-205 bg-gray-50 p-4 rounded-lg space-y-2 text-[11px] font-mono text-gray-600 shadow-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase font-bold text-[10px]">ALLOCATION KEY</span>
                <span className="text-gray-700">{product.id ? product.id.toUpperCase() : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase font-bold text-[10px]">INVENTORY DEPTH</span>
                <span className="text-[#D4AF37] font-bold">{product.stock} COMMISSION PIECES STOCKED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase font-bold text-[10px]">CERTIFICATION</span>
                <span>HELYN HILLS INTERIOR SEAL</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Narrative Section Tabs (Accordion Style) */}
      <section className="mt-20 border-t border-gray-200 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-sm font-bold font-mono tracking-widest text-gray-650 mb-4 uppercase">
              ARCHITECTURAL COMPLIANCES
            </h3>
            <ul className="space-y-2 text-xs text-gray-600 font-mono">
              {product.details.map((detail, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold font-mono tracking-widest text-gray-650 mb-4 uppercase">
              LUXURY PACKAGING SIGNATURE
            </h3>
            <ul className="space-y-2 text-xs text-gray-600 font-mono">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Reviews Section */}
      <section className="mt-24 border-t border-gray-200 pt-16">
        <h2 className="text-2xl font-serif text-black tracking-wide mb-10">
          Verified Audit Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Read existing Reviews list */}
          <div className="lg:col-span-7 space-y-6">
            {reviewsList.map((review) => (
              <div key={review.id} className="bg-[#FDFDFD] p-6 rounded-lg border border-gray-150 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-black">{review.author}</h4>
                    <span className="text-[10px] text-gray-500 font-mono mt-0.5">{review.date}</span>
                  </div>
                  
                  {/* Rating indicators */}
                  <div className="flex items-center space-x-1.5">
                    <div className="flex text-[#D4AF37]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 stroke-none ${
                            i < review.rating ? 'fill-[#D4AF37]' : 'fill-gray-100'
                          }`}
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <span className="text-[9px] font-mono text-emerald-600 border border-emerald-200 bg-emerald-50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Verified Audit
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-650 italic">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>

          {/* Sizing Interactive Review Writer form */}
          <div className="lg:col-span-5 bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit shadow-sm">
            <h3 className="text-sm font-semibold font-mono tracking-widest text-gray-700 uppercase mb-4">
              Write verified Customer Audit
            </h3>
            
            <form onSubmit={handleAddReview} className="space-y-4">
              <div className="space-y-1">
                <label id="review-author" className="text-[10px] font-mono tracking-wider text-gray-500 block uppercase">
                  NAME / COLLECTOR ID
                </label>
                <input
                  type="text"
                  required
                  aria-labelledby="review-author"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Richard Mille M."
                  className="w-full bg-white border border-gray-300 rounded-md text-xs px-3.5 py-2.5 text-black focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-gray-500 block uppercase">
                  ACCREDITED RATING
                </span>
                <div role="radiogroup" aria-label="Rating scale" className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      role="radio"
                      aria-checked={newRating === starVal}
                      onClick={() => setNewRating(starVal)}
                      className="text-[#D4AF37] hover:scale-115 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 cursor-pointer ${
                          starVal <= newRating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label id="review-comment" className="text-[10px] font-mono tracking-wider text-gray-500 block uppercase">
                  AUDIT COMMENTARY
                </label>
                <textarea
                  required
                  aria-labelledby="review-comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your genuine experience, leather softness, performance..."
                  rows={4}
                  className="w-full bg-white border border-gray-300 rounded-md text-xs px-3.5 py-2.5 text-black focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {reviewSuccess && (
                <div className="bg-white border border-gray-200 p-3 rounded-md text-center text-xs font-mono text-[#D4AF37] uppercase tracking-widest animate-fade-in">
                  &bull; Audit published successfully. Verified.
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white font-mono text-[10.5px] font-bold py-3 px-4 rounded hover:bg-[#D4AF37] transition-colors uppercase tracking-widest cursor-pointer"
              >
                PUBLISH VERIFIED AUDIT
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Related curated footwear rows */}
      <section className="mt-28 border-t border-gray-200 pt-16">
        <p className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase text-center mb-2">
          CONTINUE TO SIFT
        </p>
        <h2 className="text-2xl font-serif text-black text-center mb-12">
          Related Archival Editions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectProduct(p.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-[#FDFDFD] border border-gray-150 hover:border-gray-300 hover:shadow-sm transition-all p-3 rounded-lg cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-square bg-gray-50 rounded overflow-hidden relative">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-4 flex items-center justify-between text-left">
                <div>
                  <h4 className="text-xs font-bold text-black group-hover:text-[#D4AF37] transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-[10.5px] text-gray-500 font-mono mt-0.5">{p.category}</p>
                </div>
                <span className="text-xs font-mono text-[#D4AF37]">${p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
