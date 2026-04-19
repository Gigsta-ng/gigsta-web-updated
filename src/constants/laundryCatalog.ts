export type LaundryCatalogItem = {
  category: string;
  id: string;
  name: string;
  base_price: number;
  iron_fee: number;
  auto_iron: boolean;
};

/** Ported from gigsta_laundry_v7_smart_logic.html */
export const LAUNDRY_CATALOG: LaundryCatalogItem[] = [
  { category: "Traditional & Native", id: "agbada", name: "Agbada (Complete Set)", base_price: 1500, iron_fee: 1000, auto_iron: true },
  { category: "Traditional & Native", id: "senator", name: "Senator Wears (Pair)", base_price: 600, iron_fee: 600, auto_iron: true },
  { category: "Traditional & Native", id: "wrapper", name: "Wrapper (George/Lace)", base_price: 600, iron_fee: 400, auto_iron: true },

  { category: "Corporate & Office", id: "suit", name: "Suit (2-Piece)", base_price: 1500, iron_fee: 1000, auto_iron: true },
  { category: "Corporate & Office", id: "blazer", name: "Blazer / Jacket Only", base_price: 300, iron_fee: 200, auto_iron: true },
  { category: "Corporate & Office", id: "office_shirt", name: "Office Shirt", base_price: 400, iron_fee: 400, auto_iron: true },
  { category: "Corporate & Office", id: "trouser", name: "Corporate Trousers", base_price: 400, iron_fee: 400, auto_iron: true },

  { category: "Casual & Activewear", id: "denim_jacket", name: "Denim Jacket / Heavy", base_price: 500, iron_fee: 300, auto_iron: true },
  { category: "Casual & Activewear", id: "jeans", name: "Jeans (Trousers)", base_price: 400, iron_fee: 300, auto_iron: true },
  { category: "Casual & Activewear", id: "polo", name: "Polo / Jersey / T-Shirt", base_price: 250, iron_fee: 150, auto_iron: true },
  { category: "Casual & Activewear", id: "gown", name: "Gowns / Dresses", base_price: 500, iron_fee: 400, auto_iron: true },
  { category: "Casual & Activewear", id: "blouse", name: "Blouses / Skirts", base_price: 300, iron_fee: 300, auto_iron: true },
  { category: "Casual & Activewear", id: "joggers", name: "Joggers / Shorts", base_price: 300, iron_fee: 0, auto_iron: false },
  { category: "Casual & Activewear", id: "singlet", name: "Singlets / Undies", base_price: 150, iron_fee: 0, auto_iron: false },

  { category: "Home & Bedding", id: "duvet", name: "Duvet / Blanket", base_price: 2500, iron_fee: 0, auto_iron: false },
  { category: "Home & Bedding", id: "bedsheet", name: "Bed Sheets", base_price: 500, iron_fee: 0, auto_iron: false },
  { category: "Home & Bedding", id: "curtain", name: "Curtains (Per Panel)", base_price: 1000, iron_fee: 0, auto_iron: false },
  { category: "Home & Bedding", id: "pillowcase", name: "Pillow Cases", base_price: 150, iron_fee: 0, auto_iron: false },
  { category: "Home & Bedding", id: "towel", name: "Towels", base_price: 300, iron_fee: 0, auto_iron: false },
];

export const LAUNDRY_TRANSPORT = 1000;
export const LAUNDRY_EXPRESS_PREMIUM = 2000;
