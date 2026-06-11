export default function AboutOverviewPage() {
  return (
    <div className="space-y-10">

      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="font-primary text-white/70 text-lg leading-relaxed">
          We are a passionate motorcycle platform dedicated to bringing riders and bikes together.
          Whether you're a seasoned rider or just starting your journey, we have the perfect machine
          waiting for you.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: '200+', label: 'Bikes Listed' },
          { value: '10K+', label: 'Happy Riders' },
          { value: '15+',  label: 'Brands' },
          { value: '5★',   label: 'Avg. Rating' },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-gold/50 hover:shadow-gold transition-all duration-300"
          >
            <p className="font-display text-4xl font-black text-gold">{value}</p>
            <p className="font-primary text-gray text-xs mt-2 uppercase tracking-widest">{label}</p>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="bg-white/5 border border-gold/20 rounded-2xl p-8">
        <h3 className="font-display text-2xl font-black uppercase text-white mb-4">
          Our Mission
        </h3>
        <p className="font-primary text-white/70 leading-relaxed">
          Our mission is simple — to create the most reliable and visually stunning motorcycle
          showcase platform in the country. We believe every rider deserves access to honest
          information, beautiful photography, and a community that shares their passion for
          the open road.
        </p>
      </div>

    </div>
  );
}