"use client";

import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { restaurant } from "@/lib/data/restaurant";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <motion.a
        href={`https://wa.me/${restaurant.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pošaljite nam poruku na WhatsApp"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card"
      >
        <MessageCircle size={26} fill="white" className="text-[#25D366]" />
      </motion.a>
      <motion.a
        href={`tel:${restaurant.phone}`}
        aria-label="Nazovite Bistro Mali Raj"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ember-300 text-white shadow-glow"
      >
        <Phone size={24} />
      </motion.a>
    </div>
  );
}
