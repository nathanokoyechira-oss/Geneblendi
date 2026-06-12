import React from 'react';
import { Mail, Phone, MapPin, Shield, Truck, RotateCcw, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="main-footer" className="bg-white text-gray-600 border-t border-gray-100">
      
      {/* Brand Value Propositions Pre-Footer */}
      <div className="border-b border-gray-100 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="flex items-start space-x-4">
            <div className="bg-white p-3 rounded-lg border border-gray-200 text-[#D4AF37]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-black uppercase tracking-widest font-mono">
                Free Delivery
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Complimentary express delivery worldwide on all original orders.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-white p-3 rounded-lg border border-gray-200 text-[#D4AF37]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-black uppercase tracking-widest font-mono">
                Easy Returns
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Risk-free aesthetic sizing with a 30-day elegant dropoff cycle.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-white p-3 rounded-lg border border-gray-200 text-[#D4AF37]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-black uppercase tracking-widest font-mono">
                Authentic Guarantee
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Individually certified with bespoke designer-signed serial labels.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-white p-3 rounded-lg border border-gray-200 text-[#D4AF37]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-black uppercase tracking-widest font-mono">
                Premium Materials
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Grade-A solid hardwoods, premium linen overlays, and organic handwoven metals.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Sitemap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Block */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-black tracking-wide text-luxury leading-tight">
            Helyn hills <span className="text-xs tracking-normal font-sans font-normal text-gray-500 lowercase block">interiors</span>
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm font-light">
            Helyn Hills interiors curates the apex of high-end, artisanally crafted designer furniture, statement decor solutions, and boutique internal structures. We leverage timeless organic carving sensibilities with mid-century minimalist profiles.
          </p>
          <div className="flex space-x-4 pt-2">
            {['Instagram', 'Pinterest', 'Vimeo', 'X'].map((social) => (
              <a
                key={social}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-gray-400 hover:text-[#D4AF37] font-mono tracking-wider transition-colors"
              >
                {social.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Collection Sitemap */}
        <div>
          <h4 className="text-xs font-bold font-mono tracking-[0.2em] text-black uppercase mb-6">
            PRODUCT LINES
          </h4>
          <ul className="space-y-3 text-xs text-gray-650">
            {['Luxury Furniture', 'Bespoke Decors', 'Artisanal Interiors', 'Handcrafted Collections', 'New Releases'].map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Informational Sitemap */}
        <div>
          <h4 className="text-xs font-bold font-mono tracking-[0.2em] text-black uppercase mb-6">
            THE HOUSE
          </h4>
          <ul className="space-y-3 text-xs text-gray-650">
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                Maison Legacy & Timber
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                Boutique Showrooms
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('faq')} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                FAQ & Custom Commissions
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                Design Consultation
              </button>
            </li>
          </ul>
        </div>

        {/* Contact/HQ details */}
        <div>
          <h4 className="text-xs font-bold font-mono tracking-[0.2em] text-black uppercase mb-6">
            CONCIERGE HQ
          </h4>
          <ul className="space-y-4 text-xs text-gray-650">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                12, Cooper Road, Ground level,<br />
                Ikoyi, Lagos, Nigeria
              </span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>+234 (1) 8000 4242</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="break-all select-all">concierge@helynhills.design</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Extreme Fine Print / Certifications of Compliance */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-mono tracking-widest">
          <div>
            &copy; {new Date().getFullYear()} HELYN HILLS INTERIORS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex space-x-6 text-[10px] uppercase">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors font-semibold">Privacy Charter</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors font-semibold">Terms of Craft</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors font-semibold">Cookies Strategy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors font-semibold">Authenticity Tracker</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
