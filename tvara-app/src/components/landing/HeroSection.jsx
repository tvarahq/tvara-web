import React from "react";
import right_arrow from "../../assets/right_arrow.svg";
import arrow_down_circle from "../../assets/arrow_down_circle.svg";

function HeroSection() {
  return (
    <div className="min-h-screen flex items-center md:items-end pb-8 md:pb-18 z-10 px-4 md:px-24 lg:px-18">
      <div className="w-full">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-4xl md:text-6xl font-bold leading-tight drop-shadow-2xl">
            Build AI Workflows <br />
            That Work While You Sleep
          </h1>
          <p className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-gray-300 font-light w-full md:w-[90%]">
            Tvara Canvas lets you design, connect, and deploy automations in
            minutes. With 10,000+ tools and an agentic engine, turn ideas into
            adaptive workflows that keep running while you sleep.
          </p>
        </div>

        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row w-full items-center justify-between gap-6 sm:gap-0 sm:translate-y-[-12px]">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 border rounded-[10px] hover:bg-gray-800 transition cursor-pointer text-sm sm:text-base">
              <span>View Demo</span>
            </button>
            <button className="w-full sm:w-auto px-4 py-2.5 sm:px-3.5 sm:py-2 bg-primary/80 text-white font-bold rounded-[10px] hover:bg-primary/60 transition cursor-pointer text-sm sm:text-base">
              <span className="flex items-center justify-center">
                Join Waitlist
                <img
                  src={right_arrow}
                  alt="Right Arrow"
                  className="inline h-2 ml-2.5"
                />
              </span>
            </button>
          </div>

            <img
              src={arrow_down_circle}
              alt="Arrow Down Circle"
              className="h-10 sm:h-12 cursor-pointer relative z-10"
              onClick={() => {
                const exploreSection = document.getElementById("explore");
                if (exploreSection) {
                  exploreSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;