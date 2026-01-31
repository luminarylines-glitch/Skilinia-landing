import React from 'react';

export default function VisualSeatGrid({
    totalSeats = 30,
    takenSeats = 18,
    className = ''
}) {
    const availableSeats = totalSeats - takenSeats;

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Grid of dots - centered absolutely */}
            <div className="flex flex-wrap gap-1 max-w-md mx-auto justify-center">
                {Array.from({ length: totalSeats }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i < takenSeats
                            ? 'bg-white shadow-sm'
                            : 'bg-white/20 border border-white/30'
                            }`}
                    />
                ))}
            </div>

            {/* Label - centered with equal spacing */}
            <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
                <span className="min-w-[60px] text-right">{takenSeats} taken</span>
                <span className="text-gray-600">•</span>
                <span className="min-w-[80px] text-left text-[#d4ff00] font-bold">{availableSeats} spots left</span>
            </div>
        </div>
    );
}
