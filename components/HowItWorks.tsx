"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const steps = [
  {
    step: "01",
    title: "Upload Resume",
    description: "Upload your resume in PDF or DOCX format. We support all common resume formats and layouts.",
    icon: "📄",
  },
  {
    step: "02",
    title: "AI Analysis",
    description: "Our advanced AI engine analyzes your resume for ATS compatibility, skills, and areas of improvement.",
    icon: "🤖",
  },
  {
    step: "03",
    title: "Get Results",
    description: "Receive a comprehensive report with scores, insights, and actionable recommendations instantly.",
    icon: "🚀",
  },
];

export default function HowItWorks() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? "bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950" : "bg-gradient-to-b from-white via-gray-50 to-white"}`} />
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${isDark ? "white" : "gray-300"}/10 to-transparent`} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="inline-block text-sm font-medium text-purple-400 tracking-wider uppercase mb-4"
          >
            ✦ Process
          </motion.span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            How It Works
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Three simple steps to a better, more competitive resume.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Animated connector */}
          <div className="hidden md:block absolute top-14 left-[20%] right-[20%]">
            <motion.div
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`h-px w-full ${isDark ? "bg-gradient-to-r from-blue-500/40 via-purple-500/60 to-blue-500/40" : "bg-gradient-to-r from-blue-400/30 via-purple-400/50 to-blue-400/30"}`}
            />
            {/* Traveling dot */}
            <motion.div
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"
            />
          </div>

          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ amount: 0.2 }}
              whileHover={{ y: -6 }}
              className="relative"
            >
              <div className={`relative rounded-3xl p-8 text-center transition-all duration-500 ${
                isDark
                  ? "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 hover:shadow-2xl hover:shadow-blue-500/5"
                  : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl"
              }`}>
                {/* Step badge */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-blue-500/20">
                    STEP {item.step}
                  </span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  className="mt-4 mb-6"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border ${
                    isDark
                      ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/5"
                      : "bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200"
                  }`}>
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                </motion.div>

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