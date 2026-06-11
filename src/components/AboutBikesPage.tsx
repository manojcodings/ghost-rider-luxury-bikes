import { useState } from 'react';

const bikes = [
  { name: 'Royal Enfield Classic 350', category: 'Cruiser',         cc: '349cc',  power: '20.2 bhp', desc: 'A timeless icon. The Classic 350 blends heritage styling with modern reliability.', emoji: '🏍️' },
  { name: 'KTM Duke 390',              category: 'Naked Street',    cc: '373cc',  power: '43.5 bhp', desc: 'Raw, aggressive, and adrenaline-packed. Built for riders who demand performance.', emoji: '⚡' },
  { name: 'Bajaj Dominar 400',         category: 'Sport Tourer',    cc: '373cc',  power: '40 bhp',   desc: 'Built for the long haul. Touring comfort with sportbike DNA.', emoji: '🛣️' },
  { name: 'Honda CB500X',              category: 'Adventure',       cc: '471cc',  power: '47 bhp',   desc: 'Ready for anything — city commutes, mountain passes, and dirt trails.', emoji: '🏔️' },
  { name: 'Kawasaki Ninja ZX-10R',     category: 'Superbike',       cc: '998cc',  power: '210 bhp',  desc: 'Track-bred, road-legal. The pinnacle of litre-class performance.', emoji: '🔥' },
  { name: 'Royal Enfield Himalayan',   category: 'Adventure Tourer',cc: '411cc',  power: '24.3 bhp', desc: 'Born for the mountains. An accessible, honest adventure bike.', emoji: '⛰️' },
];

const categories = ['All', 'Cruiser', 'Naked Street', 'Sport Tourer', 'Adventure', 'Superbike', 'Adventure Tourer'];

export default function AboutBikesPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? bikes : bikes.filter((b) => b.category === active);

  return (
    <div className="space-y-8">

      {/* Intro */}
      <p className="font-primary text-white/60 text-center max-w-2xl mx-auto text-sm leading-relaxed">
        We cover every segment — from beginner-friendly commuters to fire-breathing superbikes.
      </p>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`font-primary px-4 py-1.5 rounded-full border text-xs uppercase tracking-widest transition-all duration-300 ${
              active === cat
                ? 'bg-gold border-gold text-black font-semibold'
                : 'border-white/20 text-white/50 hover:border-gold hover:text-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bike Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((bike) => (
          <div
            key={bike.name}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/50 hover:shadow-gold transition-all duration-300 group"
          >
            <div className="text-4xl mb-4">{bike.emoji}</div>
            <span className="font-accent text-gold text-xs uppercase tracking-widest">
              {bike.category}
            </span>
            <h3 className="font-display text-lg font-black mt-1 mb-2 text-white group-hover:text-gold transition-colors">
              {bike.name}
            </h3>
            <p className="font-primary text-white/60 text-sm leading-relaxed mb-4">{bike.desc}</p>
            <div className="flex gap-6 border-t border-white/10 pt-4">
              <div>
                <p className="font-primary text-white/40 text-xs uppercase tracking-widest">Engine</p>
                <p className="font-display text-white font-bold text-sm">{bike.cc}</p>
              </div>
              <div>
                <p className="font-primary text-white/40 text-xs uppercase tracking-widest">Power</p>
                <p className="font-display text-white font-bold text-sm">{bike.power}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}