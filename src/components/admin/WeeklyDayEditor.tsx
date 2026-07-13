"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Loader2, Save, X } from "lucide-react";
import { updateDaySoup, createMain, updateMain, deleteMain } from "@/actions/weekly";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatPrice, cn } from "@/lib/utils";
import type { WeeklyDay, WeeklyMain } from "@/types";

const inputClasses =
  "w-full rounded-lg border border-line bg-bg-deep px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-ember-300 focus:outline-none";

export function WeeklyDayEditor({ day }: { day: WeeklyDay }) {
  const [soup, setSoup] = useState(day.soup);
  const [soupPending, startSoupTransition] = useTransition();
  const [editingMainId, setEditingMainId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  function saveSoup() {
    startSoupTransition(async () => {
      await updateDaySoup(day.id, soup);
    });
  }

  return (
    <div className="rounded-xl2 border border-line bg-bg-card p-5">
      <h3 className="font-display text-lg font-bold text-white">{day.day}</h3>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={soup}
          onChange={(e) => setSoup(e.target.value)}
          className={inputClasses}
          placeholder="Juha dana"
        />
        <button
          onClick={saveSoup}
          disabled={soupPending || soup === day.soup}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-ember-300/10 px-3 py-2 text-xs font-medium text-ember-300 disabled:opacity-40"
        >
          {soupPending ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
        </button>
      </div>

      <div className="mt-4 space-y-2 border-t border-line pt-4">
        {day.mains.map((main) =>
          editingMainId === main.id ? (
            <MainEditRow
              key={main.id}
              main={main}
              onDone={() => setEditingMainId(null)}
            />
          ) : (
            <div key={main.id} className="flex items-start justify-between gap-2 rounded-lg bg-bg-deep/50 p-2.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-medium text-white">{main.name}</span>
                  <span className="tabular-price shrink-0 text-sm font-semibold text-ember-200">
                    {formatPrice(main.price)}
                  </span>
                </div>
                <p className="line-clamp-1 text-xs text-gray-500">{main.description}</p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button
                  onClick={() => setEditingMainId(main.id)}
                  aria-label="Uredi"
                  className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-gray-300 hover:border-ember-300 hover:text-ember-300"
                >
                  <Pencil size={13} />
                </button>
                <DeleteButton
                  action={deleteMain.bind(null, main.id)}
                  confirmMessage={`Obrisati "${main.name}"?`}
                />
              </div>
            </div>
          )
        )}

        {adding ? (
          <MainAddRow dayId={day.id} onDone={() => setAdding(false)} />
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-line py-2 text-xs text-gray-400 hover:border-ember-300 hover:text-ember-300"
          >
            <Plus size={14} />
            Dodaj jelo za {day.day.toLowerCase()}
          </button>
        )}
      </div>
    </div>
  );
}

function MainEditRow({ main, onDone }: { main: WeeklyMain; onDone: () => void }) {
  const [name, setName] = useState(main.name);
  const [description, setDescription] = useState(main.description);
  const [price, setPrice] = useState(String(main.price));
  const [pending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      await updateMain(main.id, { name, description, price: Number(price) || 0 });
      onDone();
    });
  }

  return (
    <div className="space-y-2 rounded-lg border border-ember-300/30 bg-bg-deep p-2.5">
      <input value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} placeholder="Naziv" />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={inputClasses}
        placeholder="Opis"
      />
      <div className="flex gap-2">
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          step="0.01"
          min="0"
          className={cn(inputClasses, "w-24")}
        />
        <button
          onClick={save}
          disabled={pending}
          className="flex items-center gap-1.5 rounded-lg bg-ember-300 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
        >
          {pending ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
          Spremi
        </button>
        <button
          onClick={onDone}
          className="flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-xs text-gray-300"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}

function MainAddRow({ dayId, onDone }: { dayId: string; onDone: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [pending, startTransition] = useTransition();

  function save() {
    if (!name.trim()) return;
    startTransition(async () => {
      await createMain(dayId, { name, description, price: Number(price) || 0 });
      onDone();
    });
  }

  return (
    <div className="space-y-2 rounded-lg border border-ember-300/30 bg-bg-deep p-2.5">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClasses}
        placeholder="Naziv jela"
        autoFocus
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={inputClasses}
        placeholder="Opis"
      />
      <div className="flex gap-2">
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          step="0.01"
          min="0"
          className={cn(inputClasses, "w-24")}
          placeholder="Cijena"
        />
        <button
          onClick={save}
          disabled={pending || !name.trim()}
          className="flex items-center gap-1.5 rounded-lg bg-ember-300 px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
        >
          {pending ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
          Dodaj
        </button>
        <button
          onClick={onDone}
          className="flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-xs text-gray-300"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
