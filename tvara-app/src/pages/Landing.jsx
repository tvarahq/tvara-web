import React from "react";
import NavBar from "../components/landing/NavBar";
import HeroSection from "../components/landing/HeroSection";
import Explore from "../components/landing/Explore";

function Landing() {
  return (
    <div className="w-full bg-background text-white">
      <div className="fixed w-full z-50 h-16">
        <NavBar />
      </div>

        <HeroSection />
        <Explore />
    </div>
  );
}

export default Landing;
 