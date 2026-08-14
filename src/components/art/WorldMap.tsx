/**
 * Stylized global-sourcing visual: a faint graticule (lat/long grid), sourcing hub
 * nodes and animated connection arcs converging on a primary hub. Self-contained SVG.
 */
export default function WorldMap({ className = '' }: { className?: string }) {
  const hubs = [
    { x: 300, y: 210, label: 'Americas' },
    { x: 560, y: 175, label: 'Europe' },
    { x: 640, y: 250, label: 'Middle East' },
    { x: 770, y: 230, label: 'Asia' },
    { x: 860, y: 330, label: 'Oceania' },
    { x: 520, y: 300, label: 'Africa' },
  ]
  const home = { x: 300, y: 210 }

  return (
    <svg viewBox="0 0 1000 480" className={className} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="wm-arc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f97316" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="wm-node" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fb923c" />
          <stop offset="1" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* graticule */}
      <g stroke="#274573" strokeOpacity="0.35" fill="none">
        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse key={`v${i}`} cx="500" cy="240" rx={60 + i * 55} ry="200" strokeOpacity={0.12} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="60" y1={80 + i * 55} x2="940" y2={80 + i * 55} strokeOpacity={0.1} />
        ))}
        <ellipse cx="500" cy="240" rx="440" ry="200" strokeOpacity="0.2" />
      </g>

      {/* dotted continents suggestion */}
      <g fill="#38507a" fillOpacity="0.5">
        {[
          [250, 170], [270, 190], [290, 210], [310, 230], [285, 250], [330, 200], [260, 230],
          [520, 150], [545, 165], [570, 175], [595, 185], [560, 200],
          [500, 280], [520, 300], [540, 320], [515, 340], [535, 300],
          [630, 235], [655, 250], [680, 245], [700, 230],
          [740, 210], [765, 225], [790, 215], [815, 235], [770, 250], [740, 245],
          [845, 320], [865, 335], [885, 330],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3.2} />
        ))}
      </g>

      {/* arcs from hubs to home */}
      {hubs.slice(1).map((h, i) => {
        const mx = (home.x + h.x) / 2
        const my = Math.min(home.y, h.y) - 70
        return (
          <path
            key={i}
            d={`M ${home.x} ${home.y} Q ${mx} ${my} ${h.x} ${h.y}`}
            fill="none"
            stroke="url(#wm-arc)"
            strokeWidth="1.6"
            strokeOpacity="0.75"
            strokeDasharray="5 7"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-24" dur={`${1.6 + i * 0.2}s`} repeatCount="indefinite" />
          </path>
        )
      })}

      {/* hub nodes */}
      {hubs.map((h, i) => (
        <g key={i}>
          <circle cx={h.x} cy={h.y} r="14" fill="url(#wm-node)" />
          <circle cx={h.x} cy={h.y} r={h.x === home.x ? 5.5 : 3.5} fill={h.x === home.x ? '#fb923c' : '#8ab4e8'} />
          {h.x === home.x && (
            <circle cx={h.x} cy={h.y} r="9" fill="none" stroke="#fb923c" strokeWidth="1.5">
              <animate attributeName="r" from="6" to="20" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.8" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
    </svg>
  )
}
