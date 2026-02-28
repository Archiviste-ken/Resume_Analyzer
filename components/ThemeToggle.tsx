"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-gray-700/50 dark:bg-gray-700/50 light:bg-gray-300 border border-white/10 transition-colors duration-300 flex items-center px-1"
      aria-label="Toggle theme"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
          theme === "dark"
            ? "bg-gray-900 ml-0"
            : "bg-yellow-400 ml-auto"
        }`}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
}