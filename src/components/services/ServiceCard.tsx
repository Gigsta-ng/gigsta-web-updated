import { CheckCircleIcon } from "@/assets/icons/svg";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types/service";
// import { NavLink } from "react-router-dom";

type Props = {
  service: Service;
};

const ServiceCard = ({ service }: Props) => {
  const primary = service.pricingGroups?.[0];
  const secondary = service.pricingGroups?.[1];

  const primaryPreview = primary?.prices?.slice(0, 4) ?? [];
  const secondaryPreview = secondary?.prices?.slice(0, 4) ?? [];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
    
        <div className="relative h-65 md:h-80 lg:h-85 rounded-2xl overflow-hidden shrink-0 group">
          <img
            src={service.heroImage}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
       
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    

      <div className="p-6 flex flex-col h-full">
        <h3 className="text-lg font-semibold mb-1 text-[#0D0F11]">
          {service.name}
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          {service.shortDescription}
        </p>

        {primary && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
           
              <CheckCircleIcon className="w-4 h-4 text-[#F0A500]" />
              <p className="font-medium text-sm text-[#0D0F11] ">
                {primary.title}
              </p>
            </div>

            <div className="space-y-1 text-sm text-gray-700 mb-3">
              {primaryPreview.map((p) => (
                <p key={p.label} className="mb-3">
                  {p.label}: <span className="font-medium">{p.amount}</span>
                </p>
              ))}
            </div>

            <ul className="text-xs text-gray-500 list-none space-y-1">
              {service.includes.slice(0, 6).map((item) => (
                <li key={item}>{item} </li>
              ))}
            </ul>
          </div>
        )}

        {secondary && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircleIcon className="w-4 h-4 text-[#F0A500]" />
              <p className="font-medium text-sm text-[#0D0F11]">
                {secondary.title}
              </p>
            </div>

            {secondary.description && (
              <p className="text-xs text-gray-500 mb-2">
                {secondary.description}
              </p>
            )}

            <div className="space-y-1 text-sm text-gray-700">
              {secondaryPreview.map((p) => (
                <p key={p.label} className="mb-3">
                  {p.label}: <span className="font-medium">{p.amount}</span>
                </p>
              ))}
            </div>

            {secondary.note && (
              <p className="mt-2 text-xs italic text-gray-500">
                Note: {secondary.note}
              </p>
            )}
          </div>
        )}

          <Button className="w-full bg-[#F0A500] hover:bg-[#d89400] text-white font-semibold mt-auto">
            Book Now →
          </Button>

      </div>
    </div>
  );
};

export default ServiceCard;
