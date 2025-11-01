const {
  VITE_AIRTABLE_API_KEY,
  VITE_AIRTABLE_BASE_ID,
  VITE_RAZORPAY_KEY_ID,
  VITE_PAYMENTS_API_URL,
} = import.meta.env

export const env = {
  airtableApiKey: VITE_AIRTABLE_API_KEY ?? '',
  airtableBaseId: VITE_AIRTABLE_BASE_ID ?? '',
  razorpayKeyId: VITE_RAZORPAY_KEY_ID ?? '',
  paymentsApiUrl: VITE_PAYMENTS_API_URL ?? '/api/payments',
}

if (!env.airtableApiKey || !env.airtableBaseId) {
  // eslint-disable-next-line no-console
  console.warn(
    'Missing Airtable environment variables. GradeKart requires VITE_AIRTABLE_API_KEY and VITE_AIRTABLE_BASE_ID to be set.',
  )
}

if (!env.razorpayKeyId) {
  // eslint-disable-next-line no-console
  console.warn(
    'Payment gateway key (VITE_RAZORPAY_KEY_ID) is not configured. Fee payments will run in simulation mode.',
  )
}
