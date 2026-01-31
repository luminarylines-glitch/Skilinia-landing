import React from 'react';
import Card from './Card';
import Badge from './Badge';

export default function PricingComparisonCard({ className = '' }) {
    const freeFeatures = [
        { text: 'No trending styles taught', available: false },
        { text: 'No accountability', available: false },
        { text: 'No portfolio reviews', available: false },
        { text: 'Takes 6-12 months', available: false }
    ];

    const cohortFeatures = [
        { text: 'Growing style library', available: true, highlight: true },
        { text: 'Live cohort support', available: true },
        { text: 'Lifetime access + updates', available: true, highlight: true },
        { text: '127+ students placed', available: true },
        { text: '7-day money-back guarantee', available: true, highlight: true }
    ];

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
            {/* Free Path - Darker */}
            <Card className="p-8 bg-[#0a0a0a] border-white/5 relative">
                <div className="absolute top-4 right-4">
                    <Badge variant="neutral">FREE</Badge>
                </div>

                <h3 className="text-2xl font-bold text-gray-400 mb-6 uppercase">Self-Paced</h3>
                <p className="text-gray-500 text-sm mb-6">YouTube tutorials + trial and error</p>

                <ul className="space-y-3">
                    {freeFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-500">
                            <span className="text-red-500 mt-0.5">✗</span>
                            <span className="text-sm">{feature.text}</span>
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Cohort Path - Highlighted with Yellow Border */}
            <Card className="p-8 bg-[#0f0f0f] border-2 border-[#d4ff00]/30 relative shadow-[0_0_40px_rgba(212,255,0,0.15)]">
                <div className="absolute top-4 right-4">
                    <Badge variant="urgency">BEST VALUE</Badge>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 uppercase">Launchpad</h3>
                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-extrabold text-[#d4ff00]">₹5,900</span>
                    <span className="text-sm text-gray-500 line-through">₹15,000</span>
                </div>

                <ul className="space-y-3 mb-6">
                    {cohortFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="text-emerald-400 mt-0.5">✓</span>
                            <span className={`text-sm ${feature.highlight ? 'text-white font-semibold' : 'text-gray-300'}`}>
                                {feature.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
}
