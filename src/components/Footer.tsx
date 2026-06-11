import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaMotorcycle,
  FaFire,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";
import { footerLinks, socialLinks } from "../data/bikesData";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black border-t border-gold/15 pt-20 pb-10"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Top Area — 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <FaMotorcycle className="text-gold text-2xl" />
                <FaFire className="text-red text-sm absolute -top-1 -right-1.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-accent text-lg font-bold text-gold uppercase tracking-wider leading-tight">
                  GHOST RIDER
                </span>
                <span className="font-primary text-[7px] uppercase tracking-[0.3em] text-gray">
                  LUXURY BIKES
                </span>
              </div>
            </div>
            <p className="font-primary text-sm text-gray leading-relaxed">
              Redefining Motorcycle Luxury Since 2026. Your destination for
              premium superbikes and exclusive riding experiences.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: FaInstagram, label: "Instagram", href: socialLinks.instagram },
                { icon: FaFacebookF, label: "Facebook", href: socialLinks.facebook },
                { icon: FaTwitter, label: "Twitter", href: socialLinks.twitter },
                { icon: FaYoutube, label: "YouTube", href: socialLinks.youtube },
                { icon: FaLinkedinIn, label: "LinkedIn", href: socialLinks.linkedin },
              ].map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} profile`}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray hover:text-gold hover:border-gold/50 hover:shadow-gold transition-all duration-300"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-primary text-[13px] uppercase text-gold tracking-[0.15em] mb-5">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-primary text-[15px] text-gray hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-primary text-[13px] uppercase text-gold tracking-[0.15em] mb-5">
              CATEGORIES
            </h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-primary text-[15px] text-gray hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-primary text-[13px] uppercase text-gold tracking-[0.15em] mb-5">
              NEWSLETTER
            </h4>
            <p className="font-primary text-sm text-gray mb-4 leading-relaxed">
              Subscribe for latest updates and exclusive offers
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-11 glass rounded-l-lg px-4 font-primary text-sm text-white placeholder-gray focus:border-gold outline-none transition-all duration-300"
                aria-label="Newsletter email"
              />
              <motion.button
                type="submit"
                className="h-11 px-4 bg-gold text-black rounded-r-lg flex items-center justify-center transition-all duration-300 hover:brightness-110"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Subscribe to newsletter"
              >
                <FaPaperPlane size={14} />
              </motion.button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold text-xs mt-2 font-primary"
              >
                Thanks for subscribing!
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gold/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-primary text-[13px] text-gray text-center sm:text-left">
            © 2026 Ghost Rider Luxury Bikes. All Rights Reserved.
          </p>
          <p className="font-primary text-[13px] text-gray">
            Created By <span className="text-gold">M.Rajpoot</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
