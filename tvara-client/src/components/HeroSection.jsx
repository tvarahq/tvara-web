import React, { useState } from "react";
import "../style/herosection.css"
import Navbar from "./Navbar";

function HeroSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xkgbdrzj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          source: "hero-section",
          message: `New waitlist signup from hero section: ${email}`
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="pt-20 sm:pt-24">
        <Navbar />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Announcement Badge */}
            <div className="mb-6 sm:mb-8">
              <div className="playbtn inline-flex items-center px-3 py-2 sm:px-4 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-200/50 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 mr-2"
                >
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  Launching Soon - Platform Access
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-300 mb-4 sm:mb-6 leading-tight px-2">
              Build AI Agentic Workflows
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4384c1] to-blue-600 mt-2">
                Faster — No Code or Code
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Empower your business with AI workflows that save time and reduce
              costs. Perfect for developers who want control and non-technical
              users who want simplicity.
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto mb-6 sm:mb-8 px-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-3 sm:py-2 text-base sm:text-lg bg-white/80 backdrop-blur-sm text-gray-900 placeholder:text-gray-500 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 h-12"
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
              />
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" && (
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {status === "success" && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {status === "error" && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {status === "idle" && "Join Waitlist"}
                {status === "loading" && "Joining..."}
                {status === "success" && "Joined!"}
                {status === "error" && "Try Again"}
              </button>
            </form>

            {/* Status Messages */}
            {status === "success" && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg max-w-md mx-auto animate-fade-in">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">🎉 Welcome to the waitlist!</span>
                </div>
                <p className="text-sm mt-1">We'll notify you when we launch.</p>
              </div>
            )}
            {status === "error" && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md mx-auto animate-fade-in">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-medium">❌ Something went wrong</span>
                </div>
                <p className="text-sm mt-1">Please try again or contact support.</p>
              </div>
            )}

            {/* Feature List */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500 px-4">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-green-500"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-green-500"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
                <span>Early access benefits</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
