"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const features = [
  {
    icon: "📊",
    title: "ATS Score",
    description:
      "Get a detailed ATS compatibility score to ensure your resume passes automated screening systems used by top companies.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: "🎯",
    title: "Skill Detection",
    description:
      "Automatically identify and categorize all technical, soft, and industry-specific skills from your resume.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: "🔗",
    title: "Job Match",
    description:
      "Compare your resume against job descriptions to find match percentage and identify missing keywords.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: "💡",
    title: "Improvement Tips",
    description:
      "Get personalized, actionable recommendations to strengthen your resume and increase your success rate.",
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function Features() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="features" className={`relative py-24 sm:py-32 overflow-hidden transition-colors duration-500 ${isDark ? "bg-gray-950" : "bg-white"}`}>
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${isDark ? "white" : "gray-300"}/10 to-transparent`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block text-sm font-medium text-blue-400 tracking-wider uppercase mb-4"
          >
            ✦ Features
          </motion.span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Powerful Features
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Everything you need to optimize your resume and stand out to recruiters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ amount: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-500 cursor-pointer ${
                isDark
                  ? "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                  : "bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-xl"
              }`}
            >
              {/* Animated glow */}
              <motion.div
                animate={{
                  opacity: [0, 0.15, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-[80px]`}
              />

              {/* Animated border shimmer */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className={`absolute -inset-px rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-700`}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-6"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
              </motion.div>

              <h3 className={`relative text-xl font-bold mb-3 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                {feature.title}
              </h3>
              <p className={`relative text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {feature.description}
              </p>

              {/* Bottom shine */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.8, ease: "easeInOut" }}
                className={`absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-current to-transparent ${
                  isDark ? "text-white/20" : "text-gray-400/30"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}