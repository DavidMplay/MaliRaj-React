export type MenuCategory =
  | "burgeri"
  | "pizza"
  | "rostilj"
  | "sendvici"
  | "salate"
  | "dnevna-jela"
  | "deserti"
  | "pica";

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;
  image: string;
  calories?: number;
  allergens?: string[];
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  sort_order?: number;
}

export interface WeeklyMain {
  id: string;
  day_id: string;
  name: string;
  description: string;
  price: number;
  sort_order: number;
}

export interface WeeklyDay {
  id: string;
  day: string;
  day_order: number;
  soup: string;
  mains: WeeklyMain[];
}

export interface DayMenu {
  day: string;
  date?: string;
  soup: string;
  mains: {
    name: string;
    description: string;
    price: number;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  source: "Google" | "Facebook" | "TripAdvisor";
}

export interface GalleryImage {
  id: string;
  category: "hrana" | "restoran" | "kuhinja" | "dogadaji" | "catering";
  image: string;
  alt: string;
  width: number;
  height: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CateringPackage {
  id: string;
  name: string;
  description: string;
  icon: string;
  minGuests: number;
}
