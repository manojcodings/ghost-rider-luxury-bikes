import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { featuredBikes } from "../data/bikesData";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`text-sm ${i < rating ? "text-gold" : "text-gray"}`}
        />
      ))}
    </div>
  );
}

function BikeCard({ bike, index }: { bike: typeof featuredBikes[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-3d group"
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="card-3d-inner glass rounded-2xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image Area */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gold/5 to-transparent">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}
          <motion.img
            src={bike.image}
            alt={bike.alt}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content Area */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold text-white mb-1">
            {bike.name}
          </h3>
          <p className="font-primary text-sm text-gray mb-2">{bike.engine}</p>
          <StarRating rating={bike.rating} />
          <div className="flex items-center justify-between mt-4">
            <span className="font-accent text-2xl font-bold text-gold">
              ₹{bike.price}
            </span>
          </div>
          <motion.button
            className="w-full mt-4 py-3 bg-red text-white font-primary text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:brightness-110"
            whileHover={{
              boxShadow:
                "0 0 20px rgba(255, 59, 59, 0.4), 0 0 40px rgba(255, 59, 59, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Buy ${bike.name} now`}
          >
            Buy Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedBikes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [bikes, setBikes] = useState<typeof featuredBikes>(featuredBikes);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
        const response = await fetch(`${apiBase}/api/bikes?featured=true`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped = data.map((b: any) => ({
              id: b.id,
              name: b.name,
              engine: b.engine,
              rating: b.rating,
              price: typeof b.price === 'number' 
                ? Math.round(b.price).toLocaleString('en-IN') 
                : Math.round(parseFloat(b.price)).toLocaleString('en-IN'),
              image: b.image || featuredBikes[0].image,
              alt: b.alt || b.name,
            }));
            setBikes(mapped);
          }
        }
      } catch (err) {
        console.warn("Failed to load featured bikes from backend API. Using local mock data.", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section
      id="bikes"
      ref={sectionRef}
      className="relative py-24 md:py-32 gradient-dark-gray overflow-hidden"
    >
      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-title"
        >
          FEATURED PREMIUM BIKES
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="section-subtitle mb-16"
        >
          Handpicked Selection of World-Class Superbikes
        </motion.p>

        {/* Bike Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes.map((bike, index) => (
            <BikeCard key={bike.id} bike={bike} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
