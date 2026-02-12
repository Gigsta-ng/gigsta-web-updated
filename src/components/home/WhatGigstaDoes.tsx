import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import { AnimatedSection, AnimatedChild } from "../AnimatedSection";

import { HandshakeIcon,  VerifiedIcon,  IconBadge, ChatBubbleIcon, BullsEyeIcon,  } from "@/assets/icons/svg";
import type { ComponentType, SVGProps } from "react";

type CardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
};
const Card = ({ icon: Icon, title, text }: CardProps) => (
  <div className="bg-white rounded-tl-[70px] rounded-br-[70px] shadow-sm p-6 flex flex-col gap-3 group transition-all duration-300 ease-out
      hover:bg-[#F0A500]">
    <div className="">
      <Icon className="w-12 h-12   text-[#F0A500]
        transition-colors duration-300
        group-hover:text-white"/>

    </div>

    <h3 className="font-semibold text-gray-900 text-base   transition-colors duration-300
        group-hover:text-white ">
      {title}
    </h3>

    <p className="text-sm text-gray-600 leading-relaxed         transition-colors duration-300
        group-hover:text-white/90
">
      {text}
    </p>
  </div>
);

export default function WhatGigstaDoes() {
  return (

<section className="py-20 md:py-20 bg-gray-50 min-h-screen w-full flex items-center">
  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
    


        <AnimatedSection animationType="slideDown" delay={100}>
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl  md:text-[50px] font-bold  leading-[1.2] ">
              What Gigsta Does
            </h2>
      
            <p className="mt-4.5 text-[#535353]  mx-auto font-medium max-w-2xl text-lg md:text-xl leading-relaxed">
              Gigsta makes sure expectations are clear for both clients and providers.
            </p>
          </div>
        </AnimatedSection>

 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          
     
          <div className="flex flex-col gap-8">
            <AnimatedChild animationType="slideRight" index={0} delay={200}>
              <Card
                icon={HandshakeIcon}
                title="Match clients to available providers"
                text="Transparent pricing for clear expectations."
              />
            </AnimatedChild>

            <AnimatedChild animationType="slideRight" index={1} delay={200}>
              <Card
                icon={ChatBubbleIcon}
                title="Support service delivery and feedback"
                text="We stay involved to ensure smooth service."
              />
            </AnimatedChild>
          </div>

          <AnimatedChild animationType="scale" index={2} delay={200}>
            <div className="bg-yellow-500  group rounded-tl-[70px] rounded-br-[70px] shadow-md p-8 flex flex-col gap-4  text-white
    transition-all duration-300
    hover:bg-white">
              <div className="w-12 h-12 flex items-center justify-center rounded-full">
                <VerifiedIcon className=" 
      text-white
      transition-colors duration-300 ease-out
       group-hover:text-[#F0A500]"/>
              </div>

              <h3 className="font-semibold text-lg     group-hover:text-gray-900">
                Vet and onboard service providers
              </h3>

              <p className="text-sm leading-relaxed text-white/90     group-hover:text-gray-600">
                Only trusted, verified service providers are allowed on Gigsta.
              </p>
            </div>
          </AnimatedChild>

        
          <div className="flex flex-col gap-8">
            <AnimatedChild animationType="slideLeft" index={3} delay={200}>
              <Card
                icon={BullsEyeIcon}
                title="Set clear pricing ranges"
                text="Transparent pricing so clients and providers know what to expect."
              />
            </AnimatedChild>

            <AnimatedChild animationType="slideLeft" index={4} delay={200}>
              <Card
                icon={IconBadge}
                title="Maintain service quality standards"
                text="Consistent quality through clear standards."
              />
            </AnimatedChild>
          </div>

        </div>

         <AnimatedSection animationType="slideUp" delay={400}>
          <div className="text-center mt-8">
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
}
