import { useState, useEffect } from 'react'
import { useNavFlip } from '@/lib/useNavFlip'
import styles from './Nav.module.css'

const LINKS = [
  { href: '#mission', label: 'About' },
  { href: '#venues', label: 'Venues' },
  { href: '#sponsors', label: 'Sponsors' },
] as const

export function Nav() {
  const isDark = useNavFlip()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <nav className={`${styles.nav} ${isDark ? styles.onDark : ''}`} aria-label="Primary">
      <div className={styles.inner}>
        <a href="#top" className={styles.logo} aria-label="Eagle Cap Film Festival, home">
          <img
            src={isDark ? '/assets/logo-offwhite.png' : '/assets/logo-black.png'}
            alt=""
            aria-hidden="true"
            width="40"
            height="40"
          />
        </a>
        <div className={styles.links}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="#submit" className={styles.cta} data-cta="submit-film">
          <span>Submit Film</span>
          <span className={styles.ctaArrow} aria-hidden="true">↗</span>
        </a>
        <button
          className={styles.burger}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          type="button"
        >
          <span /><span /><span />
        </button>
      </div>
      <div
        className={`${styles.scrim} ${open ? styles.scrimOpen : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        aria-label="Menu"
        aria-hidden={!open}
      >
        <button
          className={styles.panelClose}
          onClick={close}
          aria-label="Close menu"
          type="button"
          tabIndex={open ? 0 : -1}
        >
          <span aria-hidden="true">×</span>
        </button>
        <a href="#mission" onClick={close} tabIndex={open ? 0 : -1}>About</a>
        <a href="#venues" onClick={close} tabIndex={open ? 0 : -1}>Venues</a>
        <a href="#sponsors" onClick={close} tabIndex={open ? 0 : -1}>Sponsors</a>
        <a
          href="#submit"
          className={styles.panelCta}
          onClick={close}
          tabIndex={open ? 0 : -1}
        >
          Submit Film <span aria-hidden="true">↗</span>
        </a>
      </aside>
    </nav>
  )
}
