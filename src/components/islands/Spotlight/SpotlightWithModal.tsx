import { useState } from 'react'
import type { Film, Spotlight as S } from '@/lib/types'
import { Spotlight } from './Spotlight'
import { FilmModal } from '@/components/islands/FilmModal/FilmModal'
import { findFilmByTitle } from '@/content/films'

export function SpotlightWithModal() {
  const [film, setFilm] = useState<Film | null>(null)

  const open = (s: S) => {
    const match = findFilmByTitle(s.title)
    if (match) setFilm(match)
  }

  return (
    <>
      <Spotlight onOpenFilm={open} />
      <FilmModal film={film} onClose={() => setFilm(null)} />
    </>
  )
}
