import { motion } from 'framer-motion'
import HeroScene from './art/HeroScene'
import { STATS } from '../data/content'
import { IconArrow } from './icons'

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-h)]">
      {/* Background scene */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-slow-pan">
          <HeroScene className="h-full w-full" />
        </div>
        {/* light readability wash — keeps the industrial scene visible while
            lifting the text side to a bright, premium tone */}
        <div className="absolute inset-0 bg-gradient-to-br from-paper via-paper/88 to-paper/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-transparent to-paper/55" />
        <div className="absolute inset-0 bg-grid-steel [background-size:60px_60px] opacity-30" />
      </div>

      <div className="container-x relative z-10 py-20">
        <div className="max-w-3xl">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Procurement &amp; Oilfield Supply
          </motion.span>

          <h1 className="mt-6 font-display text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
            {['GLOBAL PROCUREMENT.', 'INDUSTRIAL SOLUTIONS.', 'DELIVERED.'].map((line, i) => (
              <motion.span
                key={line}
                className={`block ${i === 2 ? 'text-copper-500' : ''}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-mute"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            Reliable sourcing and procurement solutions for Oil &amp; Gas, Energy, Industrial and
            Infrastructure projects.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68 }}
          >
            <a href="#rfq" className="btn-primary group">
              Request a Quote
              <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#capabilities" className="btn-ghost">
              Our Capabilities
            </a>
          </motion.div>
        </div>

        {/* stat strip */}
        <motion.div
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line shadow-card sm:grid-cols-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-white/85 px-5 py-5 backdrop-blur">
              <div className="font-display text-3xl text-ink">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-mute">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-ink/25 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-copper-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  )
}
