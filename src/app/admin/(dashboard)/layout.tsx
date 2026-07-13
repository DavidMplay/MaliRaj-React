import Link from "next/link";
import { UtensilsCrossed, CalendarDays, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/actions/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-line bg-bg-deep">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-lg font-bold text-white">
              Mali<span className="text-ember-300">Raj</span>{" "}
              <span className="text-sm font-normal text-gray-500">admin</span>
            </Link>
            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                href="/admin/menu"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <UtensilsCrossed size={16} />
                Jelovnik
              </Link>
              <Link
                href="/admin/weekly-menu"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <CalendarDays size={16} />
                Tjedni meni
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 text-sm text-gray-400 hover:text-white sm:flex"
            >
              Pogledaj stranicu <ExternalLink size={14} />
            </Link>
            <span className="hidden text-sm text-gray-500 md:inline">{user?.email}</span>
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-gray-300 transition-colors hover:border-ember-300 hover:text-ember-300"
              >
                <LogOut size={14} />
                Odjava
              </button>
            </form>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-line px-4 py-2 sm:hidden">
          <Link
            href="/admin/menu"
            className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
          >
            <UtensilsCrossed size={16} />
            Jelovnik
          </Link>
          <Link
            href="/admin/weekly-menu"
            className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
          >
            <CalendarDays size={16} />
            Tjedni meni
          </Link>
        </nav>
      </header>

      <main id="main-content" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
