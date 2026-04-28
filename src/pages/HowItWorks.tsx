import { useState } from "react";
import {
  CheckCircleIcon,
  PostTaskIcon,
  JobDoneIcon,
  ApplyIcon,
  GetVettedIcon,
  AcceptJobsIcon,
} from "@/assets/icons/svg";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import SEO from "@/components/SEO";

const HowGigstaWorks = () => {
  const [activeTab, setActiveTab] = useState<"clients" | "providers">("clients");
    const clientSteps = [
      {
        id: '01',
        icon: JobDoneIcon,
        title: 'Tell Us What You Need',
        description: 'Choose your service, select your preferred date and time, and submit your request in minutes.'
      },
      {
        id: '02',
        icon: PostTaskIcon,
        title: 'Get Matched',
        description: 'Our team reviews your request and assigns a vetted, reliable provider available in your area'
      },
      {
        id: '03',
        icon: CheckCircleIcon,
        title: 'Job Gets Done',
        description: 'Professional Service. Zero Stress. Your assigned provider arrives and completes the job to standard.'
      }
    ];
    
  const providerSteps = [
    {
      id: "01",
      icon: ApplyIcon,
      title: "Apply",
      description:
        "Submit your details and the service you offer so we can see if Gigsta is a good fit.",
    },
    {
      id: "02",
      icon: GetVettedIcon,
      title: "Get Vetted",
      description:
        "We review your application and verify your identity to build trust.",
    },
    {
      id: "03",
      icon: AcceptJobsIcon,
      title: "Accept Jobs & Get paid",
      description:
        "Get notified of jobs, accept what works for you, complete them, and get paid securely.",
    },
  ];

  const currentSteps = activeTab === "clients" ? clientSteps : providerSteps;
  const currentHeading =
    activeTab === "clients"
      ? "Ready to Experience the Difference?"
      : "Ready to Grow Your Business?";
  const currentSubheading =
    activeTab === "clients"
      ? "Join thousands of satisfied customers who trust Gigsta for their home service needs."
      : "Join our network of successful service providers and start earning on your own schedule.";
  const currentButtonText =
    activeTab === "clients" ? "Get Started Now" : "Apply Now";
  const currentButtonLink = activeTab === "clients" ? "/services" : "/provider";
  

  return (
    <>
      <SEO 
        title="How Gigsta Works - Simple Steps to Get Started"
        description="Learn how Gigsta works for clients and providers. Simple 3-step process: post tasks, get matched, job gets done. Join thousands of satisfied customers in Uyo."
        url="https://gigsta.pro/how-it-works"
        keywords="how gigsta works, book home services Uyo, become service provider Uyo, gigsta process"
      />
      <section className="min-h-screen w-full bg-gray-50 flex items-center py-20 md:py-20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-[50px] font-bold leading-[1.2] text-[#0D0F11]">
            How Gigsta Works?
          </h2>

          <p className="mt-4.5 mx-auto font-medium max-w-2xl text-lg md:text-xl leading-relaxed text-[#0D0F11]">
            Getting things done has never been easier. Follow these simple steps to
            get started.
          </p>

          <div className="mt-8 inline-flex items-center bg-white rounded-full p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("clients")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "clients"
                  ? "bg-[#F0A500] text-[#0D0F11]"
                  : "bg-transparent text-gray-600 hover:text-[#0D0F11]"
              }`}
            >
              For Clients
            </button>
            <button
              onClick={() => setActiveTab("providers")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "providers"
                  ? "bg-[#F0A500] text-[#0D0F11]"
                  : "bg-transparent text-gray-600 hover:text-[#0D0F11]"
              }`}
            >
              For Providers
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {currentSteps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center min-h-80 bg-white rounded-xl px-8 pt-10"
            >
              <step.icon className="w-10 h-10 text-[#0D0F11] mb-6" />
              <p className="font-semibold text-xl mb-2 text-[#0D0F11]">
                {step.title}
              </p>
              <p className="text-[#0D0F11] mb-6">{step.description}</p>

              <div className="text-[#0D0F11] font-bold text-xl bg-[#F0A500] mt-auto py-4.5 px-5.5 rounded-tl-[48px] rounded-tr-[48px]">
                <p>{step.id}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-32">
          <h3 className="text-3xl sm:text-4xl font-bold text-[#0D0F11] mb-4">
            {currentHeading}
          </h3>
          <p className="text-[#0D0F11] text-base md:text-lg mb-8 max-w-3xl mx-auto">
            {currentSubheading}
          </p>

          <Button className="shadow-[0_4px_4px_4px_rgba(0,0,0,0.15)] cursor-pointer bg-[#F0A500] inline-flex items-center gap-2 text-white font-semibold text-base hover:gap-3 transition-all duration-300">
            <NavLink to={currentButtonLink}>
              <div className="flex gap-1 items-center">
                {currentButtonText} <MoveRight className="h-4 w-4" />
              </div>
            </NavLink>
          </Button>
        </div>
      </div>
    </section>
    </>
  );
};

export default HowGigstaWorks;