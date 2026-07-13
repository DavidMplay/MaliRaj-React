import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { MenuPageContent } from "@/components/menu/MenuPageContent";
import { CTASection } from "@/components/home/CTASection";
import { createClient } from "@/lib/supabase/server";
import { menuItems as fallbackMenuItems } from "@/lib/data/menu";
import type { MenuItem } from "@/types";

export const metadata: Metadata = {
  title: "Jelovnik",
  description:
    "Pogledajte kompletan jelovnik Bistro Mali Raj: burgeri, pizza, roštilj, sendviči, salate, dnevna jela, deserti i pića.",
  alternates: { canonical: "/menu" },
};

export const revalidate = 60;

async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("category")
      .order("sort_order");

    if (error || !data) return fallbackMenuItems;
    return data as MenuItem[];
  } catch {
    // Supabase not configured yet (e.g. local dev without env vars) — keep
    // the site working off the bundled seed data instead of crashing.
    return fallbackMenuItems;
  }
}

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <>
      <PageHero
        eyebrow="Jelovnik"
        title="Okusi koje ćete pamtiti"
        description="Od sočnih burgera do roštilja pripremljenog po obiteljskom receptu — istražite naš kompletan jelovnik."
        image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2400&auto=format&fit=crop"
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <MenuPageContent items={items} />
        </div>
      </section>
      <CTASection
        title="Ne stignete doći? Naručite dostavu."
        description="Nazovite nas ili pošaljite poruku na WhatsApp — vaša hrana stiže topla i na vrijeme."
      />
    </>
  );
}
