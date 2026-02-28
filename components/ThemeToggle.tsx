"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full transition-all duration-300 flex items-center px-1 ${
        isDark
          ? "bg-white/[0.06] border border-white/[0.08]"
          : "bg-gray-200/80 border border-gray-300/50"
      }`}
      aria-label="Toggle theme"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`w-5 h-5 rounded-full flex items-center justify-center ${
          isDark
            ? "bg-gray-800 ml-0"
            : "bg-white ml-auto shadow-sm"
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-blue-400" />
        ) : (
          <Sun className="w-3 h-3 text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}