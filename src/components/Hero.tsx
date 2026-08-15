import { motion } from 'framer-motion'
import { STATS } from '../data/content'
import { IconArrow } from './icons'
import CountUp from './CountUp'
import HeroHud from './HeroHud'

// Short descriptive sub-labels for the trust card (matches the reference layout).
// Non-numeric descriptive copy only — no fabricated statistics.
const STAT_SUB: Record<string, string> = {
  'Global Support': 'Always available.',
  'Industries Served': 'Diverse sector expertise.',
  'Supply Network': 'Worldwide reach.',
  'Commitment to Quality': 'Quality you can trust.',
}

const headline = ['GLOBAL PROCUREMENT.', 'INDUSTRIAL SOLUTIONS.', 'DELIVERED.']

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[var(--nav-h)]">
      {/* Background — cinematic, de-saturated oilfield photograph graded toward
          steel/navy, with a very slow subconscious zoom. Blends seamlessly into
          the clean editorial light area on the left. */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}images/about/oil-gas.jpg?v=3`}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
            style={{ filter: 'saturate(0.5) brightness(1.06) contrast(1.02)' }}
            className="h-full w-full animate-slow-pan object-cover object-[64%_center] will-change-transform"
          />
          {/* light steel grade — keeps it premium/cinematic while staying bright and
              clean so the oilfield equipment reads clearly */}
          <div className="pointer-events-none absolute inset-0 bg-navy-950/16 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/22 via-transparent to-transparent" />
        </div>
        {/* Wide, seamless left→right blend — no hard vertical division */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/88 to-paper/64 lg:from-paper lg:from-[28%] lg:via-paper/50 lg:via-[60%] lg:to-transparent lg:to-[96%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/40 via-transparent to-paper/10 lg:to-transparent" />
      </div>

      <div className="container-x relative z-10 pb-10 pt-10 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-6">
          {/* Left — editorial content */}
          <div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Procurement &amp; Oilfield Supply
            </motion.span>

            <h1 className="mt-6 font-display text-3xl font-bold leading-[1.04] tracking-[-0.01em] text-ink sm:text-4xl lg:text-[2.9rem]">
              {headline.map((line, i) => (
                <motion.span
                  key={line}
                  className={`block ${i === 2 ? 'text-copper-500' : ''}`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.12 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-mute lg:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5 }}
            >
              Reliable sourcing and procurement solutions for Oil &amp; Gas, Energy, Industrial and
              Infrastructure projects.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.62 }}
            >
              <a href="#rfq" className="btn-primary group">
                Request a Quote
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#capabilities" className="btn-ghost">
                Our Capabilities
              </a>
            </motion.div>
          </div>

          {/* Right — Global Supply Network HUD (over the photograph) */}
          <motion.div
            className="relative hidden justify-center lg:flex"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
          >
            {/* soft scrim keeps the white HUD label legible over the brighter photo */}
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_center,rgba(13,27,42,0.42),transparent_62%)]" />
            <HeroHud className="relative" />
          </motion.div>
        </div>

        {/* Trust / statistics card — premium corporate dashboard feel */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[0_24px_60px_-34px_rgba(21,34,49,0.30)] sm:grid-cols-4"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.7 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-4 bg-white px-6 py-6">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-copper-500/10 text-copper-500">
                <s.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <CountUp
                  value={s.value}
                  className="block font-display text-2xl font-bold leading-none text-ink sm:text-[1.7rem]"
                />
                <div className="mt-1 text-[13px] font-semibold leading-tight text-ink/80">{s.label}</div>
                {STAT_SUB[s.label] && <div className="text-xs leading-tight text-mute">{STAT_SUB[s.label]}</div>}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
