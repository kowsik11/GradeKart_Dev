import { useMemo, useState } from 'react'
import { Download, RefreshCcw, Search, Wallet } from 'lucide-react'

const academicYears = ['2025-26', '2024-25', '2023-24']
const terms = ['Full Year', 'Term 1', 'Term 2', 'Term 3']
const paymentModes = ['All modes', 'UPI', 'Net Banking', 'Cash', 'Cheque', 'DD']

const collectionEntries = [
  {
    receiptNo: 'RCPT-1834',
    student: 'Aarav N',
    rollNo: 'GK2025-001',
    mode: 'UPI',
    amount: 45000,
    category: 'Tuition',
    date: '2025-10-27',
  },
  {
    receiptNo: 'RCPT-1835',
    student: 'Bhavana S',
    rollNo: 'GK2025-002',
    mode: 'Net Banking',
    amount: 18000,
    category: 'Transport',
    date: '2025-10-27',
  },
  {
    receiptNo: 'RCPT-1836',
    student: 'Chirag P',
    rollNo: 'GK2025-003',
    mode: 'Cash',
    amount: 12000,
    category: 'Lab Fee',
    date: '2025-10-26',
  },
  {
    receiptNo: 'RCPT-1837',
    student: 'Divya R',
    rollNo: 'GK2025-004',
    mode: 'UPI',
    amount: 22000,
    category: 'Hostel',
    date: '2025-10-25',
  },
]

export function CollectionsPage() {
  const [year, setYear] = useState(academicYears[0])
  const [term, setTerm] = useState(terms[0])
  const [mode, setMode] = useState(paymentModes[0])

  const totals = useMemo(() => {
    const total = collectionEntries.reduce((acc, entry) => acc + entry.amount, 0)
    const todayTotal = collectionEntries
      .filter((entry) => entry.date === '2025-10-27')
      .reduce((acc, entry) => acc + entry.amount, 0)
    return {
      total,
      today: todayTotal,
    }
  }, [])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Collections workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Daily Collections</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Review teller entries, verify payment modes, and reconcile with bank statements before
            end-of-day closure.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <Download className="h-4 w-4" />
            Export ledger
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Wallet className="h-4 w-4" />
            Add collection entry
          </button>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Filters</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FilterSelect label="Academic year" value={year} onChange={setYear} options={academicYears} />
          <FilterSelect label="Term" value={term} onChange={setTerm} options={terms} />
          <FilterSelect label="Payment mode" value={mode} onChange={setMode} options={paymentModes} />
          <div className="flex items-end gap-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <RefreshCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <SummaryCard
          label="Total collected"
          value={`₹${(totals.total / 100000).toFixed(2)} L`}
          description={`${collectionEntries.length} receipts recorded`}
        />
        <SummaryCard
          label="Collected today"
          value={`₹${(totals.today / 100000).toFixed(2)} L`}
          description="Across tuition, transport, and hostel fee"
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Collection log</h2>
            <p className="text-sm text-slate-500">
              Verify entries before batching deposits. Amounts include scholarships and concessions.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {year} &bull; {term}
          </span>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50">
              <tr className="text-slate-500">
                <th scope="col" className="px-6 py-4 font-semibold">Receipt #</th>
                <th scope="col" className="px-6 py-4 font-semibold">Student</th>
                <th scope="col" className="px-6 py-4 font-semibold">Mode</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Amount</th>
                <th scope="col" className="px-6 py-4 font-semibold">Category</th>
                <th scope="col" className="px-6 py-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {collectionEntries.map((entry) => (
                <tr key={entry.receiptNo} className="hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-semibold text-slate-900">{entry.receiptNo}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span>{entry.student}</span>
                      <span className="text-xs text-slate-400">{entry.rollNo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{entry.mode}</td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-900">
                    ₹{entry.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">{entry.category}</td>
                  <td className="px-6 py-4">{formatDate(entry.date)}</td>
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
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-900 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </article>
  )
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
