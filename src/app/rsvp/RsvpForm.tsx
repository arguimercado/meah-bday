"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { MinusIcon, MoonIcon, PlusIcon, SunIcon } from "@/components/icons";
import { submitRsvp } from "./actions";
import { MAX_KIDS, type RsvpState } from "./schema";

const initialState: RsvpState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-press mt-1.5 flex min-h-[60px] w-full items-center justify-center rounded-full bg-rose font-display text-[21px] font-bold text-white disabled:cursor-wait disabled:opacity-80 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-blush"
    >
      {pending ? "Sending…" : "Send my RSVP"}
    </button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm font-bold text-rose">
      {message}
    </p>
  );
}

export function RsvpForm() {
  const [state, formAction] = useActionState(submitRsvp, initialState);
  const [name, setName] = useState("");
  const [kidNames, setKidNames] = useState<string[]>([""]);
  const [overnight, setOvernight] = useState<"yes" | "no" | "">("");
  const errors = state.errors ?? {};
  const kidCount = kidNames.length;

  const setCount = (next: number) => {
    const count = Math.min(MAX_KIDS, Math.max(1, next));
    setKidNames((prev) =>
      count > prev.length ? [...prev, ...Array(count - prev.length).fill("")] : prev.slice(0, count),
    );
  };

  const choiceClass = (selected: boolean) =>
    `flex min-h-16 flex-col items-center justify-center gap-1 rounded-[18px] border-2 border-ink p-2 font-display text-base font-semibold transition ${
      selected
        ? "bg-grape text-white shadow-[0_4px_0_#1B1325]"
        : "bg-paper text-ink hover:bg-lilac-soft"
    } has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-blush`;

  return (
    <form
      action={formAction}
      noValidate
      className="sticker relative flex min-w-0 flex-[1.5_1_340px] flex-col gap-[22px] rounded-[28px] bg-white px-5 py-6 shadow-[5px_5px_0_#1B1325] sm:px-7"
    >
      {/* Honeypot for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {errors.form && (
        <p role="alert" className="rounded-2xl border-2 border-rose bg-blush-soft px-4 py-3 text-sm font-bold text-ink">
          {errors.form}
        </p>
      )}

      {/* 1. Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-display text-[17px] font-semibold">
          1. Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Maria Santos"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="field"
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      {/* 2. How many kids */}
      <div className="flex flex-col gap-2">
        <p id="kids-label" className="font-display text-[17px] font-semibold">
          2. How many kids?
        </p>
        <div
          role="group"
          aria-labelledby="kids-label"
          className="flex max-w-[280px] items-center justify-between rounded-2xl border-2 border-ink bg-paper p-1.5"
        >
          <button
            type="button"
            aria-label="Fewer kids"
            onClick={() => setCount(kidCount - 1)}
            disabled={kidCount <= 1}
            className="flex size-12 items-center justify-center rounded-xl bg-lilac-soft text-ink disabled:opacity-40"
          >
            <MinusIcon className="size-[22px]" />
          </button>
          <output aria-live="polite" className="font-display text-[28px] font-bold">
            {kidCount}
          </output>
          <button
            type="button"
            aria-label="More kids"
            onClick={() => setCount(kidCount + 1)}
            disabled={kidCount >= MAX_KIDS}
            className="flex size-12 items-center justify-center rounded-xl bg-grape text-white disabled:opacity-40"
          >
            <PlusIcon className="size-[22px]" />
          </button>
        </div>
        <FieldError id="count-error" message={errors.kidCount} />
      </div>

      {/* 3. Kid names */}
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 font-display text-[17px] font-semibold">3. Name of the kids</legend>
        <div className="flex flex-wrap gap-2.5">
          {kidNames.map((kid, i) => {
            const error = errors.kidNames?.[i];
            return (
              <div key={i} className="flex min-w-0 flex-[1_1_220px] flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rose font-display text-base font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  <input
                    name="kidName"
                    type="text"
                    aria-label={`Name of kid ${i + 1}`}
                    placeholder="Kid's name"
                    value={kid}
                    onChange={(e) =>
                      setKidNames((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
                    }
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `kid-${i}-error` : undefined}
                    className="field min-w-0 flex-1"
                  />
                </div>
                <div className="pl-[46px]">
                  <FieldError id={`kid-${i}-error`} message={error} />
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* 4. Overnight */}
      <fieldset
        className="flex flex-col gap-2"
        aria-describedby={errors.overnight ? "overnight-error" : undefined}
      >
        <legend className="mb-2 font-display text-[17px] font-semibold">4. Staying overnight?</legend>
        <div className="grid grid-cols-2 gap-3">
          <label className={choiceClass(overnight === "yes")}>
            <input
              type="radio"
              name="overnight"
              value="yes"
              checked={overnight === "yes"}
              onChange={() => setOvernight("yes")}
              className="sr-only"
            />
            <MoonIcon className="size-[22px]" />
            Yes, overnight
          </label>
          <label className={choiceClass(overnight === "no")}>
            <input
              type="radio"
              name="overnight"
              value="no"
              checked={overnight === "no"}
              onChange={() => setOvernight("no")}
              className="sr-only"
            />
            <SunIcon className="size-[22px]" />
            No, day only
          </label>
        </div>
        <FieldError id="overnight-error" message={errors.overnight} />
      </fieldset>

      <SubmitButton />
    </form>
  );
}
