import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MenuItemForm } from "@/components/admin/MenuItemForm";
import { updateMenuItem } from "@/actions/menu";
import type { MenuItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase.from("menu_items").select("*").eq("id", id).single();

  if (!item) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-white">Uredi jelo</h1>
      <p className="mt-1 text-muted">Promjene se odmah prikazuju na stranici nakon spremanja.</p>

      <div className="mt-8 rounded-xl2 border border-line bg-bg-card p-6">
        <MenuItemForm
          action={updateMenuItem.bind(null, id)}
          defaultValues={item as MenuItem}
          submitLabel="Spremi promjene"
        />
      </div>
    </div>
  );
}
