import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { DollarBill } from '../components/DollarBill';

// PLACEHOLDERS - USER SHOULD REPLACE THESE
const WISTIA_VIDEO_ID = "fdjsk7omlt"; // User provided ID

// Safe Storage Helper (Outside Component)
const safeStorage = {
    getItem: (key) => {
        if (typeof window === 'undefined') return null;
        try {
            return sessionStorage.getItem(key);
        } catch (e) {
            console.warn('SessionStorage access blocked:', e);
            return null;
        }
    },
    setItem: (key, value) => {
        if (typeof window === 'undefined') return;
        try {
            sessionStorage.setItem(key, value);
        } catch (e) {
            console.warn('SessionStorage write blocked:', e);
        }
    }
};

function EditorsLaunchpad() {
    const [isVideoFinished, setIsVideoFinished] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);



    const step1Controls = useAnimation();
    const step2Controls = useAnimation();

    // Testimonials Data
    const testimonials = [
        { text: "Within weeks, I delivered my first paid reel.", name: "Arjun B", city: "Kochi" },
        { text: "Clear projects, real workflows, no fluff.", name: "Akash M V", city: "Calicut" },
        { text: "Perfect for complete beginners like me.", name: "Sivajith", city: "Trivandrum" }
    ];

    // State for Slots & Urgency
    const [slotsLeft, setSlotsLeft] = useState(16);
    const [showSlotNotification, setShowSlotNotification] = useState(false);

    // Load slots from storage on mount
    useEffect(() => {
        const saved = safeStorage.getItem('skilinia_slots_left');
        if (saved) {
            const parsed = parseInt(saved, 10);
            if (Number.isFinite(parsed)) {
                setSlotsLeft(parsed);
            }
        }
    }, []);

    // Timer State
    const [timeLeft, setTimeLeft] = useState("06:12:43");

    // Persist slots
    useEffect(() => {
        safeStorage.setItem('skilinia_slots_left', slotsLeft.toString());
    }, [slotsLeft]);

    // Carousel State
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    // Carousel Auto-Scroll
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000); // 4 seconds per slide
        return () => clearInterval(interval);
    }, []);




    // Initialize Wistia API & Urgency Logic
    useEffect(() => {
        // Wistia "Watch Queue" Pattern (_wq is the correct queue for onReady)
        window._wq = window._wq || [];

        const onWistiaReady = (video) => {
            console.log("Wistia Player Ready:", video);

            // Urgency Logic Vars
            let midReduced = safeStorage.getItem('skilinia_slots_reduced_mid') === 'true';
            let endReduced = safeStorage.getItem('skilinia_slots_reduced_end') === 'true';

            video.bind("end", () => {
                console.log("Video ended event received!");
                setIsVideoFinished(true);
                setIsUnlocked(true);
            });

            video.bind("play", () => {
                console.log("Video started playing");
            });

            // Realistic Slot Reduction Logic
            video.bind("secondchange", (s) => {
                const duration = video.duration();
                if (!duration) return;

                // Randomize triggers slightly (simulated by broad ranges)
                // Mid-video reduction (approx 50%)
                if (s / duration > 0.45 && !midReduced) {
                    setSlotsLeft(prev => Math.max(14, prev - 1));
                    midReduced = true;
                    safeStorage.setItem('skilinia_slots_reduced_mid', 'true');
                    triggerNotification();
                }

                // End-video reduction (approx 90%)
                if (s / duration > 0.90 && !endReduced) {
                    setSlotsLeft(prev => Math.max(14, prev - 1));
                    endReduced = true;
                    safeStorage.setItem('skilinia_slots_reduced_end', 'true');
                    triggerNotification();
                }
            });
        };

        // Use _wq, not _wistia for ID-based callbacks
        window._wq.push({ id: WISTIA_VIDEO_ID, onReady: onWistiaReady });

        return () => {
            // Cleanup
        };
    }, []);

    const triggerNotification = () => {
        setShowSlotNotification(true);
        setTimeout(() => setShowSlotNotification(false), 2000);
    };

    const handleContinue = () => {
        if (!isUnlocked) return;

        // Meta Pixel Event
        if (typeof window.fbq === 'function') {
            window.fbq('track', 'InitiateCheckout');
        }

        window.location.href = "https://tally.so/r/1A4Z8p";
    };

    // Countdown Logic
    useEffect(() => {
        // Set initial time: 6h 12m 43s
        let totalSeconds = 6 * 3600 + 12 * 60 + 43;

        const timer = setInterval(() => {
            totalSeconds -= 1;
            if (totalSeconds < 0) {
                clearInterval(timer);
                return;
            }

            const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
            const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
            const s = (totalSeconds % 60).toString().padStart(2, '0');

            setTimeLeft(`${h}:${m}:${s}`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0a0a0a] to-black relative flex flex-col items-center pt-10 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-600 selection:text-white overflow-hidden">

            {/* Cinematic Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>

            {/* 0. Logo - Centered Top */}
            <div className="relative z-10 mb-6">
                <img src="/logo.png" alt="Skilinia Logo" className="h-16 w-auto object-contain drop-shadow-lg" />
            </div>

            {/* 1. Main Headline - Smaller & Balanced (Now Top) */}
            <div className="relative z-10 text-center w-full max-w-7xl mx-auto mb-6 space-y-4">
                <div className="relative inline-block">
                    <DollarBill />
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-20 font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white leading-none uppercase drop-shadow-2xl whitespace-nowrap"
                    >
                        GET YOUR FIRST PAID CLIENT
                    </motion.h1>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative z-20 text-gray-400 font-medium text-[10px] sm:text-sm tracking-[0.2em] uppercase max-w-xl mx-auto border-b border-gray-800/50 pb-4 mb-4"
                >
                    Even If You’re Starting From Zero
                </motion.p>
            </div>

            {/* 2. Urgency Badge - Red, Timer (Now Middle) */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 mb-6 flex flex-col items-center gap-4"
            >
                <div className="relative">
                    <div className="bg-[#18181b] backdrop-blur-md border border-[#E53935] text-gray-100 px-6 py-3 sm:px-14 sm:py-5 rounded-full text-xs sm:text-sm font-medium flex items-center justify-center gap-2 sm:gap-3 shadow-[0_0_30px_rgba(229,57,53,0.2)] animate-breathe-red tracking-wide max-w-[90vw] sm:max-w-none mx-auto transition-all duration-300">
                        <span className="text-[#E53935] text-[10px] sm:text-xs">●</span>
                        <span className="uppercase text-[10px] sm:text-[13px] font-semibold opacity-95 whitespace-nowrap flex items-center">
                            <span className="font-mono tracking-wider sm:tracking-widest mr-1 sm:mr-2">{timeLeft}</span>
                            <span className="mx-1 sm:mx-2 opacity-40">•</span>
                            <motion.span
                                key={slotsLeft}
                                initial={{ scale: 0.8, color: '#ffaaaa' }}
                                animate={{ scale: 1, color: '#E53935' }}
                                transition={{ duration: 0.3 }}
                                className="text-[#E53935] font-bold"
                            >
                                {slotsLeft} DISCOUNTED SPOTS
                            </motion.span>
                        </span>
                    </div>

                    {/* Visual Feedback Pop */}
                    <AnimatePresence>
                        {showSlotNotification && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute -bottom-6 left-0 right-0 text-center"
                            >
                                <span className="text-[9px] font-bold uppercase tracking-widest text-red-400/80">
                                    1 spot just filled
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Step Label 1 - Minimalist & Clean */}
            <div className="text-center relative z-10 mb-4 sm:mb-6">
                <motion.p
                    animate={step1Controls}
                    className="text-gray-400 font-medium text-xs sm:text-sm tracking-[0.2em] uppercase opacity-80"
                >
                    Step 1 — Watch the video
                </motion.p>
            </div>

            {/* 3. Wistia VSL Embed - Cinematic Shadow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-5xl relative z-10 group"
            >
                {/* Soft glow behind video */}
                <div className="absolute -inset-1 bg-[#01663D] rounded-[2rem] blur-[50px] opacity-10 group-hover:opacity-20 transition duration-1000"></div>

                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,1)] bg-[#050505] border border-gray-800/50">
                    <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                        <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                            <div className={`wistia_embed wistia_async_${WISTIA_VIDEO_ID} videoFoam=true`} style={{ height: '100%', position: 'relative', width: '100%' }}>
                                <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 0, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
                                    <img src={`https://fast.wistia.com/embed/medias/${WISTIA_VIDEO_ID}/swatch`} style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} alt="" aria-hidden="true" onLoad={(e) => e.target.parentNode.style.opacity = 1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Step Label 2 - Above Button */}
            <div className="text-center relative z-10 mt-8 sm:mt-10 mb-3">
                <motion.p
                    animate={step2Controls}
                    className="text-gray-200 font-medium text-sm sm:text-base tracking-[0.2em] uppercase"
                >
                    Step 2 — Apply now
                </motion.p>
            </div>

            {/* 4. Locked Continue Button - Elegant & Centered */}
            <motion.div
                className="relative z-10 group"
                animate={{ opacity: 1, pointerEvents: 'auto' }}
            >
                {/* Rotating Green Glow - Locked State Only */}
                {!isUnlocked && (
                    <div className="absolute -inset-[2px] rounded-lg bg-[conic-gradient(from_var(--shimmer-angle),theme('colors.transparent'),#34d399,theme('colors.transparent'))] opacity-100 blur-[0.5px] animate-spin-slow" style={{ '--shimmer-angle': '0deg' }}></div>
                )}

                <button
                    onClick={handleContinue}
                    disabled={!isUnlocked}
                    className={`
            relative px-12 py-5 rounded-lg text-sm tracking-[0.15em] font-bold uppercase transition-all duration-700 flex items-center justify-center gap-3 border
            ${isUnlocked
                            ? 'bg-[#015231] border-[#2dc47d] text-white hover:bg-[#014026] cursor-pointer shadow-[0_0_40px_rgba(1,102,61,0.4)] hover:shadow-[0_0_60px_rgba(45,196,125,0.4)] transform hover:-translate-y-0.5'
                            : 'bg-black/90 border-gray-700/50 text-gray-400 cursor-not-allowed shadow-[0_0_15px_rgba(1,102,61,0.1)]'}
          `}
                >
                    {isUnlocked ? (
                        <>
                            Continue to Enrollment <span className="text-lg">→</span>
                        </>
                    ) : (
                        <>
                            <span className="opacity-50 text-lg">🔒</span> Finish Video to Apply
                        </>
                    )}
                </button>
            </motion.div>

            {/* 5. Testimonial Carousel - Integrated */}
            <div className="mt-16 w-full max-w-lg mx-auto relative px-4 z-10">
                <p className="text-center text-[9px] font-bold uppercase tracking-[0.4em] text-gray-600 mb-6 font-sans opacity-60">Elite Alumni Results</p>
                <div className="relative h-48 sm:h-40">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTestimonial}
                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                            transition={{ duration: 0.8 }}
                            className="bg-transparent text-center"
                        >
                            <div className="flex justify-center gap-1 mb-6 text-[#01663D] text-[10px] tracking-widest opacity-80">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                            <p className="text-gray-200 font-light text-xl sm:text-2xl leading-relaxed mb-6 tracking-wide font-display uppercase">
                                "{testimonials[currentTestimonial].text}"
                            </p>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{testimonials[currentTestimonial].name} — {testimonials[currentTestimonial].city}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>


            {/* Minimal Footer */}
            <footer className="mt-12 pb-8 text-center text-gray-700 text-[9px] uppercase tracking-[0.3em] font-medium relative z-10">
                <p>&copy; {new Date().getFullYear()} Skilinia. Elite Video Editing.</p>
            </footer>

        </div>
    )
}

export default EditorsLaunchpad;
