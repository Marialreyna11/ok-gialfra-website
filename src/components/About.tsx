import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import ArtTile from './art/ArtTile'
import { IconWarehouse, IconDerrick, IconTruck, IconCheck } from './icons'
import { COMPANY } from '../data/content'

const points = [
  'Specification-driven sourcing of equipment, materials and spare parts',
  'A responsive sales desk focused on accuracy and fast turnaround',
  'An international supplier network for competitive, reliable supply',
  'Dedicated procurement support for projects, turnarounds and MRO',
]

export default function About() {
  return (
    <section id="about" className="relative bg-navy-950 py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Visual montage */}
        <Reveal className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <ArtTile icon={IconDerrick} tone="dusk" seed={1} className="aspect-[4/5] rounded-lg border border-white/10" />
              <ArtTile icon={IconTruck} tone="graphite" seed={2} className="aspect-square rounded-lg border border-white/10" />
            </div>
            <div className="space-y-4 pt-8">
              <ArtTile icon={IconWarehouse} tone="navy" seed={3} className="aspect-square rounded-lg border border-white/10" />
              <ArtTile icon={IconCheck} tone="copper" seed={4} className="aspect-[4/5] rounded-lg border border-white/10" />
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={`About ${COMPANY.name}`}
            title="A Procurement Partner Built For Industrial Demand"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-steel-300">
              {COMPANY.name} provides procurement, sourcing, industrial supply and project support solutions for
              companies operating in the world&apos;s most demanding sectors. From a single critical spare to a full
              project scope, we source the right equipment — on specification, at the right price, on time.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 leading-relaxed text-steel-400">
              Our approach is built on reliability, responsiveness and technical accuracy. We combine disciplined
              procurement processes with an international network of qualified suppliers to give our clients
              competitive supply and dependable service on every requirement.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={0.2 + i * 0.06} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper-500/15 text-copper-400">
                  <IconCheck className="h-4 w-4" />
                </span>
                <span className="text-steel-200">{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
