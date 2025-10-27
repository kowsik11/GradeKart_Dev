import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  loginStudent,
  loginTeacher,
  signupStudent,
  signupTeacher,
  type StudentRecord,
  type TeacherRecord,
} from '@/api/airtableClient'
import { useSchool, type SchoolSummary } from '@/features/schools'
import type { AuthCredentials, AuthRole } from '../types'

type AuthSession =
  | { role: 'student'; profile: StudentRecord; school: SchoolSummary }
  | { role: 'teacher'; profile: TeacherRecord; school: SchoolSummary }

interface AuthContextValue {
  session: AuthSession | null
  login: (role: AuthRole, credentials: AuthCredentials) => Promise<AuthSession>
  signup: (
    role: AuthRole,
    credentials: AuthCredentials,
  ) => Promise<StudentRecord | TeacherRecord>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const { selectedSchool } = useSchool()

  const login = useCallback(
    async (role: AuthRole, credentials: AuthCredentials) => {
      if (!selectedSchool) {
        throw new Error('Select a campus before signing in.')
      }

      if (role === 'student') {
        const profile = await loginStudent(
          credentials.identifier,
          credentials.password,
          selectedSchool.schoolCode || selectedSchool.id,
        )
        const nextSession: AuthSession = {
          role,
          profile,
          school: selectedSchool,
        }
        setSession(nextSession)
        return nextSession
      }

      const profile = await loginTeacher(
        credentials.identifier,
        credentials.password,
        selectedSchool.schoolCode || selectedSchool.id,
      )
      const nextSession: AuthSession = {
        role,
        profile,
        school: selectedSchool,
      }
      setSession(nextSession)
      return nextSession
    },
    [selectedSchool],
  )

  const signup = useCallback(
    async (role: AuthRole, credentials: AuthCredentials) => {
      if (!selectedSchool) {
        throw new Error('Select a campus before signing up.')
      }

      if (role === 'student') {
        return signupStudent({
          rollNo: credentials.identifier,
          password: credentials.password,
          fullName: credentials.fullName,
          schoolCode: selectedSchool.schoolCode || selectedSchool.id,
        })
      }

      return signupTeacher({
        email: credentials.identifier,
        password: credentials.password,
        fullName: credentials.fullName,
        schoolCode: selectedSchool.schoolCode || selectedSchool.id,
      })
    },
    [selectedSchool],
  )

  const logout = useCallback(() => {
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({
      session,
      login,
      signup,
      logout,
    }),
    [login, logout, session, signup],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

