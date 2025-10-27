import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import styles from './Alert.module.css'

type AlertVariant = 'info' | 'success' | 'error'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
}

export function Alert({ variant = 'info', className, ...props }: AlertProps) {
  return (
    <div className={cn(styles.alert, styles[variant], className)} {...props} />
  )
}
