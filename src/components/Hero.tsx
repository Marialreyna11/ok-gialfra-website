import { motion } from 'framer-motion'
import { STATS } from '../data/content'
import { IconArrow } from './icons'

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-h)]">
      {/* Background — oilfield photograph on the right, cinematically de-saturated
          and cool-graded, with a very slow subconscious zoom. Blends seamlessly
          into the clean editorial light area on the left. */}
      <div className="absolute inset-0">
        {/* Full-bleed photo (no hard container edge) so the only visible
            transition is the soft gradient itself. */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}images/about/oil-gas.jpg?v=3`}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
            style={{ filter: 'saturate(0.42) brightness(0.88) contrast(1.06)' }}
            className="h-full w-full animate-slow-pan object-cover object-[64%_center] will-change-transform"
          />
          {/* charcoal/steel grade so the warm photo reads premium, not poster-like */}
          <div className="pointer-events-none absolute inset-0 bg-navy-950/30 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/35 via-transparent to-navy-900/15" />
        </div>
        {/* Seamless, WIDE left→right blend: clean editorial light holds on the left,
            then fades gradually across a broad band into the photograph — no hard
            vertical division. */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/88 to-paper/64 lg:from-paper lg:from-[30%] lg:via-paper/52 lg:via-[62%] lg:to-transparent lg:to-[98%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/48 via-transparent to-paper/12 lg:to-transparent" />
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

          <h1 className="mt-7 font-display text-5xl font-bold leading-[1.0] tracking-[-0.01em] text-ink sm:text-6xl lg:text-[4.7rem]">
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

        {/* floating statistics / trust panel — premium corporate dashboard feel */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[0_20px_50px_-28px_rgba(21,34,49,0.28)] sm:grid-cols-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-4 bg-white px-6 py-7">
              <s.icon className="h-6 w-6 shrink-0 text-copper-500" />
              <div className="min-w-0">
                <div className="font-display text-2xl font-bold leading-none text-ink sm:text-[1.75rem]">{s.value}</div>
                <div className="mt-1.5 text-xs leading-tight text-mute">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
