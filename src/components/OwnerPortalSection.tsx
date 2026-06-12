import React, { useState } from 'react';
import { Product } from '../data/products';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Truck, 
  Users, 
  CheckCircle, 
  Sparkles, 
  FileText, 
  PlusCircle, 
  ArrowLeft,
  Activity,
  Award,
  Package
} from 'lucide-react';

interface CartItem {
  id: string;
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
    { value: 'CRAFTING SPECIALIST ASSIGNMENT &bull; VERMED', label: 'Artisan Assigned' },
    { value: 'KANO TANNERY SELECTION STARTED', label: 'Tannery Selection' },
    { value: 'STITCH DESIGN AND SOLE ASSEMBLY', label: 'Hand Stitching' },
    { value: 'COUR FLIGHT TRANSIT LAGOS &bull; IN FLIGHT', label: 'Lagos Air transit' },
    { value: 'OUT FOR COURIER COOPER ROAD DELIVERY', label: 'Out for Courier' },
    { value: 'DELIVERED SECURELY TO CURATOR RESIDENCE', label: 'Securely Delivered' }
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
    if (filterStatus === 'assembly') return matchesSearch && (order.status.includes('STITCH') || order.status.includes('ASSIGNMENT') || order.status.includes('TANNERY'));
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
            <Award className="w-4 h-4" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-bold">GENE BENDI ATELIER PRIVATE PORTAL</span>
          </div>
          <h1 className="text-4xl font-serif tracking-tight text-black uppercase">
            Atelier Sales Central
          </h1>
          <p className="text-xs text-gray-500 font-light leading-relaxed max-w-xl">
            Real-time sales statistics, tracking status dispatch controls, model collection matrices, and VIP custom-order logs for the Kano and Lagos workshops.
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

        {/* Shoes constructed metrics */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold">CUSTOM CUT AND SEWN</span>
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-mono text-black font-semibold">{totalPairsSold} Pairs</span>
            <span className="text-[10px] text-emerald-600 font-medium block">&bull; Gold medallion stamped</span>
          </div>
        </div>

      </div>

      {/* 3. Operational Section Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: sales & dispatch tracking control */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
            
            {/* Sales table header controllers */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold font-mono tracking-widest text-gray-800 uppercase">
                  ACTIVE DEPUTY ORDER PORTFOLIOS ({filteredOrders.length})
                </h3>
                <p className="text-[11px] text-gray-500">
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
                  placeholder="Filter by Order ID Reference, Name, or Hub..."
                  className="w-full bg-[#FAFAFA] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#D4AF37] font-mono"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex border border-gray-200 rounded overflow-hidden divide-x divide-gray-200 font-mono text-[10px] bg-white h-fit">
                {[
                  { id: 'all', label: 'ALL SALES' },
                  { id: 'assembly', label: 'ASSEMBLY' },
                  { id: 'transit', label: 'IN FLIGHT' },
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
                              <span className="text-gray-800 font-semibold">
                                {item.product.name} (US {item.selectedSize}) <span className="text-[10px] text-gray-400 italic">({item.selectedColor})</span>
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

        {/* Right column: metrics, analytics, and best selling rankers */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Best Footwear Models Ranker list */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-xs font-bold font-mono tracking-widest text-gray-800 uppercase">
                FOOTWEAR POPULARITY MATRIX
              </h3>
              <p className="text-[10px] text-gray-500">
                Top performance models rated by gross compiled revenue returns.
              </p>
            </div>

            <div className="space-y-4">
              {productStats.map((stat, index) => {
                const totalModelRevenue = stat.revenue;
                // find proportion
                const maxRevenue = Math.max(...productStats.map(s => s.revenue), 1);
                const widthPercent = Math.min(100, Math.max(8, (totalModelRevenue / maxRevenue) * 100));

                return (
                  <div key={stat.product.id} className="space-y-1.5 p-1">
                    <div className="flex justify-between items-start text-xs">
                      <div>
                        <span className="font-mono text-gray-400 mr-2 text-[10.5px]">0{index + 1}</span>
                        <span className="text-gray-900 font-semibold">{stat.product.name}</span>
                        <span className="text-[10px] text-gray-450 block font-mono text-gray-400">Stock: {stat.product.stock} units remaining</span>
                      </div>
                      <div className="text-right font-mono text-[11px] font-bold text-gray-800">
                        <span>${totalModelRevenue.toLocaleString()}</span>
                        <span className="text-[9.5px] block font-light text-gray-450 text-gray-500">{stat.qtySold} sold</span>
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
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="text-xs font-bold font-mono tracking-widest text-gray-800 uppercase border-b border-gray-100 pb-2">
              ATELIER RUN GUIDELINES
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-650 font-light leading-relaxed">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>All premium hides are sourced uniquely from pasture tanneries under accredited guidelines in Kano, Nigeria.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Exotic orders must seek verification within a 3-hour courier log cycle.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Ensure carbon offsets are registered on each air-freight transport dispatch.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
