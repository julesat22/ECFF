import { describe, it, expectTypeOf } from 'vitest'
import type {
  Film,
  SponsorTier,
  Venue,
  Sponsor,
  Spotlight,
  TickerItem,
  Showtime,
} from '@/lib/types'

describe('shared types', () => {
  it('Film matches data.jsx shape', () => {
    const film: Film = {
      id: 1,
      title: 'North of the Divide',
      dir: 'Ada Harlan',
      country: 'USA',
      year: 2026,
      runtime: 104,
      cat: 'Documentary',
      section: 'Main Competition',
      tag: 'Opening',
      isNew: true,
      synopsis: '...',
      shows: [{ day: 'Thu', date: 'Jun 11', time: '7:30 PM', venue: 'OK Theatre' }],
    }
    expectTypeOf(film.id).toBeNumber()
    expectTypeOf(film.shows).toEqualTypeOf<Showtime[]>()
  })

  it('SponsorTier has visibility, fit, and an optional feat flag', () => {
    const tier: SponsorTier = {
      n: '01',
      name: 'Supporting Sponsor',
      contribution: '10,000',
      fit: ['Local Businesses'],
      visibility: ['Logo placement on website'],
    }
    expectTypeOf(tier.visibility).toEqualTypeOf<string[]>()
    expectTypeOf(tier.feat).toEqualTypeOf<boolean | undefined>()
  })

  it('Venue has number, name, address, capacity, built', () => {
    const venue: Venue = {
      n: '01',
      name: 'OK Theatre',
      addr: '208 W Main St, Enterprise',
      role: 'Main Screen',
    }
    expectTypeOf(venue).toHaveProperty('addr')
    expectTypeOf(venue.role).toBeString()
  })

  it('Sponsor (partner) has slug, name, filename', () => {
    const s: Sponsor = {
      slug: 'ok',
      name: 'OK Theatre',
      filename: 'ok-theatre.png',
    }
    expectTypeOf(s.name).toBeString()
    expectTypeOf(s.slug).toBeString()
    expectTypeOf(s.filename).toBeString()
  })

  it('Spotlight has nested meta record', () => {
    const sp: Spotlight = {
      title: 'North of the Divide',
      tag: 'Opening Night',
      director: 'Ada Harlan',
      country: 'USA',
      year: '2026',
      runtime: '104 min',
      category: 'Documentary Feature',
      premiere: 'World Premiere',
      synopsis: '...',
      meta: { Shot: 'Oregon / Idaho', Format: '16mm + Digital', Language: 'English' },
    }
    expectTypeOf(sp.meta).toEqualTypeOf<Record<'Shot' | 'Format' | 'Language', string>>()
  })

  it('TickerItem is a string', () => {
    const t: TickerItem = 'Passes on sale now'
    expectTypeOf(t).toBeString()
  })
})
