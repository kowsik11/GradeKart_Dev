import { useAuth } from '@/features/auth'

export function useParentIdentity() {
  const { session } = useAuth()
  if (session?.role === 'parent') {
    return {
      parentName: session.profile.parentName ?? 'Guardian',
      parentEmail: session.profile.email ?? 'parent@gradekart.app',
      parentPhone: session.profile.phone ?? '+91 90000 00000',
      studentRollNo: session.profile.studentRollNo,
      studentName: 'Student',
    }
  }
  return {
    parentName: 'Guardian',
    parentEmail: 'parent@gradekart.app',
    parentPhone: '+91 90000 00000',
    studentRollNo: 'GK2025-001',
    studentName: 'Student',
  }
}

