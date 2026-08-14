import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { SERVICES } from '../data/content'

export default function Services() {
  return (
    <section id="services" className="relative bg-navy-950 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title="End-to-End Procurement & Supply Management"
          intro="From sourcing and supplier coordination to inspection, logistics and delivery, we manage the procurement process from requirement to fulfillment."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal as="article" key={s.title} delay={(i % 3) * 0.06}>
              <div className="group h-full bg-navy-950 p-8 transition-colors hover:bg-graphite-900">
                <span className="font-display text-4xl text-white/10 transition-colors group-hover:text-copper-500/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg text-white">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-steel-400">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
