import React from 'react';

export default function Badge({
    children,
    variant = 'neutral',
    className = '',
}) {
    const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border";

    const variants = {
        neutral: "bg-white/5 border-white/10 text-gray-400",
        emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
        danger: "bg-red-500/10 border-red-500/20 text-red-400",
        urgency: "bg-[#ff1493] border-[#ff1493] text-white font-bold uppercase tracking-wide",
        discount: "bg-[#d4ff00] border-[#d4ff00] text-black font-bold uppercase px-3 py-1"
    };


    return (
        <span className={`${baseStyles} ${variants[variant] || variants.neutral} ${className}`}>
            {children}
        </span>
    );
}
