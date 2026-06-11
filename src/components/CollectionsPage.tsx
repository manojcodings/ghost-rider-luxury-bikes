import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Footer from './Footer';
import BikeCollections from './BikeCollections';
import FeaturedBikes from './FeaturedBikes';

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <TopHeader />
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-36 pb-10 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />

        <p className="font-accent text-gold tracking-widest uppercase text-sm mb-3">
          Explore All
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white">
          Our Collections
        </h1>
        <div className="w-20 h-[2px] bg-gold mx-auto mt-5 mb-6" />
        <p className="font-primary text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
          From entry-level thrillers to elite superbikes — browse our complete range of
          handpicked motorcycles across every category and style.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {[
            { value: '200+', label: 'Total Bikes' },
            { value: '10+',  label: 'Categories' },
            { value: '15+',  label: 'Top Brands' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl font-black text-gold">{value}</p>
              <p className="font-primary text-white/40 text-xs uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Bikes */}
      <FeaturedBikes />

      {/* All Collections */}
      <BikeCollections />

      {/* Browse By Category */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-accent text-gold tracking-widest uppercase text-sm mb-3">Filter By Type</p>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white">
              Browse By Category
            </h2>
            <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: '🏍️', name: 'Cruiser',          count: '24 Bikes' },
              { icon: '⚡', name: 'Naked Street',      count: '18 Bikes' },
              { icon: '🔥', name: 'Superbike',         count: '12 Bikes' },
              { icon: '🛣️', name: 'Sport Tourer',      count: '16 Bikes' },
              { icon: '🏔️', name: 'Adventure',         count: '20 Bikes' },
              { icon: '⛰️', name: 'Adventure Tourer',  count: '14 Bikes' },
              { icon: '💎', name: 'Luxury',            count: '10 Bikes' },
              { icon: '🏁', name: 'Racing',            count: '8 Bikes'  },
            ].map(({ icon, name, count }) => (
              <div
                key={name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-gold/50 hover:shadow-gold transition-all duration-300 group cursor-pointer"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-display text-sm font-black uppercase text-white group-hover:text-gold transition-colors mb-1">
                  {name}
                </h3>
                <p className="font-primary text-white/40 text-xs">{count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}