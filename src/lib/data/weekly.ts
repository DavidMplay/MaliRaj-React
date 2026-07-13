import type { DayMenu } from "@/types";

export const weeklyMenu: DayMenu[] = [
  {
    day: "Ponedjeljak",
    soup: "Pileća juha s rezancima",
    mains: [
      {
        name: "Grah s kobasicom",
        description: "Domaći grah kuhan s dimljenom kobasicom i povrćem.",
        price: 5.9,
      },
      {
        name: "Pileći file s povrćem",
        description: "Pileći file na žaru, dinstano sezonsko povrće.",
        price: 6.5,
      },
    ],
  },
  {
    day: "Utorak",
    soup: "Goveđa juha s domaćim rezancima",
    mains: [
      {
        name: "Gulaš s njokima",
        description: "Domaći gulaš od junetine, mekani njoki.",
        price: 6.5,
      },
      {
        name: "Punjena paprika",
        description: "Paprika punjena mesom i rižom u rajčica umaku, pire krumpir.",
        price: 6.2,
      },
    ],
  },
  {
    day: "Srijeda",
    soup: "Juha od povrća",
    mains: [
      {
        name: "Sarma",
        description: "Domaća sarma u kiselom kupusu, pire krumpir.",
        price: 6.9,
      },
      {
        name: "Piletina s vrhnjem",
        description: "Pileći medaljoni u umaku od vrhnja i gljiva, tjestenina.",
        price: 6.8,
      },
    ],
  },
  {
    day: "Četvrtak",
    soup: "Pileća juha s rezancima",
    mains: [
      {
        name: "Đuveč s piletinom",
        description: "Riža s povrćem i komadima piletine.",
        price: 6.2,
      },
      {
        name: "Svinjski odrezak",
        description: "Panirani svinjski odrezak, pire krumpir, salata.",
        price: 6.9,
      },
    ],
  },
  {
    day: "Petak",
    soup: "Riblja juha",
    mains: [
      {
        name: "Riba na žaru",
        description: "Oslić na žaru, blitva s krumpirom.",
        price: 7.9,
      },
      {
        name: "Ćevapi (5 kom)",
        description: "Domaći ćevapi, lepinja, kajmak, luk.",
        price: 5.9,
      },
    ],
  },
  {
    day: "Subota",
    soup: "Goveđa juha",
    mains: [
      {
        name: "Pečena piletina",
        description: "Pečena piletina s krumpirom iz pećnice, sezonska salata.",
        price: 6.9,
      },
      {
        name: "Mješano meso s roštilja",
        description: "Izbor od tri vrste mesa, prilog po izboru.",
        price: 9.9,
      },
    ],
  },
  {
    day: "Nedjelja",
    soup: "Pileća juha s domaćim rezancima",
    mains: [
      {
        name: "Nedjeljni ručak: Pečenka",
        description: "Domaća svinjska pečenka, mlinci, sezonsko povrće.",
        price: 8.9,
      },
      {
        name: "Punjena piletina",
        description: "Piletina punjena sirom i pršutom, pire krumpir.",
        price: 7.9,
      },
    ],
  },
];
