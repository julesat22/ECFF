import { describe, it, expect } from 'vitest'
import { SPONSOR_TIERS, SPONSOR_CONTACT_EMAIL } from '@/content/sponsorTiers'

describe('sponsorship tiers content', () => {
  it('has 3 tiers in 01/02/03 order with the Title tier featured', () => {
    expect(SPONSOR_TIERS.map((t) => t.n)).toEqual(['01', '02', '03'])
    expect(SPONSOR_TIERS[2]!.feat).toBe(true)
    expect(SPONSOR_TIERS[2]!.name).toBe('Title Sponsor')
  })

  it('contributions step up: $10k → $25k → $75k', () => {
    expect(SPONSOR_TIERS[0]!.contribution).toBe('10,000')
    expect(SPONSOR_TIERS[1]!.contribution).toBe('25,000')
    expect(SPONSOR_TIERS[2]!.contribution).toBe('75,000')
  })

  it('every tier has at least one Best Fit pill and one Visibility item', () => {
    for (const t of SPONSOR_TIERS) {
      expect(t.fit.length).toBeGreaterThan(0)
      expect(t.visibility.length).toBeGreaterThan(0)
    }
  })

  it('exposes a contact email for the partnerships inbox', () => {
    expect(SPONSOR_CONTACT_EMAIL).toMatch(/@/)
    expect(SPONSOR_CONTACT_EMAIL).toContain('eaglecapfilmfest')
  })
})
