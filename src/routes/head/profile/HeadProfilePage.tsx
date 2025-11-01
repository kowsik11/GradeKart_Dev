import { useState, type ComponentType } from 'react'
import { Mail, MapPin, Phone, ShieldCheck, Users } from 'lucide-react'

export function HeadProfilePage() {
  const [bio, setBio] = useState(
    'Leading GradeKart campuses with a focus on academic excellence, student wellbeing, and community partnerships.',
  )

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Leadership profile
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Chief administrator</h1>
        <p className="max-w-3xl text-sm text-slate-500">
          Update your contact information and campus responsibilities. This profile is visible to
          faculty, accounts, and partner schools.
        </p>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-col items-center gap-3 lg:w-64">
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-white text-3xl font-semibold">
              SH
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              Update photo
            </button>
            <p className="text-center text-xs text-slate-500">
              Square image • Min 400x400 • PNG/JPG
            </p>
          </div>
          <div className="flex-1 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <ProfileField label="Full name" value="Dr. Kavya Raman" />
              <ProfileField label="Designation" value="School Head & Director" />
              <ProfileField label="Email" value="chief@gradekart.app" icon={Mail} />
              <ProfileField label="Phone" value="+91 98765 98989" icon={Phone} />
              <ProfileField label="Office location" value="Admin Block • Level 3 • Leadership Suite" icon={MapPin} />
              <ProfileField label="Support contact" value="Executive assistant: +91 99888 77665" icon={Users} />
            </div>
            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Leadership bio
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

      <section className="grid gap-4 md:grid-cols-2">
        <InfoCard
          title="Campus responsibilities"
          items={[
            'Academic board chairperson',
            'Discipline committee lead',
            'Accounts and compliance oversight',
          ]}
        />
        <InfoCard
          title="Upcoming engagements"
          items={[
            'PTM keynote • 05 Nov',
            'Board meeting • 10 Nov',
            'Industry partnership review • 15 Nov',
          ]}
        />
      </section>
    </div>
  )
}

function ProfileField({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon?: ComponentType<{ className?: string }>
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
      {Icon ? <Icon className="h-4 w-4 text-slate-400" /> : null}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
        <input defaultValue={value} className="mt-1 bg-transparent text-sm text-slate-700 focus:outline-none" />
      </div>
    </label>
  )
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
        <ShieldCheck className="h-4 w-4 text-slate-400" />
        {title}
      </p>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}
