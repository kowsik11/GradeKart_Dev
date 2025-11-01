import { useState } from 'react'
import type { ComponentType } from 'react'
import { CalendarCheck, CheckCircle2, Clock4, FileText, XCircle } from 'lucide-react'

interface LeaveRequest {
  id: string
  student: string
  rollNo: string
  from: string
  to: string
  reason: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

const pendingRequests: LeaveRequest[] = [
  {
    id: 'REQ-1042',
    student: 'Bhavana S',
    rollNo: 'GK2025-002',
    from: '2025-10-30',
    to: '2025-11-01',
    reason: 'State level badminton selections',
    status: 'Pending',
  },
  {
    id: 'REQ-1043',
    student: 'Eshan T',
    rollNo: 'GK2025-005',
    from: '2025-10-29',
    to: '2025-10-29',
    reason: 'Medical review - orthodontist visit',
    status: 'Approved',
  },
  {
    id: 'REQ-1044',
    student: 'Chirag P',
    rollNo: 'GK2025-003',
    from: '2025-10-28',
    to: '2025-10-28',
    reason: 'Project presentation outside campus',
    status: 'Pending',
  },
]

export function LeaveDeskPage() {
  const [requests, setRequests] = useState(pendingRequests)

  const updateStatus = (id: string, status: LeaveRequest['status']) => {
    setRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status } : request)),
    )
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Advisor workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Leave Desk</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Approve or decline student leave requests with transparent timelines. Notify students
            instantly so they can plan travel or catch-up work.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          <CalendarCheck className="h-4 w-4" />
          View leave calendar
        </button>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Requests dashboard</h2>
            <p className="text-sm text-slate-500">
              Pending approvals stay highlighted. Actions log with timestamps will be visible to admin.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {requests.filter((item) => item.status === 'Pending').length} pending
          </span>
        </header>

        <div className="space-y-3">
          {requests.map((request) => (
            <article
              key={request.id}
              className="rounded-3xl border border-slate-100 bg-slate-50/60 p-4 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {request.id}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {request.student} &bull; {request.rollNo}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {formatDate(request.from)} to {formatDate(request.to)}
                  </p>
                </div>
                <StatusBadge status={request.status} />
              </div>
              <p className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                {request.reason}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ActionButton
                  label="Approve leave"
                  icon={CheckCircle2}
                  tone="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => updateStatus(request.id, 'Approved')}
                />
                <ActionButton
                  label="Reject request"
                  icon={XCircle}
                  tone="bg-rose-500 hover:bg-rose-600"
                  onClick={() => updateStatus(request.id, 'Rejected')}
                />
                <ActionButton
                  label="Ask for documents"
                  icon={FileText}
                  tone="bg-slate-900 hover:bg-slate-800"
                  onClick={() => updateStatus(request.id, 'Pending')}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function StatusBadge({ status }: { status: LeaveRequest['status'] }) {
  const palette =
    status === 'Approved'
      ? { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Approved' }
      : status === 'Rejected'
        ? { bg: 'bg-rose-50', text: 'text-rose-600', label: 'Rejected' }
        : { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pending review' }
  const Icon = status === 'Approved' ? CheckCircle2 : status === 'Rejected' ? XCircle : Clock4

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${palette.bg} ${palette.text}`}>
      <Icon className="h-3.5 w-3.5" />
      {palette.label}
    </span>
  )
}

interface ActionButtonProps {
  label: string
  icon: ComponentType<{ className?: string }>
  tone: string
  onClick: () => void
}

function ActionButton({ label, icon: Icon, tone, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition ${tone}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}

function formatDate(value: string) {
  const date = new Date(value)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
