"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { BarChart3, Crosshair, Link2, Lightbulb } from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "ATS Score",
    description:
      "Get a detailed ATS compatibility score to ensure your resume passes automated screening systems.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: <Crosshair className="w-6 h-6" />,
    title: "Skill Detection",
    description:
      "Automatically identify and categorize all technical, soft, and industry-specific skills.",
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: <Link2 className="w-6 h-6" />,
    title: "Job Match",
    description:
      "Compare your resume against job descriptions to find match percentage and missing keywords.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Smart Tips",
    description:
      "Get personalized, actionable recommendations to strengthen your resume and success rate.",
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
];

export default function Features() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="features" className={`relative py-20 sm:py-28 overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#050816]" : "bg-[#f0f2f5]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-sm font-semibold gradient-text">Features</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Powerful Features
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Everything you need to optimize your resume and stand out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-2xl p-6 sm:p-7 transition-all duration-500 cursor-pointer ${
                isDark
                  ? "glass-card hover:border-white/12"
                  : "glass-card-light hover:shadow-xl"
              }`}
            >
              {/* Subtle glow on hover */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${feature.gradient}`} />

              {/* Icon */}
              <div className={`relative w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 ${feature.iconColor}`}>
                {feature.icon}
              </div>

              <h3 className={`relative text-lg font-bold mb-2.5 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                {feature.title}
              </h3>
              <p className={`relative text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}