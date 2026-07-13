"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { Lightbox } from "@/components/gallery/Lightbox";
import { galleryCategories, galleryImages } from "@/lib/data/gallery";

interface GalleryProps {
  showFilter?: boolean;
  limit?: number;
}

export function Gallery({ showFilter = true, limit }: GalleryProps) {
  const [active, setActive] = useState<string>("sve");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const images =
      active === "sve" ? galleryImages : galleryImages.filter((img) => img.category === active);
    return limit ? images.slice(0, limit) : images;
  }, [active, limit]);

  return (
    <div>
      {showFilter && (
        <div className="mb-10">
          <CategoryFilter categories={galleryCategories} active={active} onChange={setActive} />
        </div>
      )}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {filtered.map((img, i) => (
          <motion.button
            key={img.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            onClick={() => setLightboxIndex(i)}
            className="group relative block w-full overflow-hidden rounded-xl2 border border-line"
            aria-label={`Otvori sliku: ${img.alt}`}
          >
            <Image
              src={img.image}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
              <Expand size={22} className="text-white" />
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={filtered}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
