import { MenuItemForm } from "@/components/admin/MenuItemForm";
import { createMenuItem } from "@/actions/menu";

export default function NewMenuItemPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-white">Dodaj novo jelo</h1>
      <p className="mt-1 text-muted">Popunite podatke i spremite — odmah se prikazuje na stranici.</p>

      <div className="mt-8 rounded-xl2 border border-line bg-bg-card p-6">
        <MenuItemForm action={createMenuItem} submitLabel="Dodaj jelo" />
      </div>
    </div>
  );
}
