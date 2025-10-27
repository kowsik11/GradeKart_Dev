import { useMemo, useState } from 'react'
import { RefreshCcw, Search } from 'lucide-react'
import {
  academicYearOptions,
  termOptions,
  courseCatalogue,
  type CourseRecord,
} from '@/routes/student/courses/data'

export function CoursesPage() {
  const [year, setYear] = useState(academicYearOptions[0])
  const [term, setTerm] = useState(termOptions[0])
  const [hasSearched, setHasSearched] = useState(false)

  const totalCredits = useMemo(() => courseCatalogue.reduce((acc, record) => acc + record.credits, 0), [])
  const coreCount = useMemo(() => courseCatalogue.filter((record) => record.type === 'Core').length, [])
  const electiveCount = useMemo(() => courseCatalogue.filter((record) => record.type === 'Elective').length, [])

  const filteredCourses = useMemo(() => {
    if (!hasSearched) {
      return []
    }
    return courseCatalogue
  }, [hasSearched])

  const handleSearch = () => setHasSearched(true)
  const handleReset = () => {
    setYear(academicYearOptions[0])
    setTerm(termOptions[0])
    setHasSearched(false)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Academic planner
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Courses</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Explore the course load for your selected term, including faculty mentors, credits, and
            class timing information shared by the registrar.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-900">{year}</span> • {term}
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Filters</h2>
        <p className="mt-1 text-xs text-slate-500">
          Set the academic year and semester. Click Search to load the course roster.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            label="Academic year"
            value={year}
            onChange={setYear}
            options={academicYearOptions}
          />
          <FilterSelect label="Semester" value={term} onChange={setTerm} options={termOptions} />
          <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-2">
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

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Total credits"
          value={totalCredits.toString()}
          helper="Registered this term"
          tone="bg-indigo-500"
        />
        <SummaryCard
          label="Core courses"
          value={coreCount.toString()}
          helper="Mandatory modules"
          tone="bg-emerald-500"
        />
        <SummaryCard
          label="Electives"
          value={electiveCount.toString()}
          helper="Choice-based credits"
          tone="bg-amber-500"
        />
        <SummaryCard
          label="Labs & studios"
          value={courseCatalogue.filter((record) => record.type === 'Lab').length.toString()}
          helper="Hands-on sessions"
          tone="bg-slate-900"
        />
      </section>

  {hasSearched ? (
        <CoursesTable records={filteredCourses} />
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
          <p className="text-sm font-semibold text-slate-600">
            Choose your academic year and semester, then click Search to view course allocations.
          </p>
        </div>
      )}
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
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

function SummaryCard({
  label,
  value,
  helper,
  tone,
}: {
  label: string
  value: string
  helper: string
  tone: string
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`absolute inset-x-4 top-4 h-24 rounded-3xl opacity-10 ${tone}`} />
      <div className="relative space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500">{helper}</p>
      </div>
    </article>
  )
}

function CoursesTable({ records }: { records: CourseRecord[] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Course roster</h2>
          <p className="text-sm text-slate-500">Faculty mentors, credits, and scheduled slots.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          {records.length} courses
        </span>
      </header>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Course</th>
              <th className="px-6 py-4 font-semibold">Faculty</th>
              <th className="px-6 py-4 font-semibold text-center">Credits</th>
              <th className="px-6 py-4 font-semibold text-center">Type</th>
              <th className="px-6 py-4 font-semibold">Schedule</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {records.map((course) => (
              <tr key={course.code} className="hover:bg-slate-50/70">
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">{course.code}</p>
                    <p className="text-sm text-slate-500">{course.title}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{course.faculty}</td>
                <td className="px-6 py-4 text-center">{course.credits}</td>
                <td className="px-6 py-4 text-center">{course.type}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{course.schedule}</td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={course.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function StatusBadge({ status }: { status: CourseRecord['status'] }) {
  const palette: Record<CourseRecord['status'], string> = {
    Ongoing: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    Completed: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    Planned: 'bg-amber-50 text-amber-600 border border-amber-100',
  }
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${palette[status]}`}>
      {status}
    </span>
  )
}
