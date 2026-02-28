"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  Zap,
  TrendingUp,
  Target,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

const DashboardPage = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [atsScore, setAtsScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAtsScore(78), 500);
    return () => clearTimeout(timer);
  }, []);

  const detectedSkills = [
    "React",
    "TypeScript",
    "Node.js",
    "SQL",
    "Git",
    "AWS",
  ];
  const missingSkills = ["Kubernetes", "GraphQL", "Docker", "CI/CD"];
  const improvements = [
    "Add quantifiable achievements to projects",
    "Include more recent certifications",
    "Expand technical skills section",
    "Improve action verb usage",
  ];

  const cardClass = dark ? "glass-card" : "glass-card-light";

  return (
    <div
      className={`min-h-screen relative overflow-hidden p-4 sm:p-6 ${
        dark ? "bg-[#050816] text-white" : "bg-[#f0f2f5] text-gray-900"
      }`}
    >
      {/* Background blobs */}
      <div
        className={`fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
          dark ? "bg-purple-600/15" : "bg-purple-400/10"
        }`}
      />
      <div
        className={`fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none hidden md:block ${
          dark ? "bg-blue-600/15" : "bg-blue-400/10"
        }`}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            className={`p-2 rounded-xl transition-colors ${
              dark
                ? "hover:bg-white/10 text-white/60 hover:text-white"
                : "hover:bg-black/5 text-gray-400 hover:text-gray-900"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              Resume Analysis
            </h1>
            <p
              className={`text-sm sm:text-base ${
                dark ? "text-white/50" : "text-gray-500"
              }`}
            >
              AI-powered insights to optimize your resume
            </p>
          </div>
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* ATS Score */}
          <div className={`${cardClass} rounded-2xl p-6 sm:p-8`}>
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`font-semibold ${
                  dark ? "text-white/80" : "text-gray-700"
                }`}
              >
                ATS Score
              </h3>
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke={dark ? "#334155" : "#e2e8f0"}
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="8"
                    strokeDasharray={`${atsScore * 3.516} 351.6`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(74,222,128,0.5))",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{atsScore}</span>
                </div>
              </div>
            </div>
            <p
              className={`text-center mt-4 text-sm ${
                dark ? "text-white/40" : "text-gray-500"
              }`}
            >
              Excellent Match
            </p>
          </div>

          {/* Job Match */}
          <div className={`${cardClass} rounded-2xl p-6 sm:p-8`}>
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`font-semibold ${
                  dark ? "text-white/80" : "text-gray-700"
                }`}
              >
                Job Match
              </h3>
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-5xl font-bold text-blue-400 mb-4">85%</div>
            <div
              className={`w-full rounded-full h-2 mb-2 ${
                dark ? "bg-white/10" : "bg-gray-200"
              }`}
            >
              <div
                className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
                style={{
                  width: "85%",
                  boxShadow: "0 0 8px rgba(96,165,250,0.5)",
                }}
              />
            </div>
            <p
              className={`text-sm ${
                dark ? "text-white/40" : "text-gray-500"
              }`}
            >
              Matches job requirements
            </p>
          </div>

          {/* Skills Summary */}
          <div className={`${cardClass} rounded-2xl p-6 sm:p-8`}>
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`font-semibold ${
                  dark ? "text-white/80" : "text-gray-700"
                }`}
              >
                Skills Summary
              </h3>
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-emerald-400 text-2xl font-bold">
                  {detectedSkills.length}
                </p>
                <p
                  className={`text-sm ${
                    dark ? "text-white/40" : "text-gray-500"
                  }`}
                >
                  Detected Skills
                </p>
              </div>
              <div>
                <p className="text-amber-400 text-2xl font-bold">
                  {missingSkills.length}
                </p>
                <p
                  className={`text-sm ${
                    dark ? "text-white/40" : "text-gray-500"
                  }`}
                >
                  Missing Skills
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Detected */}
          <div className={`${cardClass} rounded-2xl p-6 sm:p-8`}>
            <div className="flex items-center mb-6">
              <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
              <h3
                className={`font-semibold text-lg ${
                  dark ? "text-white/80" : "text-gray-700"
                }`}
              >
                Detected Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {detectedSkills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-emerald-500/15 text-emerald-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium border border-emerald-400/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing */}
          <div className={`${cardClass} rounded-2xl p-6 sm:p-8`}>
            <div className="flex items-center mb-6">
              <AlertCircle className="w-5 h-5 text-amber-400 mr-3" />
              <h3
                className={`font-semibold text-lg ${
                  dark ? "text-white/80" : "text-gray-700"
                }`}
              >
                Missing Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {missingSkills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-amber-500/15 text-amber-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium border border-amber-400/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Improvements */}
        <div className={`mt-4 sm:mt-6 ${cardClass} rounded-2xl p-6 sm:p-8`}>
          <div className="flex items-center mb-6">
            <TrendingUp className="w-5 h-5 text-blue-400 mr-3" />
            <h3
              className={`font-semibold text-lg ${
                dark ? "text-white/80" : "text-gray-700"
              }`}
            >
              Improvement Suggestions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {improvements.map((suggestion, i) => (
              <div
                key={i}
                className={`flex items-start rounded-xl p-4 transition-colors ${
                  dark
                    ? "bg-white/5 border border-white/10 hover:bg-white/10"
                    : "bg-black/[0.02] border border-black/5 hover:bg-black/[0.04]"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-blue-400 text-xs font-bold">
                    {i + 1}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    dark ? "text-white/60" : "text-gray-600"
                  }`}
                >
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;