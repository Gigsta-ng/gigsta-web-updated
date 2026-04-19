import { useEffect, useMemo, useState } from "react";
import {
  LAUNDRY_CATALOG,
  LAUNDRY_EXPRESS_PREMIUM,
  LAUNDRY_TRANSPORT,
} from "@/constants/laundryCatalog";
import {
  computeLaundryTierTotals,
  computeLaundryWashAndIron,
  formatNgn,
} from "@/lib/laundryPricing";
import { cn } from "@/lib/utils";
import {
  createEmptyLaundryCart,
  loadServicesDraft,
  mergeServicesDraft,
} from "@/lib/servicesDraftStorage";
import type { ServiceTier } from "@/types/serviceConfiguration";

const LAUNDRY_TIER_COPY: Record<
  ServiceTier,
  { title: string; desc: string; features: string[] }
> = {
  lite: {
    title: "LITE (Wash & fold)",
    desc: "Just get it clean. We wash and fold neatly. No ironing included.",
    features: [
      "Machine wash & dry",
      "Neatly folded (no ironing)",
      "Doorstep pickup & delivery",
    ],
  },
  standard: {
    title: "STANDARD (Wash & iron)",
    desc: "Smart ironing applied. We wash, starch, and iron your wearables. Bedding is fold-only.",
    features: [
      "Everything in Lite",
      "Professional ironing for wearables",
      "Doorstep pickup & delivery",
    ],
  },
  pro: {
    title: "PRO (Express)",
    desc: "Priority batching and 24-hour turnaround.",
    features: [
      "Everything in Standard",
      "Stain pre-treatment",
      "24-hour express delivery",
    ],
  },
};

type LaundryConfiguratorProps = {
  onDraftPersist?: () => void;
};

const LaundryConfigurator = ({ onDraftPersist }: LaundryConfiguratorProps) => {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    if (typeof window === "undefined") return createEmptyLaundryCart();
    return loadServicesDraft()?.laundry?.cart ?? createEmptyLaundryCart();
  });
  const [tier, setTier] = useState<ServiceTier | null>(() => {
    if (typeof window === "undefined") return null;
    return loadServicesDraft()?.laundry?.tier ?? null;
  });

  useEffect(() => {
    mergeServicesDraft({
      laundry: { tier, cart },
    });
    onDraftPersist?.();
  }, [tier, cart, onDraftPersist]);

  const { washTotal, ironingTotal } = useMemo(
    () => computeLaundryWashAndIron(cart, LAUNDRY_CATALOG),
    [cart]
  );

  const tierPrices = useMemo(
    () => computeLaundryTierTotals(washTotal, ironingTotal),
    [washTotal, ironingTotal]
  );

  const totalPrice = tier !== null ? tierPrices[tier] : 0;
  const hasItems = washTotal > 0;

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      return { ...prev, [id]: next };
    });
  };

  const categoriesInOrder = useMemo(() => {
    const seen = new Set<string>();
    const order: string[] = [];
    for (const item of LAUNDRY_CATALOG) {
      if (!seen.has(item.category)) {
        seen.add(item.category);
        order.push(item.category);
      }
    }
    return order;
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 md:p-8 space-y-10">
        <div>
          <h3 className="text-lg font-bold text-[#0D0F11] mb-4">1. What are we washing?</h3>
          <div className="space-y-8">
            {categoriesInOrder.map((category) => {
              const items = LAUNDRY_CATALOG.filter((i) => i.category === category);
              const isBedding = category === "Home & Bedding";
              return (
                <div key={category}>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {category}
                    </span>
                    {isBedding && (
                      <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-semibold">
                        Auto fold-only
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map((item) => {
                      const qty = cart[item.id] ?? 0;
                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "flex justify-between items-center gap-3 border border-gray-200 rounded-xl p-4 bg-gray-50/80 transition",
                            qty > 0 && "border-[#F0A500] bg-amber-50/60"
                          )}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm text-[#0D0F11]">{item.name}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              Base: {formatNgn(item.base_price)}
                              {item.auto_iron ? (
                                <span> · Iron: +{formatNgn(item.iron_fee)}</span>
                              ) : (
                                <span className="text-emerald-700 font-medium">
                                  {" "}
                                  · Iron: N/A (fold only)
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1 shrink-0">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              className="w-8 h-8 rounded-md text-gray-600 hover:bg-gray-100 font-bold"
                              onClick={() => updateQty(item.id, -1)}
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-bold">{qty}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              className="w-8 h-8 rounded-md text-gray-600 hover:bg-gray-100 font-bold"
                              onClick={() => updateQty(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#0D0F11] mb-4">2. Choose your service level</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {(["lite", "standard", "pro"] as const).map((tid) => {
              const copy = LAUNDRY_TIER_COPY[tid];
              const price = tierPrices[tid];
              return (
                <button
                  key={tid}
                  type="button"
                  onClick={() => setTier(tid)}
                  disabled={!hasItems}
                  className={cn(
                    "text-left rounded-xl border p-6 transition-all relative flex flex-col",
                    !hasItems && "opacity-60 cursor-not-allowed",
                    tier === tid
                      ? "border-2 border-[#F0A500] bg-amber-50/80"
                      : "border border-gray-200 hover:border-gray-300"
                  )}
                >
                  {tid === "standard" && (
                    <span className="absolute -top-2.5 right-4 bg-[#F0A500] text-white text-[11px] font-bold px-2.5 py-0.5 rounded">
                      POPULAR
                    </span>
                  )}
                  <p className="text-sm font-extrabold text-[#0D0F11] uppercase mb-2">
                    {copy.title}
                  </p>
                  <p className="text-2xl font-extrabold text-[#0D0F11] mb-2">
                    {hasItems ? formatNgn(price) : formatNgn(0)}
                  </p>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">{copy.desc}</p>

                  {hasItems && (
                    <div className="bg-gray-100 rounded-lg p-3 text-xs space-y-1.5 mb-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Wash (base)</span>
                        <span>{formatNgn(washTotal)}</span>
                      </div>
                      {(tid === "standard" || tid === "pro") && (
                        <div className="flex justify-between text-[#F0A500] font-medium">
                          <span>Ironing surcharge</span>
                          <span>+ {formatNgn(ironingTotal)}</span>
                        </div>
                      )}
                      {tid === "lite" && (
                        <div className="flex justify-between text-gray-500">
                          <span>Ironing</span>
                          <span>₦0</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-600">
                        <span>Pickup & delivery</span>
                        <span>{formatNgn(LAUNDRY_TRANSPORT)}</span>
                      </div>
                      {tid === "pro" && (
                        <div className="flex justify-between text-red-600">
                          <span>24hr express</span>
                          <span>+ {formatNgn(LAUNDRY_EXPRESS_PREMIUM)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-[#0D0F11] pt-2 border-t border-dashed border-gray-300">
                        <span>Total</span>
                        <span>{formatNgn(price)}</span>
                      </div>
                    </div>
                  )}

                  <ul className="mt-auto space-y-2 text-xs text-gray-800 border-t border-gray-200 pt-4">
                    {copy.features.map((f) => (
                      <li key={f}>✓ {f}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 md:px-8">
        <p className="text-sm text-gray-600">
          Laundry subtotal (selected tier):{" "}
          <span className="font-bold text-[#0D0F11]">
            {hasItems && tier !== null ? formatNgn(totalPrice) : formatNgn(0)}
          </span>
          {hasItems && tier === null && (
            <span className="block text-amber-800 font-normal mt-1">
              Choose a service level to see your total.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default LaundryConfigurator;
