import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const SKILLS = [
    {
        id: 'dropshipping',
        to: '/dropshipping',
        title: 'Dropshipping',
        subtitle: 'Global Sales',
        description: 'Sell globally from India without inventory.',
        actionLabel: 'EXPLORE',
        status: 'Coming Soon'
    },
    {
        id: 'video-editing',
        to: '/editorslaunchpad',
        title: 'Video Editing',
        subtitle: 'Career Path',
        description: 'Get your first paid client through editing.',
        actionLabel: 'START HERE',
        status: 'Recommended'
    },
    {
        id: 'digital-products',
        to: '/digitalproducts',
        title: 'Digital Products',
        subtitle: 'Knowledge',
        description: 'Build and sell systems online.',
        actionLabel: 'EXPLORE',
        status: 'Coming Soon'
    }
];

function SkillHub() {
    const [activeIndex, setActiveIndex] = useState(1); // Start with Video Editing
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile for conditional heavy effects
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const jumpToSlide = (index) => {
        setActiveIndex(index);
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % SKILLS.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + SKILLS.length) % SKILLS.length);
    };

    // Calculate dynamic styles for each card based on its offset from activeIndex
    const getCardStyle = (index) => {
        const total = SKILLS.length;
        // Calculate offset: 0 (center), 1 (right), -1 or 2 (left)
        // We want a stable mapping: -1 (left), 0 (center), 1 (right)

        // This math ensures we get relative indices like -1, 0, 1 for the 3 visual slots
        let offset = (index - activeIndex + total) % total;
        if (offset === 2) offset = -1; // Specific for 3-item carousel: 2 becomes -1 (Left)

        // Variants for positions
        if (offset === 0) {
            return {
                x: 0,
                scale: 1,
                opacity: 1,
                zIndex: 20,
                blur: 0,
                isPrimary: true
            };
        } else if (offset === 1) {
            return {
                x: 380, // Slide Right
                scale: 0.9,
                opacity: 0.4,
                zIndex: 10,
                blur: 0,
                isPrimary: false
            };
        } else {
            return {
                x: -380, // Slide Left
                scale: 0.9,
                opacity: 0.4,
                zIndex: 10,
                blur: 0,
                isPrimary: false
            };
        }
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans flex flex-col relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">

            {/* --- ATMOSPHERE --- */}
            {/* Reduced blur radius and opacity on mobile to save GPU */}
            <div className={`absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full pointer-events-none mix-blend-screen ${isMobile ? 'blur-[60px]' : 'blur-[120px]'}`}></div>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full pointer-events-none ${isMobile ? 'blur-[40px]' : 'blur-[80px]'}`}></div>
            <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none mix-blend-overlay"></div>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 py-12 sm:py-20 h-full">

                {/* HEADLINES */}
                <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-16 space-y-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white leading-tight drop-shadow-2xl bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                            Choose Your<br />Starting Path
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-gray-400 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium max-w-lg mx-auto"
                    >
                        Each path is focused. Start with one.
                    </motion.p>
                </div>

                {/* THE STAGE (Carousel Container) */}
                <div className="relative w-full max-w-7xl mx-auto h-[400px] flex items-center justify-center perspective-[1000px] overflow-visible">

                    {SKILLS.map((skill, index) => {
                        const style = getCardStyle(index);
                        const xOffset = isMobile
                            ? (style.x === 0 ? 0 : (style.x > 0 ? 40 : -40)) // Much tighter spread on mobile to keep items visible/clickable
                            : style.x;

                        return (
                            <motion.div
                                key={skill.id}
                                className="absolute top-1/2 left-1/2 will-change-transform" // Hardware acceleration hint
                                initial={false}
                                animate={{
                                    x: `calc(-50% + ${xOffset}px)`,
                                    y: "-50%",
                                    scale: style.scale,
                                    opacity: style.opacity,
                                    zIndex: style.zIndex,
                                }}
                                transition={{
                                    duration: 0.4, // Slightly faster for snappier feel
                                    ease: [0.2, 0.8, 0.2, 1]
                                }}
                                onClick={() => {
                                    if (!style.isPrimary) jumpToSlide(index);
                                }}
                                style={{
                                    backfaceVisibility: 'hidden', // Performance optimization
                                    WebkitFontSmoothing: 'antialiased'
                                }}
                            >
                                <div className={`cursor-pointer ${!style.isPrimary ? 'hover:brightness-125 transition-all' : ''}`}>
                                    {/* Halo Glow - Simplified on mobile */}
                                    {style.isPrimary && (
                                        <div className={`absolute -inset-[2px] rounded-3xl bg-gradient-to-b from-cyan-400/30 via-emerald-400/10 to-transparent opacity-70 pointer-events-none transition-all duration-500 ${isMobile ? 'blur-sm' : 'blur-md'}`}></div>
                                    )}

                                    <SkillCard data={skill} variant={style.isPrimary ? 'primary' : 'secondary'} isMobile={isMobile} />
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Navigation Buttons (Swipe Controls) */}
                    <div className="absolute -bottom-24 flex items-center gap-6 z-30">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group"
                            aria-label="Previous Skill"
                        >
                            <svg className="w-5 h-5 fill-current opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
                        </button>

                        <div className="flex gap-2">
                            {SKILLS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-cyan-400 w-6' : 'bg-gray-700'}`}
                                ></div>
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group"
                            aria-label="Next Skill"
                        >
                            <svg className="w-5 h-5 fill-current opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
                        </button>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-gray-800 text-[10px] uppercase tracking-[0.3em] font-bold">
                <p>&copy; {new Date().getFullYear()} Skilinia. Skill-first education.</p>
            </footer>
        </div>
    );
}

