import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const applyTheme = (dark) => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    setIsDark(dark);

    // Optional: Set background colors using CSS variables
    if (dark) {
      root.style.setProperty("--bg-color", "#1E1E2F");
      root.style.setProperty("--toggle-bg", "#2D2D44");
    } else {
      root.style.setProperty("--bg-color", "#fefcbf");
      root.style.setProperty("--toggle-bg", "#fef08a");
    }
  };

  useEffect(() => {
    applyTheme(isDark);
  }, []);

  const toggleTheme = () => {
    applyTheme(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`relative w-16 h-9 rounded-full transition-colors duration-500 ease-in-out 
        ${isDark ? "bg-indigo-900" : "bg-yellow-300"} 
        shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600`}
    >
      {/* Toggle ball */}
      <div
        className={`absolute top-1.5 left-1.5 w-6 h-6 bg-white rounded-full shadow-xl transform transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-7" : ""
        }`}
      ></div>

      {/* Icons */}
      <div className="absolute left-2 top-2 text-yellow-500 transition-opacity duration-300 ease-in-out">
        <Sun size={20} className={isDark ? "opacity-0" : "opacity-100"} />
      </div>
      <div className="absolute right-2 top-2 text-indigo-400 transition-opacity duration-300 ease-in-out">
        <Moon size={20} className={isDark ? "opacity-100" : "opacity-0"} />
      </div>
    </button>
  );
};

export default ThemeToggle;
