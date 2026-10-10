import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChibiDarlyn } from "@/components/ChibiDarlyn";
import { SkyBackground } from "@/components/SkyBackground";
import { db } from "@/lib/db";
import { party } from "@/lib/party";

export const metadata: Metadata = {
  title: `Thank you! · ${party.firstName}'s ${party.age}th Birthday`,
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-[15px]">
      <span className="text-mist">{label}</span>
      <span className="text-right font-extrabold">{value}</span>
    </div>
  );
}

async function Summary({ searchParams }: { searchParams: Promise<{ id?: string | string[] }> }) {
  const { id } = await searchParams;
  const guest =
    typeof id === "string" && id.length <= 40
      ? await db.guest.findUnique({
          where: { id },
          include: { kids: { orderBy: { id: "asc" } } },
        })
      : null;

  if (!guest) return null;

  return (
    <div className="flex w-full flex-col gap-2.5 rounded-[22px] bg-ink-2/90 p-[18px] text-left">
      <Row label="Guest" value={guest.name} />
      <Row label={guest.kidCount === 1 ? "Kid" : `Kids (${guest.kidCount})`} value={guest.kids.map((k) => k.name).join(", ")} />
      <Row label="Overnight" value={guest.overnight ? "Yes, overnight" : "No, day only"} />
    </div>
  );
}

export default function ThanksPage({ searchParams }: PageProps<"/rsvp/thanks">) {
  return (
    <>
      <SkyBackground />
      <main className="relative z-10 px-4 pb-10 pt-14 text-white">
        <div className="mx-auto flex max-w-[520px] flex-col items-center gap-[18px] text-center">
          <ChibiDarlyn
            variant="cheer"
            label={`${party.firstName} waving happily with her pool ring`}
            className="float h-auto w-full max-w-[230px]"
          />
          <h1 className="font-display text-[40px] font-bold leading-tight">Yay! Thank you!</h1>
          <p className="text-[17px] leading-relaxed">
            Your RSVP is in. We can&apos;t wait to splash with you at {party.firstName}&apos;s {party.age}th
            birthday!
          </p>

          <Suspense fallback={<div className="h-[120px] w-full animate-pulse rounded-[22px] bg-ink-2/60" />}>
            <Summary searchParams={searchParams} />
          </Suspense>

          <div className="w-full rounded-[22px] bg-pool px-[18px] py-4 font-display text-base font-semibold text-ink">
            {party.date} · {party.town}
            <br />
            Bring a swimsuit + extra shirt!
          </div>

          <Link
            href="/"
            className="mt-3 flex min-h-14 w-full max-w-[320px] items-center justify-center rounded-full border-2 border-blush font-display text-lg font-semibold text-blush hover:bg-blush hover:text-ink"
          >
            Back to invitation
          </Link>
        </div>
      </main>
    </>
  );
}
