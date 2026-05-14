import { useEffect, useState } from 'react'

// Roughly the hero's height — past this scroll point the nav flips out of
// "on-dark" mode (white logo + offwhite text) to its default light styling.
const FLIP_AT_PX = 700

export function useNavFlip(): boolean {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const update = () => setIsDark(window.scrollY < FLIP_AT_PX)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return isDark
}
