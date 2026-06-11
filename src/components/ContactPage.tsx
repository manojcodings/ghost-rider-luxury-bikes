import { useState, useEffect, useRef } from 'react';
import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Footer from './Footer';
import Contact from './Contact';

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Canvas particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.life = Math.random() * 100 + 100;
        this.age = 0;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.age++;

        if (this.age > this.life || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity * (1 - this.age / this.life)})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = Array.from({ length: 50 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const contactInfo = [
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ), 
      label: 'Call Us', 
      value: '+91 92****900',
      href: 'tel:+9192****900'
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ), 
      label: 'Email Us', 
      value: 'manojcodewith@gmail.com',
      href: 'mailto:manojcodewith@gmail.com'
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      label: 'Visit Us', 
      value: 'Delhi, India',
      href: 'https://maps.google.com/?q=Delhi,India'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      <TopHeader />
      <Navbar />

      {/* Page Header */}
      <section 
        ref={heroRef}
        className="relative pt-36 pb-20 px-4 text-center overflow-hidden min-h-[70vh] flex flex-col items-center justify-center"
      >
        {/* Dynamic Gradient Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          }}
        />
        
        {/* Radial Glow Effect */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${50 + mousePosition.x * 20}% ${30 + mousePosition.y * 20}%, rgba(212, 175, 55, 0.15), transparent 40%)`
          }}
        />

        {/* Floating Orbs */}
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-[100px] animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-[120px]"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />

        {/* Content */}
        <div 
          className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Accent Label with Animated Line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold animate-expand" />
            <p className="font-accent text-gold tracking-[0.3em] uppercase text-sm">
              Get In Touch
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold animate-expand" />
          </div>

          {/* Main Title with Character Animation */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white mb-6 relative">
            <span className="inline-block animate-title-reveal" style={{ animationDelay: '0.1s' }}>
              C
            </span>
            <span className="inline-block animate-title-reveal" style={{ animationDelay: '0.15s' }}>
              o
            </span>
            <span className="inline-block animate-title-reveal" style={{ animationDelay: '0.2s' }}>
              n
            </span>
            <span className="inline-block animate-title-reveal" style={{ animationDelay: '0.25s' }}>
              t
            </span>
            <span className="inline-block animate-title-reveal" style={{ animationDelay: '0.3s' }}>
              a
            </span>
            <span className="inline-block animate-title-reveal" style={{ animationDelay: '0.35s' }}>
              c
            </span>
            <span className="inline-block animate-title-reveal" style={{ animationDelay: '0.4s' }}>
              t
            </span>
            <span className="inline-block mx-3" />
            <span className="inline-block animate-title-reveal text-gold" style={{ animationDelay: '0.5s' }}>
              U
            </span>
            <span className="inline-block animate-title-reveal text-gold" style={{ animationDelay: '0.55s' }}>
              s
            </span>
          </h1>

          {/* Animated Divider */}
          <div className="relative w-24 h-[2px] mx-auto mt-8 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gold animate-shimmer" />
          </div>

          {/* Description with Fade In */}
          <p 
            className={`font-primary text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            Have a question about a bike? Want to book a test ride? Or just want to talk
            motorcycles? We'd love to hear from you.
          </p>
        </div>

        {/* Quick Info Row - Advanced Cards */}
        <div 
          className={`flex flex-wrap justify-center gap-6 md:gap-10 mt-16 relative z-10 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {contactInfo.map(({ icon, label, value, href }, index) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative"
              style={{ animationDelay: `${1.2 + index * 0.15}s` }}
            >
              <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-gold/30 hover:scale-105 hover:-translate-y-2 min-w-[200px]">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/10 group-hover:to-transparent transition-all duration-500" />
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-gold/0 group-hover:bg-gold/50 transition-all duration-500" />
                <div className="absolute top-0 left-0 w-[1px] h-8 bg-gold/0 group-hover:bg-gold/50 transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-gold/0 group-hover:bg-gold/50 transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-gold/0 group-hover:bg-gold/50 transition-all duration-500" />

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 text-gold mb-4 transition-all duration-500 group-hover:bg-gold/20 group-hover:scale-110 group-hover:rotate-3">
                    {icon}
                  </div>
                  <p className="font-primary text-white/40 text-xs uppercase tracking-[0.2em] mb-2 transition-colors duration-300 group-hover:text-white/60">
                    {label}
                  </p>
                  <p className="font-display text-sm font-bold text-gold transition-all duration-300 group-hover:text-gold/90 group-hover:tracking-wider">
                    {value}
                  </p>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[1.5s] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Contact Form & Details */}
      <div className="relative z-10">
        <Contact />
      </div>

      <Footer />

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes expand {
          from { width: 0; }
          to { width: 3rem; }
        }
        
        @keyframes title-reveal {
          from {
            opacity: 0;
            transform: translateY(40px) rotateX(-40deg);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
            filter: blur(0);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-expand {
          animation: expand 1s ease-out forwards;
        }
        
        .animate-title-reveal {
          display: inline-block;
          opacity: 0;
          animation: title-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--delay, 0s);
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
}