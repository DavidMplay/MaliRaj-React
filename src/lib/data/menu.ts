import type { MenuItem } from "@/types";

export const menuCategories: { id: MenuItem["category"]; label: string }[] = [
  { id: "burgeri", label: "Burgeri" },
  { id: "pizza", label: "Pizza" },
  { id: "rostilj", label: "Roštilj" },
  { id: "sendvici", label: "Sendviči" },
  { id: "salate", label: "Salate" },
  { id: "dnevna-jela", label: "Dnevna jela" },
  { id: "deserti", label: "Deserti" },
  { id: "pica", label: "Pića" },
];

export const menuItems: MenuItem[] = [
  // BURGERI
  {
    id: "burger-raj",
    category: "burgeri",
    name: "Mali Raj Burger",
    description:
      "180g domaći pljeskavica burger, dimljeni cheddar, karamelizirani luk, iceberg, umak od raja.",
    price: 8.9,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    calories: 780,
    allergens: ["gluten", "mlijeko", "jaja"],
    popular: true,
  },
  {
    id: "burger-bbq",
    category: "burgeri",
    name: "Dimni BBQ Burger",
    description:
      "Govedina 200g, hrskava slanina, BBQ umak, prstenovi luka, gouda.",
    price: 9.9,
    image:
      "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?q=80&w=1200&auto=format&fit=crop",
    calories: 890,
    allergens: ["gluten", "mlijeko"],
    popular: true,
  },
  {
    id: "burger-cheese",
    category: "burgeri",
    name: "Double Cheese Burger",
    description: "Dva pljeskavica odreska, dvostruki cheddar, umak kuće, kiseli krastavci.",
    price: 10.5,
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1200&auto=format&fit=crop",
    calories: 950,
    allergens: ["gluten", "mlijeko"],
  },
  {
    id: "burger-veggie",
    category: "burgeri",
    name: "Veggie Burger",
    description: "Burger od leće i povrća, rukola, avokado krema, rajčica.",
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1600688640154-9619e002df30?q=80&w=1200&auto=format&fit=crop",
    calories: 610,
    allergens: ["gluten"],
    vegetarian: true,
  },
  {
    id: "burger-chicken",
    category: "burgeri",
    name: "Crispy Chicken Burger",
    description: "Pohana pileća prsa, hrskavi kupus salata, ljuti majoneza.",
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1200&auto=format&fit=crop",
    calories: 720,
    allergens: ["gluten", "jaja"],
    spicy: true,
  },

  // PIZZA
  {
    id: "pizza-margherita",
    category: "pizza",
    name: "Margherita",
    description: "Rajčica San Marzano, mozzarella, svježi bosiljak, maslinovo ulje.",
    price: 6.9,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
    calories: 640,
    allergens: ["gluten", "mlijeko"],
    vegetarian: true,
  },
  {
    id: "pizza-raj",
    category: "pizza",
    name: "Pizza Mali Raj",
    description:
      "Pršut, gljive, rukola, parmezan pahuljice, tartufni umak — kućni specijalitet.",
    price: 9.5,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1200&auto=format&fit=crop",
    calories: 780,
    allergens: ["gluten", "mlijeko"],
    popular: true,
  },
  {
    id: "pizza-diavola",
    category: "pizza",
    name: "Diavola",
    description: "Ljuta kulen kobasica, feferoni, mozzarella, rajčica umak.",
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1571066811602-716837d681de?q=80&w=1200&auto=format&fit=crop",
    calories: 820,
    allergens: ["gluten", "mlijeko"],
    spicy: true,
  },
  {
    id: "pizza-quattro",
    category: "pizza",
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, parmezan, ementaler, krema vrhnja.",
    price: 8.9,
    image:
      "https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=1200&auto=format&fit=crop",
    calories: 900,
    allergens: ["gluten", "mlijeko"],
    vegetarian: true,
  },
  {
    id: "pizza-vege",
    category: "pizza",
    name: "Vrtna pizza",
    description: "Tikvice, patlidžan, paprika, cherry rajčica, mozzarella, pesto.",
    price: 8.2,
    image:
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1200&auto=format&fit=crop",
    calories: 590,
    allergens: ["gluten", "mlijeko"],
    vegetarian: true,
  },

  // ROSTILJ
  {
    id: "cevapi",
    category: "rostilj",
    name: "Ćevapi (10 kom)",
    description: "Domaći mljeveni ćevapi, lepinja, kajmak, luk, ajvar.",
    price: 8.9,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    calories: 850,
    allergens: ["gluten", "mlijeko"],
    popular: true,
  },
  {
    id: "pljeskavica",
    category: "rostilj",
    name: "Pljeskavica",
    description: "300g domaća pljeskavica, lepinja, kajmak, luk, ajvar, salata.",
    price: 9.9,
    image:
      "https://images.unsplash.com/photo-1633436375795-12b3b339712f?q=80&w=1200&auto=format&fit=crop",
    calories: 920,
    allergens: ["gluten", "mlijeko"],
    popular: true,
  },
  {
    id: "vesalica",
    category: "rostilj",
    name: "Vešalica na žaru",
    description: "Svinjski vrat, marinada od začina, prilog po izboru.",
    price: 10.9,
    image:
      "https://images.unsplash.com/photo-1616252980327-ec70572e5df9?q=80&w=1200&auto=format&fit=crop",
    calories: 780,
    allergens: [],
  },
  {
    id: "mix-plate",
    category: "rostilj",
    name: "Mali Raj Mix plata",
    description:
      "Ćevapi, pileći ražnjić, vešalica, kobasica, prženi krumpir, kupus salata — za dvije osobe.",
    price: 22.9,
    image:
      "https://images.unsplash.com/photo-1508615263227-c5d58c1e5821?q=80&w=1200&auto=format&fit=crop",
    calories: 1800,
    allergens: ["gluten"],
    popular: true,
  },
  {
    id: "raznjici",
    category: "rostilj",
    name: "Pileći ražnjići",
    description: "Marinirani pileći ražnjići s roštilja, prilog po izboru.",
    price: 8.9,
    image:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=1200&auto=format&fit=crop",
    calories: 620,
    allergens: [],
  },

  // SENDVICI
  {
    id: "sendvic-piletina",
    category: "sendvici",
    name: "Sendvič s piletinom",
    description: "Grilana piletina, svježa salata, rajčica, majoneza umak, tost kruh.",
    price: 5.9,
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=1200&auto=format&fit=crop",
    calories: 480,
    allergens: ["gluten", "jaja"],
  },
  {
    id: "sendvic-tuna",
    category: "sendvici",
    name: "Tuna sendvič",
    description: "Tuna salata, kukuruz, jaje, svježa zelena salata.",
    price: 5.5,
    image:
      "https://images.unsplash.com/photo-1481070414801-51fd732d7184?q=80&w=1200&auto=format&fit=crop",
    calories: 430,
    allergens: ["gluten", "riba", "jaja"],
  },
  {
    id: "club-sendvic",
    category: "sendvici",
    name: "Club Sendvič",
    description: "Tri kriške tosta, piletina, slanina, jaje, salata, rajčica.",
    price: 6.9,
    image:
      "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?q=80&w=1200&auto=format&fit=crop",
    calories: 650,
    allergens: ["gluten", "jaja", "mlijeko"],
  },

  // SALATE
  {
    id: "cezar-salata",
    category: "salate",
    name: "Cezar salata",
    description: "Piletina, parmezan, kroutoni, cezar dressing, zelena salata.",
    price: 6.9,
    image:
      "https://images.unsplash.com/photo-1556386734-4227a180d19e?q=80&w=1200&auto=format&fit=crop",
    calories: 420,
    allergens: ["mlijeko", "gluten", "jaja"],
  },
  {
    id: "grcka-salata",
    category: "salate",
    name: "Grčka salata",
    description: "Feta sir, masline, krastavac, rajčica, crveni luk, origano.",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=1200&auto=format&fit=crop",
    calories: 380,
    allergens: ["mlijeko"],
    vegetarian: true,
  },
  {
    id: "kupus-salata",
    category: "salate",
    name: "Domaća kupus salata",
    description: "Svježi bijeli kupus, mrkva, ulje, ocat — savršena uz roštilj.",
    price: 3.2,
    image:
      "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1200&auto=format&fit=crop",
    calories: 90,
    allergens: [],
    vegetarian: true,
  },

  // DNEVNA JELA (sample; puni tjedni raspored u weekly.ts)
  {
    id: "dnevno-gulas",
    category: "dnevna-jela",
    name: "Gulaš s njokima",
    description: "Domaći gulaš od junetine, mekani njoki, kruh.",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    calories: 710,
    allergens: ["gluten", "jaja"],
  },
  {
    id: "dnevno-sarma",
    category: "dnevna-jela",
    name: "Sarma",
    description: "Domaća sarma u kiselom kupusu s dimljenim mesom, pire krumpir.",
    price: 6.9,
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1200&auto=format&fit=crop",
    calories: 680,
    allergens: [],
  },

  // DESERTI
  {
    id: "palacinke-nutella",
    category: "deserti",
    name: "Palačinke s Nutellom",
    description: "Domaće palačinke, Nutella, mljeveni lješnjak, šlag.",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1757635964104-67218db55bca?q=80&w=1200&auto=format&fit=crop",
    calories: 520,
    allergens: ["gluten", "mlijeko", "jaja", "lješnjak"],
    vegetarian: true,
  },
  {
    id: "sladoled",
    category: "deserti",
    name: "Kuglice sladoleda (3 kom)",
    description: "Vanilija, čokolada, jagoda — domaći sladoled.",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1724805053604-4f189fb90dff?q=80&w=1200&auto=format&fit=crop",
    calories: 310,
    allergens: ["mlijeko"],
    vegetarian: true,
  },
  {
    id: "tvarak-kolac",
    category: "deserti",
    name: "Kolač od tvarog",
    description: "Domaći cheesecake s voćnim preljevom po izboru.",
    price: 3.9,
    image:
      "https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?q=80&w=1200&auto=format&fit=crop",
    calories: 430,
    allergens: ["gluten", "mlijeko", "jaja"],
    vegetarian: true,
  },

  // PICA
  {
    id: "domaca-limunada",
    category: "pica",
    name: "Domaća limunada",
    description: "Svježe cijeđeni limun, metvica, soda.",
    price: 3.0,
    image:
      "https://images.unsplash.com/photo-1555949366-819808d99159?q=80&w=1200&auto=format&fit=crop",
    calories: 90,
    allergens: [],
    vegetarian: true,
  },
  {
    id: "craft-pivo",
    category: "pica",
    name: "Craft pivo 0.5l",
    description: "Izbor lokalnih craft pivara, pitajte konobara za ponudu.",
    price: 4.2,
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=1200&auto=format&fit=crop",
    calories: 210,
    allergens: ["gluten"],
  },
  {
    id: "kava",
    category: "pica",
    name: "Espresso / Cappuccino",
    description: "100% arabica, pržena za Bistro Mali Raj.",
    price: 1.6,
    image:
      "https://images.unsplash.com/photo-1572286258217-40142c1c6a70?q=80&w=1200&auto=format&fit=crop",
    calories: 5,
    allergens: ["mlijeko"],
    vegetarian: true,
  },
];

export const popularItems = menuItems.filter((item) => item.popular);
