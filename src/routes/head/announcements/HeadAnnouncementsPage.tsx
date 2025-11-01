import { useState } from 'react'
import { Building, Megaphone, Send, Upload } from 'lucide-react'

const recentAnnouncements = [
  {
    id: 'ANN-H-210',
    title: 'Transport fee instalment reminder',
    audience: 'All students & parents',
    publishedAt: '2025-10-26 08:00 AM',
  },
  {
    id: 'ANN-H-208',
    title: 'Inter-school sports conclave',
    audience: 'Sports committee',
    publishedAt: '2025-10-24 04:30 PM',
  },
  {
    id: 'ANN-H-205',
    title: 'Faculty wellbeing workshop',
    audience: 'All faculty',
    publishedAt: '2025-10-21 05:45 PM',
  },
]

const audiences = [
  'All students & parents',
  'Only faculty',
  'Only parents',
  'Class advisors',
  'Accounts team',
  'Transport staff',
]

export function HeadAnnouncementsPage() {
  const [selectedAudience, setSelectedAudience] = useState(audiences[0])
  const [headline, setHeadline] = useState('')
  const [details, setDetails] = useState('')

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Campus communications
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Leadership announcements</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Send circulars, transport alerts, or community updates that reach every stakeholder in
            seconds.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          <Megaphone className="h-3.5 w-3.5" />
          Sent via GradeKart Broadcast
        </span>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Audience
              </span>
              <select
                value={selectedAudience}
                onChange={(event) => setSelectedAudience(event.target.value)}
                className="bg-transparent text-sm text-slate-700 focus:outline-none"
              >
                {audiences.map((audience) => (
                  <option key={audience} value={audience}>
                    {audience}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Campus group
              </span>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Building className="h-4 w-4 text-slate-400" />
                GradeKart Main Campus
              </div>
            </label>
          </div>

          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Headline
            </span>
            <input
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
              placeholder="Circular title"
              className="bg-transparent text-sm text-slate-700 focus:outline-none"
              required
            />
          </label>

          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Details
            </span>
            <textarea
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              rows={5}
              placeholder="Outline the purpose, schedule, and action required."
              className="resize-none bg-transparent text-sm text-slate-700 focus:outline-none"
              required
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Attachments
              </span>
              <input
                type="file"
                className="text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition file:hover:bg-slate-800"
              />
            </label>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-inner">
              Announcements are archived automatically. Parents receive emails and in-app push alerts.
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Send className="h-4 w-4" />
            Publish announcement
          </button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Recent broadcasts
            </h3>
            <ul className="mt-3 space-y-3">
              {recentAnnouncements.map((item) => (
                <li key={item.id} className="rounded-2xl border border-slate-100 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {item.id}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.audience}</p>
                  <p className="text-xs text-slate-400">{item.publishedAt}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-6 shadow-inner">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Tips
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Keep announcements crisp with clear action items. Attach PDFs for circulars requiring
              parent acknowledgement.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              <Upload className="h-3.5 w-3.5" />
              View templates
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}
