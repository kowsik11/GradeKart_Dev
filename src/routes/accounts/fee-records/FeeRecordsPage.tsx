import { useMemo, useState } from 'react'
import { Download, Filter, Mail, Search } from 'lucide-react'

type FeeStatus = 'All' | 'Paid' | 'Pending'

const feeTabs: FeeStatus[] = ['All', 'Paid', 'Pending']

const feeRecords = [
  {
    invoice: 'INV-1201',
    student: 'Aarav N',
    rollNo: 'GK2025-001',
    className: 'Class XI - MPC',
    amount: 75000,
    paid: 75000,
    due: 0,
    status: 'Paid' as const,
    lastPayment: '2025-09-05',
  },
  {
    invoice: 'INV-1202',
    student: 'Bhavana S',
    rollNo: 'GK2025-002',
    className: 'Class XI - MPC',
    amount: 76000,
    paid: 38000,
    due: 38000,
    status: 'Pending' as const,
    lastPayment: '2025-09-15',
  },
  {
    invoice: 'INV-1203',
    student: 'Chirag P',
    rollNo: 'GK2025-003',
    className: 'Class XI - MPC',
    amount: 74500,
    paid: 64000,
    due: 10500,
    status: 'Pending' as const,
    lastPayment: '2025-10-10',
  },
  {
    invoice: 'INV-1204',
    student: 'Divya R',
    rollNo: 'GK2025-004',
    className: 'Class XI - MPC',
    amount: 78000,
    paid: 78000,
    due: 0,
    status: 'Paid' as const,
    lastPayment: '2025-08-28',
  },
]

export function FeeRecordsPage() {
  const [activeTab, setActiveTab] = useState<FeeStatus>('All')

  const filteredRecords = useMemo(() => {
    if (activeTab === 'All') {
      return feeRecords
    }
    return feeRecords.filter((record) => record.status === activeTab)
  }, [activeTab])

  const totals = useMemo(() => {
    const amount = filteredRecords.reduce((acc, record) => acc + record.amount, 0)
    const paid = filteredRecords.reduce((acc, record) => acc + record.paid, 0)
    const due = filteredRecords.reduce((acc, record) => acc + record.due, 0)
    return {
      amount,
      paid,
      due,
    }
  }, [filteredRecords])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Ledger workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Fee Records</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Inspect invoices, payment history, and pending commitments. Use tabs to filter by
            payment status and follow-up accordingly.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <Mail className="h-4 w-4" />
            Send reminders
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Export statement
          </button>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {feeTabs.map((tab) => {
            const active = tab === activeTab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            )
          })}
          <div className="ml-auto flex items-center gap-2">
            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                placeholder="Search by name or roll number"
                className="bg-transparent text-sm text-slate-700 focus:outline-none"
              />
            </label>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <Filter className="h-3.5 w-3.5" />
              Advanced filters
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryStat label="Billed" amount={totals.amount} tone="bg-slate-900" />
        <SummaryStat label="Collected" amount={totals.paid} tone="bg-emerald-500" />
        <SummaryStat label="Outstanding" amount={totals.due} tone="bg-amber-500" />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50">
              <tr className="text-slate-500">
                <th scope="col" className="px-6 py-4 font-semibold">Invoice</th>
                <th scope="col" className="px-6 py-4 font-semibold">Student</th>
                <th scope="col" className="px-6 py-4 font-semibold">Total</th>
                <th scope="col" className="px-6 py-4 font-semibold">Collected</th>
                <th scope="col" className="px-6 py-4 font-semibold">Due</th>
                <th scope="col" className="px-6 py-4 font-semibold">Last payment</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {filteredRecords.map((record) => (
                <tr key={record.invoice} className="hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-semibold text-slate-900">{record.invoice}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span>{record.student}</span>
                      <span className="text-xs text-slate-400">{record.rollNo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    ₹{record.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-emerald-600">
                    ₹{record.paid.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-amber-600">
                    ₹{record.due.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">{formatDate(record.lastPayment)}</td>
                  <td className="px-6 py-4 text-right">
                    <StatusBadge status={record.status} />
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

function SummaryStat({ label, amount, tone }: { label: string; amount: number; tone: string }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`absolute inset-x-4 top-4 h-24 rounded-3xl opacity-10 ${tone}`} />
      <div className="relative space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <p className="text-2xl font-semibold text-slate-900">₹{amount.toLocaleString('en-IN')}</p>
        <p className="text-xs text-slate-400">Auto-calculated for active filter</p>
      </div>
    </article>
  )
}

function StatusBadge({ status }: { status: 'Paid' | 'Pending' }) {
  if (status === 'Paid') {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
        Paid
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
      Pending
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

