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
  return (
    <img
      src="/images/ok-gialfra-logo.png"
      alt="OK. GIALFRA LLC"
      className={`w-auto max-w-full select-none object-contain ${className}`}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  )
}
