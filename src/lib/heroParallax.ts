const MAX_OFFSET = 60
const RATE = 0.18

function initParallax() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return

  const mountain = document.querySelector<HTMLElement>('.hero-mountain')
  if (!mountain) return

  let raf = 0
  const update = () => {
    raf = 0
    const y = Math.min(window.scrollY * RATE, MAX_OFFSET)
    mountain.style.setProperty('--parallax-y', `${y}px`)
  }

  const onScroll = () => {
    if (raf) return
    raf = requestAnimationFrame(update)
  }

  update()
  window.addEventListener('scroll', onScroll, { passive: true })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParallax, { once: true })
} else {
  initParallax()
}
