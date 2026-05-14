import { useState } from 'react'
import { SPOTLIGHTS } from '@/content/spotlights'
import type { Spotlight as S } from '@/lib/types'
import { SpotlightPoster } from './SpotlightPoster'
import { SpotlightDetails } from './SpotlightDetails'
import styles from './Spotlight.module.css'

type Props = {
  onOpenFilm: (spotlight: S) => void
}

export function Spotlight({ onOpenFilm }: Props) {
  const [idx, setIdx] = useState(0)
  const current = SPOTLIGHTS[idx]!

  return (
    <div className={styles.grid}>
      <div className={styles.posterWrap} key={`p-${idx}`}>
        <SpotlightPoster spotlight={current} />
      </div>
      <div className={styles.rightCol}>
        <div className={styles.detailsWrap} key={`d-${idx}`}>
          <SpotlightDetails spotlight={current} onOpenFilm={() => onOpenFilm(current)} />
        </div>
        <Dots total={SPOTLIGHTS.length} current={idx} onSelect={setIdx} />
      </div>
    </div>
  )
}

type DotsProps = {
  total: number
  current: number
  onSelect: (index: number) => void
}

function Dots({ total, current, onSelect }: DotsProps) {
  return (
    <div className={styles.dots} aria-label="Spotlight navigation">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Spotlight ${i + 1} of ${total}`}
          aria-current={i === current ? 'true' : undefined}
          className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  )
}
