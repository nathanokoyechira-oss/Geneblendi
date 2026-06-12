import React, { useState } from 'react';
import { Product } from '../data/products';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Truck, 
  CheckCircle, 
  PlusCircle, 
  ArrowLeft,
  Award,
  Package,
  Layers,
  List,
  Eye,
  Settings
} from 'lucide-react';

interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
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

interface OwnerPortalSectionProps {
  orderHistory: OrderHistoryEntry[];
  onUpdateOrderStatus: (orderId: string, status: string) => void;
  onSimulateOrder: () => void;
  onNavigate: (route: string) => void;
  products: Product[];
}

export default function OwnerPortalSection({
  orderHistory,
  onUpdateOrderStatus,
  onSimulateOrder,
  onNavigate,
  products
}: OwnerPortalSectionProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'matrix'>('orders');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [successAnimation, setSuccessAnimation] = useState<boolean>(false);

  // Math Metrics
  const totalRevenue = orderHistory.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalOrders = orderHistory.length;
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  
  const totalPairsSold = orderHistory.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0);

  // Status lists
  const PIPELINE_STATUSES = [
    { value: 'DESIGN COMMISSION & VERIFICATION', label: '1. Commission Verified' },
    { value: 'SOLID TIMBER & STONE SELECTION', label: '2. Material Selection' },
    { value: 'HAND SCULPTING & JOINERY CRAFTING', label: '3. Handcrafting Joint' },
    { value: 'ORGANIC BEESWAX RUB & UPHOLSTERY', label: '4. Polishing & Finishing' },
    { value: 'WHITE-GLOVE ATELIER TRANSIT DISPATCH', label: '5. In Transit' },
    { value: 'DELIVERED & INSTALLED SECURELY IN RESIDENCE', label: '6. Delivered & Installed' }
  ];

  // Product sales chart metrics compilation
  const productStats = products.map((prod) => {
    const qtySold = orderHistory.reduce((sum, ord) => {
      const match = ord.items.find((item) => item.product.id === prod.id);
      return sum + (match ? match.quantity : 0);
    }, 0);
    const revenue = qtySold * prod.price;
    return {
      product: prod,
      qtySold,
      revenue
    };
  }).sort((a, b) => b.revenue - a.revenue);

  // Filter actual orders
  const filteredOrders = orderHistory.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingDetails?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingDetails?.city?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'transit') return matchesSearch && order.status.includes('TRANSIT');
    if (filterStatus === 'assembly') return matchesSearch && (order.status.includes('SELECTION') || order.status.includes('CRAFTING') || order.status.includes('COMMISSION') || order.status.includes('BEESWAX'));
    if (filterStatus === 'delivered') return matchesSearch && order.status.includes('DELIVERED');
    return matchesSearch;
  });

  const triggerSimulateOrder = () => {
    onSimulateOrder();
    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
    }, 1200);
  };

  return (
    <div id="owner-portal-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 bg-[#FCFCFC] text-black">
      
      {/* 1. Header Banner */}
      <div className="border-b border-gray-200 pb-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[#D4AF37]">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-bold text-[#D4AF37]">HELYN HILLS ATELIER PRIVATE PORTAL</span>
          </div>
          <h1 className="text-4xl font-serif tracking-tight text-black uppercase">
            Owner Atelier Sales Central
          </h1>
          <p className="text-xs text-gray-500 font-light leading-relaxed max-w-xl">
            Atelier Owner Portal for tracking customer orders, updating delivery milestone stages, and viewing sales analytics.
          </p>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-300 text-xs px-4 py-2.5 rounded font-mono tracking-widest uppercase transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Main Maison</span>
        </button>
      </div>

      {/* 2. Top-Level Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Total revenue metrics */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">TOTAL ATELIER REVENUE</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-[#D4AF37] flex items-center justify-center">
              <DollarSign className="w-4 h-4 font-bold" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-mono text-black font-semibold">${totalRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-600 font-medium block">&bull; Kano & Lagos ledger consolidated</span>
          </div>
        </div>

        {/* Volume of sales */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">ACCREDITED VOLUMES</span>
            <div className="w-8 h-8 rounded-full bg-gray-50 text-black flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-mono text-black font-semibold">{totalOrders}</span>
            <span className="text-[10px] text-gray-500 font-medium block">Completed custom bookings</span>
          </div>
        </div>

        {/* Average Order Value stats */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">AVERAGE TICKET (AOV)</span>
            <div className="w-8 h-8 rounded-full bg-[#FCF8EC] text-[#D4AF37] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-mono text-black font-semibold">${aov}</span>
            <span className="text-[10px] text-gray-500 block">High-fashion basket average</span>
          </div>
        </div>

        {/* Custom pieces crafted metrics */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">PIECES CRAFTED</span>
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-mono text-black font-semibold">{totalPairsSold} units</span>
            <span className="text-[10px] text-teal-600 font-medium block">&bull; Gold medallion stamped</span>
          </div>
        </div>

      </div>

      {/* 3. Logical Tab switch triggers */}
      <div className="flex border-b border-gray-200 mb-8 space-x-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 text-xs sm:text-sm font-semibold tracking-wider font-mono transition-all relative cursor-pointer flex items-center space-x-2 ${
            activeTab === 'orders' ? 'text-[#D4AF37] font-bold' : 'text-gray-500 hover:text-black'
          }`}
        >
          <List className="w-4 h-4" />
          <span>CLIENT COMMISSIONS ({orderHistory.length})</span>
          {activeTab === 'orders' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-4 text-xs sm:text-sm font-semibold tracking-wider font-mono transition-all relative cursor-pointer flex items-center space-x-2 ${
            activeTab === 'products' ? 'text-[#D4AF37] font-bold' : 'text-gray-500 hover:text-black'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>BESPOKE PRODUCTS ({products.length})</span>
          {activeTab === 'products' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`pb-4 text-xs sm:text-sm font-semibold tracking-wider font-mono transition-all relative cursor-pointer flex items-center space-x-2 ${
            activeTab === 'matrix' ? 'text-[#D4AF37] font-bold' : 'text-gray-500 hover:text-black'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>MATRIX & DIRECTIVES</span>
          {activeTab === 'matrix' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />
          )}
        </button>
      </div>

      {/* 4. Tab Workspace Content view switcher */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
            
            {/* Sales table header controllers */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <h3 className="text-xs font-bold font-mono tracking-widest text-gray-800 uppercase">
                  ACTIVE DEPUTY ORDER PORTFOLIOS ({filteredOrders.length})
                </h3>
                <p className="text-xs text-gray-400">
                  Select and modify sizing stage metrics to update active customer tracing flight systems.
                </p>
              </div>

              {/* simulated seeder buttons */}
              <button
                onClick={triggerSimulateOrder}
                className={`flex items-center space-x-2 bg-black text-white hover:bg-[#D4AF37] font-mono text-[10px] font-bold py-2.5 px-4 rounded tracking-wider transition-all uppercase cursor-pointer ${
                  successAnimation ? 'bg-emerald-600 scale-102' : ''
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{successAnimation ? 'VIP Sale Injected!' : 'Simulate VIP Sale'}</span>
              </button>
            </div>

            {/* Filter controls row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Filter by Order ID Reference, Name, or City Hub..."
                  className="w-full bg-[#FAFAFA] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex border border-gray-200 rounded overflow-hidden divide-x divide-gray-200 font-mono text-[10px] bg-white h-fit">
                {[
                  { id: 'all', label: 'ALL SALES' },
                  { id: 'assembly', label: 'ASSEMBLY' },
                  { id: 'transit', label: 'IN TRANSIT' },
                  { id: 'delivered', label: 'DELIVERED' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilterStatus(item.id)}
                    className={`px-3 py-2.5 uppercase font-bold tracking-wider hover:bg-gray-50 transition-colors cursor-pointer ${
                      filterStatus === item.id ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders list Cards */}
            {filteredOrders.length > 0 ? (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="border border-gray-150 rounded-lg p-5 hover:border-gray-300 bg-white transition-all space-y-4 shadow-xs"
                  >
                    
                    {/* card first row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">ORDER UNIQUE LEDGER</span>
                        <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase">{order.id}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">REGISTERED DATE</span>
                        <span className="text-xs font-mono text-gray-650">{order.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">AUDITED TOTAL</span>
                        <span className="text-xs font-mono text-black font-semibold">${order.totalPrice}</span>
                      </div>
                    </div>

                    {/* Customer information details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-gray-50 rounded space-y-1.5">
                        <span className="text-[9px] font-mono text-gray-400 block uppercase tracking-wider">CONSIGNMENT ADDR</span>
                        <p className="font-semibold text-gray-800">{order.shippingDetails?.name}</p>
                        <p className="text-gray-500">{order.shippingDetails?.address}</p>
                        <p className="text-gray-500 font-medium">
                          {order.shippingDetails?.zip} &bull; {order.shippingDetails?.city}, {order.shippingDetails?.country}
                        </p>
                        <p className="text-gray-500 text-[10.5px] font-mono">PH: {order.shippingDetails?.phone}</p>
                      </div>

                      {/* Item specifics list */}
                      <div className="p-3 bg-[#FCFAF5] border border-amber-50/50 rounded space-y-2">
                        <span className="text-[9px] font-mono text-[#D4AF37] block uppercase tracking-wider">ITEMS SPECIFICATION</span>
                        <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-start text-[11px]">
                              <span className="text-gray-800 font-semibold flex items-center space-x-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                <span>{item.product.name} ({item.selectedSize})</span>
                                <span className="text-[10px] text-gray-400 italic">({item.selectedColor})</span>
                              </span>
                              <span className="font-mono text-gray-500 font-bold ml-2 shrink-0">
                                x{item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* interactive courier track update select state */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center pt-2 gap-4 bg-gray-50/80 p-3 rounded border border-gray-100">
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
                        <span className="text-gray-500 text-[10.5px] font-semibold uppercase font-mono">FLOW DISPATCH PIPELINE</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          aria-label="Delivery pipeline tracking state update"
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono cursor-pointer"
                        >
                          {PIPELINE_STATUSES.map((stat, idx) => (
                            <option key={idx} value={stat.value}>
                              {stat.label}
                            </option>
                          ))}
                        </select>
                        
                        <div 
                          className="text-[9.5px] font-mono px-2 py-1 rounded bg-amber-50 text-[#D4AF37] border border-amber-100 uppercase"
                          title="Raw display matching current customer portal exactly."
                        >
                          Matching CRM status
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200 text-gray-500 text-xs">
                No orders identified matching the status selection criteria.
              </div>
            )}

          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="text-xs font-bold font-mono tracking-widest text-gray-800 uppercase border-b border-gray-100 pb-3">
              BESPOKE PRODUCTS CATALOG ({productStats.length} DESIGNS AVAILABLE)
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed max-w-2xl">
              An exhaustive summary of active bespoke product items from your design workshop catalogs. Track direct stock levels and live accrued sales calculations seamlessly for each piece.
            </p>

            {/* Product catalog matrix grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {productStats.map((stat) => {
                const p = stat.product;
                return (
                  <div key={p.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col hover:border-[#D4AF37] transition-all">
                    
                    {/* Catalog Image with Badges */}
                    <div className="relative h-48 w-full bg-gray-50 border-b border-gray-100">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center animate-fade-in"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-[9px] font-mono tracking-widest text-[#D4AF37] font-bold border border-[#D4AF37]/20 uppercase">
                        {p.category}
                      </div>
                      
                      {p.stock <= 3 ? (
                        <div className="absolute top-3 right-3 bg-rose-50 px-2.5 py-1 rounded text-[9px] font-mono text-rose-600 font-bold border border-rose-100 uppercase">
                          LOW STOCK: {p.stock} LEFT
                        </div>
                      ) : (
                        <div className="absolute top-3 right-3 bg-teal-50 px-2.5 py-1 rounded text-[9px] font-mono text-teal-600 font-bold border border-teal-100 uppercase animate-pulse">
                          HEALTHY STOCK: {p.stock}
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      
                      {/* Name tags and descriptions */}
                      <div className="space-y-1.5 text-left">
                        <span className="text-[10px] font-mono text-gray-400">ID REFERENCE: eh-{p.id.toUpperCase()}</span>
                        <h4 className="text-sm font-semibold text-black tracking-tight leading-snug">{p.name}</h4>
                        <p className="text-xs text-gray-500 font-light line-clamp-2 leading-relaxed">{p.tagline}</p>
                      </div>

                      {/* Technical and financial details mapping */}
                      <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-gray-400 block text-[9px] uppercase">CREATION PRICE</span>
                          <span className="text-black font-semibold text-sm">${p.price}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[9px] uppercase">TOTAL UNITS SOLD</span>
                          <span className="text-gray-800 font-semibold text-sm">{stat.qtySold} units</span>
                        </div>
                      </div>

                      {/* Cumulative revenue generated */}
                      <div className="pt-2 bg-gradient-to-r from-gray-50 to-amber-50/20 p-2.5 rounded border border-gray-100 flex justify-between items-center text-xs font-mono">
                        <span className="text-gray-500 font-semibold uppercase text-[9.5px]">CUMULATIVE REVENUE</span>
                        <span className="text-[#D4AF37] font-bold text-sm">${stat.revenue.toLocaleString()}</span>
                      </div>

                      {/* Action buttons */}
                      <button
                        onClick={() => onNavigate('shop')}
                        className="w-full bg-white hover:bg-gray-50 border border-gray-200 hover:border-black text-black font-mono text-[10px] font-bold py-2.5 rounded tracking-widest uppercase transition-all flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview on Public Gallery</span>
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Best Furnishings Ranker list */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
            <div className="border-b border-gray-100 pb-3 text-left">
              <h3 className="text-xs font-bold font-mono tracking-widest text-gray-800 uppercase">
                COLLECTION SALES MATRIX
              </h3>
              <p className="text-[10px] text-gray-500">
                Performance tracking of custom designs by gross compiled sales revenue.
              </p>
            </div>

            <div className="space-y-4">
              {productStats.map((stat, index) => {
                const totalModelRevenue = stat.revenue;
                // find proportion
                const maxRevenue = Math.max(...productStats.map(s => s.revenue), 1);
                const widthPercent = Math.min(100, Math.max(8, (totalModelRevenue / maxRevenue) * 100));

                return (
                  <div key={stat.product.id} className="space-y-1.5 p-1 text-left">
                    <div className="flex justify-between items-start text-xs">
                      <div>
                        <span className="font-mono text-gray-400 mr-2 text-[10.5px]">0{index + 1}</span>
                        <span className="text-gray-900 font-semibold">{stat.product.name}</span>
                        <span className="text-[10px] block font-mono text-gray-400">Stock: {stat.product.stock} units remaining</span>
                      </div>
                      <div className="text-right font-mono text-[11px] font-bold text-gray-800">
                        <span>${totalModelRevenue.toLocaleString()}</span>
                        <span className="text-[9.5px] block font-light text-gray-500">{stat.qtySold} sold</span>
                      </div>
                    </div>

                    {/* visual geometric luxury bar matching high-contrast design */}
                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                      <div 
                        className="bg-[#D4AF37] h-full transition-all duration-1000"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Quick-Access Documentation Checklist */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 text-left">
            <h3 className="text-xs font-bold font-mono tracking-widest text-gray-800 uppercase border-b border-gray-100 pb-2">
              ATELIER DESIGN DIRECTIVES
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-650 font-light leading-relaxed">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>All hardwoods (Ash, Beech) are sustainably sourced under FSC-certified local woodcraft guidelines.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Furniture scales (Standard, Grande, Atelier) must verify fabric tension checks prior to dispatch.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Dynamic notification emails must be sent at every major delivery tracking state update.</span>
              </li>
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}
