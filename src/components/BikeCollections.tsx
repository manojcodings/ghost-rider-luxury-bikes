import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { collections } from "../data/bikesData";

function CollectionCard({
  collection,
  index,
}: {
  collection: typeof collections[0];
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Skeleton Loader */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}

      {/* Image */}
      <motion.img
        src={collection.image}
        alt={collection.alt}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.7 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Hover Border Glow */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/50 transition-all duration-500 group-hover:shadow-gold-lg" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:-translate-y-2 transition-transform duration-500">
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-1">
          {collection.name}
        </h3>
        <div className="flex items-center gap-2 text-gold">
          <span className="font-primary text-sm">{collection.subtitle}</span>
          <FaArrowRight className="text-sm opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
}

export default function BikeCollections() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-title"
        >
          OUR COLLECTIONS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="section-subtitle mb-16"
        >
          Curated Categories For Every Rider
        </motion.p>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

