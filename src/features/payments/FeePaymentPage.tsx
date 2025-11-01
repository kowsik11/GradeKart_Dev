import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  CreditCard,
  Loader2,
  Smartphone,
  Wallet2,
} from 'lucide-react'
import { env } from '@/config/env'
import {
  createPaymentIntent,
  notifyPaymentResult,
} from '@/api/paymentsClient'
import { useRazorpayCheckout } from '@/features/payments/useRazorpayCheckout'
import type { FeeRecord } from '@/routes/student/fees/data'

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const paymentMethods = [
  {
    id: 'upi',
    label: 'UPI Apps / UPI ID',
    description: 'Google Pay, PhonePe, pay via UPI ID or QR code.',
    icon: Smartphone,
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    description: 'Visa, Mastercard, RuPay, American Express.',
    icon: CreditCard,
  },
  {
    id: 'netbanking',
    label: 'Netbanking',
    description: 'Pay using your Internet Banking credentials.',
    icon: Banknote,
  },
  {
    id: 'wallet',
    label: 'Wallets & Buy Now Pay Later',
    description: 'Paytm Wallet, Amazon Pay, LazyPay and more.',
    icon: Wallet2,
  },
]

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed'

interface FeePaymentPageProps {
  heading: string
  description: string
  record: FeeRecord
  studentRollNo: string
  studentName: string
  onCancel: () => void
  onSuccess?: () => void
}

export function FeePaymentPage({
  heading,
  description,
  record,
  studentRollNo,
  studentName,
  onCancel,
  onSuccess,
}: FeePaymentPageProps) {
  const outstanding = useMemo(
    () => Math.max(record.amountDue - record.amountPaid, 0),
    [record.amountDue, record.amountPaid],
  )
  const [method, setMethod] = useState(paymentMethods[0].id)
  const [status, setStatus] = useState<PaymentStatus>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const hasGatewayKey = Boolean(env.razorpayKeyId)
  const { sdkReady, error: sdkError, openCheckout } = useRazorpayCheckout()

  const handlePayNow = async () => {
    if (outstanding <= 0 || status === 'processing') {
      return
    }
    setStatus('processing')
    setMessage(null)

    try {
      const order = await createPaymentIntent({
        amount: outstanding * 100,
        currency: 'INR',
        description: record.item,
        receipt: record.id,
        studentRollNo,
        studentName,
      })

      if (hasGatewayKey) {
        if (!sdkReady) {
          throw new Error('Payment gateway is still loading. Please wait a moment.')
        }
        openCheckout({
          amount: order.amount,
          currency: order.currency,
          name: 'GradeKart Fee Payment',
          description: record.item,
          order_id: order.orderId,
          notes: {
            recordId: record.id,
            category: record.category,
            preferred_method: method,
          },
          prefill: {
            name: studentName,
          },
          handler: async (response) => {
            await notifyPaymentResult({
              orderId: order.orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            })
            setStatus('success')
            setMessage('Payment captured successfully. Accounts will refresh with the updated ledger.')
          },
          modal: {
            ondismiss: () => {
              setStatus('idle')
              setMessage('Checkout dismissed. You can try again anytime.')
            },
          },
        })
        return
      }

      // Mock/test mode
      await notifyPaymentResult({ orderId: order.orderId })
      setStatus('success')
      setMessage(
        'Payment simulated in test mode. Configure VITE_RAZORPAY_KEY_ID to enable live collections.',
      )
    } catch (error) {
      setStatus('failed')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Unable to start the payment. Please try again later.',
      )
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-slate-900">{heading}</h1>
        <p className="max-w-2xl text-sm text-slate-500">{description}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">{record.item}</h2>
            <p className="text-sm text-slate-500">
              Register number {studentRollNo} &bull; {studentName}
            </p>
          </header>
          <div className="grid gap-3 md:grid-cols-3">
            <SummaryCard label="Amount due" value={currencyFormatter.format(record.amountDue)} />
            <SummaryCard
              label="Amount paid"
              value={currencyFormatter.format(record.amountPaid)}
              tone="emerald"
            />
            <SummaryCard
              label="Outstanding"
              value={currencyFormatter.format(outstanding)}
              tone={outstanding > 0 ? 'amber' : 'slate'}
            />
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-xs text-slate-500">
            Billing cycle {record.cycle} &bull; Due on {formatDate(record.dueDate)}
          </div>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              Choose payment method
            </h3>
            <div className="grid gap-3">
              {paymentMethods.map((option) => {
                const Icon = option.icon
                const active = option.id === method
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setMethod(option.id)}
                    className={`flex w-full items-center gap-4 rounded-3xl border px-4 py-4 text-left transition ${
                      active
                        ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        active ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{option.label}</p>
                      <p
                        className={`text-xs ${
                          active ? 'text-slate-200/80' : 'text-slate-500'
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {message ? (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                status === 'failed'
                  ? 'border-rose-200 bg-rose-50 text-rose-600'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-600'
              }`}
            >
              {message}
            </div>
          ) : null}

          {hasGatewayKey ? null : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-500">
              Payments currently run in mock mode. Configure <code>VITE_RAZORPAY_KEY_ID</code> to
              enable live collections.
            </div>
          )}

          {sdkError && hasGatewayKey ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-600">
              {sdkError} Refresh the page or contact support if this persists.
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100"
            >
              Cancel
            </button>
            {status !== 'success' ? (
              <button
                type="button"
                onClick={handlePayNow}
                disabled={
                  status === 'processing' ||
                  outstanding <= 0 ||
                  (!!hasGatewayKey && !sdkReady)
                }
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'processing' ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet2 className="h-3.5 w-3.5" />
                    Pay {currencyFormatter.format(outstanding)}
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={onSuccess}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600 shadow-sm transition hover:bg-emerald-100"
              >
                <BadgeCheck className="h-3.5 w-3.5" />
                Back to fee summary
              </button>
            )}
          </div>
        </article>

        <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Secure checkout
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <BadgeCheck className="h-4 w-4 text-emerald-500" />
              Razorpay-powered encrypted transactions.
            </li>
            <li className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <BadgeCheck className="h-4 w-4 text-emerald-500" />
              Instant confirmation shared with accounts desk.
            </li>
            <li className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <BadgeCheck className="h-4 w-4 text-emerald-500" />
              Downloadable receipts after successful payment.
            </li>
          </ul>
        </aside>
      </section>
    </div>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function SummaryCard({
  label,
  value,
  tone = 'slate',
}: {
  label: string
  value: string
  tone?: 'slate' | 'emerald' | 'amber'
}) {
  const toneClasses: Record<typeof tone, string> = {
    slate: 'bg-slate-900 text-white',
    emerald: 'bg-emerald-600/15 text-emerald-700 border border-emerald-200',
    amber: 'bg-amber-500/15 text-amber-700 border border-amber-200',
  }

  return (
    <div className={`rounded-2xl px-4 py-3 text-sm font-semibold ${toneClasses[tone]}`}>
      <p className="text-xs uppercase tracking-[0.2em] text-white/80">{label}</p>
      <p className="mt-1 text-base">{value}</p>
    </div>
  )
}
