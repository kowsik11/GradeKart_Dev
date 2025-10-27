import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import styles from './Modal.module.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={cn(styles.content, className)}>
        <div className={styles.body}>
          <div className={styles.header}>
            {(title || description) && (
              <div className={styles.titleWrapper}>
                {title ? <h2 className={styles.title}>{title}</h2> : null}
                {description ? (
                  <p className={styles.description}>{description}</p>
                ) : null}
              </div>
            )}
            <button
              type="button"
              aria-label="Close dialog"
              className={styles.closeButton}
              onClick={onClose}
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}
