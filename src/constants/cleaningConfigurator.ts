import type { CleaningAddonId, CleaningSpaceSize, ServiceTier } from "@/types/serviceConfiguration";

export const CLEANING_SPACE_OPTIONS: { id: CleaningSpaceSize; label: string }[] = [
  { id: "studio", label: "Studio" },
  { id: "2br", label: "2 Bedroom" },
  { id: "3br", label: "3 Bedroom" },
];

/**
 * Tier list prices are defined for a typical 2-bedroom home. Studio is discounted;
 * 3 bedroom is increased to reflect larger scope.
 */
export const CLEANING_SPACE_PRICE_MULTIPLIER: Record<CleaningSpaceSize, number> = {
  studio: 0.88,
  "2br": 1,
  "3br": 1.15,
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
  price: number;
}[] = [
  { id: "fridge", label: "Clean Fridge", price: 1_500 },
  { id: "dishes", label: "Wash Dishes", price: 1_000 },
  { id: "windows", label: "Interior Windows", price: 2_000 },
  // { id: "clothes_basket", label: "Wash Clothes (1 Basket)", price: 3_000 },
];
