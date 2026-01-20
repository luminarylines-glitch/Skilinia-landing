import React from 'react';
import { motion } from 'framer-motion';

export const DollarBill = () => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
            style={{ width: '100vw', height: '100px', overflow: 'hidden' }}
        >
            <motion.svg
                viewBox="0 0 200 100"
                className="w-32 sm:w-48 h-auto absolute top-1/2 -translate-y-1/2 left-1/2"
                style={{
                    filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
                    stroke: 'currentColor',
                    fill: 'none',
                    color: 'rgba(255, 255, 255, 0.4)',
                    overflow: 'visible'
                }}
                initial={{ x: -200, opacity: 0, rotate: 0 }}
                animate={{
                    x: [-200, -192, -192, 500], // Start Left -> Peek (8px) -> Pause -> Fly Right
                    opacity: [0, 0.4, 0.4, 0.7, 0], // Hidden -> Visible(Peek) -> Hold -> Readable -> Fade
                    rotate: [0, 0, 0, 10, 10], // No tilt during peek, tilt during fly
                }}
                transition={{
                    duration: 1.6, // Total sequence time
                    times: [0, 0.31, 0.47, 1], // Timing distribution
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            >
                {/* Minimalist Bill Outline */}
                <rect x="2" y="2" width="196" height="96" rx="4" strokeWidth="1" />
                <rect x="10" y="10" width="180" height="80" rx="2" strokeWidth="0.5" />

                {/* Center Circle (Portrait) */}
                <circle cx="100" cy="50" r="30" strokeWidth="0.5" />

                {/* Corner Numbers */}
                <text x="20" y="30" fontSize="14" fill="currentColor" fontFamily="monospace" stroke="none" textAnchor="middle">100</text>
                <text x="180" y="30" fontSize="14" fill="currentColor" fontFamily="monospace" stroke="none" textAnchor="middle">100</text>
                <text x="20" y="85" fontSize="14" fill="currentColor" fontFamily="monospace" stroke="none" textAnchor="middle">100</text>
                <text x="180" y="85" fontSize="14" fill="currentColor" fontFamily="monospace" stroke="none" textAnchor="middle">100</text>
            </motion.svg>
        </motion.div>
    );
};
