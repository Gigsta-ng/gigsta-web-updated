import type { CleaningAddonId, CleaningSpaceSize, ServiceTier } from "@/types/serviceConfiguration";

export const CLEANING_SPACE_OPTIONS: { id: CleaningSpaceSize; label: string }[] = [
  { id: "studio", label: "Studio" },
  { id: "1br", label: "1 Bedroom" },
  { id: "2br", label: "2 Bedroom" },
  { id: "3br", label: "3 Bedroom" },
  { id: "4br", label: "4 Bedroom / Duplex" },
  { id: "5br", label: "5 Bedroom / Mansion" },
  { id: "office_small", label: "Office (Small)" },
];

export const CLEANING_SPACE_PRICE_MULTIPLIER: Record<CleaningSpaceSize, number> = {
  studio: 0.88,
  "1br": 0.94,
  "2br": 1,
  "3br": 1.15,
  "4br": 1.35,
  "5br": 1.6,
  office_small: 1.2,
};

export type CleaningTierDef = {
  id: ServiceTier;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  badge?: string;
};

export const CLEANING_TIERS: CleaningTierDef[] = [
  {
    id: "lite",
    name: "LITE",
    price: 10_000,
    tagline: "Basic surface cleaning.",
    features: [
      "You provide soap/broom",
      "Sweeping & mopping",
      "Surface dusting",
    ],
  },
  {
    id: "standard",
    name: "STANDARD",
    price: 14_000,
    tagline: "Deep clean. We bring everything.",
    features: [
      "Gigsta provides all tools",
      "Bathroom & kitchen deep clean",
      "Trash removal",
    ],
    badge: "POPULAR",
  },
  {
    id: "pro",
    name: "PRO",
    price: 38_000,
    tagline: "Post-construction / move-in.",
    features: [
      "Heavy duty chemicals",
      "Paint/cement stain removal",
      "Priority matching",
    ],
  },
];

export function cleaningBasePriceForTierAndSpace(
  tierId: ServiceTier,
  spaceSize: CleaningSpaceSize
): number {
  const tier = CLEANING_TIERS.find((t) => t.id === tierId);
  if (!tier) return 0;
  return Math.round(tier.price * CLEANING_SPACE_PRICE_MULTIPLIER[spaceSize]);
}


export const CLEANING_ADDONS: {
  id: CleaningAddonId;
  label: string;
  description: string;
  price: number;
}[] = [
  { id: "fridge", label: "Clean Fridge/Freezer", description: "Empty and scrub.", price: 1_500 },
  { id: "dishes", label: "Wash Dishes", description: "Up to a full sink.", price: 1_000 },
  { id: "windows", label: "Interior Windows", description: "Inside glass surfaces.", price: 2_000 },
  { id: "cooking", label: "Cooking (Light Meal)", description: "Ingredients must be provided.", price: 3_500 },
  { id: "wardrobe", label: "Arrange Wardrobe", description: "Fold & organize closet.", price: 2_000 },
  { id: "microwave_oven", label: "Clean Microwave/Oven", description: "Deep degrease.", price: 1_500 },
  { id: "extra_toilet", label: "Extra Toilet", description: "Beyond base allowance.", price: 1_500 },
  { id: "ceiling_fan", label: "Clean Ceiling Fan", description: "Per fan.", price: 500 },
  { id: "trash_removal", label: "Trash Removal (Lite Only)", description: "Take bags to dump.", price: 500 },
  { id: "market_run", label: "Market Run Errand", description: "Base fee (transport extra).", price: 2_500 },
  { id: "wash_clothes", label: "Wash Clothes", description: "Per basket.", price: 3_000 },
  { id: "ironing", label: "Ironing", description: "Per dozen.", price: 2_000 },
];