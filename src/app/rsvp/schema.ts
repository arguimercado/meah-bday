import { z } from "zod";

export const MAX_KIDS = 10;

export const rsvpSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(80, "That name is a bit long."),
  kidNames: z
    .array(z.string().trim().min(1, "Please enter a name.").max(60, "That name is a bit long."))
    .min(1, "Bring at least one kid!")
    .max(MAX_KIDS, `Up to ${MAX_KIDS} kids per RSVP.`),
  overnight: z.enum(["yes", "no"], { error: "Please choose yes or no." }),
});

export type RsvpErrors = {
  name?: string;
  kidCount?: string;
  kidNames?: Record<number, string>;
  overnight?: string;
  form?: string;
};

export type RsvpState = {
  errors?: RsvpErrors;
};
