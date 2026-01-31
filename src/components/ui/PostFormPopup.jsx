import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PostFormPopup({ isVisible, onClose, cohortDate }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Success Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

                        {/* Content */}
                        <div className="relative p-8 text-center space-y-6">
                            {/* Success Animation */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", damping: 10 }}
                                className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center"
                            >
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="w-10 h-10 text-emerald-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <motion.path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </motion.svg>
                            </motion.div>

                            {/* Headline */}
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-white">
                                    🎉 Application Received!
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Our team will call you within <span className="text-emerald-400 font-semibold">24 hours</span>
                                </p>
                            </div>

                            {/* What's Next */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-left space-y-4">
                                <p className="text-white text-sm font-semibold">What happens next:</p>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-emerald-400 text-xs font-bold">1</div>
                                        <p className="text-gray-400 text-sm">Our team reviews your application</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-emerald-400 text-xs font-bold">2</div>
                                        <p className="text-gray-400 text-sm">Quick call to discuss your goals & fit</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-emerald-400 text-xs font-bold">3</div>
                                        <p className="text-gray-400 text-sm">Secure your spot for {cohortDate || 'the next cohort'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bonus Unlocked */}
                            <div className="bg-[#d4ff00]/10 border border-[#d4ff00]/30 rounded-lg p-4">
                                <p className="text-[#d4ff00] text-sm font-semibold flex items-center justify-center gap-2">
                                    <span>🎁</span>
                                    <span>Your bonuses are locked in!</span>
                                </p>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={onClose}
                                className="w-full py-3 px-6 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 border border-white/10"
                            >
                                Got it! 👍
                            </button>

                            {/* Social share hint */}
                            <p className="text-gray-600 text-xs">
                                Pro tip: Save this page to review before your call
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
