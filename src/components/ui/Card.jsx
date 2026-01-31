import React from 'react';

export default function Card({
    children,
    className = '',
    hoverEffect = false,
    ...props
}) {
    // "The Glass Layer" - refined dark glassmorphism
    const baseStyles = "bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden";

    // Subtle hover effect, no movement, just brightness
    const hoverStyles = hoverEffect ? "transition-colors duration-300 hover:border-white/20 hover:bg-[#161616]/80" : "";

    return (
        <div
            className={`${baseStyles} ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
