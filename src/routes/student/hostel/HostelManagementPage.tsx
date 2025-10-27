import { useMemo, useState } from 'react'
import {
  campuses,
  buildings,
  wings,
  statusFilters,
  hostelAllocations,
  type HostelRecord,
  type HostelStatus,
} from '@/routes/student/hostel/data'
import { RefreshCcw, Search } from 'lucide-react'

const ALL_BUILDINGS = 'All Buildings'
const ALL_WINGS = 'All Blocks'

export function HostelManagementPage() {
  const [campus, setCampus] = useState(campuses[0])
  const [building, setBuilding] = useState<string | typeof ALL_BUILDINGS>(ALL_BUILDINGS)
  const [block, setBlock] = useState<string | typeof ALL_WINGS>(ALL_WINGS)
  const [status, setStatus] = useState<(typeof statusFilters)[number]>('All Beds')
  const [hasSearched, setHasSearched] = useState(false)

  const filteredRecords = useMemo(() => {
    if (!hasSearched) {
      return []
    }

    return hostelAllocations.filter((record) => {
      const campusMatch = record.campus === campus
      const buildingMatch = building === ALL_BUILDINGS || record.building === building
      const blockMatch = block === ALL_WINGS || record.block === block
      const statusMatch = status === 'All Beds' || record.status === status
      return campusMatch && buildingMatch && blockMatch && statusMatch
    })
  }, [campus, building, block, status, hasSearched])

  const summary = useMemo(() => calculateSummary(filteredRecords), [filteredRecords])

  const handleSearch = () => {
    setHasSearched(true)
  }

  const handleReset = () => {
    setCampus(campuses[0])
    setBuilding(ALL_BUILDINGS)
    setBlock(ALL_WINGS)
    setStatus('All Beds')
    setHasSearched(false)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Hostel management
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Hosteller Dashboard</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Monitor resident allocations, track available beds, and keep an eye on maintenance
            updates for your campus hostels.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-900">{campus}</span>
          {building !== ALL_BUILDINGS ? ` • ${building}` : ''}
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Filter hosteller view
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Choose the campus, residence block, and bed status. Click Search to load allocations.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <FilterSelect label="Campus" value={campus} onChange={setCampus} options={campuses} />
          <FilterSelect
            label="Residence building"
            value={building}
            onChange={setBuilding}
            options={[ALL_BUILDINGS, ...buildings]}
          />
          <FilterSelect
            label="Block / Wing"
            value={block}
            onChange={setBlock}
            options={[ALL_WINGS, ...wings]}
          />
          <FilterSelect
            label="Bed status"
            value={status}
            onChange={setStatus}
            options={statusFilters}
          />
          <div className="flex items-end gap-3">
            <button
              type="button"
              onClick={handleSearch}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <RefreshCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </section>

      {hasSearched ? (
        <div className="space-y-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              label="Beds occupied"
              value={summary.occupied.toString()}
              helper="Currently assigned hostellers"
              tone="bg-indigo-500"
            />
            <SummaryCard
              label="Reserved arrivals"
              value={summary.reserved.toString()}
              helper="Awaiting check-in"
              tone="bg-amber-500"
            />
            <SummaryCard
              label="Beds available"
              value={summary.available.toString()}
              helper="Ready for allocation"
              tone="bg-emerald-500"
            />
            <SummaryCard
              label="Under maintenance"
              value={summary.maintenance.toString()}
              helper="Temporarily blocked"
              tone="bg-rose-500"
            />
          </section>

          <HostelTable records={filteredRecords} />
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
          <p className="text-sm font-semibold text-slate-600">
            Select campus, building, and status. Click Search to load resident allocations for
            hostellers.
          </p>
        </div>
      )}
    </div>
  )
}

function FilterSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T
  onChange: (value: T) => void
  options: readonly T[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-slate-900 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function calculateSummary(records: HostelRecord[]) {
  return records.reduce(
    (acc, record) => {
      switch (record.status) {
        case 'Occupied':
          acc.occupied += 1
          break
        case 'Reserved':
          acc.reserved += 1
          break
        case 'Available':
          acc.available += 1
          break
        case 'Under Maintenance':
          acc.maintenance += 1
          break
        default:
          break
      }
      return acc
    },
    { occupied: 0, reserved: 0, available: 0, maintenance: 0 }
  )
}

function SummaryCard({
  label,
  value,
  helper,
  tone,
}: {
  label: string
  value: string
  helper: string
  tone: string
}) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`absolute inset-x-4 top-4 h-24 rounded-3xl opacity-10 ${tone}`} />
      <div className="relative space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500">{helper}</p>
      </div>
    </article>
  )
}

function HostelTable({ records }: { records: HostelRecord[] }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Resident allocations</h2>
          <p className="text-sm text-slate-500">
            Hosteller roster with bed mapping, guardian contacts, and residency timelines.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          {records.length} beds listed
        </span>
      </header>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Hosteller</th>
              <th className="px-6 py-4 font-semibold">Room & Bed</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold">Check-in</th>
              <th className="px-6 py-4 font-semibold">Checkout</th>
              <th className="px-6 py-4 font-semibold">Guardian contact</th>
              <th className="px-6 py-4 font-semibold">Warden</th>
              <th className="px-6 py-4 font-semibold">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/70">
                <td className="px-6 py-4">
                  {record.status === 'Occupied' || record.status === 'Reserved' ? (
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900">{record.studentName}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                        {record.rollNumber || 'Awaiting Roll No'}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400">Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="font-medium text-slate-700">{record.roomNumber || '-'}</p>
                    <p className="text-xs text-slate-400">Bed {record.bedNumber}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={record.status} />
                </td>
                <td className="px-6 py-4">{formatDate(record.checkIn)}</td>
                <td className="px-6 py-4">{formatDate(record.expectedCheckout)}</td>
                <td className="px-6 py-4">{record.guardianContact || '—'}</td>
                <td className="px-6 py-4">{record.warden}</td>
                <td className="px-6 py-4 text-slate-500">{record.remarks || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function StatusBadge({ status }: { status: HostelStatus }) {
  const badgeClasses: Record<HostelStatus, string> = {
    Occupied: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    Reserved: 'bg-amber-50 text-amber-600 border border-amber-100',
    Available: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    'Under Maintenance': 'bg-rose-50 text-rose-600 border border-rose-100',
  }

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses[status]}`}>
      {status}
    </span>
  )
}

function formatDate(date: string) {
  if (!date) {
    return '—'
  }
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
