"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`relative border-t transition-colors duration-500 ${isDark ? "border-white/5 bg-gray-950" : "border-gray-200 bg-gray-50"}`}>
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
      >
        <motion.h3
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
          className={`text-2xl sm:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Ready to improve your resume?
        </motion.h3>
        <p className={`mb-8 max-w-lg mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Join thousands of job seekers who have optimized their resumes with AI.
        </p>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
        >
          Get Started Free
          <motion.svg
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </Link>
      </motion.div>

      <div className={`border-t ${isDark ? "border-white/5" : "border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">AI</span>
              </div>
              <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                Resume<span className="text-blue-500">Analyzer</span>
              </span>
            </div>
            <p className={`text-xs ${isDark ? "text-gray-600" : "text-gray-500"}`}>
              © {new Date().getFullYear()} Resume Analyzer. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-xs transition-colors duration-300 ${isDark ? "text-gray-600 hover:text-gray-300" : "text-gray-500 hover:text-gray-800"}`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}