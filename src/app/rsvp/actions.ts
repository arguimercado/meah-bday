"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { rsvpSchema, type RsvpErrors, type RsvpState } from "./schema";

export async function submitRsvp(_prev: RsvpState, formData: FormData): Promise<RsvpState> {
  // Honeypot: real guests never fill this hidden field.
  if (formData.get("website")) {
    return { errors: { form: "Something went wrong. Please try again." } };
  }

  const parsed = rsvpSchema.safeParse({
    name: formData.get("name") ?? "",
    kidNames: formData.getAll("kidName").map(String),
    overnight: formData.get("overnight") ?? "",
  });

  if (!parsed.success) {
    const errors: RsvpErrors = {};
    for (const issue of parsed.error.issues) {
      const [field, index] = issue.path;
      if (field === "kidNames" && typeof index === "number") {
        errors.kidNames ??= {};
        errors.kidNames[index] ??= issue.message;
      } else if (field === "kidNames") {
        errors.kidCount ??= issue.message;
      } else if (field === "name" || field === "overnight") {
        errors[field] ??= issue.message;
      }
    }
    return { errors };
  }

  const { name, kidNames, overnight } = parsed.data;
  const kidCount = kidNames.length;

  let guestId: string;
  try {
    const guest = await db.guest.create({
      data: {
        name,
        kidCount,
        overnight: overnight === "yes",
        kids: { create: kidNames.map((kid) => ({ name: kid })) },
      },
      select: { id: true },
    });
    guestId = guest.id;
  } catch (error) {
    console.error("Failed to save RSVP", error);
    return { errors: { form: "We couldn't save your RSVP just now. Please try again in a moment." } };
  }

  redirect(`/rsvp/thanks?id=${guestId}`);
}
