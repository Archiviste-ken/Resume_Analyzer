"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? "glass-nav shadow-2xl shadow-black/30"
            : "glass-nav-light shadow-lg shadow-gray-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
            </div>
            <span className={`text-lg font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
              Resume<span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {["Features", "How it Works"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className={`relative text-sm px-4 py-2 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "text-gray-400 hover:text-white hover:bg-white/[0.06]"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
                }`}
              >
                {item}
              </a>
            ))}
            <ThemeToggle />
            <Link
              href="/analyze"
              className="relative ml-4 group"
            >
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                Get Started
              </div>
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-xl transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-white hover:bg-white/[0.06]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className={`pb-4 pt-2 flex flex-col gap-1 border-t ${isDark ? "border-white/[0.06]" : "border-gray-200"}`}>
                {["Features", "How it Works"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm py-3 px-4 rounded-xl transition-all ${
                      isDark
                        ? "text-gray-400 hover:text-white hover:bg-white/[0.06]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </a>
                ))}
                <Link
                  href="/analyze"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold px-6 py-3 rounded-xl text-center"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}