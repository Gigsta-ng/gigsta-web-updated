// import HomePage from "@/pages";

// function App() {
//   return <HomePage />;
// }

// export default App;

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
