type Props = {
  className?: string
  /** show the derrick mark to the left of the wordmark */
  mark?: boolean
}

/**
 * OK. GIALFRA LLC wordmark lockup.
 * Clean vector interpretation of the brand: steel "OK.", copper-red "GIALFRA", muted "LLC",
 * with an optional derrick mark. Drop-in replaceable by placing the official artwork
 * at /public/logo.png and swapping this component's usage if desired.
 */
export default function Logo({ className = '', mark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="OK. GIALFRA LLC">
      {mark && (
        <svg viewBox="0 0 32 40" className="h-8 w-auto shrink-0" aria-hidden="true">
          <defs>
            <linearGradient id="lg-sun" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fb923c" />
              <stop offset="1" stopColor="#c2410c" />
            </linearGradient>
          </defs>
          <path d="M4 30a12 12 0 0 1 24 0z" fill="url(#lg-sun)" opacity="0.9" />
          <path
            d="M11 31L15 9M21 31L17 9M15 9h2M13 15h6M12.4 20h7.2M11.8 25.5h8.4"
            fill="none"
            stroke="#e6ebf1"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path d="M16 9V6M14 6h4" stroke="#e6ebf1" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M4 31h24" stroke="#0a1222" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      <span className="font-display text-xl font-bold uppercase leading-none tracking-wide">
        <span className="text-steel-200">OK.</span>
        <span className="ml-1 text-copper-500">GIALFRA</span>
        <span className="ml-1 align-top text-[0.6em] font-semibold text-steel-500">LLC</span>
      </span>
    </span>
  )
}
