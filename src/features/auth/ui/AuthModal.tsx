import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Input, Loader, Modal, ToggleSwitch } from '@/components/ui'
import { cn } from '@/lib/utils'
import {
  AuthCredentials,
  AuthMode,
  AuthRole,
  AuthStage,
} from '../types'
import type { SchoolSummary } from '@/features/schools'
import styles from './AuthModal.module.css'

const roleOptions = [
  { label: 'Student', value: 'student' as const },
  { label: 'Teacher', value: 'teacher' as const },
]

const stageOptions = [
  { label: 'Log In', value: 'login' as const },
  { label: 'Sign Up', value: 'signup' as const },
]

const identifierCopy: Record<AuthRole, string> = {
  student: 'Roll Number',
  teacher: 'Email Address',
}

export interface AuthModalProps {
  open: boolean
  initialMode: AuthMode
  onClose: () => void
  onLogin?: (role: AuthRole, credentials: AuthCredentials) => void
  onSignup?: (role: AuthRole, credentials: AuthCredentials) => void
  isSubmitting?: boolean
  errorMessage?: string | null
  feedbackMessage?: { variant: 'info' | 'success'; text: string } | null
  school?: SchoolSummary | null
}

export function AuthModal({
  open,
  initialMode,
  onClose,
  onLogin,
  onSignup,
  isSubmitting = false,
  errorMessage = null,
  feedbackMessage = null,
  school = null,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [formState, setFormState] = useState<AuthCredentials>({
    identifier: '',
    password: '',
    fullName: '',
  })

  useEffect(() => {
    if (open) {
      setMode(initialMode)
      setFormState({ identifier: '', password: '', fullName: '' })
    }
  }, [initialMode, open])

  const campusLabel = useMemo(() => {
    if (!school) return null
    if (school.campusName) {
      return `${school.name} • ${school.campusName}`
    }
    return school.name
  }, [school])

  const subtitle = useMemo(() => {
    if (mode.role === 'student') {
      return mode.stage === 'login'
        ? 'Access your attendance and marks dashboard.'
        : 'Create your student account using your roll number.'
    }
    return mode.stage === 'login'
      ? 'View attendance logs and performance reviews.'
      : 'Create your faculty account with your institutional email.'
  }, [mode.role, mode.stage])

  const handleStageChange = (stage: AuthStage) => {
    setMode((prev) => ({ ...prev, stage }))
  }

  const handleRoleChange = (role: AuthRole) => {
    setMode((prev) => ({ ...prev, role }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payload: AuthCredentials = {
      identifier: formState.identifier.trim(),
      password: formState.password.trim(),
      fullName: formState.fullName?.trim() || undefined,
    }

    if (mode.stage === 'login') {
      onLogin?.(mode.role, payload)
    } else {
      onSignup?.(mode.role, payload)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode.stage === 'login' ? 'Welcome back' : 'Create your account'}
      description={
        campusLabel ? `${subtitle} (${campusLabel})` : subtitle
      }
    >
      <div className={styles.content}>
        <div className={styles.modeControls}>
          <h3>{mode.role === 'student' ? 'Student Access' : 'Faculty Access'}</h3>
          <div className={styles.stageSwitch}>
            <ToggleSwitch
              aria-label="Select authentication stage"
              options={stageOptions}
              value={mode.stage}
              onChange={handleStageChange}
            />
            <ToggleSwitch
              aria-label="Select user type"
              options={roleOptions}
              value={mode.role}
              onChange={handleRoleChange}
            />
          </div>
        </div>

        {campusLabel ? (
          <div className={styles.schoolContext}>
            <span className={styles.schoolLabel}>Selected Campus</span>
            <strong className={styles.schoolName}>{campusLabel}</strong>
          </div>
        ) : null}

        {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}
        {feedbackMessage ? (
          <Alert variant={feedbackMessage.variant}>
            {feedbackMessage.text}
          </Alert>
        ) : null}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGrid}>
            <Input
              autoFocus
              label={identifierCopy[mode.role]}
              placeholder={
                mode.role === 'student'
                  ? 'e.g. R101'
                  : 'e.g. abc@school.com'
              }
              value={formState.identifier}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  identifier: event.target.value,
                }))
              }
              required
            />

            {mode.stage === 'signup' ? (
              <Input
                label="Full Name"
                placeholder={
                  mode.role === 'student'
                    ? 'Student full name (optional)'
                    : 'Faculty full name (optional)'
                }
                value={formState.fullName}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    fullName: event.target.value,
                  }))
                }
              />
            ) : null}

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              value={formState.password}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className={styles.submitRow}>
            <p className={styles.submitNote}>
              {mode.stage === 'login'
                ? 'Forgot credentials? Contact your administrator.'
                : 'Passwords sync directly to Airtable for this prototype.'}
            </p>
            <div className={cn(styles.actions)}>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader />{' '}
                    {mode.stage === 'login' ? 'Signing In...' : 'Creating...'}
                  </>
                ) : (
                  <>{mode.stage === 'login' ? 'Sign In' : 'Create Account'}</>
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  )
}
