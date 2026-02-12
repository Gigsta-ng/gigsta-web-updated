import SafetyMeasures from "@/components/SafetyMeasures/SafetyMeasures"
import Faqs from "@/components/SafetyMeasures/faq"
import SafetyGuarantee from "@/components/SafetyMeasures/SafetyGurantee"
import Footer from "@/components/layout/Footer"
import SEO from "@/components/SEO"

const TrustAndSafety = () => {
  return (
    <>
      <SEO 
        title="Trust & Safety - Verified Service Providers in Uyo"
        description="Gigsta ensures your safety with verified, insured service providers. Learn about our vetting process, safety measures, and guarantees for peace of mind."
        url="https://gigsta.ng/trust-and-safety"
        keywords="verified service providers Uyo, safe home services, insured cleaners Uyo, trusted home services, gigsta safety"
      />
      <SafetyMeasures />
      <Faqs />
      <SafetyGuarantee />
      <Footer />
    </>
  )
}

export default TrustAndSafety
