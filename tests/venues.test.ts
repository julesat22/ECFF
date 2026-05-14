import { describe, it, expect } from 'vitest'
import { VENUES } from '@/content/venues'

describe('venues content', () => {
  it('has 3 venues with sequential numbering 01–03', () => {
    expect(VENUES.length).toBe(3)
    expect(VENUES.map((v) => v.n)).toEqual(['01', '02', '03'])
  })

  it('OK Theatre is the first venue', () => {
    expect(VENUES[0]!.name).toBe('OK Theatre')
    expect(VENUES[0]!.addr).toContain('Enterprise')
  })

  it('all venues have name, address, and role', () => {
    for (const v of VENUES) {
      expect(v.name.length).toBeGreaterThan(0)
      expect(v.addr.length).toBeGreaterThan(0)
      expect(v.role.length).toBeGreaterThan(0)
    }
  })
})
