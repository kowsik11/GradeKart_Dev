import { useCallback, useEffect, useState } from 'react'
import { env } from '@/config/env'

const RAZORPAY_SDK_URL = 'https://checkout.razorpay.com/v1/checkout.js'

export interface RazorpayCheckoutOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id?: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  notes?: Record<string, string>
  handler?: (response: RazorpaySuccessResponse) => void
  modal?: {
    ondismiss?: () => void
  }
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export function useRazorpayCheckout() {
  const [sdkReady, setSdkReady] = useState<boolean>(() => {
    return typeof window !== 'undefined' && !!window.Razorpay
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sdkReady) {
      return
    }

    const script = document.createElement('script')
    script.src = RAZORPAY_SDK_URL
    script.async = true
    script.onload = () => {
      setSdkReady(true)
      setError(null)
    }
    script.onerror = () => {
      setError('Unable to load Razorpay checkout. Please try again later.')
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [sdkReady])

  const openCheckout = useCallback(
    (options: Omit<RazorpayCheckoutOptions, 'key'>) => {
      if (!env.razorpayKeyId) {
        throw new Error(
          'Razorpay key missing. Set VITE_RAZORPAY_KEY_ID to enable payments.',
        )
      }

      if (!sdkReady || typeof window === 'undefined' || !window.Razorpay) {
        throw new Error('Payment gateway is still loading. Please try again.')
      }

      const checkout = new window.Razorpay({
        ...options,
        key: env.razorpayKeyId,
      })
      checkout.open()
    },
    [sdkReady],
  )

  return {
    sdkReady,
    error,
    openCheckout,
  }
}

