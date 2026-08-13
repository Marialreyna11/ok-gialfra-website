import { useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { COMPANY } from '../data/content'
import { IconMail, IconPin, IconClock, IconCheck } from './icons'

export default function Contact() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Contact — ${values.name || 'Website Enquiry'}`
    const body = `Name: ${values.name || '-'}\nCompany: ${values.company || '-'}\nEmail: ${values.email || '-'}\nPhone: ${
      values.phone || '-'
    }\n\nMessage:\n${values.message || '-'}\n\n— Sent via okgialfra.com`
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact" className="relative border-t border-white/5 bg-graphite-950 py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Talk To Our Sales Desk"
            intro="Tell us about your requirement or project and we'll get straight back to you."
          />

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-navy-950/60 p-5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-copper-500/15 text-copper-400">
                <IconPin className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-lg uppercase tracking-wide text-white">{COMPANY.name}</div>
                <p className="mt-1 text-steel-400">
                  {COMPANY.city}
                  <br />
                  {COMPANY.country}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-navy-950/60 p-5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-copper-500/15 text-copper-400">
                <IconMail className="h-6 w-6" />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest2 text-steel-500">Sales Department</div>
                <a href={`mailto:${COMPANY.email}`} className="mt-0.5 block text-lg text-white hover:text-copper-400">
                  {COMPANY.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-navy-950/60 p-5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-copper-500/15 text-copper-400">
                <IconClock className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-lg uppercase tracking-wide text-white">Responsive Support</div>
                <p className="mt-1 text-steel-400">Enquiries answered promptly, Monday to Friday.</p>
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-navy-950/70 p-6 shadow-card sm:p-8">
            {sent ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-copper-500/15 text-copper-400">
                  <IconCheck className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-2xl text-white">Message Ready To Send</h3>
                <p className="mt-3 max-w-md text-steel-400">
                  Your email client should have opened with your message pre-filled. Press send and we&apos;ll be in
                  touch shortly.
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-8">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { k: 'name', l: 'Full Name', req: true },
                    { k: 'company', l: 'Company' },
                    { k: 'email', l: 'Email', t: 'email', req: true },
                    { k: 'phone', l: 'Phone', t: 'tel' },
                  ].map((f) => (
                    <div key={f.k}>
                      <label htmlFor={`c-${f.k}`} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-steel-400">
                        {f.l} {f.req && <span className="text-copper-400">*</span>}
                      </label>
                      <input
                        id={`c-${f.k}`}
                        type={f.t || 'text'}
                        required={f.req}
                        value={values[f.k] || ''}
                        onChange={(e) => set(f.k, e.target.value)}
                        className="w-full rounded-md border border-white/10 bg-graphite-900/70 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-copper-500/60 focus:ring-1 focus:ring-copper-500/40"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="c-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-steel-400">
                    Message <span className="text-copper-400">*</span>
                  </label>
                  <textarea
                    id="c-message"
                    rows={5}
                    required
                    value={values.message || ''}
                    onChange={(e) => set('message', e.target.value)}
                    className="w-full resize-y rounded-md border border-white/10 bg-graphite-900/70 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-copper-500/60 focus:ring-1 focus:ring-copper-500/40"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
