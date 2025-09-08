// import React from "react";
// import NavBar from "../components/landing/NavBar";
// import HeroSection from "../components/landing/HeroSection";
// import Explore from "../components/landing/Explore";
// import GridLayout from "../components/landing/GridLayout";
// import Essentials from "../components/landing/Essentials";
// import IntegratedToolsSection from "../components/landing/IntegratedToolsSection";
// import Features from "../components/landing/Features";
// import SideBlur from "../components/landing/SideBlur";
// import WhyUs from "../components/landing/WhyUs";
// import TvaraLoadingWrapper from "../components/TvaraLoadingWrapper";
// import Installation from "../components/landing/Installation";
// import Footer from "../components/Footer";
// import AnimatedBackground from "../components/landing/AnimatedBackground";
// import SDKSection from "../components/landing/SDKSection";

// function Landing() {
//   return (
//     <TvaraLoadingWrapper>
//       <div className="w-full bg-background text-white ">
//         <SideBlur className="z-0 fixed" />
//         <div className="z-0 hidden md:block">
//           <GridLayout />
//         </div>
//         <div className="relative z-10 px-4 md:px-24 lg:px-34">
//           <NavBar />
//         </div>
//         <HeroSection />
//         <Explore />

//         <AnimatedBackground>
//           <Essentials />
//           <IntegratedToolsSection />
//         </AnimatedBackground>

//         <SDKSection />
//         <Installation />
//         <Features />
//         <WhyUs />
//         <Footer />
//       </div>
//     </TvaraLoadingWrapper>
//   );
// }

// export default Landing;



import React, { useEffect } from "react";
import NavBar from "../components/landing/NavBar";
import HeroSection from "../components/landing/HeroSection";
import Explore from "../components/landing/Explore";
import GridLayout from "../components/landing/GridLayout";
import Essentials from "../components/landing/Essentials";
import IntegratedToolsSection from "../components/landing/IntegratedToolsSection";
import Features from "../components/landing/Features";
import SideBlur from "../components/landing/SideBlur";
import WhyUs from "../components/landing/WhyUs";
import TvaraLoadingWrapper from "../components/TvaraLoadingWrapper";
import Installation from "../components/landing/Installation";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/landing/AnimatedBackground";
import SDKSection from "../components/landing/SDKSection";

function Landing() {
  useEffect(() => {
    // Add smooth scroll behavior to the entire document
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Optional: Custom scrollbar styling for better visual experience */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to remove the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <TvaraLoadingWrapper>
      <div className="w-full bg-background text-white">
        <SideBlur className="z-0 fixed" />
        <div className="z-0 hidden md:block">
          <GridLayout />
        </div>
        <div className="relative z-10 px-4 md:px-24 lg:px-34">
          <NavBar />
        </div>
        
        {/* Add id attributes to sections for smooth scrolling navigation */}
        <section id="hero">
          <HeroSection />
        </section>
        
        <section id="explore">
          <Explore />
        </section>

        <AnimatedBackground>
          <section id="essentials">
            <Essentials />
          </section>
          <section id="tools">
            <IntegratedToolsSection />
          </section>
        </AnimatedBackground>

        <section id="sdk">
          <SDKSection />
        </section>
        
        <section id="installation">
          <Installation />
        </section>
        
        <section id="features">
          <Features />
        </section>
        
        <section id="why-us">
          <WhyUs />
        </section>
        
        <Footer />
      </div>
    </TvaraLoadingWrapper>
  );
}

export default Landing;