import { AnimatedSection } from "@/components/AnimatedSection";
import SEO from "@/components/SEO";

const Privacy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information that you provide directly to us, including: (a) Personal information such as name, email address, phone number, and address when you create an account or book a service; (b) Service-related information such as service preferences, booking history, and feedback; (c) Payment information processed through secure third-party payment processors; (d) Communication data when you contact us or use our support services.",
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to: (a) Provide, maintain, and improve our services; (b) Process bookings and facilitate connections between clients and service providers; (c) Send you service-related communications, updates, and notifications; (d) Respond to your inquiries and provide customer support; (e) Detect, prevent, and address technical issues and fraudulent activities; (f) Comply with legal obligations and enforce our terms.",
    },
    {
      title: "3. Information Sharing",
      content: "We do not sell your personal information. We may share your information: (a) With service providers you book through our platform to facilitate service delivery; (b) With trusted third-party service providers who assist us in operating our platform (e.g., payment processors, analytics providers); (c) When required by law or to protect our rights and safety; (d) In connection with a business transfer or merger, with your consent or as otherwise described in this policy.",
    },
    {
      title: "4. Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "5. Your Rights and Choices",
      content: "You have the right to: (a) Access and receive a copy of your personal information; (b) Correct inaccurate or incomplete information; (c) Request deletion of your personal information, subject to legal and operational requirements; (d) Opt-out of marketing communications; (e) Withdraw consent where processing is based on consent. To exercise these rights, please contact us at hello@gigsta.com.",
    },
    {
      title: "6. Cookies and Tracking Technologies",
      content: "We use cookies and similar tracking technologies to collect information about your browsing behavior and preferences. You can control cookies through your browser settings, though disabling cookies may affect your experience on our platform.",
    },
    {
      title: "7. Third-Party Links",
      content: "Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information.",
    },
    {
      title: "8. Children's Privacy",
      content: "Gigsta's services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information.",
    },
    {
      title: "9. Data Retention",
      content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.",
    },
    {
      title: "10. International Data Transfers",
      content: "Your information may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.",
    },
    {
      title: "11. Changes to This Privacy Policy",
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of significant changes by posting the updated policy on our platform and updating the 'Last updated' date.",
    },
    {
      title: "12. Contact Us",
      content: "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at hello@gigsta.com or through our contact page. We will respond to your inquiry as soon as possible.",
    },
  ];

  return (
    <>
      <SEO 
        title="Privacy Policy - Gigsta"
        description="Read Gigsta's Privacy Policy to understand how we collect, use, and protect your personal information when you use our on-demand home services platform."
        url="https://gigsta.vercel.app/privacy"
        keywords="gigsta privacy policy, data protection, privacy rights"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <AnimatedSection animationType="slideDown" delay={100}>
          <section className="bg-gradient-to-br from-[#F0A500] to-[#e09500] py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0D0F11] mb-6 leading-tight">
                  Privacy Policy
                </h1>
                <p className="text-lg md:text-xl text-[#0D0F11]/90 leading-relaxed">
                  Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                </p>
                <p className="text-sm text-[#0D0F11]/80 mt-4">
                  Last updated: February 2026
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Privacy Content */}
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
                <AnimatedSection animationType="fadeIn" delay={1200}>
                  <p className="text-[#0D0F11]/80 text-center">
                    By using Gigsta, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and use of your information as described herein.
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

export default Privacy;
