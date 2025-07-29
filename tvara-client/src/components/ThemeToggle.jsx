import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className={`
        relative w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300
        ${isDark ? "bg-gray-700" : "bg-gray-300"}
      `}
        >
            {/* Icons */}
            <span className="absolute left-2 top-0.5">{isDark ? "🌙" : ""}</span>
            <span className="absolute right-2">{!isDark ? "☀️" : ""}</span>

            {/* Slider */}
            <span
                className={`
          inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
          ${isDark ? "translate-x-8" : "translate-x-0"}
        `}
            />
        </button>
    );
}
