import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Check, Edit3, Save, Search, UserCircle } from 'lucide-react'

interface Advisee {
  rollNo: string
  name: string
  grade: string
  section: string
  email: string
  studentPhone: string
  fatherName: string
  motherName: string
  fatherPhone: string
  motherPhone: string
  guardianEmail: string
  address: string
}

const initialAdvisees: Advisee[] = [
  {
    rollNo: 'GK2025-001',
    name: 'Aarav N',
    grade: 'Class XI',
    section: 'MPC',
    email: 'aarav.n@gkcampus.edu',
    studentPhone: '+91 90000 11111',
    fatherName: 'N. Rajesh',
    motherName: 'N. Kavitha',
    fatherPhone: '+91 98888 11111',
    motherPhone: '+91 98888 21111',
    guardianEmail: 'parents.aarav@gkcampus.edu',
    address: 'Plot 27, Jubilee Hills, Hyderabad',
  },
  {
    rollNo: 'GK2025-002',
    name: 'Bhavana S',
    grade: 'Class XI',
    section: 'MPC',
    email: 'bhavana.s@gkcampus.edu',
    studentPhone: '+91 90000 22222',
    fatherName: 'S. Mahesh',
    motherName: 'S. Kavitha',
    fatherPhone: '+91 98888 22222',
    motherPhone: '+91 98888 32222',
    guardianEmail: 'parents.bhavana@gkcampus.edu',
    address: 'Flat 5B, Lake View Residency, Hyderabad',
  },
  {
    rollNo: 'GK2025-003',
    name: 'Chirag P',
    grade: 'Class XI',
    section: 'MPC',
    email: 'chirag.p@gkcampus.edu',
    studentPhone: '+91 90000 33333',
    fatherName: 'P. Sagar',
    motherName: 'P. Anitha',
    fatherPhone: '+91 98888 33333',
    motherPhone: '+91 98888 43333',
    guardianEmail: 'parents.chirag@gkcampus.edu',
    address: 'H No 9-1-124, Secunderabad',
  },
]

type StudentFormState = {
  rollNo: string
  fullName: string
  grade: string
  section: string
  studentPhone: string
  fatherName: string
  motherName: string
  fatherPhone: string
  motherPhone: string
  guardianEmail: string
  address: string
}

const emptyForm: StudentFormState = {
  rollNo: '',
  fullName: '',
  grade: '',
  section: '',
  studentPhone: '',
  fatherName: '',
  motherName: '',
  fatherPhone: '',
  motherPhone: '',
  guardianEmail: '',
  address: '',
}

