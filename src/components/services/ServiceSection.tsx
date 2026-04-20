import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SERVICES } from "@/constants/services";
import type { Service } from "@/types/service";
import CleaningConfigurator from "@/components/services/CleaningConfigurator";
import LaundryConfigurator from "@/components/services/LaundryConfigurator";
import ServicesBookingBar from "@/components/services/ServicesBookingBar";
import {
  buildCleaningConfigurationFromDraft,
  buildLaundryConfigurationFromDraft,
} from "@/lib/buildBookingPayload";
import {
  getDefaultServicesDraft,
  loadServicesDraft,
  mergeServicesDraft,
} from "@/lib/servicesDraftStorage";

function tabFromUrlSearch(): "cleaning" | "laundry" | null {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search).get("tab");
  if (q === "cleaning" || q === "laundry") return q;
  return null;
}

const ServiceSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<"cleaning" | "laundry">(() => {
    return tabFromUrlSearch() ?? loadServicesDraft()?.activeTab ?? "cleaning";
  });
  const [fadeKey, setFadeKey] = useState(0);
  const [draftVersion, setDraftVersion] = useState(0);
  /** User must open a tab before its summary line appears; avoids showing laundry when booking cleaning-only (and vice versa). */
  const [visitedCleaning, setVisitedCleaning] = useState(() => {
    const fromUrl = tabFromUrlSearch();
    if (fromUrl === "cleaning") return true;
    if (fromUrl === "laundry") return false;
    const t = loadServicesDraft()?.activeTab ?? "cleaning";
    return t === "cleaning";
  });
  const [visitedLaundry, setVisitedLaundry] = useState(() => {
    const fromUrl = tabFromUrlSearch();
    if (fromUrl === "laundry") return true;
    if (fromUrl === "cleaning") return false;
    const t = loadServicesDraft()?.activeTab ?? "cleaning";
    return t === "laundry";
  });

  const onDraftPersist = useCallback(() => {
    setDraftVersion((v) => v + 1);
  }, []);

  /** Per-line prices + configurator subtotals only when both services are fully configured; otherwise total lives in the booking bar only. */
  const showPricingBreakdown = useMemo(() => {
    if (typeof window === "undefined") return false;
    if (!visitedCleaning || !visitedLaundry) return false;
    const d = loadServicesDraft() ?? getDefaultServicesDraft();
    return (
      buildCleaningConfigurationFromDraft(d.cleaning) !== null &&
      buildLaundryConfigurationFromDraft(d.laundry) !== null
    );
  }, [draftVersion, visitedCleaning, visitedLaundry]);

  const activeService: Service | undefined = SERVICES.find(
    (s) => s.id === activeTab
  );

  const handleTabChange = (tab: "cleaning" | "laundry") => {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });
    mergeServicesDraft({ activeTab: tab });
    if (tab === "cleaning") setVisitedCleaning(true);
    if (tab === "laundry") setVisitedLaundry(true);
    setFadeKey((prev) => prev + 1); // Trigger fade animation
  };

  /** Sync tab from URL when it changes without matching state (deep links, back/forward). */
  useEffect(() => {
    const q = searchParams.get("tab");
    if (q !== "cleaning" && q !== "laundry") return;
    if (q === activeTab) return;
    setActiveTab(q);
    mergeServicesDraft({ activeTab: q });
    if (q === "cleaning") setVisitedCleaning(true);
    if (q === "laundry") setVisitedLaundry(true);
    setFadeKey((prev) => prev + 1);
  }, [searchParams, activeTab]);

  return (
    <section className="bg-gray-50 py-16 md:py-20 min-h-screen w-full">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-[50px] font-bold text-[#0D0F11] leading-[1.2]">
            Our <span className="text-[#F0A500]">Services</span>
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col items-center mb-12">
          <p className="text-lg font-medium text-[#0D0F11] mb-4">
            What service are you looking for?
          </p>
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm">
            <button
              onClick={() => handleTabChange("cleaning")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "cleaning"
                  ? "bg-[#F0A500] text-[#0D0F11]"
                  : "bg-transparent text-gray-600 hover:text-[#0D0F11]"
              }`}
            >
              House Cleaning
            </button>
            <button
              onClick={() => handleTabChange("laundry")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "laundry"
                  ? "bg-[#F0A500] text-[#0D0F11]"
                  : "bg-transparent text-gray-600 hover:text-[#0D0F11]"
              }`}
            >
              Laundry
            </button>
          </div>
        </div>

        {/* Service Content with Fade Animation */}
        {activeService && (
          <>
          <div
            key={fadeKey}
            className="animate-fade-in"
          >
            {/* Hero Image and Heading */}
            <div className="mb-10">
              <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img
                  src={activeService.heroImage}
                  alt={activeService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                    {activeTab === "cleaning" ? "House Cleaning" : "Laundry"}
                  </h3>
                </div>
              </div>
            </div>

            {/* Service Description */}
            {activeService.description && (
              <div className="text-center mb-8">
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {activeService.description}
                </p>
              </div>
            )}

            {/* What's Included Section */}
            {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-2x  00 p-8 mb-12">
              <h3 className="text-xl lg:text-2xl font-bold text-[#0D0F11] mb-6">
                What's Included
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeService.includes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
            >
                    <CheckCircleIcon className="w-3 h-3 lg:w-5 lg:h-5 text-[#F0A500] mt-0.5 shrink-0" />
                    <span className="text-sm lg:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {activeTab === "cleaning" ? (
              <CleaningConfigurator
                onDraftPersist={onDraftPersist}
                showSubtotalFooter={showPricingBreakdown}
              />
            ) : (
              <LaundryConfigurator
                onDraftPersist={onDraftPersist}
                showSubtotalFooter={showPricingBreakdown}
              />
            )}
          </div>

          <ServicesBookingBar
            draftVersion={draftVersion}
            visitedCleaning={visitedCleaning}
            visitedLaundry={visitedLaundry}
            showLineAmounts={showPricingBreakdown}
          />
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ServiceSection;
