// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// main.tsx
import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/index";
import ServicesPage from "./pages/services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // your main app wrapper, usually contains <Navbar />
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/services", element: <ServicesPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
