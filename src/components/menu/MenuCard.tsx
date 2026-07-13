"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Leaf } from "lucide-react";
import type { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

export function MenuCard({ item, index = 0 }: MenuCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-xl2 border border-line bg-bg-card shadow-card transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {item.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-ember-300 px-3 py-1 text-xs font-semibold text-white shadow-glow">
            Preporuka
          </span>
        )}
        <div className="absolute right-3 top-3 flex gap-1.5">
          {item.spicy && (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm" title="Ljuto">
              <Flame size={14} className="text-ember-300" />
            </span>
          )}
          {item.vegetarian && (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm" title="Vegetarijansko">
              <Leaf size={14} className="text-green-400" />
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-white">{item.name}</h3>
          <span className="tabular-price shrink-0 font-display text-lg font-bold text-ember-300">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>

        {(item.calories || (item.allergens && item.allergens.length > 0)) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-3 text-xs text-gray-500">
            {item.calories && <span>{item.calories} kcal</span>}
            {item.allergens && item.allergens.length > 0 && (
              <span className="capitalize">Alergeni: {item.allergens.join(", ")}</span>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
