import React, { useState } from "react";
import navbar_logo from "../../assets/navbar_logo.svg";
import { Link } from "react-router-dom";
import slack from "../../assets/slack.svg";
import github from "../../assets/github.svg";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="relative translate-y-10 flex items-center justify-between text-white rounded-[20px] px-4 md:px-9 py-3 font-sans z-50">
        <div className="absolute opacity-60 inset-0 bg-[#222020] backdrop-blur-sm rounded-[20px] border-[1px] border-[#5e5656]/30"></div>

        <div className="relative z-10 w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img
              src={navbar_logo}
              alt="Logo"
              className="h-6 md:h-8 cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex gap-20">
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

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex gap-4">
            <a
              href="https://github.com/tvarahq/tvara"
              target="_blank"
              rel="noreferrer"
            >
              <button className="flex items-center gap-2.5 px-3.5 py-2 cursor-pointer border border-white rounded-[10px] h-8 font-bold text-sm">
                {github && (
                  <img src={github} alt="GitHub Logo" className="h-4" />
                )}
                <span>GitHub</span>
              </button>
            </a>
            <a
              href="https://tvara-workspace.slack.com/archives/C099B0WMYKZ"
              target="_blank"
              rel="noreferrer"
            >
              <button className="flex items-center gap-2.5 px-3.5 py-2 cursor-pointer rounded-[10px] h-8 font-bold bg-primary/80 hover:bg-primary/60 transition text-sm">
                {slack && <img src={slack} alt="Slack Logo" className="h-4" />}
                <span>Join Slack</span>
              </button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 mt-3 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-[95%] bg-[#222020] rounded-[20px] border border-[#5e5656]/30 transition-all duration-300 ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="p-6 space-y-6">
            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              <Link
                to="/"
                className="block text-white hover:text-gray-300 transition text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="block text-white hover:text-gray-300 transition text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/docs"
                className="block text-white hover:text-gray-300 transition text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Docs
              </Link>
            </div>

            {/* Mobile Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#5e5656]/30 flex flex-col gap-1">
              <a
                href="https://github.com/tvarahq/tvara"
                target="_blank"
                rel="noreferrer"
              >
                <button className="w-full flex items-center justify-center gap-2.5 px-4 py-3 border border-white rounded-[10px] font-bold text-white hover:bg-white/10 transition">
                  {github && (
                    <img src={github} alt="GitHub Logo" className="h-4" />
                  )}
                  <span>GitHub</span>
                </button>
              </a>
              <a
                href="https://tvara-workspace.slack.com/archives/C099B0WMYKZ"
                target="_blank"
                rel="noreferrer"
              >
                <button className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-[10px] font-bold bg-primary/80 hover:bg-primary/60 transition text-white">
                  {slack && (
                    <img src={slack} alt="Slack Logo" className="h-4" />
                  )}
                  <span>Join Slack</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
