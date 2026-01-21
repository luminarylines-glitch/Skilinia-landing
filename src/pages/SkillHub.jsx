import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function SkillHub() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-900 selection:text-white flex flex-col relative overflow-hidden">

            {/* Background Noise & Gradient */}
            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-80 pointer-events-none"></div>

            {/* Main Content Container */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 py-20">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-display text-4xl sm:text-6xl font-bold tracking-tighter text-white leading-tight"
                    >
                        Choose the skill that fits your goal
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col items-center gap-6"
                    >
                        <p className="text-gray-400 text-sm sm:text-base tracking-wide max-w-xl mx-auto">
                            Skilinia is a skill hub. Each path is focused. Pick one to continue.
                        </p>
                        <div className="w-12 h-[1px] bg-gray-700"></div>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">

                    {/* Card 1: Video Editing */}
                    <SkillCard
                        to="/editorslaunchpad"
                        title="Video Editing"
                        description="Get your first paid client through short-form editing."
                        buttonText="Start here"
                        delay={0.3}
                        primary={true}
                    />

                    {/* Card 2: Dropshipping */}
                    <SkillCard
                        to="/dropshipping"
                        title="International Dropshipping"
                        description="Learn how to sell globally from India without inventory."
                        buttonText="Explore"
                        delay={0.4}
                        primary={false}
                    />

                    {/* Card 3: Digital Products */}
                    <SkillCard
                        to="/digitalproducts"
                        title="Digital Products"
                        description="Build and sell knowledge online using proven systems."
                        buttonText="Explore"
                        delay={0.5}
                        primary={false}
                    />

                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-gray-600 text-[10px] uppercase tracking-[0.2em] relative z-10">
                <p>&copy; {new Date().getFullYear()} Skilinia. Skill-first education.</p>
            </footer>
        </div>
    );
}

function SkillCard({ to, title, description, buttonText, delay, primary }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
        >
            <Link to={to} className="group block h-full">
                <div className="h-full bg-[#0a0a0a] border border-gray-800/60 rounded-xl p-8 flex flex-col transition-all duration-300 group-hover:bg-[#111] group-hover:border-gray-700 group-hover:-translate-y-1 group-hover:shadow-2xl shadow-black">
                    <div className="mb-auto space-y-4">
                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className={`mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${primary ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-gray-500 group-hover:text-white'}`}>
                        {buttonText} <span>&rarr;</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default SkillHub;
