/**
 * Cinematic industrial "scene" artwork used as photographic-style card backgrounds.
 * Each category renders a DISTINCT composition (different subject, palette and framing)
 * so Industries and Products no longer share one repeated visual language.
 *
 * Self-contained SVG (no external image requests). A consistent dark-navy gradient
 * overlay is layered on top for text legibility, keeping every card on-brand.
 *
 * Drop-in replaceable with real photography: swap the <svg> for an <img> inside the
 * same `.media` container (object-cover) and the overlay/legibility still holds.
 */
import type { ReactNode } from 'react'

export type SceneName =
  // industries
  | 'oil-gas' | 'energy' | 'petrochemical' | 'industrial' | 'construction'
  | 'infrastructure' | 'marine' | 'utilities'
  // products
  | 'valves' | 'pumps' | 'pipes' | 'flanges' | 'instrumentation' | 'electrical'
  | 'motors' | 'compressors' | 'safety' | 'tools' | 'mechanical' | 'spare-parts'

type SkyStops = [string, string, string]

// Distinct sky palettes — warm dusk, cool dawn and neutral charcoal variants.
const SKIES: Record<string, SkyStops> = {
  dusk: ['#0a1222', '#3a2416', '#b4531c'],
  ember: ['#0b0f1a', '#3a1a10', '#c2410c'],
  steel: ['#0a1222', '#16263f', '#33506f'],
  dawn: ['#0a1424', '#1a2c44', '#5a4a3a'],
  slate: ['#0b0e14', '#161b24', '#2a3646'],
  night: ['#080d18', '#101b30', '#243b5a'],
}

function Sky({ id, stops }: { id: string; stops: SkyStops }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.55" stopColor={stops[1]} />
          <stop offset="1" stopColor={stops[2]} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="70%" cy="82%" r="60%">
          <stop offset="0" stopColor="#fdba74" stopOpacity="0.7" />
          <stop offset="0.4" stopColor="#f97316" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id}-sky)`} />
      <rect width="400" height="300" fill={`url(#${id}-sun)`} />
    </>
  )
}

/** shared subtle haze band for depth */
const Haze = ({ y, o = 0.25 }: { y: number; o?: number }) => (
  <rect x="0" y={y} width="400" height="6" fill="#f8b878" opacity={o} />
)

// ---- Industry scenes (wide landscapes) ------------------------------------

const oilGas = (id: string) => (
  <>
    <Sky id={id} stops={SKIES.dusk} />
    <Haze y={168} /> <Haze y={186} o={0.18} />
    <g fill="#05080f">
      {/* distant refinery */}
      <rect x="20" y="150" width="8" height="60" /><rect x="34" y="140" width="6" height="70" />
      <rect x="330" y="150" width="8" height="60" /><rect x="346" y="146" width="6" height="64" />
      {/* central derrick */}
      <path d="M170 250 L200 96 L230 250 Z" />
      <g stroke="#0f1a2c" strokeWidth="2">
        <path d="M181 210 L219 210 M186 180 L214 180 M191 150 L209 150 M195 126 L205 126" />
        <path d="M181 210 L214 180 M219 210 L186 180 M186 180 L209 150 M214 180 L191 150" />
      </g>
      <rect x="195" y="90" width="10" height="8" />
      {/* pump jacks */}
      <g transform="translate(60 196) scale(0.5)">
        <rect x="-6" y="60" width="150" height="12" /><rect x="46" y="8" width="10" height="56" />
        <path d="M52 8 L8 -10 L2 8 L40 22 Z" /><circle cx="100" cy="34" r="16" />
      </g>
      <g transform="translate(300 200) scale(-0.44 0.44)">
        <rect x="-6" y="60" width="150" height="12" /><rect x="46" y="8" width="10" height="56" />
        <path d="M52 8 L8 -10 L2 8 L40 22 Z" /><circle cx="100" cy="34" r="16" />
      </g>
      <rect x="0" y="248" width="400" height="52" />
    </g>
  </>
)

const energy = (id: string) => (
  <>
    <Sky id={id} stops={SKIES.steel} />
    <Haze y={176} o={0.15} />
    <g fill="none" stroke="#05080f" strokeWidth="3">
      {/* transmission pylons */}
      {[70, 200, 330].map((x, i) => (
        <g key={i} transform={`translate(${x} ${120 + i * 6})`}>
          <path d="M0 130 L-14 40 M0 130 L14 40 M-14 40 L14 40" />
          <path d="M-22 60 L22 60 M-18 80 L18 80 M-12 100 L12 100" />
          <path d="M0 40 L0 22" />
        </g>
      ))}
      {/* power lines */}
      <path d="M56 168 Q135 190 186 162" strokeWidth="1.5" opacity="0.7" />
      <path d="M214 162 Q270 188 316 168" strokeWidth="1.5" opacity="0.7" />
    </g>
    <g fill="#05080f">
      <rect x="0" y="250" width="400" height="50" />
      <path d="M0 250 Q200 236 400 250 V270 H0 Z" />
    </g>
  </>
)

