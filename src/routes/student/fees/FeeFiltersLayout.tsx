import { useMemo, useState, type ReactNode } from 'react'
import { RefreshCcw, Search } from 'lucide-react'
import { billingCycles } from '@/routes/student/fees/data'

const academicYears = ['2025-26', '2024-25', '2023-24']
const classOptions = ['Class 10 - Section A', 'Class 10 - Section B', 'Class 11 - MPC', 'Class 11 - BiPC']

interface FeeFiltersLayoutProps {
  heading: string
  description: string
  badgeLabel?: string
  renderResults: (context: {
    year: string
    className: string
    cycle: string
  }) => ReactNode
}

export function FeeFiltersLayout({
  heading,
  description,
  badgeLabel,
  renderResults,
}: FeeFiltersLayoutProps) {
  const [year, setYear] = useState(academicYears[0])
  const [className, setClassName] = useState(classOptions[0])
  const [cycle, setCycle] = useState(billingCycles[0])
  const [hasSearched, setHasSearched] = useState(false)

  const badge = useMemo(() => {
    if (!badgeLabel) {
      return null
    }
    return (
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
        {badgeLabel}
      </span>
    )
  }, [badgeLabel])

  const handleSearch = () => {
    setHasSearched(true)
  }

  const handleReset = () => {
    setYear(academicYears[0])
    setClassName(classOptions[0])
    setCycle(billingCycles[0])
    setHasSearched(false)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Fee payments
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{heading}</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-900">{year}</span> &mdash; {className}
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Filters</h2>
        <p className="mt-1 text-xs text-slate-500">
          Select the cohort details and click search to load the latest fee statements.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FilterSelect
            label="Academic year"
            value={year}
            onChange={(value) => setYear(value)}
            options={academicYears}
          />
          <FilterSelect
            label="Class & section"
            value={className}
            onChange={(value) => setClassName(value)}
            options={classOptions}
          />
          <FilterSelect
            label="Billing cycle"
            value={cycle}
            onChange={(value) => setCycle(value)}
            options={billingCycles}
          />
          <div className="flex items-end gap-3">
            <button
              type="button"
              onClick={handleSearch}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <RefreshCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </section>

      {badge}

      {hasSearched ? (
        renderResults({ year, className, cycle })
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
          <p className="text-sm font-semibold text-slate-600">
            Choose the academic year, class, and billing cycle. Click Search to view fee statements.
          </p>
        </div>
      )}
    </div>
  )
}

interface FilterSelectProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-900 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
