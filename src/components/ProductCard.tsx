import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onViewDetails: (id: string) => void;
  onAddToCart: (product: Product, size: number, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [showQuickSize, setShowQuickSize] = useState(false);

  // Quick purchase picks first color and default size
  const handleQuickAdd = (size: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, size, product.colors[0].name);
    setShowQuickSize(false);
  };

  const hasFewLeft = product.stock <= 5;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white border border-gray-150 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowQuickSize(false);
      }}
    >
      {/* Product Image Stage */}
      <div
        className="w-full aspect-square bg-gray-50 overflow-hidden relative cursor-pointer"
        onClick={() => onViewDetails(product.id)}
      >
        {/* Dynamic product badge indicators */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.bestSeller && (
            <span className="bg-black text-[#D4AF37] border border-black/10 text-[9px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full font-bold shadow-sm">
              BEST SELLER
            </span>
          )}
          {product.newArrival && (
            <span className="bg-gray-100 text-[#D4AF37] border border-gray-200 text-[9px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full font-bold shadow-sm">
              NEW ARRIVAL
            </span>
          )}
          {hasFewLeft && (
            <span className="bg-red-50 text-red-600 border border-red-200 text-[9px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full font-bold shadow-sm">
              BESPOKE RUN: ONLY {product.stock} LEFT
            </span>
          )}
        </div>

        {/* Wishlist Interactive Button */}
        <button
          onClick={(e) => onToggleWishlist(product.id, e)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-150 text-gray-500 hover:text-red-500 hover:border-gray-300 transition-all cursor-pointer shadow-sm"
          title={isWishlisted ? "Remove from Vault" : "Add to Vault"}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-130 ${
              isWishlisted ? 'fill-red-500 text-red-500 scale-110' : 'stroke-[1.5]'
            }`}
          />
        </button>

        {/* Multi-Angle Hover Switching */}
        <img
          src={hovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover-Overlay Action Drawer */}
        <div className="absolute inset-0 bg-[#FDFDFD]/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          {!showQuickSize ? (
            <div className="w-full flex space-x-2 animate-fade-in-up">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickSize(true);
                }}
                className="flex-1 bg-black text-white font-mono text-[10px] font-bold py-2.5 px-3 rounded tracking-widest hover:bg-[#D4AF37] transition-colors flex items-center justify-center space-x-1 uppercase cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>QUICK ADD</span>
              </button>
              <button
                onClick={() => onViewDetails(product.id)}
                className="bg-white border border-gray-300 text-gray-700 p-2.5 rounded hover:border-black hover:text-black transition-colors cursor-pointer"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-full bg-white/95 backdrop-blur-md p-2.5 rounded border border-gray-200 animate-fade-in text-center shadow-lg">
              <p className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mb-2">
                Select Your Size
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 max-h-20 overflow-y-auto">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAdd(size, e)}
                    className="w-8 h-8 rounded border border-gray-200 hover:border-black text-[10px] font-mono text-gray-700 hover:text-black transition-colors cursor-pointer"
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickSize(false);
                }}
                className="text-[9px] font-mono text-gray-500 hover:text-black uppercase tracking-widest mt-2 hover:underline block mx-auto py-1 cursor-pointer"
              >
                Cancel Selection
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info details */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10.5px] font-mono tracking-wider text-gray-500 mb-1.5">
            <span>{product.category}</span>
            <div className="flex items-center space-x-0.5 text-gray-500 font-mono">
              <Star className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37] stroke-none" />
              <span className="text-[10px] font-medium">{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => onViewDetails(product.id)}
            className="text-sm font-semibold text-black hover:text-[#D4AF37] transition-colors cursor-pointer truncate"
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 truncate mt-1">
            {product.tagline}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-150 pt-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-sm font-mono font-medium text-[#D4AF37]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className={`text-[9.5px] font-mono uppercase tracking-widest font-bold ${
            product.stock > 0 ? 'text-emerald-600' : 'text-red-500'
          }`}>
            {product.stock > 0 ? 'READY TO ORDER' : 'SOLD OUT'}
          </span>
        </div>
      </div>

    </div>
  );
}
