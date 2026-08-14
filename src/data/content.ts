import {
  IconStrategy, IconGlobe, IconDerrick, IconWarehouse, IconParts, IconClipboard,
  IconTruck, IconHandshake, IconValve, IconPump, IconPipe, IconFlange, IconGauge,
  IconBolt, IconMotor, IconCompressor, IconShield, IconTools, IconGear, IconFactory,
  IconBuilding, IconPower, IconAnchor, IconSearch, IconScale, IconDoc, IconCheck,
} from '../components/icons'
import type { ComponentType, SVGProps } from 'react'

type Icon = ComponentType<SVGProps<SVGSVGElement>>
type Tone = 'navy' | 'graphite' | 'steel' | 'copper' | 'dusk'

export const COMPANY = {
  name: 'OK. GIALFRA LLC',
  tagline: 'Global Procurement. Industrial Solutions. Delivered.',
  email: 'sales@okgialfra.com',
  city: 'Homestead, Florida 33035',
  country: 'United States',
}

export const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Industries', href: '#industries' },
  { label: 'Products', href: '#products' },
  { label: 'Procurement', href: '#procurement' },
  { label: 'Services', href: '#services' },
  { label: 'Brands', href: '#brands' },
  { label: 'Project Support', href: '#project-support' },
  { label: 'Contact', href: '#contact' },
]

export const CAPABILITIES: { title: string; desc: string; icon: Icon; tone: Tone }[] = [
  { title: 'Strategic Procurement', desc: 'Structured sourcing programs that control cost, quality and lead time across complex scopes.', icon: IconStrategy, tone: 'navy' },
  { title: 'Global Sourcing', desc: 'An international supplier network delivering OEM and equivalent equipment worldwide.', icon: IconGlobe, tone: 'dusk' },
  { title: 'Oilfield Equipment', desc: 'Wellhead, drilling, production and completion equipment for upstream operations.', icon: IconDerrick, tone: 'copper' },
  { title: 'Industrial Supply', desc: 'MRO consumables, components and industrial materials for continuous operations.', icon: IconWarehouse, tone: 'graphite' },
  { title: 'Spare Parts', desc: 'Hard-to-find, obsolete and critical spares matched by part number and specification.', icon: IconParts, tone: 'steel' },
  { title: 'Project Support', desc: 'Dedicated procurement support for capital projects, turnarounds and expansions.', icon: IconClipboard, tone: 'navy' },
  { title: 'Logistics Coordination', desc: 'Freight, consolidation, export documentation and delivery management end to end.', icon: IconTruck, tone: 'dusk' },
  { title: 'Vendor Sourcing', desc: 'Qualified vendor identification, evaluation and management for every requirement.', icon: IconHandshake, tone: 'graphite' },
]

export const INDUSTRIES: { title: string; desc: string; icon: Icon; tone: Tone; scene: string }[] = [
  { title: 'Oil & Gas', desc: 'Upstream, midstream and downstream supply.', icon: IconDerrick, tone: 'dusk', scene: 'oil-gas' },
  { title: 'Energy', desc: 'Power generation and energy infrastructure.', icon: IconPower, tone: 'navy', scene: 'energy' },
  { title: 'Petrochemical', desc: 'Refining, processing and chemical plants.', icon: IconCompressor, tone: 'copper', scene: 'petrochemical' },
  { title: 'Industrial', desc: 'Manufacturing and heavy industry.', icon: IconFactory, tone: 'graphite', scene: 'industrial' },
  { title: 'Construction', desc: 'EPC contractors and site operations.', icon: IconBuilding, tone: 'steel', scene: 'construction' },
  { title: 'Infrastructure', desc: 'Utilities, pipelines and public works.', icon: IconPipe, tone: 'navy', scene: 'infrastructure' },
  { title: 'Marine', desc: 'Ports, offshore and vessel supply.', icon: IconAnchor, tone: 'dusk', scene: 'marine' },
  { title: 'Utilities', desc: 'Water, power and distribution networks.', icon: IconGauge, tone: 'graphite', scene: 'utilities' },
]

