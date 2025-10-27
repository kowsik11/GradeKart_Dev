import styles from './Loader.module.css'

export function Loader() {
  return <span className={styles.spinner} aria-hidden="true" />
}
