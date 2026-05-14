const ROOT_MARGIN = '0px 0px -10% 0px'
const REVEAL_CLASS = 'reveal'
const VISIBLE_CLASS = 'in'

function setup() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const targets = document.querySelectorAll<HTMLElement>(`.${REVEAL_CLASS}`)
  if (targets.length === 0) return

  if (reduced || !('IntersectionObserver' in window)) {
    for (const el of targets) el.classList.add(VISIBLE_CLASS)
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add(VISIBLE_CLASS)
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: ROOT_MARGIN },
  )

  for (const el of targets) io.observe(el)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setup, { once: true })
} else {
  setup()
}
