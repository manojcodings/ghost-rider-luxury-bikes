import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Footer from './Footer';
import BikeCollections from './BikeCollections';

const stats = [
  { value: '300+', label: 'Top Speed (kmh)' },
  { value: '210', label: 'Max BHP' },
  { value: '15+', label: 'Race Models' },
];

const features = [
  { icon: '⚡', title: 'High Performance Engine', desc: 'Tuned for maximum power output with precision engineering for track-level performance.' },
  { icon: '🛞', title: 'Race Suspension', desc: 'Advanced suspension systems that handle extreme cornering and high-speed stability.' },
  { icon: '🔥', title: 'Aerodynamic Design', desc: 'Wind-tunnel tested bodywork that cuts through air and provides superior downforce.' },
  { icon: '🎯', title: 'Precision Braking', desc: 'High-performance braking systems for instant response at any speed.' },
  { icon: '🏆', title: 'Championship Proven', desc: 'Models inspired by championship-winning machines on the world stage.' },
  { icon: '🔧', title: 'Track Ready', desc: 'Minimal modifications needed — these machines are built for the track from day one.' },
];

export default function RacingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <TopHeader />
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-36 pb-10 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red/5 via-transparent to-transparent pointer-events-none" />
        <p className="font-accent text-gold tracking-widest uppercase text-sm mb-3">Built For Speed</p>
        <h1 className="font-display text-5xl md:text-7xl font-black uppercase text-white">Racing Collection</h1>
        <div className="w-20 h-[2px] bg-gold mx-auto mt-5 mb-6" />
        <p className="font-primary text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
          Engineered for the track, perfected for the road. Our racing lineup pushes the boundaries of speed, precision, and pure adrenaline.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl font-black text-gold">{value}</p>
              <p className="font-primary text-white/40 text-xs uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Collections Section */}
      <BikeCollections />

      {/* Racing Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-accent text-gold tracking-widest uppercase text-sm mb-3">Why Racing</p>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white">Race-Grade Features</h2>
            <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/50 hover:shadow-gold transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display text-base font-black uppercase text-white mb-2 group-hover:text-gold transition-colors">{title}</h3>
                <p className="font-primary text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}