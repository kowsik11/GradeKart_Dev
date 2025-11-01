import type { SchoolSummary } from '@/features/schools'

const DEFAULT_PREFIX = 'GK'

export function generateRegisterNumber(
  school?: SchoolSummary | null,
  seed: Date = new Date(),
) {
  const prefix = normalisePrefix(school?.schoolCode)
  const year = seed.getFullYear().toString().slice(-2)
  const month = `${seed.getMonth() + 1}`.padStart(2, '0')
  const day = `${seed.getDate()}`.padStart(2, '0')
  const random = `${Math.floor(Math.random() * 9000) + 1000}`
  return `${prefix}${year}${month}${day}-${random}`
}

function normalisePrefix(code?: string) {
  if (!code) {
    return DEFAULT_PREFIX
  }
  const cleaned = code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
  if (!cleaned) {
    return DEFAULT_PREFIX
  }
  return cleaned.slice(0, 6)
}

