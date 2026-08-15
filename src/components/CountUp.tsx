import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Animates a numeric value from 0 to its target once, when it first enters the
 * viewport. Accepts the raw stat string (e.g. "12+", "100%", "24/7", "Global")
 * and only animates a leading integer, preserving any suffix; non-numeric
 * values are rendered unchanged. Respects prefers-reduced-motion.
 */
export default function CountUp({ value, duration = 1.5, className = '' }: { value: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const reduce = useReducedMotion()

  const match = /^(\d+)(.*)$/.exec(value.trim())
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  const [n, setN] = useState(0)

  useEffect(() => {
    if (target === null || !inView) return
    if (reduce) {
      setN(target)
      return
    }
    let raf = 0
    let startTs = 0
    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const t = Math.min(1, (ts - startTs) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
      setN(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, reduce])

  if (target === null) return <span ref={ref} className={className}>{value}</span>
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  )
}
