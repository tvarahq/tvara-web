import React from "react";
import right_arrow from "../../assets/right_arrow.svg";
import arrow_down_circle from "../../assets/arrow_down_circle.svg";

function HeroSection() {
  return (
    <div className="h-screen flex items-end px-24 pb-12">
      <div className="w-full">
        <div className="max-w-4xl">
          <h1 className="text-7xl font-bold leading-tight">
            Build AI Workflows <br />
            That Work While You Sleep
          </h1>
          <p className="mt-4 text-2xl text-gray-300">
            Tvara Canvas lets you design, connect, and deploy automations in
            minutes. With 10,000+ tools and an agentic engine, turn ideas into
            adaptive workflows that keep running while you sleep.
          </p>
        </div>

        <div className="mt-6 flex w-full items-center justify-between">
          <div className="flex gap-4">
            <button className="px-3.5 py-2 h-16 border rounded-[20px] hover:bg-gray-800 transition cursor-pointer">
              <span>View Demo</span>
            </button>
            <button className="px-3.5 py-2 h-16 bg-primary text-white font-bold rounded-[20px] hover:bg-primary/80 transition cursor-pointer">
              <span className="flex items-center">
                Join Waitlist
                <img
                  src={right_arrow}
                  alt="Right Arrow"
                  className="inline h-2 ml-2.5"
                />
              </span>
            </button>
          </div>

          <div
            className="rotating-border"
            onClick={() => {
              const section = document.getElementById("explore");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <img
              src={arrow_down_circle}
              alt="Arrow Down Circle"
              className="h-16 cursor-pointer relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
