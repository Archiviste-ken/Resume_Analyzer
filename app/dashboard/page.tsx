"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Zap, TrendingUp, Target } from 'lucide-react';

const DashboardPage = () => {
    const [atsScore, setAtsScore] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setAtsScore(78), 500);
        return () => clearTimeout(timer);
    }, []);

    const detectedSkills = [
        'React',
        'TypeScript',
        'Node.js',
        'SQL',
        'Git',
        'AWS',
    ];

    const missingSkills = ['Kubernetes', 'GraphQL', 'Docker', 'CI/CD'];

    const improvements = [
        'Add quantifiable achievements to projects',
        'Include more recent certifications',
        'Expand technical skills section',
        'Improve action verb usage',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Resume Analysis</h1>
                    <p className="text-slate-400">AI-powered insights to optimize your resume</p>
                </div>

                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* ATS Score Card */}
                    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 hover:border-white/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-slate-200 font-semibold">ATS Score</h3>
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
                                        stroke="#334155"
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
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-white">{atsScore}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-slate-400 mt-4">Excellent Match</p>
                    </div>

                    {/* Job Match Card */}
                    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 hover:border-white/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-slate-200 font-semibold">Job Match</h3>
                            <Target className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-5xl font-bold text-blue-400 mb-4 animate-fade-in">
                            85%
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                            <div
                                className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
                                style={{ width: '85%' }}
                            />
                        </div>
                        <p className="text-slate-400 text-sm">Matches job requirements</p>
                    </div>

                    {/* Skills Count Card */}
                    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 hover:border-white/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-slate-200 font-semibold">Skills Summary</h3>
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-emerald-400 text-2xl font-bold">
                                    {detectedSkills.length}
                                </p>
                                <p className="text-slate-400 text-sm">Detected Skills</p>
                            </div>
                            <div>
                                <p className="text-amber-400 text-2xl font-bold">
                                    {missingSkills.length}
                                </p>
                                <p className="text-slate-400 text-sm">Missing Skills</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Detected Skills Card */}
                    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 hover:border-white/30 transition-all duration-300">
                        <div className="flex items-center mb-6">
                            <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                            <h3 className="text-slate-200 font-semibold text-lg">Detected Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {detectedSkills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 animate-fade-in"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Missing Skills Card */}
                    <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 hover:border-white/30 transition-all duration-300">
                        <div className="flex items-center mb-6">
                            <AlertCircle className="w-5 h-5 text-amber-400 mr-3" />
                            <h3 className="text-slate-200 font-semibold text-lg">Missing Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {missingSkills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium border border-amber-400/30 hover:border-amber-400/50 transition-all duration-300 animate-fade-in"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Improvements Card */}
                <div className="mt-6 bg-white/10 backdrop-blur border border-white/20 rounded-lg p-8 hover:border-white/30 transition-all duration-300">
                    <div className="flex items-center mb-6">
                        <TrendingUp className="w-5 h-5 text-blue-400 mr-3" />
                        <h3 className="text-slate-200 font-semibold text-lg">
                            Improvement Suggestions
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {improvements.map((suggestion, i) => (
                            <div
                                key={i}
                                className="flex items-start bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
                                style={{ animation: `fadeInUp 0.5s ease-out ${i * 100}ms both` }}
                            >
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                    <span className="text-blue-400 text-sm font-semibold">{i + 1}</span>
                                </div>
                                <p className="text-slate-300 text-sm">{suggestion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default DashboardPage;