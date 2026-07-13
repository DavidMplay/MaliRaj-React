import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuCard } from "@/components/menu/MenuCard";
import { Button } from "@/components/ui/Button";
import { popularItems as fallbackPopularItems } from "@/lib/data/menu";
import { createClient } from "@/lib/supabase/server";
import type { MenuItem } from "@/types";
import { ArrowRight } from "lucide-react";

async function getPopularItems(): Promise<MenuItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("popular", true)
      .order("sort_order");

    if (error || !data || data.length === 0) return fallbackPopularItems;
    return data as MenuItem[];
  } catch {
    return fallbackPopularItems;
  }
}

export async function FeaturedMenu() {
  const popularItems = await getPopularItems();

  return (
    <section className="bg-bg-deep py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Najbolje ocijenjeno"
          title="Favoriti naših gostiju"
          description="Jela koja naši gosti naruče iznova i iznova — od sočnih burgera do roštilja pripremljenog po obiteljskom receptu."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularItems.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/menu" variant="outline" icon={ArrowRight}>
            Cijeli jelovnik
          </Button>
        </div>
      </div>
    </section>
  );
}