export function StudentProfilesPage() {
  const [adviseeList, setAdviseeList] = useState<Advisee[]>(initialAdvisees)
  const [selectedRoll, setSelectedRoll] = useState<string>(
    initialAdvisees[0]?.rollNo ?? '',
  )
  const [formState, setFormState] = useState<StudentFormState>(emptyForm)
  const [formMessage, setFormMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!adviseeList.find((item) => item.rollNo === selectedRoll)) {
      setSelectedRoll(adviseeList[0]?.rollNo ?? '')
    }
  }, [adviseeList, selectedRoll])

  const student = useMemo(() => {
    const match = adviseeList.find((item) => item.rollNo === selectedRoll)
    if (match) {
      return match
    }
    return adviseeList[0] ?? null
  }, [adviseeList, selectedRoll])

  const formattedClass = student
    ? `${student.grade}${student.section ? ` - ${student.section}` : ''}`
    : ''

  const handleFormChange = (field: keyof StudentFormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddOrUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormMessage(null)

    if (!formState.rollNo.trim() || !formState.fullName.trim()) {
      setFormMessage('Roll number and full name are required.')
      return
    }

    const nextEntry: Advisee = {
      rollNo: formState.rollNo.trim().toUpperCase(),
      name: formState.fullName.trim(),
      grade: formState.grade.trim() || 'Grade pending',
      section: formState.section.trim(),
      email:
        formState.guardianEmail.trim() ||
        `${formState.rollNo.trim().toLowerCase()}@gradekart.edu`,
      studentPhone: formState.studentPhone.trim(),
      fatherName: formState.fatherName.trim(),
      motherName: formState.motherName.trim(),
      fatherPhone: formState.fatherPhone.trim(),
      motherPhone: formState.motherPhone.trim(),
      guardianEmail: formState.guardianEmail.trim(),
      address: formState.address.trim(),
    }

    const existedPreviously = adviseeList.some(
      (item) => item.rollNo.toUpperCase() === nextEntry.rollNo,
    )

    setAdviseeList((prev) => {
      if (existedPreviously) {
        return prev.map((item) =>
          item.rollNo.toUpperCase() === nextEntry.rollNo ? nextEntry : item,
        )
      }
      return [...prev, nextEntry].sort((a, b) =>
        a.rollNo.localeCompare(b.rollNo),
      )
    })

    setSelectedRoll(nextEntry.rollNo)
    setFormMessage(
      `Student profile for ${nextEntry.name} ${
        existedPreviously ? 'updated' : 'added'
      } successfully.`,
    )
    setFormState(emptyForm)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Advisor workspace
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Student Profiles</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Update student and guardian records post parent meetings or counselling sessions.
            Keep profiles current so the admin office and faculty coordinators stay aligned.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Save className="h-4 w-4" />
          Save changes
        </button>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Advisee list
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                <Search className="h-3.5 w-3.5" />
                Quick search
              </button>
            </div>
            <div className="space-y-2">
              {adviseeList.map((item) => {
                const isActive = item.rollNo === student?.rollNo
                const badgeClass = isActive
                  ? 'text-slate-200'
                  : 'text-slate-400'

                return (
                  <button
                    key={item.rollNo}
                    type="button"
                    onClick={() => setSelectedRoll(item.rollNo)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-transparent bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className={`text-xs ${badgeClass}`}>{item.rollNo}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-6">
            {student ? (
              <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-inner">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
                      <UserCircle className="h-8 w-8" />
                    </span>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {student.name}
                      </h2>
                      <p className="text-sm text-slate-500">{formattedClass}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Updated 2 days ago
                    </span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Mark review complete
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <ProfileField label="Roll number" value={student.rollNo} readOnly />
                  <ProfileField label="Campus email" value={student.email} />
                  <ProfileField label="Student contact" value={student.studentPhone} />
                  <ProfileField label="Parent email" value={student.guardianEmail || 'Not shared'} readOnly />
                </div>
                <ProfileField label="Residential address" value={student.address || 'Not provided'} multiline />

                <div className="grid gap-4 md:grid-cols-2">
                  <FamilyCard
                    title="Father"
                    name={student.fatherName || 'Not recorded'}
                    phone={student.fatherPhone || 'Not shared'}
                  />
                  <FamilyCard
                    title="Mother"
                    name={student.motherName || 'Not recorded'}
                    phone={student.motherPhone || 'Not shared'}
                  />
                </div>
              </div>
            ) : null}

            <section className="grid gap-4 lg:grid-cols-2">
              <InsightCard
                title="Academic pulse"
                description="Track core subject performance and jot quick mentoring actions."
                items={[
                  { label: 'Midterm CGPA', value: '7.8 / 10' },
                  { label: 'Top strength', value: 'Applied Mathematics' },
                  { label: 'Focus area', value: 'Lab submissions' },
                ]}
              />
              <InsightCard
                title="Counselling log"
                description="Capture snippets from weekly circles to personalise follow ups."
                items={[
                  { label: 'Last meeting', value: '21 Oct 2025' },
                  { label: 'Highlight', value: 'Presented in tech club' },
                  { label: 'Next check-in', value: '28 Oct 2025' },
                ]}
              />
            </section>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-2 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Add / Update student
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Register a new student or refresh existing records
          </h2>
          <p className="text-sm text-slate-500">
            Faculty can add fresh admissions or update guardian information after PTMs. Details sync
            with the central roster during the nightly Airtable sync.
          </p>
          {formMessage ? (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              {formMessage}
            </span>
          ) : null}
        </header>

        <form onSubmit={handleAddOrUpdate} className="grid gap-4 lg:grid-cols-2">
          <InputField
            label="Roll number / Register number"
            placeholder="e.g. GK2025-010"
            required
            value={formState.rollNo}
            onChange={(value) => handleFormChange('rollNo', value)}
          />
          <InputField
            label="Full name"
            placeholder="Student name"
            required
            value={formState.fullName}
            onChange={(value) => handleFormChange('fullName', value)}
          />
          <InputField
            label="Grade"
            placeholder="e.g. Class XI"
            value={formState.grade}
            onChange={(value) => handleFormChange('grade', value)}
          />
          <InputField
            label="Class & section"
            placeholder="e.g. MPC"
            value={formState.section}
            onChange={(value) => handleFormChange('section', value)}
          />
          <InputField
            label="Student phone"
            placeholder="+91 ..."
            value={formState.studentPhone}
            onChange={(value) => handleFormChange('studentPhone', value)}
          />
          <InputField
            label="Parent email"
            placeholder="guardian@example.com"
            value={formState.guardianEmail}
            onChange={(value) => handleFormChange('guardianEmail', value)}
          />
          <InputField
            label="Father name"
            placeholder="Father / Guardian name"
            value={formState.fatherName}
            onChange={(value) => handleFormChange('fatherName', value)}
          />
          <InputField
            label="Father phone"
            placeholder="+91 ..."
            value={formState.fatherPhone}
            onChange={(value) => handleFormChange('fatherPhone', value)}
          />
          <InputField
            label="Mother name"
            placeholder="Mother / Guardian name"
            value={formState.motherName}
            onChange={(value) => handleFormChange('motherName', value)}
          />
          <InputField
            label="Mother phone"
            placeholder="+91 ..."
            value={formState.motherPhone}
            onChange={(value) => handleFormChange('motherPhone', value)}
          />
          <TextareaField
            label="Residential address"
            placeholder="House number, street, city"
            value={formState.address}
            onChange={(value) => handleFormChange('address', value)}
          />
          <div className="flex items-end">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Save student record
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

interface ProfileFieldProps {
  label: string
  value: string
  readOnly?: boolean
  multiline?: boolean
}

function ProfileField({ label, value, readOnly = false, multiline = false }: ProfileFieldProps) {
  if (multiline) {
    return (
      <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </span>
        <textarea
          defaultValue={value}
          readOnly={readOnly}
          rows={3}
          className="resize-none bg-transparent text-sm text-slate-700 focus:outline-none"
        />
      </label>
    )
  }

  return (
    <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <input
        defaultValue={value}
        readOnly={readOnly}
        className="bg-transparent text-sm text-slate-700 focus:outline-none"
      />
    </label>
  )
}

interface InsightCardProps {
  title: string
  description: string
  items: Array<{ label: string; value: string }>
}

function InsightCard({ title, description, items }: InsightCardProps) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-100 opacity-0 transition group-hover:opacity-100" />
      <div className="relative space-y-4">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </header>
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3 text-sm"
            >
              <span className="font-medium text-slate-600">{item.label}</span>
              <span className="inline-flex items-center gap-2 text-slate-900">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function FamilyCard({ title, name, phone }: { title: string; name: string; phone: string }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{title}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{name}</p>
      <p className="text-xs text-slate-500">{phone}</p>
    </article>
  )
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="bg-transparent text-sm text-slate-700 focus:outline-none"
      />
    </label>
  )
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label className="lg:col-span-2 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="resize-none bg-transparent text-sm text-slate-700 focus:outline-none"
      />
    </label>
  )
}
