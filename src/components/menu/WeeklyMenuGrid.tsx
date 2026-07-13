"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Soup, UtensilsCrossed } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import type { WeeklyDay } from "@/types";

const days = [
  "Nedjelja",
  "Ponedjeljak",
  "Utorak",
  "Srijeda",
  "Četvrtak",
  "Petak",
  "Subota",
];

export function WeeklyMenuGrid({ weeklyMenu }: { weeklyMenu: WeeklyDay[] }) {
  const [todayName] = useState(() => days[new Date().getDay()]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {weeklyMenu.map((day, i) => {
        const isToday = day.day === todayName;
        return (
          <motion.div
            key={day.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={cn(
              "relative overflow-hidden rounded-xl2 border p-6",
              isToday
                ? "border-ember-300 bg-ember-300/[0.07] shadow-glow"
                : "border-line bg-bg-card"
            )}
          >
            {isToday && (
              <span className="absolute right-4 top-4 rounded-full bg-ember-300 px-3 py-1 text-xs font-semibold text-white">
                Danas
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-white">{day.day}</h3>

            <div className="mt-5 flex items-start gap-3">
              <Soup size={18} className="mt-0.5 shrink-0 text-ember-300" />
              <p className="text-sm text-gray-300">{day.soup}</p>
            </div>

            <div className="mt-4 space-y-4 border-t border-line pt-4">
              {day.mains.map((main) => (
                <div key={main.id} className="flex items-start gap-3">
                  <UtensilsCrossed size={18} className="mt-0.5 shrink-0 text-ember-300" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-medium text-white">{main.name}</span>
                      <span className="tabular-price shrink-0 font-semibold text-ember-200">
                        {formatPrice(main.price)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{main.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
