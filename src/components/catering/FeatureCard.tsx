"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { CateringPackage } from "@/types";

export function FeatureCard({ pkg, index = 0 }: { pkg: CateringPackage; index?: number }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[pkg.icon] ?? Icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className="group relative overflow-hidden rounded-xl2 border border-line bg-bg-card p-7 transition-colors duration-300 hover:border-ember-300/50"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-300/10 text-ember-300 transition-colors duration-300 group-hover:bg-ember-300 group-hover:text-white">
        <Icon size={22} />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-white">{pkg.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.description}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-gray-500">
        Od {pkg.minGuests} osoba
      </p>
    </motion.div>
  );
}
