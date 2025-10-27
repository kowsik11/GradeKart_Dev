export type HostelStatus = 'Occupied' | 'Reserved' | 'Available' | 'Under Maintenance'

export interface HostelRecord {
  id: string
  studentName: string
  rollNumber: string
  campus: string
  building: string
  block: string
  roomNumber: string
  bedNumber: string
  status: HostelStatus
  checkIn: string
  expectedCheckout: string
  guardianContact: string
  warden: string
  remarks?: string
}

export const campuses = ['Central Campus', 'Lake View Campus']
export const buildings = ['Aster Residency', 'Coral Residency', 'Lotus Residency']
export const wings = ['Block A', 'Block B', 'Block C']
export const statusFilters: Array<'All Beds' | HostelStatus> = [
  'All Beds',
  'Occupied',
  'Reserved',
  'Available',
  'Under Maintenance',
]

export const hostelAllocations: HostelRecord[] = [
  {
    id: 'HST-001',
    studentName: 'Krishna Sharma',
    rollNumber: '21MCA101',
    campus: 'Central Campus',
    building: 'Aster Residency',
    block: 'Block A',
    roomNumber: 'A-304',
    bedNumber: 'B1',
    status: 'Occupied',
    checkIn: '2025-06-03',
    expectedCheckout: '2026-05-28',
    guardianContact: '+91 98765 43210',
    warden: 'Ms. Revathi',
    remarks: 'Mess subscription active',
  },
  {
    id: 'HST-002',
    studentName: 'Harini Reddy',
    rollNumber: '21MCA109',
    campus: 'Central Campus',
    building: 'Aster Residency',
    block: 'Block A',
    roomNumber: 'A-304',
    bedNumber: 'B2',
    status: 'Occupied',
    checkIn: '2025-06-03',
    expectedCheckout: '2026-05-28',
    guardianContact: '+91 99887 65544',
    warden: 'Ms. Revathi',
    remarks: 'Late return permission for robotics club',
  },
  {
    id: 'HST-003',
    studentName: 'Vignesh Kumar',
    rollNumber: '21ME201',
    campus: 'Central Campus',
    building: 'Coral Residency',
    block: 'Block B',
    roomNumber: 'B-112',
    bedNumber: 'B1',
    status: 'Reserved',
    checkIn: '2025-07-10',
    expectedCheckout: '2026-05-30',
    guardianContact: '+91 91234 55678',
    warden: 'Mr. Ramesh',
    remarks: 'Awaiting medical certificate submission',
  },
  {
    id: 'HST-004',
    studentName: 'Ananya Gupta',
    rollNumber: '21CS145',
    campus: 'Lake View Campus',
    building: 'Lotus Residency',
    block: 'Block C',
    roomNumber: 'C-208',
    bedNumber: 'B2',
    status: 'Occupied',
    checkIn: '2025-06-01',
    expectedCheckout: '2026-05-26',
    guardianContact: '+91 90123 44321',
    warden: 'Ms. Asha',
    remarks: 'Sports scholarship accommodation',
  },
  {
    id: 'HST-005',
    studentName: '',
    rollNumber: '',
    campus: 'Lake View Campus',
    building: 'Lotus Residency',
    block: 'Block C',
    roomNumber: 'C-208',
    bedNumber: 'B1',
    status: 'Available',
    checkIn: '',
    expectedCheckout: '',
    guardianContact: '',
    warden: 'Ms. Asha',
    remarks: 'Priority allocation for first-year girls',
  },
  {
    id: 'HST-006',
    studentName: '',
    rollNumber: '',
    campus: 'Central Campus',
    building: 'Coral Residency',
    block: 'Block B',
    roomNumber: 'B-215',
    bedNumber: 'B2',
    status: 'Under Maintenance',
    checkIn: '',
    expectedCheckout: '',
    guardianContact: '',
    warden: 'Mr. Ramesh',
    remarks: 'Bed under repair (scheduled completion 12 Jul 2025)',
  },
]
