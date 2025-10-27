# GradeKart Implementation Plan

## 1. Product & Naming Alignment
- Ensure every user-facing label, config, and documentation references **GradeKart**.
- Adopt consistent terminology for schools (campus), roles (Student, Faculty, Head of School, Owner), and core modules (Attendance, Marks, Fees, Calendar, Hostel, Counselling, Profile).

## 2. Architecture Strategy
- Frontend: Vite + React (TypeScript) SPA served from static hosting; component-driven with feature folders (`landing`, `auth`, `dashboard/<role>`, `shared`).
- State management: React Context for auth/session, React Query (or custom hooks) for Airtable data fetching to enable caching and refetch controls.
- API layer: thin fetch wrapper; reads occur client-side, while **all write/update operations flow through a small serverless proxy** (Netlify/Vercel/Azure Function) to keep the Airtable PAT hidden.
- Routing: React Router for role-based dashboard routes and nested sections (Attendance, Marks, Fees, etc.).
- Styling: CSS Modules with design tokens (color, spacing, typography) to deliver a clean white layout with hover/tile effects.

## 3. Landing Experience
- Fetch `Schools` table on load; render responsive grid (3 cards first row, 2 second row) showing school photo and name overlay.
- Clicking a school:
  - Stores `school_id` + metadata in global state.
  - Opens unified Sign In/Sign Up modal scoped to the chosen school (name/logo visible inside modal).
- Prepare copy/modules for future partner schools (CTA for “Add your campus” linking to contact form).

## 4. Authentication & Access Control
- Unified modal handles Student (roll + password) and Teacher (email + password) modes, defaulting to Student.
- Sign In:
  - Query `Students` or `Teachers` table filtered by `school_id` + identifier + password.
  - On success, bootstrap role session and route to respective dashboard.
- Sign Up:
  - Modal only exposes **faculty/admin signup** (students are created by teachers/head).
  - Submit to serverless route which writes into Airtable `Teachers` table.
- Dashboard routing logic:
  - Student → `/student` root with nested tabs.
  - Teacher → `/teacher` with ability to open management panels (assignments, events, registrations).
  - Head of School → `/head` with aggregate views.
  - Owner → `/owner` showing multi-school overview.

## 5. Dashboard Feature Sets
- **Common primitives**: Sidebar with icon navigation, header with school logo/name, notifications panel, profile dropdown.
- **Student Dashboard**: Attendance summary + detail table, marks & grades (subject grouping), timetable cards, fees (due/paid), events calendar, hostel assignment, counselling diary (read-only), editable profile.
- **Faculty Dashboard**: Self attendance + reviews, CRUD for assignments/quizzes/exams (writes via serverless), update student marks, create calendar events, register new students (writes to Students table), counselling diary authoring, reminders widget.
- **Head of School**: Manage teachers/classes/subjects/events, visibility into attendance/marks analytics per class, approvals dashboard.
- **Owner Dashboard**: High-level KPIs by school (enrolment, fees, attendance), logos grid, ability to switch schools.
- Phase deliverables: MVP should ship at least Student & Teacher dashboards with core cards (attendance, marks, calendar, notifications); other roles scaffolded for future iterations.

## 6. Airtable Data Model & Responsibilities
- Tables (all include `school_id` to partition data):
  - `Schools`: school_id, school_name, campus_name, photo_url, logo_url.
  - `Students`: roll_no, password, full_name, class, section, address, parent_details, awards, activities, fees linkage, hostel linkage.
  - `Teachers`: email, password, full_name, department, permissions.
  - `Subjects`: subject_code, subject_name, class, section, teacher_email.
  - `Student Marks`: student_roll_no, subject_code, assessment_type, assessment_name, date, max_score, score, grade.
  - `Student Attendance`: student_roll_no, subject_code, date, status.
  - `Teacher Attendance`: teacher_email, date, status.
  - `Teacher Reviews`: teacher_email, period, rating_overall, comments.
  - `Events`: title, type, date, class, section, description.
  - `Fees`: student_roll_no, fee_type, amount_due, amount_paid, due_date, status.
  - `Hostel`: student_roll_no, campus_name, building_name, room_number, bed_number, start_date.
  - `Counselling Diary`: roll_no, faculty_name, problem, remarks, date.
  - `Timetables`: class, section, day_of_week, period_number, subject_code.
- Reads: direct from Airtable via client.
- Writes: pipe through serverless proxy; design payload contracts and map to Airtable create/update requests.
- Document manual setup steps to ensure Airtable tables/fields exist (API cannot create tables programmatically).

## 7. Integration Workflow
- Create `lib/airtableClient.ts` for GET queries (uses PAT from env).
- Build serverless function(s) `/api/airtable-write` to handle POST/PATCH for Teachers, Students, Marks, Events, etc. Deploy alongside frontend.
- Implement hooks per feature (e.g., `useStudentAttendance`, `useTeacherAssignments`) that accept `school_id` and identifier filters.
- Add optimistic updates or refetch after writes to keep UI in sync.

## 8. UX & Visual Guidelines
- Clean white background with soft shadows; card corners rounded (16–20px).
- Grid layout for school cards with hover scaling and text overlay.
- Calendar view uses color-coding by event type.
- Notifications badge in header to surface reminders (assignments, fees, counselling follow-ups).
- Responsive behavior: 3-column landing grid on desktop, 2 on tablet, 1 on mobile; dashboards collapse sidebar into drawer on narrow viewports.

## 9. Security, Testing & Delivery
- Move secrets to `.env` (frontend) and serverless environment (writes); never hardcode PAT.
- Validation: enforce identifier formats, password rules, role-based permissions before calling serverless endpoints.
- Testing roadmap: unit tests for utils, component tests for auth modal toggle, integration tests (Cypress/Playwright) for login flows, smoke tests for serverless endpoints.
- Documentation: README update covering setup, env vars, Airtable schema checklist, deployment steps, and role-based walkthroughs.
- Future roadmap: analytics dashboards, bulk imports, offline caching, notifications via email/SMS.