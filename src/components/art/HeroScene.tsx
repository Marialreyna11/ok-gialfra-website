/**
 * Cinematic industrial hero backdrop — an oilfield / energy-infrastructure silhouette
 * at dusk rendered as scalable vector art. Self-contained (no external image requests),
 * sits behind the hero headline with dark overlays layered on top in the Hero component.
 */
export default function HeroScene({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1222" />
          <stop offset="0.42" stopColor="#132540" />
          <stop offset="0.68" stopColor="#7c3a1a" />
          <stop offset="0.83" stopColor="#c2410c" />
          <stop offset="1" stopColor="#f59e42" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="50%" cy="88%" r="55%">
          <stop offset="0" stopColor="#fed7aa" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#fb923c" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fb923c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1220" />
          <stop offset="1" stopColor="#05080f" />
        </linearGradient>
      </defs>

      {/* Sky + sun glow */}
      <rect width="1600" height="900" fill="url(#hero-sky)" />
      <rect width="1600" height="900" fill="url(#hero-sun)" />

      {/* Distant cloud bands */}
      <g fill="#8a3b18" opacity="0.35">
        <rect x="0" y="560" width="1600" height="10" rx="5" />
        <rect x="120" y="600" width="900" height="12" rx="6" />
        <rect x="700" y="630" width="800" height="10" rx="5" />
      </g>

      {/* Far refinery skyline */}
      <g fill="#0c1626" opacity="0.9">
        <rect x="80" y="500" width="16" height="160" />
        <rect x="110" y="470" width="10" height="190" />
        <rect x="150" y="520" width="24" height="140" />
        <rect x="1320" y="500" width="14" height="160" />
        <rect x="1360" y="472" width="10" height="188" />
        <rect x="1420" y="520" width="26" height="140" />
        {/* distant flare stacks */}
        <path d="M1300 500h6v160h-6z" />
        <circle cx="1303" cy="496" r="7" fill="#f97316" opacity="0.8" />
      </g>

      {/* Pump jack — left */}
      <g fill="#060b13" transform="translate(210 470) scale(0.9)">
        <rect x="-6" y="180" width="240" height="20" />
        <rect x="70" y="60" width="14" height="130" />
        <rect x="66" y="52" width="22" height="12" />
        <path d="M77 58 L20 30 L10 60 L60 82 Z" />
        <circle cx="150" cy="120" r="26" />
        <rect x="146" y="120" width="8" height="70" />
        <path d="M20 40 L150 118" stroke="#060b13" strokeWidth="8" />
      </g>

      {/* Central drilling derrick */}
      <g fill="#04070d" transform="translate(760 150)">
        <path d="M40 560 L120 40 L200 560 Z" opacity="0.96" />
        <path d="M56 560 L120 90 L184 560" fill="none" stroke="#0a1222" strokeWidth="4" />
        {/* cross bracing */}
        <g stroke="#0f1a2c" strokeWidth="5">
          <path d="M74 420 L166 420 M80 350 L160 350 M88 280 L152 280 M96 210 L144 210 M104 140 L136 140" />
          <path d="M74 420 L160 350 M166 420 L80 350 M80 350 L152 280 M160 350 L88 280 M88 280 L144 210 M152 280 L96 210" />
        </g>
        <rect x="108" y="20" width="24" height="26" />
        <rect x="96" y="560" width="48" height="14" />
      </g>

      {/* Pump jack — right */}
      <g fill="#060b13" transform="translate(1140 480) scale(0.8)">
        <rect x="-6" y="180" width="260" height="22" />
        <rect x="150" y="60" width="16" height="130" />
        <rect x="146" y="50" width="24" height="14" />
        <path d="M158 58 L230 26 L242 58 L182 82 Z" />
        <circle cx="70" cy="120" r="28" />
        <rect x="66" y="120" width="8" height="72" />
        <path d="M230 40 L70 116" stroke="#060b13" strokeWidth="9" />
      </g>

      {/* Foreground ridge */}
      <path d="M0 700 Q400 660 800 690 T1600 680 V900 H0 Z" fill="url(#hero-ground)" />
      <path d="M0 740 Q500 712 1000 736 T1600 730 V900 H0 Z" fill="#04070e" />
    </svg>
  )
}
