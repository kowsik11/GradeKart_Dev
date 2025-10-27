# GradeKart Task Breakdown

## Phase 0 – Alignment & Renaming
- Update copy, metadata, and existing code references from “GradeCard” to “GradeKart”.
- Confirm Airtable env vars are configured and document required tables/columns for manual setup.

## Phase 1 – Core Foundations
- Finalize project structure (feature folders, routing scaffold, design tokens) and ensure lint/format tooling.
- Introduce React Router and shared layout primitives (sidebar shell, header, cards, tables, calendar placeholder).
- Set up data utilities: `lib/airtableClient` for reads, request typing, error helpers.

## Phase 2 – Landing Page & School Selection
- Build responsive grid consuming `Schools` table; support image aspect ratios, hover effects, and selection state.
- Show selected school context inside auth modal (logo, name).
- Add placeholder CTA for partner school onboarding.

## Phase 3 – Authentication Flow
- Implement unified auth modal with Student/Teacher toggles, defaulting to Student.
- Wire logins (reads) directly to Airtable via `filterByFormula` using `school_id`.
- Restrict signup to faculty/admin; collect minimal fields and submit through temporary mock until serverless routes are ready.
- Store auth session (role, school, identifier, token if any) and protect dashboard routes.

## Phase 4 – Serverless Write Proxy
- Scaffold serverless functions (e.g., `/api/airtable-write`) handling POST/PATCH for Teachers, Students, Marks, Events, Assignments.
- Add validation, role checks, and error normalization; hide Airtable PAT in serverless env.
- Update frontend signup/management flows to call proxy instead of direct Airtable writes.

## Phase 5 – Student Dashboard MVP
- Layout dashboard shell with attendance summary, marks table, calendar snapshot, notifications, and profile card.
- Implement data hooks (`useStudentAttendance`, `useStudentMarks`, `useStudentEvents`, `useStudentFees`).
- Add read-only sections for timetable, hostel, counselling diary, including empty states and loading skeletons.

## Phase 6 – Faculty Dashboard MVP
- Build teacher dashboard panels: self attendance, reviews, assignments/quizzes CRUD, mark entry, event creation.
- Enable student registration form (writes to Students table via serverless proxy).
- Integrate reminders widget (upcoming events/exams) and counselling diary create/read.

## Phase 7 – Head of School & Owner Views (Scaffolding)
- Create head dashboard with teacher/class/subject management placeholders and summary cards.
- Build owner overview showing school logos, key metrics, and quick-switch control.
- Prepare analytics hooks for attendance/fees overview (can use mock data initially).

## Phase 8 – Cross-Cutting Enhancements
- Implement notifications system, sidebar navigation states, and responsive breakpoints.
- Add permission guards so only appropriate roles see management tools.
- Polish calendar UI with color-coded events and filter chips.

## Phase 9 – QA, Documentation & Deployment
- Write README updates (setup, env vars, Airtable schema checklist, serverless deployment steps).
- Add test coverage: unit (helpers), component (auth modal, landing cards), integration (login flow).
- Perform manual QA across roles (student/teacher head/owner), including error and empty states.
- Prepare deployment scripts/config for hosting + serverless (Netlify/Vercel) and document promotion plan.
