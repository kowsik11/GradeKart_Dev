import { useState } from 'react'
import { MessageSquare, SendHorizonal } from 'lucide-react'

const faqItems = [
  {
    question: 'How do I sync attendance from the biometric device?',
    answer:
      'Go to Attendance Register > Upload > Browse the CSV exported from biometric panel. GradeKart maps the roll numbers automatically.',
  },
  {
    question: 'Can I schedule announcements?',
    answer:
      'Yes. While composing an announcement use the Schedule send option. Select date and time and GradeKart will auto-dispatch.',
  },
  {
    question: 'Where do I download the class counselling report?',
    answer:
      'Visit Class Advisory > Export meeting sheet. You can download a PDF summary or the raw spreadsheet.',
  },
]

export function SupportDeskPage() {
  const [message, setMessage] = useState('')

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Faculty help centre
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Support Desk</h1>
        <p className="max-w-3xl text-sm text-slate-500">
          Raise tickets, chat with the GradeKart admin team, or browse quick answers. We keep the
          advisor operations humming throughout the term.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Create a ticket</h2>
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Describe the issue
            </span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              placeholder="Share context, screenshots, or steps to reproduce."
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
            <SendHorizonal className="h-4 w-4" />
            Submit ticket
          </button>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Quick answers
            </h3>
            <ul className="mt-4 space-y-3">
              {faqItems.map((item) => (
                <li key={item.question} className="rounded-2xl border border-slate-100 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">{item.question}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-6 shadow-inner">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Need a quick call?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Reach the campus GradeKart coordinator at +91 98765 43210 between 8 AM and 6 PM.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Start live chat
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}
