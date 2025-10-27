import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from 'react'
import { cn } from '@/lib/utils'
import styles from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  helperText?: ReactNode
  error?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, helperText, error, className, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <div className={styles.inputWrapper}>
        {label ? (
          <div className={styles.labelRow}>
            <label htmlFor={inputId}>{label}</label>
            {helperText && !error ? (
              <span className={styles.helper}>{helperText}</span>
            ) : null}
            {error ? (
              <span className={cn(styles.helper, styles.error)}>{error}</span>
            ) : null}
          </div>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            styles.input,
            error ? styles.inputError : undefined,
            className,
          )}
          {...props}
        />
        {!label && helperText && !error ? (
          <span className={styles.helper}>{helperText}</span>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
