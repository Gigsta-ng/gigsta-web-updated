import { NavLink } from "react-router-dom";
import { TwitterIcon, InstagramIcon, FacebookIcon, LinkedinIcon } from "@/assets/icons/svg";

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Main Footer Content */}
      <div className="bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6 -mt-2">
                <img
                  src="/images/logo.svg"
                  alt="Gigsta logo"
                  className="h-12 w-auto"
                />
                <h3 className="font-bold text-2xl text-[#0D0F11]">
                  Gigsta
                </h3>
              </div>
              <p className="text-[#0D0F11]/80 leading-relaxed text-sm">
                Gigsta connects people in Uyo to trusted service providers for cleaning and cooking. If you're a service provider, we help you get real job requests and earn more.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#0D0F11] mb-8">
                | Quick Links
              </h3>
              <ul className="space-y-3 text-[#0D0F11] font-normal flex flex-col gap-1">
                <li>
                  <NavLink to="/about" className="hover:text-[#F0A500] transition-colors">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/services" className="hover:text-[#F0A500] transition-colors">
                    Pricing
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#faqs" className="hover:text-[#F0A500] transition-colors">
                    FAQs
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg text-[#0D0F11] mb-8">
                | Support
              </h4>
              <ul className="space-y-3 text-[#0D0F11] font-normal flex flex-col gap-1 ">
                <li>
                  <NavLink to="/how-it-works" className="hover:text-[#F0A500] transition-colors">
                    How it Works
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/terms" className="hover:text-[#F0A500] transition-colors">
                    Terms & Conditions
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy" className="hover:text-[#F0A500] transition-colors">
                    Privacy Policy
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#F0A500]/20 w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[#0D0F11]">
            © Copyrights 2026. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[<FacebookIcon />, <InstagramIcon />, <TwitterIcon />, <LinkedinIcon />].map((icon, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full border bg-white border-[#535353]/50 flex items-center justify-center cursor-pointer hover:bg-[#0D0F11] hover:text-white transition"
              >
                <span className="text-sm font-bold">
                  {icon}
                </span>
              </div>
            ))}
          </div>

          <p className="font-bold text-2xl tracking-wide">
            GIGSTA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
