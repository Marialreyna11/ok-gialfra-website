import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Scene from './art/Scene'
import type { SceneName } from './art/Scene'
import { INDUSTRIES } from '../data/content'
import { IconArrow } from './icons'

export default function Industries() {
  return (
    <section id="industries" className="relative bg-navy-950 py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Supplying The Sectors That Power The World"
          intro="Deep familiarity with the equipment, standards and supply chains of heavy industry and energy."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal as="article" key={ind.title} delay={(i % 4) * 0.06}>
              <div className="group relative overflow-hidden rounded-lg border border-white/10">
                <Scene name={ind.scene as SceneName} className="aspect-[4/5] transition-transform duration-500 group-hover:scale-105" />
                <div className="pointer-events-none absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-navy-950/50 text-copper-400 backdrop-blur-sm">
                  <ind.icon className="h-5 w-5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl text-white drop-shadow">{ind.title}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-sm text-steel-300 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                    {ind.desc}
                  </p>
                </div>
                <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <IconArrow className="h-4 w-4" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
