export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Men\'s Sneakers' | 'Women\'s Sneakers' | 'Running Shoes' | 'Casual Shoes' | 'Luxury Footwear';
  price: number;
  originalPrice?: number;
  rating: number;
  images: string[];
  colors: { name: string; class: string; value: string }[];
  sizes: number[];
  stock: number;
  description: string;
  details: string[];
  features: string[];
  reviews: Review[];
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'gb-01',
    name: 'Blendi Onyx Runner',
    tagline: 'Precision engineered for high-performance comfort.',
    category: 'Running Shoes',
    price: 245,
    originalPrice: 295,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Onyx Red', class: 'bg-red-600', value: '#DC2626' },
      { name: 'Pure Obsidian', class: 'bg-zinc-900', value: '#18181B' },
      { name: 'Chrono White', class: 'bg-stone-100 border border-zinc-200', value: '#F5F5F4' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    stock: 8,
    description: 'A masterpiece of precision, the Blendi Onyx Runner merges cutting-edge responsive sole architecture with breathable lightweight luxury PrimeKnit mesh. Designed to propel you forward while maintaining an elegant aesthetic presence.',
    details: [
      'Responsive cellular cushioning system',
      'Aerograd mesh upper with seamless reinforcement overlays',
      'Slip-resistant vulcanized rubber outsole styled with gold traction matrices',
      'Weight: 260g (Reference size US 9)'
    ],
    features: [
      'Proprietary Blendi-Bounce shock absorbing heel',
      'Sleek structural form with light-reflective piping',
      'Signature metallic-finish gold logo accent'
    ],
    reviews: [
      { id: 'r1', author: 'Alexander M.', rating: 5, date: '2026-04-12', comment: 'The spring in these is phenomenal. Felt like walking on high-performance clouds from the first mile.', verified: true },
      { id: 'r2', author: 'Sarah K.', rating: 4.8, date: '2026-05-01', comment: 'Spectacular styling. I wear them to workouts and high-end casual brunches alike.', verified: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'gb-02',
    name: 'Aurelia Minimalist Court',
    tagline: 'Timeless hand-crafted premium leather silhouette.',
    category: 'Luxury Footwear',
    price: 380,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Alabaster Ivory', class: 'bg-amber-50 border border-amber-200/50', value: '#FFFBEB' },
      { name: 'Sahara Sand', class: 'bg-amber-100', value: '#FEF3C7' },
      { name: 'Midnight Charcoal', class: 'bg-zinc-850', value: '#27272A' }
    ],
    sizes: [6, 7, 8, 9, 10],
    stock: 14,
    description: 'Constructed from butter-soft top-grain calfskin leather, the Aurelia Minimalist Court is tailored with precise artisan stitching. The perfect everyday luxury statement that elevates tailored suits and relaxed denim effortlessly.',
    details: [
      'Handcrafted in Lagos from full-grain nap leather',
      'Ultra-soft natural calfskin interior lining for barefoot comfort',
      'Waxed cotton premium flat laces',
      'Margom-style durable premium rubber cupsole'
    ],
    features: [
      'Ergonomic cork-cushioned footbed that molds to your unique arch',
      'Subtle metallic serial number stamped discreetly on the heel outer',
      'Included luxury protective linen storage travel bag'
    ],
    reviews: [
      { id: 'r3', author: 'Domenico S.', rating: 5, date: '2026-05-20', comment: 'Absolute perfection. The leather quality rivals houses charging twice the price.', verified: true },
      { id: 'r4', author: 'Claire F.', rating: 4, date: '2026-06-02', comment: 'Slightly narrow at first, but after three days of wear, they formed beautifully to my feet.', verified: true }
    ],
    featured: true,
    newArrival: true
  },
  {
    id: 'gb-03',
    name: 'Vanguard Cyber-Knit',
    tagline: 'Futuristic technical mesh with dynamic architectural soles.',
    category: 'Men\'s Sneakers',
    price: 210,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cyber Neon Green', class: 'bg-lime-500', value: '#84CC16' },
      { name: 'Sleek Onyx', class: 'bg-zinc-900', value: '#18181B' }
    ],
    sizes: [8, 9, 10, 11, 12],
    stock: 5,
    description: 'Push boundaries. The Vanguard Cyber-Knit blends high-visibility hyper-molded neon structures with extreme rebound soles. It commands attention while providing incredible architectural foot support.',
    details: [
      'Molded structural high-rebound TPU cages',
      'Cyber-weave moisture-wicking synthetic matrix upper',
      'Low-profile integrated orthotic footbed insert'
    ],
    features: [
      'Unique neon shock absorbers built directly into geometric sole',
      '30% ultra-recycled performance compound construction',
      'Dual pull tabs for quick aerodynamic slip-on access'
    ],
    reviews: [
      { id: 'r5', author: 'Marcus V.', rating: 5, date: '2026-05-25', comment: 'The design is unreal! I constantly get stopped and asked what brand these are.', verified: true }
    ],
    newArrival: true
  },
  {
    id: 'gb-04',
    name: 'Blendi Pastel Prism',
    tagline: 'Vibrant artistic tones for individualist expression.',
    category: 'Women\'s Sneakers',
    price: 195,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Multi-Color Prism', class: 'bg-gradient-to-r from-pink-300 via-indigo-300 to-yellow-200', value: 'prism' },
      { name: 'Soft Orchid', class: 'bg-pink-100', value: '#FCE7F3' }
    ],
    sizes: [5, 6, 7, 8, 9],
    stock: 11,
    description: 'Make a statement of joy. Blendi Pastel Prism features a delightful intersection of lavender, soft apricot, and retro teal accents wrapped in premium distressed suede panels.',
    details: [
      'Genuine double-nap velvet suede panels',
      'High-impact absorbing micro-cellular rubber midsoles',
      'Reinforced comfort eyelets with gold trim lace tips'
    ],
    features: [
      'Beautiful multi-tonal aesthetic paneling',
      'Featherweight luxury build under 210g',
      'Signature pastel dust-cover presentation box included'
    ],
    reviews: [
      { id: 'r6', author: 'Chloe T.', rating: 5, date: '2026-06-01', comment: 'Absolutely in love with the pastel colorways! They match almost anything in my summer wardrobe.', verified: true },
      { id: 'r7', author: 'Evelyn P.', rating: 4.8, date: '2026-06-10', comment: 'Extremely soft material. Zero breaking-in period required.', verified: true }
    ],
    bestSeller: true
  },
  {
    id: 'gb-05',
    name: 'Chelsea Sovereign Boot',
    tagline: 'Premium leather Chelsea elegance with heavy grip soles.',
    category: 'Luxury Footwear',
    price: 420,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Raven Black Leather', class: 'bg-neutral-900', value: '#171717' },
      { name: 'Heritage Suede Brown', class: 'bg-amber-900', value: '#78350F' }
    ],
    sizes: [8, 9, 10, 11, 12, 13],
    stock: 4,
    description: 'Crafted for modern royalty. This luxurious Chelsea boot blends fine polished calf leather with flexible, double-stitched deep-tread soles so you remain tall, poised, and grounded.',
    details: [
      'Custom deep pull loops with gold weave detailing',
      'High elastomeric dual gusset side entries',
      'Storm-welted seal for maximum moisture protection'
    ],
    features: [
      'Hand-burnished leather finish with a subtle sheen',
      'Sturdy steel shank for supreme Arch support',
      'Can be resoled multiple times for a lifetime of luxury'
    ],
    reviews: [
      { id: 'r8', author: 'Edward H.', rating: 5, date: '2026-05-02', comment: 'These boot structures are incredible. The absolute pinnacle of Chelsea elegance.', verified: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'gb-06',
    name: 'Apex Air Marathoner',
    tagline: 'Ultralight feather knit optimized for endurance speed.',
    category: 'Running Shoes',
    price: 275,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Alabaster / Carbon', class: 'bg-slate-400', value: '#94A3B8' },
      { name: 'Velocity Cyan', class: 'bg-cyan-500', value: '#06B6D4' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    stock: 15,
    description: 'The Apex Air Marathoner represents the apex of sporting high-tech. Integrating carbon fiber flight plate tech coupled with lightweight memory reactive foam, it offers supreme stride energy feedback.',
    details: [
      '3D-curved carbon fiber propulsion plate',
      'Form-conforming airy knit structure',
      'Super-sticky high fatigue threshold treading'
    ],
    features: [
      'Dynamic power transition heel profile',
      'Extremely light 190g racing density',
      'Breathability vents for all-weather racing comfort'
    ],
    reviews: [
      { id: 'r9', author: 'Nils O.', rating: 5, date: '2026-05-18', comment: 'My race times decreased by 15 seconds a mile. Highly recommended.', verified: true }
    ]
  },
  {
    id: 'gb-07',
    name: 'Blendi Luxe Suede Loafer',
    tagline: 'Refined comfort for effortless elegant smart casual living.',
    category: 'Casual Shoes',
    price: 310,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Cognac Gold Brown', class: 'bg-amber-800', value: '#92400E' },
      { name: 'Classic Charcoal Blue', class: 'bg-slate-800', value: '#1E293B' }
    ],
    sizes: [8, 9, 10, 11, 12],
    stock: 6,
    description: 'Exquisite comfort without laces. Handcrafted with beautiful double-stitched premium calf suede, this luxury loafer brings refined charm to summer outings, beach clubs, and classy dinners.',
    details: [
      'Durable soft-brushed genuine premium suede',
      'Custom gold buckle embellishment accent',
      'Padded anti-friction heel counter slip'
    ],
    features: [
      'Extremely flexible grip driving soles',
      'Premium leather instep cushioning',
      'Pre-treated protective coating shields from dirt'
    ],
    reviews: [
      { id: 'r10', author: 'Julien T.', rating: 4.5, date: '2026-05-30', comment: 'Supremely elegant look. Looks rich, feels extremely comfy.', verified: true }
    ],
    newArrival: true
  },
  {
    id: 'gb-08',
    name: 'Astral White Velvet Court',
    tagline: 'Clean white sneaker upgraded with luxury velvet trim.',
    category: 'Women\'s Sneakers',
    price: 260,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Celestial White Gold', class: 'bg-white border select-amber-100', value: '#FFFFFF' },
      { name: 'Blush Velvet Dust', class: 'bg-pink-100', value: '#FBCFE8' }
    ],
    sizes: [6, 7, 8, 9, 10],
    stock: 12,
    description: 'Elevate your daily stroll. Blending architectural white contours with golden heels and velvety accents, this classic women’s tennis trainer redefines premium simplicity.',
    details: [
      'Triple white grain and velvet panel assembly',
      'Discrete cushioned gold leaf crown badge',
      'Impact absorbing compound footbeds'
    ],
    features: [
      'A true timeless minimal silhouette design',
      'Water resistant shell coatings',
      'Gold eyelets and custom metal branding plates'
    ],
    reviews: [
      { id: 'r11', author: 'Mia C.', rating: 5, date: '2026-06-03', comment: 'Stunning design! The white stays surprisingly clean, and the tiny gold finish is super fancy.', verified: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'gb-09',
    name: 'Blendi Retro Retroscape',
    tagline: 'Duo-tone retro canvas sneakers for modern curators.',
    category: 'Casual Shoes',
    price: 185,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Forte Red', class: 'bg-red-700', value: '#B91C1C' },
      { name: 'Onyx Black Stripe', class: 'bg-zinc-900', value: '#18181B' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    stock: 20,
    description: 'Heritage street aesthetic meets state-of-the-art foot-bed comfort. This classic distressed vulcanized low-rise has double-reinforced canvas with protective front caps and custom brass eyelets.',
    details: [
      'Heavy-duty 16oz raw military cotton canvas',
      'Signature brass ventilation brass eyelet rings',
      'Triple vulcanized structural foot walls'
    ],
    features: [
      'Extra cushioning memory foam inner sole',
      'Classic heritage side stars custom-stitch',
      'High friction heavy chevron grip patterns'
    ],
    reviews: [
      { id: 'r12', author: 'Oliver G.', rating: 4.8, date: '2026-06-05', comment: 'Very sturdy, looks amazing with cuffed trousers. Durable vulcanized side rubber!', verified: true }
    ]
  },
  {
    id: 'gb-10',
    name: 'Elysium Knit Runner',
    tagline: 'Breathtakingly comfortable sock-like knit lifestyle trainers.',
    category: 'Men\'s Sneakers',
    price: 230,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Amber Gold Fusion', class: 'bg-yellow-600', value: '#D97706' },
      { name: 'Neutral Dune', class: 'bg-orange-100', value: '#FFEDD5' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    stock: 9,
    description: 'The Elysium Knit sports a sophisticated weave pattern that fits perfectly like a custom technical sock. Supported by premium elastic support laces and architectural shock-gaps, it pairs beautifully with high streetwear wear.',
    details: [
      'Advanced 3D warp knit seamless construction',
      'Sleek elastic bungee compression laces',
      'Double density impact reaction midsole layers'
    ],
    features: [
      'Unbelievably snug sock collar design fits true to shape',
      'Laser-vented thermal extraction zones',
      'Heel safety stabilizing balance plates'
    ],
    reviews: [
      { id: 'r13', author: 'Liam S.', rating: 5, date: '2026-04-20', comment: 'Like slipping into a custom glove for your feet. Hands down the coziest shoes I own.', verified: true }
    ],
    newArrival: true
  },
  {
    id: 'gb-11',
    name: 'Suede Seraph Trail-Knit',
    tagline: 'Heavily rugged lifestyle hiker merged with premium materials.',
    category: 'Casual Shoes',
    price: 280,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Taupe Forest', class: 'bg-emerald-800', value: '#064E3B' },
      { name: 'Dune Sand', class: 'bg-stone-300', value: '#D6D3D1' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    stock: 7,
    description: 'Conquer urban mountains with grace. Built with premium water-repellent performance suede, a rubber protective toe mudguard, and high strength trail laces with discrete direct gold weave.',
    details: [
      'Fine Kano split calf suede panels',
      'Heavy lugged rubber Vibram-inspired grip soles',
      'Dampening layers for extreme pavement walking shock'
    ],
    features: [
      'Premium metal speed harness hooks',
      'Integrated storm shield guard gussets',
      'Durable custom reinforced double lines'
    ],
    reviews: [
      { id: 'r14', author: 'Henry T.', rating: 4.7, date: '2026-05-11', comment: 'Fantastic trail elements. Outstanding premium feeling.', verified: true }
    ]
  },
  {
    id: 'gb-12',
    name: 'Blendi Sovereign Court Low',
    tagline: 'Hand stitched bespoke sneaker with sleek profile.',
    category: 'Luxury Footwear',
    price: 450,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Sovereign White Gold', class: 'bg-stone-50 border select-amber-100', value: '#FAF9F6' },
      { name: 'Luxury Onyx Gold', class: 'bg-neutral-850', value: '#262626' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    stock: 3,
    description: 'The ultimate signature Gene Bendi asset. Fully lined in glove leather with bespoke double welt construction and micro hand engraving. Adorned with a solid gold-plated brand badge near the top lace.',
    details: [
      'Fully lined in buttery soft French calfskin',
      'Signature real gold plated signature hardware brand medallion',
      'Entirely handcrafted in Lagos, Nigeria'
    ],
    features: [
      'Limitless refinement, individual production numbering',
      'Unsurpassed walking alignment and comfort core',
      'Arrives inside handmade velvet presentation box with solid cedar shoe stabilizers'
    ],
    reviews: [
      { id: 'r15', author: 'Clara del P.', rating: 5, date: '2026-06-08', comment: 'This is not just footwear, it is a magnificent work of high craftsmanship. Worth every single cent.', verified: true }
    ],
    featured: true,
    newArrival: true
  }
];
