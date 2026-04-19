import { useCallback, useState } from "react";
import { SERVICES } from "@/constants/services";
import type { Service } from "@/types/service";
import CleaningConfigurator from "@/components/services/CleaningConfigurator";
import LaundryConfigurator from "@/components/services/LaundryConfigurator";
import ServicesBookingBar from "@/components/services/ServicesBookingBar";
import { loadServicesDraft, mergeServicesDraft } from "@/lib/servicesDraftStorage";

const ServiceSection = () => {
  const [activeTab, setActiveTab] = useState<"cleaning" | "laundry">(() => {
    if (typeof window === "undefined") return "cleaning";
    return loadServicesDraft()?.activeTab ?? "cleaning";
  });
  const [fadeKey, setFadeKey] = useState(0);
  const [draftVersion, setDraftVersion] = useState(0);
  const [includeCleaning, setIncludeCleaning] = useState(true);
  const [includeLaundry, setIncludeLaundry] = useState(true);
  /** User must open a tab before its "include" row appears; avoids showing laundry when booking cleaning-only (and vice versa). */
  const [visitedCleaning, setVisitedCleaning] = useState(
    () => activeTab === "cleaning"
  );
  const [visitedLaundry, setVisitedLaundry] = useState(
    () => activeTab === "laundry"
  );

  const onDraftPersist = useCallback(() => {
    setDraftVersion((v) => v + 1);
  }, []);

  const activeService: Service | undefined = SERVICES.find(
    (s) => s.id === activeTab
  );

  const handleTabChange = (tab: "cleaning" | "laundry") => {
    setActiveTab(tab);
    mergeServicesDraft({ activeTab: tab });
    if (tab === "cleaning") setVisitedCleaning(true);
    if (tab === "laundry") setVisitedLaundry(true);
    setFadeKey((prev) => prev + 1); // Trigger fade animation
  };

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
                  <p className="text-base md:text-lg text-white/90 font-medium">
                    Configure your service below, then continue to the request form with your live quote.
                  </p>
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
              <CleaningConfigurator onDraftPersist={onDraftPersist} />
            ) : (
              <LaundryConfigurator onDraftPersist={onDraftPersist} />
            )}
          </div>

          <ServicesBookingBar
            draftVersion={draftVersion}
            visitedCleaning={visitedCleaning}
            visitedLaundry={visitedLaundry}
            includeCleaning={includeCleaning}
            includeLaundry={includeLaundry}
            onIncludeCleaningChange={setIncludeCleaning}
            onIncludeLaundryChange={setIncludeLaundry}
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
