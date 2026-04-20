import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

type ServicesBookingBarProps = {
  draftVersion: number;
  /** User opened the House Cleaning tab at least once (or landed on it). */
  visitedCleaning: boolean;
  /** User opened the Laundry tab at least once (or landed on it). */
  visitedLaundry: boolean;
  /**
   * When true, summary rows show per-service amounts (both services must be configured).
   * Otherwise amounts appear only in the Selected total card.
   */
  showLineAmounts: boolean;
};

const ServicesBookingBar = ({
  draftVersion,
  visitedCleaning,
  visitedLaundry,
  showLineAmounts,
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

  const hasLaundryItems = Object.values(draft.laundry.cart).some((q) => q > 0);
  const laundryNeedsTier = hasLaundryItems && draft.laundry.tier === null;

  const combinedTotal =
    (visitedCleaning && cleaningReady ? cleaningEstimate : 0) +
    (visitedLaundry && laundryReady ? laundryEstimate : 0);

  const onlyCleaning = visitedCleaning && !visitedLaundry;
  const onlyLaundry = !visitedCleaning && visitedLaundry;
  const bothServices = visitedCleaning && visitedLaundry;

  /** Single-tab flows need that service ready; if both tabs were opened, either completed service is enough to continue. */
  const canContinue =
    (visitedCleaning || visitedLaundry) &&
    (onlyCleaning
      ? cleaningReady
      : onlyLaundry
        ? laundryReady
        : cleaningReady || laundryReady);

  const continueToForm = () => {
    const d = loadServicesDraft() ?? getDefaultServicesDraft();
    const cleaning = buildCleaningConfigurationFromDraft(d.cleaning);
    const laundry = buildLaundryConfigurationFromDraft(d.laundry);

    if (!visitedCleaning && !visitedLaundry) {
      toast.error("Choose a service tab above to build your booking.");
      return;
    }

    if (onlyCleaning) {
      if (!cleaning) {
        toast.error("Choose a space size and cleaning tier to continue.");
        return;
      }
      navigate("/request-service", { state: { configuration: cleaning } });
      return;
    }

    if (onlyLaundry) {
      if (!laundry) {
        const hasItems = Object.values(d.laundry.cart).some((q) => q > 0);
        toast.error(
          hasItems && d.laundry.tier === null
            ? "Choose a laundry service level to continue."
            : "Add laundry items to your cart to continue."
        );
        return;
      }
      navigate("/request-service", { state: { configuration: laundry } });
      return;
    }

    if (bothServices) {
      if (cleaning && laundry) {
        navigate("/request-service", {
          state: { configuration: { cleaning, laundry } },
        });
        return;
      }
      if (cleaning) {
        navigate("/request-service", { state: { configuration: cleaning } });
        return;
      }
      if (laundry) {
        navigate("/request-service", { state: { configuration: laundry } });
        return;
      }
      toast.error("Complete selections for at least one service to continue.");
    }
  };

  if (!visitedCleaning && !visitedLaundry) {
    return null;
  }

  /** Hide the two-line Summary until both services are fully configured (same as per-line pricing). */
  const showSummarySection = showLineAmounts;

  return (
    <div
      key={draftVersion}
      className="mt-10 rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
    >
      {showSummarySection && (
        <div className="bg-white p-6 md:p-8 space-y-4">
          <h3 className="text-lg font-bold text-[#0D0F11]">Summary</h3>

          <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-gray-50/50">
            {visitedCleaning && (
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="font-semibold text-[#0D0F11]">House cleaning</span>
                <div className="text-sm sm:text-right">
                  {cleaningReady ? (
                    showLineAmounts ? (
                      <span className="font-semibold tabular-nums text-[#0D0F11]">
                        {formatNgn(cleaningEstimate)}
                      </span>
                    ) : (
                      <span className="text-gray-600">Ready</span>
                    )
                  ) : (
                    <span className="text-amber-800">
                      Select space size and tier in the tab above
                    </span>
                  )}
                </div>
              </div>
            )}

            {visitedLaundry && (
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="font-semibold text-[#0D0F11]">Laundry</span>
                <div className="text-sm sm:text-right">
                  {laundryReady ? (
                    showLineAmounts ? (
                      <span className="font-semibold tabular-nums text-[#0D0F11]">
                        {formatNgn(laundryEstimate)}
                      </span>
                    ) : (
                      <span className="text-gray-600">Ready</span>
                    )
                  ) : laundryNeedsTier ? (
                    <span className="text-amber-800">
                      Choose a laundry service level in the tab above
                    </span>
                  ) : (
                    <span className="text-amber-800">
                      Add items in the laundry tab above
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className={
          showSummarySection
            ? "bg-[#0D0F11] text-white px-6 py-5 md:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-gray-800"
            : "bg-[#0D0F11] text-white px-6 py-5 md:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
        }
      >
        <div>
          <p className="text-gray-400 text-sm mb-1">Selected total</p>
          <p className="text-3xl font-bold tabular-nums">{formatNgn(combinedTotal)}</p>
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
