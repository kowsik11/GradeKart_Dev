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
import { generateRegisterNumber } from '@/features/auth/utils'
import styles from './AuthModal.module.css'

const roleOptions = [
  { label: 'Student', value: 'student' as const },
  { label: 'Teacher', value: 'teacher' as const },
  { label: 'Parent', value: 'parent' as const },
  { label: 'Accounts', value: 'accounts' as const },
  { label: 'School Head', value: 'head' as const },
]

const stageOptions = [
  { label: 'Log In', value: 'login' as const },
  { label: 'Sign Up', value: 'signup' as const },
]

const identifierCopy: Record<AuthRole, string> = {
  student: 'Roll Number',
  parent: 'Student Register Number',
  teacher: 'Email Address',
  accounts: 'Accounts ID',
  head: 'Head Access ID',
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
  const [generatedId, setGeneratedId] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setMode(initialMode)
      setFormState({ identifier: '', password: '', fullName: '' })
      setGeneratedId(null)
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

    if (mode.role === 'teacher') {
      return mode.stage === 'login'
        ? 'View attendance logs, assessments, and mentoring notes.'
        : 'Create your faculty account with your institutional email.'
    }

    if (mode.role === 'parent') {
      return mode.stage === 'login'
        ? 'Stay in sync with your child’s attendance, marks, and fee reminders.'
        : 'Register as a parent/guardian using your child’s register number.'
    }

    if (mode.role === 'accounts') {
      return mode.stage === 'login'
        ? 'Manage fee collections, dues, and finance reports.'
        : 'Accounts access is provisioned by the leadership team.'
    }

    return mode.stage === 'login'
      ? 'Oversee staff, classes, finances, and discipline across the campus.'
      : 'Leadership access is issued by the GradeKart operations team.'
  }, [mode.role, mode.stage])

  const handleStageChange = (stage: AuthStage) => {
    setMode((prev) => ({ ...prev, stage }))
    setGeneratedId(null)
  }

  const handleRoleChange = (role: AuthRole) => {
    setMode((prev) => ({ ...prev, role }))
    setGeneratedId(null)
  }

  const handleGenerateIdentifier = () => {
    const generated = generateRegisterNumber(school)
    setFormState((prev) => ({
      ...prev,
      identifier: generated,
    }))
    setGeneratedId(generated)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const identifierValue =
      mode.role === 'student' || mode.role === 'parent'
        ? formState.identifier.trim().toUpperCase()
        : formState.identifier.trim()
    const payload: AuthCredentials = {
      identifier: identifierValue,
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
          <h3>
            {mode.role === 'student'
              ? 'Student Access'
              : mode.role === 'teacher'
                ? 'Faculty Access'
                : mode.role === 'accounts'
                  ? 'Accounts Desk Access'
                  : 'Leadership Access'}
          </h3>
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
                  ? 'e.g. GK2025-001'
                  : mode.role === 'parent'
                    ? 'e.g. GK2025-001'
                    : mode.role === 'accounts'
                    ? 'e.g. account'
                    : mode.role === 'head'
                      ? 'e.g. chief'
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
            {mode.stage === 'signup' && (mode.role === 'student' || mode.role === 'parent') ? (
              <div className={styles.inlineHelper}>
                <button
                  type="button"
                  className={styles.generateButton}
                  onClick={handleGenerateIdentifier}
                >
                  Generate register number
                </button>
                <p className={styles.helper}>
                  {generatedId
                    ? `Generated ID ${generatedId}. Share this with the guardian for login.`
                    : 'Don’t have a register number yet? Generate one instantly.'}
                </p>
              </div>
            ) : null}

            {mode.stage === 'signup' ? (
              <Input
                label="Full Name"
                placeholder={
                  mode.role === 'student'
                    ? 'Student full name (optional)'
                    : mode.role === 'teacher'
                      ? 'Faculty full name (optional)'
                      : mode.role === 'parent'
                        ? 'Parent / Guardian name (optional)'
                      : 'Full name (optional)'
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
                : mode.role === 'student'
                  ? 'New register numbers are written to Airtable automatically during signup.'
                  : mode.role === 'teacher'
                    ? 'Faculty accounts sync directly with the Teachers table in Airtable.'
                    : mode.role === 'parent'
                      ? 'Each parent account links to exactly one student register number.'
                      : mode.role === 'accounts'
                        ? 'Accounts access is provisioned by the leadership team.'
                        : 'Leadership access is issued by the GradeKart operations team.'}
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
