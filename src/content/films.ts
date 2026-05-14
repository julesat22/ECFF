import type { Film } from '@/lib/types'

export const FILMS: Film[] = [
  {
    id: 1,
    title: 'The Last Dive',
    dir: 'Cody Sheehy',
    country: 'USA',
    year: 2025,
    runtime: 88,
    cat: 'Documentary',
    section: 'Spotlight',
    tag: 'Opening Night',
    premiere: 'Oregon Premiere',
    isNew: true,
    synopsis:
      "Cody Sheehy met Terry eight years ago when their sailboats happened to anchor in the same remote Mexican bay. They spent a week exploring the underwater world together \u2014 and one night Terry showed Cody footage that changed everything: a man riding giant manta rays. The Last Dive is a portrait of an unlikely friendship, a disappearing ocean, and what it costs to bear witness.",
    shows: [
      { day: 'Thu', date: 'Jun 11', time: '7:30 PM', venue: 'OK Theatre' },
    ],
  },
]

export function findFilmByTitle(title: string): Film | undefined {
  return FILMS.find((f) => f.title === title)
}
