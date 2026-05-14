import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { useNavFlip } from '@/lib/useNavFlip'
import { Nav } from '@/components/islands/Nav/Nav'

function setScrollY(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, writable: true, configurable: true })
  window.dispatchEvent(new Event('scroll'))
}

describe('useNavFlip', () => {
  beforeEach(() => {
    setScrollY(0)
  })

  it('starts in dark mode at the top of the page', () => {
    const { result } = renderHook(() => useNavFlip())
    expect(result.current).toBe(true)
  })

  it('flips to light mode when scrolled past the threshold', () => {
    const { result } = renderHook(() => useNavFlip())
    act(() => setScrollY(701))
    expect(result.current).toBe(false)
  })

  it('flips back to dark when scrolled above the threshold', () => {
    const { result } = renderHook(() => useNavFlip())
    act(() => setScrollY(800))
    expect(result.current).toBe(false)
    act(() => setScrollY(50))
    expect(result.current).toBe(true)
  })
})

describe('Nav component', () => {
  beforeEach(() => setScrollY(0))

  it('renders three navigation links to anchor sections', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#mission')
    expect(screen.getByRole('link', { name: /venues/i })).toHaveAttribute('href', '#venues')
    const sponsorLinks = screen.getAllByRole('link', { name: /^sponsors$/i })
    expect(sponsorLinks.some((a) => a.getAttribute('href') === '#sponsors')).toBe(true)
  })

  it('renders a primary Submit Film CTA', () => {
    render(<Nav />)
    const submit = screen.getAllByRole('link', { name: /submit film/i })
    expect(submit.length).toBeGreaterThanOrEqual(1)
    expect(submit[0]).toHaveAttribute('href', '#submit')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Nav />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
