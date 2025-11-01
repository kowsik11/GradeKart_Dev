import { useMemo, useState } from 'react'
import { AlertTriangle, BadgeCheck, Filter, Search, ShieldAlert } from 'lucide-react'

interface LookupRecord {
  rollNo: string
  name: string
  className: string
  contact: string
  guardian: string
  status: 'Clear' | 'Warning' | 'Disciplinary'
  notes: string
}

const roster: LookupRecord[] = [
  {
    rollNo: 'GK2025-001',
    name: 'Aarav N',
    className: 'Class XI - MPC',
    contact: '+91 90000 11111',
    guardian: 'N. Rajesh',
    status: 'Clear',
    notes: 'Club lead for robotics. No pending issues.',
  },
  {
    rollNo: 'GK2025-003',
    name: 'Chirag P',
    className: 'Class XI - MPC',
    contact: '+91 90000 33333',
    guardian: 'P. Anitha',
    status: 'Warning',
    notes: 'Late submissions for lab journal. Mentor meet scheduled.',
  },
  {
    rollNo: 'GK2025-008',
    name: 'Fatima Z',
    className: 'Class XI - MPC',
    contact: '+91 90000 88888',
    guardian: 'Z. Kareem',
    status: 'Disciplinary',
    notes: 'Pending explanation for lab safety violation. Committee meets Friday.',
  },
]

export function StudentLookupPage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase()
    if (!lower) {
      return roster
    }
    return roster.filter(
      (record) =>
        record.rollNo.toLowerCase().includes(lower) ||
        record.name.toLowerCase().includes(lower) ||
        record.className.toLowerCase().includes(lower),
    )
  }, [query])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Advisor workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Student Lookup & Discipline Desk</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Quickly locate students, review advisories, and log behaviour notes. Every decision is
            timestamped to keep academic heads in sync.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <Filter className="h-4 w-4" />
            Advanced filters
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <ShieldAlert className="h-4 w-4" />
            Log disciplinary note
          </button>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900 md:max-w-md">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by roll number, name, or class"
              className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
            />
          </label>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {filtered.length} matches
          </span>
        </div>
      </section>

      <section className="space-y-3">
        {filtered.map((record) => (
          <article
            key={record.rollNo}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {record.rollNo}
                </p>
                <h2 className="text-xl font-semibold text-slate-900">{record.name}</h2>
                <p className="text-sm text-slate-500">{record.className}</p>
              </div>
              <StatusPill status={record.status} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <InfoBlock label="Student contact" value={record.contact} />
              <InfoBlock label="Guardian contact" value={record.guardian} />
              <InfoBlock label="Advisor notes" value={record.notes} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                <BadgeCheck className="h-3.5 w-3.5" />
                Mark review complete
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                Send guardian alert
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function StatusPill({ status }: { status: LookupRecord['status'] }) {
  const palette =
    status === 'Clear'
      ? { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Clear record' }
      : status === 'Warning'
        ? { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Attention needed' }
        : { bg: 'bg-rose-50', text: 'text-rose-600', label: 'Disciplinary' }

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${palette.bg} ${palette.text}`}>
      <ShieldAlert className="h-3.5 w-3.5" />
      {palette.label}
    </span>
  )
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-700">{value}</p>
    </div>
  )
}

