import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const Main = () => {
  return (
    <div className='max-w-[1400px] mx-auto'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
