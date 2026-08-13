import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { WHY } from '../data/content'

export default function WhyUs() {
  return (
    <section id="why" className="relative bg-navy-950 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why OK. GIALFRA"
          title="Built On Reliability & Response"
          intro="The qualities our clients count on when supply certainty matters most."
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal as="article" key={w.title} delay={(i % 3) * 0.07}>
              <div className="card-surface group flex h-full items-start gap-4 p-6 hover:border-copper-500/40 hover:shadow-card">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-copper-500 to-copper-600 text-white shadow-glow">
                  <w.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-base text-white">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel-400">{w.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
