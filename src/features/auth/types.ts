export type AuthRole = 'student' | 'teacher'
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
