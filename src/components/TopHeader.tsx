import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BsDiamondFill } from "react-icons/bs";

const messages = [
  "Free Test Ride Available",
  "New 2026 Models Arrived",
  "Premium Racing Collection",
  "Luxury Bike Showroom",
];

export default function TopHeader() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    let animationId: number;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position -= speed;
      const firstChild = marquee.firstElementChild as HTMLElement;
      if (firstChild && Math.abs(position) >= firstChild.offsetWidth / 2) {
        position = 0;
      }
      marquee.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const allMessages = [...messages, ...messages, ...messages, ...messages];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-[38px] bg-black border-b border-gold/15 overflow-hidden relative z-50"
    >
      <div
        ref={marqueeRef}
        className="flex items-center h-full whitespace-nowrap will-change-transform"
      >
        {allMessages.map((msg, index) => (
          <div key={index} className="flex items-center gap-6 px-6">
            <span className="font-primary text-xs font-normal uppercase tracking-[0.15em] text-gold">
              {msg}
            </span>
            <BsDiamondFill className="text-red text-[6px] flex-shrink-0" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