const petrochemical = (id: string) => (
  <>
    <Sky id={id} stops={SKIES.ember} />
    <Haze y={160} /> <Haze y={182} o={0.2} />
    <g fill="#05080f">
      {/* distillation columns */}
      <rect x="70" y="120" width="26" height="130" /><rect x="76" y="108" width="14" height="16" />
      <rect x="120" y="140" width="20" height="110" />
      <rect x="250" y="128" width="30" height="122" /><rect x="258" y="116" width="14" height="16" />
      <rect x="300" y="150" width="18" height="100" />
      {/* flare stack + flame */}
      <rect x="196" y="96" width="8" height="154" />
    </g>
    <path d="M200 96 Q188 74 200 58 Q212 74 208 88 Q216 80 210 96 Z" fill="#fb923c" opacity="0.9" />
    <g stroke="#05080f" strokeWidth="4" fill="none">
      <path d="M96 170 H120 M140 170 H250 M280 170 H300" />
    </g>
    <rect x="0" y="248" width="400" height="52" fill="#05080f" />
  </>
)

const industrial = (id: string) => (
  <>
    <Sky id={id} stops={SKIES.slate} />
    <Haze y={172} o={0.12} />
    <g fill="#05080f">
      {/* sawtooth factory roof */}
      <path d="M40 250 V150 L70 130 V150 L100 130 V150 L130 130 V150 L160 130 V250 Z" />
      {/* main shed */}
      <rect x="170" y="150" width="150" height="100" />
      <path d="M170 150 L245 118 L320 150 Z" />
      {/* smokestacks */}
      <rect x="300" y="96" width="12" height="60" /><rect x="322" y="110" width="10" height="46" />
      <rect x="0" y="248" width="400" height="52" />
    </g>
    <rect x="304" y="92" width="8" height="6" fill="#94a3b8" opacity="0.4" />
  </>
)

const construction = (id: string) => (
  <>
    <Sky id={id} stops={SKIES.dawn} />
    <Haze y={178} o={0.14} />
    <g stroke="#05080f" strokeWidth="4" fill="none">
      {/* tower crane */}
      <path d="M110 250 L110 70" />
      <path d="M60 78 L250 78" />
      <path d="M110 70 L60 78 M110 70 L180 78" />
      <path d="M96 78 L110 92 L124 78" />
      <path d="M220 78 L220 100" strokeWidth="2" />
    </g>
    <g fill="#05080f">
      {/* building frame */}
      <rect x="250" y="120" width="110" height="130" opacity="0.9" />
      <g stroke="#16263f" strokeWidth="3">
        <path d="M250 150 H360 M250 185 H360 M250 218 H360 M286 120 V250 M323 120 V250" />
      </g>
      <rect x="0" y="248" width="400" height="52" />
    </g>
    <rect x="216" y="100" width="8" height="14" fill="#05080f" />
  </>
)

const infrastructure = (id: string) => (
  <>
    <Sky id={id} stops={SKIES.steel} />
    <g fill="#05080f">
      {/* pipeline receding */}
      <path d="M-10 250 L180 150 L220 150 L410 250 Z" opacity="0.85" />
      <path d="M-10 250 L180 150 L220 150 L410 250" fill="none" stroke="#16263f" strokeWidth="2" />
    </g>
    <g fill="none" stroke="#16263f" strokeWidth="2" opacity="0.6">
      <ellipse cx="200" cy="150" rx="20" ry="7" />
      <ellipse cx="150" cy="180" rx="34" ry="10" />
      <ellipse cx="90" cy="215" rx="52" ry="14" />
    </g>
    {/* valve station */}
    <g fill="#05080f" transform="translate(250 150)">
      <rect x="0" y="0" width="10" height="40" /><rect x="-8" y="-8" width="26" height="10" />
      <circle cx="5" cy="-16" r="8" fill="none" stroke="#05080f" strokeWidth="3" />
    </g>
    <rect x="0" y="250" width="400" height="50" fill="#05080f" />
  </>
)

