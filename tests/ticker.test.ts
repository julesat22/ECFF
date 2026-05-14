import { describe, it, expect } from 'vitest'
import { TICKER_ITEMS } from '@/content/ticker'

describe('ticker content', () => {
  it('exposes exactly the 6 items from the handoff in order', () => {
    expect(TICKER_ITEMS).toEqual([
      'November 5 — 7 · 2026',
      'Joseph, Oregon',
      'At the base of the Wallowas',
      'Tickets are limited',
      'Submissions open',
      'The Inaugural Festival',
    ])
  })

  it('items are strings', () => {
    for (const item of TICKER_ITEMS) {
      expect(typeof item).toBe('string')
      expect(item.length).toBeGreaterThan(0)
    }
  })
})
