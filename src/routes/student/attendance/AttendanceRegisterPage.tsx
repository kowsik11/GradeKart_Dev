import { useMemo, useState } from 'react'
import { Search, RefreshCcw, Download, FileEdit } from 'lucide-react'

const academicYears = ['2025-26', '2024-25', '2023-24']
const classOptions = ['Class 10 - Section A', 'Class 10 - Section B', 'Class 11 - MPC', 'Class 11 - BiPC']
const monthOptions = [
  'Full Semester',
  'June 2025',
  'July 2025',
  'August 2025',
  'September 2025',
]

const mockAttendance = [
  {
    subject: 'Mathematics',
    faculty: 'Prof. Rao',
    conducted: 48,
    attended: 44,
    excused: 2,
  },
  {
    subject: 'Physics',
    faculty: 'Ms. Anitha',
    conducted: 46,
    attended: 39,
    excused: 3,
  },
  {
    subject: 'Chemistry',
    faculty: 'Dr. Reddy',
    conducted: 44,
    attended: 40,
    excused: 1,
  },
  {
    subject: 'English',
    faculty: 'Mr. Varun',
    conducted: 45,
    attended: 43,
    excused: 0,
  },
  {
    subject: 'Computer Science',
    faculty: 'Ms. Priya',
    conducted: 42,
    attended: 41,
    excused: 0,
  },
]

export function AttendanceRegisterPage() {
  const [year, setYear] = useState(academicYears[0])
  const [selectedClass, setSelectedClass] = useState(classOptions[0])
  const [month, setMonth] = useState(monthOptions[0])

  const totals = useMemo(() => {
    const conducted = mockAttendance.reduce((acc, row) => acc + row.conducted, 0)
    const attended = mockAttendance.reduce((acc, row) => acc + row.attended, 0)
    const excused = mockAttendance.reduce((acc, row) => acc + row.excused, 0)
    const percentage = conducted === 0 ? 0 : Math.round(((attended + excused) / conducted) * 100)
    return { conducted, attended, excused, percentage }
  }, [])

  const handleReset = () => {
    setYear(academicYears[0])
    setSelectedClass(classOptions[0])
    setMonth(monthOptions[0])
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Module workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Attendance Register</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Review daily presence, track excused hours, and export attendance statements for
            students across academic years and classes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <Download className="h-4 w-4" />
            Download report
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <FileEdit className="h-4 w-4" />
            Add attendance note
          </button>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Filters
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Academic year
            </label>
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-900 focus:outline-none"
            >
              {academicYears.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Class & section
            </label>
            <select
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-900 focus:outline-none"
            >
              {classOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Period
            </label>
            <select
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-900 focus:outline-none"
            >
              {monthOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-3">
            <button
              type="button"
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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total sessions" value={totals.conducted.toString()} tone="bg-indigo-500" />
        <SummaryCard label="Attended" value={totals.attended.toString()} tone="bg-emerald-500" />
        <SummaryCard label="Excused" value={totals.excused.toString()} tone="bg-amber-400" />
        <SummaryCard label="Overall attendance" value={`${totals.percentage}%`} tone="bg-slate-900" />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Subject breakdown</h2>
            <p className="text-sm text-slate-500">
              Presence across all core and elective subjects for the selected period.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            {year} &bull; {selectedClass}
          </span>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50">
              <tr className="text-slate-500">
                <th scope="col" className="px-6 py-4 font-semibold">Subject</th>
                <th scope="col" className="px-6 py-4 font-semibold">Faculty</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">Sessions</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">Attended</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">Excused</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">Attendance %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {mockAttendance.map((row) => {
                const percentage = row.conducted === 0 ? 0 : Math.round(((row.attended + row.excused) / row.conducted) * 100)
                return (
                  <tr key={row.subject} className="hover:bg-slate-50/70">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.subject}</td>
                    <td className="px-6 py-4">{row.faculty}</td>
                    <td className="px-6 py-4 text-center">{row.conducted}</td>
                    <td className="px-6 py-4 text-center text-emerald-600">{row.attended}</td>
                    <td className="px-6 py-4 text-center text-amber-600">{row.excused}</td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-900">
                      {percentage}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className="bg-slate-900 text-white">
              <tr>
                <td className="px-6 py-4 font-semibold">Overall</td>
                <td className="px-6 py-4">—</td>
                <td className="px-6 py-4 text-center font-semibold">{totals.conducted}</td>
                <td className="px-6 py-4 text-center font-semibold">{totals.attended}</td>
                <td className="px-6 py-4 text-center font-semibold">{totals.excused}</td>
                <td className="px-6 py-4 text-center font-semibold">{totals.percentage}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  )
}

interface SummaryCardProps {
  label: string
  value: string
  tone: string
}

function SummaryCard({ label, value, tone }: SummaryCardProps) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`absolute inset-x-4 top-4 h-24 rounded-3xl opacity-10 ${tone}`} />
      <div className="relative space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
        <p className="text-xs text-slate-400">Auto-calculated from filtered records</p>
      </div>
    </article>
  )
}
