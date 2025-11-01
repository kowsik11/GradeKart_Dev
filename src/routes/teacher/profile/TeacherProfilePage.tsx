import { useState } from 'react'
import type { ComponentType } from 'react'
import { Camera, FileText, Mail, MapPin, Phone } from 'lucide-react'

export function TeacherProfilePage() {
  const [bio, setBio] = useState(
    'Advisor for Class XI MPC. Passionate about project-based learning and student wellbeing.',
  )

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Faculty profile
        </p>
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="max-w-3xl text-sm text-slate-500">
          Keep your contact, advisory responsibilities, and academic interests up to date. Students
          and administrators rely on this information for collaboration.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-col items-center gap-3 lg:w-64">
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-white">
              MN
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <Camera className="h-3.5 w-3.5" />
              Update photo
            </button>
            <div className="text-center text-xs text-slate-500">
              Square image • Min 400x400 • PNG/JPG
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileItem label="Full name" value="Prof. Meera Nair" />
              <ProfileItem label="Designation" value="Assistant Professor, Mathematics" />
              <ProfileItem label="Campus email" value="meera.nair@gkcampus.edu" icon={Mail} />
              <ProfileItem label="Phone" value="+91 90000 77777" icon={Phone} />
              <ProfileItem label="Advisor cohort" value="Class XI - MPC" />
              <ProfileItem label="Staff ID" value="GK-MATH-1245" />
              <ProfileItem label="Cabin location" value="Block A • Floor 2 • Cabin 214" icon={MapPin} />
              <ProfileItem label="Office hours" value="Mon to Thu • 3:30 PM to 5:00 PM" />
            </div>
            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Bio & highlights
              </span>
              <textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                rows={4}
                className="resize-none bg-transparent text-sm text-slate-700 focus:outline-none"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <InfoCard
          title="Academic portfolio"
          icon={FileText}
          items={[
            { label: 'Courses this term', value: 'Calculus II, Applied Statistics' },
            { label: 'Clubs mentored', value: 'Mathletes, Robotics' },
            { label: 'Research focus', value: 'Mathematical modelling for sustainability' },
          ]}
        />
        <InfoCard
          title="Upcoming engagements"
          icon={CalendarEventIcon}
          items={[
            { label: 'Parent meeting', value: '05 Nov • 4:00 PM' },
            { label: 'Quiz briefing', value: '01 Nov • 1:30 PM' },
            { label: 'Wellbeing circle', value: 'Every Fri • 3:30 PM' },
          ]}
        />
      </section>
    </div>
  )
}

interface ProfileItemProps {
  label: string
  value: string
  icon?: ComponentType<{ className?: string }>
}

function ProfileItem({ label, value, icon: Icon }: ProfileItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-inner">
      {Icon ? <Icon className="h-4 w-4 text-slate-400" /> : null}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
        <p className="mt-1 text-sm text-slate-700">{value}</p>
      </div>
    </div>
  )
}

interface InfoCardProps {
  title: string
  icon: ComponentType<{ className?: string }>
  items: Array<{ label: string; value: string }>
}

function InfoCard({ title, icon: Icon, items }: InfoCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <Icon className="h-5 w-5" />
        </span>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">{title}</p>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.label} className="rounded-2xl border border-slate-100 px-4 py-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{item.label}:</span> {item.value}
          </li>
        ))}
      </ul>
    </article>
  )
}

function CalendarEventIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className ?? 'h-5 w-5'}
    >
      <path d="M7 3v4" />
      <path d="M17 3v4" />
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 11h17" />
      <path d="M15 15h-2a1 1 0 0 0-1 1v2" />
      <path d="M9 15h.01" />
    </svg>
  )
}
