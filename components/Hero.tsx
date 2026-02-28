"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Sparkles, ArrowRight, Shield, Zap, Target } from "lucide-react";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background base */}
      <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? "bg-[#050816]" : "bg-[#f0f2f5]"}`} />

      {/* Ambient gradient orbs - reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[15%] left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full blur-[100px] md:blur-[140px] ${
            isDark ? "bg-blue-600/20" : "bg-blue-400/15"
          }`}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className={`absolute bottom-[20%] right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] ${
            isDark ? "bg-purple-600/15" : "bg-purple-400/10"
          }`}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className={`hidden md:block absolute top-[40%] left-[15%] w-[400px] h-[400px] rounded-full blur-[100px] ${
            isDark ? "bg-cyan-600/10" : "bg-cyan-400/8"
          }`}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-block mb-8"
        >
          <div className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 ${
            isDark
              ? "glass-card"
              : "glass-card-light"
          }`}>
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className={`text-sm font-semibold tracking-wide ${isDark ? "text-blue-300" : "text-blue-600"}`}>
              AI-Powered Resume Analysis
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Land Your Dream Job{" "}
          <span className="relative inline-block">
            <span className="gradient-text">Faster</span>
            <motion.span
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full origin-left"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Upload your resume and get instant ATS scoring, skill detection,
          job matching, and actionable improvement tips — all powered by AI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/analyze" className="relative group w-full sm:w-auto">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-50 blur-lg group-hover:opacity-80 transition-all duration-500" />
            <div className="relative flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all duration-300">
              Analyze My Resume
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          <a
            href="#how-it-works"
            className={`w-full sm:w-auto font-medium px-8 py-4 rounded-2xl text-base transition-all duration-300 active:scale-95 ${
              isDark
                ? "glass-card text-gray-300 hover:text-white"
                : "glass-card-light text-gray-700 hover:text-gray-900"
            }`}
          >
            See How It Works
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto"
        >
          {[
            { value: "10K+", label: "Resumes Analyzed", icon: <Zap className="w-4 h-4" /> },
            { value: "95%", label: "ATS Accuracy", icon: <Target className="w-4 h-4" /> },
            { value: "50+", label: "Skills Detected", icon: <Shield className="w-4 h-4" /> },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative group rounded-2xl p-4 sm:p-6 transition-all duration-500 ${
                isDark
                  ? "glass-card hover:border-white/12"
                  : "glass-card-light hover:shadow-lg"
              }`}
            >
              <div className={`flex items-center justify-center mb-2 ${isDark ? "text-blue-400" : "text-blue-500"}`}>
                {stat.icon}
              </div>
              <p className={`text-xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                {stat.value}
              </p>
              <p className={`text-[10px] sm:text-xs mt-1 font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-5 h-8 rounded-full border-2 flex justify-center pt-1.5 ${
            isDark ? "border-white/15" : "border-gray-400/30"
          }`}
        >
          <motion.div className={`w-1 h-1.5 rounded-full ${isDark ? "bg-white/30" : "bg-gray-500/40"}`} />
        </motion.div>
      </motion.div>
    </section>
  );
}