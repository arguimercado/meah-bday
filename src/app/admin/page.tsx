import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { party } from "@/lib/party";
import { logout } from "./actions";
import { DeleteButton } from "./DeleteButton";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Guest list",
};

const timeFormat = new Intl.DateTimeFormat("en-PH", {
  timeZone: "Asia/Manila",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className={`sticker flex flex-col gap-1 rounded-[22px] p-4 ${tone}`}>
      <span className="font-display text-4xl font-bold leading-none">{value}</span>
      <span className="text-sm font-extrabold uppercase tracking-[0.1em]">{label}</span>
    </div>
  );
}

async function GuestList() {
  if (!isAdminConfigured()) {
    return (
      <div className="sticker mx-auto max-w-md rounded-[28px] bg-white p-6">
        <h1 className="font-display text-2xl font-bold">Set a password first</h1>
        <p className="mt-2 text-muted">
          Add <code className="rounded bg-lilac-soft px-1.5 py-0.5">ADMIN_PASSWORD</code> to your environment
          variables, then reload this page.
        </p>
      </div>
    );
  }

  if (!(await isAdmin())) return <LoginForm />;

  const guests = await db.guest.findMany({
    orderBy: { createdAt: "desc" },
    include: { kids: { orderBy: { id: "asc" } } },
  });

  const totalKids = guests.reduce((sum, g) => sum + g.kidCount, 0);
  const overnightGuests = guests.filter((g) => g.overnight);
  const overnightKids = overnightGuests.reduce((sum, g) => sum + g.kidCount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-blush-soft">
            {party.firstName}&apos;s {party.age}th · {party.shortDate}
          </p>
          <h1 className="font-display text-4xl font-bold text-white">Guest list</h1>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="min-h-11 rounded-full border-2 border-white px-5 font-bold text-white hover:bg-white hover:text-ink"
          >
            Log out
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="RSVPs" value={guests.length} tone="bg-white" />
        <Stat label="Kids coming" value={totalKids} tone="bg-blush-soft" />
        <Stat label="Overnight RSVPs" value={overnightGuests.length} tone="bg-lilac-soft" />
        <Stat label="Overnight kids" value={overnightKids} tone="bg-pool" />
      </div>

      {guests.length === 0 ? (
        <div className="sticker rounded-[22px] bg-white p-6 text-center">
          <p className="font-display text-xl font-semibold">No RSVPs yet</p>
          <p className="mt-1 text-muted">Share the invitation link and replies will show up here.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {guests.map((guest) => (
            <li
              key={guest.id}
              className="sticker flex flex-wrap items-center justify-between gap-4 rounded-[22px] bg-white p-4 sm:p-5"
            >
              <div className="min-w-0 flex-[1_1_260px]">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-xl font-semibold">{guest.name}</p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wide ${
                      guest.overnight ? "bg-grape text-white" : "bg-lilac-soft text-ink"
                    }`}
                  >
                    {guest.overnight ? "Overnight" : "Day only"}
                  </span>
                </div>
                <p className="mt-1 text-[15px]">
                  <span className="font-bold">
                    {guest.kidCount} {guest.kidCount === 1 ? "kid" : "kids"}:
                  </span>{" "}
                  {guest.kids.map((k) => k.name).join(", ")}
                </p>
                <p className="mt-1 text-sm text-muted">Replied {timeFormat.format(guest.createdAt)}</p>
              </div>
              <DeleteButton guestId={guest.id} guestName={guest.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <main className="relative z-10 px-4 pb-12 pt-8">
      <div className="mx-auto flex max-w-[960px] flex-col gap-6">
        <Link href="/" className="w-fit text-sm font-bold text-white underline underline-offset-4">
          ← Back to invitation
        </Link>
        <Suspense fallback={<p className="font-display text-xl text-white">Loading guest list…</p>}>
          <GuestList />
        </Suspense>
      </div>
    </main>
  );
}
