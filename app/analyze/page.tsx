"use client";

import { Upload, Loader2, FileText, X, ArrowLeft, Download } from "lucide-react";
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
    if (s >= 80) return "#22c55e";
    if (s >= 60) return "#eab308";
    if (s >= 40) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
            strokeWidth={10}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <span className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>{label}</span>
    </div>
  );
}

function ProgressBar({ value, label, delay = 0 }: { value: number; label: string; delay?: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const getColor = (v: number) => {
    if (v >= 80) return "from-green-500 to-emerald-500";
    if (v >= 60) return "from-yellow-500 to-amber-500";
    if (v >= 40) return "from-orange-500 to-amber-500";
    return "from-red-500 to-rose-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className={isDark ? "text-gray-300" : "text-gray-700"}>{label}</span>
        <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{value}%</span>
      </div>
      <div className={`h-2 rounded-full ${isDark ? "bg-white/5" : "bg-gray-200"}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${getColor(value)}`}
        />
      </div>
    </div>
  );
}

function SkillBadge({ skill, color }: { skill: string; color: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors: Record<string, string> = {
    blue: isDark ? "bg-blue-500/10 text-blue-300 border-blue-500/20" : "bg-blue-50 text-blue-700 border-blue-200",
    purple: isDark ? "bg-purple-500/10 text-purple-300 border-purple-500/20" : "bg-purple-50 text-purple-700 border-purple-200",
    green: isDark ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" : "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-block text-xs font-medium px-3 py-1.5 rounded-full border ${colors[color]}`}
    >
      {skill}
    </motion.span>
  );
}

function Card({ children, title, className = "", delay = 0 }: { children: React.ReactNode; title: string; className?: string; delay?: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-3xl border p-6 transition-all duration-500 ${
        isDark
          ? "bg-white/[0.03] border-white/[0.06] hover:border-white/10"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
      } ${className}`}
    >
      <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h3>
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
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
        isDark ? "bg-gray-950/90 border-white/5" : "bg-white/90 border-gray-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {analysis && (
              <button onClick={resetAnalysis} className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`}>
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                Resume<span className="text-blue-500">Analyzer</span>
              </span>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Background blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className={`fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none ${
          isDark ? "bg-blue-600/15" : "bg-blue-400/10"
        }`}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, delay: 3 }}
        className={`fixed bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none ${
          isDark ? "bg-purple-600/10" : "bg-purple-400/5"
        }`}
      />

      <div className="relative pt-24 pb-16 px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {/* Loading State */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-lg mx-auto text-center py-32"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/20"
              >
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </motion.div>
              <h2 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                Analyzing Your Resume...
              </h2>
              <p className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Our AI is reviewing your resume. This usually takes 10-20 seconds.
              </p>
              <div className={`mx-auto max-w-xs h-2 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-gray-200"}`}>
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
                <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Analyze Your Resume
                </h1>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Upload your resume and optionally paste a job description for matching.
                </p>
              </div>

              <div className={`rounded-3xl border p-8 transition-all duration-500 ${
                isDark
                  ? "bg-white/[0.03] border-white/[0.06]"
                  : "bg-white border-gray-200 shadow-sm"
              }`}>
                {/* Dropzone */}
                <label
                  htmlFor="file-upload"
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all duration-300 ${
                    dragOver
                      ? "border-blue-500 bg-blue-500/10"
                      : file
                      ? isDark
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-green-400 bg-green-50"
                      : isDark
                      ? "border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {file ? (
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-green-400" />
                      <div className="text-left">
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{file.name}</p>
                        <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); setFile(null); }}
                        className={`p-1.5 rounded-lg transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-gray-200"}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Upload className={`w-10 h-10 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                      </motion.div>
                      <div className="text-center">
                        <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                          Drop your resume here or <span className="text-blue-500">browse</span>
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
                  <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Job Description <span className={isDark ? "text-gray-600" : "text-gray-400"}>(optional)</span>
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                    placeholder="Paste the job description here to get a match score..."
                    className={`w-full rounded-xl px-4 py-3 text-sm resize-none transition-all duration-300 outline-none ${
                      isDark
                        ? "bg-white/[0.03] border border-white/[0.06] text-white placeholder-gray-600 focus:border-blue-500/40"
                        : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400"
                    }`}
                  />
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: file ? 1.02 : 1 }}
                  whileTap={{ scale: file ? 0.98 : 1 }}
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className={`mt-6 w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                    file
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20"
                      : isDark
                      ? "bg-white/5 text-gray-600 cursor-not-allowed"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Analyze Resume
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
                  className={`text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Analysis Results
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={isDark ? "text-gray-400" : "text-gray-600"}
                >
                  {analysis.summary}
                </motion.p>
              </div>

              {/* Score Overview */}
              <Card title="ATS Score Overview" delay={0.1}>
                <div className="flex flex-col lg:flex-row items-center gap-10">
                  <ScoreRing score={analysis.atsScore} size={140} label="Overall ATS Score" />
                  <div className="flex-1 w-full space-y-4">
                    <ProgressBar value={analysis.atsDetails.formatting} label="Formatting" delay={0.3} />
                    <ProgressBar value={analysis.atsDetails.keywords} label="Keywords" delay={0.5} />
                    <ProgressBar value={analysis.atsDetails.structure} label="Structure" delay={0.7} />
                    <ProgressBar value={analysis.atsDetails.readability} label="Readability" delay={0.9} />
                  </div>
                </div>
              </Card>

              {/* Skills + Experience Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card title="Detected Skills" delay={0.2}>
                  <div className="space-y-4">
                    {analysis.skills.technical.length > 0 && (
                      <div>
                        <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>Technical</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.skills.technical.map((s) => <SkillBadge key={s} skill={s} color="blue" />)}
                        </div>
                      </div>
                    )}
                    {analysis.skills.soft.length > 0 && (
                      <div>
                        <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>Soft Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.skills.soft.map((s) => <SkillBadge key={s} skill={s} color="purple" />)}
                        </div>
                      </div>
                    )}
                    {analysis.skills.tools.length > 0 && (
                      <div>
                        <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>Tools</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.skills.tools.map((s) => <SkillBadge key={s} skill={s} color="green" />)}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                <Card title="Experience" delay={0.3}>
                  <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Total: <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {analysis.experience.totalYears} {typeof analysis.experience.totalYears === "number" ? "years" : ""}
                    </span>
                  </p>
                  <div className="space-y-3">
                    {analysis.experience.positions.map((pos, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`p-3 rounded-xl ${isDark ? "bg-white/[0.03]" : "bg-gray-50"}`}
                      >
                        <p className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{pos.title}</p>
                        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                          {pos.company} · {pos.duration}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Strengths + Weaknesses */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card title="✅ Strengths" delay={0.4}>
                  <ul className="space-y-2">
                    {analysis.strengths.map((s, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className={`text-sm flex items-start gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        <span className="text-green-400 mt-0.5">•</span> {s}
                      </motion.li>
                    ))}
                  </ul>
                </Card>

                <Card title="⚠️ Areas to Improve" delay={0.5}>
                  <ul className="space-y-2">
                    {analysis.weaknesses.map((w, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className={`text-sm flex items-start gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        <span className="text-amber-400 mt-0.5">•</span> {w}
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Improvements */}
              <Card title="💡 Improvement Suggestions" className="mt-6" delay={0.6}>
                <div className="space-y-3">
                  {analysis.improvements.map((imp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className={`flex items-start gap-3 p-4 rounded-xl ${isDark ? "bg-white/[0.03]" : "bg-gray-50"}`}
                    >
                      <span className={`shrink-0 text-xs font-bold px-2 py-1 rounded-md ${
                        imp.priority === "high"
                          ? "bg-red-500/10 text-red-400"
                          : imp.priority === "medium"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-blue-500/10 text-blue-400"
                      }`}>
                        {imp.priority.toUpperCase()}
                      </span>
                      <div>
                        <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{imp.category}</p>
                        <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{imp.suggestion}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Job Match */}
              {analysis.jobMatch && (
                <Card title="🔗 Job Match Analysis" className="mt-6" delay={0.7}>
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <ScoreRing score={analysis.jobMatch.score} size={120} label="Match Score" />
                    <div className="flex-1 w-full space-y-4">
                      {analysis.jobMatch.matchedKeywords.length > 0 && (
                        <div>
                          <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                            ✅ Matched Keywords
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {analysis.jobMatch.matchedKeywords.map((k) => <SkillBadge key={k} skill={k} color="green" />)}
                          </div>
                        </div>
                      )}
                      {analysis.jobMatch.missingKeywords.length > 0 && (
                        <div>
                          <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                            ❌ Missing Keywords
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {analysis.jobMatch.missingKeywords.map((k) => (
                              <span key={k} className={`text-xs px-3 py-1.5 rounded-full border ${
                                isDark ? "bg-red-500/10 text-red-300 border-red-500/20" : "bg-red-50 text-red-700 border-red-200"
                              }`}>{k}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
              >
                <button
                  onClick={resetAnalysis}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
                >
                  Analyze Another Resume
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}