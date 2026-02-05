import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-1",
    question: "How thorough is the background check?",
    answer:
      "Gigsta runs a multi-step vetting process for providers. This includes identity verification, reference checks, and screening for relevant work history. Our goal is to ensure only trustworthy and qualified providers are accepted onto the platform.",
  },
  {
    id: "faq-2",
    question: "What happens if there's a safety issue?",
    answer:
      "Client safety is our top priority. If any safety concern arises, you can report it directly through Gigsta support. We investigate promptly, take appropriate action, and may suspend or remove providers who violate our safety standards.",
  },
  {
    id: "faq-3",
    question: "Can I see a provider's verification status?",
    answer:
      "Yes. Providers who complete Gigsta’s verification process receive a verified badge on their profile. You can also review their ratings, reviews, and service history before booking.",
  },
  {
    id: "faq-4",
    question: "Is my payment information secure?",
    answer:
      "Absolutely. All payments are processed through secure, encrypted payment gateways. Gigsta does not store your card details, and we follow industry-standard security practices to protect your information.",
  },
  {
    id: "faq-5",
    question: "What's your refund policy?",
    answer:
      "If a service is not delivered as agreed, you can raise a complaint within the specified timeframe. Our support team will review the case and may issue a partial or full refund depending on the situation.",
  },
];

const Faqs = () => {
  return (
    <section className="py-20  min-h-screen w-full flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl mb-14 font-bold leading-[1.2] text-[#0D0F11]">
          Frequently Asked Questions
        </h2>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-2"
          className="space-y-4" 
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-[#535353]/50  rounded-xl px-6 py-1"
            >
              <AccordionTrigger className="text-left font-semibold text-[#0D0F11] text-base sm:text-lg hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-[#0D0F11]/80 text-sm sm:text-base leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faqs;
