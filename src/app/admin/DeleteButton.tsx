"use client";

import { useTransition } from "react";
import { deleteGuest } from "./actions";

export function DeleteButton({ guestId, guestName }: { guestId: string; guestName: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Remove the RSVP from ${guestName}? This can't be undone.`)) return;
        startTransition(() => deleteGuest(guestId));
      }}
      className="min-h-11 rounded-full border-2 border-ink px-4 text-sm font-bold text-ink hover:bg-blush-soft disabled:opacity-60"
    >
      {pending ? "Removing…" : "Remove"}
    </button>
  );
}
