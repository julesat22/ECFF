import type { Spotlight } from '@/lib/types'
import styles from './Spotlight.module.css'

type Props = {
  spotlight: Spotlight
}

// Two states: a "coming soon" placeholder (dark card with a quiet ring glyph
// and the slot's yellow tag), or a populated poster with the film's image.
// The invariant is: every populated spotlight has a `posterFile`. If that
// ever isn't true, the broken-image fallback is a non-fatal rendering.
export function SpotlightPoster({ spotlight }: Props) {
  if (spotlight.comingSoon) {
    return (
      <div className={`${styles.poster} ${styles.posterPlaceholder}`} aria-hidden="true">
        <div className={styles.posterFrame} />
        <div className={styles.posterCredit}>ECFF · 2026</div>
        <div className={styles.posterTag}>{spotlight.tag}</div>
        <div className={styles.posterGlyph} />
      </div>
    )
  }

  return (
    <div className={styles.poster} aria-hidden="true">
      <img
        className={styles.posterImage}
        src={`/assets/spotlights/${spotlight.posterFile}`}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className={styles.posterCredit}>ECFF · 2026</div>
      <div className={styles.posterTag}>{spotlight.tag}</div>
    </div>
  )
}
