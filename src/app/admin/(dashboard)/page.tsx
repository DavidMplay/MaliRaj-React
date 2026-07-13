import Link from "next/link";
import { UtensilsCrossed, CalendarDays, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminHomePage() {
  const supabase = await createClient();
  const { count: menuCount } = await supabase
    .from("menu_items")
    .select("*", { count: "exact", head: true });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">Dobrodošli natrag</h1>
      <p className="mt-1 text-muted">Upravljajte jelovnikom i tjednim menijem.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/admin/menu"
          className="group flex items-center justify-between rounded-xl2 border border-line bg-bg-card p-6 transition-colors hover:border-ember-300/50"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-300/10 text-ember-300">
              <UtensilsCrossed size={22} />
            </span>
            <div>
              <p className="font-display font-semibold text-white">Jelovnik</p>
              <p className="text-sm text-muted">{menuCount ?? 0} jela ukupno</p>
            </div>
          </div>
          <ArrowRight size={18} className="text-gray-600 transition-colors group-hover:text-ember-300" />
        </Link>

        <Link
          href="/admin/weekly-menu"
          className="group flex items-center justify-between rounded-xl2 border border-line bg-bg-card p-6 transition-colors hover:border-ember-300/50"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-300/10 text-ember-300">
              <CalendarDays size={22} />
            </span>
            <div>
              <p className="font-display font-semibold text-white">Tjedni meni</p>
              <p className="text-sm text-muted">Uredi dnevna jela po danima</p>
            </div>
          </div>
          <ArrowRight size={18} className="text-gray-600 transition-colors group-hover:text-ember-300" />
        </Link>
      </div>
    </div>
  );
}
