import { useMemo, useState } from 'react'
import { AlertTriangle, GraduationCap, Search, ShieldCheck } from 'lucide-react'

const focusAreas = ['All', 'High performers', 'Attendance dip', 'Fees pending', 'Discipline flagged']

const studentInsights = [
  {
    rollNo: 'GK2025-002',
    name: 'Bhavana S',
    grade: 'Class XI - MPC',
    cgpa: 8.4,
    attendance: 92,
    feesPending: 18000,
    discipline: 'Parent meet scheduled',
  },
  {
    rollNo: 'GK2025-003',
    name: 'Chirag P',
    grade: 'Class XI - MPC',
    cgpa: 7.6,
    attendance: 88,
    feesPending: 0,
    discipline: 'On mentor watchlist',
  },
  {
    rollNo: 'GK2025-051',
    name: 'Lakshmi V',
    grade: 'Class X - A',
    cgpa: 9.4,
    attendance: 98,
    feesPending: 0,
    discipline: 'Clean record',
  },
]

export function StudentInsightsPage() {
  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState(focusAreas[0])

  const filteredStudents = useMemo(() => {
    return studentInsights.filter((student) => {
      const matchesKeyword =
        keyword.trim().length === 0 ||
        student.name.toLowerCase().includes(keyword.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(keyword.toLowerCase())

      let matchesFocus = true
      if (filter === 'High performers') {
        matchesFocus = student.cgpa >= 9
      } else if (filter === 'Attendance dip') {
        matchesFocus = student.attendance < 90
      } else if (filter === 'Fees pending') {
        matchesFocus = student.feesPending > 0
      } else if (filter === 'Discipline flagged') {
        matchesFocus = student.discipline !== 'Clean record'
      }

      return matchesKeyword && matchesFocus
    })
  }, [filter, keyword])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Student intelligence
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Student Insights</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Surface students needing attention across academics, attendance, finance, and behaviour.
            Share the list with advisors before weekly syncs.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
          <ShieldCheck className="h-3.5 w-3.5" />
          Data refreshed hourly
        </span>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search by name or roll number"
            className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {focusAreas.map((area) => {
            const active = area === filter
            return (
              <button
                key={area}
                type="button"
                onClick={() => setFilter(area)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {area}
              </button>
            )
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Roll number
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Student
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  CGPA
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Attendance
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Fees status
                </th>
                <th scope="col" className="px-6 py-4 font-semibold">
                  Discipline
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {filteredStudents.map((student) => (
                <tr key={student.rollNo} className="hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {student.rollNo}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span>{student.name}</span>
                      <span className="text-xs text-slate-400">{student.grade}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{student.cgpa.toFixed(1)}</td>
                  <td className="px-6 py-4 text-slate-900">{student.attendance}%</td>
                  <td className="px-6 py-4">
                    {student.feesPending > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Pending ₹{student.feesPending.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        <GraduationCap className="h-3.5 w-3.5" />
                        Clear
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">{student.discipline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

