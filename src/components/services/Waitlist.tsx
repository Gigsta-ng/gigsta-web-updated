import { NavLink } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Waitlist = () => {
  return (
    <section className="bg-[#F0A500] w-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      
        <div className="text-center mb-14">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl mb-14 font-bold leading-[1.2] text-[#0D0F11]">
            Don't See What You Need?
          </h2>
          <p className="mt-4.5  mx-auto font-medium max-w-2xl  text-lg md:text-xl leading-relaxed text-[#0D0F11]">
            We're constantly adding new services. Join our waitlist to be
            notified when we expand our offerings.
          </p>
        </div>
        <div className="text-center mt-8">
          <Button className="shadow-[0_4px_4px_4px_rgba(0,0,0,0.15)] cursor-pointer  bg-[#0D0F11] inline-flex items-center gap-2 text-white font-semibold text-base hover:gap-3 transition-all duration-300">
            <NavLink to="/waitlist">
              {" "}
              <div className="flex gap-1 items-center">
                {" "}
                Join the Waitlist <MoveRight className="h-4 w-4 " />{" "}
              </div>
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
