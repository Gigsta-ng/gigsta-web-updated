
import { HandshakeIcon,  VerifiedIcon,  IconBadge, ChatBubbleIcon, BullsEyeIcon,  } from "@/assets/icons/svg";
import type { ComponentType, SVGProps } from "react";

type CardProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
};
const Card = ({ icon: Icon, title, text }: CardProps) => (
  <div className="bg-white rounded-tl-[70px] rounded-br-[70px] shadow-sm p-6 flex flex-col gap-3">
    <div className="">
      <Icon className="w-12 h-12 "/>

    </div>

    <h3 className="font-semibold text-gray-900 text-base">
      {title}
    </h3>

    <p className="text-sm text-gray-600 leading-relaxed">
      {text}
    </p>
  </div>
);

export default function WhatGigstaDoes() {
  return (
    // <section className="bg-gray-50 w-full min-h-screen py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-17.5">
    //   <div className="max-w-7xl mx-auto">
<section className="py-20 md:py-20 bg-gray-50 min-h-screen w-full flex items-center">
  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
    
        {/* <section className="min-h-screen w-full bg-[#F0A500] flex items-center py-20 md:py-0">
  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"> */}


        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl  md:text-[50px] font-bold  leading-[1.2] ">
            What Gigsta Does
          </h2>
    
          <p className="mt-4.5 text-[#535353]  mx-auto font-medium max-w-2xl text-lg md:text-xl leading-relaxed">
            Gigsta makes sure expectations are clear for both clients and providers.
          </p>
        </div>

 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          
     
          <div className="flex flex-col gap-8">
            <Card
              icon={HandshakeIcon}
              title="Match clients to available providers"
              text="Transparent pricing for clear expectations."
            />

            <Card
              icon={ChatBubbleIcon}
              title="Support service delivery and feedback"
              text="We stay involved to ensure smooth service."
            />
          </div>

          <div className="bg-yellow-500  rounded-tl-[70px] rounded-br-[70px] shadow-md p-8 flex flex-col gap-4 text-white">
            <div className="w-12 h-12 flex items-center justify-center rounded-full">
              <VerifiedIcon />
            </div>

            <h3 className="font-semibold text-lg">
              Vet and onboard service providers
            </h3>

            <p className="text-sm leading-relaxed text-white/90">
              Only trusted, verified service providers are allowed on Gigsta.
            </p>
          </div>

        
          <div className="flex flex-col gap-8">
            <Card
              icon={BullsEyeIcon}
              title="Set clear pricing ranges"
              text="Transparent pricing so clients and providers know what to expect."
            />

            <Card
              icon={IconBadge}
              title="Maintain service quality standards"
              text="Consistent quality through clear standards."
            />
          </div>

        </div>
      </div>
    </section>
  );
}
