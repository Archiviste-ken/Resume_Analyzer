import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

"use client";
// @ts-nocheck

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as any },
        },
    } as any;

    const illustrationVariants = {
        hidden: { opacity: 0, x: 40, rotate: 5 },
        visible: {
            opacity: 1,
            x: 0,
            rotate: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    } as any;

    return (
        <section className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Side */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl lg:text-6xl font-black leading-tight tracking-tight"
                    >
                        Beat ATS Filters &{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10">Get Short-listed</span>
                            <div className="absolute inset-x-0 bottom-1 h-4 bg-black opacity-20 -skew-y-1"></div>
                        </span>
                        {' '}Faster
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-md"
                    >
                        Analyze your resume, detect missing skills, and improve job match instantly. Get ahead of
                        the competition with AI-powered insights.
                    </motion.p>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-bold text-lg border-2 border-black hover:bg-white hover:text-black transition-colors duration-200 group"
                    >
                        Analyze My Resume
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <motion.div variants={itemVariants} className="flex gap-8 pt-6 text-sm font-semibold">
                        <div>
                            <p className="text-black">10K+</p>
                            <p className="text-gray-600">Resumes Analyzed</p>
                        </div>
                        <div>
                            <p className="text-black">92%</p>
                            <p className="text-gray-600">Success Rate</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Side - Illustration Placeholder */}
                <motion.div
                    variants={illustrationVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative h-96 lg:h-full min-h-96"
                >
                    <div className="absolute inset-0 bg-gray-100 border-3 border-black flex items-center justify-center overflow-hidden">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-black mx-auto mb-4 -skew-y-2"></div>
                            <p className="text-gray-600 font-semibold">Illustration Area</p>
                            <p className="text-sm text-gray-500 mt-2">Add your resume analysis visual here</p>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 border-3 border-black"></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-black opacity-10"></div>
                </motion.div>
            </div>
        </section>
    );
}