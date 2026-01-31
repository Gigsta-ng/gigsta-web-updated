import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
import FooterBottom from "./components/layout/FooterBottom";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterBottom />
    </>
  );
};

export default App;
