import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Button({
    children,
    variant = 'primary',
    className = '',
    showViewers = false,
    viewerCount = 0,
    ...props
}) {
    const [ripples, setRipples] = useState([]);
    const [showTooltip, setShowTooltip] = useState(false);
    const buttonRef = useRef(null);

    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none gap-2 relative";

    // High-Conversion variants (neon yellow primary, pink urgency)
    const variants = {
        primary: "bg-gradient-to-r from-[#d4ff00] to-[#c3ff00] text-black font-extrabold hover:-translate-y-1 shadow-[0_10px_40px_rgba(212,255,0,0.3)] hover:shadow-[0_15px_50px_rgba(212,255,0,0.5)] rounded-full px-8 py-3 overflow-hidden",
        secondary: "bg-white/10 hover:bg-white/15 text-white backdrop-blur-md border border-white/10 hover:border-white/20 rounded-full px-6 py-3",
        ghost: "bg-transparent hover:bg-white/5 text-gray-300 hover:text-white rounded-lg px-4 py-2",
        outline: "border border-white/20 text-white hover:bg-white/5 rounded-full px-6 py-3",
        urgency: "bg-gradient-to-r from-[#ff1493] to-[#e91e63] text-white font-bold shadow-[0_10px_30px_rgba(255,20,147,0.4)] hover:shadow-[0_15px_40px_rgba(255,20,147,0.6)] rounded-full px-8 py-3 overflow-hidden",
        premium: "text-black font-extrabold rounded-full px-8 py-3" // Base for premium - border handled separately
    };

    const handleClick = (e) => {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { x, y, id: Date.now() };

        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);

        if (props.onClick) props.onClick(e);
    };

    // Premium button with animated rotating border - SHARP METEOR (No Disco Glow)
    if (variant === 'premium') {
        return (
            <div className="relative inline-block group">
                {/* 1. STATIC AMBIENT GLOW - Deep Premium Backlight (No Rotation) */}
                <div className="absolute -inset-[8px] rounded-full blur-xl opacity-20 bg-emerald-500/30 group-hover:opacity-40 transition-opacity duration-500" />

                {/* 2. ORBITAL RING - Sharp Meteor Orbit */}
                <div className="absolute -inset-[3px] rounded-full overflow-hidden p-[2px]">
                    <div
                        className="absolute inset-0 animate-[spin_4s_linear_infinite]"
                        style={{
                            // Elegant Meteor: Transparent tail -> Blue -> Cyan -> White Head -> Sharp cut to transparent
                            background: 'conic-gradient(from 0deg, transparent 0deg, transparent 220deg, #0088ff 260deg, #00ffff 320deg, #ffffff 350deg, transparent 360deg)',
                        }}
                    />
                    {/* Darker Inner Channel - Translucent */}
                    <div className="absolute inset-[2px] rounded-full bg-[#050505]/90 z-[0]" />
                </div>

                {/* 3. MAIN BUTTON - Floating inside */}
                <button
                    ref={buttonRef}
                    className={`${baseStyles} ${variants.premium} bg-gradient-to-r from-[#d4ff00] to-[#c3ff00] relative z-10 hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(212,255,0,0.3)] ${className}`}
                    onClick={handleClick}
                    onMouseEnter={() => showViewers && setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    {...props}
                >
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                        <span
                            className="absolute inset-0 -translate-x-full animate-shimmer"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                            }}
                        />
                    </span>

                    {/* Ripple effects */}
                    {ripples.map(ripple => (
                        <span
                            key={ripple.id}
                            className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
                            style={{
                                left: ripple.x,
                                top: ripple.y,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    ))}

                    {/* Button content */}
                    <span className="relative z-10">{children}</span>
                </button>

                {/* Viewing tooltip */}
                <AnimatePresence>
                    {showTooltip && showViewers && viewerCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 border border-white/10 text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-50"
                        >
                            <span className="text-emerald-400">●</span> {viewerCount} people viewing this offer
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // Standard button rendering
    return (
        <div className="relative inline-block">
            <button
                ref={buttonRef}
                className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
                onClick={handleClick}
                onMouseEnter={() => showViewers && setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                {...props}
            >
                {/* Shimmer effect for primary/urgency buttons */}
                {(variant === 'primary' || variant === 'urgency') && (
                    <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                        <span
                            className="absolute inset-0 -translate-x-full animate-shimmer"
                            style={{
                                background: variant === 'primary'
                                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                            }}
                        />
                    </span>
                )}

                {/* Ripple effects */}
                {ripples.map(ripple => (
                    <span
                        key={ripple.id}
                        className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}

                {/* Button content */}
                <span className="relative z-10">{children}</span>
            </button>

            {/* Viewing tooltip */}
            <AnimatePresence>
                {showTooltip && showViewers && viewerCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 border border-white/10 text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-50"
                    >
                        <span className="text-emerald-400">●</span> {viewerCount} people viewing this offer
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