const marine = (id: string) => (
  <>
    <Sky id={id} stops={SKIES.night} />
    <Haze y={150} o={0.12} />
    <g fill="#05080f">
      {/* gantry cranes */}
      {[70, 150].map((x, i) => (
        <g key={i} transform={`translate(${x} 0)`}>
          <path d="M0 150 L0 90 L60 90 L60 150" fill="none" stroke="#05080f" strokeWidth="5" />
          <path d="M-6 90 L80 90" stroke="#05080f" strokeWidth="4" />
          <rect x="30" y="90" width="6" height="24" />
        </g>
      ))}
      {/* container stacks */}
      <g opacity="0.9">
        <rect x="250" y="150" width="120" height="18" /><rect x="256" y="132" width="108" height="18" />
        <rect x="262" y="114" width="60" height="18" />
      </g>
      {/* water */}
      <rect x="0" y="176" width="400" height="124" />
    </g>
    <g stroke="#33506f" strokeWidth="2" opacity="0.5">
      <path d="M20 200 H120 M180 216 H300 M60 240 H200" />
    </g>
  </>
)

const utilities = (id: string) => (
  <>
    <Sky id={id} stops={SKIES.slate} />
    <Haze y={176} o={0.12} />
    <g fill="#05080f">
      {/* storage tanks */}
      <rect x="40" y="150" width="70" height="100" rx="4" />
      <rect x="130" y="168" width="54" height="82" rx="4" />
      {/* water tower */}
      <path d="M300 250 L300 150 M340 250 L340 150" stroke="#05080f" strokeWidth="5" />
      <ellipse cx="320" cy="140" rx="34" ry="16" /><rect x="286" y="140" width="68" height="24" />
      <rect x="0" y="248" width="400" height="52" />
    </g>
    <g stroke="#16263f" strokeWidth="4" fill="none">
      <path d="M110 200 H130 M184 200 H286" />
    </g>
  </>
)

// ---- Product scenes (subject close-ups) -----------------------------------

const ProductBase = ({ id, sky, children }: { id: string; sky: SkyStops; children: ReactNode }) => (
  <>
    <defs>
      <radialGradient id={`${id}-bg`} cx="50%" cy="42%" r="75%">
        <stop offset="0" stopColor={sky[2]} stopOpacity="0.55" />
        <stop offset="0.5" stopColor={sky[1]} />
        <stop offset="1" stopColor={sky[0]} />
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill={`url(#${id}-bg)`} />
    {children}
  </>
)

const valves = (id: string) => (
  <ProductBase id={id} sky={SKIES.ember}>
    <g fill="#0c1626" stroke="#2a3646" strokeWidth="2">
      <rect x="150" y="150" width="100" height="46" rx="6" />
      <path d="M170 150 L182 110 L218 110 L230 150 Z" />
      <rect x="120" y="156" width="30" height="34" rx="3" /><rect x="250" y="156" width="30" height="34" rx="3" />
    </g>
    <g fill="none" stroke="#f0a86a" strokeWidth="6" opacity="0.85">
      <circle cx="200" cy="96" r="30" />
    </g>
    <path d="M200 110 V150" stroke="#2a3646" strokeWidth="6" />
    <g stroke="#0c1626" strokeWidth="2">
      <path d="M124 160 v26 M276 160 v26" />
    </g>
  </ProductBase>
)

const pumps = (id: string) => (
  <ProductBase id={id} sky={SKIES.steel}>
    <g fill="#0c1626" stroke="#33506f" strokeWidth="2">
      <circle cx="150" cy="150" r="52" />
      <circle cx="150" cy="150" r="18" fill="#16263f" />
      <rect x="120" y="196" width="180" height="16" rx="3" />
      <rect x="210" y="128" width="90" height="52" rx="6" />
      <path d="M300 140 h16 v28 h-16" />
    </g>
    <path d="M150 98 v-16 h26" fill="none" stroke="#f0a86a" strokeWidth="5" opacity="0.8" />
    <g stroke="#33506f" strokeWidth="2" opacity="0.6">
      {[...Array(6)].map((_, i) => (
        <path key={i} d={`M150 150 L${150 + 46 * Math.cos((i * Math.PI) / 3)} ${150 + 46 * Math.sin((i * Math.PI) / 3)}`} />
      ))}
    </g>
  </ProductBase>
)

