import { useMemo, useState } from 'react'
import { academicYearOptions, monthOptions, borrowHistory, type BorrowRecord } from '@/routes/student/library/data'
import { RefreshCcw, Search } from 'lucide-react'

export function LibraryBorrowingsPage() {
  const [year, setYear] = useState(academicYearOptions[0])
  const [period, setPeriod] = useState(monthOptions[0])
  const [hasSearched, setHasSearched] = useState(false)

  const activeLoans = useMemo(() => borrowHistory.filter((record) => record.status === 'Checked Out'), [])
  const overdueLoans = useMemo(() => borrowHistory.filter((record) => record.status === 'Overdue'), [])

  const filteredHistory = useMemo(() => {
    if (!hasSearched) {
      return []
    }
    // Placeholder filtering until Airtable integration; using the demo dataset unchanged
    return borrowHistory
  }, [hasSearched])

  const handleSearch = () => setHasSearched(true)
  const handleReset = () => {
    setYear(academicYearOptions[0])
    setPeriod(monthOptions[0])
    setHasSearched(false)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Library workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">My Borrowings</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Track every title issued under your card, including books currently checked out, due
            reminders, and previously returned items.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-900">{year}</span> • {period}
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Filters</h2>
        <p className="mt-1 text-xs text-slate-500">
          Select the academic cycle and period, then search to load your borrowing log.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            label="Academic year"
            value={year}
            onChange={setYear}
            options={academicYearOptions}
          />
          <FilterSelect label="Period" value={period} onChange={setPeriod} options={monthOptions} />
          <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-2">
            <button
              type="button"
              onClick={handleSearch}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <RefreshCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          label="Books checked out"
          value={activeLoans.length.toString()}
          helper="Currently with you"
          tone="bg-indigo-500"
        />
        <SummaryCard
          label="Overdue titles"
          value={overdueLoans.length.toString()}
          helper="Return immediately to avoid fines"
          tone="bg-rose-500"
        />
        <SummaryCard
          label="Total borrowings"
          value={borrowHistory.length.toString()}
          helper="Across selected academic year"
          tone="bg-emerald-500"
        />
      </section>

      {hasSearched ? (
        <BorrowHistoryTable records={filteredHistory} />
      ) : (
        <SearchPrompt />
      )}
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
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
  helper,
  tone,
}: {
  label: string
  value: string
  helper: string
  tone: string
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`absolute inset-x-4 top-4 h-24 rounded-3xl opacity-10 ${tone}`} />
      <div className="relative space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500">{helper}</p>
      </div>
    </article>
  )
}

function BorrowHistoryTable({ records }: { records: BorrowRecord[] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Borrowing log</h2>
          <p className="text-sm text-slate-500">
            Issued dates, due dates, and returns recorded by the librarian.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          {records.length} entries
        </span>
      </header>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Title & Author</th>
              <th className="px-6 py-4 font-semibold">Accession No.</th>
              <th className="px-6 py-4 font-semibold">Issued</th>
              <th className="px-6 py-4 font-semibold">Due</th>
              <th className="px-6 py-4 font-semibold">Returned</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/70">
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">{record.title}</p>
                    <p className="text-xs text-slate-500">{record.author}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">{record.accessionNumber}</td>
                <td className="px-6 py-4">{formatDate(record.issueDate)}</td>
                <td className="px-6 py-4">{formatDate(record.dueDate)}</td>
                <td className="px-6 py-4">{record.returnDate ? formatDate(record.returnDate) : '—'}</td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={record.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function SearchPrompt() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
      <p className="text-sm font-semibold text-slate-600">
        Use the filters above and click Search to view your borrowing history.
      </p>
    </div>
  )
}

function StatusBadge({ status }: { status: BorrowRecord['status'] }) {
  const styles: Record<BorrowRecord['status'], string> = {
    'Checked Out': 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    Returned: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    Overdue: 'bg-rose-50 text-rose-600 border border-rose-100',
  }
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
