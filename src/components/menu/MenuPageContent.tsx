"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { MenuCard } from "@/components/menu/MenuCard";
import { menuCategories } from "@/lib/data/menu";
import type { MenuItem } from "@/types";

export function MenuPageContent({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState<string>(menuCategories[0]?.id ?? "burgeri");

  const filtered = useMemo(
    () => items.filter((item) => item.category === active),
    [items, active]
  );

  return (
    <div>
      <CategoryFilter categories={menuCategories} active={active} onChange={setActive} />

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted">
          Trenutno nema jela u ovoj kategoriji.
        </p>
      )}
    </div>
  );
}
