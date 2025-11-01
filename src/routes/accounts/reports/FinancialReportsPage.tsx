import { Download, FileSpreadsheet, PieChart, TrendingUp } from 'lucide-react'

const reportCards = [
  {
    title: 'Fee collection summary',
    description: 'Breakdown by class, mode of payment, and instalment cycle for the selected period.',
    icon: TrendingUp,
  },
  {
    title: 'Outstanding ledger',
    description: 'Track pending dues, follow-up notes, and escalation timeline.',
    icon: PieChart,
  },
  {
    title: 'Scholarship utilisation',
    description: 'Snapshot of scholarships, waivers, and special adjustments applied this term.',
    icon: FileSpreadsheet,
  },
]

export function FinancialReportsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Reporting workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Financial Reports</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Export ready-to-share statements for management review, audits, or statutory compliance.
            Reports reference the latest ledger data.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Download className="h-4 w-4" />
          Download all
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((card) => {
          const Icon = card.icon
          return (
            <article
              key={card.title}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-100 opacity-0 transition hover:opacity-100" />
              <div className="relative space-y-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
                <p className="text-sm text-slate-500">{card.description}</p>
                <button
                  type="button"
                  className="text-sm font-semibold text-slate-900 transition hover:text-indigo-600"
                >
                  {'Generate report ->'}
                </button>
              </div>
            </article>
          )
        })}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Scheduled exports</h2>
        <p className="mt-1 text-sm text-slate-500">
          Auto-emails are sent to leadership every Monday at 9 AM. Update recipients to keep the
          distribution list fresh.
        </p>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-900">Weekly finance deck</p>
              <p className="text-xs text-slate-400">Recipients: principal@gradekart.edu, finance.head@gradekart.edu</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Manage
            </button>
          </li>
          <li className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-900">Monthly board summary</p>
              <p className="text-xs text-slate-400">Recipients: board.office@gradekart.edu</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Manage
            </button>
          </li>
        </ul>
      </section>
    </div>
  )
}

