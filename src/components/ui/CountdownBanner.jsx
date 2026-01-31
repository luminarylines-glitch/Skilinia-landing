import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownBanner({ targetDate, spotsLeft, className = '' }) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const cohortDate = new Date(targetDate);
            const now = new Date();
            const difference = cohortDate - now;

            if (difference > 0) {
                return {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return { hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#ff1493] to-[#e91e63] backdrop-blur-md border-b border-white/10 ${className}`}
        >
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-white text-sm font-medium">
                <span className="hidden sm:inline">⚠️</span>
                <span className="text-center">
                    <span className="font-bold">One-time offer Expires in:</span>
                    {' '}
                    <span className="font-mono font-bold">
                        {String(timeLeft.hours).padStart(2, '0')}:
                        {String(timeLeft.minutes).padStart(2, '0')}:
                        {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    {spotsLeft && (
                        <>
                            {' • '}
                            <span className="font-bold">{spotsLeft} seats left</span>
                        </>
                    )}
                </span>
                <span className="hidden sm:inline">→</span>
            </div>
        </motion.div>
    );
}
