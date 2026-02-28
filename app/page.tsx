"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050816] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-purple-600/15 blur-[80px]" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center gap-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="relative w-16 h-16"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 blur-lg opacity-60" />
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl tracking-tight">AI</span>
          </div>
        </motion.div>
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
              animate={{ scale: [1, 2, 1], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(() => {
    // Only show loading screen on the very first visit
    if (typeof window !== "undefined" && sessionStorage.getItem("visited")) {
      return false;
    }
    return true;
  });
  const [mountKey] = useState(() => Date.now());
  const { theme } = useTheme();

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("visited", "1");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Scroll to hash section after loading screen finishes
  useEffect(() => {
    if (!loading && window.location.hash) {
      const id = window.location.hash.slice(1);
      // Small delay to ensure DOM is painted
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [loading]);

  return (
    <main className={`min-h-screen transition-colors duration-500 ${theme === "dark" ? "bg-[#050816] text-white" : "bg-[#f0f2f5] text-gray-900"}`}>
      <AnimatePresence mode="wait">{loading && <LoadingScreen />}</AnimatePresence>
      {!loading && (
        <motion.div
          key={`home-content-${mountKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <Hero />
          <Features />
          <HowItWorks />
          <Footer />
        </motion.div>
      )}
    </main>
  );
}