import { motion } from 'framer-motion'
import { STATS } from '../data/content'
import { IconArrow } from './icons'

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-h)]">
      {/* Background — oilfield photograph on the right, blended into the light
          text side on the left (matches the reference composition). */}
      <div className="absolute inset-0">
        <img
          src={`${import.meta.env.BASE_URL}images/about/oil-gas.jpg?v=3`}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-center lg:w-[60%]"
        />
        {/* Smooth horizontal blend: solid light on the left for the headline,
            fading to reveal the photo on the right. Heavier veil on mobile. */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/90 to-paper/70 lg:from-paper lg:from-40% lg:via-paper/55 lg:via-[68%] lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/55 via-transparent to-paper/20 lg:to-transparent" />
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

          <h1 className="mt-6 font-display text-5xl font-bold leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
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

        {/* floating statistics / trust panel */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-card sm:grid-cols-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3.5 bg-white px-5 py-5 sm:gap-4 sm:px-6">
              <s.icon className="h-8 w-8 shrink-0 text-copper-500 sm:h-9 sm:w-9" />
              <div className="min-w-0">
                <div className="font-display text-2xl font-bold leading-none text-ink sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs leading-tight text-mute sm:text-sm">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
