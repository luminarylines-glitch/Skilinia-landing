import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * ScrollPlayhead - A vertical "playhead" bar that follows scroll position
 * Like scrubbing through a video timeline
 * 
 * Desktop: Full playhead with timecode
 * Mobile: Minimal progress bar on the right side
 */
function ScrollPlayhead() {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Smooth spring animation for the playhead
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transform scroll progress to vertical position (percentage)
    const yPercent = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

    // Show playhead after initial scroll
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setIsVisible(latest > 0.02);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    if (!isVisible) return null;

    // Mobile: Minimal progress bar on the right
    if (isMobile) {
        return (
            <div className="fixed right-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                {/* Minimal track */}
                <div className="h-24 w-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="w-full bg-gradient-to-b from-[#d4ff00] to-emerald-500 rounded-full origin-top"
                        style={{ height: yPercent }}
                    />
                </div>

                {/* Glowing dot at current position */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-2 h-2"
                    style={{ top: yPercent }}
                >
                    <div className="w-2 h-2 bg-[#d4ff00] rounded-full shadow-[0_0_8px_rgba(212,255,0,0.6)]" />
                </motion.div>
            </div>
        );
    }

    // Desktop: Full playhead with timecode
    return (
        <div className="fixed left-4 md:left-8 top-0 bottom-0 z-50 pointer-events-none flex flex-col items-center">
            {/* Timeline track */}
            <div className="absolute top-20 bottom-20 w-[2px] bg-white/10 rounded-full overflow-hidden">
                {/* Progress fill */}
                <motion.div
                    className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#d4ff00] to-emerald-500 rounded-full"
                    style={{ height: yPercent }}
                />
            </div>

            {/* Playhead indicator */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
                style={{ top: yPercent }}
            >
                {/* Glowing dot */}
                <div className="relative">
                    <div className="w-3 h-3 bg-[#d4ff00] rounded-full shadow-[0_0_20px_rgba(212,255,0,0.8)]" />
                    <div className="absolute inset-0 w-3 h-3 bg-[#d4ff00] rounded-full animate-ping opacity-50" />
                </div>

                {/* Current "timecode" display */}
                <motion.div
                    className="bg-black/80 backdrop-blur-sm border border-[#d4ff00]/30 rounded px-2 py-0.5 text-[10px] font-mono text-[#d4ff00] whitespace-nowrap"
                >
                    <motion.span>
                        <ScrollTimecode progress={smoothProgress} />
                    </motion.span>
                </motion.div>
            </motion.div>

            {/* Keyframe markers */}
            <div className="absolute top-20 bottom-20 left-1/2 -translate-x-1/2 flex flex-col justify-between">
                {[0, 25, 50, 75, 100].map((marker) => (
                    <div
                        key={marker}
                        className="w-1.5 h-1.5 bg-white/20 rounded-full"
                        style={{ marginTop: marker === 0 ? 0 : 'auto' }}
                    />
                ))}
            </div>
        </div>
    );
}

// Timecode display component
function ScrollTimecode({ progress }) {
    const [timecode, setTimecode] = useState('00:00');

    useEffect(() => {
        const unsubscribe = progress.on('change', (latest) => {
            // Convert scroll progress to timecode format (00:00 - 03:00)
            const totalSeconds = Math.floor(latest * 180); // 3 minutes total
            const mins = Math.floor(totalSeconds / 60);
            const secs = totalSeconds % 60;
            setTimecode(`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
        });
        return () => unsubscribe();
    }, [progress]);

    return timecode;
}

export default ScrollPlayhead;
