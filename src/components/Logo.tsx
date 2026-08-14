type Props = {
  className?: string
}

/**
 * Official OK. GIALFRA LLC brand logo.
 * Renders the exact company artwork (public/images/ok-gialfra-logo.png), a transparent
 * 1024x1024 PNG whose visible artwork occupies bbox x:60-954, y:123-740. The `.logo-crop`
 * wrapper frames that artwork tightly and sizes it by its real visible WIDTH via the
 * `--lw` custom property (set through `className`, e.g. `[--lw:250px]`), so the logo can be
 * made dominant without transparent padding inflating its box. The artwork itself is never
 * modified, recoloured or cropped into.
 */
export default function Logo({ className = '' }: Props) {
  const logoSrc = `${import.meta.env.BASE_URL}images/ok-gialfra-logo.png`
  return (
    <span role="img" aria-label="OK. GIALFRA LLC" className={`logo-crop shrink-0 select-none ${className}`}>
      <img src={logoSrc} alt="" aria-hidden="true" draggable={false} decoding="async" loading="eager" />
    </span>
  )
}
