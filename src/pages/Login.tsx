import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// ── Zod validation schema ─────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ── Particle component ────────────────────────────────────────────────────────

function FloatingParticle({ delay, duration, x, size }: {
  delay: number; duration: number; x: number; size: number;
}) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(255,59,59,0.2) 100%)`,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -120, -200],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

// ── Main Login Page ───────────────────────────────────────────────────────────

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Redirect already-authenticated users immediately
  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  // ── Animated canvas background lines ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const lines = 6;
      for (let i = 0; i < lines; i++) {
        const progress = (i / lines + time * 0.0002) % 1;
        const x = progress * canvas.width * 1.4 - canvas.width * 0.2;
        const alpha = Math.sin(progress * Math.PI) * 0.12;
        const grad = ctx.createLinearGradient(x - 80, 0, x + 80, canvas.height);
        grad.addColorStop(0, `rgba(212,175,55,0)`);
        grad.addColorStop(0.5, `rgba(212,175,55,${alpha})`);
        grad.addColorStop(1, `rgba(255,59,59,0)`);
        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - canvas.width * 0.3, canvas.height);
        ctx.stroke();
        ctx.restore();
      }
      time++;
      animFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ── Form setup ───────────────────────────────────────────────────────────────

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember: false },
  });

  const emailValue = watch('email');
  const passwordValue = watch('password');

  // ── Submit handler ───────────────────────────────────────────────────────────

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      await login(data);
      setLoginSuccess(true);
      setTimeout(() => navigate('/admin/dashboard', { replace: true }), 1200);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Particles data ───────────────────────────────────────────────────────────

  const particles = Array.from({ length: 18 }, (_, i) => ({
    delay: i * 0.6,
    duration: 3.5 + (i % 4) * 0.7,
    x: 5 + (i * 31) % 90,
    size: 3 + (i % 3) * 2,
  }));

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#0A0A0A]">

      {/* ── Background: generated bike image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/login-bg.png')` }}
      />

      {/* ── Dark overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/75 to-[#0A0A0A]/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

      {/* ── Animated scan lines canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* ── Radial gold glow behind card ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ── Main card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Card glass panel */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(10,10,10,0.82)',
            backdropFilter: 'blur(32px)',
            border: '1px solid rgba(212,175,55,0.18)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.06), inset 0 1px 0 rgba(212,175,55,0.1)',
          }}
        >
          {/* Top gold accent bar */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="px-8 pt-10 pb-10">
            {/* ── Brand header ── */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center mb-10"
            >
              {/* Logo icon */}
              <div className="relative mb-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    boxShadow: '0 0 30px rgba(212,175,55,0.2), inset 0 1px 0 rgba(212,175,55,0.15)',
                  }}
                >
                  <Flame
                    className="w-7 h-7"
                    style={{ color: '#D4AF37', filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))' }}
                  />
                </div>
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-gold/30"
                  animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
              </div>

              {/* Brand name */}
              <h1
                className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-white mb-1"
                style={{ textShadow: '0 0 30px rgba(212,175,55,0.25)' }}
              >
                Ghost Rider
              </h1>
              <p className="font-accent text-gold/80 text-xs tracking-[0.35em] uppercase">
                Luxury Bikes · Admin Portal
              </p>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 mt-5 w-full">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/30" />
                <ShieldCheck className="w-4 h-4 text-gold/50" />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/30" />
              </div>
            </motion.div>

            {/* ── Success animation ── */}
            <AnimatePresence>
              {loginSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)',
                      border: '2px solid rgba(212,175,55,0.5)',
                      boxShadow: '0 0 40px rgba(212,175,55,0.3)',
                    }}
                  >
                    <ShieldCheck className="w-10 h-10 text-gold" />
                  </motion.div>
                  <p className="font-display text-lg text-white uppercase tracking-widest">
                    Access Granted
                  </p>
                  <p className="font-primary text-gold/60 text-sm mt-1 tracking-wider">
                    Redirecting to dashboard…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Form ── */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              noValidate
            >
              {/* Server error alert */}
              <AnimatePresence>
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="mb-6 overflow-hidden"
                  >
                    <div
                      className="flex items-start gap-3 px-4 py-3 rounded-lg"
                      style={{
                        background: 'rgba(255,59,59,0.08)',
                        border: '1px solid rgba(255,59,59,0.3)',
                      }}
                    >
                      <AlertCircle className="w-4 h-4 text-red mt-0.5 shrink-0" />
                      <p className="font-primary text-sm text-red/90 leading-snug">{serverError}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Email field ── */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block font-primary text-xs text-gold/70 uppercase tracking-widest mb-2"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@ghostrider.com"
                    {...register('email')}
                    className="w-full font-primary text-sm text-white placeholder-white/20 rounded-lg px-4 py-3.5 outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: errors.email
                        ? '1px solid rgba(255,59,59,0.6)'
                        : emailValue
                        ? '1px solid rgba(212,175,55,0.4)'
                        : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: errors.email
                        ? '0 0 0 3px rgba(255,59,59,0.08)'
                        : emailValue
                        ? '0 0 0 3px rgba(212,175,55,0.06)'
                        : 'none',
                    }}
                  />
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                    style={{ boxShadow: '0 0 20px rgba(212,175,55,0.06)' }}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 flex items-center gap-1.5 font-primary text-xs text-red/80"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* ── Password field ── */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block font-primary text-xs text-gold/70 uppercase tracking-widest mb-2"
                >
                  Password
                </label>
                <div className="relative group">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    {...register('password')}
                    className="w-full font-primary text-sm text-white placeholder-white/20 rounded-lg px-4 py-3.5 pr-12 outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: errors.password
                        ? '1px solid rgba(255,59,59,0.6)'
                        : passwordValue
                        ? '1px solid rgba(212,175,55,0.4)'
                        : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: errors.password
                        ? '0 0 0 3px rgba(255,59,59,0.08)'
                        : passwordValue
                        ? '0 0 0 3px rgba(212,175,55,0.06)'
                        : 'none',
                    }}
                  />
                  {/* Toggle visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-gold/70 transition-colors duration-200 p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                    style={{ boxShadow: '0 0 20px rgba(212,175,55,0.06)' }}
                  />
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 flex items-center gap-1.5 font-primary text-xs text-red/80"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* ── Remember me + Forgot password ── */}
              <div className="flex items-center justify-between mb-7">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input
                      id="remember"
                      type="checkbox"
                      {...register('remember')}
                      className="sr-only peer"
                    />
                    <div
                      className="w-4 h-4 rounded border transition-all duration-200 peer-checked:bg-gold/20 peer-checked:border-gold/60 flex items-center justify-center"
                      style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                    >
                      <motion.svg
                        className="w-2.5 h-2.5 text-gold opacity-0 peer-checked:opacity-100"
                        fill="none"
                        viewBox="0 0 10 10"
                      >
                        <path d="M1 5l3 3 5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </div>
                  </div>
                  <span className="font-primary text-xs text-white/40 group-hover:text-white/60 transition-colors tracking-wide">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-primary text-xs text-gold/50 hover:text-gold transition-colors duration-200 tracking-wide"
                >
                  Forgot password?
                </Link>
              </div>

              {/* ── Submit button ── */}
              <motion.button
                id="login-submit-btn"
                type="submit"
                disabled={isSubmitting || loginSuccess}
                whileHover={!isSubmitting ? { scale: 1.015 } : {}}
                whileTap={!isSubmitting ? { scale: 0.985 } : {}}
                className="relative w-full py-4 rounded-lg font-display text-sm uppercase tracking-[0.2em] text-white font-semibold overflow-hidden transition-all duration-300 disabled:cursor-not-allowed"
                style={{
                  background: isSubmitting
                    ? 'rgba(255,59,59,0.3)'
                    : 'linear-gradient(135deg, #FF3B3B 0%, #cc2222 50%, #FF3B3B 100%)',
                  backgroundSize: '200% 100%',
                  boxShadow: isSubmitting
                    ? 'none'
                    : '0 4px 25px rgba(255,59,59,0.35), 0 0 0 1px rgba(255,59,59,0.2)',
                }}
              >
                {/* Shimmer overlay */}
                {!isSubmitting && (
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
                    }}
                  />
                )}

                <span className="relative flex items-center justify-center gap-2.5">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating…</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </>
                  )}
                </span>
              </motion.button>
            </motion.form>

            {/* ── Footer note ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="font-primary text-xs text-white/20 tracking-wider leading-relaxed">
                This portal is restricted to authorised personnel only.
                <br />
                All access attempts are monitored and logged.
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
                <span className="font-primary text-[10px] text-white/20 tracking-widest uppercase">
                  Secure Connection
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom gold accent bar */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>

        {/* Card outer glow */}
        <div
          className="absolute -inset-[1px] rounded-2xl -z-10 opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, transparent 50%, rgba(255,59,59,0.08) 100%)',
            filter: 'blur(1px)',
          }}
        />
      </motion.div>

      {/* ── Bottom brand watermark ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 pointer-events-none"
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/20" />
        <span className="font-accent text-[10px] text-white/15 tracking-[0.4em] uppercase">
          Ghost Rider Luxury Bikes
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/20" />
      </motion.div>
    </div>
  );
}
