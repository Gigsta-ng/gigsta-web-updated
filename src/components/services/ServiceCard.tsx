import type { Service } from "@/types/service";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
// import image3 from "../../assets/images/image3.jpg";
// import image4 from "../../assets/images/image4.jpg";

interface Props {
  service: Service;
}

const ServiceCard = ({ service }: Props ) => {
      const lite = service.pricing.lite;
      const standard = service.pricing.standard;
  return (
       <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="relative h-65 md:h-80 lg:h-85 rounded-2xl overflow-hidden">
            <img
              src={service.icon}
              alt="Professional cleaning service"
              className="w-full h-full object-cover" 
            />
</div>
 <div className="p-6">
        <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
        <p className="text-sm text-gray-600 mb-6">
          {service.description}
        </p>

        {/* One-time */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-[#F0A500]" />
            <p className="font-medium text-sm">{service.name}</p>
          </div>

          <p className="text-sm text-gray-700 mb-1">
            Starting from ₦{lite.basePrice.toLocaleString()}
          </p>
          <p>{lite.scope[0]} : {lite.amount[0]}</p>
          <p>{lite.scope[1]} : {lite.amount[1]}</p>

          <ul className="text-xs text-gray-500 list-disc pl-5 space-y-1">
            {lite.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Monthly */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-[#F0A500]" />
            <p className="font-medium text-sm">Monthly Cleaning Packages</p>
          </div>

          <p className="text-sm text-gray-700">
            From ₦{standard.basePrice.toLocaleString()} / month
          </p>
        </div>

        {/* CTA */}
        <Button className="w-full bg-[#F0A500] hover:bg-[#d89400] text-white font-semibold">
          Book Now →
        </Button>
      </div>
</div>
  )
}
export default ServiceCard
