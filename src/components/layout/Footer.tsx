import FooterBottom from "./FooterBottom";
import { PlaneIcon } from "@/assets/icons/svg";

const Footer = () => {
  return (
      
    <footer className="bg-gray-50 w-full ">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-17.5 py-16"> */}
        {/* {/* <section className="py-20 bg-gray-50 min-h-screen w-full"> */}
  <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div>
            <h4 className="font-semibold text-lg text-[#0D0F11] mb-6">
              | Quick Links
            </h4>
            <ul className="space-y-3 text-[#0D0F11] font-normal flex flex-col gap-1 ">
              <li><a href="#" className="hover:text-[#F0A500]">Home</a></li>
              <li><a href="#" className="hover:text-[#F0A500]">About Us</a></li>
              <li><a href="#" className="hover:text-[#F0A500]">Pricing</a></li>
              <li><a href="#" className="hover:text-[#F0A500]">Blog</a></li>
              <li><a href="#" className="hover:text-[#F0A500]">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-[#0D0F11] mb-6">
              | Support
            </h4>
            <ul className="space-y-3 text-[#0D0F11] font-normal flex flex-col gap-1 ">
              <li><a href="#" className="hover:text-[#F0A500]">FAQs</a></li>
              <li><a href="#" className="hover:text-[#F0A500]">Support</a></li>
              <li><a href="#" className="hover:text-[#F0A500]">How it Works</a></li>
              <li><a href="#" className="hover:text-[#F0A500]">Terms & Condition</a></li>
              <li><a href="#" className="hover:text-[#F0A500]">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-[#0D0F11] mb-6">
              | Subscribe Us
            </h4>
            <p className="text-[#0D0F11] mb-4 max-w-sm">
              Subscribe our newsletter to receive latest updates regularly from us!
            </p>

            <div className="flex items-center gap-2 mb-3 relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F0A500] "
              />
              <button className="bg-[#F0A500] p-3 rounded-md flex items-center justify-center hover:bg-[#e09500] transition absolute right-1.5">
                <PlaneIcon className="w-4 h-4"/>
                
              </button>
            </div>

            <p className=" mt-4 text-xs text-[#0D0F11]">
              By clicking send link you agree to receive message.
            </p>
          </div>

        </div>
      </div>

      <FooterBottom />
    </footer>
  );
};

export default Footer;
