import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function SkillHub() {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col relative overflow-hidden">

            {/* Cinematic Background Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-40"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none opacity-20"></div>

            {/* Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

            {/* Main Content Container */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 py-20">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-display text-5xl sm:text-7xl font-bold tracking-tighter text-white leading-[1.1] drop-shadow-2xl"
                    >
                        Choose the skill<br />that fits your goal
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col items-center gap-6"
                    >
                        <p className="text-gray-400 text-sm sm:text-base tracking-widest uppercase max-w-xl mx-auto font-medium opacity-80">
                            Skilinia is a skill hub. Each path is focused. Pick one to continue.
                        </p>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto items-stretch">

                    {/* Card 1: Video Editing (Primary) */}
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
            <footer className="py-10 text-center text-gray-700 text-[10px] uppercase tracking-[0.3em] relative z-10 font-semibold">
                <p>&copy; {new Date().getFullYear()} Skilinia. Skill-first education.</p>
            </footer>
        </div>
    );
}

function SkillCard({ to, title, description, buttonText, delay, primary }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
            className="h-full relative group"
        >
            <Link to={to} className="block h-full relative z-10">
                {/* Glass Card Container */}
                <div className={`
                    h-full relative overflow-hidden rounded-2xl border transition-all duration-500 flex flex-col p-8
                    backdrop-blur-xl bg-opacity-10
                    ${primary
                        ? 'bg-white/5 border-emerald-500/30 shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.3)] group-hover:border-emerald-500/50'
                        : 'bg-white/[0.02] border-white/10 group-hover:bg-white/[0.04] group-hover:border-white/20'
                    }
                `}>

                    {/* Inner Glow Gradient for Primary */}
                    {primary && (
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-500"></div>
                    )}

                    {/* Content */}
                    <div className="mb-auto relative z-10 space-y-4 pt-4">
                        <div className={`w-12 h-1 mb-6 rounded-full ${primary ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gray-800'}`}></div>

                        <h3 className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${primary ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                            {title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-light opacity-80 group-hover:opacity-100 transition-opacity">
                            {description}
                        </p>
                    </div>

                    {/* Button Area */}
                    <div className="mt-10 pt-6 border-t border-white/5 relative z-10">
                        <div className={`
                            inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300
                            ${primary
                                ? 'text-emerald-400 group-hover:text-emerald-300 group-hover:gap-4'
                                : 'text-gray-600 group-hover:text-white group-hover:gap-4'}
                        `}>
                            {buttonText} <span>&rarr;</span>
                        </div>
                    </div>

                    {/* Hover Gloss Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
            </Link>

            {/* Back Glow for Primary only (The "Halo") */}
            {primary && (
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-emerald-500/20 to-transparent blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500 -z-10"></div>
            )}
        </motion.div>
    );
}

export default SkillHub;
