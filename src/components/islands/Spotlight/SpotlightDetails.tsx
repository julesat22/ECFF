import type { Spotlight } from '@/lib/types'
import styles from './Spotlight.module.css'

type Props = {
  spotlight: Spotlight
  onOpenFilm: () => void
}

export function SpotlightDetails({ spotlight, onOpenFilm }: Props) {
  if (spotlight.comingSoon) return <ComingSoonPanel spotlight={spotlight} />

  return (
    <div className={styles.copy}>
      <p className={styles.eye}>
        {spotlight.tag} · {spotlight.category}
      </p>
      <h3 className={styles.title}>{spotlight.title}</h3>
      <p className={styles.dek}>{spotlight.synopsis}</p>

      {spotlight.directorNote && (
        <DirectorNote
          note={spotlight.directorNote}
          name={spotlight.director}
          bio={spotlight.directorBio}
          image={spotlight.directorImage}
        />
      )}

      <dl className={styles.meta}>
        <Row k="Director" v={spotlight.director} />
        <Row k="Year · Country" v={`${spotlight.year} · ${spotlight.country}`} />
        <Row k="Runtime" v={spotlight.runtime} />
        <Row k="Format" v={spotlight.meta.Format} />
        <Row k="Language" v={spotlight.meta.Language} />
        <Row k="Shot in" v={spotlight.meta.Shot} />
      </dl>

      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.primary}`} onClick={onOpenFilm}>
          <span>View Film</span>
          <span className={styles.arrow} aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}

function ComingSoonPanel({ spotlight }: { spotlight: Spotlight }) {
  // Visually quiet placeholder. The slot name doubles as the heading
  // (preserves h3 semantics for screen readers + heading hierarchy)
  // styled as a small mono kicker rather than a hype-y display headline.
  return (
    <div className={`${styles.copy} ${styles.copyPlaceholder}`}>
      <h3 className={styles.placeholderEye}>{spotlight.tag}</h3>
      <p className={styles.placeholderBody}>{spotlight.synopsis}</p>
    </div>
  )
}

function DirectorNote({
  note,
  name,
  bio,
  image,
}: {
  note: string
  name: string
  bio?: string
  image?: string
}) {
  return (
    <div className={styles.directorNote}>
      <div className={styles.directorHead}>
        {image && (
          <img
            className={styles.directorAvatar}
            src={`/assets/spotlights/${image}`}
            alt=""
            loading="lazy"
            decoding="async"
          />
        )}
        <div>
          <p className={styles.directorKicker}>Director's Note</p>
          <p className={styles.directorName}>{name}</p>
        </div>
      </div>
      <blockquote className={styles.directorQuote}>{note}</blockquote>
      {bio && <p className={styles.directorBio}>{bio}</p>}
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className={styles.row}>
      <dt className={styles.rowK}>{k}</dt>
      <dd className={styles.rowV}>{v}</dd>
    </div>
  )
}
