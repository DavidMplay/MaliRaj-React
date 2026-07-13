import { restaurant } from "@/lib/data/restaurant";
import { averageRating, testimonials } from "@/lib/data/testimonials";

const dayMap: Record<string, string> = {
  Ponedjeljak: "Monday",
  Utorak: "Tuesday",
  Srijeda: "Wednesday",
  Četvrtak: "Thursday",
  Petak: "Friday",
  Subota: "Saturday",
  Nedjelja: "Sunday",
};

/**
 * Renders the Restaurant / LocalBusiness JSON-LD schema in the document head
 * so search engines can show rich results (hours, rating, address) directly
 * in search. Kept as a single source of truth driven by lib/data/restaurant.ts
 */
export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    image: "https://www.malirajvukovar.hr/og-image.jpg",
    "@id": "https://www.malirajvukovar.hr",
    url: "https://www.malirajvukovar.hr",
    telephone: restaurant.phone,
    email: restaurant.email,
    servesCuisine: ["Croatian", "Pizza", "Burgers", "Grill"],
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.city,
      postalCode: restaurant.address.postalCode,
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurant.coordinates.lat,
      longitude: restaurant.coordinates.lng,
    },
    openingHoursSpecification: restaurant.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMap[h.day],
      opens: h.open,
      closes: h.close,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: testimonials.length,
    },
    sameAs: [restaurant.social.instagram, restaurant.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
