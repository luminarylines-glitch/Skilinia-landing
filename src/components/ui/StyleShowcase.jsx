import { motion } from 'framer-motion';

export default function StyleShowcase({ className = '' }) {
    const styles = [
        {
            id: 'documentary',
            title: 'Documentary Style',
            videoUrl: '/videos/documentary.mp4',
            badge: 'Premium'
        },
        {
            id: 'speed-ramp',
            title: 'Speed Ramping',
            videoUrl: '/videos/car speed ramping.mp4',
            badge: 'Viral'
        },
        {
            id: 'saas',
            title: 'SaaS Style',
            videoUrl: '/videos/saas 2.mp4',
            badge: 'Tech'
        },
        {
            id: 'apple',
            title: 'Apple UI Style',
            videoUrl: '/videos/apple ui.mp4',
            badge: 'High-Paying'
        },
        {
            id: 'devin',
            title: 'Devin Jatho Style',
            videoUrl: '/videos/devin jatho.mp4',
            badge: 'Creator'
        },
        {
            id: 'cinematic',
            title: 'Cinematic Edit',
            videoUrl: '/videos/Saas.mp4',
            badge: 'Advanced'
        }
    ];

    return (
        <div className={`w-full ${className}`}>
            {/* Section Header */}
            <div className="text-center mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 bg-[#d4ff00]/10 border border-[#d4ff00]/20 rounded-full mb-4"
                >
                    <span className="text-[#d4ff00] text-xs font-bold uppercase tracking-wider">🎬 Style Previews</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight uppercase mb-3">
                    SEE THE STYLES{' '}
                    <span className="bg-gradient-to-r from-[#d4ff00] to-[#c3ff00] text-transparent bg-clip-text">IN ACTION</span>
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                    Watch real examples of each trending editing style
                </p>
            </div>

            {/* Masonry Layout for Mixed Aspect Ratios */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {styles.map((style, index) => (
                    <motion.div
                        key={style.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative break-inside-avoid mb-4"
                    >
                        <div className="relative bg-[#0f0f0f] rounded-xl overflow-hidden border border-white/10 hover:border-[#d4ff00]/30 transition-all">
                            {/* Larger video container - auto height based on video aspect ratio */}
                            <video
                                src={style.videoUrl}
                                className="w-full h-auto block"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                            />

                            {/* Hover Overlay with Style Info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <span className="inline-block px-3 py-1 bg-[#d4ff00]/90 text-black text-xs font-bold rounded-full mb-2">
                                        {style.badge}
                                    </span>
                                    <h3 className="text-white font-bold text-lg">{style.title}</h3>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
