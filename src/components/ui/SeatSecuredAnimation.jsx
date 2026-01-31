import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Confetti particle component
const ConfettiParticle = ({ index, color }) => {
    const randomX = Math.random() * 100;
    const randomDelay = Math.random() * 0.5;
    const randomDuration = 2 + Math.random() * 2;
    const randomRotation = Math.random() * 720 - 360;
    const size = 6 + Math.random() * 8;

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                left: `${randomX}%`,
                top: '50%',
                width: size,
                height: size * 0.6,
                backgroundColor: color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
            initial={{
                y: 0,
                x: 0,
                opacity: 1,
                scale: 0,
                rotate: 0
            }}
            animate={{
                y: [0, -200 - Math.random() * 300, 400 + Math.random() * 200],
                x: (Math.random() - 0.5) * 400,
                opacity: [1, 1, 0],
                scale: [0, 1, 0.5],
                rotate: randomRotation
            }}
            transition={{
                duration: randomDuration,
                delay: randomDelay,
                ease: "easeOut"
            }}
        />
    );
};

// Seat grid visualization
const SeatGrid = ({ totalSeats = 20, reservedSeat = 14 }) => {
    const [animatedSeat, setAnimatedSeat] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedSeat(true), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="grid grid-cols-5 gap-2 p-4">
            {Array.from({ length: totalSeats }).map((_, i) => {
                const isReservedForUser = i === reservedSeat;
                const isTaken = i < reservedSeat;

                return (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.03 + 0.5 }}
                        className={`
                            w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                            transition-all duration-500
                            ${isReservedForUser
                                ? animatedSeat
                                    ? 'bg-[#d4ff00] text-black scale-125 shadow-[0_0_20px_rgba(212,255,0,0.6)]'
                                    : 'bg-[#d4ff00]/50 text-black'
                                : isTaken
                                    ? 'bg-gray-600 text-gray-400'
                                    : 'bg-emerald-500/30 border border-emerald-500/50 text-emerald-400'
                            }
                        `}
                    >
                        {isReservedForUser ? (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: animatedSeat ? 1 : 0 }}
                                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                            >
                                ✓
                            </motion.span>
                        ) : isTaken ? (
                            '×'
                        ) : (
                            ''
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

// Main animation component
export default function SeatSecuredAnimation({
    isVisible,
    onComplete,
    spotsLeft = 6,
    totalSpots = 20,
    reservationMinutes = 10
}) {
    const [stage, setStage] = useState(0); // 0: securing, 1: reserved, 2: countdown, 3: complete
    const [timeLeft, setTimeLeft] = useState(reservationMinutes * 60);
    const onCompleteRef = React.useRef(onComplete);

    // Keep ref updated
    React.useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    const confettiColors = ['#d4ff00', '#ffff00', '#00ff88', '#ffffff', '#ff00ff', '#00ffff'];

    // Progress through stages
    useEffect(() => {
        if (!isVisible) {
            setStage(0);
            return;
        }

        // Stage 0 -> 1: Show "Reserved" after button animation (0.8s)
        const timer1 = setTimeout(() => setStage(1), 800);

        // Stage 1 -> 2: Show countdown after celebration (2.5s)
        const timer2 = setTimeout(() => setStage(2), 3000);

        // Stage 2 -> 3: Complete and open form (1.5s more)
        const timer3 = setTimeout(() => {
            setStage(3);
            // Use ref to get the latest callback
            if (onCompleteRef.current) {
                onCompleteRef.current();
            }
        }, 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [isVisible]); // Only depend on isVisible

    // Countdown timer (for display)
    useEffect(() => {
        if (stage < 2) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [stage]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden"
            >
                {/* Confetti explosion - Stage 1 */}
                {stage >= 1 && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {Array.from({ length: 60 }).map((_, i) => (
                            <ConfettiParticle
                                key={i}
                                index={i}
                                color={confettiColors[i % confettiColors.length]}
                            />
                        ))}
                    </div>
                )}

                {/* Radial glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4ff00]/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Main content */}
                <div className="relative z-10 text-center space-y-8 px-4 max-w-md mx-auto">

                    {/* Stage 0: Securing... */}
                    {stage === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 mx-auto border-4 border-[#d4ff00]/30 border-t-[#d4ff00] rounded-full"
                            />
                            <p className="text-white text-xl font-semibold">Securing your spot...</p>
                        </motion.div>
                    )}

                    {/* Stage 1-2: Reserved! */}
                    {stage >= 1 && stage < 3 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                            className="space-y-6"
                        >
                            {/* Checkmark burst */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", damping: 10 }}
                                className="w-24 h-24 mx-auto bg-[#d4ff00] rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(212,255,0,0.5)]"
                            >
                                <motion.svg
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="w-12 h-12 text-black"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <motion.path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </motion.svg>
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl sm:text-4xl font-bold text-white"
                            >
                                YOUR SEAT IS{' '}
                                <span className="text-[#d4ff00]">RESERVED!</span>
                            </motion.h2>

                            {/* Seat Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-4 mx-auto inline-block"
                            >
                                <SeatGrid
                                    totalSeats={totalSpots}
                                    reservedSeat={totalSpots - spotsLeft}
                                />
                                <p className="text-gray-400 text-xs mt-2">
                                    Your seat: <span className="text-[#d4ff00] font-bold">#{totalSpots - spotsLeft + 1}</span>
                                </p>
                            </motion.div>

                            {/* Countdown appears in stage 2 */}
                            {stage >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-3"
                                >
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                                        <p className="text-red-300 text-sm mb-2">
                                            ⏰ Complete form within:
                                        </p>
                                        <motion.p
                                            key={timeLeft}
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            className="text-4xl font-mono font-bold text-white"
                                        >
                                            {formatTime(timeLeft)}
                                        </motion.p>
                                        <p className="text-red-400/70 text-xs mt-2">
                                            to keep your reserved seat
                                        </p>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: '100%' }}
                                            animate={{ width: '95%' }}
                                            transition={{ duration: 1.5 }}
                                            className="h-full bg-gradient-to-r from-emerald-500 to-[#d4ff00] rounded-full"
                                        />
                                    </div>

                                    <p className="text-gray-500 text-xs">
                                        Loading application form...
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
