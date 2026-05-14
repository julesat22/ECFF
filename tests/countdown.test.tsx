import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { act, render, screen, cleanup } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Countdown } from '@/components/islands/Countdown/Countdown'

const TARGET = '2026-06-11T09:00:00-07:00'

describe('Countdown with fake timers', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('renders zero-padded days/hours/min/sec relative to the target', () => {
    vi.setSystemTime(new Date('2026-06-01T03:29:45-07:00'))
    render(<Countdown targetIso={TARGET} />)
    expect(screen.getByTestId('cd-days')).toHaveTextContent('10')
    expect(screen.getByTestId('cd-hours')).toHaveTextContent('05')
    expect(screen.getByTestId('cd-mins')).toHaveTextContent('30')
    expect(screen.getByTestId('cd-secs')).toHaveTextContent('15')
  })

  it('decrements seconds on tick', () => {
    vi.setSystemTime(new Date('2026-06-11T08:59:55-07:00'))
    render(<Countdown targetIso={TARGET} />)
    expect(screen.getByTestId('cd-secs')).toHaveTextContent('05')
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByTestId('cd-secs')).toHaveTextContent('04')
    act(() => vi.advanceTimersByTime(2000))
    expect(screen.getByTestId('cd-secs')).toHaveTextContent('02')
  })

  it('clamps to zero once the target has passed', () => {
    vi.setSystemTime(new Date('2026-06-12T00:00:00-07:00'))
    render(<Countdown targetIso={TARGET} />)
    expect(screen.getByTestId('cd-days')).toHaveTextContent('00')
    expect(screen.getByTestId('cd-hours')).toHaveTextContent('00')
    expect(screen.getByTestId('cd-mins')).toHaveTextContent('00')
    expect(screen.getByTestId('cd-secs')).toHaveTextContent('00')
  })
})

describe('Countdown a11y', () => {
  afterEach(() => cleanup())

  it('has no axe violations', async () => {
    const { container } = render(<Countdown targetIso={TARGET} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
