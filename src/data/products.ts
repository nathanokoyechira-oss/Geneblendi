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
  category: 'Furniture' | 'Decors' | 'Interiors';
  price: number;
  originalPrice?: number;
  rating: number;
  images: string[];
  colors: { name: string; class: string; value: string }[];
  sizes: string[];
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
    id: 'eh-01',
    name: 'Sovereign Bouclé Lounge Chair',
    tagline: 'Sculptural silhouette designed for sensory-rich relaxation.',
    category: 'Furniture',
    price: 920,
    originalPrice: 1100,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Oatmeal Bouclé', class: 'bg-[#F5F2EB]', value: '#F5F2EB' },
      { name: 'Sable Charcoal', class: 'bg-[#2B2B2A]', value: '#2B2B2A' },
      { name: 'Sage Velvet', class: 'bg-[#5C6656]', value: '#5C6656' }
    ],
    sizes: ['Standard Lounge', 'Grand Salon', 'Atelier Custom'],
    stock: 5,
    description: 'Our signature lounge masterpiece. Wrapped in deep textured Italian bouclé, the Sovereign lines emphasize fluid architectural shapes that cradle your skeletal contour perfectly while providing an elite aesthetic weight for minimal, warm living spaces.',
    details: [
      'Engineered solid beechwood interior frame structure',
      'Luxe, high-resilience memory fill layered with premium goose down',
      'Authentic certified organic merino wool bouclé textile',
      'Integrated hidden steel pivot glide leveling inserts'
    ],
    features: [
      'Designed exclusively as a statement lounge focal point',
      'Hand-tensioned stitching with lifetime seam assurance',
      'Delivered in white-glove wood crates with bespoke care kits'
    ],
    reviews: [
      { id: 'r1', author: 'Alexander M.', rating: 5, date: '2026-04-12', comment: 'The scale and presence of this chair is phenomenal. It truly anchors our living space.', verified: true },
      { id: 'r2', author: 'Sarah K.', rating: 4.9, date: '2026-05-01', comment: 'Extremely cozy and sculpturally flawless. Guests always notice it immediately.', verified: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'eh-02',
    name: 'Monolithic Travertine Coffee Table',
    tagline: 'Brutalist carved natural stone celebrating organic texture.',
    category: 'Furniture',
    price: 1450,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Tuscan Travertine', class: 'bg-[#EAE1D2]', value: '#EAE1D2' },
      { name: 'Bespoke Nero Marquina', class: 'bg-[#1C1C1E]', value: '#1C1C1E' }
    ],
    sizes: ['Classic Studio', 'Grande Residence'],
    stock: 3,
    description: 'Formed over millennia, this coffee table is carved entirely from solid Italian travertine stone. The surface is deliberately left partially unhoned to accent the natural pockets, fissures, and unique geologic narratives of the stone.',
    details: [
      '100% genuine honed solid travertine blocks',
      'Invisible reinforcement structural steel tie pins',
      'Acid-etched and pre-treated with organic food-safe protective wax seal',
      'Extremely sturdy weight of 85 kg'
    ],
    features: [
      'Raw fluted edge profile carved by master stone sculptors',
      'Zero engineered chemical composites or resins used',
      'Includes premium heavy felt protection floor slip sheets'
    ],
    reviews: [
      { id: 'r3', author: 'Dominique S.', rating: 5, date: '2026-05-20', comment: 'The travertine block is incredibly rich. Every piece has completely unique pockets. Stunning.', verified: true }
    ],
    featured: true,
    newArrival: true
  },
  {
    id: 'eh-03',
    name: 'Fluted Alabaster Arch Sconce',
    tagline: 'Direct, atmospheric glow diffused through hand-carved stone.',
    category: 'Interiors',
    price: 320,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Translucent White', class: 'bg-[#F9F6F0]', value: '#F9F6F0' },
      { name: 'Honey Honeycomb', class: 'bg-[#F2DCA5]', value: '#F2DCA5' }
    ],
    sizes: ['Single Sconce', 'Matching Symmetrical Duo'],
    stock: 14,
    description: 'Bring soft celestial illumination into corridors or bedrooms. Carved by hand to form an elegant shallow arch, raw Spanish alabaster acts as a powerful natural diffuser, washing walls with warm architectural backlighting.',
    details: [
      'Spanish alabaster stone diffuser shields',
      'Solid antique brushed brass mounting components',
      'Dimmable, low-draw premium warm-temperature LED panel included',
      'UL-listed electronics for pristine safety standard compliance'
    ],
    features: [
      'Unique semi-transparent stone grain patterning on every sconce',
      'Includes solid brass hand-screws and spacer sleeves',
      'Fully customizable dynamic flush mount hardware configurations'
    ],
    reviews: [
      { id: 'r4', author: 'Julian T.', rating: 5, date: '2026-05-18', comment: 'Produces the warmest, softest indirect glow. Highly recommend pair flanking a mirror.', verified: true }
    ],
    newArrival: true
  },
  {
    id: 'eh-04',
    name: 'Honed Travertine Pedestal',
    tagline: 'Architectural display plinth for prized gallery treasures.',
    category: 'Decors',
    price: 380,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Classic Cream Travertine', class: 'bg-[#ECE5D8]', value: '#ECE5D8' },
      { name: 'Nero Marble block', class: 'bg-zinc-900', value: '#18181B' }
    ],
    sizes: ['Tall Pedestal (36")', 'Medium Pedestal (28")', 'Tabletop Pedestal (12")'],
    stock: 8,
    description: 'Elevate your gallery. Hand-cut and finely wet-polished with a matte honed finish, this geometric plinth forms a perfect presentation anchor for pottery, plants, or abstract clay work.',
    details: [
      'Precision mitered monolithic geometric column',
      'Soft non-scratch chamfered frame borders',
      'Reinforced internal stability composite skeleton core'
    ],
    features: [
      'A true timeless minimal display layout',
      'Matte satin polish feels incredibly smooth to the touch',
      'Provides a perfect sculptural anchor for curated spaces'
    ],
    reviews: [
      { id: 'r5', author: 'Mia C.', rating: 5, date: '2026-06-03', comment: 'I place my dried foliage vase on this in the hallway, and it looks like a museum display.', verified: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'eh-05',
    name: 'Belgian Washed Linen Duvet Set',
    tagline: 'Unsurpassed breathability and soft organic relaxed drape.',
    category: 'Interiors',
    price: 260,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Dune Sand', class: 'bg-[#D2C5B4]', value: '#D2C5B4' },
      { name: 'Pure Chalk', class: 'bg-[#FAFAFA] border border-gray-200', value: '#FAFAFA' },
      { name: 'Silt Gray', class: 'bg-[#8F8D88]', value: '#8F8D88' }
    ],
    sizes: ['Queen Sleeper Suite', 'King Master Suite'],
    stock: 12,
    description: 'Crafted from premium certified flax grown inside Belgium, our linen duvet undergoes a natural quartz wash treatment. It arrives exceptionally soft, highly breathable, and drapes with elegant slouchy poise.',
    details: [
      '100% natural long-staple flax linen textiles',
      'Double-stitched safety seams with raw edge look highlights',
      'Includes duvet cover and two hand-enveloping standard shams'
    ],
    features: [
      'Naturally thermo-regulating fibers stay cool in summer, warm in winter',
      'Beautiful organic texture that grows softer with every washing cycle',
      'Fastened by hand-sewn coconut shell interior buttons'
    ],
    reviews: [
      { id: 'r6', author: 'Clara del P.', rating: 5, date: '2026-06-08', comment: 'The texture is incredibly raw and elegant. I never want to sleep on cotton again!', verified: true }
    ],
    featured: true,
    newArrival: true
  },
  {
    id: 'eh-06',
    name: 'Fluted Terracotta Vessel',
    tagline: 'Baked earthen clay capturing centuries of rustic Nigerian pottery.',
    category: 'Decors',
    price: 185,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Baked Umber', class: 'bg-[#C06C4C]', value: '#C06C4C' },
      { name: 'Chalk White Glaze', class: 'bg-[#F2EEED]', value: '#F2EEED' }
    ],
    sizes: ['Tabletop 14"', 'Floor Large 22"'],
    stock: 20,
    description: 'A striking meeting of organic soil and fire. Molded using traditional methods by expert regional ceramists, each pot features hand-scraped fluting lines styled to create subtle shadows in ambient daylight.',
    details: [
      '100% organic locally-sourced riverbed clays',
      'Individually wood-fired inside traditional outdoor kilns',
      'Water-resistant internal glaze coating'
    ],
    features: [
      'Textured raw earthen finish preserves tool marks and natural soot gradients',
      'Thick, highly durable structural walls prevent stress-cracks',
      'Works beautifully as standalone dry-stem display piece'
    ],
    reviews: [
      { id: 'r7', author: 'Oliver G.', rating: 4.8, date: '2026-06-05', comment: 'The soot marks on the raw clay are incredibly gorgeous. Brings instant organic warmth.', verified: true }
    ]
  },
  {
    id: 'eh-07',
    name: 'Raw Silk Accent Pillow Trio',
    tagline: 'Sumptuous tactile richness hand-spun into pure dupioni silk.',
    category: 'Decors',
    price: 150,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Ochre Amber', class: 'bg-[#D4A359]', value: '#D4A359' },
      { name: 'Moss Olive', class: 'bg-[#606E54]', value: '#606E54' }
    ],
    sizes: ['Set of 3 (18" x 18")', 'Atelier Single Accent'],
    stock: 19,
    description: 'Indulge in organic beauty. These pure dupioni silk pillows feature heavy wild-slub threading, creating a warm tactile sheen that pairs gracefully with rough linen or velvet sofas.',
    details: [
      'Hand-woven wild silk casing covers with neat hidden zips',
      '95% premium down / 5% duck feather pillow inserts included',
      'Spun and woven by a rural women cooperative'
    ],
    features: [
      'Raw, unrefined silk textures catch light in dynamic, glossy waves',
      'Double-stitched structural piping protects seams from fraying',
      'Hypoallergenic feather-proof heavy cotton inner guards'
    ],
    reviews: [
      { id: 'r8', author: 'Julien T.', rating: 5, date: '2026-05-30', comment: 'Incredibly plump fill, and the slub silk material has a very expensive sheen.', verified: true }
    ],
    newArrival: true
  },
  {
    id: 'eh-08',
    name: 'Solid White Oak Credenza',
    tagline: 'Meticulously crafted storage with seamless sliding tambours.',
    category: 'Furniture',
    price: 1850,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Bleached Oak', class: 'bg-[#EADECE]', value: '#EADECE' },
      { name: 'Ebonized Walnut', class: 'bg-[#3A3530]', value: '#3A3530' }
    ],
    sizes: ['60" Credenza', '72" Grand Centerpiece'],
    stock: 2,
    description: 'The epitome of heritage woodworking. Highlighted by seamless wrapping solid wood tambour panels, this master cabinet offers extensive internal shelving, soft-close drawers, and elegant wire management ports.',
    details: [
      'Sustainably harvested FSC-certified solid European white oak',
      'Extremely smooth natural Danish oil and matte satin polyurethane coat',
      'Precision precision wood mortise-and-tenon joints throughout'
    ],
    features: [
      'Tambour doors slide smoothly into internal pockets to reveal beautiful storage spaces',
      'Subtle integrated solid wood handles milled directly into frames',
      'Hand-numbered and registered by chief cabinetmaker'
    ],
    reviews: [
      { id: 'r9', author: 'Edward H.', rating: 5, date: '2026-05-02', comment: 'Bespoke heirloom quality. The tambour door action is whisper-quiet and satisfyingly smooth.', verified: true }
    ],
    featured: true,
    bestSeller: true
  }
];
