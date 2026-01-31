import React from 'react';
import Card from './Card';
import Badge from './Badge';
import { Target, BarChart3, Zap, Briefcase, GraduationCap, Users } from 'lucide-react';

export default function ValueGrid({ className = '' }) {
    const features = [
        {
            icon: Zap,
            title: 'VIRAL',
            subtitle: 'Speed Ramping Mastery',
            description: 'Learn rhythm, timing & visual punch for viral edits',
            badge: 'Trending'
        },
        {
            icon: Briefcase,
            title: 'CINEMATIC',
            subtitle: 'Documentary Editing',
            description: 'Netflix-quality storytelling & color grading',
            badge: 'Premium'
        },
        {
            icon: Target,
            title: 'MODERN',
            subtitle: 'Apple UI Style',
            description: 'Clean, product-first editing tech brands love',
            badge: 'High-Paying'
        },
        {
            icon: GraduationCap,
            title: '3D',
            subtitle: 'Animation Techniques',
            description: 'High-retention documentary 3D visuals',
            badge: 'Advanced'
        },
        {
            icon: Zap,
            title: 'AI-POWERED',
            subtitle: 'Editing Workflow',
            description: '10x your speed with cutting-edge AI tools',
            badge: 'Future-Proof'
        },
        {
            icon: Users,
            title: 'CREATOR',
            subtitle: 'Personal Branding',
            description: 'Build credible identity that attracts clients',
            badge: 'Essential'
        }
    ];

    return (
        <div className={`space-y-8 ${className}`}>
            {/* Icon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                        <Card key={index} className="p-8 text-center bg-[#0f0f0f] border-white/5 hover:border-[#d4ff00]/20 transition-all group">
                            {/* Icon - Premium Line Art Style */}
                            <div className="mb-4 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#d4ff00]/10 group-hover:border-[#d4ff00]/30 transition-all">
                                    <IconComponent className="w-8 h-8 text-white group-hover:text-[#d4ff00] transition-colors" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Badges */}
                            {feature.badge && (
                                <Badge variant="warning" className="mb-3 text-[10px]">{feature.badge}</Badge>
                            )}

                            {/* Title */}
                            <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{feature.subtitle}</h3>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
