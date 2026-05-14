import type { Film, Showtime } from '@/lib/types'
import styles from './FilmModal.module.css'

type Props = {
  film: Film
  titleId: string
}

export function FilmModalBody({ film, titleId }: Props) {
  return (
    <div className={styles.body}>
      <p className={styles.kicker}>
        {film.section} · {film.premiere ?? 'Festival Premiere'}
      </p>
      <h2 id={titleId} className={styles.title}>{film.title}</h2>
      <p className={styles.dir}>Directed by {film.dir}</p>
      <p className={styles.syn}>{film.synopsis}</p>
      <dl className={styles.facts}>
        <Fact k="Country" v={film.country} />
        <Fact k="Year" v={String(film.year)} />
        <Fact k="Runtime" v={`${film.runtime} min`} />
        <Fact k="Category" v={film.cat} />
      </dl>
      <p className={styles.showsHeading}>Showtimes</p>
      <div className={styles.shows}>
        {film.shows.map((s, i) => (
          <ShowtimeRow key={i} show={s} />
        ))}
      </div>
      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.primary}`}>
          Reserve Tickets <span aria-hidden="true">→</span>
        </button>
        <button className={styles.btn}>Add to Calendar</button>
      </div>
    </div>
  )
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className={styles.factK}>{k}</dt>
      <dd className={styles.factV}>{v}</dd>
    </div>
  )
}

function ShowtimeRow({ show }: { show: Showtime }) {
  return (
    <button type="button" className={styles.showRow}>
      <span className={styles.showTime}>{show.time}</span>
      <span className={styles.showVenue}>
        {show.day} · {show.date} · {show.venue}
      </span>
      <span className={styles.showGo} aria-hidden="true">
        Reserve →
      </span>
      <span className="sr-only">Reserve {show.time} at {show.venue}</span>
    </button>
  )
}
