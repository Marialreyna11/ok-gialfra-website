import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Scene from './art/Scene'
import type { SceneName } from './art/Scene'
import { PRODUCTS } from '../data/content'

export default function Products() {
  return (
    <section id="products" className="relative border-y border-white/5 bg-graphite-950 py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Products & Equipment"
            title="An Extensive Product Range"
            intro="From critical rotating equipment to everyday consumables — sourced to your exact specification."
          />
          <Reveal>
            <a href="#rfq" className="btn-primary shrink-0">
              Request Product Pricing
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Reveal as="article" key={p.title} delay={(i % 4) * 0.05}>
              <a
                href="#rfq"
                className="group block overflow-hidden rounded-lg border border-white/10 bg-graphite-900 transition-all duration-300 hover:-translate-y-1 hover:border-copper-500/40 hover:shadow-card"
              >
                <div className="relative">
                  <Scene name={p.scene as SceneName} className="aspect-[5/4] transition-transform duration-500 group-hover:scale-105" />
                  <div className="pointer-events-none absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-navy-950/50 text-copper-400 backdrop-blur-sm">
                    <p.icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <h3 className="text-base text-white">{p.title}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wide text-copper-400 opacity-0 transition-opacity group-hover:opacity-100">
                    Quote →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