export const PRODUCTS: { title: string; icon: Icon; tone: Tone; scene: string }[] = [
  { title: 'Valves', icon: IconValve, tone: 'navy', scene: 'valves' },
  { title: 'Pumps', icon: IconPump, tone: 'dusk', scene: 'pumps' },
  { title: 'Pipes & Fittings', icon: IconPipe, tone: 'graphite', scene: 'pipes' },
  { title: 'Flanges', icon: IconFlange, tone: 'steel', scene: 'flanges' },
  { title: 'Instrumentation', icon: IconGauge, tone: 'navy', scene: 'instrumentation' },
  { title: 'Electrical Equipment', icon: IconBolt, tone: 'copper', scene: 'electrical' },
  { title: 'Industrial Motors', icon: IconMotor, tone: 'graphite', scene: 'motors' },
  { title: 'Compressors', icon: IconCompressor, tone: 'dusk', scene: 'compressors' },
  { title: 'Safety Equipment', icon: IconShield, tone: 'navy', scene: 'safety' },
  { title: 'Industrial Tools', icon: IconTools, tone: 'steel', scene: 'tools' },
  { title: 'Mechanical Components', icon: IconGear, tone: 'graphite', scene: 'mechanical' },
  { title: 'Spare Parts', icon: IconParts, tone: 'copper', scene: 'spare-parts' },
]

export const PROCESS: { step: string; title: string; desc: string; icon: Icon }[] = [
  { step: '01', title: 'RFQ Received', desc: 'Your requirement is logged and acknowledged by our sales desk.', icon: IconDoc },
  { step: '02', title: 'Technical Review', desc: 'Specifications, part numbers and standards are verified in detail.', icon: IconSearch },
  { step: '03', title: 'Global Supplier Sourcing', desc: 'We engage OEMs and qualified suppliers across our network.', icon: IconGlobe },
  { step: '04', title: 'Commercial Evaluation', desc: 'Offers are compared on price, lead time, quality and terms.', icon: IconScale },
  { step: '05', title: 'Procurement', desc: 'Purchase orders are placed and expedited with the selected vendor.', icon: IconHandshake },
  { step: '06', title: 'Inspection / Documentation', desc: 'Quality checks, certificates and export paperwork are prepared.', icon: IconClipboard },
  { step: '07', title: 'Logistics Coordination', desc: 'Consolidation, freight and customs are managed end to end.', icon: IconTruck },
  { step: '08', title: 'Delivery', desc: 'Goods are delivered to your site, on specification and on schedule.', icon: IconCheck },
]

export const WHY: { title: string; desc: string; icon: Icon }[] = [
  { title: 'Responsive Sales Support', desc: 'A dedicated point of contact and fast, accurate quotations.', icon: IconHandshake },
  { title: 'Competitive Sourcing', desc: 'Multiple qualified offers to secure the best value on every line.', icon: IconScale },
  { title: 'Reliable Suppliers', desc: 'Vetted OEMs and distributors with proven track records.', icon: IconShield },
  { title: 'Technical Procurement', desc: 'Specification-driven sourcing that gets the right item, first time.', icon: IconGauge },
  { title: 'Global Supply Network', desc: 'International reach with consolidated logistics and documentation.', icon: IconGlobe },
  { title: 'Project-Focused Service', desc: 'Structured support for turnarounds, capital projects and expansions.', icon: IconClipboard },
]

export const STATS = [
  { value: '24/7', label: 'Sourcing Support' },
  { value: '12+', label: 'Industries Served' },
  { value: 'Global', label: 'Supplier Network' },
  { value: '100%', label: 'Specification-Driven' },
]

export const SERVICES = [
  { title: 'Procurement Management', desc: 'End-to-end sourcing of equipment, materials and spares against your specifications and standards.' },
  { title: 'MRO & Consumables', desc: 'Reliable resupply of maintenance, repair and operations items to keep facilities running.' },
  { title: 'Expediting & Inspection', desc: 'Order follow-up, quality verification and documentation control before shipment.' },
  { title: 'Logistics & Freight', desc: 'Consolidation, export packing, freight forwarding and delivery coordination worldwide.' },
  { title: 'Vendor Management', desc: 'Qualification, evaluation and ongoing management of a reliable supplier base.' },
  { title: 'Kitting & Consolidation', desc: 'Multi-vendor orders consolidated into managed shipments to reduce cost and complexity.' },
]
