import { useState } from 'react'
import { ClipboardCheck, Plus, Save, Scale } from 'lucide-react'

const adjustmentHistory = [
  {
    id: 'ADJ-902',
    student: 'Aarav N',
    rollNo: 'GK2025-001',
    type: 'Scholarship',
    amount: 15000,
    note: 'Merit scholarship (District topper)',
    approvedBy: 'Accounts Head',
    date: '2025-09-01',
  },
  {
    id: 'ADJ-911',
    student: 'Chirag P',
    rollNo: 'GK2025-003',
    type: 'Late fee waiver',
    amount: 500,
    note: 'Waived late fee upon mentor request',
    approvedBy: 'Principal',
    date: '2025-10-05',
  },
]

export function AdjustmentsPage() {
  const [formState, setFormState] = useState({
    rollNo: '',
    type: 'Scholarship',
    amount: '',
    reason: '',
  })

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Adjustments workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Concessions & Adjustments</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Document scholarships, waivers, and special approvals with transparent audit trails.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          <ClipboardCheck className="h-4 w-4" />
          View approval matrix
        </button>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={(event) => event.preventDefault()}
        >
          <h2 className="text-lg font-semibold text-slate-900">Create adjustment</h2>
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Student roll number
            </span>
            <input
              value={formState.rollNo}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, rollNo: event.target.value }))
              }
              placeholder="e.g. GK2025-002"
              className="bg-transparent text-sm text-slate-700 focus:outline-none"
              required
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Adjustment type
              </span>
              <select
                value={formState.type}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, type: event.target.value }))
                }
                className="bg-transparent text-sm text-slate-700 focus:outline-none"
              >
                <option value="Scholarship">Scholarship</option>
                <option value="Late fee waiver">Late fee waiver</option>
                <option value="Penalty reversal">Penalty reversal</option>
                <option value="Discount">Discount</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Amount (₹)
              </span>
              <input
                type="number"
                min="0"
                value={formState.amount}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, amount: event.target.value }))
                }
                placeholder="e.g. 15000"
                className="bg-transparent text-sm text-slate-700 focus:outline-none"
                required
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Approval note
            </span>
            <textarea
              value={formState.reason}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, reason: event.target.value }))
              }
              rows={4}
              placeholder="Mention scholarship ID, waiver request, or approval reason."
              className="resize-none bg-transparent text-sm text-slate-700 focus:outline-none"
              required
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Save className="h-4 w-4" />
              Save adjustment
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <Plus className="h-4 w-4" />
              Add supporting document
            </button>
          </div>
        </form>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Approval guidelines
            </h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-600">
              <li className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                <span className="font-semibold text-slate-900">Scholarships:</span> Must reference
                scholarship ID and approval email.
              </li>
              <li className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                <span className="font-semibold text-slate-900">Late fee waiver:</span> Needs mentor
                recommendation attached.
              </li>
              <li className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                Upload approvals within 24 hours to sync reports.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/80 p-6 shadow-inner">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Reminder
            </h3>
            <p className="mt-2 text-sm text-indigo-700">
              Quarterly audit scheduled next week. Ensure all approvals are recorded digitally so the
              audit trail stays complete.
            </p>
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Recent adjustments</h2>
            <p className="text-sm text-slate-500">
              These entries feed into the finance report automatically once approved.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Auto-synced to Airtable
          </span>
        </header>
        <div className="grid gap-3 lg:grid-cols-2">
          {adjustmentHistory.map((entry) => (
            <article
              key={entry.id}
              className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {entry.id}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">{entry.student}</h3>
                  <p className="text-xs text-slate-400">{entry.rollNo}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  <Scale className="h-3.5 w-3.5" />
                  {entry.type}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{entry.note}</p>
              <footer className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Approved by {entry.approvedBy}</span>
                <span>{formatDate(entry.date)}</span>
              </footer>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                Adjustment: ₹{entry.amount.toLocaleString('en-IN')}
              </p>
            </article>
          ))}
        </div>
      </section>
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
