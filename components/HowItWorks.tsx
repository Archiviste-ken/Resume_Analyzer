"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Upload, Brain, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Upload Resume",
    description: "Upload your resume in PDF or DOCX format. We support all common resume formats and layouts.",
    icon: <Upload className="w-7 h-7" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    step: "02",
    title: "AI Analysis",
    description: "Our advanced AI engine analyzes your resume for ATS compatibility, skills, and improvements.",
    icon: <Brain className="w-7 h-7" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    step: "03",
    title: "Get Results",
    description: "Receive a comprehensive report with scores, insights, and actionable recommendations instantly.",
    icon: <Rocket className="w-7 h-7" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function HowItWorks() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 overflow-hidden">
      <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? "bg-[#050816]" : "bg-white"}`} />

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] ${
          isDark ? "bg-purple-600/8" : "bg-purple-400/5"
        }`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14"
        >
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 ${
            isDark ? "glass-card" : "glass-card-light"
          }`}>
            <span className="text-sm font-semibold gradient-text">Process</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            How It Works
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Three simple steps to a better, more competitive resume.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%]">
            <div className={`h-px w-full ${isDark ? "bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-emerald-500/20" : "bg-gradient-to-r from-blue-400/20 via-purple-400/30 to-emerald-400/20"}`} />
          </div>

          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <div className={`relative rounded-2xl p-7 text-center transition-all duration-500 ${
                isDark
                  ? "glass-card hover:border-white/12"
                  : "glass-card-light hover:shadow-xl"
              }`}>
                {/* Step badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-blue-500/20">
                    STEP {item.step}
                  </span>
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${item.bg} ${item.color} mt-4 mb-5`}>
                  {item.icon}
                </div>

                <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}