import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Footer from './Footer';
import BikeShowcase from './BikeShowcase';

export default function LuxuryPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <TopHeader />
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-36 pb-10 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />

        <p className="font-accent text-gold tracking-widest uppercase text-sm mb-3">
          Exclusive & Elite
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white">
          Luxury Showroom
        </h1>
        <div className="w-20 h-[2px] bg-gold mx-auto mt-5 mb-6" />
        <p className="font-primary text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
          Where engineering meets artistry. Our luxury collection features the world's most
          prestigious motorcycles — crafted for those who demand nothing but the finest.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {[
            { value: '₹50L+', label: 'Starting Price' },
            { value: '20+',   label: 'Luxury Models' },
            { value: '100%',  label: 'Premium Quality' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl font-black text-gold">{value}</p>
              <p className="font-primary text-white/40 text-xs uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <BikeShowcase />

      {/* Luxury Experience */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-accent text-gold tracking-widest uppercase text-sm mb-3">The Experience</p>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white">
              Why Choose Luxury
            </h2>
            <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '💎', title: 'Handcrafted Excellence',   desc: 'Every luxury bike in our collection is a masterpiece — hand-assembled with meticulous attention to detail by master craftsmen.' },
              { icon: '🏅', title: 'Prestige & Heritage',      desc: 'Own a piece of motorcycle history. Our luxury lineup features iconic brands with decades of racing and touring heritage.' },
              { icon: '🔑', title: 'Exclusive Ownership',      desc: 'Limited production numbers mean your bike is rare. Experience the privilege of owning something truly exclusive.' },
              { icon: '🛡️', title: 'White Glove Service',      desc: 'From purchase to maintenance, enjoy a premium ownership experience with dedicated concierge support.' },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-gold/50 hover:shadow-gold transition-all duration-300 group flex gap-5"
              >
                <div className="text-4xl flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="font-display text-base font-black uppercase text-white mb-2 group-hover:text-gold transition-colors">
                    {title}
                  </h3>
                  <p className="font-primary text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/20 rounded-2xl p-10">
            <p className="font-accent text-gold text-sm uppercase tracking-widest mb-2">Ready To Own One?</p>
            <h3 className="font-display text-3xl font-black uppercase text-white mb-4">
              Book A Private Viewing
            </h3>
            <p className="font-primary text-white/60 text-sm mb-6 max-w-md mx-auto">
              Schedule an exclusive one-on-one session with our luxury bike specialists.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-primary text-xs uppercase tracking-widest px-8 py-3 bg-gold text-black font-semibold rounded-full hover:brightness-110 transition-all duration-300 hover:shadow-gold"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}