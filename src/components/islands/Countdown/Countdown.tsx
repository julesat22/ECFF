import { useEffect, useState } from 'react'
import styles from './Countdown.module.css'

type Props = { targetIso: string }

function diff(target: number, now: number) {
  const ms = Math.max(0, target - now)
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms % 86400000) / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
  }
}

export function Countdown({ targetIso }: Props) {
  const target = new Date(targetIso).getTime()
  const [{ d, h, m, s }, setT] = useState(() => diff(target, Date.now()))

  useEffect(() => {
    const tick = () => setT(diff(target, Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <div className={styles.units} role="timer" aria-label="Time until opening night">
      <Block value={d} label="Days" accent testId="cd-days" />
      <Block value={h} label="Hours" testId="cd-hours" />
      <Block value={m} label="Min" testId="cd-mins" />
      <Block value={s} label="Sec" testId="cd-secs" />
    </div>
  )
}

type BlockProps = {
  value: number
  label: string
  accent?: boolean
  testId?: string
}

function Block({ value, label, accent = false, testId }: BlockProps) {
  return (
    <div className={styles.block}>
      <span
        data-testid={testId}
        className={`${styles.number} ${accent ? styles.accent : ''}`}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className={styles.unit}>{label}</span>
    </div>
  )
}
