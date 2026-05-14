export type TickerItem = string

export type Showtime = {
  day: string
  date: string
  time: string
  venue: string
}

export type Film = {
  id: number
  title: string
  dir: string
  country: string
  year: number
  runtime: number
  cat: 'Documentary' | 'Narrative' | 'Short'
  section: string
  tag?: string
  isNew?: boolean
  premiere?: string
  synopsis: string
  shows: Showtime[]
}

export type Spotlight = {
  title: string
  tag: 'Opening Night' | 'Centerpiece' | 'Closing Night'
  director: string
  country: string
  year: string
  runtime: string
  category: string
  premiere: string
  synopsis: string
  meta: Record<'Shot' | 'Format' | 'Language', string>
  /** Filename inside /public/assets/spotlights/ */
  posterFile?: string
  /** Filename of director portrait inside /public/assets/spotlights/ */
  directorImage?: string
  /** Pull-quote from the director, used for the highlight panel */
  directorNote?: string
  /** Short bio for the director credit */
  directorBio?: string
  /** Tagline / logline under the title in the poster card */
  tagline?: string
  /** When true the slide renders a placeholder instead of full details */
  comingSoon?: boolean
}

export type Venue = {
  n: string
  name: string
  addr: string
  role: string
}

export type SponsorTier = {
  n: string
  name: string
  contribution: string
  fit: string[]
  visibility: string[]
  feat?: boolean
}

export type Sponsor = {
  slug: string
  name: string
  filename: string
}

export type FestivalMeta = {
  edition: string
  year: number
  startDate: string
  endDate: string
  dateRange: string
  place: string
  sub: string
  inaugural: boolean
}
