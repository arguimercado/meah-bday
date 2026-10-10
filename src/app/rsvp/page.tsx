import type { Metadata } from "next";
import Link from "next/link";
import { ChibiDarlyn } from "@/components/ChibiDarlyn";
import { SkyBackground } from "@/components/SkyBackground";
import { Sparkle } from "@/components/Sparkle";
import { ArrowLeftIcon, CalendarIcon, PinIcon } from "@/components/icons";
import { party } from "@/lib/party";
import { RsvpForm } from "./RsvpForm";

export const metadata: Metadata = {
  title: `RSVP · ${party.firstName}'s ${party.age}th Birthday`,
};

export default function RsvpPage() {
  return (
    <>
      <SkyBackground butterflies={false} />
      <main className="relative z-10 px-4 pb-8 pt-6 sm:pt-10">
        <div className="mx-auto flex max-w-[1040px] flex-wrap items-stretch gap-7">
          <section className="relative flex min-w-0 flex-[1_1_300px] flex-col gap-[18px] overflow-hidden rounded-[32px] bg-ink px-6 pb-7 pt-5">
            <Sparkle size={14} className="twinkle absolute right-9 top-8" />
            <Link
              href="/"
              aria-label="Back to invitation"
              className="flex size-11 items-center justify-center rounded-[14px] bg-ink-2 text-white hover:bg-plum"
            >
              <ArrowLeftIcon className="size-[22px]" />
            </Link>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-blush">
                  {party.firstName}&apos;s {party.age}th · {party.shortDate}
                </p>
                <h1 className="font-display text-4xl font-bold leading-tight text-white">
                  Are you
                  <br />
                  coming?
                </h1>
              </div>
              <ChibiDarlyn variant="face" className="h-auto w-[120px] md:hidden" />
            </div>
            <div className="hidden flex-1 items-center justify-center md:flex">
              <ChibiDarlyn
                label={`${party.firstName} in her flower dress, holding a pool ring`}
                className="float h-auto w-full max-w-[230px]"
              />
            </div>
            <div className="mt-auto flex flex-col gap-2.5 text-[15px] text-mist">
              <p className="flex items-center gap-2.5">
                <CalendarIcon className="size-5 text-pool" />
                {party.date}
              </p>
              <p className="flex items-center gap-2.5">
                <PinIcon className="size-5 text-pool" />
                {party.town}
              </p>
            </div>
          </section>

          <RsvpForm />
        </div>
      </main>
    </>
  );
}
