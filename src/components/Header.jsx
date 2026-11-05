import { useState, useLayoutEffect } from "react";
import { SunIcon, MoonIcon } from "./Icons";

function getStartingTheme() {
  try {
    const saved = localStorage.getItem("taskflow-theme");

    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch (error) {
    console.error("Could not load theme:", error);
  }

  // No saved choice yet: follow the device setting
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function Header() {
  const [theme, setTheme] = useState(getStartingTheme);

  // Apply the theme and remember it
  useLayoutEffect(function () {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("taskflow-theme", theme);
    } catch (error) {
      console.error("Could not save theme:", error);
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">✓</span>

        <div className="logo-title">
          <h1>Task Manager App</h1>
          <h3>Personal and Work Productivity</h3>
        </div>
      </div>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        type="button"
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}

export default Header;
