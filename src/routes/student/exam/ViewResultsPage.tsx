import { ExamSelectionPanel } from '@/routes/student/exam/ExamSelectionPanel'

const resultData = [
  { term: 'Unit Test 1', status: 'Passed', gpa: '8.2', remarks: 'Consistent performance' },
  { term: 'Midterm', status: 'Passed', gpa: '8.7', remarks: 'Excellent improvement in sciences' },
  { term: 'Unit Test 2', status: 'Passed', gpa: '8.5', remarks: 'Keep up the discipline' },
  { term: 'Practical Board', status: 'Passed', gpa: 'A+', remarks: 'Full marks in Computer Science practicals' },
]

const statusStyles: Record<string, string> = {
  Passed: 'text-emerald-600 bg-emerald-50',
  'On Hold': 'text-amber-600 bg-amber-50',
  Failed: 'text-rose-600 bg-rose-50',
}

export function ViewResultsPage() {
  return (
    <ExamSelectionPanel
      heading="View Results"
      description="Access published term-wise outcomes along with GPA summaries and remarks from the examination cell."
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Result history</h2>
            <p className="text-sm text-slate-500">
              Latest consolidated outcome for each published exam term.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Result summary
          </span>
        </header>
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Term</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-center">GPA</th>
                <th className="px-6 py-4 font-semibold">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {resultData.map((row) => {
                const badgeStyle = statusStyles[row.status] ?? 'text-slate-600 bg-slate-100'
                return (
                  <tr key={row.term} className="hover:bg-slate-50/80">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.term}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-lg font-bold text-slate-900">{row.gpa}</td>
                    <td className="px-6 py-4 text-slate-500">{row.remarks}</td>
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
