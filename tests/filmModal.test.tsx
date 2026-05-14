import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { axe } from 'jest-axe'
import { FilmModal } from '@/components/islands/FilmModal/FilmModal'
import { FILMS } from '@/content/films'

const FILM = FILMS[0]!

describe('FilmModal', () => {
  afterEach(() => {
    cleanup()
    document.body.style.overflow = ''
  })

  it('renders nothing when film is null', () => {
    render(<FilmModal film={null} onClose={() => {}} />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders a dialog with film title when open', () => {
    render(<FilmModal film={FILM} onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(
      screen.getByRole('heading', { level: 2, name: FILM.title }),
    ).toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', () => {
    let closed = false
    render(<FilmModal film={FILM} onClose={() => (closed = true)} />)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(closed).toBe(true)
  })

  it('calls onClose when the close button is clicked', () => {
    let closed = false
    render(<FilmModal film={FILM} onClose={() => (closed = true)} />)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(closed).toBe(true)
  })

  it('locks body scroll while open', () => {
    render(<FilmModal film={FILM} onClose={() => {}} />)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('renders a reserve button for each showtime', () => {
    render(<FilmModal film={FILM} onClose={() => {}} />)
    const showButtons = screen.getAllByRole('button', {
      name: /reserve \d+:\d{2} pm at/i,
    })
    expect(showButtons).toHaveLength(FILM.shows.length)
  })

  it('has no axe violations', async () => {
    const { container } = render(<FilmModal film={FILM} onClose={() => {}} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
