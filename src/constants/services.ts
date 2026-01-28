
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";


// export const SERVICES: Service[] = [
//   {
//     id: 'cleaning',
//     name: 'Home Cleaning',
//     icon: image4,
//     description: 'Professional cleaning for your home',
//     pricing: {
//       lite: {
//         basePrice: 3000,
//         scope: ['Studio/1-Room', '2-Bedroom', '3-Bedroom'],
//         features: [
//           'Basic Surface Cleaning',
//           'Sweeping, Mopping, Dusting',
//           'Client Provides Tools/Soaps'
//         ]
//          note: '*Prices vary depending on home size'
//       },
//       standard: {
//         basePrice: 6500,
//         scope: ['Studio/1-Room', '2-Bedroom', '3-Bedroom'],
//         features: [
//           'Deep Clean',
//           'Scrubbing, Windows, Fans',
//           'Gigsta Provides Tools',
//           'Transport Included'
//         ]
//          note: '*Prices vary depending on home size'
//       },
//       pro: {
//         basePrice: 12000,
//         scope: ['Studio/1-Room', '2-Bedroom', '3-Bedroom', 'Duplex/4+'],
//         features: [
//           'Deep Clean + Organization',
//           'Premium Tools & Eco-friendly Products',
//           'Priority Arrival',
//           'Transport Included'
//         ]
//          note: '*Prices vary depending on home size'
//       }
//     }
//   },
//   // ... laundry and errands
//   {
//     id: 'cooking',
//     name: 'Home Cooking',
//     icon: image3,
//     description: 'Delicious home-cooked meals prepared in your kitchen',
//     pricing: {
//       lite: {
//         basePrice: 4000,
//         scope: ['Breakfast', 'Lunch', 'Dinner'],
//         features: [
//           'Simple 1-2 dish meal',
//           'Ingredients provided by client',
//           'Ready in 1 hour'
//         ],
//         note: '*Prices vary depending on number of dishes'
//       },
//       standard: {
//         basePrice: 9000,
//         scope: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
//         features: [
//           '3-4 dish meal',
//           'Ingredients provided by Gigsta',
//           'Priority scheduling',
//           'Transport included if needed'
//         ],
//         note: '*Prices vary depending on number of dishes'
//       },
//       pro: {
//         basePrice: 15000,
//         scope: ['Full-course meal', 'Party Catering'],
//         features: [
//           '5+ dish meal + dessert',
//           'Premium ingredients included',
//           'Chef arrives early to prep',
//           'Transport included'
//         ],
//         note: '*Prices vary depending on menu and servings'
//       }
//     }
//   }
// ];

// import type { Service } from "@/types/service";

// export const SERVICES: Service[] = [
//   {
//     id: 'cleaning',
//     name: 'Home Cleaning Services',
//     icon: image4,
//     description: 'One-time or monthly cleaning in Uyo',
//     pricing: {
//       lite: {
//         basePrice: 3000,
//         amount: ["₦8000 - ₦1000", "₦12,000 - ₦18,000"],
//         scope: ['Studio/1-Room', '2-3 Bedroom', '4+ Bedroom'],
//         features: [
//           'Basic Surface Cleaning',
//           'Sweeping, Mopping, Dusting',
//           'Client Provides Tools/Soaps',
//         ],
//         note: '*Prices vary depending on home size',
//       },
//       standard: {
//         basePrice: 6500,
//         amount: ["₦8000 -₦1000", "₦12,000 - ₦18,000"],
//         scope: ['Studio/1-Room', '2-Bedroom', '3-Bedroom'],
//         features: [
//           'Deep Clean',
//           'Scrubbing, Windows, Fans',
//           'Gigsta Provides Tools',
//           'Transport Included',
//         ],
//         note: '*Prices vary depending on home size',
//       },
//       pro: {
//         basePrice: 12000,
//         amount: ["₦8000 -₦1000", "₦12,000 - ₦18,000"],
//         scope: ['Studio/1-Room', '2-Bedroom', '3-Bedroom', 'Duplex/4+'],
//         features: [
//           'Deep Clean + Organization',
//           'Premium Tools & Eco-friendly Products',
//           'Priority Arrival',
//           'Transport Included',
//         ],
//         note: '*Prices vary depending on home size',
//       },
//     },
//   },
//   {
//     id: 'cooking',
//     name: 'Home Cooking Services',
//     icon: image3,
//     description: 'Reliable home cooking, one-time or recurring',
//     pricing: {
//       lite: {
//         basePrice: 2000,
//         amount: ["₦5000 - ₦7000", "₦8,000 - ₦10,000"],
//         scope: ['Single meal Preparation', 'Full-day cooking', 'Dinner'],
//         features: [
//           'Basic Meal Preparation',
//           'Standard Ingredients',
//           'Client Provides Kitchen',
//         ],
//         note: '*Prices vary depending on meal type and servings',
//       },
//       standard: {
//         basePrice: 4500,
//         amount: ["₦5000 - ₦7000", "₦8,000 - ₦10,000"],
//         scope: ['Breakfast', 'Lunch', 'Dinner'],
//         features: [
//           'Full Meal Preparation',
//           'Premium Ingredients',
//           'Gigsta Provides Kitchen Tools',
//           'Transport Included',
//         ],
//         note: '*Prices vary depending on meal type and servings',
//       },
//       pro: {
//         basePrice: 8000,
//         amount: ["₦5000 - ₦7000", "₦8,000 - ₦10,000"],
//         scope: ['Breakfast', 'Lunch', 'Dinner', 'Special Events'],
//         features: [
//           'Gourmet Meal Preparation',
//           'Premium & Organic Ingredients',
//           'Custom Menus',
//           'Priority Scheduling',
//         ],
//         note: '*Prices vary depending on meal type and servings',
//       },
//     },
//   },
//   // You can add laundry and errands here in the same format
// ];

