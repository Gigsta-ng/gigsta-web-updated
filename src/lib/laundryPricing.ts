import type { LaundryCatalogItem } from "@/constants/laundryCatalog";
import { LAUNDRY_EXPRESS_PREMIUM, LAUNDRY_TRANSPORT } from "@/constants/laundryCatalog";
import type { ServiceTier } from "@/types/serviceConfiguration";

export function computeLaundryWashAndIron(
  cart: Record<string, number>,
  catalog: LaundryCatalogItem[]
): { washTotal: number; ironingTotal: number } {
  let washTotal = 0;
  let ironingTotal = 0;
  for (const item of catalog) {
    const qty = cart[item.id] ?? 0;
    washTotal += qty * item.base_price;
    ironingTotal += qty * item.iron_fee;
  }
  return { washTotal, ironingTotal };
}

export function computeLaundryTierTotals(
  washTotal: number,
  ironingTotal: number
): Record<ServiceTier, number> {
  const lite = washTotal + LAUNDRY_TRANSPORT;
  const standard = washTotal + ironingTotal + LAUNDRY_TRANSPORT;
  const pro =
    washTotal + ironingTotal + LAUNDRY_TRANSPORT + LAUNDRY_EXPRESS_PREMIUM;
  return { lite, standard, pro };
}

export function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
