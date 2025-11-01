import { useMemo, useState } from 'react'
import { Building, Download, Mail, Phone, Search } from 'lucide-react'

const departments = ['All departments', 'Science', 'Mathematics', 'Humanities', 'Commerce', 'Administration']
const roles = ['All roles', 'Faculty', 'Class Advisor', 'Coordinator', 'Support']

const staffDirectory = [
  {
    id: 'STF-101',
    name: 'Meera Nair',
    role: 'Class Advisor',
    department: 'Mathematics',
    email: 'meera.nair@gkcampus.edu',
    phone: '+91 90000 55555',
    classes: ['Class XI MPC', 'Class XII MPC'],
  },
  {
    id: 'STF-118',
    name: 'Aditya Rao',
    role: 'Faculty',
    department: 'Science',
    email: 'aditya.rao@gkcampus.edu',
    phone: '+91 90000 33333',
    classes: ['Class X Physics', 'Class XI Physics'],
  },
  {
    id: 'STF-205',
    name: 'Sanya Kulkarni',
    role: 'Coordinator',
    department: 'Humanities',
    email: 'sanya.kulkarni@gkcampus.edu',
    phone: '+91 90000 22222',
    classes: ['Counselling Lead'],
  },
  {
    id: 'STF-309',
    name: 'Rahul Menon',
    role: 'Support',
    department: 'Administration',
    email: 'rahul.menon@gkcampus.edu',
    phone: '+91 90000 11111',
    classes: ['Admissions Office'],
  },
]

export function StaffDirectoryPage() {
  const [department, setDepartment] = useState(departments[0])
  const [role, setRole] = useState(roles[0])
  const [query, setQuery] = useState('')

  const filteredStaff = useMemo(() => {
    return staffDirectory.filter((staff) => {
      const matchesDepartment =
        department === departments[0] || staff.department === department
      const matchesRole = role === roles[0] || staff.role === role
      const matchesQuery =
        query.trim().length === 0 ||
        staff.name.toLowerCase().includes(query.toLowerCase()) ||
        staff.id.toLowerCase().includes(query.toLowerCase())
      return matchesDepartment && matchesRole && matchesQuery
    })
  }, [department, query, role])

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Staff intelligence
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Staff Directory</h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Search and filter staff across departments, view their assigned classes, and access contact
            details instantly before scheduling meetings or walkthroughs.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Download className="h-4 w-4" />
          Export roster
        </button>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-4">
          <FilterSelect label="Department" value={department} options={departments} onChange={setDepartment} />
          <FilterSelect label="Role" value={role} options={roles} onChange={setRole} />
          <label className="lg:col-span-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or staff ID"
              className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
            />
          </label>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {filteredStaff.map((staff) => (
          <article
            key={staff.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  {staff.id}
                </p>
                <h2 className="text-lg font-semibold text-slate-900">{staff.name}</h2>
                <p className="text-sm text-slate-500">
                  {staff.role} &bull; {staff.department}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                <Building className="h-3.5 w-3.5" />
                {staff.classes[0] ?? 'No classes assigned'}
              </span>
            </header>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                {staff.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                {staff.phone}
              </span>
            </div>
            <footer className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Assigned portfolios
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {staff.classes.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </footer>
          </article>
        ))}
      </section>
    </div>
  )
}

interface FilterSelectProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-inner focus-within:border-slate-900">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-transparent text-sm text-slate-700 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

