import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from '@/features/landing'
import { StudentDashboardPage } from '@/routes/student/StudentDashboardPage'
import { TeacherDashboardPage } from '@/routes/teacher/TeacherDashboardPage'
import { AccountsDashboardPage } from '@/routes/accounts/AccountsDashboardPage'
import { HeadDashboardPage } from '@/routes/head/HeadDashboardPage'
import { ParentDashboardPage } from '@/routes/parent/ParentDashboardPage'
import { OwnerDashboardPage } from '@/routes/owner/OwnerDashboardPage'
import { PartnershipDeckPage } from '@/routes/shared/PartnershipDeckPage'
import type { AuthRole } from '@/features/auth'

interface AppRouterProps {
  onStudentSignIn: () => void
  onStudentSignUp: () => void
  onTeacherSignIn: () => void
  onTeacherSignUp: () => void
  onParentSignIn: () => void
  onParentSignUp: () => void
  onAccountsSignIn?: () => void
  onHeadSignIn?: () => void
}

export function AppRouter({
  onStudentSignIn,
  onStudentSignUp,
  onTeacherSignIn,
  onTeacherSignUp,
  onParentSignIn,
  onParentSignUp,
  onAccountsSignIn,
  onHeadSignIn,
}: AppRouterProps) {
  const handleSignIn = (role: AuthRole) => {
    switch (role) {
      case 'student':
        onStudentSignIn()
        break
      case 'teacher':
        onTeacherSignIn()
        break
      case 'parent':
        onParentSignIn()
        break
      case 'accounts':
        onAccountsSignIn?.()
        break
      case 'head':
        onHeadSignIn?.()
        break
      default:
        onTeacherSignIn()
    }
  }

  const handleSignUp = (role: AuthRole) => {
    switch (role) {
      case 'student':
        onStudentSignUp()
        break
      case 'teacher':
        onTeacherSignUp()
        break
      case 'parent':
        onParentSignUp()
        break
      default:
        onTeacherSignUp()
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onSignIn={(role: AuthRole) => handleSignIn(role)}
            onSignUp={(role: AuthRole) => handleSignUp(role)}
          />
        }
      />
      <Route path="/student/*" element={<StudentDashboardPage />} />
      <Route path="/teacher/*" element={<TeacherDashboardPage />} />
      <Route path="/parent/*" element={<ParentDashboardPage />} />
      <Route path="/accounts/*" element={<AccountsDashboardPage />} />
      <Route path="/head/*" element={<HeadDashboardPage />} />
      <Route path="/owner/*" element={<OwnerDashboardPage />} />
      <Route path="/partner" element={<PartnershipDeckPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
