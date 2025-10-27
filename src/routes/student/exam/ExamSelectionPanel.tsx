import { useState } from 'react'

const academicYears = ['2025-26', '2024-25', '2023-24']
const classOptions = ['Class 10 - Section A', 'Class 10 - Section B', 'Class 11 - MPC', 'Class 11 - BiPC']

interface ExamSelectionPanelProps {
  heading: string
  description: string
  children?: React.ReactNode
}

export function ExamSelectionPanel({ heading, description, children }: ExamSelectionPanelProps) {
  const [year, setYear] = useState(academicYears[0])
  const [selectedClass, setSelectedClass] = useState(classOptions[0])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Exam workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{heading}</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-900">{year}</span> &mdash; {selectedClass}
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Select cohort
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Academic year
            </label>
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-900 focus:outline-none"
            >
              {academicYears.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Class & section
            </label>
            <select
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-900 focus:outline-none"
            >
              {classOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {children}
    </div>
  )
}
