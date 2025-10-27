import { cn } from '@/lib/utils'
import styles from './ToggleSwitch.module.css'

interface ToggleOption<TValue extends string> {
  label: string
  value: TValue
}

interface ToggleSwitchProps<TValue extends string> {
  options: ReadonlyArray<ToggleOption<TValue>>
  value: TValue
  onChange: (value: TValue) => void
  'aria-label'?: string
}

export function ToggleSwitch<TValue extends string>({
  options,
  value,
  onChange,
  'aria-label': ariaLabel,
}: ToggleSwitchProps<TValue>) {
  return (
    <div className={styles.toggle} role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(
            styles.option,
            option.value === value && styles.selected,
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
