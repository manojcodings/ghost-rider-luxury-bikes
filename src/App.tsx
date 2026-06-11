import { Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

// Public-facing sections (original landing page)
import TopHeader from './components/TopHeader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedBikes from './components/FeaturedBikes';
import BikeCollections from './components/BikeCollections';
import BikeShowcase from './components/BikeShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppPopup from './components/WhatsAppPopup';
import ScrollToTop from './components/ScrollToTop';

// About sub-pages
import AboutPage from './components/AboutPage';
import AboutOverviewPage from './components/AboutOverviewPage';
import AboutCreatorPage from './components/AboutCreatorPage';
import AboutBikesPage from './components/AboutBikesPage';
import RacingPage from './components/RacingPage';
import LuxuryPage from './components/LuxuryPage';
import CollectionsPage from './components/CollectionsPage';
import ContactPage from './components/ContactPage';

// Other pages
import BikesPage from './components/BikesPage';

/** The original landing page assembled as its own component */
function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <TopHeader />
      <Navbar />
      <Hero />
      <FeaturedBikes />
      <BikeCollections />
      <BikeShowcase />
      <Contact />
      <Footer />
      <WhatsAppPopup />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ── Public routes ─────────────────────────────────── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* ── Bikes page ────────────────────────────────────── */}
        <Route path="/bikes" element={<BikesPage />} />
        <Route path="/racing" element={<RacingPage />} />
        <Route path="/luxury" element={<LuxuryPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* ── About routes (nested) ─────────────────────────── */}
        <Route path="/about" element={<AboutPage />}>
          <Route index element={<AboutOverviewPage />} />
          <Route path="creator" element={<AboutCreatorPage />} />
          <Route path="bikes" element={<AboutBikesPage />} />
        </Route>

        {/* ── Protected admin routes ────────────────────────── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* ── Fallback ──────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;