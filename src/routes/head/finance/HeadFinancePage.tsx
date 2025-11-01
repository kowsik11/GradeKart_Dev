import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, PieChart, Wallet } from 'lucide-react'

const financeTabs = ['Overview', 'Collections', 'Scholarships', 'Expenses']

const feeSummary = [
  { label: 'Billed', value: '₹1.84 Cr', change: '+6.4% vs LY', tone: 'text-slate-900' },
  { label: 'Collected', value: '₹1.28 Cr', change: '+4.2% vs LY', tone: 'text-emerald-600' },
  { label: 'Pending', value: '₹56.4 L', change: '-1.1% vs LY', tone: 'text-amber-600' },
]

const collectionModes = [
  { mode: 'UPI / Net banking', share: '54%' },
  { mode: 'Cash desk', share: '18%' },
  { mode: 'Cheque / DD', share: '12%' },
  { mode: 'Scholarship adjustments', share: '8%' },
  { mode: 'Other', share: '8%' },
]

export function HeadFinancePage() {
  const [tab, setTab] = useState(financeTabs[0])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Finance oversight
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Accounts snapshot</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Monitor campus collections, dues, scholarships, and spending before leadership reviews.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <Wallet className="h-3.5 w-3.5" />
          Updated 12 mins ago
        </span>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {financeTabs.map((item) => {
            const active = item === tab
            return (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {feeSummary.map((item) => (
          <article key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {item.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
            <p className={`mt-1 text-xs font-semibold ${item.tone}`}>{item.change}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Collections trend</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +8.4% quarter growth
            </span>
          </header>
          <p className="mt-2 text-sm text-slate-500">
            Collections steadily trending upward with minor dips during festive weeks. Hostel fee recovery
            improved after October reminders.
          </p>
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center text-sm text-slate-500">
            Graph placeholder &mdash; plug analytics once charts are ready.
          </div>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Collection mix</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              <PieChart className="h-3.5 w-3.5" />
              Consolidated
            </span>
          </header>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {collectionModes.map((mode) => (
              <li key={mode.mode} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
                <span>{mode.mode}</span>
                <span className="font-semibold text-slate-900">{mode.share}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Scholarships this term
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
              <span>Merit scholarships</span>
              <span className="font-semibold text-slate-900">₹12.4 L</span>
            </li>
            <li className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
              <span>Sports quota</span>
              <span className="font-semibold text-slate-900">₹3.2 L</span>
            </li>
            <li className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
              <span>Staff wards</span>
              <span className="font-semibold text-slate-900">₹2.1 L</span>
            </li>
          </ul>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Expense watchlist
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
              <span>Transport maintenance</span>
              <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                <ArrowUpRight className="h-3.5 w-3.5" />
                +9% vs budget
              </span>
            </li>
            <li className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
              <span>Lab consumables</span>
              <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                <ArrowDownRight className="h-3.5 w-3.5" />
                -3% vs budget
              </span>
            </li>
          </ul>
        </article>
      </section>
    </div>
  )
}
