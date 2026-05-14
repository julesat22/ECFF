import { useState } from 'react'
import styles from './NewsletterForm.module.css'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (sent) setSent(false)
  }

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      aria-label="Newsletter signup"
    >
      <input
        type="email"
        className={styles.input}
        placeholder="you@domain.com"
        value={email}
        onChange={onChange}
        aria-label="Email address"
        autoComplete="email"
        required
      />
      <button type="submit" className={styles.button}>
        {sent ? 'Sent ✓' : 'Subscribe →'}
      </button>
      <span className={styles.liveRegion} aria-live="polite">
        {sent ? 'Thanks — you are subscribed.' : ''}
      </span>
    </form>
  )
}