import type { Service } from "@/types/service";

export const SERVICES: Service[] = [
  {
    id: "cleaning",
    name: "Home Cleaning Services",
    icon: image4,
    description: "One-time or monthly cleaning in Uyo",

    pricing: {
      lite: {
        basePrice: 3000,
        amount: ["₦8,000 – ₦10,000", "₦12,000 – ₦18,000"],
        scope: ["Studio / 1 Bedroom", "2–3 Bedroom", "4+ Bedroom"],
        features: [
          "Basic Surface Cleaning",
          "Sweeping, Mopping, Dusting",
          "Client Provides Tools / Soaps",
        ],
        note: "*Prices vary depending on home size",
      },

      standard: {
        basePrice: 6500,
        amount: ["₦8,000 – ₦10,000", "₦12,000 – ₦18,000"],
        scope: ["Studio / 1 Bedroom", "2–3 Bedroom"],
        features: [
          "Deep Cleaning",
          "Kitchen & Bathroom Scrubbing",
          "Gigsta Provides Tools",
          "Transport Included",
        ],
        note: "*Prices vary depending on home size",
      },

      pro: {
        basePrice: 12000,
        amount: ["₦12,000 – ₦18,000"],
        scope: ["Studio", "2–3 Bedroom", "Duplex / 4+"],
        features: [
          "Deep Cleaning + Organization",
          "Eco-friendly Products",
          "Priority Arrival",
          "Transport Included",
        ],
        note: "*Prices vary depending on home size",
      },
    },

    packages: [
      {
        category: "one-time",
        options: [
          {
            title: "Self-contain / 1 Bedroom",
            priceRange: "₦8,000 – ₦10,000",
            description:
              "Includes dusting, kitchen & bathroom cleaning, and floor mopping",
          },
          {
            title: "2–3 Bedroom Apartment",
            priceRange: "₦12,000 – ₦18,000",
            description:
              "Includes dusting, kitchen & bathroom cleaning, and floor mopping",
          },
        ],
      },
      {
        category: "monthly",
        options: [
          {
            title: "Once Weekly",
            priceRange: "₦30,000 – ₦40,000 / month",
          },
          {
            title: "Twice Weekly",
            priceRange: "₦55,000 – ₦65,000 / month",
          },
        ],
      },
    ],
  },

  {
    id: "cooking",
    name: "Home Cooking Services",
    icon: image3,
    description: "Reliable home cooking — one-time or recurring",

    pricing: {
      lite: {
        basePrice: 2000,
        amount: ["₦5,000 – ₦7,000"],
        scope: ["Single Meal"],
        features: [
          "Basic Meal Preparation",
          "Client Provides Ingredients",
          "Client Kitchen Used",
        ],
        note: "*Prices vary by meal type",
      },

      standard: {
        basePrice: 4500,
        amount: ["₦8,000 – ₦10,000"],
        scope: ["Breakfast", "Lunch", "Dinner"],
        features: [
          "Full Meal Preparation",
          "Standard Ingredients",
          "Transport Included",
        ],
        note: "*Prices vary by meal type",
      },

      pro: {
        basePrice: 8000,
        amount: ["₦10,000+"],
        scope: ["Daily Meals", "Events"],
        features: [
          "Custom Menus",
          "Premium Ingredients",
          "Priority Scheduling",
        ],
        note: "*Prices vary by servings and menu",
      },
    },

    packages: [
      {
        category: "one-time",
        options: [
          {
            title: "Single Meal Preparation",
            priceRange: "₦5,000 – ₦7,000",
          },
          {
            title: "Full-day Cooking",
            priceRange: "₦8,000 – ₦10,000",
          },
        ],
      },
      {
        category: "monthly",
        options: [
          {
            title: "3 Days / Week",
            priceRange: "₦45,000 – ₦55,000 / month",
          },
          {
            title: "5 Days / Week",
            priceRange: "₦70,000 – ₦85,000 / month",
          },
        ],
      },
    ],
  },
];
