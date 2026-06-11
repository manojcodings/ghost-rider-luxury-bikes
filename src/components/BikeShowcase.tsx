import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaTachometerAlt, FaCog, FaRupeeSign } from "react-icons/fa";
import { showcaseBikes } from "../data/bikesData";

function ShowcaseCard({
  bike,
  index,
}: {
  bike: typeof showcaseBikes[0];
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="group glass rounded-xl overflow-hidden transition-shadow duration-500 hover:shadow-gold"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}
        <motion.img
          src={bike.image}
          alt={bike.alt}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 bg-white/[0.02]">
        <h3 className="font-display text-lg font-semibold text-white mb-3">
          {bike.name}
        </h3>

        {/* Specs Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5">
            <FaCog className="text-gold text-xs" aria-hidden="true" />
            <span className="font-primary text-[10px] uppercase text-gray">
              Engine
            </span>
            <span className="font-primary text-xs font-semibold text-gold">
              {bike.engine}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5">
            <FaTachometerAlt className="text-gold text-xs" aria-hidden="true" />
            <span className="font-primary text-[10px] uppercase text-gray">
              Top Speed
            </span>
            <span className="font-primary text-xs font-semibold text-gold">
              {bike.topSpeed}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5">
            <FaRupeeSign className="text-gold text-xs" aria-hidden="true" />
            <span className="font-primary text-[10px] uppercase text-gray">
              Price
            </span>
            <span className="font-primary text-xs font-semibold text-gold">
              {bike.price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BikeShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [bikes, setBikes] = useState<typeof showcaseBikes>(showcaseBikes);

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
        const response = await fetch(`${apiBase}/api/bikes?showcase=true`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped = data.map((b: any) => ({
              id: b.id,
              name: b.name,
              engine: b.engine,
              topSpeed: b.top_speed,
              price: typeof b.price === 'number' 
                ? Math.round(b.price).toLocaleString('en-IN') 
                : Math.round(parseFloat(b.price)).toLocaleString('en-IN'),
              image: b.image || showcaseBikes[0].image,
              alt: b.alt || b.name,
            }));
            setBikes(mapped);
          }
        }
      } catch (err) {
        console.warn("Failed to load showcase bikes from backend API. Using local mock data.", err);
      }
    };
    fetchShowcase();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #151515 0%, #0A0A0A 100%)",
      }}
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-title"
        >
          BIKE SHOWCASE
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="section-subtitle mb-16"
        >
          Complete Lineup of Premium Motorcycles
        </motion.p>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bikes.map((bike, index) => (
            <ShowcaseCard key={bike.id} bike={bike} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
