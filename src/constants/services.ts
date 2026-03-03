import type { Service } from "@/types/service";
import cleaningImg from "@/assets/images/image4.jpg";

export const SERVICES: Service[] = [
  {
    id: "cleaning",
    name: "House Cleaning Services",
    heroImage: cleaningImg,
    shortDescription: "One-time or monthly cleaning in Uyo",
    description: "",

    includes: [
      "Sweeping and mopping floors",
      "Dusting of surfaces and furniture",
      "Bathroom cleaning (toilet, sink, tiles)",
      "Kitchen surface cleaning",
      "Trash removal",
      "Basic arrangement of space",
    ],

    pricingGroups: [
      {
        title: "Residential Cleaning (One-Time Cleaning)",
        prices: [
          { label: "Studio / Self-Contain", amount: "₦9,000" },
          { label: "1 Bedroom", amount: "₦11,000" },
          { label: "2 Bedroom", amount: "₦14,000" },
          { label: "3 Bedroom", amount: "₦17,000" },
        ],
      },
      {
        title: "Residential Cleaning – Monthly Packages",
        description: "Once weekly (4 visits per month). Same apartment size for all visits.",
        prices: [
          { label: "Studio / Self-Contain", amount: "₦30,000 / month" },
          { label: "1 Bedroom", amount: "₦38,000 / month" },
          { label: "2 Bedroom", amount: "₦50,000 / month" },
          { label: "3 Bedroom", amount: "₦62,000 / month" },
        ],
        note: "₦6,000 discount on all monthly packages.",
      },
      {
        title: "Post-Construction Cleaning",
        description: "For newly built or renovated spaces.",
        prices: [
          { label: "Studio / Small Unit", amount: "₦20,000" },
          { label: "1 Bedroom", amount: "₦28,000" },
          { label: "2 Bedroom", amount: "₦38,000" },
          { label: "3 Bedroom", amount: "₦50,000" },
        ],
        note: "Site inspection recommended before confirmation. 50% upfront payment required.",
      },
    ],
  },

  {
    id: "laundry",
    name: "Laundry Services",
    heroImage: "/images/laundry.jpg",
    shortDescription: "Reliable laundry — wash, dry, fold & iron",
    description: "",

    includes: [
      "Wash, dry, and fold",
      "Ironing and pressing",
      "Standard bundle: up to 1 full laundry basket",
      "Heavy items (duvets, blankets, curtains) priced separately",
    ],

    pricingGroups: [
      {
        title: "Standard Laundry Bundle",
        description: "Includes: Up to 1 full laundry basket • Washing • Drying • Ironing and Folding. Excludes: Heavy blankets, duvets, curtains.",
        prices: [
          { label: "Standard Laundry Bundle", amount: "₦9,000" },
        ],
      },
      {
        title: "Heavy Items Pricing",
        prices: [
          { label: "Duvet", amount: "₦4,000" },
          { label: "Blanket", amount: "₦3,000" },
          { label: "Curtains (per set)", amount: "₦5,000" },
        ],
      },
      {
        title: "Ironing Only",
        prices: [
          { label: "Up to 15 items", amount: "₦5,000" },
        ],
      },
    ],
  },
];
