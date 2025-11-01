import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { ChevronDown, ClipboardList, Edit3, Filter, Plus, Users } from 'lucide-react'

interface AdvisoryStudent {
  rollNo: string
  name: string
  program: string
  guardian: string
  contact: string
  attendance: number
  status: 'Good Standing' | 'Needs Attention' | 'Counselling'
}

const advisoryRoster: AdvisoryStudent[] = [
  {
    rollNo: 'GK2025-001',
    name: 'Aarav N',
    program: 'Class XI - MPC',
    guardian: 'N. Rajesh',
    contact: '+91 90000 11111',
    attendance: 94,
    status: 'Good Standing',
  },
  {
    rollNo: 'GK2025-002',
    name: 'Bhavana S',
    program: 'Class XI - MPC',
    guardian: 'S. Kavitha',
    contact: '+91 90000 22222',
    attendance: 87,
    status: 'Good Standing',
  },
  {
    rollNo: 'GK2025-003',
    name: 'Chirag P',
    program: 'Class XI - MPC',
    guardian: 'P. Anitha',
    contact: '+91 90000 33333',
    attendance: 72,
    status: 'Needs Attention',
  },
  {
    rollNo: 'GK2025-004',
    name: 'Divya R',
    program: 'Class XI - MPC',
    guardian: 'R. Srinivas',
    contact: '+91 90000 44444',
    attendance: 89,
    status: 'Good Standing',
  },
  {
    rollNo: 'GK2025-005',
    name: 'Eshan T',
    program: 'Class XI - MPC',
    guardian: 'T. Sunitha',
    contact: '+91 90000 55555',
    attendance: 65,
    status: 'Counselling',
  },
]

const classSections = ['Class XI - MPC', 'Class XI - BiPC', 'Class XII - MPC']
const academicYears = ['2025-26', '2024-25', '2023-24']

export function ClassAdvisoryPage() {
  const [selectedSection, setSelectedSection] = useState(classSections[0])
  const [year, setYear] = useState(academicYears[0])

  const summary = useMemo(() => {
    const total = advisoryRoster.length
    const goodStanding = advisoryRoster.filter((student) => student.status === 'Good Standing').length
    const attention = advisoryRoster.filter((student) => student.status === 'Needs Attention').length
    const counselling = advisoryRoster.filter((student) => student.status === 'Counselling').length
    const avgAttendance =
      total === 0
        ? 0
        : Math.round(
            advisoryRoster.reduce((acc, student) => acc + student.attendance, 0) / total,
          )
    return { total, goodStanding, attention, counselling, avgAttendance }
  }, [])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Advisor workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Class Advisory</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Maintain a live roster for your section, review academic wellness indicators, and
            capture quick updates before weekly advisory meets.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <Filter className="h-4 w-4" />
            Roster filters
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Add advisee
          </button>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FilterSelect
            label="Academic year"
            value={year}
            onChange={setYear}
            options={academicYears}
          />
          <FilterSelect
            label="Class & section"
            value={selectedSection}
            onChange={setSelectedSection}
            options={classSections}
          />
          <div className="flex flex-col gap-2 rounded-2xl border border-indigo-100 bg-indigo-50/80 px-4 py-3 text-indigo-700 shadow-inner">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              Advisor note
            </span>
            <p className="text-sm">
              Weekly mentorship huddle scheduled every Friday. Share updates by Thursday 6 PM.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Users}
          accent="bg-slate-900"
          title="Students assigned"
          value={summary.total.toString()}
          subtitle="Across advisory roster"
        />
        <SummaryCard
          icon={ClipboardList}
          accent="bg-emerald-500"
          title="Good standing"
          value={summary.goodStanding.toString()}
          subtitle="Attendance 80%+ & CGPA 7+"
        />
        <SummaryCard
          icon={Edit3}
          accent="bg-amber-500"
          title="Needs attention"
          value={summary.attention.toString()}
          subtitle="Attendance or academics flagged"
        />
        <SummaryCard
          icon={ChevronDown}
          accent="bg-indigo-500"
          title="Average attendance"
          value={`${summary.avgAttendance}%`}
          subtitle="Cumulative across subjects"
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Advisee roster</h2>
            <p className="text-sm text-slate-500">
              Track contact details, mentor conversations, and wellbeing indicators for each student.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <Edit3 className="h-4 w-4" />
            Export meeting sheet
          </button>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Roll number</th>
                <th scope="col" className="px-6 py-4 font-semibold">Student</th>
                <th scope="col" className="px-6 py-4 font-semibold">Program</th>
                <th scope="col" className="px-6 py-4 font-semibold">Guardian contact</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">Attendance</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {advisoryRoster.map((student) => (
                <tr key={student.rollNo} className="hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-semibold text-slate-900">{student.rollNo}</td>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.program}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span>{student.guardian}</span>
                      <span className="text-xs text-slate-400">{student.contact}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-slate-900">
                    {student.attendance}%
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor:
                          student.status === 'Good Standing'
                            ? '#DCFCE7'
                            : student.status === 'Needs Attention'
                              ? '#FEF3C7'
                              : '#E0E7FF',
                        color:
                          student.status === 'Good Standing'
                            ? '#065F46'
                            : student.status === 'Needs Attention'
                              ? '#92400E'
                              : '#312E81',
                      }}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                    >
                      Update profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

interface FilterSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-900 focus:outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  )
}

interface SummaryCardProps {
  icon: ComponentType<{ className?: string }>
  accent: string
  title: string
  value: string
  subtitle: string
}

function SummaryCard({ icon: Icon, accent, title, value, subtitle }: SummaryCardProps) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`absolute inset-x-4 top-4 h-24 rounded-3xl opacity-10 ${accent}`} />
      <div className="relative flex items-center gap-4">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${accent}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{title}</p>
          <p className="text-2xl font-semibold text-slate-900">{value}</p>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
    </article>
  )
}
