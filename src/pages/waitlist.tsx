import Waitlist from "@/components/forms/Waitlist";
import Faqs from "@/components/home/Faqs";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

const WaitlistPage = () => {
  return (
    <>
      <SEO 
        title="Join the Waitlist - Get Early Access to Gigsta"
        description="Be the first to know when Gigsta expands to new areas and launches exciting features. Join our waitlist for early access to the mobile app."
        url="https://gigsta.pro/waitlist"
        keywords="gigsta waitlist, early access, mobile app waitlist, gigsta app launch"
      />
      <Waitlist />
      <Faqs />  
      <Footer />
    </>
  )
}

export default WaitlistPage;
