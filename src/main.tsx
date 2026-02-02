import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/index";
import ServicesPage from "./pages/services";
import ProviderFormPage from "./pages/ProviderForm";
import ApplicationSuccess from "./pages/ApplicationSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/provider", element: <ProviderFormPage /> },
      { path: "/provider/success", element: <ApplicationSuccess />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
