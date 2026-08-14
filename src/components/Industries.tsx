import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { INDUSTRIES } from '../data/content'
import { IconArrow } from './icons'

// Real industrial photography (royalty-free, free commercial use). One unique photo
// per industry, committed to public/images/industries/<scene>.jpg. Bump PHOTO_V when
// an image is swapped so the browser/GitHub Pages CDN fetches the new bytes.
const BASE = import.meta.env.BASE_URL
const PHOTO_V = '3'

// Per-card photographic treatment — CSS only, originals untouched, easy to tune later.
// Slightly brightens midtones/contrast so the equipment reads clearly while keeping the
// dark cinematic look. Oil & Gas, Petrochemical and Infrastructure run brighter because
// their source photos are darker.
const DEFAULT_FILTER = 'brightness(1.16) contrast(1.06) saturate(1.04)'
const CARD_FILTER: Record<string, string> = {
  'oil-gas': 'brightness(1.40) contrast(1.08) saturate(1.04)',
  'petrochemical': 'brightness(1.36) contrast(1.05) saturate(1.02)',
  'infrastructure': 'brightness(1.04) contrast(1.08) saturate(0.92)',
  'utilities': 'brightness(1.36) contrast(1.04) saturate(1.02)',
}

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
                {/* Real photograph replaces the illustrated scene; same 4:5 box, hover-scale and dark overlay. */}
                <div className="relative aspect-[4/5]">
                  <img
                    src={`${BASE}images/industries/${ind.scene}.jpg?v=${PHOTO_V}`}
                    alt={`${ind.title} — ${ind.desc}`}
                    loading="lazy"
                    decoding="async"
                    style={{ filter: CARD_FILTER[ind.scene] ?? DEFAULT_FILTER }}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Navy overlays keep the photos cohesive with the palette and the title legible.
                      Reduced ~15-20% from the original so the equipment reads more clearly; the
                      bottom gradient stays strong enough for white-title legibility. */}
                  <div className="pointer-events-none absolute inset-0 bg-navy-950/[0.26] transition-colors duration-300 group-hover:bg-navy-950/[0.16]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/[0.64] via-navy-950/[0.12] to-transparent" />
                </div>
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
