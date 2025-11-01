import type { ComponentType } from 'react'
import { Download, Printer, Share2 } from 'lucide-react'

const receiptBatches = [
  {
    id: 'RCPT-1834',
    student: 'Aarav N',
    rollNo: 'GK2025-001',
    amount: 45000,
    category: 'Tuition',
    mode: 'UPI',
    teller: 'Ramesh',
    date: '2025-10-27',
  },
  {
    id: 'RCPT-1835',
    student: 'Bhavana S',
    rollNo: 'GK2025-002',
    amount: 18000,
    category: 'Transport',
    mode: 'Net Banking',
    teller: 'Ramesh',
    date: '2025-10-27',
  },
  {
    id: 'RCPT-1836',
    student: 'Chirag P',
    rollNo: 'GK2025-003',
    amount: 12000,
    category: 'Lab Fee',
    mode: 'Cash',
    teller: 'Divya',
    date: '2025-10-26',
  },
]

export function ReceiptsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Receipt workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Receipt Library</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Download, print, or share receipts with parents instantly. GradeKart stores a digital
            twin for every transaction.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
        >
          <Share2 className="h-4 w-4" />
          Share portal link
        </button>
      </header>

      <section className="space-y-3">
        {receiptBatches.map((receipt) => (
          <article
            key={receipt.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {receipt.id}
                </p>
                <h2 className="text-xl font-semibold text-slate-900">{receipt.student}</h2>
                <p className="text-sm text-slate-500">{receipt.rollNo}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Amount
                </p>
                <p className="text-2xl font-semibold text-slate-900">
                  ₹{receipt.amount.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-slate-400">{receipt.category}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <InfoRow label="Mode" value={receipt.mode} />
              <InfoRow label="Teller" value={receipt.teller} />
              <InfoRow label="Date" value={formatDate(receipt.date)} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <ActionButton icon={Download} label="Download PDF" />
              <ActionButton icon={Printer} label="Print" />
              <ActionButton icon={Share2} label="Email receipt" />
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function ActionButton({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
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
