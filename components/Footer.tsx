"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`relative border-t transition-colors duration-500 ${isDark ? "border-white/[0.06] bg-[#050816]" : "border-gray-200 bg-white"}`}>
      {/* CTA Section */}
      <div className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[100px] pointer-events-none ${
          isDark ? "bg-blue-600/10" : "bg-blue-400/5"
        }`} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center"
        >
          <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Ready to improve your resume?
          </h3>
          <p className={`mb-8 max-w-lg mx-auto text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Join thousands of job seekers who have optimized their resumes with AI.
          </p>
          <Link href="/analyze" className="relative inline-flex group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-40 blur-lg group-hover:opacity-70 transition-opacity" />
            <div className="relative inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-300">
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className={`border-t ${isDark ? "border-white/[0.06]" : "border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 blur-sm opacity-40" />
                <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-[10px]">AI</span>
                </div>
              </div>
              <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                Resume<span className="gradient-text">AI</span>
              </span>
            </div>
            <p className={`text-xs ${isDark ? "text-gray-600" : "text-gray-500"}`}>
              © {new Date().getFullYear()} ResumeAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-xs font-medium transition-colors duration-300 ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-500 hover:text-gray-800"}`}
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