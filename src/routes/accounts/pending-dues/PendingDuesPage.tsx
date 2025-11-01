import { useMemo } from 'react'
import { AlertTriangle, Mail, Phone } from 'lucide-react'

const pendingAccounts = [
  {
    student: 'Bhavana S',
    rollNo: 'GK2025-002',
    className: 'Class XI - MPC',
    guardian: 'S. Kavitha',
    contact: '+91 98888 22222',
    dueAmount: 38000,
    lastPaidOn: '2025-09-15',
    remarks: 'Requested split into two instalments; follow-up pending.',
  },
  {
    student: 'Chirag P',
    rollNo: 'GK2025-003',
    className: 'Class XI - MPC',
    guardian: 'P. Anitha',
    contact: '+91 98888 33333',
    dueAmount: 10500,
    lastPaidOn: '2025-10-10',
    remarks: 'Transport fee due; parent meeting scheduled for 30 Oct.',
  },
  {
    student: 'Eshan T',
    rollNo: 'GK2025-005',
    className: 'Class XI - MPC',
    guardian: 'T. Sunitha',
    contact: '+91 98888 55555',
    dueAmount: 22500,
    lastPaidOn: '2025-08-25',
    remarks: 'Hostel fee outstanding; to align with scholarship office.',
  },
]

export function PendingDuesPage() {
  const totals = useMemo(() => {
    const due = pendingAccounts.reduce((acc, account) => acc + account.dueAmount, 0)
    return {
      due,
      count: pendingAccounts.length,
    }
  }, [])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Recovery workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Pending Dues</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Prioritise follow-ups, log parent conversations, and ensure accounts stay reconciled
            before the monthly close.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
          <AlertTriangle className="h-3.5 w-3.5" />
          High priority list
        </span>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <SummaryCard label="Total pending" value={`₹${totals.due.toLocaleString('en-IN')}`} />
          <SummaryCard label="Accounts flagged" value={`${totals.count} students`} />
        </div>
      </section>

      <section className="space-y-4">
        {pendingAccounts.map((account) => (
          <article
            key={account.rollNo}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {account.rollNo}
                </p>
                <h2 className="text-xl font-semibold text-slate-900">{account.student}</h2>
                <p className="text-sm text-slate-500">{account.className}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Outstanding
                </p>
                <p className="text-2xl font-semibold text-amber-600">
                  ₹{account.dueAmount.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-slate-400">
                  Last paid on {formatDate(account.lastPaidOn)}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <InfoBlock label="Guardian" value={account.guardian} />
              <InfoBlock label="Contact" value={account.contact} />
              <InfoBlock label="Remarks" value={account.remarks} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                <Mail className="h-3.5 w-3.5" />
                Email reminder
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                <Phone className="h-3.5 w-3.5" />
                Log call update
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    </article>
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

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

