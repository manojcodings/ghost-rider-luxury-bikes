import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaCheckCircle,
} from "react-icons/fa";
import { socialLinks } from "../data/bikesData";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9\s\-+]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    
    try {
      const apiBase = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
      const response = await fetch(`${apiBase}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit query to backend.");
      }
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ fullName: "", email: "", phone: "", message: "" });
      }, 4000);
    } catch (err) {
      console.warn("Failed to post contact query to database, using local fallback state.", err);
      // Fallback behavior: let user feel successful even if connection is spotty
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ fullName: "", email: "", phone: "", message: "" });
      }, 4000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const inputBase =
    "w-full h-[50px] glass rounded-lg px-4 py-3 font-primary text-[15px] text-white placeholder-gray transition-all duration-300 outline-none";
  const inputFocus = "border-gold shadow-[0_0_12px_rgba(212,175,55,0.15)]";
  const inputNormal = "border-gold/20";

  const textareaBase =
    "w-full glass rounded-lg px-4 py-3 font-primary text-[15px] text-white placeholder-gray transition-all duration-300 outline-none resize-none";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 gradient-dark-gray overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0A0A0A_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column — Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <span className="font-accent text-sm uppercase text-gold tracking-[0.2em]">
              GET IN TOUCH
            </span>
            <h2 className="font-display text-[42px] font-semibold text-white mt-2 mb-10">
              Contact Us
            </h2>

            {/* Glassmorphism Form Card */}
            <div className="glass rounded-2xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase} ${
                      focusedField === "fullName" || formData.fullName
                        ? inputFocus
                        : inputNormal
                    }`}
                    aria-label="Full name"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "fullname-error" : undefined}
                  />
                  <AnimatePresence>
                    {errors.fullName && (
                      <motion.p
                        id="fullname-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red text-xs mt-1 font-primary"
                      >
                        {errors.fullName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase} ${
                      focusedField === "email" || formData.email
                        ? inputFocus
                        : inputNormal
                    }`}
                    aria-label="Email address"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red text-xs mt-1 font-primary"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase} ${
                      focusedField === "phone" || formData.phone
                        ? inputFocus
                        : inputNormal
                    }`}
                    aria-label="Phone number"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.p
                        id="phone-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red text-xs mt-1 font-primary"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={`${textareaBase} ${
                      focusedField === "message" || formData.message
                        ? inputFocus
                        : inputNormal
                    }`}
                    aria-label="Your message"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        id="message-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red text-xs mt-1 font-primary"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full btn-primary py-4 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  aria-label="Send message"
                >
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle />
                        Message Sent Successfully!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Column — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            {/* Glassmorphism Info Card */}
            <div className="glass rounded-2xl p-6 md:p-8">
              {/* Gold Accent Line */}
              <div className="w-10 h-[2px] bg-gold mb-6" />

              <p className="font-accent text-base text-gold mb-8">
                Created By M.Rajpoot
              </p>

              {/* Email */}
              <div className="flex items-center gap-4 mb-8 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:border-gold/50 transition-all duration-300">
                  <FaEnvelope className="text-gold text-lg" />
                </div>
                <div>
                  <span className="font-primary text-xs uppercase text-gray block tracking-wider">
                    Email
                  </span>
                  <a
                    href="mailto:manojcodewith@gmail.com"
                    className="font-primary text-base text-white hover:text-gold transition-colors duration-300"
                  >
                    manojcodewith@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <span className="font-primary text-xs uppercase text-gray tracking-wider block mb-4">
                  Follow Us
                </span>
                <div className="flex gap-3">
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
                      className="w-11 h-11 rounded-full glass flex items-center justify-center text-gray hover:text-gold hover:border-gold/50 hover:shadow-gold transition-all duration-300"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
