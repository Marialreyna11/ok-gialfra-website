import type { ComponentType, SVGProps } from 'react'

type Tone = 'navy' | 'graphite' | 'steel' | 'copper' | 'dusk'

const tones: Record<Tone, { from: string; to: string; glow: string; ink: string }> = {
  navy: { from: '#0f1c33', to: '#060b16', glow: '#274573', ink: '#7f93b0' },
  graphite: { from: '#1c2129', to: '#0b0d10', glow: '#3a434f', ink: '#8a97a8' },
  steel: { from: '#273040', to: '#0d1420', glow: '#4a5a72', ink: '#9fb0c6' },
  copper: { from: '#3a1a0c', to: '#0d0906', glow: '#c2410c', ink: '#f0a86a' },
  dusk: { from: '#152743', to: '#3a1a0c', glow: '#ea580c', ink: '#f0b48a' },
}

type Props = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  tone?: Tone
  className?: string
  seed?: number
}

/**
 * A self-contained "photographic" tile: layered industrial gradient, blueprint grid,
 * concentric machine rings and a large line-icon. Gives each product/industry card a
 * distinct, premium visual without external imagery. Swap for a real photo by placing
 * an <img> inside a `.media` container in the consuming component.
 */
export default function ArtTile({ icon: Icon, tone = 'navy', className = '', seed = 0 }: Props) {
  const t = tones[tone]
  const uid = `${tone}-${seed}`
  const ringOffset = 40 + (seed % 3) * 18
  return (
    <div className={`media ${className}`}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="!object-cover">
        <defs>
          <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={t.from} />
            <stop offset="1" stopColor={t.to} />
          </linearGradient>
          <radialGradient id={`glow-${uid}`} cx="72%" cy="28%" r="70%">
            <stop offset="0" stopColor={t.glow} stopOpacity="0.55" />
            <stop offset="1" stopColor={t.glow} stopOpacity="0" />
          </radialGradient>
          <pattern id={`grid-${uid}`} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke={t.ink} strokeOpacity="0.12" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="400" height="300" fill={`url(#grad-${uid})`} />
        <rect width="400" height="300" fill={`url(#grid-${uid})`} />
        <rect width="400" height="300" fill={`url(#glow-${uid})`} />

        {/* concentric machine rings */}
        <g fill="none" stroke={t.ink} strokeOpacity="0.16">
          <circle cx={330 + (seed % 2) * 10} cy={70} r={ringOffset} />
          <circle cx={330 + (seed % 2) * 10} cy={70} r={ringOffset + 22} strokeDasharray="4 8" />
        </g>
        <g fill="none" stroke={t.ink} strokeOpacity="0.1">
          <circle cx={60} cy={250} r={80} />
        </g>

        {/* corner tick marks */}
        <g stroke={t.ink} strokeOpacity="0.5" strokeWidth="2">
          <path d="M20 20h18M20 20v18" />
          <path d="M380 280h-18M380 280v-18" />
        </g>
      </svg>

      {/* Large icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-20 w-20" style={{ color: t.ink }} strokeWidth={1.1} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
    </div>
  )
}
