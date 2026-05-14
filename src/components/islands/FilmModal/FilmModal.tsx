import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Film } from '@/lib/types'
import { FilmModalBody } from './FilmModalBody'
import styles from './FilmModal.module.css'

type Props = {
  film: Film | null
  onClose: () => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'

export function FilmModal({ film, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Element | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (!film) return
    triggerRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    const firstFocus = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)
    firstFocus?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') trapTab(e, dialogRef.current)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      ;(triggerRef.current as HTMLElement | null)?.focus?.()
    }
  }, [film, onClose])

  if (!film) return null

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close film details"
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
        <FilmModalBody film={film} titleId={titleId} />
      </div>
    </div>,
    document.body,
  )
}

function trapTab(e: KeyboardEvent, container: HTMLElement | null) {
  if (!container) return
  const nodes = container.querySelectorAll<HTMLElement>(FOCUSABLE)
  if (nodes.length === 0) return
  const first = nodes[0]!
  const last = nodes[nodes.length - 1]!
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}
