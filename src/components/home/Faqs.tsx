import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection, AnimatedChild } from "../AnimatedSection";

const faqs = [
  {
    id: "faq-1",
    question: "Are service providers verified?",
    answer:
      "Yes. All service providers on Gigsta go through a verification process before being approved. This includes identity checks and service screening to ensure quality, reliability, and safety for clients.",
  },
  {
    id: "faq-2",
    question: "How does Gigsta work?",
    answer:
      "Gigsta connects clients with trusted local service providers in just a few steps. Simply post a task, get matched with verified professionals, review their profiles and pricing, then choose the provider that fits your needs. Payment and communication are handled securely on the platform.",
  },
  {
    id: "faq-3",
    question: "What happens if I’m not satisfied with a service?",
    answer:
      "Your satisfaction matters to us. If an issue arises, you can leave feedback or contact Gigsta support. We actively step in to help resolve disputes and ensure service quality standards are maintained.",
  },
  {
    id: "faq-4",
    question: "Is Gigsta available in my location?",
    answer:
      "Currently, Gigsta operates in Uyo, with plans to expand into more cities very soon. We’re growing fast, so sign up to receive updates and be the first to know when we launch in your area.",
  },
  {
    id: "faq-5",
    question: "Is there any hidden cost?",
    answer:
      "No. Gigsta does not charge hidden fees. Any applicable service charges or platform fees are clearly displayed before you confirm a booking.",
  },
];

const Faqs = () => {
  return (
    <section className="py-20 bg-[#F0A500] min-h-screen w-full flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="slideDown" delay={100}>
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl mb-14 font-bold leading-[1.2] text-[#0D0F11]">
            Frequently Asked Questions
          </h2>
        </AnimatedSection>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-2"
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <AnimatedChild key={faq.id} animationType="fadeIn" index={index} delay={200}>
              <AccordionItem
                value={faq.id}
                className="border-none bg-white/40 rounded-xl px-6 py-1"
              >
                <AccordionTrigger className="text-left font-semibold text-[#0D0F11] text-base sm:text-lg hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-[#0D0F11]/80 text-sm sm:text-base leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </AnimatedChild>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faqs;
