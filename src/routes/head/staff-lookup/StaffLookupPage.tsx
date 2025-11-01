import { useMemo, useState, type ReactNode } from 'react'
import { CalendarDays, Mail, Phone, UserCheck } from 'lucide-react'

const staffRoster = [
  {
    id: 'STF-101',
    name: 'Meera Nair',
    designation: 'Assistant Professor • Mathematics',
    advisorOf: 'Class XI - MPC',
    email: 'meera.nair@gkcampus.edu',
    phone: '+91 90000 55555',
    joinedOn: '2018-06-10',
    achievements: ['Board topper mentor 2024', 'STEM Innovation Award'],
    notes: [
      { date: '2025-10-20', entry: 'Led Grade XI bridge course review.' },
      { date: '2025-09-12', entry: 'Completed counselling orientation.' },
    ],
  },
  {
    id: 'STF-205',
    name: 'Sanya Kulkarni',
    designation: 'Counsellor • Humanities',
    advisorOf: 'Class XI - BiPC',
    email: 'sanya.kulkarni@gkcampus.edu',
    phone: '+91 90000 22222',
    joinedOn: '2020-04-02',
    achievements: ['Parent connect champion', 'Mental wellbeing lead'],
    notes: [
      { date: '2025-10-18', entry: 'Resolved Grade 9 parent escalation.' },
      { date: '2025-08-30', entry: 'Conducted wellbeing retreat.' },
    ],
  },
]

export function StaffLookupPage() {
  const [staffId, setStaffId] = useState(staffRoster[0].id)
  const staff = useMemo(
    () => staffRoster.find((item) => item.id === staffId) ?? staffRoster[0],
    [staffId],
  )

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Staff lookup
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Faculty dossier</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Select a staff member to review their service record, achievements, advisory assignments,
            and recent leadership notes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Choose staff
            </span>
            <select
              value={staffId}
              onChange={(event) => setStaffId(event.target.value)}
              className="bg-transparent text-sm text-slate-700 focus:outline-none"
            >
              {staffRoster.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} • {item.id}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {staff.id}
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">{staff.name}</h2>
            <p className="text-sm text-slate-500">{staff.designation}</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p className="flex items-center justify-end gap-2">
              <Mail className="h-4 w-4 text-slate-400" />
              {staff.email}
            </p>
            <p className="mt-1 flex items-center justify-end gap-2">
              <Phone className="h-4 w-4 text-slate-400" />
              {staff.phone}
            </p>
          </div>
        </header>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          <InfoCard label="Class advisor for" value={staff.advisorOf} icon={<UserCheck className="h-4 w-4" />} />
          <InfoCard
            label="Joined campus"
            value={formatDate(staff.joinedOn)}
            icon={<CalendarDays className="h-4 w-4" />}
          />
        </dl>
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Highlights
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {staff.achievements.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-100 bg-white px-4 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Leadership notes
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {staff.notes.map((item) => (
                <li key={item.date} className="rounded-2xl border border-slate-100 bg-white px-4 py-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {formatDate(item.date)}
                  </p>
                  <p className="text-slate-700">{item.entry}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </section>
    </div>
  )
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: ReactNode
}) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-inner">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  )
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
