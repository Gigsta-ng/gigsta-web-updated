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
    id: "laundry",
    name: "Laundry Services",
    heroImage: "/images/laundry.jpg",
    shortDescription: "Reliable laundry — wash, dry, fold & iron",
    description: "",

    includes: [
      "Wash, dry, and fold",
      "Ironing and pressing",
      "Care for delicates and special fabrics",
      "Pick-up and delivery options available",
    ],

    pricingGroups: [
      {
        title: "One-Time Laundry",
        prices: [
          { label: "Small load (up to 6 kg)", amount: "₦5,000" },
          { label: "Medium load (6–12 kg)", amount: "₦8,000" },
          { label: "Large load (12+ kg)", amount: "₦12,000" },
        ],
      },

      {
        title: "Weekly Laundry Plan",
        prices: [
          { label: "2 laundry visits per week", amount: "₦18,000" },
          { label: "3 laundry visits per week", amount: "₦25,000" },
        ],
      },
    ],
  },
];
