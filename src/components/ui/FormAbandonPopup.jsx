import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Analytics Event Tracking Helper
const trackEvent = (eventName, properties = {}) => {
    console.log(`[Analytics] ${eventName}`, properties);
    if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', eventName, properties);
    }
};

export default function FormAbandonPopup({ isVisible, onClose, onApply, spotsLeft = 6 }) {
    const handleClose = () => {
        trackEvent('abandon_popup_closed');
        onClose();
    };

    const handleApply = () => {
        trackEvent('abandon_popup_converted');
        onClose();
        // Small delay before reopening form
        setTimeout(() => {
            onApply();
        }, 100);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#d4ff00]/30 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#d4ff00]/20 rounded-full blur-[100px] pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors z-10"
                            aria-label="Close"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Content */}
                        <div className="relative p-8 pt-12 text-center space-y-6">
                            {/* Emoji/Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="text-5xl"
                            >
                                😢
                            </motion.div>

                            {/* Headline */}
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-white">
                                    Wait, don't leave yet!
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Your <span className="text-[#d4ff00] font-bold">reserved spot</span> is held for the next 10 minutes
                                </p>
                            </div>

                            {/* Urgency Box */}
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-300">
                                ⚠️ Only <span className="font-bold">{spotsLeft} seats</span> left at this price
                            </div>

                            {/* Value Stack - BONUS */}
                            <div className="bg-[#d4ff00]/10 border border-[#d4ff00]/30 rounded-xl p-4 text-left space-y-3">
                                <p className="text-[#d4ff00] text-xs font-bold uppercase tracking-wider">
                                    🎁 You'll also get these FREE bonuses:
                                </p>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#d4ff00] mt-0.5">✓</span>
                                        <span><strong>AI Masterclass</strong> (₹10,000 value)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#d4ff00] mt-0.5">✓</span>
                                        <span><strong>International Clients Blueprint</strong></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#d4ff00] mt-0.5">✓</span>
                                        <span><strong>Premium Plugins & Assets</strong> (₹5,000 value)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#d4ff00] mt-0.5">✓</span>
                                        <span><strong>Pre-recorded Session Access</strong></span>
                                    </li>
                                </ul>
                                <p className="text-[#d4ff00]/70 text-xs text-center pt-2 border-t border-[#d4ff00]/20">
                                    Total bonus value: <span className="font-bold">₹18,000+</span>
                                </p>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={handleApply}
                                className="w-full py-4 px-6 bg-[#d4ff00] hover:bg-[#e5ff4d] text-black font-bold rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(212,255,0,0.3)] hover:shadow-[0_0_40px_rgba(212,255,0,0.5)] transform hover:-translate-y-0.5 text-lg"
                            >
                                ✅ Complete My Application
                            </button>

                            {/* Trust line */}
                            <p className="text-gray-500 text-xs">
                                Takes only 2 minutes • 7-day money-back guarantee
                            </p>

                            {/* Skip option */}
                            <button
                                onClick={handleClose}
                                className="text-gray-600 text-xs hover:text-gray-400 underline transition-colors"
                            >
                                No thanks, I'll pass on the bonuses
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
