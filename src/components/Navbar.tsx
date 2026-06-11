import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMotorcycle } from "react-icons/fa";
import { GiFire } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks } from "../data/bikesData";
import { useNavigate } from 'react-router';


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setMobileMenuOpen(false);

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className={`fixed top-[38px] left-0 w-full h-[72px] z-[1000] transition-all duration-500 ${scrolled
            ? "glass-strong shadow-glass"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleLinkClick("#home"); }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <FaMotorcycle className="text-gold text-3xl" />
              <GiFire className="text-red text-lg absolute -top-1 -right-2 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-accent text-xl font-bold text-gold uppercase tracking-wider leading-tight">
                GHOST RIDER
              </span>
              <span className="font-primary text-[8px] uppercase tracking-[0.3em] text-gray">
                LUXURY BIKES
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                className={`relative font-primary text-sm uppercase tracking-[0.08em] transition-colors duration-300 group ${activeLink === link.href ? "text-gold" : "text-white hover:text-gold"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-300 ${activeLink === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button — Login */}
          <motion.a
            href="/login"
            onClick={(e) => { e.preventDefault(); navigate("/login"); }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="hidden lg:block btn-outline py-2.5 px-7 text-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-gold transition-colors"
          >
            {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[999] lg:hidden pt-[110px]"
          >
            <div className="flex flex-col items-center gap-8 py-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className={`font-display text-2xl uppercase tracking-wider ${activeLink === link.href ? "text-gold" : "text-white hover:text-gold"
                    }`}
                >
                  {link.name}
                </motion.a>
              ))}
              {/* Mobile Login Button */}
              <motion.a
                href="/login"
                onClick={(e) => { e.preventDefault(); navigate("/login"); setMobileMenuOpen(false); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="btn-outline mt-4"
              >
                Login
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}