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
import type {
  BookingNavigateConfiguration,
  CleaningAddonId,
  CleaningServiceConfiguration,
  CombinedBookingConfiguration,
  LaundryServiceConfiguration,
} from "@/types/serviceConfiguration";
import { isCombinedBookingConfiguration } from "@/types/serviceConfiguration";

function recalculateCleaning(c: CleaningServiceConfiguration): CleaningServiceConfiguration {
  const base = cleaningBasePriceForTierAndSpace(c.tier, c.spaceSize);
  const addonTotal = CLEANING_ADDONS.filter((a) => c.addonIds.includes(a.id)).reduce(
    (s, a) => s + a.price,
    0
  );
  return {
    ...c,
    totalPrice: base + addonTotal,
  };
}

export function removeCleaningAddon(
  c: CleaningServiceConfiguration,
  addonId: CleaningAddonId
): CleaningServiceConfiguration {
  const addonIds = c.addonIds.filter((id) => id !== addonId);
  return recalculateCleaning({ ...c, addonIds });
}

export function recalculateLaundryFromCart(
  items: Record<string, number>,
  tier: LaundryServiceConfiguration["tier"]
): LaundryServiceConfiguration | null {
  const { washTotal, ironingTotal } = computeLaundryWashAndIron(
    items,
    LAUNDRY_CATALOG
  );
  if (washTotal === 0) return null;
  const tierPrices = computeLaundryTierTotals(washTotal, ironingTotal);
  return {
    service: "laundry",
    tier,
    items: { ...items },
    washTotal,
    ironingTotal,
    transport: LAUNDRY_TRANSPORT,
    expressPremium: tier === "pro" ? LAUNDRY_EXPRESS_PREMIUM : 0,
    totalPrice: tierPrices[tier],
  };
}

export function removeLaundryLineItem(
  l: LaundryServiceConfiguration,
  itemId: string
): LaundryServiceConfiguration | null {
  const nextItems = { ...l.items, [itemId]: 0 };
  return recalculateLaundryFromCart(nextItems, l.tier);
}

/** Remove laundry from combined booking; returns single cleaning or null if nothing left. */
export function removeLaundryFromCombined(
  combined: CombinedBookingConfiguration
): BookingNavigateConfiguration | null {
  if (!combined.cleaning) return null;
  return combined.cleaning;
}

/** Remove cleaning from combined booking; returns single laundry or null if nothing left. */
export function removeCleaningFromCombined(
  combined: CombinedBookingConfiguration
): BookingNavigateConfiguration | null {
  if (!combined.laundry) return null;
  return combined.laundry;
}

export function applyBookingRemoval(
  current: BookingNavigateConfiguration,
  action:
    | { type: "removeCleaningAddon"; addonId: CleaningAddonId }
    | { type: "removeLaundryItem"; itemId: string }
    | { type: "removeEntireCleaning" }
    | { type: "removeEntireLaundry" }
): BookingNavigateConfiguration | null {
  if (isCombinedBookingConfiguration(current)) {
    if (action.type === "removeEntireCleaning") {
      return removeCleaningFromCombined(current);
    }
    if (action.type === "removeEntireLaundry") {
      return removeLaundryFromCombined(current);
    }
    if (action.type === "removeCleaningAddon" && current.cleaning) {
      const nextCleaning = removeCleaningAddon(current.cleaning, action.addonId);
      return {
        ...current,
        cleaning: nextCleaning,
      };
    }
    if (action.type === "removeLaundryItem" && current.laundry) {
      const nextLaundry = removeLaundryLineItem(current.laundry, action.itemId);
      if (!nextLaundry) {
        return removeLaundryFromCombined(current);
      }
      return {
        ...current,
        laundry: nextLaundry,
      };
    }
    return current;
  }

  if (current.service === "cleaning") {
    if (action.type === "removeCleaningAddon") {
      return removeCleaningAddon(current, action.addonId);
    }
    return current;
  }

  if (current.service === "laundry") {
    if (action.type === "removeLaundryItem") {
      return removeLaundryLineItem(current, action.itemId);
    }
    return current;
  }

  return current;
}
