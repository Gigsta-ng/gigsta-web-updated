import { Button } from "../ui/button";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import { MoveRight } from "lucide-react";
const Services = () => {

  return (
    // <section
    //   className="w-full min-h-screen py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-17.5"
     
    // >
    //   <div className="max-w-7xl mx-auto">
  //   <section className="py-20  min-h-screen w-full">
  // <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <section className="py-20 md:py-20 min-h-screen w-full flex items-center">
  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl  md:text-[50px] font-bold text-[#0D0F11] leading-[1.2] ">
            Our Services
          </h2>

          <p className="mt-4.5 text-[#0D0F11] mx-auto font-medium text-lg md:text-xl leading-relaxed">
            Professional home services tailored to your needs. All providers are
            verified, insured, and committed to delivering exceptional quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 
          <div className="relative h-65 md:h-80 lg:h-85 rounded-2xl overflow-hidden">
            <img
              src={image4}
              alt="Professional cleaning service"
              className="absolute inset-0 w-full h-full object-cover" 
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Cleaning</h3>
              <p className="text-sm text-white/90 max-w-xs">
                Trusted cleaners for one time or recurring home cleaning.
              </p>
              <Button className="mt-2 border-none text-white  text-base font-semibold w-max p-0">
                Explore  <MoveRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative  h-65 md:h-80 lg:h-85 rounded-2xl overflow-hidden">
            <img
              src={image3}
              alt="Professional cooking service"
              className="absolute inset-0 w-full h-full object-cover"
            />


            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Cooking</h3>
              <p className="text-sm text-white/90 max-w-xs">
                Reliable home cooks for daily or scheduled meal preparation.
              </p>
              <Button className="mt-2 border-none text-white font-semibold  text-base w-max p-0">
                Explore  <MoveRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
