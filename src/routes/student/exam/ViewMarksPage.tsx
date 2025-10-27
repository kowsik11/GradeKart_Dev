import { ExamSelectionPanel } from '@/routes/student/exam/ExamSelectionPanel'

const marksData = [
  { subject: 'Mathematics', assessment: 'Midterm', score: 86, max: 100 },
  { subject: 'Physics', assessment: 'Midterm', score: 81, max: 100 },
  { subject: 'Chemistry', assessment: 'Unit Test 2', score: 42, max: 50 },
  { subject: 'English', assessment: 'Midterm', score: 78, max: 100 },
  { subject: 'Computer Science', assessment: 'Practical', score: 48, max: 50 },
]

export function ViewMarksPage() {
  return (
    <ExamSelectionPanel
      heading="View Marks"
      description="Analyse raw scores across exams and unit tests. Compare earned marks against maximum scores to plan revisions."
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Marks ledger</h2>
            <p className="text-sm text-slate-500">
              Absolute scores recorded in the latest assessment cycle.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Marks snapshot
          </span>
        </header>
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Subject</th>
                <th className="px-6 py-4 font-semibold">Assessment</th>
                <th className="px-6 py-4 font-semibold text-center">Score</th>
                <th className="px-6 py-4 font-semibold text-center">Max score</th>
                <th className="px-6 py-4 font-semibold text-center">Percent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {marksData.map((row) => {
                const percentage = row.max === 0 ? 0 : Math.round((row.score / row.max) * 100)
                return (
                  <tr key={`${row.subject}-${row.assessment}`} className="hover:bg-slate-50/80">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.subject}</td>
                    <td className="px-6 py-4">{row.assessment}</td>
                    <td className="px-6 py-4 text-center text-slate-900">{row.score}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{row.max}</td>
                    <td className="px-6 py-4 text-center font-semibold text-emerald-600">
                      {percentage}%
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </ExamSelectionPanel>
  )
}
