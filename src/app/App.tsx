import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AuthModal,
  useAuth,
  type AuthCredentials,
  type AuthMode,
  type AuthRole,
} from '@/features/auth'
import { useSchool } from '@/features/schools'
import { AppRouter } from './router/AppRouter'

export function App() {
  const { session, login, signup } = useAuth()
  const { selectedSchool } = useSchool()
  const navigate = useNavigate()
  const location = useLocation()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>({
    role: 'student',
    stage: 'login',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [feedbackMessage, setFeedbackMessage] = useState<{
    variant: 'info' | 'success'
    text: string
  } | null>(null)

  const openAuthModal = useCallback((mode: AuthMode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
    setErrorMessage(null)
    setFeedbackMessage(null)
  }, [])

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false)
  }, [])

  const navigateToRoleHome = useCallback(
    (role: AuthRole) => {
      if (role === 'student') {
        navigate('/student', { replace: true })
        return
      }
      if (role === 'parent') {
        navigate('/parent', { replace: true })
        return
      }
      if (role === 'accounts') {
        navigate('/accounts', { replace: true })
        return
      }
      if (role === 'head') {
        navigate('/head', { replace: true })
        return
      }
      navigate('/teacher', { replace: true })
    },
    [navigate],
  )

  const handleSignInClick = useCallback(
    (role: AuthRole) => openAuthModal({ role, stage: 'login' }),
    [openAuthModal],
  )

  const handleSignUpClick = useCallback(
    (role: AuthRole) => openAuthModal({ role, stage: 'signup' }),
    [openAuthModal],
  )

  const handleLogin = useCallback(
    async (role: AuthRole, credentials: AuthCredentials) => {
      setIsSubmitting(true)
      setErrorMessage(null)
      setFeedbackMessage(null)
      try {
        const nextSession = await login(role, credentials)
        closeAuthModal()
        navigateToRoleHome(nextSession.role)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : String(error))
      } finally {
        setIsSubmitting(false)
      }
    },
    [closeAuthModal, login, navigateToRoleHome],
  )

  const handleSignup = useCallback(
    async (role: AuthRole, credentials: AuthCredentials) => {
      setIsSubmitting(true)
      setErrorMessage(null)
      setFeedbackMessage(null)
      try {
        await signup(role, credentials)
        setFeedbackMessage({
          variant: 'success',
          text: 'Account created successfully. Please sign in to continue.',
        })
        setAuthMode({ role, stage: 'login' })
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : String(error))
      } finally {
        setIsSubmitting(false)
      }
    },
    [signup],
  )

  useEffect(() => {
    if (!session && location.pathname !== '/') {
      navigate('/', { replace: true })
    }
  }, [location.pathname, navigate, session])

  useEffect(() => {
    if (session && location.pathname === '/') {
      navigateToRoleHome(session.role)
    }
  }, [location.pathname, navigateToRoleHome, session])

  return (
    <div className="app-shell">
      <AppRouter
        onStudentSignIn={() => handleSignInClick('student')}
        onStudentSignUp={() => handleSignUpClick('student')}
        onTeacherSignIn={() => handleSignInClick('teacher')}
        onTeacherSignUp={() => handleSignUpClick('teacher')}
        onParentSignIn={() => handleSignInClick('parent')}
        onParentSignUp={() => handleSignUpClick('parent')}
        onAccountsSignIn={() => handleSignInClick('accounts')}
        onHeadSignIn={() => handleSignInClick('head')}
      />
      <AuthModal
        open={authModalOpen}
        initialMode={authMode}
        onClose={closeAuthModal}
        onLogin={handleLogin}
        onSignup={handleSignup}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        feedbackMessage={feedbackMessage}
        school={selectedSchool}
      />
    </div>
  )
}
