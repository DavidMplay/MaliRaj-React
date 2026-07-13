import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { WeeklyMenuGrid } from "@/components/menu/WeeklyMenuGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { weeklyMenu as fallbackWeeklyMenu } from "@/lib/data/weekly";
import type { WeeklyDay } from "@/types";

export const metadata: Metadata = {
  title: "Tjedni meni",
  description:
    "Dnevna jela Bistro Mali Raj po danima u tjednu — domaća kuhinja po pristupačnim cijenama, svaki radni dan.",
  alternates: { canonical: "/weekly-menu" },
};

export const revalidate = 60;

/** Static seed data doesn't have real ids — synthesize stable ones so React keys work. */
function fallbackAsWeeklyDays(): WeeklyDay[] {
  return fallbackWeeklyMenu.map((day, dayIndex) => ({
    id: `fallback-${dayIndex}`,
    day: day.day,
    day_order: dayIndex,
    soup: day.soup,
    mains: day.mains.map((main, mainIndex) => ({
      id: `fallback-${dayIndex}-${mainIndex}`,
      day_id: `fallback-${dayIndex}`,
      ...main,
      sort_order: mainIndex,
    })),
  }));
}

async function getWeeklyMenu(): Promise<WeeklyDay[]> {
  try {
    const supabase = await createClient();
    const [{ data: days, error: daysError }, { data: mains }] = await Promise.all([
      supabase.from("weekly_menu_days").select("*").order("day_order"),
      supabase.from("weekly_menu_mains").select("*").order("sort_order"),
    ]);

    if (daysError || !days || days.length === 0) return fallbackAsWeeklyDays();

    return days.map((day) => ({
      ...day,
      mains: (mains ?? []).filter((m) => m.day_id === day.id),
    }));
  } catch {
    return fallbackAsWeeklyDays();
  }
}

export default async function WeeklyMenuPage() {
  const weeklyMenu = await getWeeklyMenu();

  return (
    <>
      <PageHero
        eyebrow="Ažurira se svaki tjedan"
        title="Tjedni meni"
        description="Domaća kuhinja, svježe pripremljena svaki dan — juha i dva glavna jela po danu, uvijek uz pristupačnu cijenu."
        image="https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2400&auto=format&fit=crop"
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ponedjeljak – Nedjelja"
            title="Domaći ručak, svaki dan drugačiji"
            description="Meni se mijenja tjedno prema sezonskim namirnicama. Dan koji je trenutno na redu je istaknut."
          />
          <div className="mt-14">
            <WeeklyMenuGrid weeklyMenu={weeklyMenu} />
          </div>
        </div>
      </section>
    </>
  );
}
