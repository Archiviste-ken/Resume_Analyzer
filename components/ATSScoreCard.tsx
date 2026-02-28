"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface ATSScoreCardProps {
  score: number;
  label?: string;
}

const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ score, label = "ATS Score" }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return "#22c55e";
    if (s >= 60) return "#eab308";
    if (s >= 40) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-[130px] h-[130px]">
        <svg width={130} height={130} className="-rotate-90">
          <circle
            cx={65}
            cy={65}
            r={radius}
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
            strokeWidth={10}
          />
          <motion.circle
            cx={65}
            cy={65}
            r={radius}
            fill="none"
            stroke={getColor(score)}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {label}
      </span>
    </div>
  );
};

export default ATSScoreCard;