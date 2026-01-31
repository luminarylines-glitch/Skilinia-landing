import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgressBar() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const percentage = (scrolled / documentHeight) * 100;

            setProgress(Math.min(100, Math.max(0, percentage)));
            setIsVisible(scrolled > 100); // Only show after scrolling a bit
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            className="fixed top-0 left-0 right-0 z-[200] h-1 bg-black/50 backdrop-blur-sm"
        >
            <motion.div
                className="h-full bg-gradient-to-r from-[#d4ff00] to-emerald-400 origin-left"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
            />

            {/* Glow effect at the end */}
            <motion.div
                className="absolute top-0 h-full w-4 bg-[#d4ff00] blur-md"
                style={{ left: `calc(${progress}% - 8px)` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            />
        </motion.div>
    );
}
