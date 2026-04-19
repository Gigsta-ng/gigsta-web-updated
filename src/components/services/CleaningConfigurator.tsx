import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CLEANING_ADDONS,
  CLEANING_SPACE_OPTIONS,
  CLEANING_TIERS,
} from "@/constants/cleaningConfigurator";
import { cn } from "@/lib/utils";
import { formatNgn } from "@/lib/laundryPricing";
import { mergeServicesDraft, loadServicesDraft } from "@/lib/servicesDraftStorage";
import type {
  CleaningAddonId,
  CleaningSpaceSize,
  ServiceTier,
} from "@/types/serviceConfiguration";

const defaultAddons: Record<CleaningAddonId, boolean> = {
  fridge: false,
  dishes: false,
  windows: false,
  clothes_basket: false,
};

type CleaningConfiguratorProps = {
  onDraftPersist?: () => void;
};

const CleaningConfigurator = ({ onDraftPersist }: CleaningConfiguratorProps) => {
  const [spaceSize, setSpaceSize] = useState<CleaningSpaceSize | null>(() => {
    if (typeof window === "undefined") return null;
    return loadServicesDraft()?.cleaning?.spaceSize ?? null;
  });
  const [tier, setTier] = useState<ServiceTier | null>(() => {
    if (typeof window === "undefined") return null;
    return loadServicesDraft()?.cleaning?.tier ?? null;
  });
  const [addons, setAddons] = useState<Record<CleaningAddonId, boolean>>(() => {
    if (typeof window === "undefined") return { ...defaultAddons };
    return loadServicesDraft()?.cleaning?.addons ?? { ...defaultAddons };
  });

  useEffect(() => {
    mergeServicesDraft({
      cleaning: { spaceSize, tier, addons },
    });
    onDraftPersist?.();
  }, [spaceSize, tier, addons, onDraftPersist]);

  const basePrice = useMemo(
    () => CLEANING_TIERS.find((t) => t.id === tier)?.price ?? 0,
    [tier]
  );

  const addonTotal = useMemo(() => {
    return CLEANING_ADDONS.filter((a) => addons[a.id]).reduce((s, a) => s + a.price, 0);
  }, [addons]);

  const totalPrice = tier !== null ? basePrice + addonTotal : 0;

  const toggleAddon = (id: CleaningAddonId, checked: boolean) => {
    setAddons((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 md:p-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-[#0D0F11] mb-4">
            1. What size is your space?
          </h3>
          <div className="flex flex-wrap gap-3">
            {CLEANING_SPACE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSpaceSize(opt.id)}
                className={cn(
                  "px-6 py-2 rounded-full border font-medium transition-all",
                  spaceSize === opt.id
                    ? "border-2 border-[#F0A500] bg-amber-50 text-[#0D0F11] font-bold"
                    : "border border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-900"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Space size helps us plan staffing; your quote below is based on tier and add-ons.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#0D0F11] mb-4">2. Choose your tier</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLEANING_TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                className={cn(
                  "text-left rounded-xl p-6 border transition-all hover:-translate-y-0.5 hover:shadow-md relative",
                  tier === t.id
                    ? "border-2 border-[#F0A500] bg-amber-50"
                    : "border border-gray-200 bg-white"
                )}
              >
                {t.badge && (
                  <span className="absolute top-0 right-0 bg-[#F0A500] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    {t.badge}
                  </span>
                )}
                <h4 className="text-lg font-bold text-gray-900">{t.name}</h4>
                <p className="mt-2 text-3xl font-extrabold text-[#0D0F11]">
                  {formatNgn(t.price)}
                </p>
                <p className="text-sm text-gray-600 mt-2 border-b border-gray-100 pb-4">
                  {t.tagline}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {t.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#0D0F11] mb-2">3. Customize (add-ons)</h3>
          <p className="text-sm text-gray-500 mb-4">
            Select extra services to build your package.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CLEANING_ADDONS.map((a) => (
              <label
                key={a.id}
                className={cn(
                  "flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition",
                  addons[a.id] && "border-[#F0A500] bg-amber-50/50"
                )}
              >
                <Checkbox
                  checked={addons[a.id]}
                  onCheckedChange={(v) => toggleAddon(a.id, v === true)}
                  className="border-gray-400 data-[state=checked]:bg-[#F0A500] data-[state=checked]:border-[#F0A500]"
                />
                <div className="flex-1 min-w-0">
                  <span className="block font-medium text-[#0D0F11]">{a.label}</span>
                  <span className="block text-sm text-gray-500">+{formatNgn(a.price)}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 md:px-8">
        <p className="text-sm text-gray-600">
          Cleaning subtotal (tier + add-ons):{" "}
          <span className="font-bold text-[#0D0F11]">
            {spaceSize !== null && tier !== null ? formatNgn(totalPrice) : formatNgn(0)}
          </span>
          {(spaceSize === null || tier === null) && (
            <span className="block text-amber-800 font-normal mt-1">
              Select a space size and tier to see your quote.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default CleaningConfigurator;
