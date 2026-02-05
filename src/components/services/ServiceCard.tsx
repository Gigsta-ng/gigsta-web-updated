import { CheckCircleIcon } from "@/assets/icons/svg";
import { Button } from "@/components/ui/button";
import type { PricingGroup } from "@/types/service";

type Props = {
  pricingGroup: PricingGroup;
};

const ServiceCard = ({ pricingGroup }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="p-6 flex flex-col h-full">
        {/* Title with Check Icon */}
        <div className="flex items-center gap-2 mb-3">
          <CheckCircleIcon className="w-5 h-5 text-[#F0A500] shrink-0" />
          <h3 className="text-xl font-bold text-[#0D0F11]">
            {pricingGroup.title}
          </h3>
        </div>

        {/* Description */}
        {pricingGroup.description && (
          <p className="text-sm text-gray-600 mb-6">
            {pricingGroup.description}
          </p>
        )}

        {/* Pricing Breakdown */}
        <div className="space-y-4 mb-6 grow">
          {pricingGroup.prices.map((price, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-[#F0A500] transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">{price.label}</span>
                <span className="font-bold text-[#0D0F11] text-lg">
                  {price.amount}
                </span>
              </div>
              <Button className="w-full bg-[#F0A500] hover:bg-[#d89400] text-white font-semibold py-3 text-sm cursor-pointer transition-all duration-300 hover:shadow-md">
                Book Now →
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        {pricingGroup.note && (
          <p className="text-xs italic text-gray-500 mb-6 bg-gray-50 p-3 rounded-md">
            <span className="font-medium">Note:</span> {pricingGroup.note}
          </p>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
