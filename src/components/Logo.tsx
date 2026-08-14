type Props = {
  className?: string
}

/**
 * Official OK. GIALFRA LLC brand logo.
 * Renders the exact company artwork (public/images/ok-gialfra-logo.png), a transparent
 * 1024x1024 PNG. Height is controlled by the caller via `className`; width stays auto so
 * the original proportions are always preserved — never stretched, cropped or recolored.
 */
export default function Logo({ className = 'h-12' }: Props) {
  // Base-aware path so the asset resolves both at the site root (dev) and under a
  // sub-path deployment such as GitHub Pages (/<repo>/). BASE_URL always ends in "/".
  const logoSrc = `${import.meta.env.BASE_URL}images/ok-gialfra-logo.png`
  return (
    <img
      src={logoSrc}
      alt="OK. GIALFRA LLC"
      className={`w-auto max-w-full select-none object-contain ${className}`}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  )
}
