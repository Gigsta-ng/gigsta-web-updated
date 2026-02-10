import { CheckCircleIcon, PostTaskIcon, JobDoneIcon } from "@/assets/icons/svg";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const HowGigstaWorks = () => {
  const steps = [
    {
      id: '01',
      icon: JobDoneIcon,
      title: 'Post a Task',
      description: 'Describe what you need done, when you need it, and your budget.'
    },
    {
      id: '02',
      icon: PostTaskIcon,
      title: 'Get Matched',
      description: 'Describe what you need done, when you need it, and your budget.'
    },
    {
      id: '03',
      icon: CheckCircleIcon,
      title: 'Job Gets Done',
      description: 'Describe what you need done, when you need it, and your budget.'
    }
  ];

  return (

    <section className="min-h-screen w-full bg-[#F0A500] flex items-center py-20 md:py-20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-[50px] font-bold leading-[1.2] text-[#0D0F11]">
            How Gigsta Works
          </h2>

          <p className="mt-4.5  mx-auto font-medium max-w-2xl  text-lg md:text-xl leading-relaxed text-[#0D0F11]">
            Getting things done has never been easier. Just follow these simple steps to get started with skilled professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center min-h-80 bg-white/40 rounded-xl px-8 pt-10"
            >
              <step.icon className="w-10 h-10 text-[#0D0F11] mb-6" />
              <p className="font-semibold text-xl mb-2 text-[#0D0F11]">
                {step.title}
              </p>
              <p className="text-[#0D0F11]  mb-6">
                {step.description}
              </p>

              <div className="text-[#0D0F11]  font-bold text-xl bg-[#F0A500] mt-auto py-4.5 px-5.5 rounded-tl-[48px] rounded-tr-[48px]">
                <p>{step.id}</p>
              </div>
            </div>
          ))}
        </div>



        <div className="text-center mt-8 md:mt-12">
          <Button className="shadow-[0_4px_4px_4px_rgba(0,0,0,0.15)] cursor-pointer inline-flex items-center gap-2 font-semibold text-base bg-[#0D0F11] text-white 
 hover:gap-3 transition-all duration-300">
            <NavLink to="/services" >
              <div className="flex gap-1 items-center"> Request a Service  <MoveRight className="h-4 w-4" /></div>

            </NavLink>

          </Button>
        </div>

      </div>
    </section>
  );
}

export default HowGigstaWorks

