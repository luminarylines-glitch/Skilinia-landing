import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function SkillHub() {
    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans flex flex-col relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">

            {/* --- ATMOSPHERE --- */}

            {/* Top Spotlight Source */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

            {/* Center "Volumetric" Backlight (Behind Main Card) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-[80px] pointer-events-none"></div>

            {/* Noise Grain */}
            <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none mix-blend-overlay"></div>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 py-20">

                {/* HEADLINES */}
                <div className="text-center max-w-4xl mx-auto mb-20 space-y-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tighter text-white leading-tight drop-shadow-2xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                            Choose Your<br />Starting Path
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-gray-400 text-sm tracking-[0.2em] uppercase font-medium max-w-lg mx-auto"
                    >
                        Each path is focused. Start with one.
                    </motion.p>
                </div>

                {/* THE STAGE (Cards) */}
                <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 perspective-[1000px]">

                    {/* LEFT CARD (Recessed) */}
                    <div className="order-2 md:order-1 scale-90 opacity-40 hover:opacity-100 transition-all duration-500 z-0 text-center">
                        <SkillCard
                            to="/dropshipping"
                            title="Dropshipping"
                            subtitle="Sell Globally"
                            description="Coming Soon"
                            actionLabel="EXPLORE"
                            delay={0.2}
                            variant="secondary"
                        />
                    </div>

                    {/* CENTER CARD (Hero / Spotlight) */}
                    <div className="order-1 md:order-2 scale-100 z-20 relative">
                        {/* Halo Glow */}
                        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-b from-cyan-400/30 via-emerald-400/10 to-transparent blur-md opacity-70 pointer-events-none"></div>

                        <SkillCard
                            to="/editorslaunchpad"
                            title="Video Editing"
                            subtitle="Short-Form"
                            description="Get your first paid client."
                            actionLabel="START HERE"
                            delay={0}
                            variant="primary"
                        />
                    </div>

                    {/* RIGHT CARD (Recessed) */}
                    <div className="order-3 md:order-3 scale-90 opacity-40 hover:opacity-100 transition-all duration-500 z-0 text-center">
                        <SkillCard
                            to="/digitalproducts"
                            title="Digital Products"
                            subtitle="Build Systems"
                            description="Coming Soon"
                            actionLabel="EXPLORE"
                            delay={0.4}
                            variant="secondary"
                        />
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="py-10 text-center text-gray-800 text-[10px] uppercase tracking-[0.3em] font-bold">
                <p>&copy; {new Date().getFullYear()} Skilinia. Skill-first education.</p>
            </footer>
        </div>
    );
}

function SkillCard({ to, title, subtitle, description, actionLabel, delay, variant }) {
    const isPrimary = variant === 'primary';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: delay, ease: [0.2, 0.8, 0.2, 1] }}
            className={`
                relative w-[300px] h-[320px] sm:w-[340px] sm:h-[360px] rounded-3xl overflow-hidden
                flex flex-col items-center justify-center text-center p-8 group
                ${isPrimary ? 'bg-[#080808]' : 'bg-[#030303]'}
            `}
        >
            <Link to={to} className="absolute inset-0 z-20"></Link>

            {/* GLASS SURFACE & BORDER LIGHTING */}
            {/* Top Highlight (The "Light Source" reflection) */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>

            {/* Subtle Gradient Stroke */}
            <div className={`absolute inset-0 rounded-3xl border ${isPrimary ? 'border-white/10' : 'border-white/5'} pointer-events-none`}></div>

            {/* VOLUMETRIC RAY (Primary Only - Recommended Path Glow) */}
            {isPrimary && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-cyan-900/10 to-transparent blur-3xl pointer-events-none"></div>
            )}

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Avatar / Icon Placeholder */}
                <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                    ${isPrimary
                        ? 'bg-gradient-to-b from-cyan-400 to-emerald-500 text-black shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                        : 'bg-white/5 text-gray-500 border border-white/5'}
                `}>
                    {title.charAt(0)}
                </div>

                <div className="space-y-2">
                    <h3 className={`text-2xl font-semibold tracking-tight ${isPrimary ? 'text-white' : 'text-gray-400'}`}>
                        {title}
                    </h3>
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${isPrimary ? 'text-cyan-400' : 'text-gray-600'}`}>
                        {subtitle}
                    </p>
                </div>

                {/* Action Label (Replaces Play Button & Status Bar) */}
                <div className={`
                    mt-4 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border
                    ${isPrimary
                        ? 'bg-white/10 text-white border-white/20 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                        : 'bg-transparent text-gray-600 border-white/5 group-hover:border-white/20 group-hover:text-white'}
                `}>
                    {actionLabel} <span className="ml-1">&rarr;</span>
                </div>
            </div>

            {/* BOTTOM REFLECTION */}
            {isPrimary && (
                <div className="absolute bottom-[-20%] left-0 right-0 h-[40%] bg-cyan-500/10 blur-[40px] pointer-events-none"></div>
            )}
        </motion.div>
    );
}

export default SkillHub;
