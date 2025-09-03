import React from "react";
import NavBar from "../components/landing/NavBar";
import HeroSection from "../components/landing/HeroSection";
import Explore from "../components/landing/Explore";
import GridLayout from "../components/landing/GridLayout";

function Landing() {
  return (
    <div className="w-full bg-background text-white px-4 md:px-24 lg:px-34">
      <GridLayout className="z-0" />
      <div className="relative">
        <NavBar />
      </div>
      <HeroSection />
      <Explore />
    </div>
  );
}

export default Landing;
