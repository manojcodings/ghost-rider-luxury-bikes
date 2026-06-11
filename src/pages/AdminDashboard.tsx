import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  LayoutDashboard, 
  Bike, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Flame, 
  Plus, 
  Trash2, 
  Edit, 
  Mail, 
  Phone, 
  X,
  Sparkles,
  Search,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

interface BikeItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  engine: string;
  top_speed: string;
  rating: number;
  image: string;
  alt: string;
  description: string;
  is_featured: boolean;
  is_showcase: boolean;
}

interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'bikes' | 'messages'>('overview');
  
  // Dynamic API Data
  const [stats, setStats] = useState<any>({
    totalBikes: { value: '0', delta: '+0 this month' },
    activeOrders: { value: '0', delta: '+0 today' },
    customers: { value: '0', delta: '+0 this week' },
    revenue: { value: '₨ 0', delta: '+0% vs last month' }
  });
  const [bikes, setBikes] = useState<BikeItem[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBike, setEditingBike] = useState<BikeItem | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Bike Form State
  const [bikeForm, setBikeForm] = useState({
    name: '',
    brand: '',
    price: '',
    engine: '',
    top_speed: '',
    rating: 5,
    image: '',
    alt: '',
    description: '',
    is_featured: false,
    is_showcase: false
  });

  // Helper fetch with authentication
  const apiCall = async (path: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('auth_token');
    return fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
      }
    });
  };

  // Load Dashboard Data
  const loadStats = async () => {
    try {
      const res = await apiCall('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats({
          totalBikes: { value: data.total_bikes.value, delta: data.total_bikes.delta },
          activeOrders: { value: data.active_orders.value, delta: data.active_orders.delta },
          customers: { value: data.customers.value, delta: data.customers.delta },
          revenue: { value: data.revenue.value, delta: data.revenue.delta }
        });
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics", err);
    }
  };

  const loadBikes = async () => {
    try {
      const res = await apiCall('/api/bikes');
      if (res.ok) {
        const data = await res.json();
        setBikes(data);
      }
    } catch (err) {
      console.error("Failed to load bikes listing", err);
    }
  };

  const loadContacts = async () => {
    try {
      const res = await apiCall('/api/contacts');
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error("Failed to load contact messages", err);
    }
  };

  // Refresh current view's data
  useEffect(() => {
    loadStats();
    loadBikes();
    loadContacts();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  // CRUD handlers for Bikes
  const handleOpenAddModal = () => {
    setEditingBike(null);
    setBikeForm({
      name: '',
      brand: '',
      price: '',
      engine: '',
      top_speed: '',
      rating: 5,
      image: '',
      alt: '',
      description: '',
      is_featured: false,
      is_showcase: false
    });
    setApiError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (bike: BikeItem) => {
    setEditingBike(bike);
    setBikeForm({
      name: bike.name,
      brand: bike.brand,
      price: bike.price.toString(),
      engine: bike.engine,
      top_speed: bike.top_speed,
      rating: bike.rating,
      image: bike.image || '',
      alt: bike.alt || '',
      description: bike.description || '',
      is_featured: !!bike.is_featured,
      is_showcase: !!bike.is_showcase
    });
    setApiError(null);
    setIsModalOpen(true);
  };

  const handleBikeFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Validation
    if (!bikeForm.name || !bikeForm.brand || !bikeForm.price || !bikeForm.engine || !bikeForm.top_speed) {
      setApiError("Please fill out all required fields.");
      return;
    }

    const priceNum = parseFloat(bikeForm.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setApiError("Price must be a valid positive number.");
      return;
    }

    const payload = {
      ...bikeForm,
      price: priceNum,
      alt: bikeForm.alt || bikeForm.name
    };

    try {
      const url = editingBike ? `/api/bikes/${editingBike.id}` : '/api/bikes';
      const method = editingBike ? 'PUT' : 'POST';
      
      const response = await apiCall(url, {
        method,
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        setIsModalOpen(false);
        showSuccessMessage(editingBike ? "Bike updated successfully!" : "Bike added successfully!");
        loadBikes();
        loadStats();
      } else {
        setApiError(result.message || "Failed to process bike records.");
      }
    } catch (err) {
      setApiError("Network error. Please try again.");
    }
  };

  const handleBikeDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this superbike from inventory?")) return;

    try {
      const res = await apiCall(`/api/bikes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showSuccessMessage("Superbike deleted successfully.");
        loadBikes();
        loadStats();
      } else {
        alert("Failed to delete superbike records.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Messages Inbox delete handler
  const handleMessageDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await apiCall(`/api/contacts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showSuccessMessage("Contact message deleted.");
        loadContacts();
        loadStats();
      } else {
        alert("Failed to delete contact record.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const showSuccessMessage = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Filter bikes based on search query
  const filteredBikes = bikes.filter(bike => 
    bike.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bike.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-primary relative overflow-x-hidden">
      
      {/* Dynamic Success Alert toast */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3.5 rounded-full"
            style={{
              background: 'rgba(212,175,55,0.15)',
              border: '1px solid rgba(212,175,55,0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 40px rgba(212,175,55,0.2)'
            }}
          >
            <Check className="w-4 h-4 text-gold" />
            <span className="text-xs uppercase tracking-widest text-white font-semibold">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header
        className="flex items-center justify-between px-6 md:px-10 py-4 border-b sticky top-0 z-50"
        style={{
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(212,175,55,0.12)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)' }}
          >
            <Flame className="w-5 h-5 text-gold" />
          </div>
          <div>
            <span className="font-display text-sm uppercase tracking-widest text-white">Ghost Rider</span>
            <span className="font-primary text-[10px] text-gold/50 block tracking-widest uppercase">Admin Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-right hidden sm:block">
            <p className="font-primary text-sm text-white/80">{user?.name ?? 'Administrator'}</p>
            <p className="font-primary text-xs text-gold/50">{user?.email ?? 'admin@ghostrider.com'}</p>
          </div>
          <button
            id="logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-primary text-xs uppercase tracking-widest transition-all duration-200"
            style={{
              background: 'rgba(255,59,59,0.08)',
              border: '1px solid rgba(255,59,59,0.2)',
              color: 'rgba(255,59,59,0.8)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,59,59,0.15)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,59,59,0.08)';
            }}
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="px-6 md:px-10 py-10 max-w-7xl mx-auto">
        
        {/* Welcome Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="w-4 h-4 text-gold/60" />
              <span className="font-primary text-xs text-gold/60 uppercase tracking-widest">Dashboard System</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-widest text-white"
              style={{ textShadow: '0 0 30px rgba(212,175,55,0.15)' }}>
              Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
            </h2>
            <p className="font-primary text-sm text-white/30 mt-1">
              Manage inventory metrics, query submissions, and customer requests.
            </p>
          </div>

          {/* Luxury Designed Navigation Tabs */}
          <div className="flex gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/5">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'bikes', label: 'Bikes Inventory' },
              { id: 'messages', label: 'Contact Messages' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gold/15 border border-gold/40 text-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                    : 'text-white/40 hover:text-white/80 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB 1: OVERVIEW ── */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: 'Total Bikes', value: stats.totalBikes.value, icon: Bike, color: '#D4AF37', delta: stats.totalBikes.delta },
                { label: 'Active Orders', value: stats.activeOrders.value, icon: ShoppingCart, color: '#FF3B3B', delta: stats.activeOrders.delta },
                { label: 'Customers', value: stats.customers.value, icon: Users, color: '#D4AF37', delta: stats.customers.delta },
                { label: 'Revenue Projection', value: stats.revenue.value, icon: TrendingUp, color: '#FF3B3B', delta: stats.revenue.delta },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-6 relative overflow-hidden group bg-white/[0.03] border border-white/[0.06] transition-all duration-300 hover:border-gold/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${stat.color}12`, border: `1px solid ${stat.color}25` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <p className="font-display text-2xl font-bold text-white mb-0.5">{stat.value}</p>
                  <p className="font-primary text-[10px] text-white/40 uppercase tracking-widest mb-2 font-semibold">{stat.label}</p>
                  <p className="font-primary text-xs font-medium" style={{ color: `${stat.color}80` }}>{stat.delta}</p>

                  <div
                    className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -translate-y-1/2 translate-x-1/2"
                    style={{ background: `radial-gradient(circle, ${stat.color}18 0%, transparent 70%)` }}
                  />
                </div>
              ))}
            </div>

            {/* Combined dynamic summary view */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Recent queries card */}
              <div className="lg:col-span-3 glass rounded-xl p-6 border border-white/[0.06] flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-sm uppercase tracking-widest text-gold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      Recent Activity Inbox
                    </h3>
                    <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase px-2 py-1 rounded bg-white/5 border border-white/10">
                      {contacts.length} Messages
                    </span>
                  </div>

                  {contacts.length === 0 ? (
                    <div className="text-center py-10 text-white/20">
                      <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-xs uppercase tracking-widest">Inbox is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                      {contacts.slice(0, 3).map((contact) => (
                        <div key={contact.id} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">{contact.full_name}</p>
                              <p className="text-[10px] text-white/40">{contact.email}</p>
                            </div>
                            <span className="text-[9px] text-white/30">{new Date(contact.created_at).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-white/60 line-clamp-2 italic font-light">"{contact.message}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {contacts.length > 0 && (
                  <button 
                    onClick={() => setActiveTab('messages')}
                    className="w-full text-center mt-4 pt-3 border-t border-white/5 text-xs text-gold/60 hover:text-gold uppercase tracking-wider font-semibold transition-colors"
                  >
                    View All Messages &rarr;
                  </button>
                )}
              </div>

              {/* Quick status card */}
              <div className="lg:col-span-2 glass rounded-xl p-6 border border-white/[0.06] flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-sm uppercase tracking-widest text-gold mb-4 flex items-center gap-2">
                    <Bike className="w-4 h-4 text-gold" />
                    Quick Actions
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed mb-6">
                    Easily maintain stock, update superbike metrics, or clear queries from customers.
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={handleOpenAddModal}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gold/10 hover:bg-gold/15 border border-gold/30 text-gold transition-all text-xs font-semibold uppercase tracking-wider"
                    >
                      <span>Register New Superbike</span>
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('bikes')}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-all text-xs font-semibold uppercase tracking-wider"
                    >
                      <span>Edit Inventory Listing</span>
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 uppercase tracking-widest">
                  <span>Connection: Secure SSL</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Live Database</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: BIKES MANAGEMENT ── */}
        {activeTab === 'bikes' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Search and Filter row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-gold transition-colors" />
                <input
                  type="text"
                  placeholder="Search bike name or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/10 outline-none text-white focus:border-gold/40 focus:shadow-[0_0_15px_rgba(212,175,55,0.06)] transition-all"
                />
              </div>

              <button
                onClick={handleOpenAddModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-red hover:brightness-110 border border-red/40 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
                style={{ boxShadow: '0 4px 15px rgba(255,59,59,0.2)' }}
              >
                <Plus className="w-4 h-4" />
                Add New Bike
              </button>
            </div>

            {/* Bikes Table */}
            <div className="glass rounded-xl border border-white/[0.06] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.01]">
                      <th className="p-4 text-xs font-semibold uppercase tracking-widest text-gold">Bike Info</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-widest text-gold">Engine / Speed</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-widest text-gold">Price (INR)</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-widest text-gold text-center">Featured</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-widest text-gold text-center">Showcase</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-widest text-gold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBikes.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-white/30 text-xs uppercase tracking-widest">
                          No bikes found matching the query
                        </td>
                      </tr>
                    ) : (
                      filteredBikes.map((bike) => (
                        <tr 
                          key={bike.id} 
                          className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {bike.image ? (
                                <img src={bike.image} alt={bike.name} className="w-12 h-9 object-cover rounded-md border border-white/10" />
                              ) : (
                                <div className="w-12 h-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                                  <Bike className="w-4 h-4" />
                                </div>
                              )}
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-white">{bike.name}</p>
                                <p className="text-[10px] text-white/40">{bike.brand}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-xs text-white/80">
                            <div>
                              <p className="font-semibold">{bike.engine}</p>
                              <p className="text-[10px] text-white/40">{bike.top_speed}</p>
                            </div>
                          </td>
                          <td className="p-4 font-accent text-sm text-gold font-semibold">
                            ₹{Math.round(bike.price).toLocaleString('en-IN')}
                          </td>
                          <td className="p-4 text-center">
                            <span className={`inline-block w-2.5 h-2.5 rounded-full ${bike.is_featured ? 'bg-gold shadow-[0_0_8px_#D4AF37]' : 'bg-white/10'}`} />
                          </td>
                          <td className="p-4 text-center">
                            <span className={`inline-block w-2.5 h-2.5 rounded-full ${bike.is_showcase ? 'bg-red shadow-[0_0_8px_#FF3B3B]' : 'bg-white/10'}`} />
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditModal(bike)}
                                className="p-1.5 rounded bg-white/5 hover:bg-gold/20 hover:text-gold border border-white/5 hover:border-gold/30 transition-all"
                                title="Edit Bike details"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleBikeDelete(bike.id)}
                                className="p-1.5 rounded bg-white/5 hover:bg-red/25 hover:text-red border border-white/5 hover:border-red/30 transition-all"
                                title="Delete Bike"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: CONTACT MESSAGES ── */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <h3 className="font-display text-sm uppercase tracking-widest text-gold flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Inbox Submissions ({contacts.length})
            </h3>

            {contacts.length === 0 ? (
              <div className="glass rounded-xl p-10 text-center text-white/30 border border-white/[0.06]">
                <Mail className="w-10 h-10 text-white/15 mx-auto mb-3" />
                <p className="text-xs uppercase tracking-widest font-semibold">No queries received yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contacts.map((msg) => (
                  <div 
                    key={msg.id} 
                    className="glass rounded-xl p-5 border border-white/[0.06] hover:border-white/12 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider text-white/95">{msg.full_name}</h4>
                          <span className="text-[10px] text-gold/60 select-all font-light">{msg.email}</span>
                        </div>
                        <span className="text-[10px] text-white/30">{new Date(msg.created_at).toLocaleString()}</span>
                      </div>
                      
                      <p className="text-xs text-white/70 italic leading-relaxed py-3 px-3 rounded-lg bg-white/[0.01] border border-white/[0.03] mb-4">
                        "{msg.message}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-[10px] text-white/45 select-all">
                        <Phone className="w-3.5 h-3.5 text-white/30" />
                        <span>{msg.phone}</span>
                      </div>

                      <button
                        onClick={() => handleMessageDelete(msg.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red/10 hover:bg-red/20 text-red border border-red/20 hover:border-red/40 text-[10px] font-semibold uppercase tracking-wider transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* ── BIKE FORM POPUP MODAL (Add / Edit) ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-filter backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl z-10 p-6 md:p-8"
              style={{
                background: 'rgba(12, 12, 12, 0.95)',
                border: '1px solid rgba(212,175,55,0.22)',
                boxShadow: '0 20px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(212,175,55,0.08)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-lg font-bold uppercase tracking-widest text-gold mb-6 pb-2 border-b border-white/10 flex items-center gap-2">
                <Bike className="w-5 h-5" />
                {editingBike ? "Edit Superbike Record" : "Register New Superbike"}
              </h3>

              {apiError && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-red/10 border border-red/30 text-red text-xs leading-normal">
                  {apiError}
                </div>
              )}

              <form onSubmit={handleBikeFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5 font-semibold">Bike Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ninja H2R"
                      value={bikeForm.name}
                      onChange={(e) => setBikeForm({...bikeForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/10 outline-none focus:border-gold/40 text-white"
                    />
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5 font-semibold">Brand / Manufacturer *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kawasaki"
                      value={bikeForm.brand}
                      onChange={(e) => setBikeForm({...bikeForm, brand: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/10 outline-none focus:border-gold/40 text-white"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5 font-semibold">Price (INR) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 1650000"
                      value={bikeForm.price}
                      onChange={(e) => setBikeForm({...bikeForm, price: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/10 outline-none focus:border-gold/40 text-white"
                    />
                  </div>

                  {/* Engine Capacity */}
                  <div>
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5 font-semibold">Engine Displacement *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 998cc"
                      value={bikeForm.engine}
                      onChange={(e) => setBikeForm({...bikeForm, engine: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/10 outline-none focus:border-gold/40 text-white"
                    />
                  </div>

                  {/* Top Speed */}
                  <div>
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5 font-semibold">Top Speed *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 299 km/h"
                      value={bikeForm.top_speed}
                      onChange={(e) => setBikeForm({...bikeForm, top_speed: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/10 outline-none focus:border-gold/40 text-white"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5 font-semibold">Rating (1 to 5 Stars)</label>
                    <select
                      value={bikeForm.rating}
                      onChange={(e) => setBikeForm({...bikeForm, rating: parseInt(e.target.value)})}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-[#111] border border-white/10 outline-none focus:border-gold/40 text-white"
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>

                  {/* Image URL */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5 font-semibold">Image URL (HTTPS link or base64)</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={bikeForm.image}
                      onChange={(e) => setBikeForm({...bikeForm, image: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/10 outline-none focus:border-gold/40 text-white"
                    />
                  </div>

                  {/* Alt text */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5 font-semibold">Image Alternative Text (For SEO / Screenreaders)</label>
                    <input
                      type="text"
                      placeholder="e.g. Kawasaki Ninja superbike side profile view"
                      value={bikeForm.alt}
                      onChange={(e) => setBikeForm({...bikeForm, alt: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/10 outline-none focus:border-gold/40 text-white"
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-1.5 font-semibold">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Explain features, specs, warranty details..."
                      value={bikeForm.description}
                      onChange={(e) => setBikeForm({...bikeForm, description: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white/[0.03] border border-white/10 outline-none focus:border-gold/40 text-white resize-none"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="md:col-span-2 flex flex-wrap gap-6 pt-2">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bikeForm.is_featured}
                        onChange={(e) => setBikeForm({...bikeForm, is_featured: e.target.checked})}
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-xs text-white/70 uppercase tracking-wide">Featured Superbike (Main Section)</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bikeForm.is_showcase}
                        onChange={(e) => setBikeForm({...bikeForm, is_showcase: e.target.checked})}
                        className="w-4 h-4 accent-red"
                      />
                      <span className="text-xs text-white/70 uppercase tracking-wide">Showcase Superbike (Bottom Grid)</span>
                    </label>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-red hover:brightness-110 border border-red/40 text-white text-xs font-semibold uppercase tracking-wider transition-all"
                    style={{ boxShadow: '0 4px 15px rgba(255,59,59,0.2)' }}
                  >
                    {editingBike ? "Save Changes" : "Register Bike"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating brand watermark */}
      <div className="flex items-center justify-center gap-2 py-8 mt-12 border-t border-white/5 select-none pointer-events-none opacity-40">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/20" />
        <span className="font-display text-[9px] text-white/20 tracking-[0.4em] uppercase">
          Ghost Rider Luxury Bikes
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/20" />
      </div>
    </div>
  );
}
