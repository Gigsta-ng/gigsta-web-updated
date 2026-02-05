import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SERVICES } from "@/constants/services";
import { CheckCircleIcon } from "@/assets/icons/svg";
import type { Service } from "@/types/service";

const ServiceSection = () => {
  const [activeTab, setActiveTab] = useState<"cleaning" | "cooking">("cleaning");
  const [fadeKey, setFadeKey] = useState(0);

  const activeService: Service | undefined = SERVICES.find(
    (s) => s.id === activeTab
  );

  const handleTabChange = (tab: "cleaning" | "cooking") => {
    setActiveTab(tab);
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
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => handleTabChange("cleaning")}
              className={`px-4 lg:px-8 py-3 rounded-md font-semibold text-sm lg:text-base transition-all duration-300 ${
                activeTab === "cleaning"
                  ? "bg-[#F0A500] text-white shadow-md"
                  : "text-gray-700 hover:text-[#F0A500]"
              }`}
            >
              House Cleaning
            </button>
            <button
              onClick={() => handleTabChange("cooking")}
              className={`px-4 lg:px-8 py-3 rounded-md font-semibold text-sm lg:text-base transition-all duration-300 ${
                activeTab === "cooking"
                  ? "bg-[#F0A500] text-white shadow-md"
                  : "text-gray-700 hover:text-[#F0A500]"
              }`}
            >
              Home Cooking
            </button>
          </div>
        </div>

        {/* Service Content with Fade Animation */}
        {activeService && (
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
                    {activeTab === "cleaning" ? "House Cleaning" : "Home Cooking"}
                  </h3>
                  <p className="text-base md:text-lg text-white/90 font-medium">
                    Select from our variety of packages below to book your service
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
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
            </div>

            {/* Pricing Sections */}
            <div className="space-y-12">
              {activeService.pricingGroups.map((pricingGroup, groupIndex) => (
                <div key={groupIndex} className="space-y-6">
                  {/* Pricing Group Header */}
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-[#0D0F11]">
                      {pricingGroup.title}
                    </h3>
                    {pricingGroup.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {pricingGroup.description}
                      </p>
                    )}
                  </div>

                  {/* Individual Price Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pricingGroup.prices.map((price, priceIndex) => (
                      <NavLink
                        key={priceIndex}
                        to={`/request-service?service=${activeService.id}&pricingGroup=${encodeURIComponent(pricingGroup.title)}&package=${encodeURIComponent(price.label)}`}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col hover:bg-[#F0A500] hover:shadow-md hover:border-[#F0A500] transition-all duration-300 cursor-pointer group"
                      >
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-600 group-hover:text-white mb-2 transition-colors duration-300">
                            {price.label}
                          </p>
                          <p className="text-xl font-normal text-[#0D0F11] group-hover:text-white transition-colors duration-300">
                            {price.amount}
                          </p>
                        </div>
                        <div className="mt-auto">
                          <span className="text-[#F0A500] font-semibold text-sm hover:underline group-hover:text-black transition-colors duration-300">
                            Book Now →
                          </span>
                        </div>
                      </NavLink>
                    ))}
                  </div>

                  {/* Note */}
                  {pricingGroup.note && (
                    <p className="text-xs italic text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <span className="font-medium">Note:</span> {pricingGroup.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
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
