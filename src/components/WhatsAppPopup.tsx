import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTimes, FaHeadset } from "react-icons/fa";

export default function WhatsAppPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasBeenShown) {
        setShowPopup(true);
        setHasBeenShown(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [hasBeenShown]);

  useEffect(() => {
    if (showPopup) {
      const dismissTimer = setTimeout(() => setShowPopup(false), 30000);
      return () => clearTimeout(dismissTimer);
    }
  }, [showPopup]);

  const togglePopup = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!hasBeenShown) {
      setHasBeenShown(true);
      setShowPopup(false);
    }
  }, [hasBeenShown]);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setIsOpen(false);
  }, []);

  const handleChatNow = () => {
    window.open("https://wa.me/919876543210", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* Popup Card */}
      <AnimatePresence>
        {(showPopup || isOpen) && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-4 w-[280px] glass rounded-2xl p-5 relative"
            role="dialog"
            aria-label="WhatsApp chat support"
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray hover:text-white transition-colors"
              aria-label="Close WhatsApp popup"
            >
              <FaTimes size={14} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-whatsapp/20 flex items-center justify-center">
                <FaHeadset className="text-whatsapp text-lg" />
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-white">
                  Need help?
                </h4>
                <span className="font-primary text-xs text-gray">
                  We are online
                </span>
              </div>
            </div>

            {/* Message */}
            <p className="font-primary text-sm text-white/80 mb-4 leading-relaxed">
              Need help choosing your dream bike? Chat with us on WhatsApp.
            </p>

            {/* Chat Button */}
            <motion.button
              onClick={handleChatNow}
              className="w-full py-3 bg-whatsapp text-white font-primary text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Chat with us on WhatsApp"
            >
              <FaWhatsapp size={16} />
              Chat Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        onClick={togglePopup}
        className="w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        style={{ boxShadow: "0 0 20px rgba(37, 211, 102, 0.4)" }}
        aria-label="Open WhatsApp chat"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </motion.button>
    </div>
  );
}
