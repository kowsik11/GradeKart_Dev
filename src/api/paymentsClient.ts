import { env } from '@/config/env'

export interface PaymentIntentPayload {
  amount: number
  currency?: string
  description?: string
  receipt?: string
  studentRollNo?: string
  studentName?: string
  parentEmail?: string
  parentPhone?: string
}

export interface PaymentOrderResponse {
  orderId: string
  amount: number
  currency: string
  status: 'created' | 'mock'
}

export async function createPaymentIntent(
  payload: PaymentIntentPayload,
): Promise<PaymentOrderResponse> {
  try {
    const response = await fetch(`${env.paymentsApiUrl}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Unable to create payment intent: ${response.status}`)
    }

    const data = (await response.json()) as PaymentOrderResponse
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Falling back to mock payment order', error)
    return {
      orderId: `mock_${Date.now()}`,
      amount: payload.amount,
      currency: payload.currency ?? 'INR',
      status: 'mock',
    }
  }
}

export async function notifyPaymentResult({
  orderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  orderId: string
  razorpayPaymentId?: string
  razorpaySignature?: string
}) {
  try {
    const response = await fetch(`${env.paymentsApiUrl}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        razorpayPaymentId,
        razorpaySignature,
      }),
    })

    if (!response.ok) {
      throw new Error(`Unable to notify payment result: ${response.status}`)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Payment capture notification failed (mock mode)', error)
  }
}

