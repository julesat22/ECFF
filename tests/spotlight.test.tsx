import { describe, it, expect, afterEach, vi } from 'vitest'
import { act, render, screen, cleanup } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Spotlight } from '@/components/islands/Spotlight/Spotlight'

describe('Spotlight carousel', () => {
  afterEach(() => cleanup())

  it('defaults to The Last Dive (first slide)', () => {
    render(<Spotlight onOpenFilm={() => {}} />)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      /The Last Dive/i,
    )
  })

  it('renders three dot navigators and no auto-advance', () => {
    vi.useFakeTimers()
    render(<Spotlight onOpenFilm={() => {}} />)
    const dots = screen.getAllByRole('button', { name: /spotlight \d/i })
    expect(dots).toHaveLength(3)
    act(() => vi.advanceTimersByTime(30000))
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      /The Last Dive/i,
    )
    vi.useRealTimers()
  })

  it('clicking dot 2 reveals the Centerpiece placeholder (slot name as heading)', () => {
    render(<Spotlight onOpenFilm={() => {}} />)
    const dots = screen.getAllByRole('button', { name: /spotlight \d/i })
    act(() => dots[1]!.click())
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      /Centerpiece/i,
    )
    // No teasing copy left behind.
    expect(screen.queryByText(/coming soon/i)).toBeNull()
    expect(screen.queryByText(/to be announced/i)).toBeNull()
    expect(screen.queryByText(/stay tuned/i)).toBeNull()
  })

  it('View Film button on The Last Dive calls onOpenFilm', () => {
    const onOpenFilm = vi.fn()
    render(<Spotlight onOpenFilm={onOpenFilm} />)
    act(() => screen.getByRole('button', { name: /view film/i }).click())
    expect(onOpenFilm).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'The Last Dive' }),
    )
  })
})

describe('Spotlight a11y', () => {
  afterEach(() => cleanup())
  it('has no axe violations', async () => {
    const { container } = render(<Spotlight onOpenFilm={() => {}} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
