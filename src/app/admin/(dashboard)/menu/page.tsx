import Link from "next/link";
import { Plus, Pencil, Star, Flame, Leaf } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteMenuItem } from "@/actions/menu";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/types";
import { menuCategories } from "@/lib/data/menu";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const supabase = await createClient();
  const { data: items, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("category")
    .order("sort_order");

  const menuItems = (items ?? []) as MenuItem[];

  const grouped = menuCategories.map((cat) => ({
    ...cat,
    items: menuItems.filter((item) => item.category === cat.id),
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Jelovnik</h1>
          <p className="mt-1 text-muted">{menuItems.length} jela ukupno</p>
        </div>
        <Link
          href="/admin/menu/new"
          className="flex items-center gap-2 rounded-full bg-ember-300 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ember-400"
        >
          <Plus size={16} />
          Dodaj jelo
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Greška pri učitavanju: {error.message}
        </p>
      )}

      <div className="mt-8 space-y-10">
        {grouped.map((cat) => (
          <section key={cat.id}>
            <h2 className="mb-3 font-display text-lg font-semibold text-white">
              {cat.label} <span className="text-sm font-normal text-gray-500">({cat.items.length})</span>
            </h2>

            {cat.items.length === 0 ? (
              <p className="rounded-lg border border-dashed border-line p-4 text-sm text-gray-500">
                Nema jela u ovoj kategoriji.
              </p>
            ) : (
              <div className="overflow-hidden rounded-xl2 border border-line">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-line">
                    {cat.items.map((item) => (
                      <tr key={item.id} className="bg-bg-card">
                        <td className="w-14 p-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{item.name}</span>
                            {item.popular && <Star size={13} className="text-ember-300" />}
                            {item.spicy && <Flame size={13} className="text-ember-400" />}
                            {item.vegetarian && <Leaf size={13} className="text-green-400" />}
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                            {item.description}
                          </p>
                        </td>
                        <td className="tabular-price w-24 p-3 text-right font-semibold text-ember-200">
                          {formatPrice(item.price)}
                        </td>
                        <td className="w-24 p-3">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/admin/menu/${item.id}/edit`}
                              className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-gray-300 transition-colors hover:border-ember-300 hover:text-ember-300"
                              aria-label="Uredi"
                              title="Uredi"
                            >
                              <Pencil size={13} />
                            </Link>
                            <DeleteButton
                              action={deleteMenuItem.bind(null, item.id)}
                              confirmMessage={`Obrisati "${item.name}"?`}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
