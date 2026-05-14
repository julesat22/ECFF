import { describe, it, expect } from 'vitest'
import { SPONSORS } from '@/content/sponsors'

describe('sponsors / partners content', () => {
  it('has 6 partners including M. Crow & Co.', () => {
    expect(SPONSORS).toHaveLength(6)
    const mcrow = SPONSORS.find((p) => p.slug === 'mcrow')
    expect(mcrow).toBeDefined()
    expect(mcrow!.name).toBe('M. Crow & Co.')
    expect(SPONSORS.find((p) => p.slug === 'ok')!.name).toBe('OK Theatre')
  })

  it('every partner has a slug, name, and filename', () => {
    for (const p of SPONSORS) {
      expect(p.slug.length).toBeGreaterThan(0)
      expect(p.name.length).toBeGreaterThan(0)
      expect(p.filename).toMatch(/\.(png|jpg|jpeg|webp|svg)$/i)
    }
  })

  it('slugs are unique', () => {
    const slugs = SPONSORS.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
