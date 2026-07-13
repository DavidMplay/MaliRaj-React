import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Gallery } from "@/components/gallery/Gallery";

export const metadata: Metadata = {
  title: "Galerija",
  description:
    "Pogledajte fotografije hrane, restorana, kuhinje i događaja iz Bistro Mali Raj u Vukovaru.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Galerija"
        title="Pogled iza kulisa"
        description="Hrana, prostor, kuhinja i trenuci proslava koje smo imali priliku ugostiti."
        image="https://images.unsplash.com/photo-1744561249162-c597c1670032?q=80&w=2400&auto=format&fit=crop"
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <Gallery />
        </div>
      </section>
    </>
  );
}