const pipes = (id: string) => (
  <ProductBase id={id} sky={SKIES.slate}>
    <g stroke="#33506f" strokeWidth="3" fill="#0c1626">
      {[[150, 130], [220, 130], [185, 175], [255, 175], [150, 200]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="30" />
          <circle cx={cx} cy={cy} r="20" fill="#0a1222" />
        </g>
      ))}
    </g>
    <path d="M285 175 q40 0 40 40" fill="none" stroke="#f0a86a" strokeWidth="8" opacity="0.7" />
  </ProductBase>
)

const flanges = (id: string) => (
  <ProductBase id={id} sky={SKIES.ember}>
    <g fill="#0c1626" stroke="#2a3646" strokeWidth="2">
      <circle cx="200" cy="150" r="78" />
      <circle cx="200" cy="150" r="30" fill="#0a1222" />
    </g>
    <g fill="#f0a86a" opacity="0.85">
      {[...Array(8)].map((_, i) => {
        const a = (i * Math.PI) / 4
        return <circle key={i} cx={200 + 56 * Math.cos(a)} cy={150 + 56 * Math.sin(a)} r="6" />
      })}
    </g>
    <circle cx="200" cy="150" r="46" fill="none" stroke="#2a3646" strokeWidth="2" />
  </ProductBase>
)

const instrumentation = (id: string) => (
  <ProductBase id={id} sky={SKIES.night}>
    <g fill="#0c1626" stroke="#33506f" strokeWidth="2">
      <circle cx="175" cy="140" r="54" />
      <circle cx="175" cy="140" r="44" fill="#0a1222" />
      <rect x="160" y="194" width="30" height="40" />
    </g>
    <g stroke="#f0a86a" strokeWidth="3" opacity="0.9" fill="none">
      <path d="M175 140 L205 118" />
    </g>
    <g stroke="#33506f" strokeWidth="2">
      {[...Array(9)].map((_, i) => {
        const a = -Math.PI * 0.75 + (i * Math.PI * 1.5) / 8
        return <path key={i} d={`M${175 + 40 * Math.cos(a)} ${140 + 40 * Math.sin(a)} L${175 + 34 * Math.cos(a)} ${140 + 34 * Math.sin(a)}`} />
      })}
    </g>
    <rect x="250" y="150" width="10" height="84" fill="#0c1626" />
    <rect x="238" y="150" width="34" height="14" fill="#0c1626" />
  </ProductBase>
)

const electrical = (id: string) => (
  <ProductBase id={id} sky={SKIES.steel}>
    <g fill="#0c1626" stroke="#33506f" strokeWidth="2">
      {[120, 176, 232].map((x, i) => (
        <rect key={i} x={x} y="110" width="48" height="128" rx="3" />
      ))}
    </g>
    <g fill="#f0a86a" opacity="0.7">
      <rect x="130" y="122" width="28" height="6" /><rect x="186" y="122" width="28" height="6" /><rect x="242" y="122" width="28" height="6" />
    </g>
    <g stroke="#33506f" strokeWidth="2" opacity="0.6">
      <path d="M144 238 v20 M200 238 v20 M256 238 v20" />
    </g>
    <path d="M300 120 l-10 30 h10 l-10 30" fill="none" stroke="#f0a86a" strokeWidth="4" opacity="0.8" />
  </ProductBase>
)

const motors = (id: string) => (
  <ProductBase id={id} sky={SKIES.slate}>
    <g fill="#0c1626" stroke="#33506f" strokeWidth="2">
      <rect x="130" y="120" width="120" height="80" rx="10" />
      <rect x="250" y="140" width="30" height="40" rx="3" />
      <path d="M280 156 h26" stroke="#33506f" strokeWidth="6" />
      <rect x="150" y="108" width="70" height="14" rx="3" />
      <rect x="120" y="200" width="150" height="12" />
    </g>
    {/* cooling fins */}
    <g stroke="#0a1222" strokeWidth="3">
      {[...Array(7)].map((_, i) => (
        <path key={i} d={`M${142 + i * 15} 120 V200`} />
      ))}
    </g>
    <circle cx="190" cy="102" r="8" fill="none" stroke="#f0a86a" strokeWidth="3" opacity="0.8" />
  </ProductBase>
)

const compressors = (id: string) => (
  <ProductBase id={id} sky={SKIES.ember}>
    <g fill="#0c1626" stroke="#2a3646" strokeWidth="2">
      <rect x="120" y="150" width="160" height="60" rx="6" />
      <circle cx="160" cy="180" r="26" />
      <rect x="230" y="120" width="24" height="60" rx="10" />
      <rect x="110" y="210" width="190" height="14" />
    </g>
    <g fill="none" stroke="#f0a86a" strokeWidth="6" opacity="0.7">
      <path d="M254 130 q40 -6 40 30" />
    </g>
    <g stroke="#2a3646" strokeWidth="3">
      <path d="M186 168 h44" />
    </g>
  </ProductBase>
)

