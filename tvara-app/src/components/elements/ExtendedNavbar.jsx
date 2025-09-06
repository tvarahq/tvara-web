import React, { useState } from "react";
import { Link } from "react-router-dom";
import slack from "../../assets/slack.svg";
import github from "../../assets/github.svg";
import navbar_logo from "../../assets/navbar_logo.svg";

function ExtendedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="sticky top-0 w-full h-12 flex items-center justify-between text-white px-6 py-8 md:px-12 font-sans z-50">
        <div className="absolute inset-0 py-8 bg-background backdrop-blur-sm border-b-[0.5px] border-gray-700"></div>

        <div className="relative z-10 w-full flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src={navbar_logo}
                alt="Logo"
                className="h-8 md:h-10 cursor-pointer"
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex gap-8 lg:gap-16 text-lg font-medium">
              <Link to="/" className="hover:text-gray-300 transition">
                Home
              </Link>
              <Link to="/blog" className="hover:text-gray-300 transition">
                Blog
              </Link>
              <Link to="/docs" className="hover:text-gray-300 transition">
                Docs
              </Link>
            </div>
          </div>

          <div className="hidden md:flex gap-2 lg:gap-4">
            <button className="flex items-center gap-2 px-3 lg:px-4 py-2 border border-white rounded-[10px] font-bold text-xs lg:text-sm h-8">
              <img src={github} alt="GitHub" className="h-4" />
              <span className="hidden lg:inline">GitHub</span>
              <span className="lg:hidden">GH</span>
            </button>
            <button className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-[10px] font-bold bg-primary/80 hover:bg-primary/60 transition text-xs lg:text-sm h-8">
              <img src={slack} alt="Slack" className="h-4" />
              <span className="hidden lg:inline">Join Slack</span>
              <span className="lg:hidden">Slack</span>
            </button>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-6 h-6 cursor-pointer"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white my-1 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* MOBILE */}

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-[100px] left-0 w-full bg-[#222020] border-t border-[#5e5656]/30 transition-all duration-300 ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white hover:text-gray-300 text-lg"
              >
                Home
              </Link>
              <Link
                to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white hover:text-gray-300 text-lg"
              >
                Blog
              </Link>
              <Link
                to="/docs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white hover:text-gray-300 text-lg"
              >
                Docs
              </Link>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#5e5656]/30">
              <button className="w-full flex items-center justify-center gap-2.5 px-4 py-3 border border-white rounded-[10px] font-bold text-white hover:bg-white/10 transition">
                <img src={github} alt="GitHub" className="h-4" />
                GitHub
              </button>
              <button className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-[10px] font-bold bg-primary/80 hover:bg-primary/60 transition text-white">
                <img src={slack} alt="Slack" className="h-4" />
                Join Slack
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExtendedNavbar;
