import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-sm px-4 py-2 rounded-md shadow-md transition-colors"
        >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
};

export default ThemeToggle;
