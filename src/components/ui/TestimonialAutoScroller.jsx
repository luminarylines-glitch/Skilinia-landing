import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_TESTIMONIALS = [
    {
        name: "Arjun M.",
        role: "Freelance Editor",
        location: "Bangalore",
        text: "Landed my first ₹15,000 client in 3 weeks. The outreach templates alone were worth the investment.",
        result: "₹45,000/month",
        avatar: "A"
    },
    {
        name: "Priya S.",
        role: "Content Creator",
        location: "Mumbai",
        text: "Went from ₹0 to ₹32,000 in my first month. The AI editing techniques are game-changing.",
        result: "First Month: ₹32K",
        avatar: "P"
    },
    {
        name: "Rahul K.",
        role: "Part-time Editor",
        location: "Delhi",
        text: "Quit my job after 2 months. Now earning more working 4 hours a day than my full-time salary.",
        result: "Quit 9-5 Job",
        avatar: "R"
    },
    {
        name: "Sneha D.",
        role: "Student",
        location: "Chennai",
        text: "Started while in college. Now paying my own fees and saving ₹20K every month.",
        result: "₹20K/month savings",
        avatar: "S"
    }
];

export default function TestimonialAutoScroller({
    testimonials = DEFAULT_TESTIMONIALS,
    intervalMs = 5000,
    pauseOnHover = true
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % testimonials.length);
        }, intervalMs);

        return () => clearInterval(interval);
    }, [testimonials.length, intervalMs, isPaused]);

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div
            className="relative w-full max-w-md mx-auto"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                >
                    {/* Quote */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        "{currentTestimonial.text}"
                    </p>

                    {/* Result badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full px-3 py-1 mb-4"
                    >
                        <span className="text-emerald-400 text-xs">✓</span>
                        <span className="text-emerald-300 text-xs font-semibold">{currentTestimonial.result}</span>
                    </motion.div>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4ff00] to-emerald-500 flex items-center justify-center text-black font-bold text-sm">
                            {currentTestimonial.avatar}
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">{currentTestimonial.name}</p>
                            <p className="text-gray-500 text-xs">{currentTestimonial.role} • {currentTestimonial.location}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                ? 'bg-[#d4ff00] w-6'
                                : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                    />
                ))}
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-0.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    key={currentIndex}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: intervalMs / 1000, ease: 'linear' }}
                    className="h-full bg-[#d4ff00]/50"
                    style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                />
            </div>
        </div>
    );
}
