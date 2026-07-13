import type { GalleryImage } from "@/types";

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    category: "hrana",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
    alt: "Mali Raj burger s pomfritom",
    width: 1000,
    height: 1250,
  },
  {
    id: "g2",
    category: "restoran",
    image:
      "https://images.unsplash.com/photo-1744561249162-c597c1670032?q=80&w=1000&auto=format&fit=crop",
    alt: "Interijer restorana Bistro Mali Raj",
    width: 1000,
    height: 750,
  },
  {
    id: "g3",
    category: "hrana",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
    alt: "Pizza pečena u kamenoj peći",
    width: 1000,
    height: 1000,
  },
  {
    id: "g4",
    category: "kuhinja",
    image:
      "https://images.unsplash.com/photo-1761095596765-c8abe01d3aea?q=80&w=1000&auto=format&fit=crop",
    alt: "Kuhar priprema jelo u kuhinji",
    width: 1000,
    height: 1334,
  },
  {
    id: "g5",
    category: "hrana",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    alt: "Ćevapi s roštilja",
    width: 1000,
    height: 750,
  },
  {
    id: "g6",
    category: "dogadaji",
    image:
      "https://images.unsplash.com/photo-1576842546422-60562b9242ae?q=80&w=1000&auto=format&fit=crop",
    alt: "Proslava rođendana u restoranu",
    width: 1000,
    height: 1250,
  },
  {
    id: "g7",
    category: "catering",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop",
    alt: "Catering stol s predjelima",
    width: 1000,
    height: 1000,
  },
  {
    id: "g8",
    category: "restoran",
    image:
      "https://images.unsplash.com/photo-1576089073624-b5751a8f4de9?q=80&w=1000&auto=format&fit=crop",
    alt: "Obitelj za stolom u restoranu",
    width: 1000,
    height: 1334,
  },
  {
    id: "g9",
    category: "hrana",
    image:
      "https://images.unsplash.com/photo-1558030137-a56c1b004fa3?q=80&w=1000&auto=format&fit=crop",
    alt: "Pljeskavica s prilogom",
    width: 1000,
    height: 750,
  },
  {
    id: "g10",
    category: "kuhinja",
    image:
      "https://images.unsplash.com/photo-1627947063935-55577ec3c2e1?q=80&w=1000&auto=format&fit=crop",
    alt: "Roštilj u pripremi",
    width: 1000,
    height: 1000,
  },
  {
    id: "g11",
    category: "dogadaji",
    image:
      "https://images.unsplash.com/photo-1740047602722-b4993b79e4b7?q=80&w=1000&auto=format&fit=crop",
    alt: "Poslovni ručak u privatnoj sali",
    width: 1000,
    height: 1250,
  },
  {
    id: "g12",
    category: "catering",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop",
    alt: "Catering posluženje na vjenčanju",
    width: 1000,
    height: 750,
  },
];

export const galleryCategories = [
  { id: "sve", label: "Sve" },
  { id: "hrana", label: "Hrana" },
  { id: "restoran", label: "Restoran" },
  { id: "kuhinja", label: "Kuhinja" },
  { id: "dogadaji", label: "Događaji" },
  { id: "catering", label: "Catering" },
] as const;
