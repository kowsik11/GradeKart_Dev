import type { FeeRecord } from '@/routes/student/fees/data'

interface FeeResultsSectionProps {
  title: string
  subtitle?: string
  records: FeeRecord[]
  emptyMessage: string
}

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function FeeResultsSection({
  title,
  subtitle,
  records,
  emptyMessage,
}: FeeResultsSectionProps) {
  const totals = calculateTotals(records)

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        <div className="flex gap-3">
          <SummaryPill label="Total due" value={currencyFormatter.format(totals.totalDue)} />
          <SummaryPill label="Paid" value={currencyFormatter.format(totals.totalPaid)} tone="emerald" />
          <SummaryPill
            label="Outstanding"
            value={currencyFormatter.format(totals.outstanding)}
            tone={totals.outstanding > 0 ? 'amber' : 'slate'}
          />
        </div>
      </header>

      {records.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center text-sm text-slate-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Fee component</th>
                <th className="px-6 py-4 font-semibold">Billing cycle</th>
                <th className="px-6 py-4 font-semibold text-center">Amount due</th>
                <th className="px-6 py-4 font-semibold text-center">Amount paid</th>
                <th className="px-6 py-4 font-semibold text-center">Outstanding</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold">Due date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {records.map((row) => {
                const outstanding = Math.max(row.amountDue - row.amountPaid, 0)
                return (
                  <tr key={row.id} className="hover:bg-slate-50/70">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.item}</td>
                    <td className="px-6 py-4">{row.cycle}</td>
                    <td className="px-6 py-4 text-center text-slate-900">
                      {currencyFormatter.format(row.amountDue)}
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600">
                      {currencyFormatter.format(row.amountPaid)}
                    </td>
                    <td className="px-6 py-4 text-center text-amber-600">
                      {currencyFormatter.format(outstanding)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-6 py-4">{formatDate(row.dueDate)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function calculateTotals(records: FeeRecord[]) {
  return records.reduce(
    (acc, record) => {
      acc.totalDue += record.amountDue
      acc.totalPaid += record.amountPaid
      acc.outstanding += Math.max(record.amountDue - record.amountPaid, 0)
      return acc
    },
    { totalDue: 0, totalPaid: 0, outstanding: 0 }
  )
}

function SummaryPill({
  label,
  value,
  tone = 'slate',
}: {
  label: string
  value: string
  tone?: 'slate' | 'emerald' | 'amber'
}) {
  const toneClasses: Record<typeof tone, string> = {
    slate: 'bg-slate-900 text-white',
    emerald: 'bg-emerald-500/10 text-emerald-600 border border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border border-amber-100',
  }

  return (
    <div className={`min-w-[140px] rounded-2xl px-4 py-2 text-center text-sm font-semibold ${toneClasses[tone]}`}>
      <p className="text-xs uppercase tracking-[0.2em] text-white/80">{label}</p>
      <p className="mt-1 text-base">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: FeeRecord['status'] }) {
  const statusStyles: Record<FeeRecord['status'], string> = {
    Paid: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    Pending: 'bg-rose-50 text-rose-600 border border-rose-100',
    'Partially Paid': 'bg-amber-50 text-amber-600 border border-amber-100',
  }

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  )
}
