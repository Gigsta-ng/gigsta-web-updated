import { AnimatedSection } from "@/components/AnimatedSection";
import SEO from "@/components/SEO";

const Terms = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Gigsta's platform, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
    },
    {
      title: "2. Description of Service",
      content: "Gigsta is an on-demand home services platform that connects clients with verified service providers in Uyo, Akwa Ibom State, Nigeria. We facilitate connections between service seekers and service providers for tasks such as house cleaning, laundry, and related home services.",
    },
    {
      title: "3. User Accounts",
      content: "To use certain features of our platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration.",
    },
    {
      title: "4. Service Provider Verification",
      content: "Gigsta conducts verification checks on service providers, including identity verification and service screening. However, we do not guarantee the quality, safety, or legality of services provided by third-party service providers. Clients are encouraged to exercise due diligence when engaging service providers.",
    },
    {
      title: "5. Booking and Payment",
      content: "When you book a service through Gigsta, you agree to pay the amount specified for the service. Payment terms and methods will be communicated during the booking process. All fees are displayed before you confirm a booking, and we do not charge hidden fees.",
    },
    {
      title: "6. Cancellation and Refunds",
      content: "Cancellation policies vary by service type and provider. Refund eligibility will be determined based on the specific circumstances and our refund policy. Please contact our support team for assistance with cancellations or refund requests.",
    },
    {
      title: "7. User Conduct",
      content: "You agree to use Gigsta's platform in a lawful and respectful manner. You will not: (a) violate any applicable laws or regulations; (b) infringe on the rights of others; (c) transmit harmful or malicious code; (d) engage in fraudulent activities; or (e) interfere with the platform's operation.",
    },
    {
      title: "8. Limitation of Liability",
      content: "Gigsta acts as a platform connecting clients and service providers. We are not responsible for the quality, safety, or legality of services provided by third-party service providers. Our liability is limited to the maximum extent permitted by law.",
    },
    {
      title: "9. Intellectual Property",
      content: "All content on the Gigsta platform, including logos, text, graphics, and software, is the property of Gigsta or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.",
    },
    {
      title: "10. Privacy",
      content: "Your use of Gigsta is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.",
    },
    {
      title: "11. Modifications to Terms",
      content: "Gigsta reserves the right to modify these Terms and Conditions at any time. We will notify users of significant changes. Continued use of the platform after changes constitutes acceptance of the modified terms.",
    },
    {
      title: "12. Termination",
      content: "We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason we deem necessary. You may also terminate your account at any time by contacting us.",
    },
    {
      title: "13. Governing Law",
      content: "These Terms and Conditions are governed by the laws of Nigeria. Any disputes arising from these terms or your use of the platform will be subject to the exclusive jurisdiction of the courts in Akwa Ibom State, Nigeria.",
    },
    {
      title: "14. Contact Information",
      content: "If you have questions about these Terms and Conditions, please contact us at hello@gigsta.com or through our contact page.",
    },
  ];

  return (
    <>
      <SEO 
        title="Terms & Conditions - Gigsta"
        description="Read Gigsta's Terms and Conditions. Understand the rules and guidelines for using our on-demand home services platform in Uyo, Nigeria."
        url="https://gigsta.pro/terms"
        keywords="gigsta terms and conditions, terms of service, user agreement"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <AnimatedSection animationType="slideDown" delay={100}>
          <section className="bg-gradient-to-br from-[#F0A500] to-[#e09500] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0D0F11] mb-6 leading-tight">
                  Terms & Conditions
                </h1>
                <p className="text-lg md:text-xl text-[#0D0F11]/90 leading-relaxed">
                  Please read these terms carefully before using Gigsta's services.
                </p>
                <p className="text-sm text-[#0D0F11]/80 mt-4">
                  Last updated: February 2026
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Terms Content */}
        <section className="py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 md:p-12">
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <AnimatedSection key={section.title} animationType="fadeIn" delay={index * 100}>
                    <div>
                      <h2 className="text-2xl font-bold text-[#0D0F11] mb-4">
                        {section.title}
                      </h2>
                      <p className="text-[#0D0F11]/80 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <AnimatedSection animationType="fadeIn" delay={1400}>
                  <p className="text-[#0D0F11]/80 text-center">
                    By using Gigsta, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                  </p>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Terms;
