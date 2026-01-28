import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: " Are service providers verified?",
    answer:
      "Yes. All service providers on Gigsta go through a verification process before being approved. This includes identity checks and service screening to ensure quality, reliability, and safety for clients.",
  },
  {
    id: 2,
    question: "How does Gigsta work?",
    answer:
      "Gigsta connects clients with trusted local service providers in just a few steps. Simply post a task, get matched with verified professionals, review their profiles and pricing, then choose the provider that fits your needs. Payment and communication are handled securely on the platform.",
  },

  {
    id: 3,
    question: "What happens if I’m not satisfied with a service?",
    answer:
      "Your satisfaction matters to us. If an issue arises, you can leave feedback or contact Gigsta support. We actively step in to help resolve disputes and ensure service quality standards are maintained.",
  },
  {
    id: 4,
    question: "Is Gigsta available in my location?",
    answer:
      "Currently, Gigsta operates in Uyo, with plans to expand into more cities very soon. We’re growing fast, so sign up to receive updates and be the first to know when we launch in your area.",
  },
  {
    id: 5,
    question: "Is there any hidden cost?",
    answer:
      "No. Gigsta does not charge hidden fees. Any applicable service charges or platform fees are clearly displayed before you confirm a booking.",
  },
];

const Faqs = () => {
  const [openId, setOpenId] = useState<number | null>(2);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    // <section className="w-full min-h-screen py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-17.5  bg-[#F0A500] ">
    //   <div className="max-w-7xl mx-auto">
    //   <section className="py-20 bg-[#F0A500] min-h-screen w-full">
    //  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-20 md:py-20 bg-[#F0A500]  min-h-screen w-full flex items-center">
  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl mb-14 font-bold leading-[1.2] text-[#0D0F11]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className=" bg-white/40  rounded-xl px-6 py-5 transition-all duration-300"
              >
              
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-[#0D0F11] text-base sm:text-lg">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-[#0D0F11] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && faq.answer && (
                  <p className="mt-4 text-[#0D0F11]/80 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
