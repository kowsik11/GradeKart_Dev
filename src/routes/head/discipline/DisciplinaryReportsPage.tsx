import { useState } from 'react'
import { AlertTriangle, CheckCircle2, MessageSquare, ShieldAlert } from 'lucide-react'

interface DisciplineReport {
  id: string
  student: string
  rollNo: string
  className: string
  incident: string
  status: 'Open' | 'Resolved'
  action: string
  reportedOn: string
}

const reportsSeed: DisciplineReport[] = [
  {
    id: 'DISC-302',
    student: 'Chirag P',
    rollNo: 'GK2025-003',
    className: 'Class XI - MPC',
    incident: 'Late submission and lab safety violation',
    status: 'Open',
    action: 'Mentor review pending',
    reportedOn: '2025-10-24',
  },
  {
    id: 'DISC-298',
    student: 'Neha T',
    rollNo: 'GK2025-045',
    className: 'Class X - A',
    incident: 'Minor classroom disruption',
    status: 'Resolved',
    action: 'Parent call completed',
    reportedOn: '2025-10-18',
  },
]

export function DisciplinaryReportsPage() {
  const [reports, setReports] = useState(reportsSeed)

  const markResolved = (id: string) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, status: 'Resolved', action: 'Closed by School Head' } : report,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">
            Campus wellbeing
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Disciplinary desk</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Review escalated incidents, confirm root causes, and document corrective actions for the
            leadership trail.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
          <ShieldAlert className="h-3.5 w-3.5" />
          {reports.filter((item) => item.status === 'Open').length} open cases
        </span>
      </header>

      <section className="space-y-3">
        {reports.map((report) => (
          <article
            key={report.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {report.id}
                </p>
                <h2 className="text-lg font-semibold text-slate-900">{report.student}</h2>
                <p className="text-sm text-slate-500">
                  {report.className} &bull; {report.rollNo}
                </p>
              </div>
              <StatusTag status={report.status} />
            </div>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-600">
              {report.incident}
            </div>
            <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5" />
                {report.action}
              </span>
              <span>Reported on {formatDate(report.reportedOn)}</span>
            </footer>
            {report.status === 'Open' ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => markResolved(report.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Mark as resolved
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  Escalate to counselling
                </button>
              </div>
            ) : null}
          </article>
        ))}
      </section>
    </div>
  )
}

function StatusTag({ status }: { status: DisciplineReport['status'] }) {
  return status === 'Open' ? (
    <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-semibold text-rose-600">
      <ShieldAlert className="h-3.5 w-3.5" />
      Open
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-600">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Resolved
    </span>
  )
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

