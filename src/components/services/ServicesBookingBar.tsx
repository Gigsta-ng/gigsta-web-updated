import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  buildCleaningConfigurationFromDraft,
  buildLaundryConfigurationFromDraft,
} from "@/lib/buildBookingPayload";
import { formatNgn } from "@/lib/laundryPricing";
import {
  getDefaultServicesDraft,
  loadServicesDraft,
} from "@/lib/servicesDraftStorage";
import { cn } from "@/lib/utils";
import type { BookingNavigateConfiguration } from "@/types/serviceConfiguration";

type ServicesBookingBarProps = {
  draftVersion: number;
  /** User opened the House Cleaning tab at least once (or landed on it). */
  visitedCleaning: boolean;
  /** User opened the Laundry tab at least once (or landed on it). */
  visitedLaundry: boolean;
  includeCleaning: boolean;
  includeLaundry: boolean;
  onIncludeCleaningChange: (value: boolean) => void;
  onIncludeLaundryChange: (value: boolean) => void;
};

const ServicesBookingBar = ({
  draftVersion,
  visitedCleaning,
  visitedLaundry,
  includeCleaning,
  includeLaundry,
  onIncludeCleaningChange,
  onIncludeLaundryChange,
}: ServicesBookingBarProps) => {
  const navigate = useNavigate();

  const draft =
    typeof window !== "undefined"
      ? loadServicesDraft() ?? getDefaultServicesDraft()
      : getDefaultServicesDraft();

  const cleaningPayload = buildCleaningConfigurationFromDraft(draft.cleaning);
  const laundryPayload = buildLaundryConfigurationFromDraft(draft.laundry);
  const laundryReady = laundryPayload !== null;
  const cleaningReady = cleaningPayload !== null;

  const cleaningEstimate = cleaningPayload?.totalPrice ?? 0;
  const laundryEstimate = laundryPayload?.totalPrice ?? 0;

  const effectiveIncludeCleaning = visitedCleaning && includeCleaning;
  const effectiveIncludeLaundry = visitedLaundry && includeLaundry;

  const hasLaundryItems = Object.values(draft.laundry.cart).some((q) => q > 0);
  const laundryNeedsTier = hasLaundryItems && draft.laundry.tier === null;

  const combinedTotal =
    (effectiveIncludeCleaning ? cleaningEstimate : 0) +
    (effectiveIncludeLaundry && laundryReady ? laundryEstimate : 0);

  const canContinue =
    (effectiveIncludeCleaning || effectiveIncludeLaundry) &&
    (!effectiveIncludeCleaning || cleaningReady) &&
    (!effectiveIncludeLaundry || laundryReady);

  const continueToForm = () => {
    const d = loadServicesDraft() ?? getDefaultServicesDraft();
    const cleaning = buildCleaningConfigurationFromDraft(d.cleaning);
    const laundry = buildLaundryConfigurationFromDraft(d.laundry);

    if (!effectiveIncludeCleaning && !effectiveIncludeLaundry) {
      toast.error("Select at least one service to include.");
      return;
    }
    if (effectiveIncludeCleaning && !cleaning) {
      toast.error("Choose a space size and cleaning tier to continue.");
      return;
    }
    if (effectiveIncludeLaundry && !laundry) {
      const hasItems = Object.values(d.laundry.cart).some((q) => q > 0);
      toast.error(
        hasItems && d.laundry.tier === null
          ? "Choose a laundry service level to continue."
          : "Add laundry items or uncheck laundry to continue."
      );
      return;
    }

    let configuration: BookingNavigateConfiguration;

    if (effectiveIncludeCleaning && effectiveIncludeLaundry && laundry && cleaning) {
      configuration = { cleaning, laundry };
    } else if (effectiveIncludeCleaning && !effectiveIncludeLaundry && cleaning) {
      configuration = cleaning;
    } else if (!effectiveIncludeCleaning && effectiveIncludeLaundry && laundry) {
      configuration = laundry;
    } else {
      toast.error("Unable to build your booking. Check your selections.");
      return;
    }

    navigate("/request-service", { state: { configuration } });
  };

  return (
    <div
      key={draftVersion}
      className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="p-6 md:p-8 space-y-6">
        <h3 className="text-lg font-bold text-[#0D0F11]">Your booking</h3>

        <div className="space-y-4">
          {visitedCleaning && (
            <label
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition",
                includeCleaning
                  ? "border-[#F0A500] bg-amber-50/60"
                  : "border-gray-200 hover:bg-gray-50"
              )}
            >
              <Checkbox
                checked={includeCleaning}
                onCheckedChange={(v) => onIncludeCleaningChange(v === true)}
                className="mt-0.5 border-gray-400 data-[state=checked]:bg-[#F0A500] data-[state=checked]:border-[#F0A500]"
              />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-[#0D0F11]">
                  Include house cleaning
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {cleaningReady ? (
                    <>
                      Estimated from your tier & add-ons:{" "}
                      <span className="font-semibold text-[#0D0F11]">
                        {formatNgn(cleaningEstimate)}
                      </span>
                    </>
                  ) : (
                    <span className="text-amber-800">
                      Select a space size and tier in the tab above.
                    </span>
                  )}
                </p>
              </div>
            </label>
          )}

          {visitedLaundry && (
            <label
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition",
                includeLaundry
                  ? "border-[#F0A500] bg-amber-50/60"
                  : "border-gray-200 hover:bg-gray-50",
                includeLaundry && !laundryReady && "border-amber-300 bg-amber-50/30"
              )}
            >
              <Checkbox
                checked={includeLaundry}
                onCheckedChange={(v) => onIncludeLaundryChange(v === true)}
                className="mt-0.5 border-gray-400 data-[state=checked]:bg-[#F0A500] data-[state=checked]:border-[#F0A500]"
              />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-[#0D0F11]">
                  Include laundry
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {laundryReady ? (
                    <>
                      Estimated from your cart & tier:{" "}
                      <span className="font-semibold text-[#0D0F11]">
                        {formatNgn(laundryEstimate)}
                      </span>
                    </>
                  ) : laundryNeedsTier ? (
                    <span className="text-amber-800">
                      Choose a laundry service level in the tab above, or uncheck
                      this option.
                    </span>
                  ) : (
                    <span className="text-amber-800">
                      Add items in the laundry tab above, or uncheck this option.
                    </span>
                  )}
                </p>
              </div>
            </label>
          )}
        </div>
      </div>

      <div className="bg-[#0D0F11] text-white px-6 py-5 md:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-gray-800">
        <div>
          <p className="text-gray-400 text-sm mb-1">Selected total</p>
          <p className="text-3xl font-bold">{formatNgn(combinedTotal)}</p>
        </div>
        <Button
          type="button"
          disabled={!canContinue}
          onClick={continueToForm}
          className="h-12 px-8 bg-[#F0A500] hover:bg-[#d89400] text-[#0D0F11] font-bold text-base disabled:opacity-50"
        >
          Continue to request form
        </Button>
      </div>
    </div>
  );
};

export default ServicesBookingBar;
