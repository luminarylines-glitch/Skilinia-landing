import React, { useState } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';

const VideoMediaCard = ({ videoId, className }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <Card className={`overflow-hidden p-0 border-white/10 bg-[#111] ${className}`}>
            {/* Video Player Area - Full Width */}
            <div className="w-full bg-black relative">
                <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                    <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                        <div className={`wistia_embed wistia_async_${videoId} videoFoam=true`} style={{ height: '100%', position: 'relative', width: '100%' }}>
                            <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 0, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
                                <img src={`https://fast.wistia.com/embed/medias/${videoId}/swatch`} style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} alt="" aria-hidden="true" onLoad={(e) => e.target.parentNode.style.opacity = 1} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default VideoMediaCard;
