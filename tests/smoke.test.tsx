import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'

describe('test harness', () => {
  it('renders a React node and asserts content', () => {
    render(
      <main>
        <h1>hello</h1>
      </main>,
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('hello')
  })

  it('runs axe with no violations on an accessible tree', async () => {
    const { container } = render(
      <main>
        <h1>hello</h1>
      </main>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
