import React from "react";
import NavBar from "../components/landing/NavBar";
import HeroSection from "../components/landing/HeroSection";
import Explore from "../components/landing/Explore";
import GridLayout from "../components/landing/GridLayout";
import Essentials from "../components/landing/Essentials";
import IntegratedToolsSection from "../components/landing/IntegratedToolsSection";
function Landing() {
  return (
    <div className="w-full bg-background text-white ">
      <div className="z-0 hidden md:block">
        <GridLayout />
      </div>
      <div className="relative z-10 px-4 md:px-24 lg:px-34">
        <NavBar />
      </div>
      <HeroSection />
      <Explore />
      <Essentials />
      <IntegratedToolsSection />
    </div>
  );
}

export default Landing;
