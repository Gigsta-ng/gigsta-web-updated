import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import ReactGA from 'react-ga4'
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    ReactGA.send({hitType: "pageview", page: window.location.pathname})
  })
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppWidget 
        phoneNumber={import.meta.env.VITE_WHATSAPP_NUMBER}
        message="Hello! I'm interested in Gigsta services."
      />
      <Toaster />
    </>
  );
};

export default App;
