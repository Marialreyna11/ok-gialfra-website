/**
 * Subtle "Global Supply Network" HUD — thin technical rings that rotate slowly in
 * opposite directions, a few restrained orange nodes and a soft glow. Sits over the
 * darker right side of the hero photograph. Motion is slow and elegant and is
 * disabled automatically under prefers-reduced-motion (see index.css).
 *
 * NOTE: the central figure is a NON-FACTUAL placeholder — the project has no
 * verified "active partners" metric. Replace once a real number is supplied.
 */
export default function HeroHud({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-square w-full max-w-[440px] select-none ${className}`}>
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-[10%] rounded-full bg-copper-500/10 blur-3xl" />

      {/* static rings */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
      </svg>

      {/* slow rotating dashed ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_46s_linear_infinite]" aria-hidden="true">
        <circle cx="100" cy="100" r="87" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.7" strokeDasharray="1.4 5.5" />
        <circle cx="100" cy="13" r="2" fill="#ff8c38" />
        <circle cx="187" cy="100" r="1.4" fill="rgba(255,255,255,0.65)" />
        <circle cx="100" cy="187" r="1.3" fill="rgba(255,255,255,0.55)" />
      </svg>

      {/* counter-rotating tick ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_74s_linear_infinite_reverse]" aria-hidden="true">
        <circle cx="100" cy="100" r="79" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="2.6" strokeDasharray="0.4 6" />
        <circle cx="21" cy="100" r="1.7" fill="#ff8c38" className="animate-pulse" />
        <circle cx="150" cy="41" r="1.2" fill="rgba(255,255,255,0.6)" />
      </svg>

      {/* centre content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="font-semibold uppercase leading-[1.5] tracking-[0.3em] text-white/70 text-[10px] sm:text-[11px]">
          Global Supply
          <br />
          Network
        </div>
        <div className="mt-3 font-display text-6xl font-bold leading-none text-white">
          —<span className="align-top text-2xl text-copper-400">+</span>
        </div>
        <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">Active Partners</div>
        <div className="mt-1 text-[9px] italic tracking-wide text-white/40">figure to confirm</div>
      </div>
    </div>
  )
}
