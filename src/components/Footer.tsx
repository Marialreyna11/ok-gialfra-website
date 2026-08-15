import Logo from './Logo'
import { COMPANY } from '../data/content'
import { IconMail, IconPin } from './icons'

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Why OK. GIALFRA', href: '#why' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Oil & Gas', href: '#industries' },
      { label: 'Energy', href: '#industries' },
      { label: 'Petrochemical', href: '#industries' },
      { label: 'Infrastructure', href: '#industries' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Valves & Flanges', href: '#products' },
      { label: 'Pumps & Compressors', href: '#products' },
      { label: 'Instrumentation', href: '#products' },
      { label: 'Spare Parts', href: '#products' },
    ],
  },
  {
    title: 'Procurement',
    links: [
      { label: 'Global Sourcing', href: '#procurement' },
      { label: 'Services', href: '#services' },
      { label: 'Request a Quote', href: '#rfq' },
    ],
  },
]

export default function Footer() {
  const year = 2026
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand block */}
          <div className="max-w-xs">
            <Logo className="[--lw:115px] sm:[--lw:140px]" />
            <p className="mt-6 text-sm leading-relaxed text-steel-400">
              Procurement, oilfield equipment, industrial supply and project support — delivered with reliability and
              global reach.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-steel-300 hover:text-copper-400">
                <IconMail className="h-4 w-4 text-copper-400" /> {COMPANY.email}
              </a>
              <div className="flex items-start gap-2 text-steel-400">
                <IconPin className="mt-0.5 h-4 w-4 text-copper-400" />
                <span>
                  {COMPANY.city}, {COMPANY.country}
                </span>
              </div>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm uppercase tracking-widest text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-steel-400 transition-colors hover:text-copper-400">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-xl border border-white/10 bg-gradient-to-r from-graphite-900 to-navy-900 p-6 sm:flex-row sm:items-center">
          <div>
            <div className="font-display text-xl uppercase text-white">Ready to source with confidence?</div>
            <p className="mt-1 text-sm text-steel-400">Send us your requirement and get a fast, competitive quotation.</p>
          </div>
          <a href="#rfq" className="btn-primary shrink-0">
            Request a Quote
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-steel-500 sm:flex-row">
          <p>
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            {COMPANY.name} is a procurement and industrial supply company. All manufacturer names, brands and trademarks
            are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
