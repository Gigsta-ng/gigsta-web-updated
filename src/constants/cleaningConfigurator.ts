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

export type CleaningTierDef = {
  id: ServiceTier;
  name: string;
  tagline: string;
  features: string[];
  badge?: string;
};

export const CLEANING_TIERS: CleaningTierDef[] = [
  {
    id: "lite",
    name: "LITE",
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
    tagline: "Post-construction / move-in.",
    features: [
      "Heavy duty chemicals",
      "Paint/cement stain removal",
      "Priority matching",
    ],
  },
];

export const CLEANING_PRICE_TABLE: Record<CleaningSpaceSize, Record<ServiceTier, number>> = {
  default:      { lite: 0,  standard: 0,  pro: 0 },
  studio:       { lite: 6_500,  standard: 9_000,  pro: 15_000 },
  "1br":        { lite: 8_000,  standard: 11_000, pro: 25_000 },
  "2br":        { lite: 10_000, standard: 14_000, pro: 35_000 },
  "3br":        { lite: 12_500, standard: 17_000, pro: 45_000 },
  "4br":        { lite: 16_000, standard: 22_000, pro: 55_000 },
  "5br":        { lite: 20_000, standard: 28_000, pro: 70_000 },
  office_small: { lite: 10_000, standard: 15_000, pro: 40_000 },
};

export function cleaningBasePriceForTierAndSpace(
  tierId: ServiceTier,
  spaceSize: CleaningSpaceSize
): number {
  return CLEANING_PRICE_TABLE[spaceSize]?.[tierId] ?? 0;
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
  { id: "wardrobe", label: "Arrange Wardrobe", description: "Fold & organize closet.", price: 2_000 },
  { id: "microwave_oven", label: "Clean Microwave/Oven", description: "Deep degrease.", price: 1_500 },
  { id: "extra_toilet", label: "Extra Toilet", description: "Beyond base allowance.", price: 1_500 },
  { id: "ceiling_fan", label: "Clean Ceiling Fan", description: "Per fan.", price: 500 },
  { id: "market_run", label: "Market Run Errand", description: "Base fee (transport extra).", price: 2_500 },
];