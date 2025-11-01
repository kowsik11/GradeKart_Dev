export type AuthRole = 'student' | 'teacher' | 'accounts' | 'head' | 'parent'
export type AuthStage = 'login' | 'signup'

export interface AuthMode {
  role: AuthRole
  stage: AuthStage
}

export interface AuthCredentials {
  identifier: string
  password: string
  fullName?: string
}
