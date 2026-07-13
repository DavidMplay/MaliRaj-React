"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidatePublicPages() {
  revalidatePath("/weekly-menu");
  revalidatePath("/admin/weekly-menu");
}

export async function updateDaySoup(dayId: string, soup: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("weekly_menu_days")
    .update({ soup, updated_at: new Date().toISOString() })
    .eq("id", dayId);
  if (error) throw new Error(error.message);
  revalidatePublicPages();
}

export async function createMain(
  dayId: string,
  data: { name: string; description: string; price: number }
) {
  const supabase = await createClient();
  const { error } = await supabase.from("weekly_menu_mains").insert({
    day_id: dayId,
    name: data.name,
    description: data.description,
    price: data.price,
    sort_order: 99,
  });
  if (error) throw new Error(error.message);
  revalidatePublicPages();
}

export async function updateMain(
  mainId: string,
  data: { name: string; description: string; price: number }
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("weekly_menu_mains")
    .update(data)
    .eq("id", mainId);
  if (error) throw new Error(error.message);
  revalidatePublicPages();
}

export async function deleteMain(mainId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("weekly_menu_mains").delete().eq("id", mainId);
  if (error) throw new Error(error.message);
  revalidatePublicPages();
}
