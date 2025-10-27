import { ExamSelectionPanel } from '@/routes/student/exam/ExamSelectionPanel'

const gradeData = [
  { subject: 'Mathematics', assessment: 'Midterm', grade: 'A', remarks: 'Outstanding accuracy' },
  { subject: 'Physics', assessment: 'Midterm', grade: 'B+', remarks: 'Great conceptual clarity' },
  { subject: 'Chemistry', assessment: 'Unit Test 2', grade: 'A-', remarks: 'Well structured answers' },
  { subject: 'English', assessment: 'Midterm', grade: 'A', remarks: 'Creative writing applauded' },
  { subject: 'Computer Science', assessment: 'Lab Viva', grade: 'A+', remarks: 'Perfect project execution' },
]

export function ViewGradesPage() {
  return (
    <ExamSelectionPanel
      heading="View Grades"
      description="Switch across academic years and classes to monitor the consolidated grade letters for assessments."
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Grade book</h2>
            <p className="text-sm text-slate-500">
              Grade letters for core and elective subjects mapped to the latest evaluation.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Grades summary
          </span>
        </header>
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Subject</th>
                <th className="px-6 py-4 font-semibold">Assessment</th>
                <th className="px-6 py-4 font-semibold text-center">Grade</th>
                <th className="px-6 py-4 font-semibold">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {gradeData.map((row) => (
                <tr key={`${row.subject}-${row.assessment}`} className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-semibold text-slate-900">{row.subject}</td>
                  <td className="px-6 py-4">{row.assessment}</td>
                  <td className="px-6 py-4 text-center text-lg font-bold text-slate-900">{row.grade}</td>
                  <td className="px-6 py-4 text-slate-500">{row.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ExamSelectionPanel>
  )
}
