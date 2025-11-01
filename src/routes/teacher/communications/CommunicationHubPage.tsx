import { useState } from 'react'
import type { ComponentType } from 'react'
import { CalendarDays, Megaphone, SendHorizonal, Sparkles, Tag } from 'lucide-react'

const audienceOptions = [
  'Entire class',
  'Parents only',
  'Subject group - Mathematics',
  'Sports participants',
  'Hostel residents',
]

const categoryOptions = [
  'Assignment',
  'Quiz',
  'Exam schedule',
  'Events & fests',
  'Fee reminder',
  'General announcement',
]

const recentBroadcasts = [
  {
    title: 'Midterm timetable shared',
    audience: 'Entire class',
    timestamp: 'Sent 1 hour ago',
    category: 'Exam schedule',
  },
  {
    title: 'Science expo practice',
    audience: 'Events & fests',
    timestamp: 'Sent yesterday',
    category: 'Events & fests',
  },
  {
    title: 'Lab journal submission',
    audience: 'Subject group - Physics',
    timestamp: 'Sent 3 days ago',
    category: 'Assignment',
  },
]

export function CommunicationHubPage() {
  const [audience, setAudience] = useState(audienceOptions[0])
  const [category, setCategory] = useState(categoryOptions[0])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Advisor workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Communication Hub</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Send crisp updates for quizzes, assignments, events, fee reminders, or any classroom
            pulse in seconds. Templates and saved audiences keep every broadcast on-brand.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Sparkles className="h-4 w-4" />
          Save template
        </button>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Compose announcement</h2>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Broadcast
            </span>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Audience"
              icon={Megaphone}
              value={audience}
              onChange={setAudience}
              options={audienceOptions}
            />
            <FormField
              label="Category"
              icon={Tag}
              value={category}
              onChange={setCategory}
              options={categoryOptions}
            />
          </div>

          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Subject line
            </span>
            <input className="bg-transparent text-sm text-slate-700 focus:outline-none" defaultValue="Unit test blueprint release" />
          </label>
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Message
            </span>
            <textarea
              rows={5}
              className="resize-none bg-transparent text-sm text-slate-700 focus:outline-none"
              defaultValue="Hi everyone, the Unit Test 2 blueprint and reading list are live on the classroom drive. Please acknowledge before Friday 6 PM. Let me know if you need clarifications."
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Schedule send (optional)
              </span>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                <input
                  type="datetime-local"
                  className="w-full bg-transparent focus:outline-none"
                  defaultValue="2025-10-30T07:30"
                />
              </div>
            </label>
            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Attachments
              </span>
              <input type="file" className="text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition file:hover:bg-slate-800" />
            </label>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            <SendHorizonal className="h-4 w-4" />
            Send announcement
          </button>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Recent broadcasts
            </h3>
            <ul className="mt-4 space-y-3">
              {recentBroadcasts.map((item) => (
                <li key={item.title} className="rounded-2xl border border-slate-100 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <span className="text-xs font-medium text-slate-400">{item.timestamp}</span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    {item.audience}
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {item.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/80 p-6 shadow-inner">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Pro tip
            </h3>
            <p className="mt-2 text-sm text-indigo-700">
              Save frequently used broadcasts as templates. GradeKart will pre-fill the message and
              attachments so you can schedule it in one click next time.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}

interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  icon: ComponentType<{ className?: string }>
}

function FormField({ label, value, onChange, options, icon: Icon }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-400" />
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </label>
  )
}
