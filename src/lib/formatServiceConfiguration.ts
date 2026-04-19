import { CLEANING_ADDONS, CLEANING_SPACE_OPTIONS, CLEANING_TIERS } from "@/constants/cleaningConfigurator";
import { LAUNDRY_CATALOG } from "@/constants/laundryCatalog";
import {
  isCombinedBookingConfiguration,
  type BookingNavigateConfiguration,
  type CleaningServiceConfiguration,
  type CombinedBookingConfiguration,
  type ServiceConfigurationPayload,
} from "@/types/serviceConfiguration";
import { formatNgn } from "@/lib/laundryPricing";

function tierLabel(tier: string): string {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

function spaceLabel(spaceSize: CleaningServiceConfiguration["spaceSize"]): string {
  return CLEANING_SPACE_OPTIONS.find((s) => s.id === spaceSize)?.label ?? spaceSize;
}

export function formatConfigurationSummary(config: ServiceConfigurationPayload): string {
  if (config.service === "cleaning") {
    const tierName =
      CLEANING_TIERS.find((t) => t.id === config.tier)?.name ?? config.tier;
    const addonLabels = config.addonIds
      .map((id) => CLEANING_ADDONS.find((a) => a.id === id)?.label ?? id)
      .join(", ");
    return [
      `Space: ${spaceLabel(config.spaceSize)}`,
      `Tier: ${tierName}`,
      addonLabels ? `Add-ons: ${addonLabels}` : "Add-ons: none",
      `Total: ${formatNgn(config.totalPrice)}`,
    ].join(" · ");
  }

  const lines: string[] = [`Tier: ${tierLabel(config.tier)}`, `Total: ${formatNgn(config.totalPrice)}`];
  const itemParts = LAUNDRY_CATALOG.filter((i) => (config.items[i.id] ?? 0) > 0).map(
    (i) => `${i.name} ×${config.items[i.id]}`
  );
  if (itemParts.length) {
    lines.push(`Items: ${itemParts.join("; ")}`);
  }
  return lines.join(" · ");
}

export function formatConfigurationSheetDetails(config: ServiceConfigurationPayload): string {
  if (config.service === "cleaning") {
    const tierName =
      CLEANING_TIERS.find((t) => t.id === config.tier)?.name ?? config.tier;
    const addonLines = config.addonIds.map((id) => {
      const a = CLEANING_ADDONS.find((x) => x.id === id);
      return a ? `${a.label} (+${formatNgn(a.price)})` : id;
    });
    return [
      "Service: House cleaning (interactive quote)",
      `Space: ${spaceLabel(config.spaceSize)}`,
      `Tier: ${tierName}`,
      addonLines.length ? `Add-ons: ${addonLines.join(", ")}` : "Add-ons: none",
      `Estimated total: ${formatNgn(config.totalPrice)}`,
    ].join("\n");
  }

  const itemLines = LAUNDRY_CATALOG.filter((i) => (config.items[i.id] ?? 0) > 0).map(
    (i) => `${i.name} ×${config.items[i.id]} — base ${formatNgn(i.base_price)}`
  );
  return [
    "Service: Laundry (interactive quote)",
    `Tier: ${tierLabel(config.tier)}`,
    `Wash (base): ${formatNgn(config.washTotal)}`,
    `Ironing surcharge: ${formatNgn(config.ironingTotal)}`,
    `Pickup & delivery: ${formatNgn(config.transport)}`,
    config.tier === "pro"
      ? `24hr express premium: ${formatNgn(config.expressPremium)}`
      : null,
    `Total: ${formatNgn(config.totalPrice)}`,
    itemLines.length ? `\nLine items:\n${itemLines.join("\n")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatCombinedBookingSummary(c: CombinedBookingConfiguration): string {
  const parts: string[] = [];
  if (c.cleaning) {
    parts.push(`Cleaning ${formatNgn(c.cleaning.totalPrice)}`);
  }
  if (c.laundry) {
    parts.push(`Laundry ${formatNgn(c.laundry.totalPrice)}`);
  }
  const combined =
    (c.cleaning?.totalPrice ?? 0) + (c.laundry?.totalPrice ?? 0);
  return [...parts, `Combined total: ${formatNgn(combined)}`].join(" · ");
}

export function formatCombinedBookingSheetDetails(c: CombinedBookingConfiguration): string {
  const blocks: string[] = ["Combined booking (interactive quote)"];
  if (c.cleaning) {
    blocks.push("", "--- House cleaning ---", formatConfigurationSheetDetails(c.cleaning));
  }
  if (c.laundry) {
    blocks.push("", "--- Laundry ---", formatConfigurationSheetDetails(c.laundry));
  }
  const combined =
    (c.cleaning?.totalPrice ?? 0) + (c.laundry?.totalPrice ?? 0);
  blocks.push("", `Grand total (both services): ${formatNgn(combined)}`);
  return blocks.join("\n");
}

export function formatBookingPackageLine(c: BookingNavigateConfiguration): string {
  if (isCombinedBookingConfiguration(c)) {
    return formatCombinedBookingSummary(c);
  }
  return formatConfigurationSummary(c);
}

export function formatBookingSheetDetails(c: BookingNavigateConfiguration): string {
  if (isCombinedBookingConfiguration(c)) {
    return formatCombinedBookingSheetDetails(c);
  }
  return formatConfigurationSheetDetails(c);
}
