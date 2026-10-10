"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="sticker mx-auto flex w-full max-w-sm flex-col gap-4 rounded-[28px] bg-white p-6">
      <h1 className="font-display text-2xl font-bold">Guest list</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-display text-[17px] font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "password-error" : undefined}
          className="field"
        />
        {state.error && (
          <p id="password-error" className="text-sm font-bold text-rose">
            {state.error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="btn-press min-h-[52px] rounded-full bg-grape font-display text-lg font-bold text-white disabled:opacity-80"
      >
        {pending ? "Checking…" : "Open guest list"}
      </button>
    </form>
  );
}
