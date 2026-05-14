import type { Spotlight } from '@/lib/types'

export const SPOTLIGHTS: Spotlight[] = [
  {
    title: 'The Last Dive',
    tag: 'Opening Night',
    director: 'Cody Sheehy',
    country: 'USA',
    year: '2025',
    runtime: '88 min',
    category: 'Documentary Feature',
    premiere: 'Oregon Premiere',
    tagline: 'How far would you go for a friend?',
    synopsis:
      "Cody Sheehy met Terry eight years ago when their sailboats happened to anchor in the same remote Mexican bay. They spent a week exploring the underwater world together — and one night Terry showed Cody footage that changed everything: a man riding giant manta rays. The Last Dive is a portrait of an unlikely friendship, a disappearing ocean, and what it costs to bear witness.",
    meta: {
      Shot: 'Pacific & Sea of Cortez',
      Format: 'Digital',
      Language: 'English',
    },
    posterFile: 'the-last-dive-poster.png',
    directorImage: 'the-last-dive-director.png',
    directorNote:
      'The ocean is my home and Terry is my friend. I met him eight years ago when my wife and I anchored our sailboat next to Terry\u2019s in a remote Mexican bay. For years, I didn\u2019t know what to make of his tall tales about riding giant Mantas. One night he showed me his footage \u2014 and I realized he had the ability to inspire a whole new generation in the way Jacques Cousteau did decades before.',
    directorBio:
      'Cody Sheehy is an award-winning filmmaker whose films intimately tell the stories of characters challenged by our changing world. He has lived on a sailboat for decades and is the founder of Rhumbline Media.',
  },
  {
    title: 'Centerpiece',
    tag: 'Centerpiece',
    director: '—',
    country: '—',
    year: '—',
    runtime: '—',
    category: 'Soon to be Revealed',
    premiere: 'Stay Tuned',
    synopsis:
      'Centerpiece selection announced ahead of the full programme.',
    meta: { Shot: '—', Format: '—', Language: '—' },
    comingSoon: true,
  },
  {
    title: 'Closing Night',
    tag: 'Closing Night',
    director: '—',
    country: '—',
    year: '—',
    runtime: '—',
    category: 'Soon to be Revealed',
    premiere: 'Stay Tuned',
    synopsis:
      'Closing Night film announced ahead of the full programme.',
    meta: { Shot: '—', Format: '—', Language: '—' },
    comingSoon: true,
  },
]
