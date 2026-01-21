import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function SkillHub() {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col relative overflow-hidden">

            {/* Cinematic Background Atmosphere */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none opacity-20"></div>

            {/* Minimal Light Streaks */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-1/4 left-1/4 w-[2px] h-[200px] bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-45 blur-[1px] opacity-20"></div>

            {/* Radial Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] pointer-events-none"></div>

            {/* Main Content Container */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 py-20">

                {/* Hero Section */}
                <div className="text-center max-w-5xl mx-auto mb-24 space-y-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="font-display text-5xl sm:text-7xl font-semibold tracking-wide text-white/90 leading-[1.3] drop-shadow-2xl"
                    >
                        Choose the skill<br />that fits your goal
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-col items-center gap-6"
                    >
                        <p className="text-gray-400/80 text-sm sm:text-base tracking-[0.2em] uppercase max-w-xl mx-auto font-medium leading-relaxed">
                            Skilinia is a skill hub. Each path is focused.<br />Pick one to continue.
                        </p>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 60 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"
                        ></motion.div>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto items-center">

                    {/* Card 1: Video Editing (Primary Focus) */}
                    <div className="md:scale-[1.03] z-10 relative">
                        <SkillCard
                            to="/editorslaunchpad"
                            title="Video Editing"
                            description="Get your first paid client through short-form editing."
                            buttonText="Start here"
                            delay={0.4}
                            primary={true}
                        />
                    </div>

                    {/* Card 2: Dropshipping */}
                    <SkillCard
                        to="/dropshipping"
                        title="International Dropshipping"
                        description="Learn how to sell globally from India without inventory."
                        buttonText="Explore"
                        delay={0.5}
                        primary={false}
                    />

                    {/* Card 3: Digital Products */}
                    <SkillCard
                        to="/digitalproducts"
                        title="Digital Products"
                        description="Build and sell knowledge online using proven systems."
                        buttonText="Explore"
                        delay={0.6}
                        primary={false}
                    />

                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 text-center text-gray-800 text-[10px] uppercase tracking-[0.3em] relative z-10 font-medium opacity-60 hover:opacity-100 transition-opacity">
                <p>&copy; {new Date().getFullYear()} Skilinia. Skill-first education.</p>
            </footer>
        </div>
    );
}

function SkillCard({ to, title, description, buttonText, delay, primary }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
                opacity: 1,
                y: 0,
                // Idle floating motion
                translateY: [0, -10, 0]
            }}
            transition={{
                opacity: { duration: 1, delay: delay, ease: "easeOut" },
                y: { duration: 1, delay: delay, ease: "easeOut" },
                translateY: {
                    duration: primary ? 7 : 8, // Slight variance
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2 // Random offset
                }
            }}
            className={`h-full relative group ${!primary ? 'opacity-90 hover:opacity-100' : ''}`}
        >
            <Link to={to} className="block h-full relative z-10">
                {/* Glass Card Container */}
                <div className={`
                    h-full relative overflow-hidden rounded-xl border transition-all duration-700 flex flex-col p-8 sm:p-10
                    backdrop-blur-2xl
                    ${primary
                        ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.01] border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]'
                        : 'bg-gradient-to-br from-white/[0.03] to-transparent border-white/5 saturate-0 group-hover:saturate-100'
                    }
                    group-hover:-translate-y-2
                `}>

                    {/* Primary Glow Pulse */}
                    {primary && (
                        <motion.div
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-1/2 -right-1/2 w-full h-full bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"
                        ></motion.div>
                    )}

                    {/* Inner Shadow / Grain */}
                    <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
                    <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-xl pointer-events-none"></div>

                    {/* Content */}
                    <div className="mb-auto relative z-10 space-y-5 pt-2">
                        {primary && (
                            <div className="w-8 h-[2px] mb-6 rounded-full bg-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.6)]"></div>
                        )}

                        <h3 className={`text-2xl font-medium tracking-wide transition-colors duration-500 ${primary ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                            {title}
                        </h3>
                        <p className={`text-sm leading-7 font-light transition-colors duration-500 ${primary ? 'text-gray-300' : 'text-gray-600 group-hover:text-gray-400'}`}>
                            {description}
                        </p>
                    </div>

                    {/* Button Area - Editorial Style */}
                    <div className="mt-12 pt-0 relative z-10">
                        <div className={`
                            inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 relative
                            ${primary ? 'text-white' : 'text-gray-600 group-hover:text-gray-300'}
                        `}>
                            {buttonText}
                            <span className="transform group-hover:translate-x-1 transition-transform duration-500">&rarr;</span>

                            {/* Animated Underline */}
                            <span className={`absolute -bottom-2 left-0 h-[1px] bg-current transition-all duration-500 ${primary ? 'w-full group-hover:w-full' : 'w-0 group-hover:w-full opacity-50'}`}></span>
                        </div>
                    </div>

                </div>
            </Link>

            {/* Primary Back Glow (The "Halo") - Softer */}
            {primary && (
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-emerald-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000 -z-10"></div>
            )}
        </motion.div>
    );
}

export default SkillHub;
