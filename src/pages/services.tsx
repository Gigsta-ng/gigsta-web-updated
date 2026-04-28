import Services from "@/components/services/ServiceSection";
import Waitlist from "@/components/services/Waitlist";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const ServicesPage = () => {
  return (
    <>
      <SEO 
        title="Our Services - House Cleaning & laundry in Uyo"
        description="Choose from our professional home services in Uyo: one-time or recurring house cleaning, laundry, and more. Transparent pricing, verified providers."
        url="https://gigsta.pro/services"
        keywords="house cleaning services Uyo, laundry Uyo, cleaning packages Uyo, professional cleaners Uyo, home services pricing"
      />
      <StructuredData type="Service" />
      <Services />
      <Waitlist />
    </>
  );
};

export default ServicesPage;