const safety = (id: string) => (
  <ProductBase id={id} sky={SKIES.dusk}>
    {/* hard hat */}
    <g fill="#0c1626" stroke="#f0a86a" strokeWidth="2">
      <path d="M150 170 a50 42 0 0 1 100 0 Z" />
      <rect x="140" y="168" width="120" height="12" rx="6" />
      <path d="M200 128 v-16" stroke="#f0a86a" strokeWidth="3" />
    </g>
    {/* shield */}
    <g fill="none" stroke="#33506f" strokeWidth="3" opacity="0.6">
      <path d="M300 120 l24 8 v20 c0 18 -12 30 -24 38 c-12 -8 -24 -20 -24 -38 v-20 z" />
    </g>
    <path d="M290 150 l8 8 14 -14" stroke="#f0a86a" strokeWidth="3" fill="none" opacity="0.7" />
  </ProductBase>
)

const tools = (id: string) => (
  <ProductBase id={id} sky={SKIES.slate}>
    <g stroke="#33506f" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.9">
      <path d="M120 120 L250 220" />
      <path d="M280 120 L150 220" />
    </g>
    <g fill="#f0a86a" opacity="0.85">
      <circle cx="120" cy="120" r="16" /><circle cx="280" cy="120" r="16" />
    </g>
    <g fill="#0c1626" stroke="#33506f" strokeWidth="3">
      <circle cx="120" cy="120" r="8" /><circle cx="280" cy="120" r="8" />
    </g>
  </ProductBase>
)

const mechanical = (id: string) => (
  <ProductBase id={id} sky={SKIES.night}>
    {[[165, 150, 46], [250, 190, 34]].map(([cx, cy, r], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r={r} fill="#0c1626" stroke="#33506f" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={r * 0.4} fill="#0a1222" stroke="#33506f" strokeWidth="2" />
        <g stroke="#33506f" strokeWidth="6">
          {[...Array(10)].map((_, k) => {
            const a = (k * Math.PI) / 5
            return (
              <path key={k} d={`M${cx + r * 0.9 * Math.cos(a)} ${cy + r * 0.9 * Math.sin(a)} L${cx + (r + 6) * Math.cos(a)} ${cy + (r + 6) * Math.sin(a)}`} />
            )
          })}
        </g>
      </g>
    ))}
    <circle cx="165" cy="150" r="10" fill="#f0a86a" opacity="0.5" />
  </ProductBase>
)

const spareParts = (id: string) => (
  <ProductBase id={id} sky={SKIES.slate}>
    {/* shelving */}
    <g stroke="#33506f" strokeWidth="3" opacity="0.7">
      <path d="M90 130 H310 M90 180 H310 M90 230 H310 M100 120 V240 M300 120 V240" />
    </g>
    <g fill="#0c1626" stroke="#33506f" strokeWidth="2">
      <rect x="112" y="138" width="40" height="34" /><rect x="160" y="144" width="30" height="28" />
      <rect x="210" y="138" width="46" height="34" /><rect x="120" y="190" width="34" height="34" />
      <rect x="180" y="188" width="50" height="36" /><rect x="246" y="194" width="40" height="30" />
    </g>
    <g fill="#f0a86a" opacity="0.5">
      <circle cx="132" cy="155" r="6" /><circle cx="233" cy="155" r="6" /><circle cx="205" cy="206" r="6" />
    </g>
  </ProductBase>
)

const RENDERERS: Record<SceneName, (id: string) => ReactNode> = {
  'oil-gas': oilGas, energy, petrochemical, industrial, construction,
  infrastructure, marine, utilities,
  valves, pumps, pipes, flanges, instrumentation, electrical, motors,
  compressors, safety, tools, mechanical, 'spare-parts': spareParts,
}

type Props = {
  name: SceneName
  className?: string
  /** direction of the legibility overlay */
  overlay?: 'bottom' | 'full'
}

export default function Scene({ name, className = '', overlay = 'bottom' }: Props) {
  const id = `sc-${name}`
  const render = RENDERERS[name]
  return (
    <div className={`media ${className}`}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="!object-cover">
        {render(id)}
      </svg>
      {/* navy legibility overlay — keeps text highly readable, stays on-brand */}
      {overlay === 'bottom' ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/10" />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-navy-950/45" />
      )}
      {/* subtle copper edge light on hover-friendly corner */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-copper-600/10" />
    </div>
  )
}
