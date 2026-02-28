"use client";

import { Upload, Loader2, FileText, X, ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

interface Analysis {
  atsScore: number;
  atsDetails: {
    formatting: number;
    keywords: number;
    structure: number;
    readability: number;
  };
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  experience: {
    totalYears: number | string;
    positions: { title: string; company: string; duration: string }[];
  };
  education: { degree: string; institution: string; year: string }[];
  strengths: string[];
  weaknesses: string[];
  improvements: { category: string; suggestion: string; priority: string }[];
  jobMatch: {
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    suggestions: string[];
  } | null;
  summary: string;
}

function ScoreRing({ score, size = 120, label }: { score: number; size?: number; label: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: "#22c55e", glow: "rgba(34,197,94,0.3)" };
    if (s >= 60) return { stroke: "#eab308", glow: "rgba(234,179,8,0.3)" };
    if (s >= 40) return { stroke: "#f97316", glow: "rgba(249,115,22,0.3)" };
    return { stroke: "#ef4444", glow: "rgba(239,68,68,0.3)" };
  };

  const color = getColor(score);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
            strokeWidth={10}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color.glow})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <span className={`text-xs font-medium ${isDark ? "text-gray-500" : "text-gray-500"}`}>{label}</span>
    </div>
  );
}

function ProgressBar({ value, label, delay = 0 }: { value: number; label: string; delay?: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const getColor = (v: number) => {
    if (v >= 80) return "from-green-500 to-emerald-400";
    if (v >= 60) return "from-yellow-500 to-amber-400";
    if (v >= 40) return "from-orange-500 to-amber-400";
    return "from-red-500 to-rose-400";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className={isDark ? "text-gray-400" : "text-gray-600"}>{label}</span>
        <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{value}%</span>
      </div>
      <div className={`h-2 rounded-full ${isDark ? "bg-white/[0.04]" : "bg-gray-200/80"}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${getColor(value)} shadow-sm`}
        />
      </div>
    </div>
  );
}

function SkillBadge({ skill, variant }: { skill: string; variant: "blue" | "purple" | "green" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors: Record<string, string> = {
    blue: isDark
      ? "bg-blue-500/10 text-blue-300 border-blue-500/15"
      : "bg-blue-50 text-blue-700 border-blue-200/60",
    purple: isDark
      ? "bg-purple-500/10 text-purple-300 border-purple-500/15"
      : "bg-purple-50 text-purple-700 border-purple-200/60",
    green: isDark
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/15"
      : "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  };

  return (
    <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-lg border ${colors[variant]}`}>
      {skill}
    </span>
  );
}

function GlassCard({ children, title, className = "", delay = 0 }: { children: React.ReactNode; title: string; className?: string; delay?: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl p-5 sm:p-6 transition-all duration-500 ${
        isDark ? "glass-card" : "glass-card-light"
      } ${className}`}
    >
      <h3 className={`text-base sm:text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h3>
      {children}
    </motion.div>
  );
}

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      if (jobDescription.trim()) {
        formData.append("jobDescription", jobDescription);
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysis(data.analysis);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysis(null);
    setError("");
    setJobDescription("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith(".pdf") || droppedFile.name.endsWith(".docx"))) {
      setFile(droppedFile);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#050816] text-white" : "bg-[#f0f2f5] text-gray-900"}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDark ? "glass-nav" : "glass-nav-light"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {analysis && (
              <button onClick={resetAnalysis} className={`p-2 rounded-xl transition-colors ${isDark ? "hover:bg-white/[0.06]" : "hover:bg-gray-100"}`}>
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 blur-sm opacity-50" />
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
              </div>
              <span className={`text-lg font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Resume<span className="gradient-text">AI</span>
              </span>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Background ambiance — only 2 blobs, mobile-reduced */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-[100px] md:blur-[140px] ${
          isDark ? "bg-blue-600/10" : "bg-blue-400/5"
        }`} />
        <div className={`hidden md:block absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] ${
          isDark ? "bg-purple-600/8" : "bg-purple-400/3"
        }`} />
      </div>

      <div className="relative pt-24 pb-16 px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {/* Loading State */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-lg mx-auto text-center py-24 sm:py-32"
            >
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 blur-lg opacity-50 animate-pulse" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center"
                >
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </motion.div>
              </div>
              <h2 className={`text-2xl font-extrabold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                Analyzing Your Resume...
              </h2>
              <p className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Our AI is reviewing your resume. This usually takes 10-20 seconds.
              </p>
              <div className={`mx-auto max-w-xs h-1.5 rounded-full overflow-hidden ${isDark ? "bg-white/[0.04]" : "bg-gray-200"}`}>
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* Upload State */}
          {!loading && !analysis && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-10">
                <h1 className={`text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                  Analyze Your Resume
                </h1>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Upload your resume and optionally paste a job description for matching.
                </p>
              </div>

              <div className={`rounded-2xl p-6 sm:p-8 transition-all duration-500 ${
                isDark ? "glass-card" : "glass-card-light"
              }`}>
                {/* Dropzone */}
                <label
                  htmlFor="file-upload"
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl p-8 sm:p-12 cursor-pointer transition-all duration-300 ${
                    dragOver
                      ? "border-blue-500 bg-blue-500/10"
                      : file
                      ? isDark
                        ? "border-green-500/20 bg-green-500/5"
                        : "border-green-400/40 bg-green-50/50"
                      : isDark
                      ? "border-white/[0.08] hover:border-blue-500/30 hover:bg-blue-500/5"
                      : "border-gray-300/60 hover:border-blue-400/40 hover:bg-blue-50/30"
                  }`}
                >
                  {file ? (
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isDark ? "bg-green-500/10" : "bg-green-100"}`}>
                        <FileText className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="text-left">
                        <p className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{file.name}</p>
                        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); setFile(null); }}
                        className={`p-1.5 rounded-lg transition-colors ${isDark ? "hover:bg-white/[0.06]" : "hover:bg-gray-200"}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                        <div className={`p-3 rounded-xl ${isDark ? "bg-white/[0.04]" : "bg-gray-100"}`}>
                          <Upload className={`w-8 h-8 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        </div>
                      </motion.div>
                      <div className="text-center">
                        <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                          Drop your resume here or <span className="text-blue-400">browse</span>
                        </p>
                        <p className={`text-sm mt-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                          PDF or DOCX, up to 5MB
                        </p>
                      </div>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>

                {/* Job description */}
                <div className="mt-6">
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Job Description <span className={isDark ? "text-gray-600" : "text-gray-400"}>(optional)</span>
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                    placeholder="Paste the job description here to get a match score..."
                    className={`w-full rounded-xl px-4 py-3 text-sm resize-none transition-all duration-300 outline-none ${
                      isDark
                        ? "bg-white/[0.03] border border-white/[0.06] text-white placeholder-gray-600 focus:border-blue-500/30 focus:bg-white/[0.05]"
                        : "bg-white/50 border border-gray-200/60 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white"
                    }`}
                  />
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-xl text-sm ${
                      isDark
                        ? "bg-red-500/10 border border-red-500/15 text-red-400"
                        : "bg-red-50 border border-red-200/60 text-red-600"
                    }`}
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: file ? 1.01 : 1 }}
                  whileTap={{ scale: file ? 0.98 : 1 }}
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className="relative mt-6 w-full group"
                >
                  {file && (
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-40 blur-sm group-hover:opacity-70 transition-opacity" />
                  )}
                  <div className={`relative py-4 rounded-2xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                    file
                      ? "bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white"
                      : isDark
                      ? "bg-white/[0.04] text-gray-600 cursor-not-allowed"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}>
                    Analyze Resume
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Results State */}
          {!loading && analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-10">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-2xl sm:text-3xl font-extrabold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Analysis Results
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-sm sm:text-base max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {analysis.summary}
                </motion.p>
              </div>

              {/* Score Overview */}
              <GlassCard title="ATS Score Overview" delay={0.1}>
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <ScoreRing score={analysis.atsScore} size={140} label="Overall ATS Score" />
                  <div className="flex-1 w-full space-y-3.5">
                    <ProgressBar value={analysis.atsDetails.formatting} label="Formatting" delay={0.3} />
                    <ProgressBar value={analysis.atsDetails.keywords} label="Keywords" delay={0.5} />
                    <ProgressBar value={analysis.atsDetails.structure} label="Structure" delay={0.7} />
                    <ProgressBar value={analysis.atsDetails.readability} label="Readability" delay={0.9} />
                  </div>
                </div>
              </GlassCard>

              {/* Skills + Experience */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <GlassCard title="Detected Skills" delay={0.2}>
                  <div className="space-y-4">
                    {analysis.skills.technical.length > 0 && (
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>Technical</p>
                        <div className="flex flex-wrap gap-1.5">
                          {analysis.skills.technical.map((s) => <SkillBadge key={s} skill={s} variant="blue" />)}
                        </div>
                      </div>
                    )}
                    {analysis.skills.soft.length > 0 && (
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>Soft Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {analysis.skills.soft.map((s) => <SkillBadge key={s} skill={s} variant="purple" />)}
                        </div>
                      </div>
                    )}
                    {analysis.skills.tools.length > 0 && (
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>Tools</p>
                        <div className="flex flex-wrap gap-1.5">
                          {analysis.skills.tools.map((s) => <SkillBadge key={s} skill={s} variant="green" />)}
                        </div>
                      </div>
                    )}
                  </div>
                </GlassCard>

                <GlassCard title="Experience" delay={0.3}>
                  <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Total: <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {analysis.experience.totalYears} {typeof analysis.experience.totalYears === "number" ? "years" : ""}
                    </span>
                  </p>
                  <div className="space-y-2.5">
                    {analysis.experience.positions.map((pos, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`p-3 rounded-xl ${isDark ? "bg-white/[0.03] border border-white/[0.04]" : "bg-gray-50/80 border border-gray-200/40"}`}
                      >
                        <p className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{pos.title}</p>
                        <p className={`text-xs mt-0.5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                          {pos.company} · {pos.duration}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* Strengths + Weaknesses */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                <GlassCard title="Strengths" delay={0.4}>
                  <ul className="space-y-2">
                    {analysis.strengths.map((s, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        className={`text-sm flex items-start gap-2.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" /> {s}
                      </motion.li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard title="Areas to Improve" delay={0.5}>
                  <ul className="space-y-2">
                    {analysis.weaknesses.map((w, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.08 }}
                        className={`text-sm flex items-start gap-2.5 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" /> {w}
                      </motion.li>
                    ))}
                  </ul>
                </GlassCard>
              </div>

              {/* Improvements */}
              <GlassCard title="Improvement Suggestions" className="mt-5" delay={0.6}>
                <div className="space-y-2.5">
                  {analysis.improvements.map((imp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.08 }}
                      className={`flex items-start gap-3 p-3.5 rounded-xl ${isDark ? "bg-white/[0.03] border border-white/[0.04]" : "bg-gray-50/80 border border-gray-200/40"}`}
                    >
                      <span className={`shrink-0 text-[10px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider ${
                        imp.priority === "high"
                          ? isDark ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-600"
                          : imp.priority === "medium"
                          ? isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"
                          : isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"
                      }`}>
                        {imp.priority}
                      </span>
                      <div>
                        <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{imp.category}</p>
                        <p className={`text-sm mt-0.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{imp.suggestion}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Job Match */}
              {analysis.jobMatch && (
                <GlassCard title="Job Match Analysis" className="mt-5" delay={0.7}>
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <ScoreRing score={analysis.jobMatch.score} size={120} label="Match Score" />
                    <div className="flex-1 w-full space-y-4">
                      {analysis.jobMatch.matchedKeywords.length > 0 && (
                        <div>
                          <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                            Matched Keywords
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {analysis.jobMatch.matchedKeywords.map((k) => <SkillBadge key={k} skill={k} variant="green" />)}
                          </div>
                        </div>
                      )}
                      {analysis.jobMatch.missingKeywords.length > 0 && (
                        <div>
                          <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                            Missing Keywords
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {analysis.jobMatch.missingKeywords.map((k) => (
                              <span key={k} className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                                isDark ? "bg-red-500/10 text-red-300 border-red-500/15" : "bg-red-50 text-red-700 border-red-200/60"
                              }`}>{k}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
              >
                <button onClick={resetAnalysis} className="relative w-full sm:w-auto group">
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-40 blur-sm group-hover:opacity-70 transition-opacity" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-300">
                    Analyze Another Resume
                  </div>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}