function SkillCard({ data, variant, isMobile }) {
    const isPrimary = variant === 'primary';
    const { to, title, subtitle, description, actionLabel } = data;

    return (
        <div className={`
            relative w-[300px] h-[320px] sm:w-[340px] sm:h-[360px] rounded-3xl overflow-hidden
            flex flex-col items-center justify-center text-center p-8 group transition-all duration-500
            ${isPrimary ? 'bg-[#080808]' : 'bg-[#030303]'}
            ${isPrimary && !isMobile ? 'shadow-2xl' : ''} 
        `}>
            {/* Link only works if primary to avoid accidental clicks when swiping */}
            <Link to={to} className={`absolute inset-0 z-20 ${!isPrimary ? 'pointer-events-none' : ''}`}></Link>

            {/* Top Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>
            <div className={`absolute inset-0 rounded-3xl border ${isPrimary ? 'border-white/10' : 'border-white/5'} pointer-events-none transition-colors duration-500`}></div>

            {/* Volumetric Ray - Render simpler gradient on mobile */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none transition-opacity duration-500 ${isPrimary ? 'opacity-100' : 'opacity-0'} ${isMobile ? 'blur-xl' : 'blur-3xl'}`}></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500
                    ${isPrimary
                        ? 'bg-gradient-to-b from-cyan-400 to-emerald-500 text-black shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                        : 'bg-white/5 text-gray-500 border border-white/5'}
                `}>
                    {title.charAt(0)}
                </div>

                <div className="space-y-2">
                    <h3 className={`text-2xl font-semibold tracking-tight transition-colors duration-500 ${isPrimary ? 'text-white' : 'text-gray-400'}`}>
                        {title}
                    </h3>
                    <p className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${isPrimary ? 'text-cyan-400' : 'text-gray-600'}`}>
                        {subtitle}
                    </p>
                </div>

                <div className={`
                    mt-4 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border
                    ${isPrimary
                        ? 'bg-white/10 text-white border-white/20 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                        : 'bg-transparent text-gray-600 border-white/5 group-hover:border-white/20 group-hover:text-white'}
                `}>
                    {actionLabel} <span className="ml-1">&rarr;</span>
                </div>
            </div>

            {/* Bottom Glow - Simplified on mobile */}
            <div className={`absolute bottom-[-20%] left-0 right-0 h-[40%] bg-cyan-500/10 pointer-events-none transition-opacity duration-500 ${isPrimary ? 'opacity-100' : 'opacity-0'} ${isMobile ? 'blur-2xl' : 'blur-[40px]'}`}></div>
        </div>
    );
}

export default SkillHub;
