import { SERVICES } from "@/constants/services";
import ServiceCard from "./ServiceCard";

const ServiceSection = () => {
  return (
       <section className="bg-gray-50 py-16 md:py-16 min-h-screen w-full flex items-center">
  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl  md:text-[50px] font-bold text-[#0D0F11] leading-[1.2] ">
            Our <span className="text-[#F0A500]">Services</span>
          </h2>

          <p className="mt-4.5 text-[#0D0F11] mx-auto font-medium max-w-2xl text-lg md:text-xl leading-relaxed">
            Professional home services tailored to your needs. All providers are
            verified, insured, and committed to delivering exceptional quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
      {SERVICES.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    
 </div>
 </div>
 </section>
    
  )
}

export default ServiceSection
