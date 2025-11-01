import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FeePaymentPage } from '@/features/payments/FeePaymentPage'
import type { FeeRecord } from '@/routes/student/fees/data'
import { useParentIdentity } from '@/routes/parent/hooks/useParentIdentity'

type PaymentState = {
  record: FeeRecord
  studentRollNo?: string
  studentName?: string
  from?: string
}

export function ParentFeePaymentCheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const fallbackIdentity = useParentIdentity()
  const state = location.state as PaymentState | undefined

  if (!state?.record) {
    return <Navigate to="/parent/fees" replace />
  }

  const studentRollNo = state.studentRollNo ?? fallbackIdentity.studentRollNo
  const studentName = state.studentName ?? fallbackIdentity.studentName
  const backPath = state.from ?? '/parent/fees'

  return (
    <FeePaymentPage
      heading="Finish fee payment"
      description="Select a payment mode to clear the outstanding amount. Payment confirmations are instantly shared with the accounts team."
      record={state.record}
      studentRollNo={studentRollNo}
      studentName={studentName}
      onCancel={() => navigate(backPath)}
      onSuccess={() => navigate(backPath, { replace: true })}
    />
  )
}

