# Innovision /27

> **Build what matters.**
>
> A cinematic, accessible event showcase for Innovision at Netaji Subhas University of Technology, Dwarka, New Delhi.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Neon](https://img.shields.io/badge/Neon-Postgres-00E599?logo=neon&logoColor=111111)](https://neon.tech/)

Innovision /27 is a polished single-page event experience built to help students discover, compare, and register for campus events. It combines editorial visual design with real interactive flows: a live countdown, event filtering, detailed event pages, map directions, registration validation, and secure server-side persistence.

## Highlights

- **Event-first homepage** with an immersive hero, event overview, and clear registration calls to action.
- **Live countdown** showing days, hours, minutes, and seconds until the event.
- **Moments gallery** for visual storytelling and event atmosphere.
- **Filterable schedule** with day and track controls.
- **Dedicated event pages** at `/events/[id]` with practical participation information, including:
  - What the event is about
  - What participants will do
  - Capacity and participation format
  - Intended audience and takeaways
  - Time, track, venue, map directions, and registration CTA
- **Secure registration flow** with client and server validation, duplicate prevention, bounded inputs, safe errors, and abuse throttling.
- **Neon Postgres storage** for registration records.
- **Contact Us page** at `/contact` with social links, email, and campus directions.
- **Responsive and accessible UI** with keyboard focus states, semantic landmarks, reduced-motion support, and mobile-friendly navigation.
- **Security headers** for clickjacking protection, MIME sniffing protection, referrer control, HSTS, and permissions policy.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Innovision event showcase and registration experience |
| `/contact` | Contact facilities, social channels, email, and directions |
| `/events/[id]` | Detailed brief for an individual event |
| `/api/registrations` | Server-side registration endpoint |

## Tech stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4, custom CSS design system
- **Icons:** Lucide React
- **Validation:** Zod
- **Database:** Neon Postgres
- **Database access:** Drizzle ORM with `pg`
- **Deployment workflow:** Vercel + v0

## Getting started

### Prerequisites

- Node.js 20 or newer
- pnpm, npm, or Yarn
- A Neon Postgres database for registration storage

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Create `.env.local` with the database connection string supplied by Neon:

```env
DATABASE_URL=postgresql://...
```

Never commit `.env.local` or expose database credentials in client-side code.

### Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
pnpm build
pnpm start
```

## Registration API

Registrations are submitted to `POST /api/registrations` as JSON:

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "roll": "2022UIC3457",
  "eventId": "d1-1"
}
```

The server validates the payload before writing to Neon. A unique database constraint prevents the same email address from registering for the same event more than once.

## Project structure

```text
app/
├── api/registrations/route.ts   # Secure registration endpoint
├── contact/page.tsx             # Contact Us page
├── events/[id]/page.tsx         # Event detail pages
├── globals.css                  # Design system and responsive styles
├── layout.tsx                   # Metadata, fonts, and root layout
└── page.tsx                     # Homepage entry point

components/
└── innovision-app.tsx           # Interactive homepage experience

data/
└── schedule.ts                  # Event schedule and metadata

lib/
└── db.ts                        # Neon/Drizzle database connection
```

## Design direction

The interface uses a focused black, white, and orange palette inspired by campus posters, night-stage lighting, and technical exhibition graphics. The visual system prioritizes strong editorial typography, generous negative space, crisp borders, deliberate motion, and high-contrast calls to action.

## Security notes

- Keep database access server-side.
- Validate all registration data on the server; client validation is only a usability layer.
- Use HTTPS in deployed environments.
- Do not commit credentials, database URLs, or private environment files.
- Review rate limits and monitoring before opening registration to a large public audience.

## Development with v0

This project is connected to v0 for iterative development. You can continue refining the project here:

[Continue working on v0 →](https://v0.app/chat/projects/prj_CgZ89NVqKVmfdHYAByAFaqkzefrL)

## License

This project is currently intended as an Innovision / Enactus prototype. Add the license and contribution policy that best fits your organization before publishing it as an open-source project.
