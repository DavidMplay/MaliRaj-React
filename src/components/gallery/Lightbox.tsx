"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/types";

interface LightboxProps {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null;
  const active = activeIndex !== null ? images[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && activeIndex !== null) {
        onNavigate((activeIndex + 1) % images.length);
      }
      if (e.key === "ArrowLeft" && activeIndex !== null) {
        onNavigate((activeIndex - 1 + images.length) % images.length);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, activeIndex, images.length, onClose, onNavigate]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && active && activeIndex !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
        >
          <button
            onClick={onClose}
            aria-label="Zatvori galeriju"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
          >
            <X size={22} />
          </button>

          <button
            onClick={() => onNavigate((activeIndex - 1 + images.length) % images.length)}
            aria-label="Prethodna slika"
            className="absolute left-2 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 md:left-6"
          >
            <ChevronLeft size={24} />
          </button>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[85vh] w-full max-w-4xl"
          >
            <Image
              src={active.image}
              alt={active.alt}
              width={active.width}
              height={active.height}
              className="mx-auto max-h-[85vh] w-auto rounded-lg object-contain"
              sizes="90vw"
              priority
            />
            <p className="mt-3 text-center text-sm text-muted">{active.alt}</p>
          </motion.div>

          <button
            onClick={() => onNavigate((activeIndex + 1) % images.length)}
            aria-label="Sljedeća slika"
            className="absolute right-2 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 md:right-6"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
