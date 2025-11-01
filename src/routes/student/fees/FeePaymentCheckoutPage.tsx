import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FeePaymentPage } from '@/features/payments/FeePaymentPage'
import type { FeeRecord } from '@/routes/student/fees/data'

type PaymentState = {
  record: FeeRecord
  studentRollNo: string
  studentName: string
  from?: string
}

export function StudentFeePaymentCheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as PaymentState | undefined

  if (!state?.record) {
    return <Navigate to="/student/fees/dues" replace />
  }

  const backPath = state.from ?? '/student/fees/dues'

  return (
    <FeePaymentPage
      heading="Complete your fee payment"
      description="Select a preferred payment method and process the outstanding amount instantly. Receipts are shared with the accounts desk automatically."
      record={state.record}
      studentRollNo={state.studentRollNo}
      studentName={state.studentName}
      onCancel={() => navigate(backPath)}
      onSuccess={() => navigate(backPath, { replace: true })}
    />
  )
}

