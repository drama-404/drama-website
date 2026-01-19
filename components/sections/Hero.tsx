'use client';

/**
 * Hero Section with 4-Phase Scroll Animation
 *
 * This component creates the full hero experience with:
 * - Fixed 3D Rubik's cube background
 * - 4 scrollable sections that trigger cube animation phases
 * - Glassmorphism overlays for content
 *
 * Section Flow:
 * 1. Hero - Main headline, cube rotates on the side
 * 2. Details - "Break it down" message, cube centers
 * 3. Breakdown - Spec labels, cube explodes
 * 4. Footer - "Order from Chaos", cubes drop with physics
 */

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Lazy load 3D scene to avoid SSR issues with Three.js
const RubiksCubeScene = dynamic(
  () => import('@/components/three/RubiksCubeScene'),
  {
    ssr: false,
    loading: () => <HeroLoadingState />,
  }
);

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ============================================================================
// SPEC LABEL COMPONENT
// ============================================================================

interface SpecLabelProps {
  label: string;
  value: string;
  sub: string;
  align?: 'left' | 'right';
}

function SpecLabel({ label, value, sub, align = 'left' }: SpecLabelProps) {
  return (
    <div
      className={`
        relative p-6 rounded-2xl
        bg-base-dark/40 backdrop-blur-xl
        border border-white/10
        transition-all duration-300
        hover:bg-base-dark/60 hover:border-accent-cyan/30
        ${align === 'right' ? 'text-right' : 'text-left'}
      `}
    >
      {/* Accent line */}
      <div
        className={`
          absolute top-0 ${align === 'right' ? 'right-0' : 'left-0'}
          w-1 h-full bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-magenta
          rounded-full opacity-50
        `}
      />

      <span className="text-xs font-mono uppercase tracking-widest text-text-secondary">
        {label}
      </span>
      <h4 className="text-3xl md:text-4xl font-display font-bold text-text-primary mt-2">
        {value}
      </h4>
      <p className="text-sm text-text-secondary mt-1">{sub}</p>
    </div>
  );
}

// ============================================================================
// LOADING STATE
// ============================================================================

function HeroLoadingState() {
  return (
    <div className="w-full h-full bg-base-darker flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
        <span className="text-accent-cyan font-mono text-sm animate-pulse">
          Loading Experience...
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

export function Hero() {
  return (
    <>
      {/* Fixed 3D Background - Stays in place while content scrolls */}
      <div className="fixed inset-0 z-0">
        <RubiksCubeScene />
      </div>

      {/* Scrollable Content Overlay */}
      <div className="relative z-10">
        {/* ================================================================ */}
        {/* SECTION 1: HERO */}
        {/* ================================================================ */}
        <section
          id="hero-section"
          className="relative min-h-screen flex items-center pointer-events-none"
        >
          <div className="max-w-4xl px-6 md:px-16 pointer-events-auto">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="space-y-6"
            >
              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tight"
              >
                <span className="bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-magenta bg-clip-text text-transparent">
                  ARCHITECTING
                </span>
                <br />
                <span className="text-text-primary">INTELLIGENCE</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl lg:text-2xl text-text-secondary max-w-lg"
              >
                AI Engineer & Full-Stack Developer crafting sophisticated systems that learn, adapt, and scale.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full font-medium text-base-darker overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-cyan/25">
                  <span className="relative z-10">Start a Project</span>
                </button>
                <button className="px-8 py-4 border border-text-secondary/30 rounded-full font-medium text-text-primary hover:border-accent-cyan hover:text-accent-cyan transition-all duration-300">
                  Explore Services
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-text-secondary">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 rounded-full border-2 border-text-secondary/30 flex items-start justify-center p-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            </motion.div>
          </motion.div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 2: DETAILS (Cube centers and continues rotating) */}
        {/* ================================================================ */}
        <section
          id="details-section"
          className="relative min-h-screen flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl px-6 pointer-events-auto"
          >
            <div className="p-8 md:p-12 rounded-3xl bg-base-dark/40 backdrop-blur-xl border border-white/10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
                Break it down.
              </h2>
              <p className="text-xl md:text-2xl font-bold text-text-primary">
                Analyze every bit.
              </p>
              <p className="text-text-secondary mt-6 text-lg">
                Watch as complex challenges align perfectly.
                <br />
                Turning chaos into elegant solutions.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 3: BREAKDOWN (Cube explodes, spec labels appear) */}
        {/* ================================================================ */}
        <section
          id="breakdown-section"
          className="relative min-h-screen flex items-center justify-center pointer-events-none"
        >
          <div className="w-full max-w-6xl px-6 md:px-16">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 pointer-events-auto"
            >
              <h3 className="text-3xl md:text-5xl font-display italic text-text-primary mb-4">
                System Architecture
              </h3>
              <span className="inline-block px-4 py-2 rounded-full border border-white/10 bg-base-dark/40 backdrop-blur text-xs font-mono uppercase tracking-widest text-text-secondary">
                Schematic v2.0
              </span>
            </motion.div>

            {/* Spec Labels Grid */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pointer-events-auto">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-8"
              >
                <SpecLabel
                  label="Latency"
                  value="< 100ms"
                  sub="Real-time AI responses"
                />
                <SpecLabel
                  label="Accuracy"
                  value="99.2%"
                  sub="Production-grade models"
                />
              </motion.div>

              {/* Center Space (for exploded cube) */}
              <div className="w-64 h-64 md:w-96 md:h-96" />

              {/* Right Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-8"
              >
                <SpecLabel
                  label="Scale"
                  value="∞"
                  sub="Cloud-native architecture"
                  align="right"
                />
                <SpecLabel
                  label="Uptime"
                  value="99.99%"
                  sub="Enterprise reliability"
                  align="right"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 4: FOOTER (Cubes drop with physics, interactive) */}
        {/* ================================================================ */}
        <section
          id="footer-section"
          className="relative min-h-[90vh] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center z-20 pointer-events-auto"
          >
            <span className="text-sm font-mono uppercase tracking-[0.3em] text-text-secondary mb-8 block">
              Final Output
            </span>

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display italic text-text-primary leading-none tracking-tight">
              Order from
              <br />
              <span className="not-italic font-bold">Chaos.</span>
            </h2>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-16 group relative px-10 py-5 overflow-hidden rounded-2xl bg-base-dark/40 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-lg hover:shadow-accent-cyan/20"
            >
              {/* Accent border on left */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-accent-cyan to-accent-magenta opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between gap-8">
                <div className="text-left">
                  <span className="text-xs font-mono uppercase tracking-widest text-text-secondary block">
                    Initialize System
                  </span>
                  <span className="text-xl font-bold text-text-primary">
                    Get Started
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <svg
                    className="w-5 h-5 text-base-darker"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </motion.button>

            <p className="mt-8 text-xs font-mono text-text-secondary/60 uppercase tracking-wider">
              Hover over the cubes to interact
            </p>
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default Hero;
