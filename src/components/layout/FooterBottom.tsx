import { TwitterIcon, InstagramIcon, FacebookIcon, LinkedinIcon } from "@/assets/icons/svg";

const FooterBottom = () => {
  return (
    <div className="bg-[#F0A500]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-17.5 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

        <p className="text-sm text-[#0D0F11]">
          © Copyrights 2026. All rights reserved.
        </p>

 
        <div className="flex items-center gap-4">
          {[<FacebookIcon />, <InstagramIcon />,<TwitterIcon />,   <LinkedinIcon />].map((icon, index) => (
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
  );
};

export default FooterBottom;
