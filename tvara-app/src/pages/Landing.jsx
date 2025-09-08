import React from "react";
import NavBar from "../components/landing/NavBar";
import HeroSection from "../components/landing/HeroSection";
import Explore from "../components/landing/Explore";
import GridLayout from "../components/elements/GridLayout";
import Essentials from "../components/landing/Essentials";
import IntegratedToolsSection from "../components/landing/IntegratedToolsSection";
import Features from "../components/landing/Features";
import SideBlur from "../components/elements/SideBlur";
import WhyUs from "../components/landing/WhyUs";
import TvaraLoadingWrapper from "../components/TvaraLoadingWrapper";
import Installation from "../components/landing/Installation";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/elements/AnimatedBackground";
import SDKSection from "../components/landing/SDKSection";
import CallToActionSection from "../components/landing/CallToAction";

function Landing() {
  return (
    <TvaraLoadingWrapper>
      <div className="w-full bg-background text-white ">
        <SideBlur className="z-0 fixed" />
        <div className="z-0 hidden md:block">
          <GridLayout />
        </div>
        <div className="relative z-10 px-4 md:px-24 lg:px-34">
          <NavBar />
        </div>
        <HeroSection />
        <Explore />

        <AnimatedBackground>
          <Essentials />
          <IntegratedToolsSection />
        </AnimatedBackground>

        <SDKSection />
        <Installation />
        <Features />
        <WhyUs />
        <CallToActionSection />
        <Footer />
      </div>
    </TvaraLoadingWrapper>
  );
}

export default Landing;
