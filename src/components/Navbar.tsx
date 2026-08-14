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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-navy-950/90 backdrop-blur-md' : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <nav
        className={`mx-auto flex w-full max-w-[1760px] items-center justify-between gap-4 px-5 transition-[height] duration-300 sm:px-8 lg:px-10 ${
          scrolled ? 'h-[64px] lg:h-[78px]' : 'h-[100px] lg:h-[110px]'
        }`}
      >
        <a href="#home" className="flex min-w-0 shrink items-center gap-3" aria-label={`${COMPANY.name} home`}>
          <Logo
            className={`shrink-0 transition-all duration-300 ${
              scrolled ? 'h-[46px] lg:h-[56px]' : 'h-[74px] sm:h-[84px] lg:h-[88px]'
            }`}
          />
          <span className="hidden min-w-0 flex-col justify-center leading-none min-[380px]:flex min-[1400px]:hidden min-[1600px]:flex">
            <span
              className={`whitespace-nowrap font-display font-bold uppercase tracking-wide text-white transition-all duration-300 ${
                scrolled ? 'text-lg' : 'text-xl lg:text-2xl'
              }`}
            >
              OK.&nbsp;GIALFRA <span className="text-steel-500">LLC</span>
            </span>
            {!scrolled && (
              <span className="mt-1 hidden whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-widest2 text-copper-400 min-[1780px]:block">
                Industrial Procurement &amp; Oilfield Supply
              </span>
            )}
          </span>
        </a>

        <div className="hidden items-center gap-6 min-[1400px]:flex 2xl:gap-8">
          <ul className="flex items-center gap-5 2xl:gap-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative whitespace-nowrap text-[13px] font-semibold uppercase tracking-wide text-steel-300 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-copper-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#rfq" className="btn-primary shrink-0 !px-5 !py-2.5 text-xs">
            Request a Quote
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-white/15 text-white transition-colors hover:border-copper-400/60 min-[1400px]:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <IconMenu className="h-[18px] w-[18px]" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 min-[1400px]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-white/10 bg-navy-900 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            >
              <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">
                <span className="flex items-center gap-2.5">
                  <Logo className="h-12" />
                  <span className="font-display text-base font-bold uppercase tracking-wide text-white">
                    OK.&nbsp;GIALFRA <span className="text-steel-500">LLC</span>
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-white"
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
                      className="block rounded-sm px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-steel-200 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="border-t border-white/10 p-4">
                <a href="#rfq" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Request a Quote
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="mt-3 flex items-center justify-center gap-2 text-sm text-steel-400 hover:text-copper-400"
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
