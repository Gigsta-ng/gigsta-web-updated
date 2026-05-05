export type CleaningSpaceSize =
  | "default"
  | "studio"
  | "1br"
  | "2br"
  | "3br"
  | "4br"
  | "5br"
  | "office_small";

export type ServiceTier = "lite" | "standard" | "pro";

export type CleaningAddonId =
  | "fridge"
  | "dishes"
  | "windows"
  | "wardrobe"
  | "microwave_oven"
  | "extra_toilet"
  | "ceiling_fan"
  | "market_run"

export interface CleaningServiceConfiguration {
  service: "cleaning";
  spaceSize: CleaningSpaceSize;
  tier: ServiceTier;
  addonIds: CleaningAddonId[];
  totalPrice: number;
}

export interface LaundryServiceConfiguration {
  service: "laundry";
  tier: ServiceTier;
  items: Record<string, number>;
  washTotal: number;
  ironingTotal: number;
  transport: number;
  expressPremium: number;
  totalPrice: number;
}

export type ServiceConfigurationPayload =
  | CleaningServiceConfiguration
  | LaundryServiceConfiguration;

/** Multiple services in one request (no top-level `service` field). */
export type CombinedBookingConfiguration = {
  cleaning?: CleaningServiceConfiguration;
  laundry?: LaundryServiceConfiguration;
};

export type BookingNavigateConfiguration =
  | ServiceConfigurationPayload
  | CombinedBookingConfiguration;

export type RequestServiceNavigateState = {
  configuration: BookingNavigateConfiguration;
};

export function isCombinedBookingConfiguration(
  c: BookingNavigateConfiguration,
): c is CombinedBookingConfiguration {
  if (c === null || typeof c !== "object" || "service" in c) return false;
  const x = c as CombinedBookingConfiguration;
  return !!(x.cleaning || x.laundry);
}
