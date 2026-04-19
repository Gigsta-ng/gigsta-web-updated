import {
  CLEANING_ADDONS,
  cleaningBasePriceForTierAndSpace,
} from "@/constants/cleaningConfigurator";
import {
  LAUNDRY_CATALOG,
  LAUNDRY_EXPRESS_PREMIUM,
  LAUNDRY_TRANSPORT,
} from "@/constants/laundryCatalog";
import {
  computeLaundryTierTotals,
  computeLaundryWashAndIron,
} from "@/lib/laundryPricing";
import type { ServicesDraftV1 } from "@/lib/servicesDraftStorage";
import type {
  CleaningServiceConfiguration,
  LaundryServiceConfiguration,
} from "@/types/serviceConfiguration";

export function buildCleaningConfigurationFromDraft(
  cleaning: ServicesDraftV1["cleaning"]
): CleaningServiceConfiguration | null {
  if (cleaning.spaceSize === null || cleaning.tier === null) return null;
  const base = cleaningBasePriceForTierAndSpace(cleaning.tier, cleaning.spaceSize);
  const addonIds = CLEANING_ADDONS.filter((a) => cleaning.addons[a.id]).map(
    (a) => a.id
  );
  const addonTotal = CLEANING_ADDONS.filter((a) => cleaning.addons[a.id]).reduce(
    (s, a) => s + a.price,
    0
  );
  return {
    service: "cleaning",
    spaceSize: cleaning.spaceSize,
    tier: cleaning.tier,
    addonIds,
    totalPrice: base + addonTotal,
  };
}

export function buildLaundryConfigurationFromDraft(
  laundry: ServicesDraftV1["laundry"]
): LaundryServiceConfiguration | null {
  if (laundry.tier === null) return null;
  const { washTotal, ironingTotal } = computeLaundryWashAndIron(
    laundry.cart,
    LAUNDRY_CATALOG
  );
  if (washTotal === 0) return null;
  const tierPrices = computeLaundryTierTotals(washTotal, ironingTotal);
  const tier = laundry.tier;
  return {
    service: "laundry",
    tier,
    items: { ...laundry.cart },
    washTotal,
    ironingTotal,
    transport: LAUNDRY_TRANSPORT,
    expressPremium: tier === "pro" ? LAUNDRY_EXPRESS_PREMIUM : 0,
    totalPrice: tierPrices[tier],
  };
}
