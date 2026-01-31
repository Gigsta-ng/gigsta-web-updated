import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Fade as Hamburger } from "hamburger-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    // <nav className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-17.5 navbar sticky top-0 bg-white z-50 cursor-pointer">
      <nav className="sticky top-0 bg-white z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex justify-between items-center">
        <img
          src="/images/logo.svg"
          alt="Gigsta logo – a local services marketplace"
          className="w-10 h-14 sm:w-15 sm:h-19"
        />

        {/* <ul className="navLinks hidden md:flex items-center gap-10 font-medium">
          <li
            onClick={() => scrollToSection("home")}
            className="hover:text-[#F0A500]"
          >
            Home
          </li>
          <li
            onClick={() => scrollToSection("services")}
            className="hover:text-[#F0A500]"
          >
            Services
          </li>
          <li
            onClick={() => scrollToSection("how-it-works")}
            className="hover:text-[#F0A500]"
          >
            How it Works
          </li>
          <li
            onClick={() => scrollToSection("trust-and-safety")}
            className="hover:text-[#F0A500]"
          >
            Trust and Safety
          </li>

          <Button className="bg-[#F0A500] text-white font-semibold">
            Become a Provider
          </Button>
        </ul> */}
 <ul className="hidden md:flex items-center gap-10 font-medium">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-[#F0A500]" : ""}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => isActive ? "text-[#F0A500]" : ""}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/how-it-works" className={({ isActive }) => isActive ? "text-[#F0A500]" : ""}>
              How it Works
            </NavLink>
          </li>
          <li>
            <NavLink to="/trust-and-safety" className={({ isActive }) => isActive ? "text-[#F0A500]" : ""}>
              Trust and Safety
            </NavLink>
          </li>

          <Button className="bg-[#F0A500] text-white font-semibold">
            <NavLink to="/provider">Become a Provider</NavLink>
          </Button>
        </ul>
        <div className="md:hidden z-50">
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={23} />
        </div>
        <div
  className={`md:hidden absolute top-full left-0 w-full bg-white
    overflow-hidden
    flex flex-col gap-4 text-sm font-semibold
    transition-all duration-300 ease-in-out
    ${
      isOpen
        ? "max-h-125 opacity-100 translate-y-0 py-6"
        : "max-h-0 opacity-0 -translate-y-3 py-0 pointer-events-none"
    }
  `}
>
  {[
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "How it Works", path: "/" }, 
    { label: "Trust & Safety", path: "/" }, 
  ].map((item) => (
    <NavLink
      key={item.label}
      to={item.path}
      className={({ isActive }) =>
        `cursor-pointer w-full px-5 py-2 ${
          isActive ? "text-[#F0A500]" : ""
        }`
      }
      onClick={() => setIsOpen(false)} 
    >
      {item.label}
    </NavLink>
  ))}

  <Button className="bg-[#F0A500] text-white font-semibold mx-5">
    <NavLink to="/provider" onClick={() => setIsOpen(false)}>
      Become a Provider
    </NavLink>
  </Button>
</div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
