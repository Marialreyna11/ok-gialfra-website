import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import ArtTile from './art/ArtTile'
import { IconClipboard, IconCheck, IconFactory } from './icons'

const deliverables = [
  'Capital project & turnaround procurement',
  'Bulk materials and long-lead equipment',
  'Vendor data, certificates and documentation control',
  'Expediting, inspection and delivery management',
]

export default function ProjectSupport() {
  return (
    <section id="project-support" className="relative overflow-hidden border-y border-white/5 bg-graphite-950 py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Project Support"
            title="Procurement Support For Complex Projects"
            intro="From early enquiry to final delivery, we act as an extension of your project and procurement teams — managing scope, suppliers and logistics so your schedule holds."
          />
          <ul className="mt-8 space-y-3">
            {deliverables.map((d, i) => (
              <Reveal as="li" key={d} delay={i * 0.06} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper-500/15 text-copper-400">
                  <IconCheck className="h-4 w-4" />
                </span>
                <span className="text-steel-200">{d}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3}>
            <a href="#rfq" className="btn-primary mt-9">
              Discuss Your Project
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            <ArtTile icon={IconFactory} tone="dusk" seed={7} className="col-span-2 aspect-[16/9] rounded-lg border border-white/10" />
            <ArtTile icon={IconClipboard} tone="navy" seed={8} className="aspect-square rounded-lg border border-white/10" />
            <ArtTile icon={IconCheck} tone="copper" seed={9} className="aspect-square rounded-lg border border-white/10" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
