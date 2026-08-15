import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { NAV, COMPANY } from '../data/content'
import { IconMenu, IconClose, IconMail } from './icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-line bg-white/95 shadow-[0_2px_18px_-10px_rgba(21,34,49,0.35)] backdrop-blur-md'
          : 'border-line/70 bg-white/85 backdrop-blur-md'
      }`}
    >
      {/* Three-zone header: LARGE brand mark (left) | centered NAV | CTA (right).
          The logo is a dominant branding element, fully contained in the clean
          white bar (no top accent line). Compacts on scroll. Below lg it
          collapses to logo + hamburger (tablet/mobile). */}
      <nav
        className={`mx-auto grid w-full max-w-[1640px] grid-cols-[1fr_auto] items-center gap-4 px-5 transition-[height] duration-300 sm:px-8 lg:grid-cols-[auto_1fr_auto] lg:px-6 xl:px-10 ${
          scrolled ? 'h-[80px] lg:h-[88px]' : 'h-[130px] sm:h-[150px] lg:h-[220px] xl:h-[276px] 2xl:h-[296px]'
        }`}
      >
        {/* Brand mark — left, large and dominant, vertically centered */}
        <a href="#home" className="flex min-w-0 shrink items-center" aria-label={`${COMPANY.name} home`}>
          <Logo
            className={`${
              scrolled
                ? '[--lw:104px] lg:[--lw:150px]'
                : '[--lw:140px] sm:[--lw:158px] lg:[--lw:280px] xl:[--lw:360px] 2xl:[--lw:390px]'
            }`}
          />
        </a>

        {/* Navigation — centered between logo and CTA; HOME shows the active underline */}
        <ul className="hidden items-center justify-center gap-4 lg:flex lg:justify-self-center xl:gap-6">
          {NAV.map((item) => {
            const active = item.href === '#home'
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative whitespace-nowrap text-[12px] font-semibold uppercase tracking-wide transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-copper-500 after:transition-all after:duration-300 hover:text-ink hover:after:w-full xl:text-[13px] ${
                    active ? 'text-ink after:w-full' : 'text-ink/70 after:w-0'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA — right */}
        <a
          href="#rfq"
          className="btn-primary hidden shrink-0 !px-4 !py-2.5 text-xs lg:inline-flex lg:justify-self-end xl:!px-5"
        >
          Request a Quote
        </a>

        {/* Tablet / mobile menu trigger */}
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center justify-self-end rounded-sm border border-ink/20 text-ink transition-colors hover:border-copper-500 hover:text-copper-600 lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <IconMenu className="h-5 w-5" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-line bg-white shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            >
              <div className="flex h-[76px] items-center justify-between border-b border-line px-5">
                <span className="flex items-center gap-2.5">
                  <Logo className="[--lw:64px]" />
                  <span className="font-display text-base font-bold uppercase tracking-wide text-ink">
                    OK.&nbsp;GIALFRA <span className="text-mute">LLC</span>
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-ink/20 text-ink"
                  aria-label="Close menu"
                >
                  <IconClose className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.04 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-sm px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:bg-paper hover:text-copper-600"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="border-t border-line p-4">
                <a href="#rfq" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Request a Quote
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="mt-3 flex items-center justify-center gap-2 text-sm text-mute hover:text-copper-600"
                >
                  <IconMail className="h-4 w-4" /> {COMPANY.email}
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
