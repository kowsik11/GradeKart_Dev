import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

export interface SchoolSummary {
  id: string
  schoolCode: string
  name: string
  campusName?: string
  logoUrl?: string
  photoUrl?: string
}

interface SchoolContextValue {
  selectedSchool: SchoolSummary | null
  selectSchool: (school: SchoolSummary | null) => void
}

const SchoolContext = createContext<SchoolContextValue | undefined>(undefined)

export function SchoolProvider({ children }: PropsWithChildren) {
  const [selectedSchool, setSelectedSchool] = useState<SchoolSummary | null>(
    null,
  )

  const selectSchool = useCallback((school: SchoolSummary | null) => {
    setSelectedSchool(school)
  }, [])

  const value = useMemo(
    () => ({
      selectedSchool,
      selectSchool,
    }),
    [selectedSchool, selectSchool],
  )

  return (
    <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>
  )
}

export function useSchool() {
  const context = useContext(SchoolContext)
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider')
  }
  return context
}
