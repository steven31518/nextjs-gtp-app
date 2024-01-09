"use client";

import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useState } from "react";
const themes = {
  forest: "forest",
  cyberpunk: "cyberpunk",
};
export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(themes.forest);
  function toggleTheme() {
    const newTheme = theme === themes.forest ? themes.cyberpunk : themes.forest;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  }
  return (
    <button className="btn btn-outline btn-sm btn-circle" onClick={toggleTheme}>
      {theme === "forest" ? (
        <BsMoonFill className="h-4 w-4" />
      ) : (
        <BsSunFill className="h-4 w-4" />
      )}
    </button>
  );
}
