import { useState } from 'react'
import { Clock, Megaphone, Paperclip, Send, TrendingUp } from 'lucide-react'

const announcementFeed = [
  {
    id: 'ANN-301',
    title: 'PTM slots released',
    description: 'Parents can choose preferred slot for 5 Nov between 3 PM and 6 PM.',
    time: 'Published 2 hours ago',
    category: 'Parent connect',
  },
  {
    id: 'ANN-298',
    title: 'Unit test 2 blueprint',
    description: 'Topics regrouped per updated academic calendar. Uploads live on portal.',
    time: 'Published yesterday',
    category: 'Exam',
  },
  {
    id: 'ANN-294',
    title: 'Sports day rehearsals',
    description: 'Participants report at 7 AM on 2 Nov. House mentors have the roster.',
    time: 'Published 3 days ago',
    category: 'Events',
  },
]

export function AnnouncementsPage() {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Advisor workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Announcements</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Chronicle classroom events, exam updates, and parent connects in one place. Every memo
            reaches students and guardians instantly.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          <TrendingUp className="h-3.5 w-3.5" />
          Weekly reach 96%
        </span>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Draft announcement</h2>
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Headline
            </span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter announcement headline"
              className="bg-transparent text-sm text-slate-700 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Details
            </span>
            <textarea
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              rows={4}
              placeholder="Provide context, schedule, and next steps."
              className="resize-none bg-transparent text-sm text-slate-700 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Attachments
            </span>
            <input type="file" className="text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition file:hover:bg-slate-800" />
          </label>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Send className="h-4 w-4" />
            Publish announcement
          </button>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Latest updates
            </h3>
            <ul className="mt-4 space-y-3">
              {announcementFeed.map((item) => (
                <li key={item.id} className="rounded-2xl border border-slate-100 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    <Megaphone className="h-3.5 w-3.5" />
                    {item.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-6 shadow-inner">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Attachment policy
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Keep PDFs under 5 MB. GradeKart automatically adds watermarking and parent signatures
              when downloading from the app.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              <Paperclip className="h-3.5 w-3.5" />
              View template pack
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}

