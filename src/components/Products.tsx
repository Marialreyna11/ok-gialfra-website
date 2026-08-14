import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { PRODUCTS } from '../data/content'

// Real industrial product photography (one per category) committed to
// public/images/products/<scene>.jpg. Bump PHOTO_V when an image is swapped so
// the browser / GitHub Pages CDN fetches the new bytes.
const BASE = import.meta.env.BASE_URL
const PHOTO_V = '1'

// Per-card treatment — CSS only, originals untouched, easy to tune later.
// Products read brighter than the Industries facility photos so the equipment
// and metallic detail stay clearly visible. Darker source photos get more lift.
const DEFAULT_FILTER = 'brightness(1.08) contrast(1.05) saturate(1.03)'
const PROD_FILTER: Record<string, string> = {
  valves: 'brightness(1.05) contrast(1.06)',
  pumps: 'brightness(1.05) contrast(1.06) saturate(1.04)',
  pipes: 'brightness(1.22) contrast(1.05)',
  flanges: 'brightness(1.14) contrast(1.05) saturate(1.03)',
  instrumentation: 'brightness(1.04) contrast(1.05) saturate(1.02)',
  electrical: 'brightness(1.02) contrast(1.05) saturate(1.02)',
  motors: 'brightness(1.05) contrast(1.05) saturate(1.03)',
  compressors: 'brightness(1.14) contrast(1.05) saturate(1.05)',
  safety: 'brightness(1.14) contrast(1.05) saturate(0.85)',
  tools: 'brightness(1.20) contrast(1.05) saturate(1.03)',
  mechanical: 'brightness(1.14) contrast(1.05) saturate(1.04)',
  'spare-parts': 'brightness(1.30) contrast(1.06) saturate(1.05)',
}

export default function Products() {
  return (
    <section id="products" className="relative border-y border-white/5 bg-graphite-950 pt-24 pb-14 lg:pt-32 lg:pb-16">
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
                <div className="relative aspect-[5/4] overflow-hidden">
                  {/* Real product photograph replaces the illustrated scene; same 5:4 box + hover-scale. */}
                  <img
                    src={`${BASE}images/products/${p.scene}.jpg?v=${PHOTO_V}`}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    style={{ filter: PROD_FILTER[p.scene] ?? DEFAULT_FILTER }}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Light navy treatment (lighter than the Industries overlay) so the product stays clearly visible. */}
                  <div className="pointer-events-none absolute inset-0 bg-navy-950/[0.18] transition-colors duration-300 group-hover:bg-navy-950/[0.08]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/[0.35] to-transparent" />
                  <div className="pointer-events-none absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-navy-950/50 text-copper-400 backdrop-blur-sm">
                    <p.icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="relative flex items-center px-5 py-4">
                  <h3 className="pr-2 text-base leading-tight text-white">{p.title}</h3>
                  {/* Quote is absolutely placed so it never squeezes/clips the title; still fades in on hover. */}
                  <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 bg-graphite-900 pl-2 text-xs font-semibold uppercase tracking-wide text-copper-400 opacity-0 transition-opacity group-hover:opacity-100">
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
