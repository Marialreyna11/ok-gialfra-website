import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

// Placeholder slots — replace labels/logos as manufacturer partnerships are confirmed.
const SLOTS = Array.from({ length: 12 }).map((_, i) => `Brand ${i + 1}`)

export default function Brands() {
  return (
    <section id="brands" className="relative border-y border-white/5 bg-graphite-950 py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Brands & Manufacturers"
          title="Sourcing From Trusted Manufacturers"
          intro="We supply OEM and equivalent products from a broad base of established manufacturers. Partner logos are added here as relationships are confirmed."
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SLOTS.map((label, i) => (
            <Reveal key={label} delay={(i % 4) * 0.05}>
              <div className="group flex h-24 items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.03] transition-colors hover:border-copper-500/40 hover:bg-white/[0.06]">
                <span className="font-display text-sm uppercase tracking-widest text-steel-500 transition-colors group-hover:text-steel-300">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-steel-500">
            Looking for a specific manufacturer or brand?{' '}
            <a href="#rfq" className="font-semibold text-copper-400 hover:text-copper-300">
              Tell us what you need →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
