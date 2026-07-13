import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ivana Horvat",
    rating: 5,
    text: "Najbolji ćevapi u Vukovaru, bez ikakve sumnje. Osoblje je uvijek nasmijano, a atmosfera je topla i obiteljska. Dolazimo barem jednom tjedno.",
    date: "prije 2 tjedna",
    source: "Google",
  },
  {
    id: "t2",
    name: "Marko Petrović",
    rating: 5,
    text: "Naručili smo catering za rođendan i sve je bilo savršeno — hrana, dostava na vrijeme, ljubazno osoblje. Toplo preporučam za svaki event.",
    date: "prije mjesec dana",
    source: "Google",
  },
  {
    id: "t3",
    name: "Ana Kovač",
    rating: 5,
    text: "Burger Mali Raj je apsolutni hit. Meso je sočno, pecivo svježe, a umak od raja je stvarno nešto posebno. Vraćamo se svaki put kad smo u gradu.",
    date: "prije 3 tjedna",
    source: "Facebook",
  },
  {
    id: "t4",
    name: "Tomislav Jurić",
    rating: 5,
    text: "Dnevni meni je odličan omjer cijene i kvalitete. Domaća kuhinja kakvu se sve rjeđe nalazi. Sarma je identična onoj kod bake.",
    date: "prije 5 dana",
    source: "Google",
  },
  {
    id: "t5",
    name: "Petra Babić",
    rating: 4,
    text: "Pizza Mali Raj s tartufima nas je oduševila, a dostava je stigla brže nego što smo očekivali. Jedina zamjerka je što ponekad treba pričekati stol vikendom.",
    date: "prije 2 mjeseca",
    source: "TripAdvisor",
  },
  {
    id: "t6",
    name: "Filip Radić",
    rating: 5,
    text: "Organizirali su nam cijelo krštenje — od dekoracije stola do posluženja. Gosti i danas pričaju o mix plati s roštilja.",
    date: "prije 6 tjedana",
    source: "Google",
  },
];

export const averageRating =
  Math.round(
    (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length) * 10
  ) / 10;
