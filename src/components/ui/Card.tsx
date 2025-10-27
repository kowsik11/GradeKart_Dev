import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import styles from './Card.module.css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return <div className={cn(styles.card, className)} {...props} />
}
