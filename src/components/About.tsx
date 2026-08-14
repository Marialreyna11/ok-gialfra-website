import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { IconCheck } from './icons'
import { COMPANY } from '../data/content'

// Real royalty-free industrial photography (Unsplash License — free commercial use).
// The image files live in public/images/about/ and are committed to the repo
// (Unsplash / the CI runner cannot fetch them automatically). To update a photo,
// replace the matching .jpg in that folder — the filename and layout stay the same.
// 1. Oil pump jack at sunset — Zbyněk Burival (unsplash.com/photos/...GrmwVnVSSdU)
// 2. Industrial pipes & machinery — Jakub Żerdzicki (...XmmL7iNeFWc)
// 3. Cargo ship at port at night — Ozren Cuculic (...eBKxooPEU5w)
// 4. Industrial valves & pipes — Simon Infanger (...DkTmBA443g4)
const BASE = import.meta.env.BASE_URL
const ABOUT_PHOTOS = {
  oilGas: {
    src: `${BASE}images/about/oil-gas.jpg`,
    alt: 'Oil & gas pump jack silhouetted against a sunset at an oilfield',
  },
  industrial: {
    src: `${BASE}images/about/industrial.jpg`,
    alt: 'Heavy industrial pipes and machinery at a processing facility',
  },
  logistics: {
    src: `${BASE}images/about/logistics.jpg`,
    alt: 'Cargo ship and shipping containers at an illuminated port at night',
  },
  technical: {
    src: `${BASE}images/about/technical.jpg`,
    alt: 'Large industrial valves and pipework in a technical facility',
  },
}

const points = [
  'Specification-driven sourcing of equipment, materials and spare parts',
  'A responsive sales desk focused on accuracy and fast turnaround',
  'An international supplier network for competitive, reliable supply',
  'Dedicated procurement support for projects, turnarounds and MRO',
]

type AboutPhoto = { src: string; alt: string }

function PhotoCard({ photo, className = '' }: { photo: AboutPhoto; className?: string }) {
  return (
    <div className={`media rounded-lg border border-white/10 ${className}`}>
      {/* object-cover (via .media > img) keeps the industrial equipment in frame, never stretched */}
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="object-center" />
      {/* subtle dark-navy overlays so all photos integrate with the existing palette and text stays legible */}
      <div className="pointer-events-none absolute inset-0 bg-navy-950/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent" />
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative bg-navy-950 py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Visual montage */}
        <Reveal className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <PhotoCard photo={ABOUT_PHOTOS.oilGas} className="aspect-[4/5]" />
              <PhotoCard photo={ABOUT_PHOTOS.industrial} className="aspect-square" />
            </div>
            <div className="space-y-4 pt-8">
              <PhotoCard photo={ABOUT_PHOTOS.logistics} className="aspect-square" />
              <PhotoCard photo={ABOUT_PHOTOS.technical} className="aspect-[4/5]" />
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
