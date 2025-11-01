import { useAuth } from '@/features/auth'
import { FeeFiltersLayout } from '@/routes/student/fees/FeeFiltersLayout'
import { FeeResultsSection } from '@/routes/student/fees/FeeResultsSection'
import { feeRecords, type FeeCategory } from '@/routes/student/fees/data'

interface FilterArgs {
  cycle: string
}

const ALL_CYCLE_TOKEN = 'All Billing Cycles'

function filterByCategory(categories: FeeCategory[], { cycle }: FilterArgs) {
  return feeRecords.filter((record) => {
    const inCategory = categories.includes(record.category)
    const cycleMatch = cycle === ALL_CYCLE_TOKEN || record.cycle === cycle
    return inCategory && cycleMatch
  })
}

export function ViewFeeDetailsPage() {
  const { rollNo, fullName } = useStudentIdentity()
  return (
    <FeeFiltersLayout
      heading="View Fee Details"
      description="Consolidated summary of every fee component mapped to the selected class. Search to review paid, pending, and upcoming statements."
      badgeLabel="Overview"
      renderResults={({ cycle }) => {
        const records = filterByCategory(
          ['tuition', 'sports', 'hostel', 'college', 'transport', 'details', 'dues'],
          { cycle },
        )
        return (
          <FeeResultsSection
            title="Comprehensive ledger"
            subtitle="All fee components and add-on services captured for the current cohort."
            records={records}
            emptyMessage="No fee statements found for the selected filters."
            studentRollNo={rollNo}
            studentName={fullName}
            paymentRedirectPath="/student/fees/pay"
          />
        )
      }}
    />
  )
}

export function ViewSportsFeesPage() {
  const { rollNo, fullName } = useStudentIdentity()
  return (
    <FeeFiltersLayout
      heading="View Sports Fees"
      description="Track sports-specific charges like coaching, tournaments, or equipment rentals."
      badgeLabel="Sports programmes"
      renderResults={({ cycle }) => {
        const records = filterByCategory(['sports'], { cycle })
        return (
          <FeeResultsSection
            title="Sports ledger"
            subtitle="Athletics, aquatics, and extracurricular sport activities."
            records={records}
            emptyMessage="No sports fees recorded for the selected cycle."
            studentRollNo={rollNo}
            studentName={fullName}
            paymentRedirectPath="/student/fees/pay"
          />
        )
      }}
    />
  )
}

export function ViewTuitionFeePage() {
  const { rollNo, fullName } = useStudentIdentity()
  return (
    <FeeFiltersLayout
      heading="View Tuition Fee"
      description="Quarterly tuition invoices and their payment status."
      badgeLabel="Academic tuition"
      renderResults={({ cycle }) => {
        const records = filterByCategory(['tuition'], { cycle })
        return (
          <FeeResultsSection
            title="Tuition ledger"
            subtitle="Core academic fee split across billing cycles."
            records={records}
            emptyMessage="No tuition statements available for the chosen filters."
            studentRollNo={rollNo}
            studentName={fullName}
            paymentRedirectPath="/student/fees/pay"
          />
        )
      }}
    />
  )
}

export function ViewHostelFeePage() {
  const { rollNo, fullName } = useStudentIdentity()
  return (
    <FeeFiltersLayout
      heading="View Hostel Fee"
      description="Residence block, boarding, and mess charges compiled in one place."
      badgeLabel="Hostel services"
      renderResults={({ cycle }) => {
        const records = filterByCategory(['hostel'], { cycle })
        return (
          <FeeResultsSection
            title="Hostel ledger"
            subtitle="Charges for hostel stay, including boarding amenities."
            records={records}
            emptyMessage="No hostel fee statements for the selected cycle."
            studentRollNo={rollNo}
            studentName={fullName}
            paymentRedirectPath="/student/fees/pay"
          />
        )
      }}
    />
  )
}

export function ViewCollegeFeePage() {
  const { rollNo, fullName } = useStudentIdentity()
  return (
    <FeeFiltersLayout
      heading="View College Fee"
      description="One-time or annual contributions for college development and activities."
      badgeLabel="College administration"
      renderResults={({ cycle }) => {
        const records = filterByCategory(['college'], { cycle })
        return (
          <FeeResultsSection
            title="College ledger"
            subtitle="Development funds, academic associations, and student services."
            records={records}
            emptyMessage="No college-level contributions found for this selection."
            studentRollNo={rollNo}
            studentName={fullName}
            paymentRedirectPath="/student/fees/pay"
          />
        )
      }}
    />
  )
}

export function ViewTransportationFeePage() {
  const { rollNo, fullName } = useStudentIdentity()
  return (
    <FeeFiltersLayout
      heading="View Transportation"
      description="Transportation passes and shuttle services billed per route."
      badgeLabel="Transport services"
      renderResults={({ cycle }) => {
        const records = filterByCategory(['transport'], { cycle })
        return (
          <FeeResultsSection
            title="Transport ledger"
            subtitle="Shuttle and bus services allocated per billing cycle."
            records={records}
            emptyMessage="No transport fees recorded for the selected cycle."
            studentRollNo={rollNo}
            studentName={fullName}
            paymentRedirectPath="/student/fees/pay"
          />
        )
      }}
    />
  )
}

export function ViewDuesPage() {
  const { rollNo, fullName } = useStudentIdentity()
  return (
    <FeeFiltersLayout
      heading="View Dues"
      description="Outstanding or partially paid invoices that need your attention."
      badgeLabel="Pending items"
      renderResults={({ cycle }) => {
        const records = filterByCategory(
          ['tuition', 'sports', 'hostel', 'transport', 'dues', 'details'],
          { cycle },
        ).filter((record) => record.status !== 'Paid')

        return (
          <FeeResultsSection
            title="Pending statements"
            subtitle="All dues consolidated across services."
            records={records}
            emptyMessage="Great news - there are no dues for this selection."
            studentRollNo={rollNo}
            studentName={fullName}
            paymentRedirectPath="/student/fees/pay"
          />
        )
      }}
    />
  )
}

export function ViewAllFeesPage() {
  const { rollNo, fullName } = useStudentIdentity()
  return (
    <FeeFiltersLayout
      heading="View All"
      description="A master statement combining every fee component across the selected cohort."
      badgeLabel="All categories"
      renderResults={({ cycle }) => {
        const records = filterByCategory(
          ['tuition', 'sports', 'hostel', 'college', 'transport', 'details', 'dues'],
          { cycle },
        )
        return (
          <FeeResultsSection
            title="Master fee register"
            subtitle="Comprehensive record of due and collected amounts."
            records={records}
            emptyMessage="No fee records available. Adjust filters to search another cycle."
            studentRollNo={rollNo}
            studentName={fullName}
            paymentRedirectPath="/student/fees/pay"
          />
        )
      }}
    />
  )
}

function useStudentIdentity() {
  const { session } = useAuth()
  if (session?.role === 'student') {
    return {
      rollNo: session.profile.rollNo,
      fullName: session.profile.fullName ?? 'Student',
    }
  }
  return { rollNo: 'GK2025-001', fullName: 'Student' }
}
