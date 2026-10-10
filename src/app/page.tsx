import Image from "next/image";
import Link from "next/link";
import { SkyBackground } from "@/components/SkyBackground";
import { Sparkle } from "@/components/Sparkle";
import { ArrowRightIcon, CalendarIcon, PinIcon, PoolIcon } from "@/components/icons";
import { party } from "@/lib/party";
import darlyn from "../../public/darlyn.jpg";

const POOL_RING =
  "conic-gradient(#C9306F 0deg 35deg, #FFFFFF 35deg 55deg, #C9306F 55deg 125deg, #FFFFFF 125deg 145deg, #C9306F 145deg 215deg, #FFFFFF 215deg 235deg, #C9306F 235deg 305deg, #FFFFFF 305deg 325deg, #C9306F 325deg 360deg)";

function DetailCard({
  icon,
  iconBg,
  label,
  title,
  sub,
  dark = false,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  title: string;
  sub: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-[22px] p-[18px] ${
        dark ? "border-2 border-ink bg-ink text-white shadow-[4px_4px_0_#C9306F]" : "sticker bg-white"
      }`}
    >
      <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>{icon}</div>
      <div className="min-w-0">
        <p className={`text-xs font-extrabold uppercase tracking-[0.12em] ${dark ? "text-blush" : "text-plum"}`}>
          {label}
        </p>
        <p className="font-display text-[19px] font-semibold leading-snug">{title}</p>
        <p className={`text-sm ${dark ? "text-mist" : "text-muted"}`}>{sub}</p>
      </div>
    </div>
  );
}

export default function InvitationPage() {
  return (
    <>
      <SkyBackground />
      <main className="relative z-10 px-4 pb-8 pt-6 sm:pt-10">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-stretch gap-8">
          {/* Hero card */}
          <section className="relative flex min-w-0 flex-[1_1_340px] flex-col items-center justify-center gap-3 overflow-hidden rounded-[32px] bg-ink px-6 pb-24 pt-10 text-center">
            <Sparkle size={18} className="twinkle absolute left-7 top-9" />
            <Sparkle size={12} color="#F27AAE" className="absolute right-11 top-16" />
            <Sparkle size={14} color="#B892F0" className="twinkle absolute right-8 top-[46%]" />
            <Sparkle size={10} className="absolute left-11 top-[58%]" />

            <p className="font-display text-[15px] font-semibold uppercase tracking-[0.2em] text-blush">
              You&apos;re invited to my
            </p>
            <h1 className="flex items-center gap-2.5">
              <span className="font-display text-[120px] font-bold leading-[0.9] text-blush">{party.age}</span>
              <span className="text-left font-display text-[34px] font-bold leading-none text-white">
                th
                <br />
                Birthday
              </span>
            </h1>
            <p className="font-display text-[26px] font-bold tracking-wide text-white">Pool Party!</p>

            <div
              className="relative mt-3 size-[232px] rounded-full p-[17px] shadow-[0_0_0_4px_#1B1325,0_0_36px_rgba(242,122,174,0.55)]"
              style={{ background: POOL_RING }}
            >
              <div className="relative size-[198px] overflow-hidden rounded-full border-[3px] border-ink bg-pool">
                <Image
                  src={darlyn}
                  alt={`${party.firstName}, the birthday girl`}
                  fill
                  sizes="198px"
                  priority
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
              <Sparkle size={34} className="twinkle absolute -right-1.5 top-1" />
              <Sparkle size={20} color="#F27AAE" className="absolute -left-2.5 bottom-8" />
              <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-ink bg-sun px-3.5 py-1 font-display text-[15px] font-bold text-ink">
                Birthday girl!
              </span>
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 390 70"
              preserveAspectRatio="none"
              className="absolute -bottom-px left-0 block h-[70px] w-full"
            >
              <path d="M0 30 Q48 6 97 30 T195 30 T292 30 T390 30 L390 70 L0 70 Z" fill="#5BC8D9" />
              <path d="M0 46 Q48 26 97 46 T195 46 T292 46 T390 46 L390 70 L0 70 Z" fill="#3FA9BC" />
            </svg>
          </section>

          {/* Details */}
          <section className="flex min-w-0 flex-[1_1_340px] flex-col justify-center gap-3.5">
            <div className="px-1 pb-2">
              <p className="text-[15px] font-bold text-blush-soft">Come celebrate with</p>
              <h2 className="font-display text-4xl font-bold leading-tight text-white [text-shadow:0_2px_0_#2A1650]">
                {party.celebrant}
              </h2>
            </div>

            <DetailCard
              icon={<CalendarIcon className="text-white" />}
              iconBg="bg-grape"
              label="When"
              title={party.date}
              sub={party.time}
            />
            <DetailCard
              icon={<PinIcon className="text-white" />}
              iconBg="bg-rose"
              label="Where"
              title={party.town}
              sub={party.venue}
            />
            <DetailCard
              dark
              icon={<PoolIcon className="text-ink" />}
              iconBg="bg-pool"
              label="Don't forget to bring"
              title={party.bring}
              sub="It's a pool party!"
            />

            <div className="flex flex-col gap-3 pt-3.5">
              <Link
                href="/rsvp"
                className="btn-press flex min-h-[60px] items-center justify-center gap-2.5 rounded-full bg-rose font-display text-[21px] font-bold text-white focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-sun"
              >
                RSVP now
                <ArrowRightIcon className="size-[22px]" />
              </Link>
              <p className="text-center text-sm font-bold text-white">Kindly reply by {party.rsvpDeadline}</p>
            </div>
          </section>
        </div>

        <p className="relative mx-auto max-w-[1120px] pt-8 text-center font-display text-base font-semibold text-moon">
          See you there! Love, {party.firstName}
        </p>
      </main>
    </>
  );
}
