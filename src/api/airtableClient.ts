import { env } from '@/config/env'
import type { AuthRole } from '@/features/auth'

const API_BASE = `https://api.airtable.com/v0/${env.airtableBaseId}`
const JSON_HEADERS: HeadersInit = {
  Authorization: `Bearer ${env.airtableApiKey}`,
  'Content-Type': 'application/json',
}

type AirtableRecord<TFields> = {
  id: string
  createdTime: string
  fields: TFields
}

interface AirtableListResponse<TFields> {
  records: Array<AirtableRecord<TFields>>
  offset?: string
}

interface SchoolFields {
  school_id?: string
  school_name: string
  campus_name?: string
  photo_url?: string
  logo_url?: string
}

interface StudentFields {
  school_id?: string
  roll_no: string
  password: string
  full_name?: string
  class?: string
}

interface TeacherFields {
  school_id?: string
  email: string
  password: string
  full_name?: string
  department?: string
}

interface StudentAttendanceFields {
  school_id?: string
  student_roll_no: string
  date: string
  status: string
}

interface StudentMarkFields {
  school_id?: string
  student_roll_no: string
  subject_code: string
  assessment: string
  max_score?: number
  score?: number
  grade?: string
}

interface TeacherAttendanceFields {
  school_id?: string
  teacher_email: string
  date: string
  status: string
}

interface TeacherReviewFields {
  school_id?: string
  teacher_email: string
  period: string
  rating_overall?: number
  comments?: string
}

export type StudentRecord = {
  id: string
  schoolCode: string
  rollNo: string
  fullName?: string
  className?: string
}

export type TeacherRecord = {
  id: string
  schoolCode: string
  email: string
  fullName?: string
  department?: string
}

export type SchoolRecord = {
  id: string
  schoolId: string
  name: string
  campusName?: string
  photoUrl?: string
  logoUrl?: string
}

export type StudentAttendanceRecord = {
  id: string
  date: string
  status: string
}

export type StudentMarkRecord = {
  id: string
  subjectCode: string
  assessment: string
  maxScore?: number
  score?: number
  grade?: string
}

export type TeacherAttendanceRecord = {
  id: string
  date: string
  status: string
}

export type TeacherReviewRecord = {
  id: string
  period: string
  ratingOverall?: number
  comments?: string
}

function assertEnv() {
  if (!env.airtableApiKey || !env.airtableBaseId) {
    throw new Error(
      'Missing Airtable configuration. Set VITE_AIRTABLE_API_KEY and VITE_AIRTABLE_BASE_ID.',
    )
  }
}

