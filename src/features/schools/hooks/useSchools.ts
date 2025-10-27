import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchSchools, type SchoolRecord } from '@/api/airtableClient'
import { fallbackSchools } from '@/features/schools/data/fallbackSchools'

interface UseSchoolsResult {
  schools: SchoolRecord[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useSchools(): UseSchoolsResult {
  const [schools, setSchools] = useState<SchoolRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const results = await fetchSchools()
      setSchools(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setSchools(fallbackSchools)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return useMemo(
    () => ({
      schools,
      isLoading,
      error,
      refetch: load,
    }),
    [error, isLoading, load, schools],
  )
}
