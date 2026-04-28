import HeroSection from "@/components/home/HeroSection";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import WhatGigstaDoes from "@/components/home/WhatGigstaDoes";
import Services from "@/components/home/Services";
import HowGigstaWorks from "@/components/home/WhyUseGigsta";
import Testimonial from "@/components/home/Testimonial";
import Faqs from "@/components/home/Faqs";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Gigsta - On-Demand Home Services in Uyo, Nigeria"
        description="gigsta.proted home service providers in Uyo. Professional house cleaning, laundry, and more. Verified, insured providers. Book now!"
        url="https://gigsta.vercel.app/"
        keywords="home services Uyo, house cleaning Uyo, laundry Uyo, cleaning services Nigeria, on-demand services Uyo, professional cleaners Uyo, home services Akwa Ibom"
      />
      <StructuredData type="Organization" />
      <StructuredData type="LocalBusiness" />
      <StructuredData type="WebSite" />
      <HeroSection />
      <AnimatedCounter />
      <Services />
      <WhatGigstaDoes />
      <HowGigstaWorks />
      <Testimonial />
      <Faqs />
    </>
  );
};

export default HomePage;
