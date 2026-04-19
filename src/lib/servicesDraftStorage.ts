import { CLEANING_ADDONS } from "@/constants/cleaningConfigurator";
import { LAUNDRY_CATALOG } from "@/constants/laundryCatalog";
import {
  isCombinedBookingConfiguration,
  type BookingNavigateConfiguration,
  type CleaningAddonId,
  type CleaningServiceConfiguration,
  type CleaningSpaceSize,
  type LaundryServiceConfiguration,
  type ServiceTier,
} from "@/types/serviceConfiguration";

const STORAGE_KEY = "gigsta-services-draft-v1";

export type ServicesTab = "cleaning" | "laundry";

export type ServicesDraftV1 = {
  v: 1;
  activeTab: ServicesTab;
  cleaning: {
    spaceSize: CleaningSpaceSize | null;
    tier: ServiceTier | null;
    addons: Record<CleaningAddonId, boolean>;
  };
  laundry: {
    tier: ServiceTier | null;
    cart: Record<string, number>;
  };
};

export function createEmptyLaundryCart(): Record<string, number> {
  const c: Record<string, number> = {};
  for (const item of LAUNDRY_CATALOG) {
    c[item.id] = 0;
  }
  return c;
}

function createDefaultCleaningAddons(): Record<CleaningAddonId, boolean> {
  return CLEANING_ADDONS.reduce(
    (acc, a) => ({ ...acc, [a.id]: false }),
    {} as Record<CleaningAddonId, boolean>
  );
}

export function getDefaultServicesDraft(): ServicesDraftV1 {
  return {
    v: 1,
    activeTab: "cleaning",
    cleaning: {
      spaceSize: null,
      tier: null,
      addons: createDefaultCleaningAddons(),
    },
    laundry: {
      tier: null,
      cart: createEmptyLaundryCart(),
    },
  };
}

const TIER_SET = new Set<ServiceTier>(["lite", "standard", "pro"]);
const SPACE_SET = new Set<CleaningSpaceSize>(["studio", "2br", "3br"]);

function sanitizeCleaningAddons(
  raw: unknown
): Record<CleaningAddonId, boolean> | null {
  if (!raw || typeof raw !== "object") return null;
  const base = createDefaultCleaningAddons();
  for (const id of CLEANING_ADDONS.map((a) => a.id)) {
    const v = (raw as Record<string, unknown>)[id];
    if (typeof v === "boolean") {
      base[id] = v;
    }
  }
  return base;
}

function sanitizeLaundryCart(raw: unknown): Record<string, number> | null {
  if (!raw || typeof raw !== "object") return null;
  const empty = createEmptyLaundryCart();
  const o = raw as Record<string, unknown>;
  for (const id of Object.keys(empty)) {
    const n = o[id];
    if (typeof n === "number" && Number.isFinite(n) && n >= 0) {
      empty[id] = Math.floor(n);
    }
  }
  return empty;
}

function parseDraft(raw: unknown): ServicesDraftV1 | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (o.v !== 1) return null;

  const activeTab = o.activeTab;
  if (activeTab !== "cleaning" && activeTab !== "laundry") return null;

  const c = o.cleaning;
  if (!c || typeof c !== "object") return null;
  const cleaningObj = c as Record<string, unknown>;
  const spaceRaw = cleaningObj.spaceSize;
  let spaceSize: CleaningSpaceSize | null;
  if (spaceRaw === null) spaceSize = null;
  else if (
    typeof spaceRaw === "string" &&
    SPACE_SET.has(spaceRaw as CleaningSpaceSize)
  )
    spaceSize = spaceRaw as CleaningSpaceSize;
  else return null;

  const tierCleanRaw = cleaningObj.tier;
  let tierClean: ServiceTier | null;
  if (tierCleanRaw === null) tierClean = null;
  else if (
    typeof tierCleanRaw === "string" &&
    TIER_SET.has(tierCleanRaw as ServiceTier)
  )
    tierClean = tierCleanRaw as ServiceTier;
  else return null;
  const addons = sanitizeCleaningAddons(cleaningObj.addons);
  if (!addons) return null;

  const l = o.laundry;
  if (!l || typeof l !== "object") return null;
  const laundryObj = l as Record<string, unknown>;
  const tierLaundryRaw = laundryObj.tier;
  let tierLaundry: ServiceTier | null;
  if (tierLaundryRaw === null) tierLaundry = null;
  else if (
    typeof tierLaundryRaw === "string" &&
    TIER_SET.has(tierLaundryRaw as ServiceTier)
  )
    tierLaundry = tierLaundryRaw as ServiceTier;
  else return null;
  const cart = sanitizeLaundryCart(laundryObj.cart);
  if (!cart) return null;

  return {
    v: 1,
    activeTab,
    cleaning: {
      spaceSize: spaceSize as CleaningSpaceSize,
      tier: tierClean as ServiceTier,
      addons,
    },
    laundry: {
      tier: tierLaundry as ServiceTier,
      cart,
    },
  };
}

