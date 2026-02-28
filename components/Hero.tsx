"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${isDark ? "bg-gray-950" : "bg-gray-50"} transition-colors duration-500`} />

      {/* Animated blobs — always running */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] ${
          isDark ? "bg-blue-600/20" : "bg-blue-400/20"
        }`}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={`absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] ${
          isDark ? "bg-purple-600/15" : "bg-purple-400/15"
        }`}
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.2, 0.05],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] ${
          isDark ? "bg-cyan-600/10" : "bg-cyan-400/10"
        }`}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${isDark ? "bg-blue-400/40" : "bg-blue-500/30"}`}
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(${isDark ? "255,255,255" : "0,0,0"},.1) 1px, transparent 1px), linear-gradient(90deg, rgba(${isDark ? "255,255,255" : "0,0,0"},.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5 }}
          className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-8 ${
            isDark
              ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
              : "bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-300/30"
          }`}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400" />
          </span>
          <span className={`text-sm font-medium tracking-wide ${isDark ? "text-blue-300" : "text-blue-600"}`}>
            AI-Powered Analysis
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ amount: 0.5 }}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Land Your Dream Job{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Faster
            </span>
            <motion.span
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full origin-left"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ amount: 0.5 }}
          className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Upload your resume and get instant ATS scoring, skill detection,
          job matching, and actionable improvement tips — all powered by AI.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ amount: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/analyze"
            className="group relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Analyze My Resume
              <motion.svg
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <a
            href="#how-it-works"
            className={`w-full sm:w-auto font-medium px-8 py-4 rounded-2xl text-base transition-all duration-300 active:scale-95 backdrop-blur-sm ${
              isDark
                ? "border border-gray-700/50 hover:border-gray-500/50 text-gray-300 hover:text-white hover:bg-white/5"
                : "border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            See How It Works
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ amount: 0.5 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg sm:max-w-2xl mx-auto"
        >
          {[
            { value: "10K+", label: "Resumes Analyzed" },
            { value: "95%", label: "ATS Accuracy" },
            { value: "50+", label: "Skills Detected" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative group rounded-2xl p-5 transition-all duration-500 last:col-span-2 sm:last:col-span-1 ${
                isDark
                  ? "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10"
                  : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg"
              }`}
            >
              <motion.p
                className={`text-2xl sm:text-3xl font-bold ${
                  isDark
                    ? "bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent"
                }`}
              >
                {stat.value}
              </motion.p>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`w-6 h-10 rounded-full border-2 flex justify-center pt-2 ${
            isDark ? "border-white/20" : "border-gray-400/40"
          }`}
        >
          <motion.div className={`w-1 h-2 rounded-full ${isDark ? "bg-white/40" : "bg-gray-500/50"}`} />
        </motion.div>
      </motion.div>
    </section>
  );
}