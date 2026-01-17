import type { Service } from "@/types/service";

export const SERVICES: Service[] = [
  {
    id: 'cleaning',
    name: 'Home Cleaning',
    icon: '/images/services/cleaning.svg',
    description: 'Professional cleaning for your home',
    pricing: {
      lite: {
        basePrice: 3000,
        scope: ['Studio/1-Room', '2-Bedroom', '3-Bedroom'],
        features: [
          'Basic Surface Cleaning',
          'Sweeping, Mopping, Dusting',
          'Client Provides Tools/Soaps'
        ]
      },
      standard: {
        basePrice: 6500,
        scope: ['Studio/1-Room', '2-Bedroom', '3-Bedroom'],
        features: [
          'Deep Clean',
          'Scrubbing, Windows, Fans',
          'Gigsta Provides Tools',
          'Transport Included'
        ]
      },
      pro: {
        basePrice: 12000,
        scope: ['Studio/1-Room', '2-Bedroom', '3-Bedroom', 'Duplex/4+'],
        features: [
          'Deep Clean + Organization',
          'Premium Tools & Eco-friendly Products',
          'Priority Arrival',
          'Transport Included'
        ]
      }
    }
  },
  // ... laundry and errands
];