export function loadServicesDraft(): ServicesDraftV1 | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return parseDraft(JSON.parse(stored));
  } catch {
    return null;
  }
}

export function saveServicesDraft(draft: ServicesDraftV1): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // ignore quota / private mode
  }
}

/** Replace any provided slice; omitted slices keep values from current storage. */
export function mergeServicesDraft(partial: {
  activeTab?: ServicesTab;
  cleaning?: ServicesDraftV1["cleaning"];
  laundry?: ServicesDraftV1["laundry"];
}): void {
  const current = loadServicesDraft() ?? getDefaultServicesDraft();
  saveServicesDraft({
    v: 1,
    activeTab: partial.activeTab ?? current.activeTab,
    cleaning: partial.cleaning ?? current.cleaning,
    laundry: partial.laundry ?? current.laundry,
  });
}

function cleaningDraftFromConfig(
  c: CleaningServiceConfiguration
): ServicesDraftV1["cleaning"] {
  const addons = createDefaultCleaningAddons();
  for (const a of CLEANING_ADDONS) {
    addons[a.id] = c.addonIds.includes(a.id);
  }
  return {
    spaceSize: c.spaceSize,
    tier: c.tier,
    addons,
  };
}

function laundryDraftFromConfig(
  l: LaundryServiceConfiguration
): ServicesDraftV1["laundry"] {
  const cart = createEmptyLaundryCart();
  for (const id of Object.keys(cart)) {
    cart[id] = Math.floor(Math.max(0, l.items[id] ?? 0));
  }
  return {
    tier: l.tier,
    cart,
  };
}

/**
 * Keeps sessionStorage draft aligned with the booking summary after adds/removes on the request form.
 */
export function syncServicesDraftWithBookingConfiguration(
  config: BookingNavigateConfiguration
): void {
  const current = loadServicesDraft() ?? getDefaultServicesDraft();
  const defaults = getDefaultServicesDraft();

  if (isCombinedBookingConfiguration(config)) {
    const cleaning = config.cleaning
      ? cleaningDraftFromConfig(config.cleaning)
      : defaults.cleaning;
    const laundry = config.laundry
      ? laundryDraftFromConfig(config.laundry)
      : defaults.laundry;
    saveServicesDraft({
      v: 1,
      activeTab: current.activeTab,
      cleaning,
      laundry,
    });
    return;
  }

  if (config.service === "cleaning") {
    saveServicesDraft({
      v: 1,
      activeTab: current.activeTab,
      cleaning: cleaningDraftFromConfig(config),
      laundry: current.laundry,
    });
    return;
  }

  saveServicesDraft({
    v: 1,
    activeTab: current.activeTab,
    cleaning: current.cleaning,
    laundry: laundryDraftFromConfig(config),
  });
}

/** Clears laundry selections (e.g. after removing all laundry lines from the summary). */
export function clearLaundrySelectionsInDraft(): void {
  const defaults = getDefaultServicesDraft();
  mergeServicesDraft({ laundry: defaults.laundry });
}
