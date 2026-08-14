import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  invert?: boolean
}

export default function SectionHeading({ eyebrow, title, intro, align = 'left', invert = false }: Props) {
  const isCenter = align === 'center'
  return (
    <div className={isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className={`section-title mt-5 text-balance ${invert ? 'text-navy-900' : 'text-white'}`}>{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className={`mt-6 text-lg leading-relaxed ${invert ? 'text-graphite-700' : 'text-steel-400'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
