import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ShieldCheck, Wallet } from 'lucide-react'
import type { FeeRecord } from '@/routes/student/fees/data'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export interface PayOutstandingButtonProps {
  record: FeeRecord
  studentRollNo?: string
  studentName?: string
  redirectPath: string
}

export function PayOutstandingButton({
  record,
  studentRollNo = 'GK2025-001',
  studentName = 'Student',
  redirectPath,
}: PayOutstandingButtonProps) {
  const outstanding = useMemo(
    () => Math.max(record.amountDue - record.amountPaid, 0),
    [record.amountDue, record.amountPaid],
  )
  const navigate = useNavigate()
  const location = useLocation()

  if (outstanding <= 0) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
        <ShieldCheck className="h-3.5 w-3.5" />
        Settled
      </span>
    )
  }

  const handleNavigate = () => {
    navigate(redirectPath, {
      state: {
        record,
        studentRollNo,
        studentName,
        from: location.pathname,
      },
    })
  }

  return (
    <button
      type="button"
      onClick={handleNavigate}
      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
    >
      <Wallet className="h-3.5 w-3.5" />
      Pay {currencyFormatter.format(outstanding)}
    </button>
  )
}
