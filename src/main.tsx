import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import HomePage from "./pages/index";
import ServicesPage from "./pages/services";
import ProviderFormPage from "./pages/ProviderForm";
import ApplicationSuccess from "./pages/ApplicationSuccess";
import ServiceRequestPage from "./pages/RequestServiceForm";
import RequestSuccess from "./pages/RequestSuccess";
import HowItWorks from "./pages/HowItWorks";
import TrustAndSafety from "./pages/TrustAndSafety";
import Waitlist from "./pages/waitlist";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ReactGA from 'react-ga4'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/provider", element: <ProviderFormPage /> },
      { path: "/provider/success", element: <ApplicationSuccess /> },
      { path: "/request-service", element: <ServiceRequestPage /> },
      { path: "request/success", element: <RequestSuccess /> },
      { path: "/how-it-works", element: <HowItWorks /> },
      { path: "/trust-and-safety", element: <TrustAndSafety /> },
      { path: "/waitlist", element: <Waitlist />},
      { path: "/about", element: <About /> },
      { path: "/terms", element: <Terms /> },
      { path: "/privacy", element: <Privacy /> },

    ],
  },
]);

// Initialize GA4 with your Vite env variable
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (measurementId) {
  ReactGA.initialize(measurementId);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
);
