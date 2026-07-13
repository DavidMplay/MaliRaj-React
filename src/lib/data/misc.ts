import type { FAQItem, CateringPackage } from "@/types";

export const faqItems: FAQItem[] = [
  {
    question: "Koliko unaprijed treba rezervirati catering?",
    answer:
      "Preporučujemo rezervaciju barem 5-7 dana unaprijed za manje skupove, odnosno 2-3 tjedna za vjenčanja i veće proslave preko 50 osoba, kako bismo osigurali dostupnost termina i namirnica.",
  },
  {
    question: "Nudite li dostavu izvan Vukovara?",
    answer:
      "Dostavljamo unutar Vukovara i okolnih naselja (Borovo, Bršadin, Trpinja) bez naknade za narudžbe iznad 20 €. Za catering na većim udaljenostima, molimo kontaktirajte nas za dogovor.",
  },
  {
    question: "Je li moguće prilagoditi jelovnik alergijama ili dijetama?",
    answer:
      "Da. Svako jelo na jelovniku ima označene alergene, a za catering možemo pripremiti vegetarijanske, bezglutenske ili druge prilagođene opcije uz prethodnu najavu.",
  },
  {
    question: "Imate li prostor za privatna slavlja?",
    answer:
      "Imamo zasebnu privatnu salu za 20-60 osoba, idealnu za rođendane, krštenja i poslovne događaje, uz mogućnost prilagodbe rasporeda stolova i dekoracije.",
  },
  {
    question: "Kako mogu naručiti hranu za van?",
    answer:
      "Narudžbu možete obaviti telefonski, putem WhatsAppa ili osobno u restoranu. Radimo na uvođenju online narudžbi izravno putem web stranice.",
  },
];

export const cateringPackages: CateringPackage[] = [
  {
    id: "vjencanja",
    name: "Vjenčanja",
    description:
      "Kompletna gastronomska usluga za vaš najvažniji dan — od predjela do torte, prilagođeno broju gostiju i željenom stilu.",
    icon: "Heart",
    minGuests: 40,
  },
  {
    id: "krstenja",
    name: "Krštenja",
    description:
      "Topla, obiteljska ponuda jela savršena za krštenja — s posebnom pažnjom na najmlađe uzvanike.",
    icon: "Baby",
    minGuests: 20,
  },
  {
    id: "rodendani",
    name: "Rođendani",
    description:
      "Od dječjih rođendana do velikih okruglih obljetnica — biramo jelovnik i dekor prema slavljeniku.",
    icon: "PartyPopper",
    minGuests: 10,
  },
  {
    id: "poslovni",
    name: "Poslovni događaji",
    description:
      "Poslovni ručkovi, team building i konferencijski cateringi s brzom i urednom uslugom.",
    icon: "Briefcase",
    minGuests: 10,
  },
  {
    id: "obiteljska",
    name: "Obiteljska slavlja",
    description:
      "Godišnjice, okupljanja generacija, nedjeljni ručkovi za veliku obitelj — sve uz domaći ugođaj.",
    icon: "Users",
    minGuests: 15,
  },
  {
    id: "privatne-zabave",
    name: "Privatne zabave",
    description:
      "Zatvorena društva, proslave uz roštilj u dvorištu ili najam naše privatne sale.",
    icon: "Sparkles",
    minGuests: 10,
  },
];
