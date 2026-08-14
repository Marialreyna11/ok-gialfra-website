import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import WorldMap from './art/WorldMap'
import { IconGlobe, IconHandshake, IconTruck } from './icons'

const highlights = [
  { icon: IconGlobe, title: 'International Reach', desc: 'Global sourcing capabilities across the Americas, Europe, the Middle East and Asia.' },
  { icon: IconHandshake, title: 'Qualified Vendors', desc: 'A growing network of manufacturers, distributors and specialized stockists.' },
  { icon: IconTruck, title: 'Consolidated Logistics', desc: 'Multi-origin orders coordinated into managed, documented shipments.' },
]

export default function GlobalSourcing() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-graphite-950 py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.28fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Global Sourcing"
            title="One Network. Worldwide Supply."
            intro="We source equipment, materials and industrial solutions through a global supplier network — connecting each requirement with the right technical and commercial source."
          />
          <div className="mt-10 space-y-6">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08} className="flex gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-navy-900 text-copper-400">
                  <h.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-base text-white">{h.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-steel-400">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="relative rounded-2xl border border-white/10 bg-navy-950/60 p-4 shadow-card">
            <WorldMap className="w-full" />
            <div className="absolute bottom-6 left-6 rounded-md border border-white/10 bg-navy-900/80 px-4 py-2 backdrop-blur">
              <div className="font-display text-sm uppercase tracking-wide text-copper-400">Homestead, FL</div>
              <div className="text-xs text-steel-400">Procurement Hub — United States</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
