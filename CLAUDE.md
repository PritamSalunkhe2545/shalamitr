# Shalamitr — Project Context

## What is this?
Shalamitr ("Friend of the School") is a school management web app for
Jijau English School, Bamhane, Dondaicha, Maharashtra, India.
~200 students, Nursery to 8th standard.

Owner: Pritam (Cloud Engineer). Built entirely with Claude Code. Deadline: May 15, 2026.

## Tech Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **UI**: shadcn/ui + Tailwind CSS (CSS variables, slate base color)
- **Database**: PostgreSQL via Supabase (Prisma ORM)
- **Auth**: Clerk (`@clerk/nextjs`)
- **PDF**: `@react-pdf/renderer` (certificates only — NOT receipts)
- **File Storage**: Supabase Storage (for certificate PDFs)
- **Deployment**: Docker Compose + Cloudflare Tunnel on home Ubuntu server

## Never add
Redis, message queues, microservices, GraphQL, separate backend, MongoDB.

---

## Key Conventions

### Route Groups
- `(auth)` — unauthenticated pages, centered layout, no sidebar
- `(app)` — authenticated pages, sidebar + header layout

### Authentication
All `(app)` routes are protected by Clerk middleware in `src/middleware.ts`.
In API routes, always call `const { userId } = await auth()` at the top and return 401 if null.

### Database
- Use the singleton from `src/lib/prisma.ts` — NEVER `new PrismaClient()` directly
- All money fields use `Decimal` (`@db.Decimal(10, 2)`) — never `Float`
- `className` is a plain `String` — see `CLASS_LIST` in `src/lib/constants.ts`
- Current academic year: use `CURRENT_ACADEMIC_YEAR` constant from `src/lib/constants.ts`

### Forms
Use `react-hook-form` + `zod`. Schemas live in `src/lib/validations/`.
Prefer API routes over server actions for form submissions (simpler error handling).

### Receipt Printing
Receipts use HTML + `@media print` CSS + `window.print()`.
Do NOT use `@react-pdf/renderer` for receipts.

### Certificate PDFs
Use `@react-pdf/renderer`:
- PDF components must be in Client Components or API routes
- Use `dynamic(() => import(...), { ssr: false })` for client-side rendering
- Or use `renderToBuffer()` in an API route for server-side generation
- Always store a `snapshotData` JSON on the Certificate record

### Attendance
- One row per student per day — `@@unique([studentId, date])`
- Use `prisma.attendance.upsert()` when marking/re-marking
- `date` is stored as `@db.Date` (no time component)
- For bulk operations use `prisma.$transaction([...upserts])`

### Numbering Formats
- Receipt numbers: `RCPT-{YEAR}-{SEQUENCE}` e.g. `RCPT-2025-0001`
- Bonafide serial: `BON-{YEAR}-{SEQUENCE}` e.g. `BON-2025-0001`
- Leaving cert serial: `LVG-{YEAR}-{SEQUENCE}` e.g. `LVG-2025-0001`
- Admission numbers: assigned by school staff manually

### Prisma + Supabase
Two connection URLs are required:
- `DATABASE_URL` — pooled (PgBouncer), has `?pgbouncer=true`, used at runtime
- `DIRECT_URL` — direct connection, used by `prisma migrate`

---

## Data Models Summary

| Model | Purpose |
|-------|---------|
| `Student` | Core student record |
| `FeeStructure` | Annual fee per class |
| `FeeRecord` | Individual payment record |
| `Attendance` | Daily attendance per student |
| `Certificate` | Generated bonafide/leaving certificate |

---

## MVP Features
1. **Dashboard** — Stats: total students, today's attendance, pending dues, recent activity
2. **Student Management** — Add/edit/deactivate, search, profile page
3. **Fee Management** — Record payment, pending dues, class-wise summary, HTML print receipt
4. **Attendance** — Mark class-wise, history per student, monthly summary
5. **Certificates** — Generate Bonafide + Leaving Certificate PDFs, download

---

## Running Locally
```bash
npm run dev              # Start dev server at http://localhost:3000
npx prisma studio        # Browse database GUI
npx prisma migrate dev --name <name>  # Create + apply a migration
npx prisma db seed       # Seed test data
```

## Deployment (Docker Compose)
```bash
docker compose up -d --build                                  # Build and start
docker compose exec app npx prisma migrate deploy            # Run pending migrations
docker compose logs -f app                                    # Follow logs
```

## Environment Variables
See `.env.example` for all required variables. Copy to `.env` and fill in real values.
Never commit `.env`.
