import { useMemo, useState } from 'react'
import { RefreshCcw, Search } from 'lucide-react'
import {
  academicYearOptions,
  programTracks,
  semesterProgress,
  cumulativeCgpa,
  degreeCreditsRequired,
  type SemesterRecord,
} from '@/routes/student/cgpa/data'

export function CgpaPage() {
  const [year, setYear] = useState(academicYearOptions[0])
  const [track, setTrack] = useState(programTracks[0])
  const [hasSearched, setHasSearched] = useState(false)

  const creditsEarned = useMemo(
    () => semesterProgress.reduce((acc, record) => acc + record.creditsEarned, 0),
    []
  )
  const latestSemester = semesterProgress[semesterProgress.length - 1]
  const creditsRemaining = Math.max(degreeCreditsRequired - creditsEarned, 0)

  const handleSearch = () => setHasSearched(true)
  const handleReset = () => {
    setYear(academicYearOptions[0])
    setTrack(programTracks[0])
    setHasSearched(false)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Academic progression
          </p>
          <h1 className="text-3xl font-bold text-slate-900">My CGPA</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Review your semester-wise GPA trend and track cumulative credits completed towards the
            graduation requirement.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-900">{year}</span> &mdash; {track}
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Filters</h2>
        <p className="mt-1 text-xs text-slate-500">
          Choose academic year and programme track. Click Search to load the transcript snapshot.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect label="Academic year" value={year} onChange={setYear} options={academicYearOptions} />
          <FilterSelect label="Programme" value={track} onChange={setTrack} options={programTracks} />
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
          label="Cumulative CGPA"
          value={cumulativeCgpa.toFixed(2)}
          helper="Across completed semesters"
          tone="bg-indigo-500"
        />
        <SummaryCard
          label="Credits earned"
          value={`${creditsEarned} / ${degreeCreditsRequired}`}
          helper="Towards graduation"
          tone="bg-emerald-500"
        />
        <SummaryCard
          label="Credits remaining"
          value={creditsRemaining.toString()}
          helper="Pending to complete"
          tone="bg-amber-500"
        />
        <SummaryCard
          label="Latest SGPA"
          value={latestSemester ? latestSemester.sgpa.toFixed(2) : '—'}
          helper={latestSemester ? latestSemester.term : '—'}
          tone="bg-slate-900"
        />
      </section>

      {hasSearched ? (
        <SemesterTable records={semesterProgress} />
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
          <p className="text-sm font-semibold text-slate-600">
            Select your academic year and programme, then click Search to view your CGPA summary.
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

function SemesterTable({ records }: { records: SemesterRecord[] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Semester progression</h2>
          <p className="text-sm text-slate-500">SGPA, credits, and highlights recorded each term.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          {records.length} semesters
        </span>
      </header>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Term</th>
              <th className="px-6 py-4 font-semibold text-center">SGPA</th>
              <th className="px-6 py-4 font-semibold text-center">Credits earned</th>
              <th className="px-6 py-4 font-semibold text-center">Credits attempted</th>
              <th className="px-6 py-4 font-semibold">Highlights</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {records.map((record) => (
              <tr key={record.term} className="hover:bg-slate-50/70">
                <td className="px-6 py-4 font-semibold text-slate-900">{record.term}</td>
                <td className="px-6 py-4 text-center text-lg font-bold text-slate-900">
                  {record.sgpa.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">{record.creditsEarned}</td>
                <td className="px-6 py-4 text-center">{record.creditsAttempted}</td>
                <td className="px-6 py-4 text-slate-500">{record.highlights}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
