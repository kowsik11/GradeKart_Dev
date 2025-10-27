import { useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, Clock, UserCircle2 } from 'lucide-react'
import {
  studentProfileSnapshot,
  type ProfileSection,
  type ProfileTabId,
} from '@/routes/student/profile/data'
import { cn } from '@/lib/utils'

export function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTabId>('personal')

  const { sections, completionPercentage, requiredFields } = studentProfileSnapshot

  const missingFields = useMemo(() => {
    const normalizedRequired = requiredFields.map((field) => field.toLowerCase())
    return sections
      .flatMap((section) => section.items)
      .filter((item) => !item.value || item.value.trim().length === 0)
      .filter((item) => normalizedRequired.includes(item.label.toLowerCase()))
  }, [sections, requiredFields])

  const profileComplete = missingFields.length === 0

  const activeSection = sections.find((section) => section.id === activeTab) ?? sections[0]

  return (
    <div className="space-y-6">
      <HeaderCard completion={completionPercentage} isComplete={profileComplete} />

      {!profileComplete ? (
        <CompletionAlert missingFields={missingFields.map((item) => item.label)} />
      ) : (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 px-6 py-4 text-sm text-emerald-700 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            All your critical profile details are up to date. Great job!
          </div>
        </div>
      )}

      <nav className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActiveTab(section.id)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-semibold transition',
              section.id === activeTab
                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
            )}
          >
            {section.title}
          </button>
        ))}
      </nav>

      <SectionCard section={activeSection} requiredFields={requiredFields} />

      <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Need to update something?</p>
          <p className="text-xs text-slate-500">
            Reach out to the registrar desk or submit a request to amend your personal records.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Request profile update
        </button>
      </div>
    </div>
  )
}

function HeaderCard({
  completion,
  isComplete,
}: {
  completion: number
  isComplete: boolean
}) {
  const snapshot = studentProfileSnapshot
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white shadow-lg">
            {snapshot.avatarInitials}
          </span>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{snapshot.studentName}</h1>
            <p className="text-sm text-slate-500">
              {snapshot.rollNumber} • {snapshot.programme}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              Last updated on {formatDate(snapshot.lastUpdated)}
            </div>
          </div>
        </div>
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            <span>Profile completeness</span>
            <span>{completion}%</span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-slate-100">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                isComplete ? 'bg-emerald-500' : 'bg-indigo-500'
              )}
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function CompletionAlert({ missingFields }: { missingFields: string[] }) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50/70 px-6 py-5 text-sm text-amber-800 shadow-sm">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="space-y-2">
          <p className="font-semibold text-amber-900">Action needed</p>
          <p className="text-xs text-amber-700">
            Complete the pending fields below so your records remain compliant. Incomplete data may
            delay hall ticket issuance.
          </p>
          <ul className="list-disc space-y-1 pl-4 text-xs">
            {missingFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function SectionCard({
  section,
  requiredFields,
}: {
  section: ProfileSection
  requiredFields: string[]
}) {
  const requiredLower = requiredFields.map((field) => field.toLowerCase())
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
          <p className="text-sm text-slate-500">{section.description}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <UserCircle2 className="h-4 w-4" />
          Student record
        </span>
      </header>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {section.items.map((item) => {
          const isRequired = requiredLower.includes(item.label.toLowerCase())
          const isMissing = !item.value || item.value.trim().length === 0
          return (
            <article
              key={item.label}
              className={cn(
                'rounded-2xl border px-4 py-4',
                isMissing ? 'border-amber-200 bg-amber-50/60' : 'border-slate-200 bg-slate-50/80'
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {isMissing ? 'Information not provided' : item.value}
              </p>
              {isMissing && isRequired ? (
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-700">
                  <AlertTriangle className="h-3 w-3" />
                  Required to complete profile
                </span>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
