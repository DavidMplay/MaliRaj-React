"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { LogIn, Loader2 } from "lucide-react";
import { signIn, type AuthState } from "@/actions/auth";

const initialState: AuthState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const searchParams = useSearchParams();
  const notAuthorized = searchParams.get("error") === "not-authorized";

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-bold text-white">
            Mali<span className="text-ember-300">Raj</span>
          </h1>
          <p className="mt-1 text-sm text-muted">Prijava za osoblje</p>
        </div>

        <form
          action={formAction}
          className="space-y-4 rounded-xl2 border border-line bg-bg-card p-6"
        >
          {notAuthorized && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              Ovaj račun nema pristup admin panelu. Obratite se vlasniku.
            </p>
          )}
          {state.error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {state.error}
            </p>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-lg border border-line bg-bg-deep px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-ember-300 focus:outline-none"
              placeholder="ime@malirajvukovar.hr"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-300">
              Lozinka
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-line bg-bg-deep px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-ember-300 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ember-300 px-6 py-3 font-display font-semibold text-white transition-colors hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {pending ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
            {pending ? "Prijava..." : "Prijavi se"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-600">
          Nemate pristup? Obratite se vlasniku restorana za otvaranje računa.
        </p>
      </div>
    </div>
  );
}
