import { useRef, useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { COMPANY } from '../data/content'
import { IconUpload, IconCheck, IconMail } from './icons'

type Field = {
  name: string
  label: string
  type?: string
  required?: boolean
  colSpan?: 1 | 2
  placeholder?: string
}

const FIELDS: Field[] = [
  { name: 'fullName', label: 'Full Name', required: true },
  { name: 'company', label: 'Company', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'country', label: 'Country' },
  { name: 'product', label: 'Product / Equipment', required: true },
  { name: 'brand', label: 'Manufacturer / Brand' },
  { name: 'partNumber', label: 'Part Number' },
  { name: 'quantity', label: 'Quantity' },
  { name: 'deliveryDate', label: 'Required Delivery Date', type: 'date' },
]

export default function RFQ() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [files, setFiles] = useState<File[]>([])
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (name: string, v: string) => setValues((s) => ({ ...s, [name]: v }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const required = FIELDS.filter((f) => f.required)
    for (const f of required) {
      if (!values[f.name]?.trim()) {
        setError(`Please complete the required field: ${f.label}.`)
        return
      }
    }

    // Compose a structured email to the sales desk. (Swap for a backend/API endpoint in production.)
    const lines = [
      ...FIELDS.map((f) => `${f.label}: ${values[f.name] || '-'}`),
      `Additional Requirements: ${values.additional || '-'}`,
      files.length ? `\nAttachments to include: ${files.map((f) => f.name).join(', ')}` : '',
    ]
    const subject = `RFQ — ${values.company || values.fullName || 'New Enquiry'}${
      values.product ? ` — ${values.product}` : ''
    }`
    const body = `${lines.join('\n')}\n\n— Submitted via okgialfra.com`
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="rfq" className="relative overflow-hidden bg-paper py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-steel [background-size:52px_52px] opacity-[0.12]" />
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-copper-600/15 blur-[120px]" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Left column — pitch */}
        <div className="lg:pt-6">
          <SectionHeading
            eyebrow="Request For Quote"
            title="Request A Quote"
            intro="Send us your requirement and our sales desk will respond with a competitive, specification-matched quotation."
          />
          <div className="mt-8 space-y-4">
            {['Fast, accurate quotations', 'OEM & equivalent options', 'Global supplier sourcing', 'Full documentation & logistics'].map(
              (t) => (
                <div key={t} className="flex items-center gap-3 text-mute">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-copper-500/15 text-copper-600">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  {t}
                </div>
              ),
            )}
          </div>
          <div className="mt-10 rounded-lg border border-line bg-white p-5 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-widest2 text-mute">Sales Department</div>
            <a href={`mailto:${COMPANY.email}`} className="mt-1 flex items-center gap-2 text-lg text-ink hover:text-copper-600">
              <IconMail className="h-5 w-5 text-copper-500" /> {COMPANY.email}
            </a>
          </div>
        </div>

        {/* Right column — form */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
            {sent ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-copper-500/15 text-copper-600">
                  <IconCheck className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-2xl text-ink">Your RFQ Is Ready To Send</h3>
                <p className="mt-3 max-w-md text-mute">
                  Your email application should have opened with your request pre-filled to{' '}
                  <span className="text-copper-600">{COMPANY.email}</span>. Please attach any documents and press send —
                  our team will respond promptly.
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-8">
                  Submit Another RFQ
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {FIELDS.map((f) => (
                    <div key={f.name} className={f.colSpan === 2 ? 'sm:col-span-2' : ''}>
                      <label htmlFor={f.name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mute">
                        {f.label} {f.required && <span className="text-copper-600">*</span>}
                      </label>
                      <input
                        id={f.name}
                        name={f.name}
                        type={f.type || 'text'}
                        required={f.required}
                        value={values[f.name] || ''}
                        onChange={(e) => set(f.name, e.target.value)}
                        className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-mute/70 outline-none transition-colors focus:border-copper-500 focus:bg-white focus:ring-1 focus:ring-copper-500/40"
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label htmlFor="additional" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mute">
                      Additional Requirements
                    </label>
                    <textarea
                      id="additional"
                      name="additional"
                      rows={4}
                      value={values.additional || ''}
                      onChange={(e) => set('additional', e.target.value)}
                      placeholder="Specifications, standards, delivery terms, destination…"
                      className="w-full resize-y rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-mute/70 outline-none transition-colors focus:border-copper-500 focus:bg-white focus:ring-1 focus:ring-copper-500/40"
                    />
                  </div>

                  {/* File upload */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mute">
                      Attachments — RFQ documents, specifications, datasheets, photos
                    </label>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-line bg-paper px-4 py-6 text-sm text-mute transition-colors hover:border-copper-500/60 hover:text-copper-600"
                    >
                      <IconUpload className="h-5 w-5 text-copper-500" />
                      Click to attach files
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    />
                    {files.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {files.map((f) => (
                          <li key={f.name} className="rounded border border-line bg-paper px-2.5 py-1 text-xs text-ink">
                            {f.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {error && <p className="mt-4 text-sm font-medium text-copper-600">{error}</p>}

                <button type="submit" className="btn-primary mt-6 w-full text-base">
                  Submit RFQ
                </button>
                <p className="mt-3 text-center text-xs text-mute">
                  Your request is prepared as an email to our sales desk. Attach files in your email client before sending.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
