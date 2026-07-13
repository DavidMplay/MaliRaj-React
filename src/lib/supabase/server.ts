import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase client for use in Server Components, Server Actions, and Route
 * Handlers. Reads/writes the auth session via Next.js cookies so the
 * logged-in staff session survives across requests.
 *
 * NOTE: Server Components can't write cookies (Next.js restriction), so the
 * `setAll` call below is wrapped in try/catch. Session refresh is instead
 * handled centrally in middleware.ts, which *can* write cookies.
 */
export async function createClient() {
  const cookieStore = await cookies();
  type CookieToSet = { name: string; value: string; options?: Parameters<typeof cookieStore.set>[2] };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — safe to ignore because
            // middleware.ts refreshes the session on every request anyway.
          }
        },
      },
    }
  );
}
