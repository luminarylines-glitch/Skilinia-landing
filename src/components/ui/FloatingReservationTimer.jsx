import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingReservationTimer({
    isVisible,
    seatNumber = 15,
    initialMinutes = 10,
    onExpire
}) {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [isPulsing, setIsPulsing] = useState(false);

    // Countdown timer
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onExpire?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isVisible, onExpire]);

    // Pulse animation when under 5 minutes
    useEffect(() => {
        if (timeLeft < 300) { // Less than 5 minutes
            setIsPulsing(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Get urgency level for styling
    const getUrgencyLevel = () => {
        if (timeLeft < 120) return 'critical'; // < 2 min
        if (timeLeft < 300) return 'warning';  // < 5 min
        return 'normal';
    };

    const urgency = getUrgencyLevel();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed top-4 inset-x-0 z-[10000] flex justify-center px-4"
                >
                    <motion.div
                        animate={isPulsing ? {
                            scale: [1, 1.02, 1],
                            boxShadow: urgency === 'critical'
                                ? ['0 0 20px rgba(239, 68, 68, 0.3)', '0 0 40px rgba(239, 68, 68, 0.5)', '0 0 20px rgba(239, 68, 68, 0.3)']
                                : ['0 0 20px rgba(212, 255, 0, 0.2)', '0 0 30px rgba(212, 255, 0, 0.4)', '0 0 20px rgba(212, 255, 0, 0.2)']
                        } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`
                            flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-full backdrop-blur-xl
                            border shadow-2xl max-w-full
                            ${urgency === 'critical'
                                ? 'bg-red-900/90 border-red-500/50'
                                : urgency === 'warning'
                                    ? 'bg-amber-900/90 border-amber-500/50'
                                    : 'bg-black/90 border-[#d4ff00]/30'
                            }
                        `}
                    >
                        {/* Lock/Secured indicator */}
                        <div className={`
                            w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0
                            ${urgency === 'critical'
                                ? 'bg-red-500'
                                : urgency === 'warning'
                                    ? 'bg-amber-500'
                                    : 'bg-[#d4ff00]'
                            }
                        `}>
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        {/* Text content - hidden on very small screens */}
                        <div className="hidden xs:flex flex-col min-w-0">
                            <span className={`
                                text-xs font-medium truncate
                                ${urgency === 'critical'
                                    ? 'text-red-300'
                                    : urgency === 'warning'
                                        ? 'text-amber-300'
                                        : 'text-gray-400'
                                }
                            `}>
                                Seat #{seatNumber} reserved
                            </span>
                            <span className="text-white text-xs truncate">
                                {urgency === 'critical' ? 'Hurry!' : 'Complete to confirm'}
                            </span>
                        </div>

                        {/* Mobile: Compact text */}
                        <div className="xs:hidden flex flex-col min-w-0">
                            <span className="text-white text-xs font-medium">
                                #{seatNumber} reserved
                            </span>
                        </div>

                        {/* Timer */}
                        <div className={`
                            flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-mono font-bold text-sm sm:text-lg flex-shrink-0
                            ${urgency === 'critical'
                                ? 'bg-red-500/20 text-red-300'
                                : urgency === 'warning'
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-[#d4ff00]/20 text-[#d4ff00]'
                            }
                        `}>
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <motion.span
                                key={timeLeft}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {formatTime(timeLeft)}
                            </motion.span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

