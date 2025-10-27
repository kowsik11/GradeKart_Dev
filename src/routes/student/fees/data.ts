export type FeeCategory =
  | 'details'
  | 'sports'
  | 'tuition'
  | 'hostel'
  | 'college'
  | 'transport'
  | 'dues'

export interface FeeRecord {
  id: string
  category: FeeCategory
  item: string
  cycle: string
  amountDue: number
  amountPaid: number
  dueDate: string
  status: 'Paid' | 'Pending' | 'Partially Paid'
}

export const feeRecords: FeeRecord[] = [
  {
    id: 'FE-2025-Q1-TUI',
    category: 'tuition',
    item: 'Tuition Fee - Quarter 1',
    cycle: 'Quarter 1',
    amountDue: 24000,
    amountPaid: 24000,
    dueDate: '2025-06-15',
    status: 'Paid',
  },
  {
    id: 'FE-2025-Q2-TUI',
    category: 'tuition',
    item: 'Tuition Fee - Quarter 2',
    cycle: 'Quarter 2',
    amountDue: 24000,
    amountPaid: 12000,
    dueDate: '2025-09-15',
    status: 'Partially Paid',
  },
  {
    id: 'FE-2025-Q3-TUI',
    category: 'tuition',
    item: 'Tuition Fee - Quarter 3',
    cycle: 'Quarter 3',
    amountDue: 24000,
    amountPaid: 0,
    dueDate: '2025-12-15',
    status: 'Pending',
  },
  {
    id: 'FE-2025-Q1-SP',
    category: 'sports',
    item: 'Sports Fee - Athletics Programme',
    cycle: 'Quarter 1',
    amountDue: 2500,
    amountPaid: 2500,
    dueDate: '2025-06-05',
    status: 'Paid',
  },
  {
    id: 'FE-2025-Q2-SP',
    category: 'sports',
    item: 'Sports Fee - Aquatics Coaching',
    cycle: 'Quarter 2',
    amountDue: 3200,
    amountPaid: 1600,
    dueDate: '2025-09-05',
    status: 'Partially Paid',
  },
  {
    id: 'FE-2025-Q1-HS',
    category: 'hostel',
    item: 'Hostel Fee - Summer Block',
    cycle: 'Quarter 1',
    amountDue: 18000,
    amountPaid: 18000,
    dueDate: '2025-06-01',
    status: 'Paid',
  },
  {
    id: 'FE-2025-Q2-HS',
    category: 'hostel',
    item: 'Hostel Fee - Monsoon Block',
    cycle: 'Quarter 2',
    amountDue: 18000,
    amountPaid: 9000,
    dueDate: '2025-09-01',
    status: 'Partially Paid',
  },
  {
    id: 'FE-2025-Q1-CLG',
    category: 'college',
    item: 'College Development Fund',
    cycle: 'Annual',
    amountDue: 5000,
    amountPaid: 5000,
    dueDate: '2025-07-01',
    status: 'Paid',
  },
  {
    id: 'FE-2025-Q1-TR',
    category: 'transport',
    item: 'Transport Fee - City Shuttle',
    cycle: 'Quarter 1',
    amountDue: 4500,
    amountPaid: 4500,
    dueDate: '2025-06-10',
    status: 'Paid',
  },
  {
    id: 'FE-2025-Q2-TR',
    category: 'transport',
    item: 'Transport Fee - City Shuttle',
    cycle: 'Quarter 2',
    amountDue: 4500,
    amountPaid: 0,
    dueDate: '2025-09-10',
    status: 'Pending',
  },
  {
    id: 'FE-2025-Q1-DUES',
    category: 'dues',
    item: 'Library Overdue Charges',
    cycle: 'Quarter 1',
    amountDue: 750,
    amountPaid: 0,
    dueDate: '2025-05-25',
    status: 'Pending',
  },
  {
    id: 'FE-2025-Q1-DETAIL',
    category: 'details',
    item: 'Skill Development Workshop',
    cycle: 'Quarter 1',
    amountDue: 1800,
    amountPaid: 1800,
    dueDate: '2025-06-20',
    status: 'Paid',
  },
  {
    id: 'FE-2025-Q2-DETAIL',
    category: 'details',
    item: 'Laboratory Consumables',
    cycle: 'Quarter 2',
    amountDue: 2800,
    amountPaid: 1400,
    dueDate: '2025-09-18',
    status: 'Partially Paid',
  },
]

export const billingCycles = ['All Billing Cycles', 'Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4', 'Annual']
