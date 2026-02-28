"use client";

import { motion } from 'framer-motion';

export default function Loader() {
    const dotVariants = {
        initial: { opacity: 0.4, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
    };

    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.1,
                repeatDelay: 0.5,
            },
        },
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <motion.div
                className="flex gap-3"
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="w-3 h-3 bg-blue-500 rounded-full"
                        variants={dotVariants}
                        animate="animate"
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}