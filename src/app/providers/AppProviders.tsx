import { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import { SchoolProvider } from '@/features/schools'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <SchoolProvider>
        <AuthProvider>{children}</AuthProvider>
      </SchoolProvider>
    </BrowserRouter>
  )
}
