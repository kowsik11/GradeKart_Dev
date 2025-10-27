const { VITE_AIRTABLE_API_KEY, VITE_AIRTABLE_BASE_ID } = import.meta.env

export const env = {
  airtableApiKey: VITE_AIRTABLE_API_KEY ?? '',
  airtableBaseId: VITE_AIRTABLE_BASE_ID ?? '',
}

if (!env.airtableApiKey || !env.airtableBaseId) {
  // eslint-disable-next-line no-console
  console.warn(
    'Missing Airtable environment variables. GradeKart requires VITE_AIRTABLE_API_KEY and VITE_AIRTABLE_BASE_ID to be set.',
  )
}
