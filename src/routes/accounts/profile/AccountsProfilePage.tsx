import { useState, type ComponentType } from 'react'
import { Mail, MapPin, Phone, Shield, UserCircle } from 'lucide-react'

export function AccountsProfilePage() {
  const [notes, setNotes] = useState(
    'Handles daily collections, reconciliations, and monthly reporting for GradeKart campuses.',
  )

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Accounts profile
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Finance Desk Profile</h1>
        <p className="max-w-3xl text-sm text-slate-500">
          Update contact details, office hours, and escalation matrix so parents and faculty know
          how to reach the accounts desk.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-col items-center gap-3 lg:w-64">
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-white">
              <UserCircle className="h-10 w-10" />
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              Update photo
            </button>
            <div className="text-center text-xs text-slate-500">
              Display contact images in 400x400 resolution for clarity.
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileField label="Team name" value="GradeKart Accounts Desk" readOnly />
              <ProfileField label="Desk lead" value="Ms. Kavya Sharma" />
              <ProfileField label="Email" value="accounts@gradekart.app" icon={Mail} />
              <ProfileField label="Phone" value="+91 98765 45454" icon={Phone} />
              <ProfileField label="Office hours" value="Mon - Fri • 9:00 AM - 5:30 PM" />
              <ProfileField label="Escalation head" value="Finance Controller - Mr. Ajay Rao" icon={Shield} />
              <ProfileField label="Office location" value="Admin Block • Level 1 • Finance Wing" icon={MapPin} />
              <ProfileField label="Support channel" value="WhatsApp hotline: +91 99887 76655" />
            </div>
            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Desk notes
              </span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                className="resize-none bg-transparent text-sm text-slate-700 focus:outline-none"
              />
            </label>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ProfileFieldProps {
  label: string
  value: string
  readOnly?: boolean
  icon?: ComponentType<{ className?: string }>
}

function ProfileField({ label, value, readOnly = false, icon: Icon }: ProfileFieldProps) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
      {Icon ? <Icon className="h-4 w-4 text-slate-400" /> : null}
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
        <input
          defaultValue={value}
          readOnly={readOnly}
          className="mt-1 w-full bg-transparent text-sm text-slate-700 focus:outline-none"
        />
      </div>
    </label>
  )
}
