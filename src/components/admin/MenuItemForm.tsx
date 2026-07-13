"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { menuCategories } from "@/lib/data/menu";
import type { MenuItem } from "@/types";
import type { MenuFormState } from "@/actions/menu";
import { cn } from "@/lib/utils";

interface MenuItemFormProps {
  action: (prevState: MenuFormState, formData: FormData) => Promise<MenuFormState>;
  defaultValues?: Partial<MenuItem>;
  submitLabel?: string;
}

const inputClasses =
  "w-full rounded-lg border border-line bg-bg-deep px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-ember-300 focus:outline-none";

export function MenuItemForm({ action, defaultValues, submitLabel = "Spremi" }: MenuItemFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const router = useRouter();

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{state.error}</p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
            Naziv jela
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={defaultValues?.name}
            className={inputClasses}
            placeholder="npr. Mali Raj Burger"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-gray-300">
            Kategorija
          </label>
          <select
            id="category"
            name="category"
            defaultValue={defaultValues?.category ?? menuCategories[0]?.id}
            className={inputClasses}
          >
            {menuCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-gray-300">
          Opis
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={defaultValues?.description}
          className={cn(inputClasses, "resize-none")}
          placeholder="Kratki opis sastojaka..."
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-gray-300">
            Cijena (€)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={defaultValues?.price}
            className={inputClasses}
            placeholder="8.90"
          />
        </div>
        <div>
          <label htmlFor="calories" className="mb-1.5 block text-sm font-medium text-gray-300">
            Kalorije <span className="text-gray-500">(neobavezno)</span>
          </label>
          <input
            id="calories"
            name="calories"
            type="number"
            min="0"
            defaultValue={defaultValues?.calories}
            className={inputClasses}
            placeholder="780"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="mb-1.5 block text-sm font-medium text-gray-300">
          URL slike
        </label>
        <input
          id="image"
          name="image"
          type="url"
          defaultValue={defaultValues?.image}
          className={inputClasses}
          placeholder="https://..."
        />
      </div>

      <div>
        <label htmlFor="allergens" className="mb-1.5 block text-sm font-medium text-gray-300">
          Alergeni <span className="text-gray-500">(odvojeni zarezom)</span>
        </label>
        <input
          id="allergens"
          name="allergens"
          defaultValue={defaultValues?.allergens?.join(", ")}
          className={inputClasses}
          placeholder="gluten, mlijeko, jaja"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            name="popular"
            defaultChecked={defaultValues?.popular}
            className="h-4 w-4 rounded border-line bg-bg-deep accent-ember-300"
          />
          Preporuka
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            name="spicy"
            defaultChecked={defaultValues?.spicy}
            className="h-4 w-4 rounded border-line bg-bg-deep accent-ember-300"
          />
          Ljuto
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            name="vegetarian"
            defaultChecked={defaultValues?.vegetarian}
            className="h-4 w-4 rounded border-line bg-bg-deep accent-ember-300"
          />
          Vegetarijansko
        </label>
      </div>

      <input type="hidden" name="sort_order" defaultValue={defaultValues?.sort_order ?? 0} />

      <div className="flex gap-3 border-t border-line pt-5">
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-2 rounded-full bg-ember-300 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ember-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {pending ? "Spremanje..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/menu")}
          className="rounded-full border border-line px-6 py-2.5 text-sm text-gray-300 hover:border-gray-500"
        >
          Odustani
        </button>
      </div>
    </form>
  );
}
