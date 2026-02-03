import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";

const HeroSection = () => {
  return (
    
      <section className="relative min-h-screen w-full flex items-center">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero1.jpg"
      >
        <source src="/videos/hero-video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 ">
        <div className="flex flex-col gap-5.5">
          <div>
            <h1 className="font-bold text-4xl sm:text-5xl md:text-[60px] leading-[1.2] tracking-normal mb-4 md:mb-3 lg:mb-0 text-white">
              Need Help? Got Skills?
            </h1>
            <h1 className="font-bold text-4xl sm:text-5xl md:text-[60px] leading-[1.2] tracking-normal text-[#F0A500] ">
              Gigsta gets you Connected
            </h1>
          </div>
          <p className="font-light sm:font-medium text-lg sm:text-xl md:text-[20px] leading-[1.6] tracking-normal text-white md:w-[60%] w-full">
            Gigsta connects people in Uyo to trusted service providers for
            cleaning and cooking. If you’re a service provider, we help you get
            real job requests and earn more.
          </p>
        </div>

        <div className="flex flex-col mt-10 gap-4 w-full sm:flex-row sm:items-center sm:w-auto">
          <Button className="w-full sm:w-auto bg-[#F0A500] hover:bg-yellow-600 text-white font-semibold text-base py-5 px-6 rounded-lg cursor-pointer "> 

             <NavLink to="/request-service"> <div className="flex gap-1 items-center">  Request a Service <MoveRight className="h-4 w-4 " /> </div></NavLink> 
          </Button>

          <Button className="w-full sm:w-auto bg-white hover:bg-gray-100  text-black font-semibold text-base py-5 px-6 rounded-lg transition-colors cursor-pointer">
            Get Job Leads
          </Button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HeroSection;
