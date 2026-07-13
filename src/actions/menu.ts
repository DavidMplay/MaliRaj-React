"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { MenuCategory } from "@/types";

export interface MenuFormState {
  error?: string;
}

function parseAllergens(raw: string): string[] {
  return raw
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
}

function revalidatePublicPages() {
  revalidatePath("/menu");
  revalidatePath("/");
  revalidatePath("/admin/menu");
}

export async function createMenuItem(
  _prevState: MenuFormState,
  formData: FormData
): Promise<MenuFormState> {
  const supabase = await createClient();

  const name = String(formData.get("name") || "").trim();
  const price = Number(formData.get("price"));

  if (!name) return { error: "Naziv je obavezan." };
  if (Number.isNaN(price) || price < 0) return { error: "Unesite ispravnu cijenu." };

  const { error } = await supabase.from("menu_items").insert({
    category: String(formData.get("category")) as MenuCategory,
    name,
    description: String(formData.get("description") || ""),
    price,
    image: String(formData.get("image") || ""),
    calories: formData.get("calories") ? Number(formData.get("calories")) : null,
    allergens: parseAllergens(String(formData.get("allergens") || "")),
    popular: formData.get("popular") === "on",
    spicy: formData.get("spicy") === "on",
    vegetarian: formData.get("vegetarian") === "on",
    sort_order: formData.get("sort_order") ? Number(formData.get("sort_order")) : 0,
  });

  if (error) return { error: "Spremanje nije uspjelo: " + error.message };

  revalidatePublicPages();
  redirect("/admin/menu");
}

export async function updateMenuItem(
  id: string,
  _prevState: MenuFormState,
  formData: FormData
): Promise<MenuFormState> {
  const supabase = await createClient();

  const name = String(formData.get("name") || "").trim();
  const price = Number(formData.get("price"));

  if (!name) return { error: "Naziv je obavezan." };
  if (Number.isNaN(price) || price < 0) return { error: "Unesite ispravnu cijenu." };

  const { error } = await supabase
    .from("menu_items")
    .update({
      category: String(formData.get("category")) as MenuCategory,
      name,
      description: String(formData.get("description") || ""),
      price,
      image: String(formData.get("image") || ""),
      calories: formData.get("calories") ? Number(formData.get("calories")) : null,
      allergens: parseAllergens(String(formData.get("allergens") || "")),
      popular: formData.get("popular") === "on",
      spicy: formData.get("spicy") === "on",
      vegetarian: formData.get("vegetarian") === "on",
      sort_order: formData.get("sort_order") ? Number(formData.get("sort_order")) : 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: "Spremanje nije uspjelo: " + error.message };

  revalidatePublicPages();
  redirect("/admin/menu");
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePublicPages();
}
