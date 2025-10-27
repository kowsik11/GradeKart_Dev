import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from '@/features/landing'
import { StudentDashboardPage } from '@/routes/student/StudentDashboardPage'
import { TeacherDashboardPage } from '@/routes/teacher/TeacherDashboardPage'
import { HeadDashboardPage } from '@/routes/head/HeadDashboardPage'
import { OwnerDashboardPage } from '@/routes/owner/OwnerDashboardPage'
import { PartnershipDeckPage } from '@/routes/shared/PartnershipDeckPage'
import type { AuthRole } from '@/features/auth'

interface AppRouterProps {
  onStudentSignIn: () => void
  onStudentSignUp: () => void
  onTeacherSignIn: () => void
  onTeacherSignUp: () => void
}

export function AppRouter({
  onStudentSignIn,
  onStudentSignUp,
  onTeacherSignIn,
  onTeacherSignUp,
}: AppRouterProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onSignIn={(role: AuthRole) =>
              role === 'student' ? onStudentSignIn() : onTeacherSignIn()
            }
            onSignUp={(role: AuthRole) =>
              role === 'student' ? onStudentSignUp() : onTeacherSignUp()
            }
          />
        }
      />
      <Route path="/student/*" element={<StudentDashboardPage />} />
      <Route path="/teacher/*" element={<TeacherDashboardPage />} />
      <Route path="/head/*" element={<HeadDashboardPage />} />
      <Route path="/owner/*" element={<OwnerDashboardPage />} />
      <Route path="/partner" element={<PartnershipDeckPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
