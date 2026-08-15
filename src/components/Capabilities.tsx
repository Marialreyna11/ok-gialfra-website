import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { CAPABILITIES } from '../data/content'

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative border-y border-line bg-paper py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid-steel [background-size:44px_44px] opacity-[0.15]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Our Capabilities"
          title="Full-Spectrum Procurement & Supply"
          intro="A complete set of sourcing, supply and project capabilities engineered for industrial operations."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal as="article" key={c.title} delay={(i % 4) * 0.06}>
              <div className="card-surface group h-full p-6 hover:-translate-y-1 hover:border-copper-500/40 hover:shadow-card">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-lg border border-line bg-gradient-to-br from-navy-800 to-graphite-900 text-copper-400 transition-colors group-hover:border-copper-500/50 group-hover:text-copper-300">
                  <c.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg text-ink">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mute">{c.desc}</p>
                <div className="mt-5 h-px w-10 bg-copper-500/60 transition-all duration-300 group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
