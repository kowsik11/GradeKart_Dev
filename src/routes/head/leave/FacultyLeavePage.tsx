import { useState, type ReactNode } from 'react'
import { CalendarRange, CheckCircle2, Clock4, XCircle } from 'lucide-react'

type LeaveStatus = 'Pending' | 'Approved' | 'Declined'

interface LeaveRequest {
  id: string
  staff: string
  department: string
  from: string
  to: string
  reason: string
  status: LeaveStatus
}

const initialRequests: LeaveRequest[] = [
  {
    id: 'LEV-509',
    staff: 'Aditya Rao',
    department: 'Physics',
    from: '2025-10-29',
    to: '2025-10-31',
    reason: 'National level workshop speaker invite',
    status: 'Pending',
  },
  {
    id: 'LEV-510',
    staff: 'Sanya Kulkarni',
    department: 'Counselling',
    from: '2025-10-28',
    to: '2025-10-28',
    reason: 'Onsite parent resolution visit',
    status: 'Approved',
  },
  {
    id: 'LEV-511',
    staff: 'Rahul Menon',
    department: 'Administration',
    from: '2025-11-02',
    to: '2025-11-04',
    reason: 'Medical procedure',
    status: 'Pending',
  },
]

export function FacultyLeavePage() {
  const [requests, setRequests] = useState(initialRequests)

  const updateStatus = (id: string, status: LeaveStatus) => {
    setRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status } : request)),
    )
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Workforce management
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Faculty leave approvals</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Review upcoming faculty leave, ensure class cover is arranged, and track approvals in
            one view.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <CalendarRange className="h-3.5 w-3.5" />
          {requests.filter((item) => item.status === 'Pending').length} pending
        </span>
      </header>

      <section className="space-y-3">
        {requests.map((request) => (
          <article
            key={request.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {request.id}
                </p>
                <h2 className="text-lg font-semibold text-slate-900">{request.staff}</h2>
                <p className="text-sm text-slate-500">{request.department}</p>
              </div>
              <StatusBadge status={request.status} />
            </div>
            <div className="mt-4 grid gap-4 text-sm text-slate-600 md:grid-cols-3">
              <InfoItem label="From" value={formatDate(request.from)} />
              <InfoItem label="To" value={formatDate(request.to)} />
              <InfoItem label="Reason" value={request.reason} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <ActionButton
                tone="bg-emerald-500 hover:bg-emerald-600"
                icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                label="Approve"
                onClick={() => updateStatus(request.id, 'Approved')}
              />
              <ActionButton
                tone="bg-rose-500 hover:bg-rose-600"
                icon={<XCircle className="h-3.5 w-3.5" />}
                label="Decline"
                onClick={() => updateStatus(request.id, 'Declined')}
              />
              <ActionButton
                tone="bg-slate-900 hover:bg-slate-800"
                icon={<Clock4 className="h-3.5 w-3.5" />}
                label="Request details"
                onClick={() => updateStatus(request.id, 'Pending')}
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function StatusBadge({ status }: { status: LeaveStatus }) {
  const palette =
    status === 'Approved'
      ? { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Approved' }
      : status === 'Declined'
        ? { bg: 'bg-rose-50', text: 'text-rose-600', label: 'Declined' }
        : { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pending' }
  const Icon = status === 'Approved' ? CheckCircle2 : status === 'Declined' ? XCircle : Clock4

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${palette.bg} ${palette.text}`}>
      <Icon className="h-3.5 w-3.5" />
      {palette.label}
    </span>
  )
}

function ActionButton({
  tone,
  label,
  icon,
  onClick,
}: {
  tone: string
  label: string
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition ${tone}`}
    >
      {icon}
      {label}
    </button>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm text-slate-700">{value}</p>
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
