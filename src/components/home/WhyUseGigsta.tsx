import { ShieldCheck, Ban, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AnimatedSection, AnimatedChild } from "../AnimatedSection";

const HowGigstaWorks = () => {
  const steps = [
    {
      id: "01",
      icon: ShieldCheck,
      title: "Only Verified Cleaners with Real Reviews",
      description:
        "Every provider on Gigsta is background-checked, vetted, and reviewed by real customers, so you know exactly who's coming to your home.",
    },
    {
      id: "02",
      icon: Ban,
      title: "No More Trial & Error with Random Vendors",
      description:
        "Stop taking chances on unverified strangers. Gigsta gives you reliable professionals with a proven track record, every single time.",
    },
    {
      id: "03",
      icon: Zap,
      title: "Get Matched in Minutes",
      description:
        "Tell us what you need and we'll connect you with the right provider fast, no back-and-forth, no waiting around.",
    },
  ];

  return (
    <section className="min-h-screen w-full bg-[#F0A500] flex items-center py-20 md:py-20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="slideDown" delay={100}>
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl md:text-[50px] font-bold leading-[1.2] text-[#0D0F11]">
              {" "}
              Why Use Gigsta?
            </h2>
            <p className="mt-4.5  mx-auto font-medium max-w-2xl  text-lg md:text-xl leading-relaxed text-[#0D0F11]">
              {" "}
              Finding trustworthy home service providers in Uyo just got a whole
              lot easier.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {steps.map((step, index) => (
            <AnimatedChild
              key={step.id}
              animationType="scale"
              index={index}
              delay={200}
            >
              <div className="flex flex-col items-center text-center h-full bg-white/40 rounded-xl px-8 pt-10">
                <step.icon className="w-10 h-10 text-[#0D0F11] mb-6" />
                <p className="font-semibold text-xl mb-2 text-[#0D0F11]">
                  {step.title}
                </p>
                <p className="text-[#0D0F11] mb-6">{step.description}</p>
                <div className="text-[#0D0F11] font-bold text-xl bg-[#F0A500] mt-auto py-4.5 px-5.5 rounded-tl-[48px] rounded-tr-[48px]">
                  <p>{step.id}</p>
                </div>
              </div>
            </AnimatedChild>
          ))}
        </div>

        <AnimatedSection animationType="slideUp" delay={500}>
          <div className="text-center mt-8 md:mt-12">
            <Button className="shadow-[0_4px_4px_4px_rgba(0,0,0,0.15)] cursor-pointer inline-flex items-center gap-2 font-semibold text-base bg-[#0D0F11] text-white hover:gap-3 transition-all duration-300">
              <NavLink to="/services">
                <div className="flex gap-1 items-center">
                  Request a Service <MoveRight className="h-4 w-4" />
                </div>
              </NavLink>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HowGigstaWorks;
