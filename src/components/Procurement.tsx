import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { PROCESS } from '../data/content'

export default function Procurement() {
  return (
    <section id="procurement" className="relative overflow-hidden bg-navy-950 py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-copper-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-navy-600/25 blur-[120px]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Procurement Services"
          title="A Disciplined Procurement Workflow"
          intro="Every enquiry moves through a structured, transparent process — from RFQ to on-site delivery."
        />

        <div className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal as="article" key={step.step} delay={(i % 4) * 0.08} className="relative">
              {/* connector line */}
              {i < PROCESS.length - 1 && (
                <span className="absolute left-[38px] top-9 hidden h-px w-[calc(100%-30px)] bg-gradient-to-r from-copper-500/40 to-transparent lg:block" />
              )}
              <div className="relative flex items-center gap-4">
                <div className="relative z-10 inline-flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-graphite-800 to-navy-900 text-copper-400 shadow-card">
                  <step.icon className="h-8 w-8" />
                  <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-copper-500 font-display text-xs font-bold text-white">
                    {step.step}
                  </span>
                </div>
              </div>
              <h3 className="mt-5 text-lg text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
