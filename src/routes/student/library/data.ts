export interface BorrowRecord {
  id: string
  title: string
  author: string
  accessionNumber: string
  issueDate: string
  dueDate: string
  returnDate?: string
  status: 'Checked Out' | 'Returned' | 'Overdue'
}

export interface LibraryDueRecord {
  id: string
  title: string
  incident: 'Torn Pages' | 'Worn Out' | 'Lost' | 'Damaged' | 'Defaced'
  assessedOn: string
  remarks: string
  amount: number
  status: 'Unpaid' | 'Paid'
}

export const borrowHistory: BorrowRecord[] = [
  {
    id: 'LIB-BOR-001',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    accessionNumber: 'A-10234',
    issueDate: '2025-06-12',
    dueDate: '2025-07-12',
    status: 'Checked Out',
  },
  {
    id: 'LIB-BOR-002',
    title: 'Deep Learning with Python',
    author: 'François Chollet',
    accessionNumber: 'A-09876',
    issueDate: '2025-05-02',
    dueDate: '2025-06-02',
    returnDate: '2025-05-30',
    status: 'Returned',
  },
  {
    id: 'LIB-BOR-003',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    accessionNumber: 'A-11021',
    issueDate: '2025-04-15',
    dueDate: '2025-05-15',
    status: 'Overdue',
  },
  {
    id: 'LIB-BOR-004',
    title: 'Algorithms Unlocked',
    author: 'Thomas H. Cormen',
    accessionNumber: 'A-07654',
    issueDate: '2025-03-10',
    dueDate: '2025-04-09',
    returnDate: '2025-04-05',
    status: 'Returned',
  },
]

export const duesHistory: LibraryDueRecord[] = [
  {
    id: 'LIB-DUE-001',
    title: 'Clean Code',
    incident: 'Torn Pages',
    assessedOn: '2025-05-20',
    remarks: 'Pages 145-148 torn; replacement required',
    amount: 450,
    status: 'Unpaid',
  },
  {
    id: 'LIB-DUE-002',
    title: 'Machine Learning Yearning',
    incident: 'Lost',
    assessedOn: '2025-02-18',
    remarks: 'Replacement copy purchased by library',
    amount: 950,
    status: 'Paid',
  },
  {
    id: 'LIB-DUE-003',
    title: 'Data Structures in C',
    incident: 'Defaced',
    assessedOn: '2024-11-08',
    remarks: 'Excessive highlighting; binding replaced',
    amount: 300,
    status: 'Paid',
  },
]

export const academicYearOptions = ['2025-26', '2024-25', '2023-24']
export const monthOptions = ['This Month', 'Last Month', 'Last 3 Months', 'Academic Year']
