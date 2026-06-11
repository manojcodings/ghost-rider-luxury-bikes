import { NavLink, Outlet, useLocation } from 'react-router';
import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Footer from './Footer';

const sections = [
  { to: '/about', label: 'Overview', end: true },
  { to: '/about/creator', label: 'Our Creator' },
  { to: '/about/bikes', label: 'Our Bikes' },
];

export default function AboutPage() {
  const location = useLocation();
  const isRoot = location.pathname === '/about';

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <TopHeader />
      <Navbar />

      <section id="about" className="min-h-screen bg-black text-white pt-36 pb-20 px-4">

        {/* Section Header */}
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="font-accent text-gold tracking-widest uppercase text-sm mb-3">
            Who We Are
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-black uppercase text-white">
            About Us
          </h2>
          <div className="w-20 h-[2px] bg-gold mx-auto mt-5" />
        </div>

        {/* Sub-nav Tabs */}
        <div className="max-w-5xl mx-auto flex justify-center gap-3 mb-14 flex-wrap">
          {sections.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `font-primary text-xs uppercase tracking-widest px-6 py-2.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-gold border-gold text-black font-semibold'
                    : 'border-white/20 text-white/50 hover:border-gold hover:text-gold'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Sub-page Content */}
        <div className="max-w-5xl mx-auto">
          <Outlet />
          {isRoot && <AboutOverview />}
        </div>

      </section>

      <Footer />
    </div>
  );
}

function AboutOverview() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-4">
      {[
        {
          icon: '🏍️',
          title: 'Premium Bikes',
          desc: 'We curate the finest motorcycles — from raw street fighters to touring legends.',
        },
        {
          icon: '👤',
          title: 'Passionate Creator',
          desc: 'Built by a bike enthusiast with years of experience in the two-wheel world.',
        },
        {
          icon: '🌍',
          title: 'Our Mission',
          desc: 'To connect riders with their dream machine through an honest, powerful platform.',
        },
      ].map(({ icon, title, desc }) => (
        <div
          key={title}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-gold/50 hover:shadow-gold transition-all duration-300 text-center group"
        >
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">
            {title}
          </h3>
          <p className="font-primary text-gray text-sm leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  );
}