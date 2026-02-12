import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import { MoveRight } from "lucide-react";
import { AnimatedSection, AnimatedChild } from "../AnimatedSection";
const Services = () => {
  return (
    <section className="py-20 md:py-20 min-h-screen w-full flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="slideDown" delay={100}>
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl  md:text-[50px] font-bold text-[#0D0F11] leading-[1.2] ">
              Our Services
            </h2>

            <p className="mt-4.5 text-[#0D0F11] mx-auto max-w-2xl  font-medium text-lg md:text-xl leading-relaxed">
              Professional home services tailored to your needs. All providers are
              verified, insured, and committed to delivering exceptional quality.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedChild animationType="slideRight" index={0} delay={200}>
            <NavLink to="/services"  className="group block">
              <div className="relative h-65 md:h-80 lg:h-85 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
             
                <img
                  src={image4}
                  alt="Professional cleaning service"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

             
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent 
                      transition-opacity duration-500 group-hover:opacity-90"
                />

                <div className="relative z-10 h-full flex flex-col items-start justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Cleaning</h3>

                  <p className="text-sm text-white/90 max-w-xs">
                    Trusted cleaners for one time or recurring House Cleaning.
                  </p>

                  <div className="mt-2 inline-flex items-center gap-2 text-white text-base font-semibold hover:text-[#F0A500]">
                    Explore
                    <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 " />
                  </div>
                </div>
              </div>
            </NavLink>
          </AnimatedChild>

          <AnimatedChild animationType="slideLeft" index={1} delay={200}>
            <NavLink to="/services" className="group block">
              <div className="relative h-65 md:h-80 lg:h-85 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
               
                <img
                  src={image3}
                  alt="Professional cleaning service"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

           
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent 
                      transition-opacity duration-500 group-hover:opacity-90"
                />

                <div className="relative z-10 h-full flex flex-col items-start justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Cooking</h3>

                  <p className="text-sm text-white/90 max-w-xs">
                    Reliable home cooks for daily or scheduled meal preparation.
                  </p>

                  <div className="mt-2 inline-flex items-center gap-2 text-white text-base font-semibold hover:text-[#F0A500]">
                    Explore
                    <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </NavLink>
          </AnimatedChild>
        </div>

          <AnimatedSection animationType="slideUp" delay={400}>
            <div className="text-center mt-8 md:mt-12">
              <Button className="shadow-[0_4px_4px_4px_rgba(0,0,0,0.15)] cursor-pointer  bg-[#F0A500] inline-flex items-center gap-2 text-white font-semibold text-base hover:gap-3 transition-all duration-300">
                <NavLink to="/services" >
                  <div className="flex gap-1 items-center"> Request a Service  <MoveRight className="h-4 w-4" /></div>
                </NavLink> 
              </Button>
            </div>
          </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
