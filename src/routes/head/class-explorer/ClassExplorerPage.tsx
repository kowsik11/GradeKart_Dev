import { useMemo, useState } from 'react'
import { ClipboardList, Users } from 'lucide-react'

const grades = ['Class X', 'Class XI', 'Class XII']
const sections: Record<string, string[]> = {
  'Class X': ['A', 'B'],
  'Class XI': ['MPC', 'BiPC', 'CEC'],
  'Class XII': ['MPC', 'BiPC', 'MEC'],
}

const classAdvisors = [
  {
    grade: 'Class XI',
    section: 'MPC',
    advisor: 'Meera Nair',
    advisorEmail: 'meera.nair@gkcampus.edu',
    advisorPhone: '+91 90000 55555',
    strength: 32,
    boys: 18,
    girls: 14,
    students: [
      {
        rollNo: 'GK2025-001',
        name: 'Aarav N',
        grade: 'A',
        attendance: '96%',
        feesStatus: 'Clear',
        discipline: 'Clean record',
      },
      {
        rollNo: 'GK2025-002',
        name: 'Bhavana S',
        grade: 'A-',
        attendance: '92%',
        feesStatus: 'Pending (₹18K)',
        discipline: 'Parent meet scheduled',
      },
      {
        rollNo: 'GK2025-003',
        name: 'Chirag P',
        grade: 'B+',
        attendance: '88%',
        feesStatus: 'Clear',
        discipline: 'On mentor watchlist',
      },
    ],
  },
  {
    grade: 'Class XI',
    section: 'BiPC',
    advisor: 'Sanya Kulkarni',
    advisorEmail: 'sanya.kulkarni@gkcampus.edu',
    advisorPhone: '+91 90000 22222',
    strength: 28,
    boys: 12,
    girls: 16,
    students: [
      {
        rollNo: 'GK2025-020',
        name: 'Zoya F',
        grade: 'A',
        attendance: '95%',
        feesStatus: 'Clear',
        discipline: 'Clean record',
      },
    ],
  },
]

export function ClassExplorerPage() {
  const [grade, setGrade] = useState(grades[1])
  const [section, setSection] = useState(sections[grades[1]][0])

  const classData = useMemo(() => {
    return (
      classAdvisors.find(
        (item) => item.grade === grade && item.section === section,
      ) ?? null
    )
  }, [grade, section])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Academic oversight
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Class Explorer</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Pick any class to review its advisor, student roster, academic pulse, and pending actions.
            Use this lens during PTMs or monthly leadership reviews.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <ClipboardList className="h-3.5 w-3.5" />
          {grade} &bull; Section {section}
        </span>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <FilterSelect
          label="Grade"
          value={grade}
          options={grades}
          onChange={(value) => {
            setGrade(value)
            setSection(sections[value][0])
          }}
        />
        <FilterSelect
          label="Section"
          value={section}
          options={sections[grade]}
          onChange={setSection}
        />
        <div className="rounded-3xl border border-indigo-100 bg-indigo-50/80 p-5 shadow-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Snapshot
          </p>
          <p className="mt-2 text-sm text-indigo-700">
            Track academic spreads, attendance dip, and fees pending at a class level. Insights auto-sync
            nightly from student and finance dashboards.
          </p>
        </div>
      </section>

      {classData ? (
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Class advisor
                </p>
                <h2 className="text-xl font-semibold text-slate-900">
                  {classData.advisor}
                </h2>
                <p className="text-sm text-slate-500">
                  {classData.grade} • Section {classData.section}
                </p>
              </div>
              <div className="text-right text-sm text-slate-500">
                <p>{classData.advisorEmail}</p>
                <p>{classData.advisorPhone}</p>
              </div>
            </header>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <SummaryCard label="Students" value={classData.strength.toString()} />
              <SummaryCard label="Boys" value={classData.boys.toString()} />
              <SummaryCard label="Girls" value={classData.girls.toString()} />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4">
              <h3 className="text-lg font-semibold text-slate-900">Student roster</h3>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                <Users className="h-3.5 w-3.5" />
                {classData.students.length} profiles listed
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {classData.students.map((student) => (
                <article
                  key={student.rollNo}
                  className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm"
                >
                  <header>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      {student.rollNo}
                    </p>
                    <h4 className="text-sm font-semibold text-slate-900">{student.name}</h4>
                  </header>
                  <dl className="mt-3 space-y-2 text-xs text-slate-500">
                    <div className="flex items-center justify-between">
                      <dt>Grade band</dt>
                      <dd className="font-semibold text-slate-900">{student.grade}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Attendance</dt>
                      <dd className="font-semibold text-slate-900">{student.attendance}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt>Fees</dt>
                      <dd className="font-semibold text-slate-900">{student.feesStatus}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-500">Discipline</dt>
                      <dd className="text-slate-700">{student.discipline}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm text-slate-500">
          Class details not available yet. Data will appear once the academic office maps this section in GradeKart.
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
    <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent text-sm text-slate-700 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </article>
  )
}
