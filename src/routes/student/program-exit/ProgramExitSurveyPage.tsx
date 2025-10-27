import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Sparkles } from 'lucide-react'
import { exitSurveyQuestions, ratingScale } from '@/routes/student/program-exit/data'
import { cn } from '@/lib/utils'

const initialRatings = Object.fromEntries(exitSurveyQuestions.map((question) => [question.id, '']))

export function ProgramExitSurveyPage() {
  const [isSurveyEnabled] = useState(true) // toggle once advisor unlocks; mock true for now
  const [ratings, setRatings] = useState<Record<string, string>>(initialRatings)
  const [comments, setComments] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const completionPercentage = useMemo(() => {
    const answered = Object.values(ratings).filter(Boolean).length
    return Math.round((answered / exitSurveyQuestions.length) * 100)
  }, [ratings])

  const canSubmit = isSurveyEnabled && completionPercentage === 100

  const handleSelectRating = (questionId: string, rating: string) => {
    setRatings((prev) => ({ ...prev, [questionId]: rating }))
  }

  const handleSubmit = () => {
    if (!canSubmit) {
      return
    }
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2800)
  }

  if (!isSurveyEnabled) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <Lock className="h-10 w-10 text-slate-300" />
        <h1 className="mt-4 text-2xl font-semibold text-slate-900">Survey locked</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-500">
          Your class advisor has not opened the program exit survey yet. Watch your notifications;
          once it is enabled, you can submit your responses here.
        </p>
      </section>
    )
  }

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Graduation feedback
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Program Exit Survey</h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Share your experience across program outcomes. Your feedback helps improve the next
              batch&apos;s journey.
            </p>
          </div>
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              <span>Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-slate-100">
              <div
                className={cn('h-full rounded-full bg-indigo-500 transition-all')}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {exitSurveyQuestions.map((question, index) => (
          <article key={question.id} className="rounded-3xl border border-slate-100 p-6">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{question.code}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-900">{question.text}</p>
              </div>
              <span className="text-xs text-slate-400">Choose one response</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {ratingScale.map((choice) => {
                const isSelected = ratings[question.id] === choice
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => handleSelectRating(question.id, choice)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-semibold transition',
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                    )}
                  >
                    {choice}
                  </button>
                )
              })}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Additional remarks (optional)
        </label>
        <textarea
          rows={4}
          value={comments}
          onChange={(event) => setComments(event.target.value)}
          placeholder="Let us know what worked well and what can be improved..."
          className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-900 focus:outline-none"
        />
      </section>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition',
            canSubmit
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'cursor-not-allowed bg-slate-200 text-slate-500'
          )}
        >
          Submit survey
        </button>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-100 bg-white px-8 py-10 text-center shadow-xl">
              <Sparkles className="h-10 w-10 text-emerald-500" />
              <h2 className="text-2xl font-semibold text-slate-900">Submission successful</h2>
              <p className="max-w-sm text-sm text-slate-500">
                Thank you for completing the program exit survey. Your feedback has been shared with
                your advisor and the accreditation cell.
              </p>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