function escapeValue(value: string) {
  return value.replace(/'/g, "\\'")
}

async function airtableRequest<TResponse>(
  path: string,
  init: RequestInit = {},
): Promise<TResponse> {
  assertEnv()

  const response = await fetch(`${API_BASE}/${path}`, {
    ...init,
    headers: {
      ...JSON_HEADERS,
      ...(init.headers ?? {}),
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(
      `Airtable request failed (${response.status}): ${errorBody}`,
    )
  }

  return response.json() as Promise<TResponse>
}

function mapSchool(record: AirtableRecord<SchoolFields>): SchoolRecord {
  return {
    id: record.id,
    schoolId: record.fields.school_id ?? record.id,
    name: record.fields.school_name,
    campusName: record.fields.campus_name,
    photoUrl: record.fields.photo_url,
    logoUrl: record.fields.logo_url,
  }
}

function mapStudent(record: AirtableRecord<StudentFields>): StudentRecord {
  return {
    id: record.id,
    schoolCode: record.fields.school_id ?? '',
    rollNo: record.fields.roll_no,
    fullName: record.fields.full_name,
    className: record.fields.class,
  }
}

function mapTeacher(record: AirtableRecord<TeacherFields>): TeacherRecord {
  return {
    id: record.id,
    schoolCode: record.fields.school_id ?? '',
    email: record.fields.email,
    fullName: record.fields.full_name,
    department: record.fields.department,
  }
}

function mapStudentAttendance(
  record: AirtableRecord<StudentAttendanceFields>,
): StudentAttendanceRecord {
  return {
    id: record.id,
    date: record.fields.date,
    status: record.fields.status,
  }
}

function mapStudentMark(
  record: AirtableRecord<StudentMarkFields>,
): StudentMarkRecord {
  return {
    id: record.id,
    subjectCode: record.fields.subject_code,
    assessment: record.fields.assessment,
    maxScore: record.fields.max_score,
    score: record.fields.score,
    grade: record.fields.grade,
  }
}

function mapTeacherAttendance(
  record: AirtableRecord<TeacherAttendanceFields>,
): TeacherAttendanceRecord {
  return {
    id: record.id,
    date: record.fields.date,
    status: record.fields.status,
  }
}

function mapTeacherReview(
  record: AirtableRecord<TeacherReviewFields>,
): TeacherReviewRecord {
  return {
    id: record.id,
    period: record.fields.period,
    ratingOverall: record.fields.rating_overall,
    comments: record.fields.comments,
  }
}

export async function loginStudent(
  rollNo: string,
  password: string,
  schoolCode?: string,
) {
  const formula = `AND({roll_no}='${escapeValue(
    rollNo,
  )}',{password}='${escapeValue(password)}')`
  const data = await airtableRequest<AirtableListResponse<StudentFields>>(
    `Students?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`,
  )

  const record = data.records[0]
  if (!record) {
    throw new Error('Invalid student credentials. Please try again.')
  }

  if (
    schoolCode &&
    record.fields.school_id &&
    record.fields.school_id !== schoolCode
  ) {
    throw new Error(
      'This account belongs to a different campus. Please switch campus and try again.',
    )
  }

  return mapStudent(record)
}

export async function loginTeacher(
  email: string,
  password: string,
  schoolCode?: string,
) {
  const formula = `AND({email}='${escapeValue(email)}',{password}='${escapeValue(
    password,
  )}')`
  const data = await airtableRequest<AirtableListResponse<TeacherFields>>(
    `Teachers?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`,
  )

  const record = data.records[0]
  if (!record) {
    throw new Error('Invalid faculty credentials. Please try again.')
  }

  if (
    schoolCode &&
    record.fields.school_id &&
    record.fields.school_id !== schoolCode
  ) {
    throw new Error(
      'This faculty account belongs to a different campus. Please switch campus.',
    )
  }

  return mapTeacher(record)
}

export async function signupStudent({
  rollNo,
  password,
  fullName,
  schoolCode,
}: {
  rollNo: string
  password: string
  fullName?: string
  schoolCode?: string
}) {
  const existing = await findStudentByRoll(rollNo, schoolCode)
  if (existing) {
    throw new Error('This roll number already has an account.')
  }

  const payload: StudentFields = {
    roll_no: rollNo,
    password,
    full_name: fullName,
  }

  if (schoolCode) {
    payload.school_id = schoolCode
  }

  const record = await airtableRequest<AirtableRecord<StudentFields>>(
    'Students',
    {
      method: 'POST',
      body: JSON.stringify({ fields: payload }),
    },
  )

  return mapStudent(record)
}

export async function signupTeacher({
  email,
  password,
  fullName,
  schoolCode,
}: {
  email: string
  password: string
  fullName?: string
  schoolCode?: string
}) {
  const existing = await findTeacherByEmail(email, schoolCode)
  if (existing) {
    throw new Error('This email already has a faculty account.')
  }

  const payload: TeacherFields = {
    email,
    password,
    full_name: fullName,
  }

  if (schoolCode) {
    payload.school_id = schoolCode
  }

  const record = await airtableRequest<AirtableRecord<TeacherFields>>(
    'Teachers',
    {
      method: 'POST',
      body: JSON.stringify({ fields: payload }),
    },
  )

  return mapTeacher(record)
}

async function findStudentByRoll(rollNo: string, schoolCode?: string) {
  const formula = `{roll_no}='${escapeValue(rollNo)}'`
  const data = await airtableRequest<AirtableListResponse<StudentFields>>(
    `Students?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`,
  )
  const record = data.records.find((entry) =>
    schoolCode && entry.fields.school_id
      ? entry.fields.school_id === schoolCode
      : true,
  )
  return record ? mapStudent(record) : null
}

async function findTeacherByEmail(email: string, schoolCode?: string) {
  const formula = `{email}='${escapeValue(email)}'`
  const data = await airtableRequest<AirtableListResponse<TeacherFields>>(
    `Teachers?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`,
  )
  const record = data.records.find((entry) =>
    schoolCode && entry.fields.school_id
      ? entry.fields.school_id === schoolCode
      : true,
  )
  return record ? mapTeacher(record) : null
}

export async function fetchStudentAttendance(
  rollNo: string,
  schoolCode?: string,
) {
  const formula = `{student_roll_no}='${escapeValue(rollNo)}'`
  const data =
    await airtableRequest<AirtableListResponse<StudentAttendanceFields>>(
      `Student%20Attendance?filterByFormula=${encodeURIComponent(formula)}`,
    )
  return data.records
    .filter((entry) =>
      schoolCode && entry.fields.school_id
        ? entry.fields.school_id === schoolCode
        : true,
    )
    .map(mapStudentAttendance)
}

export async function fetchStudentMarks(rollNo: string, schoolCode?: string) {
  const formula = `{student_roll_no}='${escapeValue(rollNo)}'`
  const data = await airtableRequest<AirtableListResponse<StudentMarkFields>>(
    `Student%20Marks?filterByFormula=${encodeURIComponent(formula)}`,
  )
  return data.records
    .filter((entry) =>
      schoolCode && entry.fields.school_id
        ? entry.fields.school_id === schoolCode
        : true,
    )
    .map(mapStudentMark)
}

export async function fetchTeacherAttendance(
  email: string,
  schoolCode?: string,
) {
  const formula = `{teacher_email}='${escapeValue(email)}'`
  const data =
    await airtableRequest<AirtableListResponse<TeacherAttendanceFields>>(
      `Teacher%20Attendance?filterByFormula=${encodeURIComponent(formula)}`,
    )
  return data.records
    .filter((entry) =>
      schoolCode && entry.fields.school_id
        ? entry.fields.school_id === schoolCode
        : true,
    )
    .map(mapTeacherAttendance)
}

export async function fetchTeacherReviews(
  email: string,
  schoolCode?: string,
) {
  const formula = `{teacher_email}='${escapeValue(email)}'`
  const data = await airtableRequest<AirtableListResponse<TeacherReviewFields>>(
    `Teacher%20Reviews?filterByFormula=${encodeURIComponent(formula)}`,
  )
  return data.records
    .filter((entry) =>
      schoolCode && entry.fields.school_id
        ? entry.fields.school_id === schoolCode
        : true,
    )
    .map(mapTeacherReview)
}

export async function signup({
  role,
  ...payload
}: {
  role: AuthRole
  rollNo?: string
  email?: string
  password: string
  fullName?: string
  schoolCode?: string
}) {
  if (role === 'student') {
    if (!payload.rollNo) {
      throw new Error('Roll number is required for student signup.')
    }
    return signupStudent({
      rollNo: payload.rollNo,
      password: payload.password,
      fullName: payload.fullName,
      schoolCode: payload.schoolCode,
    })
  }

  if (!payload.email) {
    throw new Error('Email is required for faculty signup.')
  }

  return signupTeacher({
    email: payload.email,
    password: payload.password,
    fullName: payload.fullName,
    schoolCode: payload.schoolCode,
  })
}

export async function fetchSchools(): Promise<SchoolRecord[]> {
  const data = await airtableRequest<AirtableListResponse<SchoolFields>>(
    'Schools?maxRecords=100&sort[0][field]=school_name',
  )
  return data.records.map(mapSchool)
}
