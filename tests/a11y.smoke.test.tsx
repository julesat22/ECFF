import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Nav } from '@/components/islands/Nav/Nav'
import { Countdown } from '@/components/islands/Countdown/Countdown'
import { Spotlight } from '@/components/islands/Spotlight/Spotlight'
import { FilmModal } from '@/components/islands/FilmModal/FilmModal'
import { NewsletterForm } from '@/components/islands/NewsletterForm/NewsletterForm'
import { FILMS } from '@/content/films'

const TARGET = '2026-06-11T09:00:00-07:00'

describe('full-page a11y smoke', () => {
  afterEach(() => {
    cleanup()
    document.body.style.overflow = ''
  })

  it('mounts all interactive islands without axe violations', async () => {
    const { container } = render(
      <div>
        <Nav />
        <main>
          <section aria-label="Hero">
            <h1>Eagle Cap</h1>
            <Countdown targetIso={TARGET} />
          </section>
          <section aria-labelledby="spot-h2">
            <h2 id="spot-h2">Spotlight Films</h2>
            <Spotlight onOpenFilm={() => {}} />
          </section>
          <footer>
            <NewsletterForm />
          </footer>
        </main>
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('renders the FilmModal open with no axe violations', async () => {
    const film = FILMS[0]!
    const { container } = render(<FilmModal film={film} onClose={() => {}} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
