import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Runs on every request. Two jobs:
 * 1. Keep the Supabase auth session fresh (refreshes the token cookie
 *    before it expires — required by @supabase/ssr).
 * 2. Gate everything under /admin: no session (or not in admin_users) →
 *    bounce to /admin/login.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  type CookieToSet = { name: string; value: string; options?: Parameters<typeof response.cookies.set>[2] };

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";

  if (isAdminRoute && !isLoginRoute) {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Being logged in isn't enough — must also be on the admin allowlist.
    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (!adminRow) {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("error", "not-authorized");
      return NextResponse.redirect(url);
    }
  }

  // Already logged in + admin, but visiting the login page → send to dashboard.
  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
