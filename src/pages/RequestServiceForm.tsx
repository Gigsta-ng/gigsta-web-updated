import RequestService from "@/components/forms/ServiceRequestForm";
import SEO from "@/components/SEO";

const ServiceRequestPage = () => {
  return (
    <>
      <SEO 
        title="Book a Service - Request House Cleaning or laundry"
        description="Book professional home services in Uyo. Fill out our service request form to get matched with verified providers for house cleaning or laundry."
        url="https://gigsta.pro/request-service"
        keywords="book cleaning service Uyo, request home service, book house cleaning, book laundry Uyo"
      />
      <RequestService/>
    </>
  )
}

export default ServiceRequestPage;