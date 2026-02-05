import type { Service } from "@/types/service";
import cleaningImg from "@/assets/images/image4.jpg";
import cookingImg from "@/assets/images/image3.jpg";

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
        title: "One-Time Cleaning",
        prices: [
          { label: "Studio / Self-Contain", amount: "₦8,000" },
          { label: "1 Bedroom Apartment", amount: "₦15,000" },
          { label: "2 Bedroom Apartment", amount: "₦20,000" },
          { label: "3 Bedroom Apartment", amount: "₦25,000" },
        ],
      },

      {
        title: "Monthly Cleaning Packages",
        description: "(Once Weekly – 4 Visits Per Month)",
        prices: [
          { label: "Studio / Self-Contain", amount: "₦25,000 / month" },
          { label: "1 Bedroom Apartment", amount: "₦28,000 / month" },
          { label: "2 Bedroom Apartment", amount: "₦40,000 / month" },
          { label: "3 Bedroom Apartment", amount: "₦48,000 / month" },
        ],
        note:
          "Monthly packages are apartment-size specific. Pricing applies to the same apartment size for all visits.",
      },
    ],
  },

  {
    id: "cooking",
    name: "Home Cooking Services",
    heroImage: cookingImg,
    shortDescription: "Reliable home cooking — one-time or scheduled",
    description: "",

    includes: [
      "Basic meal preparation",
      "Cooking in client’s kitchen",
      "Proper kitchen clean-up after cooking",
      "Client provides all ingredients, gas, and kitchen equipment",
    ],

    pricingGroups: [
      {
        title: "One-Time Cooking",
        prices: [
          { label: "Single Meal Preparation", amount: "₦5,000" },
          { label: "Two Meals (same visit)", amount: "₦8,000" },
        ],
      },

      {
        title: "Weekly Cooking Plan",
        prices: [
          { label: "3 cooking visits per week", amount: "₦18,000" },
          { label: "5 cooking visits per week", amount: "₦28,000" },
        ],
      },
    ],
  },
];
