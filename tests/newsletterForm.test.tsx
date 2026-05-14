import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { axe } from 'jest-axe'
import { NewsletterForm } from '@/components/islands/NewsletterForm/NewsletterForm'

describe('NewsletterForm', () => {
  afterEach(() => cleanup())

  it('renders an email input with an accessible name', () => {
    render(<NewsletterForm />)
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveAttribute(
      'type',
      'email',
    )
  })

  it('submit flips button text from Subscribe → to Sent ✓', () => {
    render(<NewsletterForm />)
    const input = screen.getByRole('textbox', { name: /email/i })
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.submit(screen.getByRole('form'))
    expect(
      screen.getByRole('button', { name: /sent/i }),
    ).toBeInTheDocument()
  })

  it('editing the email after submit resets the button to Subscribe', () => {
    render(<NewsletterForm />)
    const input = screen.getByRole('textbox', { name: /email/i })
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.submit(screen.getByRole('form'))
    expect(screen.getByRole('button', { name: /sent/i })).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'new@example.com' } })
    expect(
      screen.getByRole('button', { name: /subscribe/i }),
    ).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<NewsletterForm />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
