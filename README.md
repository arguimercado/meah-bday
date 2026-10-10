# Darlyn's 7th Birthday — e-invitation

A small Next.js site for Darlyn's pool party: an invitation page, an RSVP form,
a thank-you page, and a password-protected guest list.

- `/` — the invitation
- `/rsvp` — guests enter their name, number of kids, kids' names, and whether they're staying overnight
- `/rsvp/thanks` — confirmation with a summary of their reply
- `/admin` — guest list with totals (needs `ADMIN_PASSWORD`)

Stack: Next.js 16 (App Router, Server Actions), Tailwind CSS 4, Prisma 7 with the
Neon serverless adapter, Neon Postgres.

## Edit the party details

Everything shown on the pages (time, venue, RSVP deadline…) lives in
[`src/lib/party.ts`](src/lib/party.ts). Replace the `[PARTY TIME]`,
`[VENUE NAME / RESORT]` and `[RSVP DEADLINE]` placeholders there.

The photo is `public/darlyn.jpg` (a square crop works best).

## Run locally

```bash
cp .env.example .env      # then fill in DATABASE_URL and ADMIN_PASSWORD
npm install               # also generates the Prisma client
npm run dev
```

Open http://localhost:3000.

## Database

The schema is in `prisma/schema.prisma` (`Guest` with many `Kid`s). The initial
migration in `prisma/migrations` has already been applied to the Neon project
`meah-invitation`. For future schema changes:

```bash
npx prisma migrate dev --name describe-change   # local / dev branch
npm run db:deploy                               # apply to production
```

## Deploy to Vercel

1. Import the GitHub repo in Vercel.
2. Add environment variables: `DATABASE_URL` (Neon pooled connection string) and `ADMIN_PASSWORD`.
3. Deploy. Share the invitation link with guests and check replies at `/admin`.

The site asks search engines not to index it (`robots` metadata and `robots.txt`),
so only people with the link will find it.
