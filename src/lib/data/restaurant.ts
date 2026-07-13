export const restaurant = {
  name: "Bistro Mali Raj",
  legalName: "Bistro Mali Raj obrt za ugostiteljstvo",
  tagline: "Pizza • Burgeri • Roštilj • Dnevna jela • Dostava • Catering",
  shortDescription:
    "Obiteljski bistro u srcu Vukovara — domaći okusi, sočni burgeri i roštilj s roštilja koji se pamti.",
  founded: 2011,
  phone: "+385 32 123 456",
  phoneDisplay: "032 123 456",
  whatsapp: "385321234567",
  email: "info@malirajvukovar.hr",
  address: {
    street: "Županijska 24",
    city: "Vukovar",
    postalCode: "32000",
    country: "Hrvatska",
    full: "Županijska 24, 32000 Vukovar",
  },
  coordinates: {
    lat: 45.3411,
    lng: 19.0018,
  },
  social: {
    instagram: "https://instagram.com/bistromaliraj",
    facebook: "https://facebook.com/bistromaliraj",
  },
  hours: [
    { day: "Ponedjeljak", open: "10:00", close: "22:00" },
    { day: "Utorak", open: "10:00", close: "22:00" },
    { day: "Srijeda", open: "10:00", close: "22:00" },
    { day: "Četvrtak", open: "10:00", close: "22:00" },
    { day: "Petak", open: "10:00", close: "23:30" },
    { day: "Subota", open: "11:00", close: "23:30" },
    { day: "Nedjelja", open: "11:00", close: "21:00" },
  ],
  stats: [
    { label: "Godina iskustva", value: 13, suffix: "+" },
    { label: "Zadovoljnih gostiju", value: 40000, suffix: "+" },
    { label: "Jela na jelovniku", value: 60, suffix: "+" },
    { label: "Prosječna ocjena", value: 4.8, suffix: "/5" },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/menu", label: "Jelovnik" },
  { href: "/weekly-menu", label: "Tjedni meni" },
  { href: "/catering", label: "Catering" },
  { href: "/gallery", label: "Galerija" },
  { href: "/about", label: "O nama" },
  { href: "/contact", label: "Kontakt" },
] as const;
