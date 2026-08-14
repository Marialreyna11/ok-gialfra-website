import type { SVGProps } from 'react'

/**
 * Industrial line-icon set. Stroke-based, 24x24 viewBox, currentColor.
 * Used across capabilities, products, industries and process steps.
 */
type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

export const IconValve = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4v6M9 4h6" />
    <path d="M4 14l8-4 8 4-8 4-8-4z" />
    <path d="M12 14v6M8 20h8" />
  </svg>
)

export const IconPump = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="10" cy="13" r="5" />
    <path d="M10 13l3-3" />
    <path d="M15 8h5v4M18 8v-3M16 5h4" />
    <path d="M4 20h16" />
  </svg>
)

export const IconPipe = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 8h9a4 4 0 0 1 4 4v8" />
    <path d="M13 4v4M21 4v4M13 4h8" />
    <path d="M12 16h8M12 20h8" />
  </svg>
)

export const IconFlange = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
  </svg>
)

export const IconGauge = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 17a8 8 0 1 1 16 0" />
    <path d="M12 17l4-4" />
    <path d="M12 17h.01" />
    <path d="M4 17h16" />
  </svg>
)

export const IconBolt = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M13 3L5 13h5l-1 8 8-11h-5l1-7z" />
  </svg>
)

export const IconMotor = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="8" width="12" height="9" rx="1" />
    <path d="M15 11h3v3h-3" />
    <path d="M18 12h2" />
    <path d="M5 8V6M9 8V6M13 8V6" />
    <path d="M4 20h12" />
  </svg>
)

export const IconCompressor = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="10" height="12" rx="1" />
    <circle cx="8" cy="12" r="3" />
    <path d="M13 9h4l3-3M13 15h4l3 3" />
  </svg>
)

export const IconShield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

export const IconTools = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 6a3.5 3.5 0 0 0 4.6 4.6L21 13l-2 2-2.4-2.4A3.5 3.5 0 0 0 12 8" />
    <path d="M6.5 21L3 17.5l7-7" />
    <path d="M4 6l2-2 3 3-2 2z" />
  </svg>
)

export const IconGear = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
  </svg>
)

export const IconParts = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
    <path d="M12 2v9M12 11l8-4.5M12 11l-8-4.5" />
  </svg>
)

// Capability / process icons
export const IconStrategy = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
  </svg>
)

export const IconGlobe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
  </svg>
)

export const IconDerrick = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 21L11 4M16 21L13 4M11 4h2" />
    <path d="M9 9h6M8.4 13h7.2M7.6 17h8.8" />
    <path d="M12 4V2" />
  </svg>
)

export const IconWarehouse = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 21V9l9-5 9 5v12" />
    <path d="M7 21v-7h10v7" />
    <path d="M7 17h10" />
  </svg>
)

export const IconTruck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 7h10v9H3z" />
    <path d="M13 10h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
)

export const IconHandshake = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 8l4-2 5 3 5-3 4 2" />
    <path d="M7 6v7l3 3 2-2 2 2 3-3V6" />
    <path d="M12 9l-2 2" />
  </svg>
)

export const IconDoc = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v4h4" />
    <path d="M9 12h6M9 16h6" />
  </svg>
)

export const IconSearch = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4.3-4.3" />
  </svg>
)

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12l5 5L20 6" />
  </svg>
)

export const IconClipboard = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="4" width="14" height="17" rx="1.5" />
    <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2H9z" />
    <path d="M8 11l1.5 1.5L12 10M8 16l1.5 1.5L12 15" />
  </svg>
)

export const IconScale = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v18M6 21h12" />
    <path d="M5 7h14M5 7l-2.5 5a3 3 0 0 0 5 0zM19 7l2.5 5a3 3 0 0 1-5 0z" />
  </svg>
)

export const IconAnchor = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v13M8 11H5M19 11h-3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
  </svg>
)

export const IconFactory = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 21V10l5 3V10l5 3V7l3-4 3 4v14z" />
    <path d="M7 17h2M12 17h2M17 17h1" />
  </svg>
)

export const IconBuilding = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 21V4l8-2v19M13 21V8l6 2v11" />
    <path d="M8 7h2M8 11h2M8 15h2M16 12h1M16 16h1" />
  </svg>
)

export const IconPower = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 21l3-9H5l4-9M9 12h4l-3 9M15 6h4l-3 6h4l-5 7" />
  </svg>
)

export const IconMail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M4 7l8 6 8-6" />
  </svg>
)

export const IconPhone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z" />
  </svg>
)

export const IconPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const IconArrow = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconClock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const IconMenu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconClose = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const IconUpload = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 16V4M8 8l4-4 4 4" />
    <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
  </svg>
)
