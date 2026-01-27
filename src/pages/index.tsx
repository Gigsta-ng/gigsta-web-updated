// Page components
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import WhatGigstaDoes from "@/components/home/WhatGigstaDoes";
import Services from "@/components/home/Services";
import HowGigstaWorks from "@/components/home/HowGigstaWorks";
import Testimonial from "@/components/home/Testimonial";
import Faqs from "@/components/home/Faqs";
import Footer from "@/components/layout/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhatGigstaDoes />
      <Services />
      <HowGigstaWorks />
      <Testimonial />
      <Faqs />
      <Footer />
    </>
  );
};

export default HomePage;
