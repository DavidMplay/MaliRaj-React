import { createClient } from "@/lib/supabase/server";
import { WeeklyDayEditor } from "@/components/admin/WeeklyDayEditor";
import type { WeeklyDay } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminWeeklyMenuPage() {
  const supabase = await createClient();

  const [{ data: days }, { data: mains }] = await Promise.all([
    supabase.from("weekly_menu_days").select("*").order("day_order"),
    supabase.from("weekly_menu_mains").select("*").order("sort_order"),
  ]);

  const weeklyDays: WeeklyDay[] = (days ?? []).map((day) => ({
    ...day,
    mains: (mains ?? []).filter((m) => m.day_id === day.id),
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">Tjedni meni</h1>
      <p className="mt-1 text-muted">
        Uredite juhu i dnevna jela za svaki dan — promjene su odmah vidljive na stranici.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {weeklyDays.map((day) => (
          <WeeklyDayEditor key={day.id} day={day} />
        ))}
      </div>
    </div>
  );
}
