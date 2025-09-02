import React from "react";
import navbar_logo from "../../assets/navbar_logo.svg";
import { Link } from "react-router-dom";
import slack from "../../assets/slack.svg";
import github from "../../assets/github.svg";

function NavBar() {
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 w-[90%] h-16 bg-[#222020]/80 backdrop-blur-sm flex items-center justify-between text-white rounded-[20px] px-9 py-2.5 font-sans z-50">
      <Link to="/">
        <img src={navbar_logo} alt="Logo" className="h-8 cursor-pointer" />
      </Link>
      <div>
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
      <div className="flex gap-8">
        <button className="flex items-center gap-2.5 px-3.5 py-2 cursor-pointer border border-white rounded-[20px] h-8 font-bold">
          {github && <img src={github} alt="GitHub Logo" className="h-4" />}
          <span>GitHub</span>
        </button>
        <button className="flex items-center gap-2.5 px-3.5 py-2 cursor-pointer rounded-[20px] h-8 font-bold bg-primary">
          {slack && <img src={slack} alt="Slack Logo" className="h-4" />}
          <span>Join Slack</span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
