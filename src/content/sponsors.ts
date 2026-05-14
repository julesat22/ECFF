import type { Sponsor } from '@/lib/types'

// Order: 6 logos in two rows of 3 on desktop, 2×3 on mobile.
// Local Joseph/Lostine spots first, then Enterprise + Wallowa Lake.
export const SPONSORS: Sponsor[] = [
  { slug: 'jennings', name: 'The Jennings Hotel', filename: 'jennings-hotel.png' },
  { slug: 'kokanee', name: 'Kokanee Inn', filename: 'kokanee-inn.png' },
  { slug: 'mcrow', name: 'M. Crow & Co.', filename: 'm-crow.webp' },
  { slug: 'ok', name: 'OK Theatre', filename: 'ok-theatre.png' },
  { slug: 'wallowa', name: 'Wallowa Lake Lodge & Cabins', filename: 'wallowa-lake-lodge.png' },
  { slug: 'opensoul', name: 'Open Soul', filename: 'open-soul.png' },
]
